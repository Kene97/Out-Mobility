# Observability & Monitoring — Out-door

**Goal:** A team of 1–3 people can know the state of the entire network
in under 30 seconds, and know exactly what to do about any problem.

---

## Observability Stack (MVP — Low Cost)

| Layer | Tool | Cost | Purpose |
|---|---|---|---|
| Structured logging | Pino (Node.js) | Free | JSON logs from backend |
| Log aggregation | Better Stack (Logtail) | Free tier | Searchable logs, 3GB/month free |
| Error tracking | Sentry | Free tier | Exceptions + stack traces |
| Uptime monitoring | Better Uptime | Free | External ping every 5 min |
| Metrics | Custom `/health` endpoint | Free | Internal API + DB health |
| Alerts | SendGrid (email) | Free tier | Critical alerts to admin |
| APM (future) | Datadog or Grafana Cloud | — | Phase 2+ |

**Total MVP observability cost: $0/month.**
Switch to paid tiers when logs or errors exceed free limits.

---

## Structured Logging (Pino)

Every backend log is structured JSON — never plain strings.

```typescript
// infrastructure/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  base: {
    service: 'out-door-api',
    env: process.env.NODE_ENV,
    version: process.env.APP_VERSION
  }
})

// Usage in service:
logger.info({ campaignId, deviceCount }, 'Schedule generated')
logger.error({ err, campaignId }, 'Failed to generate schedule')
logger.warn({ deviceId, reason }, 'Fraud flag created')
```

**Log levels:**
| Level | When |
|---|---|
| `error` | Unhandled exceptions, external service failures, data integrity issues |
| `warn` | Fraud flags, device offline alerts, rate limit hits, retry attempts |
| `info` | Campaign status transitions, device registrations, payout approvals |
| `debug` | Request/response bodies, verification check results (dev only) |

**Never log:** passwords, API keys, raw device keys, PII (full GPS tracks), payment references.

---

## Request Logging Middleware

Every HTTP request logged automatically:

```typescript
// Log format per request
{
  "level": "info",
  "service": "out-door-api",
  "method": "POST",
  "url": "/device/events",
  "statusCode": 200,
  "responseTimeMs": 12,
  "deviceId": "uuid...",      // from device context
  "requestId": "uuid...",     // per-request trace ID
  "timestamp": "2026-05-04T09:14:22.123Z"
}
```

`requestId` (UUID) is generated per request and returned as `X-Request-Id` header.
Allows correlating logs for a single request across multiple log lines.

---

## Health Check Endpoint

**Public:** `GET /health` — used by uptime monitor
```json
{ "status": "ok", "timestamp": "2026-05-04T09:14:22Z" }
```
Returns 200 if app is running. Returns 503 if DB connection fails.

**Internal:** `GET /admin/system/health` — used by admin dashboard
```typescript
// admin/admin.service.ts
async function getSystemHealth() {
  const [dbHealth, jobHealth, deviceHealth, pipelineHealth] = await Promise.all([
    checkDatabase(),
    checkJobQueue(),
    checkDeviceFleet(),
    checkPipeline()
  ])
  
  return {
    status: allHealthy([dbHealth, jobHealth, deviceHealth, pipelineHealth]) ? 'ok' : 'degraded',
    timestamp: new Date(),
    checks: { db: dbHealth, jobs: jobHealth, devices: deviceHealth, pipeline: pipelineHealth }
  }
}

async function checkDatabase() {
  const start = Date.now()
  await db.query('SELECT 1')
  return { status: 'ok', latencyMs: Date.now() - start }
}

async function checkDeviceFleet() {
  const result = await db.query(`
    SELECT
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE last_seen_at > NOW() - INTERVAL '5 minutes') AS online,
      COUNT(*) FILTER (WHERE last_seen_at < NOW() - INTERVAL '1 hour')   AS offline
    FROM devices WHERE status = 'active'
  `)
  const { total, online, offline } = result.rows[0]
  const uptimePct = total > 0 ? Math.round(online / total * 100) : 100
  
  return {
    status: uptimePct >= 70 ? 'ok' : uptimePct >= 50 ? 'warning' : 'critical',
    totalDevices: total,
    onlineDevices: online,
    offlineDevices: offline,
    fleetUptimePct: uptimePct
  }
}

async function checkPipeline() {
  const lag = await db.query(`
    SELECT
      COUNT(*) FILTER (WHERE verified = FALSE) AS unverified_count,
      MIN(created_at) AS oldest_unverified
    FROM ad_impression_logs
    WHERE verified = FALSE
  `)
  
  const lagMinutes = lag.oldest_unverified
    ? Math.floor((Date.now() - lag.oldest_unverified) / 60000)
    : 0
    
  return {
    status: lagMinutes < 10 ? 'ok' : lagMinutes < 30 ? 'warning' : 'critical',
    unverifiedCount: lag.unverified_count,
    lagMinutes
  }
}
```

---

## Alert System

Alerts are sent via email (SendGrid) when thresholds are breached.

**Alert definitions:**

| Alert | Threshold | Severity | Recipients |
|---|---|---|---|
| Fleet uptime below 70% | `online_devices / total < 0.70` | High | Admin email |
| Device offline >2h | Individual device | Medium | Admin email |
| Verification lag >30 min | `oldest_unverified > 30 min` | High | Admin email |
| Campaign budget exhausted | budget_spent >= budget_total | Info | Advertiser email |
| Campaign approved | Status → active | Info | Advertiser email |
| Fraud flag created | New suspicious batch | Medium | Admin email |
| Job failure | pg-boss job failed 3× | High | Admin email |
| API error rate >5% | 5xx responses / total > 5% | High | Admin email |

**Alert implementation:**

```typescript
// shared/alerts/alert.service.ts
export class AlertService {
  async sendAlert(alert: Alert) {
    logger.warn({ alertType: alert.type, severity: alert.severity }, 'Alert triggered')
    
    await emailService.send({
      to: alert.recipients,
      subject: `[${alert.severity.toUpperCase()}] ${alert.title}`,
      text: alert.body
    })
  }
}

// Alert check runs every 5 minutes (same as verification job)
async function checkAlerts() {
  const health = await adminService.getSystemHealth()
  
  if (health.checks.devices.fleetUptimePct < 70) {
    await alertService.sendAlert({
      type: 'FLEET_UPTIME_LOW',
      severity: 'high',
      title: 'Fleet uptime below threshold',
      body: `Fleet uptime: ${health.checks.devices.fleetUptimePct}%. ${health.checks.devices.offlineDevices} devices offline.`,
      recipients: [process.env.ADMIN_ALERT_EMAIL]
    })
  }
}
```

**Alert deduplication:** Don't send the same alert twice within 1 hour.
Track last-sent timestamp per alert type in the database or in-memory cache.

---

## Error Tracking (Sentry)

Unhandled exceptions are automatically captured:

```typescript
// app.ts
import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: config.SENTRY_DSN,
  environment: config.NODE_ENV,
  tracesSampleRate: 0.1,  // 10% of requests traced (perf impact)
})

// Global error handler
app.setErrorHandler((error, request, reply) => {
  if (!(error instanceof AppError)) {
    // Unexpected error — capture to Sentry
    Sentry.captureException(error, {
      extra: { requestId: request.id, url: request.url }
    })
    logger.error({ err: error, requestId: request.id }, 'Unhandled error')
    return reply.code(500).send({ success: false, error: { code: 'INTERNAL_ERROR' } })
  }
  
  // Known AppError — handle cleanly, don't send to Sentry
  reply.code(error.statusCode).send({
    success: false,
    error: { code: error.code, message: error.message, field: error.field }
  })
})
```

**Sentry grouping:** Each `AppError` subclass is a distinct issue type.
Unexpected errors are grouped by stack trace.

---

## Device Fraud Detection (Automated Flags)

The fraud detection runs during the verification job.
Flags are created when patterns exceed thresholds:

```typescript
// verification/verification.checks.ts
async function detectFraudPatterns(deviceId: string, date: Date) {
  // Check 1: Static GPS (same coordinates for >2 hours with impressions)
  const staticGps = await db.query(`
    SELECT COUNT(DISTINCT DATE_TRUNC('hour', timestamp)) AS hours_static
    FROM device_heartbeats
    WHERE device_id = $1
      AND DATE(timestamp) = $2
      AND ABS(gps_lat - (SELECT AVG(gps_lat) FROM device_heartbeats
                         WHERE device_id = $1 AND DATE(timestamp) = $2)) < 0.001
      AND ABS(gps_lng - (SELECT AVG(gps_lng) FROM device_heartbeats
                         WHERE device_id = $1 AND DATE(timestamp) = $2)) < 0.001
  `, [deviceId, date])

  if (staticGps.hours_static >= 2) {
    await createFraudFlag(deviceId, date, 'static_gps', staticGps.hours_static)
  }

  // Check 2: Impression rate spike
  const hourlyRates = await db.query(`
    SELECT
      DATE_TRUNC('hour', played_at) AS hour,
      COUNT(*) AS count
    FROM ad_impression_logs
    WHERE device_id = $1 AND DATE(played_at) = $2
    GROUP BY hour
    HAVING COUNT(*) > 20  -- threshold
  `, [deviceId, date])

  if (hourlyRates.rowCount > 0) {
    await createFraudFlag(deviceId, date, 'rate_anomaly', hourlyRates.rows[0].count)
  }
}
```

**Fraud flag table:**
```sql
CREATE TABLE fraud_flags (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id       UUID NOT NULL REFERENCES devices(id),
  flag_date       DATE NOT NULL,
  flag_type       VARCHAR(50) NOT NULL,  -- static_gps, rate_anomaly, etc.
  details         JSONB NOT NULL DEFAULT '{}',
  status          VARCHAR(20) NOT NULL DEFAULT 'pending',  -- pending, validated, invalidated
  resolved_by     UUID REFERENCES users(id),
  resolved_at     TIMESTAMPTZ,
  resolution_note TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(device_id, flag_date, flag_type)  -- one flag per type per day per device
);

CREATE INDEX idx_fraud_flags_status ON fraud_flags(status);
CREATE INDEX idx_fraud_flags_device ON fraud_flags(device_id);
```

---

## Performance Monitoring

Key query performance benchmarks (targets for MVP):

| Query | Target | Alert if |
|---|---|---|
| `GET /device/schedule` | <100ms | >500ms |
| `POST /device/events` (100 events) | <200ms | >1s |
| `POST /device/heartbeat` | <50ms | >200ms |
| `GET /campaigns/:id/stats` | <100ms | >500ms |
| `GET /admin/system/health` | <500ms | >2s |
| Verification job (1000 logs) | <30s | >120s |
| Aggregation job | <60s | >300s |

Track response times via Pino request logging. Alert via log monitoring when thresholds exceeded.

---

## Uptime Monitoring

**Better Uptime** (free tier) pings `GET /health` every 5 minutes from 3 regions.
Alert if 2 consecutive checks fail → email to admin.

Monitors:
- API: `https://api.outdoor.outmobility.io/health`
- CDN: `https://cdn.outmobility.io` (Cloudflare, should never be down)
- Admin dashboard: `https://admin.outdoor.outmobility.io`

Target SLA: **99.5% uptime** (allows ~3.6 hours downtime/month).
At MVP scale: single server, acceptable. Move to multi-AZ at scale.
