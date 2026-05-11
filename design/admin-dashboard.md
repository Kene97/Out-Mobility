# Admin Dashboard — UI Structure

**User:** Out Mobility internal team (1–3 people running the entire platform).
**Goal:** Approve campaigns, monitor devices, review fraud, manage payouts, watch system health.
**Mental model:** Stripe's internal admin + Uber's Surge operations dashboard.

---

## Navigation Structure

```
Sidebar (240px)
├── Overview           (system health + alerts home)
├── Campaigns          (approval queue + all campaigns)
├── Devices            (fleet monitoring)
├── Fraud Flags        (verification exceptions)
├── Payouts            (operator earnings + approval)
├── Operators          (fleet operator management)
├── Advertisers        (advertiser account management)
└── System             (API health, jobs, logs)
```

---

## Screen 1: Overview (Home)

**Purpose:** One screen that shows if the network is healthy and what needs attention.

```
┌─────────────────────────────────────────────────────────────────┐
│ Sidebar │  Overview                              May 4, 2026     │
│         │  ─────────────────────────────────────────────────   │
│         │                                                        │
│         │  System status  ● All systems operational             │
│         │                                                        │
│         │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│         │  │ Active   │ │Impressns │ │  Fraud   │ │ Pending  │ │
│         │  │ Devices  │ │  Today   │ │  Flags   │ │ Payouts  │ │
│         │  │          │ │          │ │          │ │          │ │
│         │  │ 134/142  │ │  28,401  │ │    3     │ │    5     │ │
│         │  │ 94% fleet│ │ ↑ 8% vs  │ │ pending  │ │ $4,200   │ │
│         │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│         │                                                        │
│         │  Alerts requiring action                               │
│         │  ┌────────────────────────────────────────────────┐   │
│         │  │ ⚠ 3 campaigns awaiting approval               [Review →]│
│         │  │ ⚠ DEV-007 offline for 3 hours                [View →] │
│         │  │ ⚠ Fraud flag: DEV-019, 48 impressions         [Review →]│
│         │  └────────────────────────────────────────────────┘   │
│         │                                                        │
│         │  Network at a glance                                   │
│         │  ┌────────────────────────────────────────────────┐   │
│         │  │ Active campaigns  7    Impressions/hr  2,200   │   │
│         │  │ Pending campaigns 3    Avg device uptime  91%  │   │
│         │  │ Total advertisers 12   Operator count     4    │   │
│         │  └────────────────────────────────────────────────┘   │
└─────────┴───────────────────────────────────────────────────────┘
```

**Design notes:**
- System status banner is the first thing seen — green bar = everything is fine
- Alert list is sorted by priority: campaigns > offline devices > fraud flags
- "Network at a glance" panel is read-only, dense, no actions needed
- Each alert has a direct action link — no hunting through menus

---

## Screen 2: Campaign Approval Queue

**Purpose:** Review and approve/reject submitted campaigns.

```
┌──────────────────────────────────────────────────────────────────┐
│ Sidebar │  Campaigns                                             │
│         │  [Pending Approval (3)] [All Campaigns] [By Advertiser]│
│         │  ─────────────────────────────────────────────────    │
│         │                                                         │
│         │  Pending Approval                                       │
│         │  ┌──────────────────────────────────────────────────┐  │
│         │  │ ADVERTISER  CAMPAIGN         BUDGET  SUBMITTED   │  │
│         │  │ Acme Corp   Summer Drive     $3,000  2h ago  [Review]│
│         │  │ BrandX      May Awareness    $1,500  5h ago  [Review]│
│         │  │ TelecomCo   Promo Launch     $5,000  1d ago  [Review]│
│         │  └──────────────────────────────────────────────────┘  │
└─────────┴────────────────────────────────────────────────────────┘
```

**Review Modal (full campaign):**
```
┌─────────────────────────────────────────────────────────────────┐
│  Review Campaign                                            [✕]  │
│  ─────────────────────────────────────────────────────────      │
│                                                                   │
│  Advertiser     Acme Corp (verified account, 2 past campaigns)   │
│  Campaign       Summer Drive                                      │
│  Dates          May 15 – Jun 15, 2026                            │
│  Budget         $3,000 total / $100/day                          │
│  Targeting      Lagos, Nigeria (city-wide)                        │
│                                                                   │
│  Creative preview                                                 │
│  ┌──────────────────────────────────┐                            │
│  │                                  │  Duration: 30 sec          │
│  │        [▶ Play video]            │  File: summer_drive.mp4    │
│  │                                  │  Size: 22.1 MB             │
│  └──────────────────────────────────┘                            │
│                                                                   │
│  Rejection reason (required if rejecting)                        │
│  [                                                           ]    │
│                                                                   │
│  ────────────────────────────────────────────────────────────    │
│                [Reject ✕]  [Request Revision]  [Approve ✓]       │
└─────────────────────────────────────────────────────────────────┘
```

**Modal design notes:**
- Video plays in-panel (no new tab)
- Advertiser history shown (builds or reduces trust quickly)
- Rejection reason is required before reject button activates
- Approve is the rightmost button (reading flow ends at the primary action)

---

## Screen 3: Device Fleet

**Purpose:** Monitor every device on the network.

### Map View (default)
```
┌──────────────────────────────────────────────────────────────────┐
│ Sidebar │  Devices                              [+ Register Device]│
│         │  [Map View ●] [List View]     Filter: [All ▾]          │
│         │  ─────────────────────────────────────────────────    │
│         │                                                         │
│         │  ┌────────────────────────────────────────────────┐    │
│         │  │                                                 │    │
│         │  │   [Map of Lagos with device pins]               │    │
│         │  │   ● green = online (134)                        │    │
│         │  │   ● yellow = stale (5)                          │    │
│         │  │   ● red = offline (3)                           │    │
│         │  │                                                 │    │
│         │  └────────────────────────────────────────────────┘    │
│         │                                                         │
│         │  Fleet summary                                          │
│         │  Online: 134  Stale: 5  Offline: 3  Suspended: 0       │
└─────────┴────────────────────────────────────────────────────────┘
```

### List View
```
┌──────────────────────────────────────────────────────────────────┐
│ Sidebar │  Devices                              [+ Register Device]│
│         │  [Map View] [List View ●]  Filter: [All ▾] [Search...]  │
│         │  ─────────────────────────────────────────────────    │
│         │                                                         │
│         │  ┌──────────────────────────────────────────────────┐  │
│         │  │ DEVICE    OPERATOR   STATUS   LAST SEEN  UPTIME  │  │
│         │  │ DEV-001   Fleet A    ●Online  Just now   94%     │  │
│         │  │ DEV-002   Fleet A    ●Online  2 min ago  88%     │  │
│         │  │ DEV-007   Fleet B    ⚡Stale  42 min ago 71%     │  │
│         │  │ DEV-019   Fleet B    ●Offline 3h ago     45%     │  │
│         │  └──────────────────────────────────────────────────┘  │
└─────────┴────────────────────────────────────────────────────────┘
```

### Device Detail (side panel, slides in from right)
```
┌────────────────────────────────────────────────┐
│  DEV-019                               [✕]      │
│  ─────────────────────────────────────         │
│  Status       ● Offline (3h 12m)                │
│  Operator     Fleet B                           │
│  Vehicle      LG 241 KJA                        │
│  App version  1.2.1                             │
│  Last GPS     6.4521, 3.3902                    │
│                                                 │
│  Heartbeat history (last 24h)                   │
│  ████████████████████░░░░░░░░░░  ← 24h bar     │
│  Online ───────────── Gap ──────                │
│                                                 │
│  Recent impressions (last 10)                   │
│  09:14:21  camp-001  ✓ Valid                    │
│  09:09:18  camp-001  ✓ Valid                    │
│  09:04:12  camp-002  ✓ Valid                    │
│  ...                                            │
│                                                 │
│  ─────────────────────────────────────         │
│  [Suspend Device]  [Force Refresh]  [Flag]      │
└────────────────────────────────────────────────┘
```

**Design notes:**
- Heartbeat history is a color-coded 24-hour bar (green = online, red = offline, blank = unrecorded)
- Device actions are in the detail panel, not the list — prevents accidental actions
- "Suspend Device" is a danger action: requires confirmation modal

---

## Screen 4: Fraud Flags

**Purpose:** Review and resolve suspicious impression batches.

```
┌──────────────────────────────────────────────────────────────────┐
│ Sidebar │  Fraud Flags                          3 pending review  │
│         │  ─────────────────────────────────────────────────    │
│         │                                                         │
│         │  ┌──────────────────────────────────────────────────┐  │
│         │  │ DEVICE   REASON            IMPRESSNS  CAMPAIGN    │  │
│         │  │ DEV-019  static_gps         48        Brand X [Review]│
│         │  │ DEV-034  no_heartbeat       12        Promo Y [Review]│
│         │  │ DEV-051  rate_anomaly       94        Launch Z[Review]│
│         │  └──────────────────────────────────────────────────┘  │
└─────────┴────────────────────────────────────────────────────────┘
```

**Flag Review Modal:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Fraud Review — DEV-019                                    [✕]  │
│  ─────────────────────────────────────────────────────────      │
│  Flag reason: static_gps                                         │
│  "Device reported the same GPS coordinates for 4+ hours          │
│   while logging 48 impressions."                                 │
│                                                                   │
│  Evidence                                                         │
│  ┌───────────────────────────┐ ┌──────────────────────────────┐  │
│  │ GPS Track (last 8h)       │ │ Heartbeat Timeline           │  │
│  │                           │ │                              │  │
│  │ [Map — point not moving]  │ │ [Bar chart — gaps visible]   │  │
│  └───────────────────────────┘ └──────────────────────────────┘  │
│                                                                   │
│  Impression log sample (first 5 of 48)                           │
│  09:14  6.4521, 3.3902  30s  ✓ complete                          │
│  09:19  6.4521, 3.3902  30s  ✓ complete   ← same GPS            │
│  09:24  6.4521, 3.3902  30s  ✓ complete   ← same GPS            │
│                                                                   │
│  Resolution note (required)                                       │
│  [                                                           ]    │
│                                                                   │
│  [Invalidate (reject 48)] [Validate (accept 48)] [Suspend Device]│
└─────────────────────────────────────────────────────────────────┘
```

**Design notes:**
- Two-panel evidence view (map + heartbeat) shows the contradiction visually
- Impression log sample shows the problematic pattern in plain sight
- Invalidate and Validate both require a note — creates audit trail
- "Suspend Device" is the highest severity action — placed last

---

## Screen 5: Payouts

**Purpose:** Calculate, review, and approve operator payouts.

```
┌──────────────────────────────────────────────────────────────────┐
│ Sidebar │  Payouts                     Period: [April 2026 ▾]    │
│         │  ─────────────────────────────────────────────────    │
│         │                          [Generate Payouts for April] │
│         │                                                         │
│         │  ┌──────────────────────────────────────────────────┐  │
│         │  │ OPERATOR  VEHICLES  IMPRESSNS  PAYOUT  STATUS    │  │
│         │  │ Fleet A      82     112,400    $2,100  ○Pending   │  │
│         │  │ Fleet B      44      62,300    $1,140  ○Pending   │  │
│         │  │ Fleet C      16      18,900      $360  ✓Paid      │  │
│         │  └──────────────────────────────────────────────────┘  │
│         │                                                         │
│         │  Total pending: $3,240 across 2 operators              │
│         │  [Approve All Pending →]                               │
└─────────┴────────────────────────────────────────────────────────┘
```

**Payout Detail (side panel):**
```
┌────────────────────────────────────────────────┐
│  Fleet A — April 2026 Payout           [✕]      │
│  ─────────────────────────────────────         │
│  Impressions    112,400 verified               │
│  Gross revenue  $3,000                         │
│  Revenue share  35% (contracted)               │
│  Payout amount  $1,050.00                      │
│                                                │
│  Vehicle breakdown                             │
│  DEV-001  48,200 imp  $420.00                  │
│  DEV-002  41,100 imp  $360.00                  │
│  DEV-007  23,100 imp  $210.00  (offline 3d)    │
│  ...                                           │
│                                                │
│  ─────────────────────────────────────         │
│  [Hold Payout]  [Approve →]                    │
└────────────────────────────────────────────────┘
```

**Mark as Paid modal (appears after Approve):**
```
┌─────────────────────────────────────────────────┐
│  Mark Fleet A Payout as Paid              [✕]   │
│                                                  │
│  Amount     $1,050.00                            │
│  Method     [Bank Transfer ▾]                    │
│  Reference  [                              ]     │
│  Date       [05 / 01 / 2026              ]       │
│                                                  │
│             [Cancel]  [Confirm Payment ✓]        │
└─────────────────────────────────────────────────┘
```

---

## Screen 6: System Health

**Purpose:** Is the platform running correctly?

```
┌──────────────────────────────────────────────────────────────────┐
│ Sidebar │  System Health                                          │
│         │  ─────────────────────────────────────────────────    │
│         │                                                         │
│         │  ● All systems operational         Last check: 14s ago │
│         │                                                         │
│         │  Infrastructure                                         │
│         │  ┌──────────────────────────────────────────────────┐  │
│         │  │ API Response Time (p95)    220ms       ● Normal  │  │
│         │  │ Event Ingestion Lag        4.2 min     ● Normal  │  │
│         │  │ Verification Queue         142 events  ● Normal  │  │
│         │  │ Active Device Heartbeats   94%         ● Normal  │  │
│         │  │ Database Connections       38/100      ● Normal  │  │
│         │  │ Storage Used               24% of 500GB● Normal  │  │
│         │  └──────────────────────────────────────────────────┘  │
│         │                                                         │
│         │  Background Jobs (last run)                             │
│         │  ┌──────────────────────────────────────────────────┐  │
│         │  │ Stats aggregation     2 min ago        ✓ Success │  │
│         │  │ Campaign transitions  12 min ago        ✓ Success │  │
│         │  │ Verification pipeline 4 min ago         ✓ Success │  │
│         │  │ Daily reconciliation  6h ago             ✓ Success │  │
│         │  └──────────────────────────────────────────────────┘  │
└─────────┴────────────────────────────────────────────────────────┘
```

**Status indicators:**
- ● Normal (green) — within thresholds
- ● Warning (yellow) — approaching threshold
- ● Critical (red) — exceeded threshold, needs attention

**Alert thresholds:**
| Metric | Warning | Critical |
|---|---|---|
| API p95 | >1s | >3s |
| Ingestion lag | >10 min | >30 min |
| Verification queue | >500 | >2,000 |
| Active heartbeats | <85% | <70% |
| DB connections | >70% | >90% |

---

## Admin UX Principles

1. **Density is good here** — admins are power users, not casual visitors
2. **Surface alerts above everything** — an alert panel on Overview means no hunting
3. **Every action has confirmation** — no accidental approvals or rejections
4. **Audit trail is always visible** — notes, dates, who did what
5. **One click to any resource** — links from alerts go directly to the affected item, not the section home
6. **No empty state decoration** — if the fraud queue is empty, say "No flags — all clear." No illustration needed.
