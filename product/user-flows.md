# User Flows — Out-door

Three actors. Three flows. All interconnected through the platform.

---

## 1. Advertiser Flow

### 1.1 Onboarding
```
Land on dashboard →
  Sign up (name, company, email, password) →
  Email verification →
  Account created (status: pending) →
    [Admin activates account OR auto-activated] →
  Login →
  Dashboard home (empty state with CTA: "Create your first campaign")
```

### 1.2 Create Campaign
```
Click "New Campaign" →
  Step 1: Campaign basics
    - Campaign name
    - Start date / End date
    - Total budget ($)
  Step 2: Creative upload
    - Upload video (MP4, max 60s, max 50MB) or image (JPG/PNG, max 5MB)
    - Preview creative
    - System validates file format and size
  Step 3: Targeting
    - Select city / region (dropdown)
    - Optional: select route type (all / highway / city center)
  Step 4: Review
    - Summary: budget, dates, geo, creative thumbnail
    - Estimated impressions (based on available inventory)
    - Submit for approval OR auto-launch
```

### 1.3 Campaign Live
```
Campaign approved / auto-approved →
  Status changes to "Scheduled" (if start date future) or "Active" (if today) →
  Devices begin receiving schedule →
  Ads start playing →
  Impression logs flow in →
  Dashboard updates every 15 minutes:
    - Impressions delivered
    - Budget spent
    - CPM
    - Devices reached
```

### 1.4 Monitor and Manage
```
Dashboard home →
  Campaign list (status badges: Active / Paused / Completed) →
  Click campaign →
    - Live impression chart
    - Spend vs budget bar
    - Top performing vehicles (by impressions)
    - Geographic map of delivery
  Actions:
    - Pause campaign
    - Resume campaign
    - Add budget (if pre-pay model)
    - Download report (CSV / PDF)
```

### 1.5 Report Download
```
Campaign detail page →
  Click "Download Report" →
  Select format (CSV / PDF) →
  Report includes:
    - Total verified impressions
    - Total spend
    - CPM achieved
    - Impressions by day
    - Impressions by vehicle (anonymized device ID)
    - Geographic delivery heatmap (PDF only)
  File downloads immediately
```

---

## 2. Driver / Operator Flow

### 2.1 Device Onboarding
```
Out Mobility ships / hands over Android tablet →
  Admin has pre-registered device (device UUID in system) →
  Driver mounts tablet in vehicle →
  Powers on tablet →
  Kiosk app launches automatically (no setup required) →
  App authenticates with device key (pre-loaded at factory/flash time) →
  App fetches schedule →
  Ad playback begins →
  Driver sees: status bar showing "Online" and earnings summary
```

### 2.2 Daily Driver Experience
```
Power on vehicle →
  Tablet wakes from sleep (or boots) →
  Kiosk app resumes →
  Ads play automatically →
  Driver sees:
    - Today's earnings estimate (running total)
    - Uptime indicator (green = online, grey = offline)
    - No controls — device is locked down
```

### 2.3 Earnings View (Operator Dashboard)
```
Operator logs into dashboard (web) →
  Home: Summary card per vehicle
    - Uptime % (this month)
    - Impressions delivered (this month)
    - Estimated earnings (this month)
  Click vehicle →
    - Daily breakdown (uptime, impressions, earnings)
    - Device status (online/offline, last seen)
  Payouts tab:
    - Pending payout (calculated monthly)
    - Payout history (date, amount, status)
```

### 2.4 Support
```
Driver notices issue (screen frozen, no internet) →
  In-app support button (one of few allowed actions in kiosk mode) →
  Opens simple form:
    - Issue type (dropdown)
    - Description (text)
    - Submit →
  Ticket created in admin panel →
  Admin responds via email or phone call
```

---

## 3. Admin Flow

### 3.1 Campaign Approval
```
Advertiser submits campaign →
  Admin gets notification (email or in-app alert) →
  Open campaign review page:
    - Campaign details (name, dates, budget, geo)
    - Creative preview (play video / view image)
    - Advertiser info
  Actions:
    - Approve → campaign moves to Scheduled/Active
    - Reject → select reason → advertiser notified
    - Request revision → send note to advertiser
```

### 3.2 Device Monitoring
```
Admin → Devices tab →
  Fleet overview:
    - Map view (device GPS positions)
    - List view (device ID, operator, status, last seen)
    - Status filters: All / Online / Offline / Flagged
  Click device:
    - Device details (operator, vehicle, app version)
    - Heartbeat history (last 24h chart)
    - Recent impression logs
    - GPS track (last 24h)
  Actions:
    - Suspend device (stops schedule delivery)
    - Mark for investigation
    - Force schedule refresh
```

### 3.3 Fraud Review
```
Admin → Fraud Flags tab →
  List of flagged impression batches:
    - Device ID, date, flag reason, impression count
  Click flag:
    - Suspicious log details
    - Comparison: heartbeat data vs impression timestamps
    - GPS track vs expected area
  Actions:
    - Mark valid → impressions credited to campaign
    - Mark invalid → impressions rejected
    - Suspend device → removed from network
```

### 3.4 Payout Management
```
End of month (or trigger manually) →
  Admin → Payouts tab →
  System generates payout summary per operator:
    - Vehicles, impressions, calculated earnings
  Admin reviews:
    - Approve payout → mark as processing
    - Hold payout → add note (fraud investigation, etc.)
  Payment processed externally (bank transfer / mobile money) →
  Admin marks payout as "Paid" with reference number →
  Operator sees "Paid" status in their dashboard
```

### 3.5 System Health
```
Admin → System tab →
  Key metrics:
    - API uptime (last 24h)
    - Event ingestion lag (median time from device log to server)
    - Active devices (heartbeat in last 5 minutes)
    - Verification queue depth (unprocessed logs)
    - Active campaigns
  Alerts panel:
    - Devices offline >1 hour
    - High rejection rate on campaign
    - Event sync lag >10 minutes
```

---

## Flow Interconnection

```
Advertiser creates campaign
        ↓
Admin approves (or auto-approves)
        ↓
Backend schedules campaign to matching devices
        ↓
Device fetches schedule, caches creatives
        ↓
Device plays ads, logs events
        ↓
Device syncs logs to backend
        ↓
Verification service processes logs
        ↓
Verified impressions counted to campaign
        ↓
Advertiser dashboard updates
        ↓
Budget depleted or end date reached → campaign completes
        ↓
Operator earnings calculated from verified impressions
        ↓
Admin reviews and approves payout
        ↓
Operator receives payment
```
