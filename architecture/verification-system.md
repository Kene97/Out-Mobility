# Verification System — Out-door

**Principle:** Trust but verify. Every device-reported impression must pass a set
of independent checks before it counts toward a campaign and triggers operator revenue.

No blockchain. No complexity. Just clean, reliable server-side verification.

---

## Verification Pipeline

```
Device submits batch
        │
        ▼
1. INGESTION
   Save raw logs to ad_impression_logs (unverified)
        │
        ▼
2. BATCH VALIDATION (immediate, synchronous)
   - Valid device ID?
   - Active campaign?
   - Timestamps plausible (not future, not >7 days old)?
   → Reject batch entirely if device or campaign is invalid
        │
        ▼
3. EVENT VERIFICATION (async, runs every 5 minutes)
   Per log event:
   - Timestamp validation
   - GPS validation
   - Heartbeat correlation
   - Duplicate detection
   - Schedule compliance
        │
        ▼
4. CLASSIFICATION
   Each event → valid | suspicious | invalid
        │
        ▼
5. AGGREGATION
   Valid events credited to campaign
   Suspicious events queued for admin review
   Invalid events permanently rejected
        │
        ▼
6. STATS UPDATE
   campaign_stats table updated
   operator_earnings accrued
```

---

## Verification Checks

### Check 1: Device Validity
```
device_id exists in devices table
device.status = 'active'
→ Fail: reject entire batch, flag device
```

### Check 2: Campaign Validity
```
campaign_id exists
campaign.status IN ('active')
event.played_at BETWEEN campaign.start_date AND campaign.end_date
→ Fail: mark event invalid, reason = "campaign_inactive" or "out_of_window"
```

### Check 3: Timestamp Plausibility
```
played_at <= now()                         -- not in the future
played_at >= now() - INTERVAL '7 days'     -- not too old
abs(played_at - received_at) < 24 hours    -- device clock not too skewed
→ Fail: mark event invalid, reason = "timestamp_invalid"
```

### Check 4: Heartbeat Correlation
```
Find heartbeats from same device within:
  played_at - 3 minutes TO played_at + 3 minutes

If no heartbeats found in window:
  → mark event suspicious, reason = "no_heartbeat_correlation"

Logic: if the device was truly alive and playing ads, it was also sending heartbeats.
```

### Check 5: GPS Validation
```
If event has GPS:
  - Coordinates within valid lat/lng range (-90/90, -180/180)
  - Not (0, 0) — null island check
  - Not static for >2 hours (same coordinates repeated constantly)
  - Within campaign geo_radius_km of campaign target

If GPS is missing:
  - Mark as suspicious (not invalid) — GPS can fail legitimately
  → reason = "missing_gps"
```

### Check 6: Duplicate Detection
```
Check: no existing log with same (device_id, campaign_id, device_sequence)
Check: no existing log with same (device_id, campaign_id, played_at) 
       within ±30 seconds

→ Fail: mark event invalid, reason = "duplicate"
```

### Check 7: Rate Anomaly
```
Count impressions per device per hour

If impressions_per_hour > threshold (default: 20 per hour per device):
  → Mark event suspicious, reason = "rate_anomaly"

Reasoning: a tablet can only play one ad at a time. 
At 30 seconds per ad, max ~120 per hour. Set threshold at 20 to be conservative.
```

### Check 8: Schedule Compliance
```
Does a campaign_schedule record exist for this (device_id, campaign_id, schedule_date)?
→ If no: mark suspicious, reason = "unscheduled_play"
   (Device played an ad it wasn't scheduled to play)
```

---

## Classification Outcomes

| Result | Condition | Action |
|---|---|---|
| **valid** | All checks pass | Count impression, accrue operator earning |
| **suspicious** | One soft check fails (heartbeat, GPS missing, rate) | Queue for admin review; do not count until resolved |
| **invalid** | Hard check fails (duplicate, timestamp, inactive campaign) | Permanently reject; do not count; no admin review needed |

---

## Fraud Flags

Automatically generated when a device shows a pattern of suspicious events:

| Flag | Trigger |
|---|---|
| Static GPS | Same coordinates for >2 hours with active impressions |
| Heartbeat gap | Impressions reported without heartbeats in surrounding window |
| Rate spike | Impressions/hour > 2x normal for that device |
| Batch anomaly | Batch submitted >24h after play timestamps |
| Device offline / then flood | Device was offline, reconnects with unusually large log batch |

**Fraud flag resolution:**
- Admin reviews evidence (heartbeat chart, GPS track, impression timeline)
- Admin can: validate (count the impressions), invalidate (reject), or suspend device

---

## Offline Sync Handling

When a device reconnects after offline period:

```
Device sends batch with played_at timestamps spanning multiple hours/days

Verification handles this correctly:
- Timestamp check allows up to 7 days old
- Heartbeat correlation checked against stored heartbeat attempts
  (heartbeats fail silently offline, but device still tries every 60s)
  → If heartbeat attempts stored locally and synced, correlation works
  → If no heartbeat data, impressions flagged as suspicious, not invalid
- Rate anomaly check uses per-hour buckets (large batch ≠ rate spike if spread across hours)
```

---

## Verification Job (Technical)

Background job runs every 5 minutes:

```sql
-- Fetch unverified logs
SELECT * FROM ad_impression_logs
WHERE verified = false
AND created_at < now() - INTERVAL '1 minute'  -- small delay to allow batch sync
ORDER BY created_at ASC
LIMIT 1000;

-- For each log, run all checks
-- Write result to verified_impressions
-- Update ad_impression_logs.verified = true
-- Update campaign_stats (batch update at end of job)
```

**Performance:**
- Process 1,000 events per job run
- At 5-minute intervals: 12,000 events/hour capacity
- For 200 devices × 20 impressions/hour = 4,000 events/hour → well within capacity
- Scale: increase batch size or add parallel workers as fleet grows

---

## Reconciliation

Daily reconciliation job (runs at 2am):

```
1. Count verified impressions per campaign (from verified_impressions)
2. Compare to campaign_stats.valid_impressions
3. If mismatch: recompute campaign_stats from verified_impressions (source of truth)
4. Update budget_spent based on verified impressions × cpm_rate
5. Trigger campaign completion if budget_spent >= budget_total
6. Generate daily operator earning records (operator_earnings)
```

---

## MVP vs Future

| Feature | MVP | Future |
|---|---|---|
| Verification | Server-side rules engine | ML anomaly detection |
| GPS check | Radius-based | Route-matching (was device on a real road?) |
| Heartbeat correlation | 3-minute window | Continuous timeline reconstruction |
| Duplicate detection | Sequence number + timestamp | Cryptographic event signing on device |
| Passenger verification | Not attempted | Camera-based occupancy estimation |
| Fraud scoring | Binary flag | Probabilistic fraud score |
