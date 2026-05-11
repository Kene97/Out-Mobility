# Database Schema — Out-door

**Engine:** PostgreSQL 15+
**Extensions required:** `uuid-ossp`, `pg_trgm` (for text search)

---

## Schema Design Principles

1. **UUIDs everywhere** — no sequential integer PKs exposed externally (enumerable attack surface)
2. **Immutable event logs** — impression logs are never deleted, never updated except `verified` flag
3. **Soft deletes** — nothing hard-deleted in production; use `deleted_at` timestamp
4. **Audit timestamps** — every table has `created_at`, most have `updated_at`
5. **All money in cents (integer)** — no floating point for financial data
6. **Enum types defined in PostgreSQL** — enforced at DB level, not just application level

---

## Enum Types

```sql
CREATE TYPE user_role AS ENUM ('advertiser', 'operator', 'driver', 'admin');
CREATE TYPE org_type AS ENUM ('advertiser', 'fleet_operator');
CREATE TYPE account_status AS ENUM ('pending', 'active', 'suspended');
CREATE TYPE campaign_status AS ENUM (
  'draft', 'submitted', 'approved', 'scheduled', 'active', 'paused', 'completed', 'cancelled'
);
CREATE TYPE creative_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE creative_type AS ENUM ('video', 'image');
CREATE TYPE device_status AS ENUM ('active', 'offline', 'suspended');
CREATE TYPE impression_status AS ENUM ('valid', 'invalid', 'suspicious');
CREATE TYPE payout_status AS ENUM ('pending', 'approved', 'processing', 'paid', 'held');
CREATE TYPE ledger_type AS ENUM ('credit', 'debit');
CREATE TYPE ledger_status AS ENUM ('pending', 'completed', 'failed');
```

---

## Core Tables

### organizations
```sql
CREATE TABLE organizations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(255) NOT NULL,
  type            org_type NOT NULL,
  contact_email   VARCHAR(255),
  contact_phone   VARCHAR(50),
  revenue_share_pct SMALLINT DEFAULT 35 CHECK (revenue_share_pct BETWEEN 0 AND 100),
  status          account_status NOT NULL DEFAULT 'pending',
  metadata        JSONB DEFAULT '{}',           -- flexible extra fields
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_orgs_type ON organizations(type);
CREATE INDEX idx_orgs_status ON organizations(status);
```

### users
```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID REFERENCES organizations(id),
  email           VARCHAR(255) NOT NULL UNIQUE,
  password_hash   VARCHAR(255) NOT NULL,
  name            VARCHAR(255) NOT NULL,
  role            user_role NOT NULL,
  status          account_status NOT NULL DEFAULT 'pending',
  last_login_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_org ON users(org_id);
CREATE INDEX idx_users_role ON users(role);
```

### refresh_tokens
```sql
CREATE TABLE refresh_tokens (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash      VARCHAR(255) NOT NULL UNIQUE,  -- SHA-256 of token
  expires_at      TIMESTAMPTZ NOT NULL,
  revoked_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_tokens_hash ON refresh_tokens(token_hash);

-- Auto-cleanup expired tokens (run weekly)
-- DELETE FROM refresh_tokens WHERE expires_at < NOW() - INTERVAL '1 day';
```

### vehicles
```sql
CREATE TABLE vehicles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id     UUID NOT NULL REFERENCES organizations(id),
  plate_number    VARCHAR(50) NOT NULL,
  make            VARCHAR(100),
  model           VARCHAR(100),
  year            SMALLINT,
  status          account_status NOT NULL DEFAULT 'active',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_vehicles_plate_operator ON vehicles(plate_number, operator_id);
CREATE INDEX idx_vehicles_operator ON vehicles(operator_id);
```

### devices
```sql
CREATE TABLE devices (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_uuid       VARCHAR(255) NOT NULL UNIQUE,   -- hardware identifier
  api_key_hash      VARCHAR(255) NOT NULL,           -- SHA-256 of plain API key
  vehicle_id        UUID REFERENCES vehicles(id),
  operator_id       UUID NOT NULL REFERENCES organizations(id),
  status            device_status NOT NULL DEFAULT 'active',
  last_seen_at      TIMESTAMPTZ,
  last_gps_lat      DECIMAL(10, 7),
  last_gps_lng      DECIMAL(10, 7),
  app_version       VARCHAR(50),
  os_version        VARCHAR(50),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_devices_operator ON devices(operator_id);
CREATE INDEX idx_devices_status ON devices(status);
CREATE INDEX idx_devices_last_seen ON devices(last_seen_at);
-- Partial index for active devices only (most queries target active)
CREATE INDEX idx_devices_active ON devices(operator_id) WHERE status = 'active';
```

---

## Campaign Tables

### campaigns
```sql
CREATE TABLE campaigns (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id            UUID NOT NULL REFERENCES organizations(id),
  name              VARCHAR(255) NOT NULL,
  status            campaign_status NOT NULL DEFAULT 'draft',
  -- Budget stored in cents to avoid float precision issues
  budget_total_cents   INTEGER NOT NULL CHECK (budget_total_cents > 0),
  budget_spent_cents   INTEGER NOT NULL DEFAULT 0,
  cpm_rate_cents       INTEGER,                -- CPM in cents (e.g., 650 = $6.50)
  start_date        DATE NOT NULL,
  end_date          DATE NOT NULL,
  -- Geo targeting
  geo_city          VARCHAR(100),
  geo_lat           DECIMAL(10, 7),
  geo_lng           DECIMAL(10, 7),
  geo_radius_km     DECIMAL(6, 2) DEFAULT 50,
  -- Metadata
  rejection_note    TEXT,
  approved_by       UUID REFERENCES users(id),
  approved_at       TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT campaigns_dates_valid CHECK (end_date >= start_date),
  CONSTRAINT campaigns_budget_not_overspent CHECK (budget_spent_cents <= budget_total_cents)
);

CREATE INDEX idx_campaigns_org ON campaigns(org_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
-- Compound index for the "find active campaigns for scheduling" query
CREATE INDEX idx_campaigns_active_dates ON campaigns(start_date, end_date)
  WHERE status IN ('active', 'scheduled');
```

### ad_creatives
```sql
CREATE TABLE ad_creatives (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id       UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  file_key          VARCHAR(500) NOT NULL,         -- R2/S3 object key
  cdn_url           TEXT NOT NULL,                  -- public CDN URL
  file_type         creative_type NOT NULL,
  file_size_bytes   BIGINT,
  duration_seconds  SMALLINT,                       -- NULL for images
  file_hash_md5     VARCHAR(32),                    -- for integrity check on device
  status            creative_status NOT NULL DEFAULT 'pending',
  rejection_note    TEXT,
  reviewed_by       UUID REFERENCES users(id),
  reviewed_at       TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_creatives_campaign ON ad_creatives(campaign_id);
CREATE INDEX idx_creatives_status ON ad_creatives(status);
```

### campaign_schedules
```sql
-- Generated daily by the schedule generation job
-- One row per (device, campaign, day)
CREATE TABLE campaign_schedules (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id       UUID NOT NULL REFERENCES campaigns(id),
  device_id         UUID NOT NULL REFERENCES devices(id),
  creative_id       UUID NOT NULL REFERENCES ad_creatives(id),
  schedule_date     DATE NOT NULL,
  interval_seconds  SMALLINT NOT NULL DEFAULT 300,
  priority          SMALLINT NOT NULL DEFAULT 1,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(campaign_id, device_id, schedule_date)
);

-- Critical: device fetches its schedule for today
CREATE INDEX idx_schedules_device_date ON campaign_schedules(device_id, schedule_date);
CREATE INDEX idx_schedules_campaign ON campaign_schedules(campaign_id);
```

---

## Event Tables

### ad_impression_logs
**This table grows fastest. Partition by month.**

```sql
CREATE TABLE ad_impression_logs (
  id                  UUID NOT NULL DEFAULT gen_random_uuid(),
  device_id           UUID NOT NULL REFERENCES devices(id),
  campaign_id         UUID NOT NULL REFERENCES campaigns(id),
  creative_id         UUID NOT NULL REFERENCES ad_creatives(id),
  played_at           TIMESTAMPTZ NOT NULL,          -- device clock time
  received_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  gps_lat             DECIMAL(10, 7),
  gps_lng             DECIMAL(10, 7),
  duration_played_ms  INTEGER,                       -- milliseconds played
  is_complete         BOOLEAN NOT NULL DEFAULT FALSE,
  batch_id            UUID NOT NULL,                 -- from device sync batch
  device_sequence     BIGINT NOT NULL,               -- monotonic per device
  verified            BOOLEAN NOT NULL DEFAULT FALSE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Composite PK includes played_at for partition pruning
  PRIMARY KEY (id, played_at)
) PARTITION BY RANGE (played_at);

-- Create monthly partitions (script creates these in advance)
CREATE TABLE ad_impression_logs_2026_05
  PARTITION OF ad_impression_logs
  FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');

CREATE TABLE ad_impression_logs_2026_06
  PARTITION OF ad_impression_logs
  FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
-- (script auto-generates future months 3 months ahead)

-- Indexes on the parent table (propagate to partitions)
CREATE INDEX idx_logs_device ON ad_impression_logs(device_id, played_at);
CREATE INDEX idx_logs_campaign ON ad_impression_logs(campaign_id, played_at);
CREATE INDEX idx_logs_unverified ON ad_impression_logs(verified, created_at)
  WHERE verified = FALSE;  -- partial index — only unverified rows
CREATE UNIQUE INDEX idx_logs_dedup ON ad_impression_logs(device_id, device_sequence);
```

### verified_impressions
```sql
CREATE TABLE verified_impressions (
  id              UUID NOT NULL DEFAULT gen_random_uuid(),
  log_id          UUID NOT NULL,                    -- references ad_impression_logs.id
  played_at       TIMESTAMPTZ NOT NULL,             -- copied from log (for partition join)
  campaign_id     UUID NOT NULL REFERENCES campaigns(id),
  device_id       UUID NOT NULL REFERENCES devices(id),
  operator_id     UUID NOT NULL REFERENCES organizations(id),
  verified_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status          impression_status NOT NULL,
  invalid_reason  VARCHAR(100),

  PRIMARY KEY (id, verified_at)
) PARTITION BY RANGE (verified_at);

-- Same monthly partition pattern as impression_logs

CREATE INDEX idx_verified_campaign ON verified_impressions(campaign_id, verified_at);
CREATE INDEX idx_verified_operator ON verified_impressions(operator_id, verified_at);
CREATE INDEX idx_verified_status ON verified_impressions(status);
CREATE UNIQUE INDEX idx_verified_log ON verified_impressions(log_id);
```

### device_heartbeats
**High write volume. Partition by day (not month — queries always target last 24h).**

```sql
CREATE TABLE device_heartbeats (
  id              UUID NOT NULL DEFAULT gen_random_uuid(),
  device_id       UUID NOT NULL REFERENCES devices(id),
  timestamp       TIMESTAMPTZ NOT NULL,
  gps_lat         DECIMAL(10, 7),
  gps_lng         DECIMAL(10, 7),
  network_type    VARCHAR(20),
  app_version     VARCHAR(50),
  battery_level   SMALLINT,

  PRIMARY KEY (id, timestamp)
) PARTITION BY RANGE (timestamp);

-- Retain only 30 days of heartbeat data (cron job drops old partitions)
-- New partition created daily by maintenance job

CREATE INDEX idx_heartbeats_device_time ON device_heartbeats(device_id, timestamp);
```

---

## Analytics Tables

### campaign_stats
**Pre-aggregated. Rebuilt every 15 minutes by background job.**

```sql
CREATE TABLE campaign_stats (
  campaign_id             UUID PRIMARY KEY REFERENCES campaigns(id),
  total_logs_received     BIGINT NOT NULL DEFAULT 0,
  valid_impressions       BIGINT NOT NULL DEFAULT 0,
  invalid_impressions     BIGINT NOT NULL DEFAULT 0,
  suspicious_count        INTEGER NOT NULL DEFAULT 0,
  unique_devices          INTEGER NOT NULL DEFAULT 0,
  completion_rate         DECIMAL(5, 2) NOT NULL DEFAULT 0,
  budget_spent_cents      INTEGER NOT NULL DEFAULT 0,
  last_impression_at      TIMESTAMPTZ,
  last_aggregated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### daily_device_stats
**Daily rollup per device. Drives operator earnings calculation.**

```sql
CREATE TABLE daily_device_stats (
  device_id               UUID NOT NULL REFERENCES devices(id),
  stat_date               DATE NOT NULL,
  impressions_valid       INTEGER NOT NULL DEFAULT 0,
  heartbeat_minutes       INTEGER NOT NULL DEFAULT 0,   -- minutes with active heartbeat
  expected_minutes        INTEGER NOT NULL DEFAULT 840,  -- 14h operating window default
  uptime_pct              DECIMAL(5, 2) GENERATED ALWAYS AS
                            (ROUND(heartbeat_minutes::decimal / expected_minutes * 100, 2)) STORED,

  PRIMARY KEY (device_id, stat_date)
);

CREATE INDEX idx_daily_stats_date ON daily_device_stats(stat_date);
```

---

## Payment Tables

### operator_earnings
```sql
CREATE TABLE operator_earnings (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id           UUID NOT NULL REFERENCES organizations(id),
  device_id             UUID NOT NULL REFERENCES devices(id),
  period_start          DATE NOT NULL,
  period_end            DATE NOT NULL,
  valid_impressions     BIGINT NOT NULL DEFAULT 0,
  gross_revenue_cents   INTEGER NOT NULL DEFAULT 0,
  revenue_share_pct     SMALLINT NOT NULL,
  payout_amount_cents   INTEGER NOT NULL DEFAULT 0,
  status                payout_status NOT NULL DEFAULT 'pending',
  held_reason           TEXT,
  paid_at               TIMESTAMPTZ,
  payment_ref           VARCHAR(255),
  approved_by           UUID REFERENCES users(id),
  approved_at           TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(operator_id, device_id, period_start)
);

CREATE INDEX idx_earnings_operator ON operator_earnings(operator_id);
CREATE INDEX idx_earnings_status ON operator_earnings(status);
```

### payment_ledger
**Append-only. Never update or delete rows.**

```sql
CREATE TABLE payment_ledger (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL REFERENCES organizations(id),
  type            ledger_type NOT NULL,
  amount_cents    INTEGER NOT NULL,
  currency        CHAR(3) NOT NULL DEFAULT 'USD',
  reference_type  VARCHAR(50),                    -- 'campaign', 'payout', 'topup'
  reference_id    UUID,                            -- FK to the referenced record
  description     TEXT,
  status          ledger_status NOT NULL DEFAULT 'pending',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ledger_org ON payment_ledger(org_id, created_at);
CREATE INDEX idx_ledger_reference ON payment_ledger(reference_type, reference_id);
```

---

## Indexing Strategy Summary

| Table | High-frequency queries | Key indexes |
|---|---|---|
| `campaigns` | Find active campaigns by date | `(status, start_date, end_date)` |
| `devices` | Find online devices by operator | `(operator_id)` + partial `WHERE status='active'` |
| `ad_impression_logs` | Find unverified logs | Partial `WHERE verified=FALSE` |
| `ad_impression_logs` | Deduplication by sequence | `UNIQUE(device_id, device_sequence)` |
| `campaign_schedules` | Device schedule fetch | `(device_id, schedule_date)` |
| `device_heartbeats` | Heartbeat correlation for verification | `(device_id, timestamp)` |
| `verified_impressions` | Campaign reporting | `(campaign_id, verified_at)` |
| `verified_impressions` | Operator earnings | `(operator_id, verified_at)` |

---

## Migration Strategy

Migrations use numbered SQL files, applied in order:

```
migrations/
├── 001_create_enums.sql
├── 002_create_organizations.sql
├── 003_create_users.sql
├── 004_create_vehicles_devices.sql
├── 005_create_campaigns.sql
├── 006_create_creatives.sql
├── 007_create_schedules.sql
├── 008_create_impression_logs_partitioned.sql
├── 009_create_heartbeats_partitioned.sql
├── 010_create_analytics_tables.sql
├── 011_create_payment_tables.sql
└── 012_create_indexes.sql
```

**Tool:** `node-pg-migrate` or Flyway. Run automatically on deploy.
**Rule:** Never modify existing migrations. Always add new ones.

---

## Maintenance Jobs

| Job | Frequency | Action |
|---|---|---|
| Partition creation | Weekly | Create next month's partitions for logs + heartbeats |
| Partition drop | Monthly | Drop partitions older than 30 days (heartbeats) |
| Token cleanup | Weekly | Delete expired refresh tokens |
| Vacuum schedule | Nightly (PostgreSQL autovacuum) | Keep impression_logs table healthy |

**Partition creation script runs weekly via background job:**
```sql
-- Creates next 3 months of partitions if they don't exist
-- Ensures partitions always exist for upcoming dates
```
