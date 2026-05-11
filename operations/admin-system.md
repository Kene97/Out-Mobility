# Admin Operations System — Out-door

The admin system is Out Mobility's internal control panel.
A team of 1–3 people must be able to run the entire network from it.

---

## Admin Dashboard Sections

### 1. Overview (Home)
The first thing an admin sees on login.

| Panel | Contents |
|---|---|
| Network health | Active devices / Total devices / Offline devices |
| Today's activity | Impressions today / Campaigns active |
| Alerts | Fraud flags pending / Devices offline >1h / Budget alerts |
| Quick actions | Approve pending campaigns / Review fraud flags |

---

### 2. Campaign Management

**Campaign Queue (Submitted)**
List of campaigns awaiting review.

| Column | Description |
|---|---|
| Advertiser | Company name |
| Campaign name | — |
| Start / End | Dates |
| Budget | Total budget |
| Creative | Thumbnail + preview link |
| Submitted | Time ago |
| Action | Approve / Reject / Request revision |

**Review modal:**
- Campaign details (name, dates, geo, budget)
- Creative preview (embedded video player or image)
- Advertiser profile (name, account age, past campaigns)
- Approve button → moves to Scheduled or Active
- Reject button → select reason (inappropriate content / incomplete / other) → notify advertiser

**All Campaigns**
Filterable list of all campaigns across all states and advertisers.
- Filter by status, advertiser, date range
- Click into any campaign for full detail + action options

---

### 3. Device Fleet

**Fleet Overview**

| View | Contents |
|---|---|
| Map view | All devices plotted by last GPS, color-coded by status |
| List view | Device ID, operator, vehicle plate, status, last seen, uptime% |

Status colors:
- Green = online (heartbeat <5 min ago)
- Yellow = stale (heartbeat 5–60 min ago)
- Red = offline (heartbeat >60 min ago)
- Grey = suspended

**Device Detail**
Clicking a device opens:
- Device info (ID, operator, vehicle, app version)
- Heartbeat chart (last 24 hours — shows online/offline periods)
- GPS track (last 24h plotted on map)
- Recent impression logs (last 50 events with verification status)
- Current schedule (what this device is scheduled to play)

**Actions:**
- Force schedule refresh (device fetches on next sync)
- Suspend device (removes from all schedules)
- Reactivate device
- Flag for investigation
- Download device log export (CSV)

---

### 4. Fraud Review

**Fraud Flags Queue**

| Column | Description |
|---|---|
| Device | Device ID and operator |
| Flag reason | e.g., "static_gps", "no_heartbeat_correlation" |
| Impression count | How many events are in this flag |
| Period | Date range of flagged events |
| Campaign(s) affected | Which campaigns' budgets are at risk |

**Flag Detail:**
- Summary: why it was flagged
- Evidence panel:
  - Heartbeat timeline (gaps shown clearly)
  - GPS track (visualizes static vs. moving)
  - Impression log table (timestamps, sequence numbers)
- Side-by-side: expected vs. actual impression rate

**Resolution actions:**
- **Validate:** All flagged impressions are valid → count them
- **Invalidate:** All flagged impressions are invalid → reject them
- **Split decision:** Mark individual impressions (for edge cases)
- **Suspend device:** Device removed from network, investigation noted
- **Note field:** Internal note for audit trail (always required)

---

### 5. Payout Management

**Payout Generation**
Run manually (or auto-trigger at month end):

```
Admin clicks "Generate payouts for [period]" →
System calculates per-operator, per-vehicle:
  - Total verified impressions
  - Uptime minutes
  - Gross revenue from campaigns × operator revenue share %
  - Net payout per vehicle
→ Review summary screen
→ Confirm → payout records created with status: pending
```

**Payout Queue**

| Column | Description |
|---|---|
| Operator | Company name |
| Period | Month |
| Vehicles | Count |
| Impressions | Total verified |
| Payout amount | Calculated |
| Status | Pending / Approved / Processing / Paid / Held |

**Actions:**
- Approve → status: approved (ready for payment)
- Hold → status: held + require note (fraud investigation, dispute, etc.)
- Mark paid → enter payment reference + date → status: paid

**Payout Detail:**
- Vehicle-level breakdown
- Impression breakdown per vehicle
- Revenue calculation formula shown (for transparency)
- Audit trail of all status changes

---

### 6. Advertiser Management

**Advertiser List**

| Column | Description |
|---|---|
| Company name | — |
| Status | Active / Pending / Suspended |
| Campaigns | Total / Active |
| Total spend | All time |
| Last active | Date |

**Actions:**
- Activate pending account
- Suspend account (with reason)
- View full campaign history
- View payment ledger (all credits/debits)

---

### 7. Operator Management

**Operator List**

| Column | Description |
|---|---|
| Company name | — |
| Status | Active / Suspended |
| Vehicles | Count |
| Active devices | Online now |
| Lifetime earnings | All time |

**Actions:**
- Add new operator
- Edit revenue share %
- Suspend operator
- View vehicle and device list

---

### 8. System Health

**Real-time metrics panel:**

| Metric | Target | Alert threshold |
|---|---|---|
| API response time (p95) | <500ms | >2s |
| Event ingestion lag | <5 min | >15 min |
| Verification queue depth | <500 | >2,000 |
| Active devices (5-min heartbeat) | >90% fleet | <70% fleet |
| Database connections | <80% pool | >90% pool |
| Storage usage | <70% | >85% |

**Alerts panel:**
Active alerts shown at top of screen. Each alert links to the affected resource.

---

## Operating Procedures

### Daily (5 min)
- Check system health panel for alerts
- Review fraud flag queue (resolve or escalate)
- Check for devices offline >2 hours (contact operator)

### Weekly (30 min)
- Review all active campaigns (pacing, budget burn)
- Review pending campaign submissions
- Check device uptime across fleet (flag chronic offline devices)
- Review verification stats (valid/suspicious/invalid ratios)

### Monthly (1–2 hours)
- Generate and approve operator payouts
- Generate advertiser invoice summaries
- Review advertiser renewal status (follow up on lapsed campaigns)
- Fleet health review (decommission devices, add new vehicles)

---

## Escalation Paths

| Issue | First response | Escalate to |
|---|---|---|
| Device offline >24h | Contact operator directly | Replace device |
| Fraud flag high volume | Hold payout, review | Suspend operator if confirmed |
| Campaign creative complaint | Pause campaign | Reject + notify advertiser |
| Advertiser non-payment | Hold future campaigns | Legal / collections |
| API outage | Check status page | Engineering |
