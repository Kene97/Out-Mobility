# Campaign Lifecycle — Out-door

---

## States

```
DRAFT → SUBMITTED → APPROVED → SCHEDULED → ACTIVE → PAUSED ↔ ACTIVE
                                                          ↓
                                               COMPLETED | CANCELLED
```

| State | Who sets it | What it means |
|---|---|---|
| DRAFT | Advertiser | Being built, not submitted |
| SUBMITTED | Advertiser | Awaiting admin review |
| APPROVED | Admin (or system) | Cleared to run |
| SCHEDULED | System | Approved, start_date in future |
| ACTIVE | System | Live, devices are playing ads |
| PAUSED | Advertiser or Admin | Temporarily stopped |
| COMPLETED | System | end_date reached or budget exhausted |
| CANCELLED | Admin | Terminated before completion |

---

## State Transitions

### DRAFT → SUBMITTED
**Trigger:** Advertiser clicks "Submit Campaign"
**Validations:**
- Creative uploaded and passes format check
- Budget > minimum ($0 for MVP, define floor)
- Start date is today or future
- End date is after start date
- Geo area selected

### SUBMITTED → APPROVED
**Trigger:** Admin clicks "Approve" (or system auto-approves if enabled)
**Actions:**
- Campaign status set to APPROVED
- If start_date = today → immediately transitions to ACTIVE
- If start_date > today → transitions to SCHEDULED

### SUBMITTED → REJECTED
**Trigger:** Admin clicks "Reject" with reason
**Actions:**
- Campaign status set back to DRAFT
- Advertiser notified with reason
- Advertiser can edit and resubmit

### SCHEDULED → ACTIVE
**Trigger:** System job runs at midnight, finds campaigns where start_date = today
**Actions:**
- Status → ACTIVE
- Scheduler generates device assignments for matching fleet
- Schedule pushed to devices on next fetch cycle

### ACTIVE → PAUSED
**Trigger:** Advertiser clicks "Pause" OR admin pauses OR budget threshold hit
**Actions:**
- Status → PAUSED
- Devices receive updated schedule (campaign removed) on next fetch
- Impressions stop being served within ~5 minutes (next schedule pull)

### PAUSED → ACTIVE
**Trigger:** Advertiser clicks "Resume" OR admin resumes
**Validations:**
- Campaign end_date has not passed
- Budget has not been fully spent
**Actions:**
- Status → ACTIVE
- Devices receive updated schedule on next fetch

### ACTIVE → COMPLETED
**Trigger:** System job detects end_date has passed OR budget_spent >= budget_total
**Actions:**
- Status → COMPLETED
- Campaign removed from all device schedules
- Final impression count locked
- Advertiser notified

### ACTIVE / PAUSED → CANCELLED
**Trigger:** Admin cancels (e.g., policy violation, payment failure)
**Actions:**
- Status → CANCELLED
- Campaign removed from all device schedules immediately
- Advertiser notified with reason
- Partial refund logic (if pre-pay model) — handled manually in MVP

---

## Campaign Scheduling Logic

When a campaign becomes ACTIVE:

1. **Match devices:** Find all active devices in the campaign's geo area
2. **Generate slots:** Divide campaign schedule into playback slots per device
   - Each device gets a proportional share of impressions
   - Slot = {campaign_id, creative_id, interval_seconds, duration_seconds}
3. **Store schedule:** Write device schedule to database (one row per device per day)
4. **Devices fetch:** On next schedule pull (every 30 minutes), devices receive updated schedule
5. **Creative cache:** Devices download creative files if not already cached

---

## Budget Pacing

MVP approach: simple daily pacing.

```
daily_budget = total_budget / campaign_days_remaining

If today's spend >= daily_budget:
  Pause impression counting for today (ads may still play)
  Resume at midnight

If total_spend >= total_budget:
  Complete campaign immediately
```

**Future:** Smooth pacing algorithms (hourly budget curves, dayparting).

---

## Creative Review (MVP)

| Mode | How it works |
|---|---|
| Manual (default) | Admin reviews and approves each creative before campaign goes live |
| Auto-approve | Campaigns go live immediately (enable after trust is established) |

Creative validation (automated):
- File type: MP4 (video) or JPG/PNG (image)
- Video max duration: 60 seconds
- Video max file size: 50MB
- Image max file size: 5MB
- No explicit content scan (manual review covers this in MVP)

---

## Impression Attribution

Impressions are attributed to the campaign at verification time, not at play time.

```
Device plays ad → logs event → syncs to backend →
Verification service processes log →
  If valid: impression added to campaign.verified_impressions
  If invalid/suspicious: flagged, not counted
Campaign budget_spent calculated as:
  budget_spent = verified_impressions * agreed_cpm / 1000
```
