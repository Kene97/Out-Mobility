# 90-Day Execution Plan — Out Mobility

**Start date:** May 2026
**Goal:** First verified impression report delivered to a paying advertiser.
**Rule:** Every week has one primary objective. Multitasking kills early-stage execution.

---

## Overview

```
DAY 0                 DAY 30               DAY 60               DAY 90
  │                     │                    │                    │
FOUNDATION           DEPLOYMENT           ACTIVATION           VALIDATION
  │                     │                    │                    │
Legal + hardware     20 devices live      50 devices live      3 advertisers
Platform dev start   First campaign       2 campaigns live     1 renewal
Operator signed      running              Fill rate 35%+       $2K+ MRR
                     Dashboard V1                              Investor deck ready
```

---

## Phase 1: Foundation (Days 1–30)

**Objective:** Everything needed to go live is ready. First device in a vehicle.

### Week 1 (Days 1–7): Company & Infrastructure

**Priority:** Get the legal and operational foundation done fast. Don't spend more than 3 days on admin.

| Task | Owner | Done When |
|---|---|---|
| Register company (RC with CAC Nigeria) | Founder | Certificate received |
| Open business bank account | Founder | Account active, online banking live |
| Secure domain + email (outmobility.io) | Founder | DNS live, email working |
| Set up GitHub repo + development environment | Founder/Tech | Backend codebase started |
| Order first 30 Android tablets (Tecno T9 Plus or equivalent) | Founder | Order confirmed, delivery date set |
| Set up Headwind MDM (open source) on DigitalOcean droplet | Tech | MDM accessible via browser |
| Deploy backend API skeleton to Railway | Tech | `/health` endpoint returns 200 |

**Critical path:** Tablet delivery. Order on Day 1. Everything else waits on hardware.

### Week 2 (Days 8–14): Operator Acquisition

**Priority:** Sign first operator MOU before devices arrive. Don't pitch without a name.

| Task | Done When |
|---|---|
| Map top 20 fleet operators in Lagos (LinkedIn, WhatsApp groups, referrals) | List exists with contact info |
| Make 10 operator outreach contacts (warm intro preferred, cold call if needed) | 10 conversations started |
| Pitch meeting with top 3 operators | 3 meetings held |
| Sign MOU with Operator #1 (50+ vehicles committed) | MOU signed |
| Identify 10 specific vehicles from Operator #1 for pilot | Vehicle list with plates |
| Set up operator dashboard (basic: vehicle list, earnings placeholder) | Operator can log in |

**Operator MOU terms:**
- Revenue share: 35% of verified gross revenue
- Device stays in vehicle minimum 30 days
- Operator not responsible for software issues
- Either party can exit with 14-day notice

### Week 3 (Days 15–21): First Device Deployment

**Priority:** Get 10 devices physically installed and transmitting heartbeats.

| Task | Done When |
|---|---|
| Tablets arrive from supplier | Physical devices in hand |
| Flash kiosk app + API keys onto each device | All 10 devices authenticate with backend |
| Enroll all 10 devices in MDM | Devices show in MDM dashboard |
| Physical installation in 10 vehicles (2/day × 5 days) | 10 devices in vehicles, heartbeats confirmed |
| Verify GPS reporting for all 10 devices (check map view in admin dashboard) | All 10 show on map |
| Document installation process (photo evidence for investors) | Photo of each installed device |

**Installation checklist per vehicle:**
- [ ] Tablet mounted (headrest or console, passenger-facing)
- [ ] Power cable connected to vehicle power (USB or 12V adapter)
- [ ] Kiosk app auto-launches on boot
- [ ] Device appears in admin dashboard within 5 minutes
- [ ] GPS coordinates match physical location
- [ ] Heartbeat confirmed (green dot in dashboard)

### Week 4 (Days 22–30): First Advertiser + First Campaign

**Priority:** Get a paying advertiser to commit before Month 1 ends.

| Task | Done When |
|---|---|
| Identify 10 target advertisers in Lagos (FMCG, fintech, food) | List with decision-maker names |
| Make 5 warm-intro requests to advertisers or agencies | 5 introductions made |
| Hold 3 advertiser pitch meetings | 3 meetings held |
| Receive campaign creative from first advertiser | Video/image file in hand |
| Set up first campaign in dashboard (manual admin setup) | Campaign created, scheduled to 10 devices |
| First ad plays on a real device in a real vehicle | Screenshot/video captured |
| Send "we're live" update to investor prospects | Update sent |

**First advertiser pitch:**
"We have 10 screens in Lagos ride-hail vehicles. First campaign is at our introductory rate.
You pay $500. We deliver verified impressions. You get a report with GPS coordinates,
timestamps, and device IDs proving every impression. No estimates. Your money back if we
can't deliver verified proof."

---

## Phase 2: Deployment (Days 31–60)

**Objective:** 50 active devices, 2 campaigns live, dashboard functional.

### Week 5 (Days 31–37): Scale to 30 Devices

| Task | Done When |
|---|---|
| Install devices in remaining 20 vehicles from Operator #1 | 30 devices total live |
| Verify all 30 devices reporting heartbeats > 85% of expected time | Uptime metric visible in dashboard |
| Review first campaign performance (Days 22–37) | Impression count, uptime, fill rate documented |
| Generate first impression report (manual if needed) | PDF report ready to send |
| Deliver impression report to first advertiser | Advertiser has received report |

**Day 37 checkpoint:** Do we have 30 devices live? Is the advertiser satisfied with the report?
If yes: continue. If no: diagnose root cause before adding more devices.

### Week 6 (Days 38–44): Operator #2 + 20 More Devices

| Task | Done When |
|---|---|
| Sign MOU with Operator #2 (20+ additional vehicles) | MOU signed |
| Install 20 devices across Operator #2 fleet | 50 devices total live |
| Second advertiser pitch (use first campaign report as proof) | Second campaign committed |
| Set up second campaign in dashboard | Campaign live on 50 devices |

**Using the first report as a sales tool:**
"This is what our first advertiser received after 2 weeks.
144,000 verified impressions. GPS coordinates. Timestamps. Device IDs.
$6 CPM. $864 total spend. This is what you are buying."

### Week 7 (Days 45–51): Dashboard V1

**Priority:** Advertiser can see live data without calling you.

| Task | Done When |
|---|---|
| Advertiser dashboard: live impression counter (updates every 15 min) | Advertiser can log in, see numbers |
| Campaign status page: spend bar, days remaining, CPM achieved | All fields populated with real data |
| Device map (admin): all 50 devices plotted on Lagos map | Map loads in <3 seconds |
| Basic report download: CSV export of verified impressions | CSV downloads with correct data |

**This week is the product week.** Don't add devices, don't pitch. Build.

### Week 8 (Days 52–60): Advertiser #3 + Fill Rate

| Task | Done When |
|---|---|
| Third advertiser pitch (use 2 case studies now) | Third campaign committed |
| Three campaigns running simultaneously | Fill rate calculated: target 30–40% |
| Device uptime report: all 50 devices, 30-day average | Report shows >85% |
| Week 8 investor update: devices, impressions, MRR, fill rate | Update sent to investor list |

---

## Phase 3: Validation (Days 61–90)

**Objective:** Prove repeat demand. Stable revenue. Investor-ready metrics.

### Week 9 (Days 61–67): First Renewal

**This is the most important moment in the 90 days.**
A renewal means: the product works, the advertiser trusts it, the model is real.

| Task | Done When |
|---|---|
| Campaign 1 ends (if 4-week campaign) | Final impression count locked |
| Renewal conversation with Advertiser #1 | Meeting held |
| Advertiser #1 signs renewal campaign | PO or payment received |
| Renewal campaign goes live immediately | Continuity of revenue |

**If advertiser doesn't renew:** Ask exactly why. This is the most important feedback you will ever receive. Document verbatim.

**If advertiser renews:** Celebrate. Ask for one referral. Use as a reference in every future investor meeting.

### Week 10 (Days 68–74): Revenue & Economics

| Task | Done When |
|---|---|
| Calculate Month 2 MRR (Out Mobility net revenue) | Number documented |
| Calculate fill rate across fleet | % documented |
| Calculate CPM achieved (actual, not target) | Number documented |
| Calculate device uptime (30-day average, all devices) | % documented |
| Calculate impressions per device per month | Number documented |
| Compare all metrics to unit economics model | Gap analysis complete |

**The gap analysis is critical.** Are actual numbers above, below, or in line with the model?
If below: understand why and fix it. If above: raise the targets.

### Week 11 (Days 75–81): Investor Readiness

| Task | Done When |
|---|---|
| Film 3-minute product demo video (see demo-walkthrough.md) | Video uploaded |
| Update financial model with actual Q1 metrics | Model reflects reality |
| Prepare traction slide with real numbers | Numbers verified, no rounding |
| Update pitch deck with actual metrics from Slides 9 and 13 | Deck updated |
| Reach out to 5 pre-seed investors | Meetings scheduled |

### Week 12 (Days 82–90): Fundraise Launch

| Task | Done When |
|---|---|
| First investor meeting | Meeting held |
| Data room ready and accessible | Docsend link active |
| Demo video ready to share | Video accessible |
| Operator #3 conversation started | Intro made |
| Advertiser #4 prospect identified | Contact made |
| Day 90 metrics report completed | Numbers locked |

---

## Day 90 Target State

**Minimum targets (must achieve to justify seed round conversation):**

| Metric | Target | Rationale |
|---|---|---|
| Active devices | 50 | Proof of fleet deployment |
| Device uptime | >85% | Proof of platform reliability |
| Paying advertisers | 3 | Proof of demand (not one-off) |
| Campaign renewals | ≥1 | Proof of repeat demand |
| Verified impressions delivered | >1M | Proof of scale (even small) |
| Out Mobility MRR | >$2,000 | Proof of revenue |
| Fill rate | >30% | Proof of demand-supply balance |

**Stretch targets (what makes this a strong seed round):**

| Metric | Stretch Target |
|---|---|
| Active devices | 100+ |
| Paying advertisers | 5+ |
| MRR | >$5,000 |
| 2nd operator signed | Yes |
| Fill rate | >50% |

---

## Weekly Reporting Discipline

Every Sunday, send a 5-bullet update to your investor prospect list:

```
OUT MOBILITY — WEEK [N] UPDATE | [Date]

1. DEVICES: [count] active | [count] installed this week | [%] uptime
2. ADVERTISERS: [count] active campaigns | [revenue] this week
3. IMPRESSIONS: [count] verified this week | [CPM] achieved
4. ONE WIN: [specific positive thing that happened]
5. ONE PROBLEM: [specific challenge + how we're addressing it]

Next week's focus: [one sentence]
```

**Why this matters:** Investors read 1-paragraph updates. They don't read reports.
Consistent weekly updates build investor confidence without meetings.
