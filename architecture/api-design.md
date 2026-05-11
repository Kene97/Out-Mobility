# API Design — Out-door

**Style:** REST / JSON
**Auth:** JWT Bearer token (user-facing) | API Key (device-facing)
**Base URL:** `https://api.outdoor.outmobility.io/v1`

All responses follow the same envelope:
```json
{
  "data": { ... },
  "error": null,
  "meta": { "page": 1, "total": 100 }
}
```

---

## Authentication

### POST /auth/login
User login (advertiser, operator, admin).
```
Body:  { email, password }
Returns: { access_token, refresh_token, user: { id, name, role, org_id } }
```

### POST /auth/refresh
Exchange refresh token for new access token.
```
Body:  { refresh_token }
Returns: { access_token }
```

### POST /auth/logout
```
Headers: Authorization: Bearer <token>
Returns: 200 OK
```

---

## Campaigns

### GET /campaigns
List campaigns for the authenticated org.
```
Query:  ?status=active&page=1&limit=20
Returns: [{ id, name, status, budget_total, budget_spent, start_date, end_date, ... }]
```

### POST /campaigns
Create a new campaign (DRAFT status).
```
Body: {
  name, start_date, end_date,
  budget_total, cpm_rate,
  geo_city, geo_lat, geo_lng, geo_radius_km
}
Returns: { id, status: "draft", ... }
```

### GET /campaigns/:id
Get campaign detail.
```
Returns: { ...campaign fields, stats: { impressions, spent, cpm, reach } }
```

### PATCH /campaigns/:id
Update campaign (only in DRAFT or PAUSED state).
```
Body: { name?, budget_total?, start_date?, end_date?, geo_* }
Returns: { ...updated campaign }
```

### POST /campaigns/:id/submit
Submit campaign for approval.
```
Validation: campaign must have at least one approved creative
Returns: { status: "submitted" }
```

### POST /campaigns/:id/pause
Pause active campaign.
```
Returns: { status: "paused" }
```

### POST /campaigns/:id/resume
Resume paused campaign.
```
Returns: { status: "active" }
```

---

## Ad Creatives

### POST /campaigns/:id/creatives
Upload a creative file.
```
Content-Type: multipart/form-data
Body: { file: <binary>, file_type: "video" | "image" }
Returns: { id, file_url, file_type, duration_seconds, status: "pending" }
```

### GET /campaigns/:id/creatives
List creatives for a campaign.
```
Returns: [{ id, file_url, file_type, status, duration_seconds }]
```

### DELETE /campaigns/:id/creatives/:creativeId
Remove a creative (only if campaign is in DRAFT).
```
Returns: 204 No Content
```

---

## Analytics

### GET /campaigns/:id/stats
Live campaign stats (served from pre-aggregated table).
```
Returns: {
  impressions, valid_impressions, invalid_impressions,
  unique_devices, completion_rate, budget_spent, cpm
}
```

### GET /campaigns/:id/timeseries
Daily impressions over time.
```
Query:  ?from=2026-05-01&to=2026-05-31
Returns: [{ date, impressions, spend }]
```

### GET /campaigns/:id/devices
Per-device delivery breakdown.
```
Returns: [{ device_id, impressions, uptime_pct }]
```

### GET /campaigns/:id/report
Download campaign report.
```
Query:  ?format=csv | pdf
Returns: File download (Content-Type: text/csv or application/pdf)
```

---

## Operator Endpoints

### GET /operator/fleet
All vehicles/devices for the authenticated operator.
```
Returns: [{ vehicle_id, plate, device_id, status, last_seen, uptime_pct }]
```

### GET /operator/earnings
Earnings summary.
```
Query:  ?period=2026-05 (YYYY-MM)
Returns: {
  period, total_impressions, total_payout,
  vehicles: [{ device_id, impressions, uptime_minutes, payout }]
}
```

### GET /operator/payouts
Payout history.
```
Returns: [{ id, period, amount, status, paid_at, payment_ref }]
```

---

## Admin Endpoints

All require role: admin.

### GET /admin/campaigns
All campaigns across all advertisers.
```
Query:  ?status=submitted&page=1
Returns: [{ ...campaign, advertiser_name }]
```

### POST /admin/campaigns/:id/approve
Approve a submitted campaign.
```
Returns: { status: "approved" | "scheduled" | "active" }
```

### POST /admin/campaigns/:id/reject
Reject a submitted campaign.
```
Body:  { reason: "..." }
Returns: { status: "draft" }
```

### GET /admin/devices
Full device fleet.
```
Query:  ?status=offline&operator_id=...
Returns: [{ device_id, operator, status, last_seen, gps_lat, gps_lng }]
```

### PATCH /admin/devices/:id
Update device status.
```
Body:  { status: "active" | "suspended" }
Returns: { ...updated device }
```

### GET /admin/fraud-flags
Impression logs flagged as suspicious.
```
Returns: [{ log_id, device_id, campaign_id, flag_reason, impression_count, created_at }]
```

### POST /admin/fraud-flags/:id/resolve
Resolve a fraud flag.
```
Body:  { action: "validate" | "invalidate" | "suspend_device", note?: "..." }
Returns: { resolved: true }
```

### GET /admin/payouts
All pending payouts.
```
Query:  ?status=pending
Returns: [{ operator_name, period, vehicle_count, total_impressions, payout_amount, status }]
```

### POST /admin/payouts/:id/approve
Approve a payout for processing.
```
Returns: { status: "processing" }
```

### POST /admin/payouts/:id/mark-paid
Mark payout as paid after external payment.
```
Body:  { payment_ref: "...", paid_at: "2026-05-15T14:00:00Z" }
Returns: { status: "paid" }
```

### GET /admin/system/health
System health snapshot.
```
Returns: {
  active_devices, offline_devices,
  impressions_today, pending_flags,
  ingestion_lag_seconds_p50,
  verification_queue_depth
}
```

---

## Device API (Tablet-Facing)

Authenticated with device API key, not JWT.
Header: `X-Device-Key: <api_key>`

### POST /device/auth
Device registration / auth check on boot.
```
Body:  { device_uuid }
Returns: { device_id, status, operator_id } or 403 if not registered
```

### GET /device/schedule
Fetch playback schedule for today (+ tomorrow for resilience).
```
Returns: {
  device_id,
  generated_at,
  valid_until,
  slots: [
    {
      campaign_id,
      creative_id,
      creative_url,
      file_type,
      duration_seconds,
      interval_seconds,
      priority
    }
  ]
}
```

### POST /device/events
Batch submit impression logs.
```
Body: {
  batch_id: "...",
  events: [
    {
      campaign_id, creative_id,
      played_at, gps_lat, gps_lng,
      duration_played_seconds, is_complete,
      sequence: 1
    }
  ]
}
Returns: { received: 12, batch_id: "..." }
```
Idempotent: duplicate batch_id is safely ignored.

### POST /device/heartbeat
Device liveness ping.
```
Body: {
  gps_lat, gps_lng,
  network_type,
  app_version,
  timestamp
}
Returns: { received: true }
```

---

## Error Codes

| Code | Meaning |
|---|---|
| 400 | Bad request — validation error |
| 401 | Unauthenticated |
| 403 | Unauthorized — wrong role |
| 404 | Resource not found |
| 409 | Conflict — duplicate or invalid state transition |
| 422 | Unprocessable — business rule violation |
| 429 | Rate limited |
| 500 | Server error |
