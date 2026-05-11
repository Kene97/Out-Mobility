# UX Flows — Out-door

Complete flows for all three actors.
Each step includes the screen, the action, and the UX decision behind it.

---

## Flow 1: Advertiser — Signup to Live Campaign

### Phase 1: Signup & Onboarding

```
Landing page
  → [Sign Up] button
  → Signup form: name, company, email, password
  → [Create Account]
  → Email verification sent (auto-redirect to "Check your email" screen)
  → User clicks email link
  → Account created, redirected to dashboard

Empty dashboard state:
  → "No campaigns yet" empty state shown
  → [Create your first campaign] primary CTA — only action on screen
```

**UX decisions:**
- No onboarding wizard or welcome tour — the empty state CTA is the onboarding
- Account is auto-activated (or admin-activated within 24h for fraud control)
- No phone verification required for MVP

---

### Phase 2: Create Campaign

```
[New Campaign] button (top right, any screen)
  → Campaign creation wizard opens (full screen overlay)

Step 1: Basics
  → Enter: campaign name, start date, end date, total budget
  → System shows: "Estimated CPM: $6.50 based on current inventory"
  → [Next]

Step 2: Upload Creative
  → Drag & drop zone shown
  → User drags or clicks to upload file
  → Upload progress bar appears
  → Upload complete → file preview shown (video player / image thumbnail)
  → Format validation: if wrong format → inline error with accepted formats listed
  → [Next] (only active after successful upload)

Step 3: Geo Targeting
  → City dropdown (Lagos is pre-selected for MVP)
  → Coverage radius options (city-wide default)
  → Map preview updates to show coverage area
  → "~142 vehicles in this area" shown
  → [Next]

Step 4: Review
  → Full campaign summary
  → Estimated impressions over campaign period (labeled as estimate)
  → [Submit Campaign]
  → Confirmation modal: "Your campaign has been submitted for review. 
     You'll be notified within 24 hours."
  → [Done] → returns to campaign list
  → New campaign visible in list with "Pending" status badge
```

**UX decisions:**
- 4-step wizard prevents overwhelm — no single long form
- Estimated impressions are shown once (review step only) — not during creation to avoid anchoring
- User cannot skip creative upload — it's a hard gate to Step 3
- Submit returns user to campaign list (not dashboard) — shows their progress

---

### Phase 3: Campaign Approved & Live

```
User receives email: "Your campaign has been approved"
  → Email contains: campaign name, start date, link to dashboard

User opens dashboard
  → Campaign status: "Scheduled" (if start date future) or "Active"
  → Impressions counter starts incrementing
  → Status badge changes from grey to green
  → Budget progress bar starts filling
```

**What the user sees when campaign first goes live:**
- No "Congratulations" modal — just clean status transition
- A small toast notification: "Brand Awareness is now live"
- Impressions counter starts at 0 — numbers appear within 1–2 hours

---

### Phase 4: Monitor Campaign

```
User visits campaign detail
  → Metric row: impressions, spend, CPM, days remaining
  → Daily bar chart below (empty bars for future days, filled for past)
  → Device table: which vehicles are delivering
  → "Verified Impressions ✓" label visible — trust signal

User wants to pause:
  → [Pause] button (top right of campaign detail)
  → Confirmation: "Pause this campaign? Ads will stop within 5 minutes."
  → [Confirm Pause] → status changes to Paused
  → Toast: "Campaign paused"

User wants to resume:
  → [Resume] button
  → Status returns to Active immediately
```

---

### Phase 5: Download Report

```
Campaign completes (end date reached)
  → Status: "Completed" badge
  → Email notification: "Your campaign report is ready"

User visits Reports tab
  → Campaign row with [CSV] and [PDF] buttons
  → Click [PDF]
  → File downloads (named: out-door-report-brand-awareness-may2026.pdf)
  → PDF opens: cover page, summary metrics, chart, verification statement
```

---

## Flow 2: Driver/Operator — Onboarding to Active Network

### Phase 1: Operator Signup & Setup

```
Out Mobility team signs agreement with fleet operator (offline)
  → Admin creates operator account in admin dashboard
  → Admin sends invite email to operator

Operator receives invite:
  → "You've been added to Out-door network"
  → Click [Set Up Account]
  → Set password
  → Operator dashboard (web) — shows fleet overview (empty)
```

---

### Phase 2: Device Registration & Deployment

```
Admin pre-registers devices (each device UUID entered in admin panel)
  → Admin assigns device to operator
  → Admin assigns device to vehicle (plate number entered)

Device preparation (physical):
  → Tablet configured with kiosk app
  → Device API key flashed onto device
  → Tablet ships or is handed to operator

Operator mounts tablet in vehicle:
  → Headrest mount or center console bracket
  → USB connection to vehicle power
  → Tablet powers on
  → Kiosk app launches automatically
  → App authenticates silently (device key)
  → Schedule fetched
  → Ads begin playing
  → Status bar shows: "● ACTIVE"
```

**Driver experience:**
- Zero setup required from driver
- Driver sees: green dot, earnings display, device working
- No login, no configuration, no decisions

---

### Phase 3: Daily Operation

```
Driver starts shift:
  → Enters vehicle, device wakes from sleep (or is already on)
  → Tablet shows: "● ACTIVE / Today: ₦0 earned"
  → As trips happen and ads play, earnings number increments
  → Driver glances at earnings between trips

If device goes offline:
  → Status changes to yellow "⚡ OFFLINE"
  → Cached ads continue playing
  → Driver doesn't need to do anything — device reconnects automatically

End of day:
  → Driver can glance at final earnings for the day
  → Device goes to sleep when vehicle powers down (or screen dims on idle)
```

---

### Phase 4: Operator Earnings View

```
Operator logs into dashboard (web, monthly)
  → Fleet overview: all vehicles, uptime %, impressions
  → Earnings tab: current month estimate + prior months paid

End of month:
  → Admin generates payouts
  → Operator sees payout status change from "Pending" → "Approved"
  → Admin makes payment (bank transfer / mobile money)
  → Operator marks receipt, admin marks paid
  → Operator sees "Paid — ₦128,400 — May 1, 2026" in payout history
```

---

## Flow 3: Admin — Daily Operations

### Morning Check (5 minutes)

```
Admin opens admin dashboard (Overview tab)
  → System status banner: green = good, red = investigate
  → Alerts panel: 3 items today
    1. "2 campaigns awaiting approval" → [Review]
    2. "DEV-019 offline 4h" → [View]
    3. "Fraud flag: DEV-034" → [Review]

Admin resolves in order of priority:
  1. Fraud flag first (could affect advertiser trust)
  2. Offline device second (revenue impact for operator)
  3. Campaign approval third (advertiser waiting)
```

---

### Campaign Approval

```
Admin → Campaigns → Pending Approval (3)
  → Click [Review] on first campaign
  → Modal opens: advertiser info, campaign details, creative preview
  → Admin plays video (in-panel preview)
  → Content acceptable → [Approve ✓]
  → Campaign status: Approved / Scheduled / Active
  → Advertiser email sent automatically

If content issue:
  → [Reject] → type reason → [Confirm Reject]
  → Advertiser notified with reason
  → Campaign returns to Draft state
```

---

### Fraud Review

```
Admin → Fraud Flags (3 pending)
  → Click DEV-034 flag
  → Modal shows: "no_heartbeat_correlation — 12 impressions"
  → Review evidence: heartbeat chart shows gap, impression timestamps in gap
  → Evidence is conclusive → [Invalidate] → type note → [Confirm]
  → 12 impressions rejected
  → Campaign stats updated (impressions removed)

OR:
  → Evidence inconclusive → [Validate]
  → 12 impressions counted
  → Note: "manual review — GPS data missing, heartbeat gap minor"
```

---

### Monthly Payout Cycle

```
End of month:
  Admin → Payouts → [Generate Payouts for April]
  → System calculates per operator, per vehicle
  → Review screen: all operators, amounts, impression counts
  → [Confirm Generate] → payout records created

Next day:
  Admin reviews payout list
  → Fleet A: $2,100 — [View Detail] → vehicle breakdown looks correct
  → [Approve]
  → Process payment externally (bank transfer)
  → Return to admin: [Mark as Paid] → enter reference + date → [Confirm]
  → Operator sees: "Paid — May 1, 2026" in their dashboard
```

---

## Key UX Moments (Cross-Flow)

### The Trust Moment (Advertiser)
When the advertiser first sees "Verified Impressions ✓" on their dashboard,
they understand what makes Out-door different. This label must be:
- Visually distinct (blue checkmark icon, not just text)
- Consistent — appears on every impression number everywhere
- Explained on hover: "Impressions verified by trip telemetry + device heartbeat"

### The Earnings Moment (Driver)
When the driver's earnings display clicks over for the first time — from ₦0 to ₦40 —
they understand the value proposition. This update must feel:
- Immediate (not delayed by an hour)
- Concrete (local currency, specific number)
- Motivating (shown prominently, not buried)

### The Alert Moment (Admin)
When an admin opens the dashboard and sees a green "All systems operational" status,
they can start their day with confidence. When it's red, they see exactly what's wrong
and how to fix it — no hunting. The system earns their trust by being honest and direct.

---

## Flow Error Cases

| Error | When | How it's handled |
|---|---|---|
| Upload fails | Creative too large or wrong format | Inline error, file removed, user re-uploads |
| Campaign rejected | Admin rejects | Email to advertiser + reason, back to Draft |
| Device offline | No heartbeat >1h | Admin alert, operator email (future: auto-alert) |
| Budget exhausted | Spend = budget | Campaign auto-completes, advertiser notified |
| Payout held | Fraud investigation | Operator notified by email, admin note attached |
| API error on submit | Server unreachable | Toast: "Something went wrong. Your data is saved. Try again." |

**Rule:** Never lose user data. All form data is preserved on error. Never redirect without confirmation.
