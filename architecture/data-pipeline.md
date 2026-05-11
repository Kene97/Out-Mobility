# Data Pipeline — Out-door

How data flows from a tablet screen play to a verified impression in a dashboard.

---

## Pipeline Overview

```
[TABLET] plays ad
    │
    ▼ (every 5 minutes or on reconnect)
[INGESTION] POST /device/events
    │  Batch insert → ad_impression_logs (raw, unverified)
    │  Return 200 immediately — no waiting for verification
    │
    ▼ (background, every 5 minutes)
[VERIFICATION] verify-impressions worker
    │  8 checks per log event
    │  Write to verified_impressions
    │  Mark ad_impression_logs.verified = true
    │
    ▼ (background, every 15 minutes)
[AGGREGATION] aggregate-stats worker
    │  Re-compute campaign_stats from verified_impressions
    │  Update daily_device_stats
    │  Update campaigns.budget_spent_cents
    │
    ▼ (background, 02:00 daily)
[RECONCILIATION] reconcile-daily worker
    │  Full recount from source of truth
    │  Correct any drift in aggregated tables
    │  Lock the day's numbers
    │  Generate operator_earnings records for completed day
    │
    ▼ (on demand)
[ANALYTICS API] GET /campaigns/:id/stats
    │  Reads from campaign_stats (pre-aggregated, fast)
    │  Returns in <100ms
```

---

## Layer 1: Ingestion

**Endpoint:** `POST /device/events`

**Purpose:** Accept device logs as fast as possible. No heavy processing on ingest path.

```typescript
// events/events.service.ts
async function ingestEvents(deviceId: string, batch: EventBatch) {
  // 1. Idempotency check (fast lookup by batch_id)
  const isDuplicate = await eventsRepo.batchExists(batch.batchId, deviceId)
  if (isDuplicate) return { received: 0, skipped: batch.events.length, duplicate: true }

  // 2. Basic validation (fast — no DB lookups per event)
  const validEvents = batch.events.filter(e => {
    return e.played_at && e.campaign_id && e.creative_id  // required fields only
  })

  // 3. Bulk insert (one query, not N queries)
  await eventsRepo.insertBulk(
    validEvents.map(e => ({
      deviceId,
      ...e,
      receivedAt: new Date(),
      verified: false
    }))
  )

  return { received: validEvents.length }
}
```

**Performance target:** Handle 1,000 events/second on a single server.
At MVP scale (200 devices × 20 events/hour): ~1 event/second. Very comfortable.

**Batch insert pattern (PostgreSQL):**
```typescript
// Single query for N rows — critical for performance
const values = events.map((e, i) =>
  `($${i*8+1}, $${i*8+2}, ..., $${i*8+8})`
).join(', ')

await db.query(`
  INSERT INTO ad_impression_logs
    (device_id, campaign_id, creative_id, played_at, received_at,
     gps_lat, gps_lng, duration_played_ms, is_complete, batch_id,
     device_sequence, verified)
  VALUES ${values}
  ON CONFLICT (device_id, device_sequence) DO NOTHING
`, flattenedParams)
```

`ON CONFLICT DO NOTHING` handles duplicate sequence numbers gracefully.

---

## Layer 2: Verification

**Worker:** `verify-impressions.worker.ts`
**Runs:** Every 5 minutes via pg-boss cron
**Batch size:** 1,000 logs per run

```typescript
// workers/verify-impressions.worker.ts
async function verifyImpressionsWorker() {
  // Fetch unverified logs (oldest first — FIFO)
  const logs = await db.query(`
    SELECT l.*, d.operator_id, d.last_gps_lat, d.last_gps_lng
    FROM ad_impression_logs l
    JOIN devices d ON l.device_id = d.id
    WHERE l.verified = FALSE
      AND l.created_at < NOW() - INTERVAL '1 minute'  -- give batch sync a moment to complete
    ORDER BY l.created_at ASC
    LIMIT 1000
    FOR UPDATE SKIP LOCKED  -- prevents two workers from processing the same rows
  `)

  const results = await Promise.all(logs.rows.map(log => verifyLog(log)))
  
  // Bulk insert verified_impressions
  await db.query(`
    INSERT INTO verified_impressions (log_id, played_at, campaign_id, device_id, operator_id, status, invalid_reason)
    VALUES ${placeholders}
  `, resultParams)
  
  // Mark logs as verified (batch update)
  await db.query(`
    UPDATE ad_impression_logs
    SET verified = TRUE
    WHERE id = ANY($1)
  `, [logs.rows.map(l => l.id)])
}
```

**`FOR UPDATE SKIP LOCKED`** is the key pattern:
- Allows multiple verification workers to run in parallel without collisions
- Each worker locks 1,000 rows, skipping any already locked by another worker
- Safe for horizontal scaling (just run more workers)

---

## Layer 3: Verification Checks

Each check is a pure function: `(log, context) → { pass: boolean, reason?: string }`

```typescript
// verification/verification.checks.ts

export const checks: VerificationCheck[] = [
  {
    name: 'device_active',
    severity: 'hard',  // hard = fail → invalid (not suspicious)
    run: async (log, ctx) => ({
      pass: ctx.device.status === 'active',
      reason: 'device_not_active'
    })
  },
  {
    name: 'campaign_window',
    severity: 'hard',
    run: async (log, ctx) => ({
      pass: log.playedAt >= ctx.campaign.startDate &&
            log.playedAt <= ctx.campaign.endDate,
      reason: 'outside_campaign_window'
    })
  },
  {
    name: 'timestamp_plausible',
    severity: 'hard',
    run: async (log) => {
      const ageMs = Date.now() - log.playedAt.getTime()
      const future = log.playedAt > new Date()
      return {
        pass: !future && ageMs < 7 * 24 * 60 * 60 * 1000,
        reason: future ? 'timestamp_future' : 'timestamp_too_old'
      }
    }
  },
  {
    name: 'heartbeat_correlation',
    severity: 'soft',  // soft = fail → suspicious (not invalid)
    run: async (log, ctx) => {
      const heartbeatCount = await ctx.db.query(`
        SELECT COUNT(*) FROM device_heartbeats
        WHERE device_id = $1
          AND timestamp BETWEEN $2 - INTERVAL '3 minutes'
                            AND $2 + INTERVAL '3 minutes'
      `, [log.deviceId, log.playedAt])
      return {
        pass: heartbeatCount > 0,
        reason: 'no_heartbeat_correlation'
      }
    }
  },
  {
    name: 'gps_plausible',
    severity: 'soft',
    run: async (log) => {
      if (!log.gpsLat || !log.gpsLng) return { pass: false, reason: 'missing_gps' }
      const isNullIsland = Math.abs(log.gpsLat) < 0.01 && Math.abs(log.gpsLng) < 0.01
      const isValidRange = log.gpsLat >= -90 && log.gpsLat <= 90 &&
                           log.gpsLng >= -180 && log.gpsLng <= 180
      return { pass: isValidRange && !isNullIsland, reason: 'invalid_gps' }
    }
  },
  {
    name: 'duplicate',
    severity: 'hard',
    run: async (log, ctx) => {
      // device_sequence uniqueness already enforced by DB constraint
      // This checks for same (device, campaign, timestamp) within ±30s
      const dup = await ctx.db.query(`
        SELECT 1 FROM verified_impressions
        WHERE device_id = $1 AND campaign_id = $2
          AND played_at BETWEEN $3 - INTERVAL '30 seconds'
                            AND $3 + INTERVAL '30 seconds'
        LIMIT 1
      `, [log.deviceId, log.campaignId, log.playedAt])
      return { pass: dup.rowCount === 0, reason: 'duplicate_impression' }
    }
  },
  {
    name: 'rate_anomaly',
    severity: 'soft',
    run: async (log, ctx) => {
      const hourlyCount = await ctx.db.query(`
        SELECT COUNT(*) FROM ad_impression_logs
        WHERE device_id = $1
          AND played_at BETWEEN DATE_TRUNC('hour', $2)
                            AND DATE_TRUNC('hour', $2) + INTERVAL '1 hour'
      `, [log.deviceId, log.playedAt])
      return { pass: hourlyCount <= 20, reason: 'rate_anomaly' }
    }
  }
]

// Classification logic
function classify(results: CheckResult[]): impression_status {
  if (results.some(r => r.check.severity === 'hard' && !r.pass)) return 'invalid'
  if (results.some(r => !r.pass)) return 'suspicious'
  return 'valid'
}
```

---

## Layer 4: Aggregation

**Worker:** `aggregate-stats.worker.ts`
**Runs:** Every 15 minutes

```typescript
async function aggregateStatsWorker() {
  const activeCampaigns = await campaignRepo.findByStatus(['active', 'paused', 'completed'])
  
  for (const campaign of activeCampaigns) {
    const stats = await db.query(`
      SELECT
        COUNT(*) FILTER (WHERE status = 'valid')       AS valid_impressions,
        COUNT(*) FILTER (WHERE status = 'invalid')     AS invalid_impressions,
        COUNT(*) FILTER (WHERE status = 'suspicious')  AS suspicious_count,
        COUNT(DISTINCT device_id)                       AS unique_devices,
        MAX(played_at)                                  AS last_impression_at
      FROM verified_impressions
      WHERE campaign_id = $1
    `, [campaign.id])
    
    const spentCents = Math.floor(
      stats.valid_impressions * campaign.cpmRateCents / 1000
    )
    
    await db.query(`
      INSERT INTO campaign_stats (campaign_id, valid_impressions, invalid_impressions,
        suspicious_count, unique_devices, budget_spent_cents, last_impression_at, last_aggregated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      ON CONFLICT (campaign_id) DO UPDATE SET
        valid_impressions = EXCLUDED.valid_impressions,
        invalid_impressions = EXCLUDED.invalid_impressions,
        suspicious_count = EXCLUDED.suspicious_count,
        unique_devices = EXCLUDED.unique_devices,
        budget_spent_cents = EXCLUDED.budget_spent_cents,
        last_impression_at = EXCLUDED.last_impression_at,
        last_aggregated_at = NOW()
    `, [campaign.id, stats.valid_impressions, /* ... */])
    
    // Also update campaign.budget_spent_cents
    await campaignRepo.updateSpend(campaign.id, spentCents)
    
    // Check for budget exhaustion
    if (spentCents >= campaign.budgetTotalCents) {
      await campaignService.completeCampaign(campaign.id, 'budget_exhausted')
    }
  }
}
```

---

## Layer 5: Daily Reconciliation

**Worker:** `reconcile-daily.worker.ts`
**Runs:** 02:00 daily (low-traffic window)

Purpose: Fix any drift between aggregated tables and source of truth.

```typescript
async function reconcileDailyWorker() {
  const yesterday = getYesterday()
  
  // 1. Recompute all campaign stats for yesterday from raw source
  const allCampaigns = await campaignRepo.findActiveOnDate(yesterday)
  
  for (const campaign of allCampaigns) {
    await recomputeCampaignStats(campaign.id, yesterday)
  }
  
  // 2. Compute daily device stats for yesterday
  const allDevices = await deviceRepo.findAll()
  for (const device of allDevices) {
    await computeDailyDeviceStats(device.id, yesterday)
  }
  
  // 3. Generate operator_earnings for yesterday
  await generateDailyEarnings(yesterday)
  
  // 4. Log reconciliation completion
  await db.query(`
    INSERT INTO reconciliation_log (reconcile_date, completed_at, campaigns_processed)
    VALUES ($1, NOW(), $2)
  `, [yesterday, allCampaigns.length])
}
```

**Operator earnings calculation:**
```typescript
async function generateDailyEarnings(date: Date) {
  const result = await db.query(`
    INSERT INTO operator_earnings (operator_id, device_id, period_start, period_end,
      valid_impressions, gross_revenue_cents, revenue_share_pct, payout_amount_cents)
    SELECT
      d.operator_id,
      vi.device_id,
      $1 AS period_start,
      $1 AS period_end,
      COUNT(*) FILTER (WHERE vi.status = 'valid') AS valid_impressions,
      SUM(c.cpm_rate_cents)
        FILTER (WHERE vi.status = 'valid') / 1000 AS gross_revenue_cents,
      o.revenue_share_pct,
      SUM(c.cpm_rate_cents)
        FILTER (WHERE vi.status = 'valid') / 1000
        * o.revenue_share_pct / 100 AS payout_amount_cents
    FROM verified_impressions vi
    JOIN devices d ON vi.device_id = d.id
    JOIN campaigns c ON vi.campaign_id = c.id
    JOIN organizations o ON d.operator_id = o.id
    WHERE DATE(vi.verified_at AT TIME ZONE 'UTC') = $1
    GROUP BY d.operator_id, vi.device_id, o.revenue_share_pct
    ON CONFLICT (operator_id, device_id, period_start) DO UPDATE SET
      valid_impressions = EXCLUDED.valid_impressions,
      gross_revenue_cents = EXCLUDED.gross_revenue_cents,
      payout_amount_cents = EXCLUDED.payout_amount_cents
  `, [date])
}
```

---

## Analytics Query Patterns

All dashboard analytics queries read from pre-aggregated tables:

**Campaign live stats (fast path):**
```sql
SELECT * FROM campaign_stats WHERE campaign_id = $1
-- Returns in <5ms (single row, indexed PK)
```

**Campaign time series (medium — for chart):**
```sql
SELECT
  DATE(played_at AT TIME ZONE 'UTC') AS day,
  COUNT(*) FILTER (WHERE status = 'valid') AS impressions,
  COUNT(DISTINCT device_id) AS devices
FROM verified_impressions
WHERE campaign_id = $1
  AND played_at BETWEEN $2 AND $3
GROUP BY day
ORDER BY day
-- Returns in ~50ms for 90-day campaigns (partition pruning keeps this fast)
```

**Per-device breakdown:**
```sql
SELECT
  vi.device_id,
  COUNT(*) FILTER (WHERE vi.status = 'valid') AS impressions,
  ROUND(AVG(dds.uptime_pct), 1) AS avg_uptime_pct
FROM verified_impressions vi
JOIN daily_device_stats dds ON vi.device_id = dds.device_id
WHERE vi.campaign_id = $1
GROUP BY vi.device_id
ORDER BY impressions DESC
```

---

## Real-Time vs Batch Decision

| Data | Freshness needed | Approach |
|---|---|---|
| Campaign impression count | 15 min | Batch aggregation (campaign_stats) |
| Campaign budget spent | 15 min | Same — aggregation job |
| Device online/offline | 5 min | Live query on devices.last_seen_at |
| System health metrics | 30 sec | Live query on each /admin/system/health call |
| Fraud flags | 5 min | Generated during verification job |
| Operator earnings | Daily | Reconciliation job |
| Reports (CSV/PDF) | On demand | Query verified_impressions directly |

**No real-time streaming needed at MVP scale.**
At 10,000 devices and 100M impressions/month: move ingestion to SQS + Lambda consumer. Schema doesn't change.
