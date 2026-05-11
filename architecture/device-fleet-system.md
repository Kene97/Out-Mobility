# Device Fleet System — Out-door

The fleet system manages every Android tablet from manufacture-time
configuration through daily operation and eventual decommission.

---

## Device Lifecycle

```
PROVISIONED → REGISTERED → DEPLOYED → ACTIVE → [SUSPENDED | DECOMMISSIONED]
```

| State | Meaning | Who triggers |
|---|---|---|
| PROVISIONED | Physical device exists, not yet in system | — (physical step) |
| REGISTERED | Admin created device record, API key generated | Admin |
| DEPLOYED | Device powered on, authenticated, fetching schedules | System (auto) |
| ACTIVE | Delivering impressions, sending heartbeats | System (auto) |
| SUSPENDED | Removed from ad network, not receiving schedules | Admin |
| DECOMMISSIONED | Permanently removed (lost, stolen, broken) | Admin |

---

## Device Registration (Admin Side)

### Step 1: Admin creates device record

```
POST /admin/devices
Body: {
  "device_uuid": "a1b2c3d4e5f6...",    // from device (IMEI or UUID in settings)
  "vehicle_id": "uuid-of-vehicle",
  "operator_id": "uuid-of-operator"
}
```

System generates a cryptographically random API key:
```typescript
// crypto.ts
export function generateApiKey(): { plainKey: string; keyHash: string } {
  const plainKey = crypto.randomBytes(32).toString('hex')  // 64-char hex string
  const keyHash = crypto.createHash('sha256').update(plainKey).digest('hex')
  return { plainKey, keyHash }
}
```

**Response includes the plain key exactly once:**
```json
{
  "device_id": "uuid...",
  "device_uuid": "a1b2c3...",
  "api_key": "7f3a9b2c1d4e5f....",    // displayed once — admin copies this
  "note": "This key will not be shown again. Store it securely before flashing."
}
```

Only `api_key_hash` is stored in the database. The plain key is never stored.

### Step 2: Flash API key onto device

Before physical deployment, the tablet is configured with:
```
# Stored in Android SharedPreferences (encrypted with Android Keystore)
OUTDOOR_DEVICE_UUID=a1b2c3d4e5f6
OUTDOOR_API_KEY=7f3a9b2c1d4e5f...
OUTDOOR_API_BASE_URL=https://api.outdoor.outmobility.io/v1
```

This is done via:
- **Option A (manual setup):** App reads from a config file, technician installs it via ADB
- **Option B (MDM push):** MDM pushes config via managed app configuration
- **Option C (QR enrollment):** Admin generates QR code containing config, device scans on first boot

**MVP recommendation:** Option A (manual ADB setup) for first 50 devices.
Move to Option C (QR enrollment) before 200 devices.

---

## Device Authentication Protocol

Every API request from a tablet is authenticated by the `device-auth.middleware`:

```typescript
// shared/middleware/device-auth.middleware.ts
async function deviceAuthMiddleware(request, reply) {
  const apiKey = request.headers['x-device-key']
  if (!apiKey) return reply.code(401).send({ error: 'Missing device key' })

  const keyHash = sha256(apiKey)
  const device = await deviceRepo.findByKeyHash(keyHash)

  if (!device) return reply.code(403).send({ error: 'Invalid device key' })
  if (device.status === 'suspended') return reply.code(403).send({ error: 'Device suspended' })

  // Attach device context to request
  request.device = device
  
  // Update last_seen asynchronously (fire and forget)
  deviceRepo.updateLastSeen(device.id).catch(logger.error)
}
```

**Why SHA-256 and not bcrypt:**
- bcrypt is CPU-intensive (designed for password hashing)
- Device keys are high-entropy random values (no need for slow hash)
- SHA-256 is fast and sufficient for high-entropy keys
- Device auth happens on every heartbeat (every 60s) — bcrypt would create latency

---

## Heartbeat System

Devices POST a heartbeat every 60 seconds.

```
POST /device/heartbeat
Headers: X-Device-Key: <key>
Body: {
  "timestamp": "2026-05-04T09:14:22Z",
  "gps_lat": 6.4521,
  "gps_lng": 3.3902,
  "network_type": "4g",
  "app_version": "1.2.1",
  "battery_level": 84
}
Response: 200 { "received": true, "server_time": "2026-05-04T09:14:23Z" }
```

Server processes heartbeat:
1. Insert row into `device_heartbeats`
2. Update `devices.last_seen_at`, `last_gps_lat`, `last_gps_lng`
3. Return server timestamp (device uses this to detect clock drift)

**Clock drift detection:**
- If `|request.timestamp - server_time| > 300s` (5 minutes), heartbeat response includes `"clock_drift_warning": true`
- Device logs this locally — used in verification to account for slight drift

**Offline behavior:**
- Heartbeat service attempts every 60s regardless of network
- On reconnect: does NOT batch-send missed heartbeats (not useful — just resumes live)
- Verification uses heartbeat gaps to detect suspicious impressions during offline windows

**Database write optimization:**
- Heartbeat inserts are single-row UPSERTs — fast
- `device_heartbeats` is partitioned by day — queries stay on 1-2 partitions
- `devices.last_seen_at` updated in same transaction

---

## Offline Resilience Protocol

Designed for Nigerian mobile network conditions: intermittent 4G, variable 3G.

**Device offline handling:**

```
Network loss detected (heartbeat fails):
  → Continue ad playback from local cache
  → Log all impression events to SQLite (local)
  → Retry heartbeat every 60s (silent)
  → Retry schedule fetch every 30min (silent)

Network restored:
  → Heartbeat sent immediately
  → All queued impression logs synced (batch, max 100 per request)
  → Schedule refreshed if >30min stale
  → Resume normal operation
```

**Sync resilience:**

```typescript
// SyncService.kt (Android)
fun syncQueuedEvents() {
  val unsyncedLogs = db.getUnsyncedLogs(limit = 100)
  if (unsyncedLogs.isEmpty()) return

  val batchId = UUID.randomUUID().toString()
  val result = api.postEvents(BatchPayload(batchId, unsyncedLogs))

  if (result.isSuccess) {
    db.markSynced(unsyncedLogs.map { it.id })
    // If more remain, schedule another sync in 10 seconds
    if (db.getUnsyncedCount() > 0) scheduleSync(delaySeconds = 10)
  }
  // On failure: retry with exponential backoff (60s → 120s → 240s max)
}
```

**Idempotency on batch sync:**
- Each batch has a `batch_id` (UUID generated by device)
- Server endpoint is idempotent: if `batch_id` already processed, return 200 without re-inserting
- Prevents duplicates on network timeout (device retries after timeout, server already committed)

```sql
-- Idempotency check on events ingestion
SELECT COUNT(*) FROM ad_impression_logs
WHERE batch_id = $1 AND device_id = $2
-- If > 0: skip insertion, return { received: 0, skipped: N, duplicate_batch: true }
```

---

## Schedule Fetch Protocol

Devices fetch their schedule on boot and every 30 minutes.

```
GET /device/schedule
Headers: X-Device-Key: <key>
Query: ?date=2026-05-04

Response:
{
  "device_id": "uuid...",
  "schedule_date": "2026-05-04",
  "generated_at": "2026-05-03T23:45:00Z",
  "valid_until": "2026-05-05T23:45:00Z",
  "slots": [
    {
      "campaign_id": "uuid...",
      "creative_id": "uuid...",
      "cdn_url": "https://cdn.outmobility.io/creatives/abc123.mp4",
      "file_hash_md5": "d41d8cd98f00b204...",
      "file_type": "video",
      "duration_seconds": 30,
      "interval_seconds": 300,
      "priority": 1
    }
  ],
  "server_time": "2026-05-04T09:00:00Z"
}
```

**Response is always current + next day** when called after 18:00 (prepares for tomorrow).
This way device never starts a day without a valid schedule.

**Cache invalidation:**
- Device stores schedule locally with `valid_until` timestamp
- If current time > `valid_until` AND network available → fetch new schedule
- If network unavailable AND schedule expired → use last schedule + log warning

---

## Creative Caching on Device

```
1. Device receives schedule with creative CDN URLs
2. For each creative:
   a. Check local cache by creative_id
   b. If not cached: download from CDN URL
   c. Verify MD5 hash of downloaded file
   d. If hash mismatch: re-download once, then skip slot
   e. Store in internal storage: /data/app/outdoor/cache/creatives/

3. Cache eviction (runs every 6 hours):
   a. Get list of creative_ids in current + next-day schedule
   b. Delete any cached file NOT in that list
   c. Enforce max cache size: 2GB
   d. If over limit: evict oldest by access time

4. Download policy:
   a. Only download on WiFi OR 4G (not 3G — too slow for video)
   b. If on 3G: continue with currently cached content
   c. Download in background during ad playback (not blocking)
```

---

## Kiosk Mode Implementation

**Android Device Owner Mode** (the correct approach):

```
1. Tablet shipped in factory-reset state
2. Admin scans device provisioning QR code (or ADB command)
   → QR code contains: DPC package name, WiFi credentials, admin endpoint
3. Android OS provisions Device Owner (DPC: Device Policy Controller)
4. DPC installs kiosk app and sets Lock Task Mode:
   - Only kiosk app can run in foreground
   - Home/Back/Recents buttons disabled
   - Status bar hidden
   - Screen timeout disabled
5. DPC pushes app config: API key, device UUID, API base URL
```

**Android Lock Task Mode code (simplified):**
```kotlin
// MainActivity.kt
override fun onResume() {
  super.onResume()
  // Ensure kiosk mode is active
  if (!activityManager.isInLockTaskMode) {
    startLockTask()
  }
}

// DevicePolicyController applies restrictions via DevicePolicyManager
val restrictions = Bundle().apply {
  putBoolean(UserManager.DISALLOW_FACTORY_RESET, true)
  putBoolean(UserManager.DISALLOW_ADD_USER, true)
  putBoolean(UserManager.DISALLOW_MOUNT_PHYSICAL_MEDIA, true)
}
dpm.setApplicationRestrictions(adminComponent, packageName, restrictions)
```

---

## Remote Device Management (MDM)

**MVP:** Headwind MDM (open source, self-hostable, free)
**Scale:** Scalefusion or VMware Workspace ONE

**Operations via MDM:**
| Action | When | How |
|---|---|---|
| Push app update | New app version | MDM push, silent install |
| Update config | API key rotation | MDM managed config push |
| Collect device info | Daily health check | MDM inventory report |
| Remote wipe | Stolen/lost device | MDM wipe command |
| Lock/unlock | Suspicious behavior | MDM lock command |

**MDM is separate from backend API** — MDM handles device OS/app management.
Backend API handles ad network data flow. They share only the `device_uuid`.

---

## Device Fraud Prevention

Hardware-level signals that prevent spoofing:

1. **Device UUID is hardware-bound** — sourced from Android `Settings.Secure.ANDROID_ID` or IMEI (non-spoofable without root)
2. **API key is unique per device** — compromise of one key doesn't affect others
3. **GPS is validated server-side** — static GPS, impossible coordinates flagged
4. **Heartbeat timestamps cross-referenced** — can't fake activity without live connection
5. **Device sequence numbers are monotonic** — gaps in sequence detected
6. **Batch sync rate limits** — max 100 events per batch, 100 batches per minute per device

**If a device is compromised:**
```
Admin → Suspend device → api_key_hash updated (rotated) → device locked out
MDM → Remote wipe command sent
New device provisioned with new UUID and new API key
```

---

## Fleet Observability

**Device health calculated every 5 minutes (background job):**

```sql
-- Devices offline = no heartbeat in last 5 minutes
UPDATE devices
SET status = CASE
  WHEN last_seen_at > NOW() - INTERVAL '5 minutes' THEN 'active'
  WHEN last_seen_at > NOW() - INTERVAL '1 hour'    THEN 'active'  -- stale but not offline
  ELSE 'offline'
END
WHERE status != 'suspended';
```

**Fleet dashboard metrics (computed on demand):**
```sql
SELECT
  COUNT(*) FILTER (WHERE last_seen_at > NOW() - INTERVAL '5 minutes') AS online,
  COUNT(*) FILTER (WHERE last_seen_at BETWEEN NOW() - INTERVAL '1 hour'
                                          AND NOW() - INTERVAL '5 minutes') AS stale,
  COUNT(*) FILTER (WHERE last_seen_at < NOW() - INTERVAL '1 hour'
                      OR last_seen_at IS NULL) AS offline,
  COUNT(*) FILTER (WHERE status = 'suspended') AS suspended
FROM devices
WHERE status != 'decommissioned';
```
