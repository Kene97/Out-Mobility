# Advertiser Dashboard — UI Structure

**User:** Brand manager or media agency buyer.
**Goal:** Create campaigns, track delivery, download reports.
**Mental model:** Think Stripe dashboard — clean, dense, trustworthy.

---

## Navigation Structure

```
Sidebar (240px)
├── Dashboard          (home overview)
├── Campaigns          (list + management)
│   └── [Campaign name]  (detail view)
├── Creatives          (asset library)
├── Analytics          (aggregated reporting)
├── Reports            (download center)
└── Account            (profile, billing contact)
```

---

## Screen 1: Dashboard (Home)

**Purpose:** At-a-glance status across all campaigns.

```
┌─────────────────────────────────────────────────────────────────┐
│ Sidebar │  Dashboard                          [New Campaign ▶]  │
│         │  ─────────────────────────────────────────────────   │
│         │                                                        │
│         │  ┌────────────┐ ┌────────────┐ ┌────────────┐        │
│         │  │ Active     │ │ Verified   │ │ Total      │        │
│         │  │ Campaigns  │ │ Impressions│ │ Spent      │        │
│         │  │            │ │            │ │            │        │
│         │  │     3      │ │  142,891   │ │  $2,840    │        │
│         │  │ ↑ 1 this   │ │ ↑ 12% vs  │ │ 68% of     │        │
│         │  │   week     │ │   last wk  │ │ budget     │        │
│         │  └────────────┘ └────────────┘ └────────────┘        │
│         │                                                        │
│         │  Active Campaigns                                      │
│         │  ┌─────────────────────────────────────────────────┐  │
│         │  │  NAME      STATUS   IMPRESSIONS  SPENT  ENDS    │  │
│         │  │  Brand X   ● Active  48,201       $940   May 15 │  │
│         │  │  Promo Y   ● Active  62,130       $1,200 May 20 │  │
│         │  │  Launch Z  ⏸ Paused  32,560       $700   Jun 1  │  │
│         │  └─────────────────────────────────────────────────┘  │
│         │  View all campaigns →                                  │
│         │                                                        │
│         │  Quick Actions                                         │
│         │  ┌───────────────────┐  ┌───────────────────────────┐ │
│         │  │ Resume "Launch Z" │  │ Download May report       │ │
│         │  └───────────────────┘  └───────────────────────────┘ │
└─────────┴───────────────────────────────────────────────────────┘
```

**Design notes:**
- "New Campaign" is the only primary button on this screen
- Metric cards show trend vs. prior period — context always included
- Active campaigns table shows max 5 rows — "View all" links to full list
- Quick actions surface the 2 most relevant next steps automatically
- No charts on home — charts are on campaign detail (avoid dashboard overload)

---

## Screen 2: Campaign List

**Purpose:** Full view and management of all campaigns.

```
┌──────────────────────────────────────────────────────────────────┐
│ Sidebar │  Campaigns                            [New Campaign ▶] │
│         │  ─────────────────────────────────────────────────    │
│         │                                                         │
│         │  [All ▾] [Active] [Paused] [Completed] [Draft]        │
│         │                                           [Search...]  │
│         │                                                         │
│         │  ┌──────────────────────────────────────────────────┐  │
│         │  │ NAME ↕  STATUS    IMPRESSIONS  SPEND    CPM  END │  │
│         │  ├──────────────────────────────────────────────────┤  │
│         │  │ Brand X ●Active   48,201       $940   $6.58 May15│  │
│         │  │ Promo Y ●Active   62,130       $1,200 $5.12 May20│  │
│         │  │ Launch Z ⏸Paused  32,560       $700   $7.20 Jun 1│  │
│         │  │ Test Ad  ○Draft   —            —      —    May 30│  │
│         │  │ April Rn ✓Done    112,400      $2,100 $5.30 Apr30│  │
│         │  └──────────────────────────────────────────────────┘  │
│         │  Showing 5 of 12 campaigns     [‹ 1 2 ›]              │
└─────────┴────────────────────────────────────────────────────────┘
```

**Row hover reveals:**
- Pause / Resume toggle
- View details link
- Download report link
- 3-dot menu (edit if draft, cancel)

**Filter tabs:** All | Active | Paused | Completed | Draft
**Sort:** Clickable column headers. Default: sort by end date (soonest first).

---

## Screen 3: Campaign Detail

**Purpose:** Full performance view for one campaign.

```
┌──────────────────────────────────────────────────────────────────┐
│ Sidebar │  ← Back to Campaigns                                   │
│         │  Brand Awareness — May 2026    ● Active  [Pause] [...] │
│         │  ─────────────────────────────────────────────────    │
│         │                                                         │
│         │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│         │  │ Verified │ │ Budget   │ │   CPM    │ │  Days    │ │
│         │  │Impressns │ │  Spent   │ │ Achieved │ │Remaining │ │
│         │  │  48,201  │ │$940/$2K  │ │  $6.58   │ │    8     │ │
│         │  │ ↑12% wk  │ │▓▓▓▓░░░░ │ │          │ │ ends May │ │
│         │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│         │                                                         │
│         │  ┌────────────────────────────────────────┐            │
│         │  │ Impressions over time                   │            │
│         │  │                                         │            │
│         │  │  ████  ████  ████  ████  ████  ████   │ ← bar chart│
│         │  │  May1  May3  May5  May7  May9  May11  │            │
│         │  └────────────────────────────────────────┘            │
│         │                                                         │
│         │  Delivery by Vehicle                [Download CSV ↓]   │
│         │  ┌──────────────────────────────────────────────────┐  │
│         │  │ DEVICE     OPERATOR    IMPRESSIONS  UPTIME  STATUS│  │
│         │  │ DEV-001    Fleet A     4,201         94%    ●     │  │
│         │  │ DEV-002    Fleet A     3,890         88%    ●     │  │
│         │  │ DEV-007    Fleet B     2,100         71%    ⏸     │  │
│         │  └──────────────────────────────────────────────────┘  │
│         │                                                         │
│         │  [Download Full Report ↓]                              │
└─────────┴────────────────────────────────────────────────────────┘
```

**Design notes:**
- Budget spent uses a progress bar inline in the metric card
- "Verified Impressions" label is intentionally prominent — this is the trust signal
- Chart is simple bar chart — no pie charts, no donut charts
- Per-device table shows anonymized device IDs — advertiser does not see operator names (privacy)
- "Download Full Report" is a secondary button pinned above the footer

**Trust indicator design:**
Small "Verified ✓" chip next to impression count. Tooltip: "Impressions verified by Out Mobility telemetry — trip-level GPS + device heartbeat."

---

## Screen 4: Campaign Creation Wizard

**4-step modal wizard. Full screen overlay (not sidebar layout).**

### Step 1: Campaign Basics
```
Create Campaign                                    Step 1 of 4

Campaign name        [                           ]
                      e.g. "Brand Awareness May 2026"

Start date           [05 / 15 / 2026]
End date             [05 / 31 / 2026]

Total budget         [$       2,000.00            ]
                      Minimum $500 per campaign

CPM rate             Calculated: $6.50 / 1,000 impressions
                      Based on current fleet inventory

                                          [Cancel] [Next →]
```

### Step 2: Upload Creative
```
Upload Creative                                    Step 2 of 4

┌─────────────────────────────────────────────────────┐
│                                                      │
│    ↑   Drag & drop video or image here               │
│        or click to browse                            │
│                                                      │
│        MP4 (max 60 sec, max 50MB)                   │
│        JPG / PNG (max 5MB)                          │
│                                                      │
└─────────────────────────────────────────────────────┘

[ Uploading: brand_ad_may.mp4 ━━━━━━━━░░ 72% ]

Preview                                Duration: 30 sec
┌──────────────────┐
│                  │   File: brand_ad_may.mp4
│   [▶ Preview]    │   Size: 28.4 MB
│                  │   Format: MP4 ✓
└──────────────────┘

                                      [← Back] [Next →]
```

### Step 3: Geo Targeting
```
Targeting                                          Step 3 of 4

Target city          [Lagos, Nigeria          ▾]

Coverage radius      ○ City-wide (50km radius)   ← default
                     ○ City center only (10km)
                     ○ Custom radius [___] km

┌──────────────────────────────────────────┐
│            [Map preview]                  │
│   Shows coverage area shaded on map       │
│   Active vehicles in area: 142            │
└──────────────────────────────────────────┘

Estimated reach      ~142 vehicles
                     ~18,000 impressions/week at current pace

                                      [← Back] [Next →]
```

### Step 4: Review & Submit
```
Review                                             Step 4 of 4

Campaign name        Brand Awareness May 2026
Dates                May 15 – May 31, 2026 (17 days)
Budget               $2,000 total / $117.65 per day
CPM rate             $6.50
Target area          Lagos, Nigeria (city-wide)
Creative             brand_ad_may.mp4 (30 sec)
Est. impressions     ~307,000 over campaign period

─────────────────────────────────────────────────────
Note: Campaign will be reviewed within 24 hours.
You'll be notified when it goes live.

                                [← Back] [Submit Campaign ▶]
```

**Wizard design rules:**
- Progress indicator: horizontal step dots at top (4 dots, filled to current)
- Never lose data when navigating Back
- Estimated impressions shown on Step 4 is clearly labeled "estimate" — not a guarantee
- Submit creates campaign in SUBMITTED state, not ACTIVE

---

## Screen 5: Reports

```
┌──────────────────────────────────────────────────────────────────┐
│ Sidebar │  Reports                                               │
│         │  ─────────────────────────────────────────────────   │
│         │                                                        │
│         │  Download campaign reports                             │
│         │                                                        │
│         │  ┌──────────────────────────────────────────────────┐ │
│         │  │ CAMPAIGN         PERIOD         FORMAT  DOWNLOAD  │ │
│         │  │ Brand Awareness  May 1–31 2026  —       [CSV][PDF]│ │
│         │  │ Promo Y          Apr 1–30 2026  —       [CSV][PDF]│ │
│         │  │ Launch Z         Mar 1–31 2026  —       [CSV][PDF]│ │
│         │  └──────────────────────────────────────────────────┘ │
│         │                                                        │
│         │  Reports include verified impression data only.        │
│         │  All data is authenticated by Out Mobility telemetry.  │
└─────────┴────────────────────────────────────────────────────────┘
```

**Design note:** "Verified impression data only" is a permanent trust statement on this screen. It reinforces the value proposition every time the advertiser downloads a report.

---

## Empty States (Advertiser)

**No campaigns:**
```
      [chart icon]
   No campaigns yet
   Create your first campaign to start
   reaching passengers across the network.

         [Create Campaign ▶]
```

**Campaign with no impressions yet (just went live):**
```
      [hourglass icon]
   Impressions starting soon
   Your campaign is live. First verified
   impressions typically appear within 1–2 hours.
```

---

## Responsive Behavior

- **>1024px:** Full sidebar + content layout (primary experience)
- **768–1024px:** Sidebar collapses to icon-only (48px wide). Tap icon to expand overlay.
- **<768px:** Sidebar replaced by bottom navigation (4 tabs: Home, Campaigns, Analytics, Account). Tables become cards.

**Mobile priority for MVP:** Low. Advertiser dashboard is desktop-primary. Ensure it doesn't break on mobile but don't optimize for it.
