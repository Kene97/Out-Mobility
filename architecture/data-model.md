# Data Model — Out-door

Core entities only. MVP-scoped. PostgreSQL.

---

## Entity Map

```
User ──────────── Organization
  │                    │
  │              ┌─────┴─────┐
  │           Operator    Advertiser
  │              │              │
  │           Vehicle       Campaign
  │              │              │
  │           Device        AdCreative
  │              │              │
  │         DeviceHeartbeat  CampaignSchedule
  │              │              │
  └──────────── AdImpressionLog
                    │
              VerifiedImpression
                    │
             OperatorEarning ── PaymentLedger
```

---

## Tables

### users
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
email           VARCHAR(255) UNIQUE NOT NULL
password_hash   VARCHAR(255) NOT NULL
name            VARCHAR(255) NOT NULL
role            ENUM('advertiser', 'operator', 'driver', 'admin') NOT NULL
org_id          UUID REFERENCES organizations(id)
status          ENUM('pending', 'active', 'suspended') DEFAULT 'pending'
created_at      TIMESTAMPTZ DEFAULT now()
updated_at      TIMESTAMPTZ DEFAULT now()
```

### organizations
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
name            VARCHAR(255) NOT NULL
type            ENUM('advertiser', 'fleet_operator') NOT NULL
contact_email   VARCHAR(255)
contact_phone   VARCHAR(50)
status          ENUM('active', 'suspended') DEFAULT 'active'
created_at      TIMESTAMPTZ DEFAULT now()
```

### vehicles
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
plate_number    VARCHAR(50) NOT NULL
operator_id     UUID REFERENCES organizations(id) NOT NULL
device_id       UUID REFERENCES devices(id)
driver_id       UUID REFERENCES users(id)
status          ENUM('active', 'inactive') DEFAULT 'active'
created_at      TIMESTAMPTZ DEFAULT now()
```

### devices
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
device_uuid     VARCHAR(255) UNIQUE NOT NULL   -- hardware identifier
api_key_hash    VARCHAR(255) NOT NULL           -- hashed device API key
vehicle_id      UUID REFERENCES vehicles(id)
operator_id     UUID REFERENCES organizations(id) NOT NULL
status          ENUM('active', 'offline', 'suspended') DEFAULT 'active'
last_seen_at    TIMESTAMPTZ
last_gps_lat    DECIMAL(10, 7)
last_gps_lng    DECIMAL(10, 7)
app_version     VARCHAR(50)
firmware_version VARCHAR(50)
created_at      TIMESTAMPTZ DEFAULT now()

INDEX idx_devices_operator ON devices(operator_id)
INDEX idx_devices_status ON devices(status)
```

### campaigns
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
advertiser_id   UUID REFERENCES organizations(id) NOT NULL
name            VARCHAR(255) NOT NULL
status          ENUM('draft','submitted','approved','scheduled',
                     'active','paused','completed','cancelled') DEFAULT 'draft'
budget_total    DECIMAL(12, 2) NOT NULL
budget_spent    DECIMAL(12, 2) DEFAULT 0
cpm_rate        DECIMAL(8, 4)               -- agreed CPM in currency
start_date      DATE NOT NULL
end_date        DATE NOT NULL
geo_city        VARCHAR(100)
geo_lat         DECIMAL(10, 7)
geo_lng         DECIMAL(10, 7)
geo_radius_km   DECIMAL(6, 2) DEFAULT 50
rejection_note  TEXT
created_at      TIMESTAMPTZ DEFAULT now()
updated_at      TIMESTAMPTZ DEFAULT now()

INDEX idx_campaigns_advertiser ON campaigns(advertiser_id)
INDEX idx_campaigns_status ON campaigns(status)
INDEX idx_campaigns_dates ON campaigns(start_date, end_date)
```

### ad_creatives
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
campaign_id     UUID REFERENCES campaigns(id) NOT NULL
file_url        TEXT NOT NULL               -- CDN URL
file_type       ENUM('video', 'image') NOT NULL
duration_seconds INTEGER                   -- null for images
file_size_bytes  BIGINT
status          ENUM('pending','approved','rejected') DEFAULT 'pending'
rejection_note  TEXT
created_at      TIMESTAMPTZ DEFAULT now()

INDEX idx_creatives_campaign ON ad_creatives(campaign_id)
```

### campaign_schedules
One row per device per campaign per day. Generated when campaign becomes ACTIVE.

```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
campaign_id     UUID REFERENCES campaigns(id) NOT NULL
device_id       UUID REFERENCES devices(id) NOT NULL
creative_id     UUID REFERENCES ad_creatives(id) NOT NULL
schedule_date   DATE NOT NULL
interval_seconds INTEGER DEFAULT 300        -- play every N seconds
priority        INTEGER DEFAULT 1           -- higher = preferred
created_at      TIMESTAMPTZ DEFAULT now()

UNIQUE(campaign_id, device_id, schedule_date)
INDEX idx_schedule_device_date ON campaign_schedules(device_id, schedule_date)
```

### ad_impression_logs
Raw, device-reported events. Immutable after insert.

```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
device_id       UUID REFERENCES devices(id) NOT NULL
campaign_id     UUID REFERENCES campaigns(id) NOT NULL
creative_id     UUID REFERENCES ad_creatives(id) NOT NULL
played_at       TIMESTAMPTZ NOT NULL          -- device-reported timestamp
received_at     TIMESTAMPTZ DEFAULT now()     -- server receipt time
gps_lat         DECIMAL(10, 7)
gps_lng         DECIMAL(10, 7)
duration_played_seconds INTEGER
is_complete     BOOLEAN DEFAULT false
batch_id        VARCHAR(255)                 -- device-generated batch ID
device_sequence INTEGER                      -- per-device sequence number
verified        BOOLEAN DEFAULT false
created_at      TIMESTAMPTZ DEFAULT now()

INDEX idx_logs_device ON ad_impression_logs(device_id)
INDEX idx_logs_campaign ON ad_impression_logs(campaign_id)
INDEX idx_logs_played_at ON ad_impression_logs(played_at)
INDEX idx_logs_unverified ON ad_impression_logs(verified) WHERE verified = false
```

### verified_impressions
Processed output of verification service. Source of truth for billing.

```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
log_id          UUID REFERENCES ad_impression_logs(id) UNIQUE NOT NULL
campaign_id     UUID REFERENCES campaigns(id) NOT NULL
device_id       UUID REFERENCES devices(id) NOT NULL
operator_id     UUID REFERENCES organizations(id) NOT NULL
played_at       TIMESTAMPTZ NOT NULL
verified_at     TIMESTAMPTZ DEFAULT now()
status          ENUM('valid','invalid','suspicious') NOT NULL
invalid_reason  VARCHAR(255)               -- null if valid

INDEX idx_verified_campaign ON verified_impressions(campaign_id)
INDEX idx_verified_status ON verified_impressions(status)
INDEX idx_verified_operator ON verified_impressions(operator_id)
```

### device_heartbeats
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
device_id       UUID REFERENCES devices(id) NOT NULL
timestamp       TIMESTAMPTZ NOT NULL
gps_lat         DECIMAL(10, 7)
gps_lng         DECIMAL(10, 7)
network_type    VARCHAR(20)                -- wifi, 4g, 3g, none
app_version     VARCHAR(50)
created_at      TIMESTAMPTZ DEFAULT now()

INDEX idx_heartbeats_device_time ON device_heartbeats(device_id, timestamp)
```
-- Partition by month in production to keep table manageable

### campaign_stats
Pre-aggregated. Updated by background job every 15 minutes.

```sql
id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
campaign_id           UUID REFERENCES campaigns(id) UNIQUE NOT NULL
total_impressions     BIGINT DEFAULT 0
valid_impressions     BIGINT DEFAULT 0
invalid_impressions   BIGINT DEFAULT 0
suspicious_count      INTEGER DEFAULT 0
unique_devices        INTEGER DEFAULT 0
completion_rate       DECIMAL(5, 2) DEFAULT 0
budget_spent          DECIMAL(12, 2) DEFAULT 0
last_updated_at       TIMESTAMPTZ DEFAULT now()
```

### operator_earnings
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
operator_id     UUID REFERENCES organizations(id) NOT NULL
device_id       UUID REFERENCES devices(id) NOT NULL
period_start    DATE NOT NULL
period_end      DATE NOT NULL
impressions     BIGINT DEFAULT 0
uptime_minutes  INTEGER DEFAULT 0
gross_amount    DECIMAL(12, 2) DEFAULT 0
revenue_share_pct DECIMAL(5, 2) DEFAULT 35    -- e.g. 35%
payout_amount   DECIMAL(12, 2) DEFAULT 0
status          ENUM('pending','approved','processing','paid','held') DEFAULT 'pending'
paid_at         TIMESTAMPTZ
payment_ref     VARCHAR(255)
created_at      TIMESTAMPTZ DEFAULT now()

UNIQUE(operator_id, device_id, period_start)
INDEX idx_earnings_operator ON operator_earnings(operator_id)
INDEX idx_earnings_status ON operator_earnings(status)
```

### payment_ledger
Every financial event recorded as an immutable ledger entry.

```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
org_id          UUID REFERENCES organizations(id) NOT NULL
type            ENUM('credit','debit') NOT NULL
amount          DECIMAL(12, 2) NOT NULL
currency        VARCHAR(3) DEFAULT 'USD'
reference       VARCHAR(255)               -- invoice ID, payout ID, etc.
description     TEXT
status          ENUM('pending','completed','failed') DEFAULT 'pending'
created_at      TIMESTAMPTZ DEFAULT now()

INDEX idx_ledger_org ON payment_ledger(org_id)
```

---

## Key Design Decisions

1. **Immutable logs:** `ad_impression_logs` is never updated — only the `verified` flag changes. Audit trail is always intact.
2. **Separate verified table:** Raw logs and verified impressions are separate — allows re-verification without losing raw data.
3. **Pre-aggregated stats:** `campaign_stats` avoids expensive count queries on the impressions table for every dashboard load.
4. **Sequence numbers:** `device_sequence` on logs enables duplicate detection without a distributed lock.
5. **Ledger pattern:** `payment_ledger` is append-only — never delete or update financial records.
