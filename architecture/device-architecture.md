# Device Architecture — Out-door (Android Tablet)

---

## Device Role

The tablet is the delivery node of the network.
It runs a locked kiosk app, plays scheduled ads, logs every event,
and syncs data to the backend. It works offline and reconciles when reconnected.

---

## Physical Setup

```
┌─────────────────────────────┐
│        Android Tablet        │
│   (mounted in vehicle,       │
│    facing passenger seat)    │
│                              │
│  ┌────────────────────────┐  │
│  │      Kiosk App         │  │
│  │                        │  │
│  │  ┌──────────────────┐  │  │
│  │  │   Ad Playback    │  │  │
│  │  │   (full screen)  │  │  │
│  │  └──────────────────┘  │  │
│  │                        │  │
│  │  Status bar (top):     │  │
│  │  • Online indicator    │  │
│  │  • Today's earnings    │  │
│  └────────────────────────┘  │
└─────────────────────────────┘
```

---

## App Components

### 1. Kiosk Lockdown
- Android Device Owner Mode (or MDM-enforced kiosk)
- Home button disabled
- Back/recent buttons disabled
- Status bar collapsed
- Auto-start on boot (BOOT_COMPLETED broadcast)
- Screen never turns off (wake lock)
- Auto-restart if app crashes (watchdog service)

### 2. Ad Playback Engine
- Reads schedule from local cache
- Plays video (ExoPlayer) or image at scheduled intervals
- Tracks playback state: started, playing, completed
- Fires log event on completion (or at 80% threshold for videos)

### 3. Schedule Manager
- Fetches schedule from API on boot and every 30 minutes
- Stores schedule as JSON in local storage
- Falls back to yesterday's schedule if network unavailable
- Clears expired schedules (>7 days old)

### 4. Creative Cache Manager
- Downloads new creative files referenced in schedule
- Stores in internal storage (not SD card)
- Validates file integrity (MD5 hash from API)
- Evicts creatives not referenced in current or next-day schedule
- Max cache size: 2GB (configurable)

### 5. Event Logger
- On each ad play completion, writes an event record to SQLite
- Fields: campaign_id, creative_id, played_at, gps_lat, gps_lng,
  duration_played_seconds, is_complete, device_sequence
- `device_sequence`: monotonically increasing integer per device (prevents duplicates)
- Never deletes logs until server confirms receipt

### 6. Sync Service
- Runs every 5 minutes (or on network reconnect)
- Reads unsynced logs from SQLite
- Batches up to 100 events per request
- POSTs to `/device/events`
- On 200 response: marks logs as synced
- On failure: retries with exponential backoff
- Generates batch_id per sync attempt (UUID)

### 7. Heartbeat Service
- POSTs to `/device/heartbeat` every 60 seconds
- Includes GPS, network type, app version
- Runs even if no ads are playing (device health signal)
- Lightweight — minimal battery impact

### 8. GPS Service
- Samples GPS every 30 seconds
- Caches last known location
- Used by event logger and heartbeat service
- Falls back to last known if GPS unavailable

---

## Device Boot Sequence

```
1. Power on
2. Android OS boots
3. Kiosk app launches automatically (BOOT_COMPLETED receiver)
4. App checks network connectivity
5. POST /device/auth (authenticate with pre-loaded API key)
   ├─ Success: continue
   └─ Failure: retry every 30 seconds, operate in offline mode
6. GET /device/schedule (fetch today's and tomorrow's schedule)
   ├─ Success: save to local cache
   └─ Failure: load last cached schedule
7. Download any missing creatives from CDN
8. Start heartbeat service (60-second interval)
9. Start sync service (5-minute interval)
10. Begin ad playback loop
```

---

## Offline Mode

The device is designed to work with no internet for up to 7 days.

| Component | Offline behavior |
|---|---|
| Ad playback | Continues with cached schedule and creatives |
| Event logging | Stores events in local SQLite (no limit) |
| Heartbeat | Attempts every 60s, fails silently, retries |
| Schedule fetch | Uses last downloaded schedule |
| Sync | Queues up, batch syncs all events on reconnect |

**Offline recovery:**
```
Network reconnects →
  Heartbeat service sends immediately →
  Sync service sends all queued logs in batches →
  Schedule fetched and updated →
  Any new creatives downloaded →
  Normal operation resumes
```

---

## Schedule Format (Local Cache)

```json
{
  "device_id": "DEV-abc123",
  "generated_at": "2026-05-04T00:00:00Z",
  "valid_until": "2026-05-06T00:00:00Z",
  "slots": [
    {
      "campaign_id": "camp-001",
      "creative_id": "cre-001",
      "creative_url": "https://cdn.outmobility.io/creatives/cre-001.mp4",
      "creative_hash": "md5:abc123...",
      "file_type": "video",
      "duration_seconds": 30,
      "interval_seconds": 300,
      "priority": 1
    },
    {
      "campaign_id": "camp-002",
      "creative_id": "cre-002",
      "creative_url": "https://cdn.outmobility.io/creatives/cre-002.jpg",
      "creative_hash": "md5:def456...",
      "file_type": "image",
      "duration_seconds": 15,
      "interval_seconds": 600,
      "priority": 2
    }
  ]
}
```

**Playback loop logic:**
```
For each minute of operation:
  Check schedule slots in priority order
  If slot.interval elapsed since last play:
    Play creative
    Log event
    Reset interval timer
  Else:
    Show idle screen or lower-priority slot
```

---

## Device Provisioning

How a new device enters the network:

```
1. Admin registers device in dashboard (enters device UUID, assigns to operator)
   → System generates device API key
   → Device record created with status: active

2. API key is flashed onto device (during setup, pre-deployment)
   → Stored in secure Android Keystore
   → Never transmitted after initial flash

3. Device shipped/handed to operator

4. Operator mounts in vehicle, powers on

5. Device authenticates automatically using pre-loaded API key
```

---

## Hardware Recommendation (MVP)

| Spec | Requirement | Recommended |
|---|---|---|
| OS | Android 9+ | Android 11+ |
| Screen | 8–10 inch, IPS | 9-10 inch, 1280×800 |
| RAM | 2GB min | 3–4GB |
| Storage | 16GB min | 32GB |
| Connectivity | 4G LTE | 4G LTE + WiFi |
| GPS | Required | Built-in GPS |
| Power | USB-C or 12V in-vehicle | Vehicle power adapter |
| Mounting | Headrest or center console | RAM mount or bracket |

**MDM for fleet management:** Headwind MDM (open source) or Scalefusion (SaaS).

---

## Security

- Device API key stored in Android Keystore (hardware-backed where available)
- All API communication over HTTPS only
- No user-accessible settings or file browser
- App update via MDM push only (no Play Store)
- Device wipe available remotely via MDM if stolen/tampered
