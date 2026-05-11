# Ad Delivery Engine — Out-door

The engine that decides which ad plays on which device at what time.
Must be reliable, simple, and fair to all active campaigns.

---

## Engine Overview

```
Campaign becomes ACTIVE
        ↓
Schedule Generator (23:45 daily)
  → Match campaigns to devices
  → Generate play slots per device
  → Write campaign_schedules
        ↓
Device fetches schedule (GET /device/schedule)
  → Downloads creative files to local cache
  → Begins playback loop
        ↓
Impressions logged and synced to backend
        ↓
Verification processes logs
        ↓
Campaign stats updated
        ↓
Campaign completes (end_date or budget)
```

---

## Schedule Generation (Daily Job)

Runs at **23:45 every night** for the following day.
Also runs **immediately when a campaign is activated** (for same-day launches).

### Algorithm

```typescript
// workers/generate-schedules.worker.ts
async function generateSchedules(targetDate: Date) {
  
  // Step 1: Find all campaigns active on targetDate
  const activeCampaigns = await campaignRepo.findActiveOnDate(targetDate)
  
  for (const campaign of activeCampaigns) {
    
    // Step 2: Find eligible devices within geo radius
    const eligibleDevices = await deviceRepo.findWithinRadius({
      lat: campaign.geoLat,
      lng: campaign.geoLng,
      radiusKm: campaign.geoRadiusKm,
      status: 'active'
    })
    
    // Step 3: Select best creative for this campaign
    const creative = await creativeRepo.findApprovedForCampaign(campaign.id)
    if (!creative) continue  // skip — no approved creative
    
    // Step 4: Calculate interval for this campaign on each device
    const interval = calculateInterval(campaign, eligibleDevices.length)
    
    // Step 5: Assign priority (higher CPM = higher priority)
    const priority = calculatePriority(campaign)
    
    // Step 6: Write schedule rows (bulk insert)
    await scheduleRepo.upsertBulk(
      eligibleDevices.map(device => ({
        campaignId: campaign.id,
        deviceId: device.id,
        creativeId: creative.id,
        scheduleDate: targetDate,
        intervalSeconds: interval,
        priority
      }))
    )
  }
}
```

### Interval Calculation

How frequently a campaign's ad plays on each device:

```typescript
function calculateInterval(campaign: Campaign, deviceCount: number): number {
  // Target: campaign budget pacing across all devices
  // Minimum interval: 300s (5 min) — one ad every 5 minutes max
  // Maximum interval: 1800s (30 min) — one ad every 30 minutes min

  const dailyBudgetCents = campaign.budgetTotalCents / campaign.daysRemaining
  const dailyImpressionsTarget = (dailyBudgetCents / campaign.cpmRateCents) * 1000
  const impressionsPerDevice = dailyImpressionsTarget / deviceCount
  const operatingHours = 14  // 8am–10pm
  const operatingSeconds = operatingHours * 3600

  const rawInterval = Math.floor(operatingSeconds / impressionsPerDevice)
  
  // Clamp to [300, 1800] seconds
  return Math.max(300, Math.min(1800, rawInterval))
}
```

**Example:**
- Campaign budget: $2,000 / 20 days = $100/day
- CPM rate: $6.50 → 15,385 impressions/day target
- Active devices: 100
- Impressions per device: ~154/day
- Operating seconds: 50,400
- Interval: 50,400 / 154 = 327s ≈ **every 5.5 minutes**

### Priority Calculation

When a device has multiple campaigns, priority determines playback order:

```typescript
function calculatePriority(campaign: Campaign): number {
  // Higher CPM = higher priority (advertisers paying more get more delivery)
  // Score: CPM in cents, clamped to 1–100
  const cpmScore = Math.min(100, Math.floor(campaign.cpmRateCents / 10))
  return cpmScore
}
```

Devices with multiple campaigns rotate through highest-priority first.
If two campaigns have identical priority: round-robin.

---

## Playback Rotation Logic (Device-Side)

The tablet's kiosk app interprets the schedule and rotates through campaigns:

```kotlin
// PlaybackScheduler.kt
data class ScheduleSlot(
  val campaignId: String,
  val creativeId: String,
  val localFilePath: String,
  val intervalSeconds: Int,
  val priority: Int,
  var lastPlayedAt: Long? = null
)

fun getNextSlotToPlay(slots: List<ScheduleSlot>): ScheduleSlot? {
  val now = System.currentTimeMillis() / 1000
  
  // Filter: slots where interval has elapsed since last play
  val eligibleSlots = slots.filter { slot ->
    slot.lastPlayedAt == null ||
    (now - slot.lastPlayedAt!!) >= slot.intervalSeconds
  }
  
  if (eligibleSlots.isEmpty()) return null  // show idle screen
  
  // Sort by: priority desc, then by last played (least recently played first)
  return eligibleSlots
    .sortedWith(compareByDescending<ScheduleSlot> { it.priority }
      .thenBy { it.lastPlayedAt ?: 0 })
    .first()
}
```

**Idle state:** When no slot is eligible (all intervals not yet elapsed), show the Out Mobility branded idle screen. This is expected between ad cycles.

---

## Geo Matching (Device-to-Campaign)

Devices are matched to campaigns using the Haversine formula:

```typescript
// shared/utils/geo.ts
function haversineDistanceKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371  // Earth radius in km
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a = Math.sin(dLat/2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

// Optimized query using PostgreSQL — avoids fetching all devices to Node
// Uses bounding box first (fast), then haversine check (precise)
async function findDevicesWithinRadius(lat, lng, radiusKm) {
  return db.query(`
    SELECT id, last_gps_lat, last_gps_lng
    FROM devices
    WHERE status = 'active'
      AND last_gps_lat IS NOT NULL
      -- Bounding box (fast pre-filter using indexes)
      AND last_gps_lat BETWEEN $1 - ($3 / 111.0)
                           AND $1 + ($3 / 111.0)
      AND last_gps_lng BETWEEN $2 - ($3 / (111.0 * COS(RADIANS($1))))
                           AND $2 + ($3 / (111.0 * COS(RADIANS($1))))
      -- Haversine check (precise, runs on pre-filtered set)
      AND (
        6371 * ACOS(
          COS(RADIANS($1)) * COS(RADIANS(last_gps_lat)) *
          COS(RADIANS(last_gps_lng) - RADIANS($2)) +
          SIN(RADIANS($1)) * SIN(RADIANS(last_gps_lat))
        )
      ) <= $3
  `, [lat, lng, radiusKm])
}
```

**Edge case:** If a device has no GPS data (new device, GPS failed):
- Include device in schedule anyway for city-wide campaigns
- Mark impression GPS as null → verification marks as "suspicious" but not invalid
- Operator with many no-GPS devices will see a flag in admin

---

## Fallback Logic

When a device has no campaigns scheduled:

```
Priority 1: Highest-priority active campaign for that device
Priority 2: Any active campaign (city-wide)
Priority 3: Out Mobility default content (branding, PSA, or blank-branded screen)
```

Default content is stored locally on device (shipped with app):
- Out Mobility wordmark animation (30s loop)
- "Powered by Out-door" tagline

This ensures the screen is never dark and always presents the brand professionally.

---

## Budget Pacing & Campaign Completion

Budget is consumed as impressions are verified (not when played):

```typescript
// workers/aggregate-stats.worker.ts
async function updateCampaignBudget(campaignId: string) {
  const stats = await db.query(`
    SELECT COUNT(*) as valid_count
    FROM verified_impressions
    WHERE campaign_id = $1 AND status = 'valid'
  `, [campaignId])

  const campaign = await campaignRepo.findById(campaignId)
  const spentCents = Math.floor(stats.valid_count * campaign.cpmRateCents / 1000)
  
  await campaignRepo.updateSpend(campaignId, spentCents)
  
  // Auto-complete if budget exhausted
  if (spentCents >= campaign.budgetTotalCents) {
    await campaignService.completeCampaign(campaignId, 'budget_exhausted')
  }
}
```

**Daily pacing guard:**
- Tracks spend per day
- If today's spend > (remaining_budget / remaining_days): pause delivery for today
- Resumes at midnight

---

## Creative Delivery (CDN Architecture)

Ad files are never served directly from the backend API.

```
Advertiser uploads creative
  → POST /campaigns/:id/creatives (multipart)
  → API receives file, validates format/size
  → API uploads to Cloudflare R2 (S3-compatible)
  → R2 stores file at: creatives/{campaign_id}/{creative_id}.mp4
  → Cloudflare CDN caches at edge
  → Database stores CDN URL: https://cdn.outmobility.io/creatives/...

Device downloads creative:
  → Device receives CDN URL from /device/schedule
  → Device downloads directly from Cloudflare CDN
  → Zero backend bandwidth cost
  → CDN edge server in West Africa serves low-latency
```

**Why Cloudflare R2:**
- No egress fees (unlike AWS S3)
- Cloudflare CDN included
- Has edge presence in Lagos (Cloudflare has a major PoP there)
- S3-compatible API — can switch to S3 with one config change

---

## Schedule Update After Campaign Change

When admin or advertiser pauses/resumes/cancels a campaign mid-day:

```typescript
// campaigns.service.ts
async function pauseCampaign(campaignId: string) {
  await campaignRepo.updateStatus(campaignId, 'paused')
  
  // Invalidate today's schedule for all affected devices
  await scheduleRepo.deleteForCampaignDate(campaignId, today())
  
  // Devices detect schedule staleness on next 30-min fetch
  // Or immediately if we implement a push invalidation signal
}
```

**Device polling gap:** Changes take up to 30 minutes to propagate (device's schedule refresh interval). This is acceptable for MVP. Future: push invalidation via long-poll or FCM notification.

---

## Multi-Campaign Fairness

When 5 campaigns compete for the same device:

```
Each campaign gets its own interval timer (independent).
Campaigns do NOT compete for a single slot — they share time.

Example: 3 campaigns on one device:
  Campaign A (priority 3, 300s interval): plays every 5 min
  Campaign B (priority 2, 600s interval): plays every 10 min
  Campaign C (priority 1, 1800s interval): plays every 30 min

Timeline (1 hour):
  00:00  Campaign A (priority 3 — highest, interval elapsed)
  05:00  Campaign A
  10:00  Campaign A + Campaign B (both eligible) → Campaign A wins (priority)
  15:00  Campaign A
  20:00  Campaign A + Campaign B → Campaign A wins
  25:00  Campaign A
  30:00  Campaign A + Campaign B + Campaign C → Campaign A wins
  ...

Campaign B gets ~6 plays/hour. Campaign C gets ~2 plays/hour.
```

This is simple, fair, and predictable. No auction or real-time bidding.
