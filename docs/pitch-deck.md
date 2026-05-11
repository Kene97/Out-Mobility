# Out Mobility — Pitch Deck

**Format:** 15 slides. One idea per slide. No paragraph of text on any slide.
**Tone:** Infrastructure company. Precise. Confident. Zero hype.
**Audience:** Pre-seed / Seed VC. 10-minute meeting context.

---

## SLIDE 1 — Title

```
OUT MOBILITY

Verified Attention Infrastructure for Africa's Mobility Stack

[Logo]

Kene Omenuko-Rene, Founder
omenukorekene@gmail.com
Lagos, Nigeria | May 2026
```

**Speaker note:**
"Out Mobility builds the infrastructure layer that turns vehicles into
verified media nodes. Our first product is Out-door — a verified in-car
advertising network. Think of it as the AWS of in-vehicle media for Africa."

**What this slide must NOT say:** "Uber for ads." "Revolutionary." "Disrupting."

---

## SLIDE 2 — The Problem

```
THREE PROBLEMS. ONE SYSTEM FAILING.

1. ADVERTISING IN AFRICA IS BLIND
   Brands spend $870M/year in Nigeria
   with no way to verify delivery.
   Billboards are estimated. Radio is guessed.

2. 200 MILLION VEHICLE HOURS PER DAY — UNMONETIZED
   Lagos alone: 200,000+ formal ride-hail vehicles
   Each passenger sits captive for 20–40 minutes.
   Revenue generated from that attention: $0.

3. OPERATORS EARN NOTHING FROM THE SCREEN IN FRONT OF THEM
   Every vehicle has a sightline.
   No system captures it.
   It is dead inventory.
```

**Speaker note:**
"These three problems have the same root: there is no infrastructure
connecting advertisers to verified in-vehicle attention. That infrastructure
does not exist yet. We are building it."

---

## SLIDE 3 — Why Now

```
FOUR THINGS ARE SIMULTANEOUSLY TRUE FOR THE FIRST TIME.

①  THE FLEET EXISTS
   Ride-hailing formalized Lagos's vehicle market.
   200,000+ GPS-tracked, data-connected vehicles.
   This fleet didn't exist in 2015.

②  THE HARDWARE IS CHEAP ENOUGH
   A 4G Android tablet with GPS = $80–100.
   10× cheaper than 5 years ago.
   The deployment cost just crossed a threshold.

③  ADVERTISERS ARE DESPERATE
   Meta CPMs up 3× since 2020.
   Nigerian brands want verified alternatives.
   The budget exists. The product doesn't.

④  NO INCUMBENT HAS BUILT THIS
   Uber hasn't. Bolt hasn't. Telcos haven't.
   The category is open.
   The window is 2025–2028.
```

**Speaker note:**
"The window is narrow. The company that deploys 5,000 devices in the next
18 months wins the category. After that, the network density moat closes."

---

## SLIDE 4 — The Solution

```
OUT-DOOR

A verified in-car advertising network.

  TABLETS IN VEHICLES        →    ADS DELIVERED
  (Android, kiosk mode)           (scheduled, cached, full-screen)

  ADVERTISER DASHBOARD       →    CAMPAIGNS MANAGED
  (create, launch, monitor)        (budget, geo, creative)

  VERIFICATION ENGINE        →    PROOF OF DELIVERY
  (GPS + heartbeat + device ID)    (not estimated — verified)

This is NOT an ad agency.
This is NOT a media buy.
This is infrastructure.
```

**Speaker note:**
"The key word is verified. Every impression is logged with a GPS coordinate,
a device ID, and a heartbeat confirmation. We don't estimate. We prove."

---

## SLIDE 5 — The Product

```
THREE SURFACES. ONE SYSTEM.

┌─────────────────────────────────────────────────────────┐
│  TABLET IN VEHICLE              ADVERTISER DASHBOARD    │
│  ─────────────────              ────────────────────    │
│  • Full-screen ad playback      • Campaign creation     │
│  • GPS + heartbeat logging      • Live impressions      │
│  • Offline caching              • Verified reports      │
│  • Kiosk-locked (no tampering)  • CPM billing           │
│                                                         │
│              ADMIN CONTROL PANEL                        │
│              ────────────────────                       │
│              • Fleet monitoring (map view)              │
│              • Fraud flag review                        │
│              • Operator payout management               │
│              • System health dashboard                  │
└─────────────────────────────────────────────────────────┘
```

**Speaker note:**
"Three users. Three interfaces. One backend. The advertiser never sees the
device. The driver never touches the dashboard. The admin sees everything."

---

## SLIDE 6 — How It Works

```
HOW AN IMPRESSION BECOMES VERIFIED REVENUE

    ADVERTISER                  DEVICE                  BACKEND
        │                         │                        │
   Creates campaign               │                        │
   Uploads creative    ───────────►                        │
   Sets budget + geo              │                        │
                                  │ Fetches schedule       │
                                  ◄────────────────────────│
                                  │ Downloads creative     │
                                  │                        │
                                  Plays ad (full screen)   │
                                  Logs: GPS + timestamp    │
                                  + device ID              │
                                  ───────────────────────► │
                                  │                  Verifies log:
                                  │                  • GPS plausible?
                                  │                  • Heartbeat matched?
                                  │                  • Not duplicate?
                                  │                  • In campaign window?
                                  │                        │
        ◄───────────────────────────────────────────────── │
   Dashboard updates:                                      │
   +1 verified impression                                  │
   Budget debited at CPM                                   │
```

**Speaker note:**
"The device works offline too. If there's no signal, it keeps playing cached
ads and syncs when reconnected. The verification still works — we have a
7-day window for log reconciliation."

---

## SLIDE 7 — Market Size

```
THREE LENSES ON THE MARKET

  GLOBAL                 AFRICA                  LAGOS
  ──────                 ──────                  ─────
  $8–12B                 $50M SAM                $2.2M SOM
  in-vehicle             mobility                cumulative,
  advertising            advertising             3 years
  by 2030                Nigeria                 (conservative)

  ↑ 14% CAGR             ↑ 20% CAGR              Year 1: $78K
  (PwC 2024)             (eMarketer 2024)         Year 3: $2.15M

WHY AFRICA FIRST
  ✓ No incumbent          ✓ Formal fleet emerging
  ✓ High traffic density  ✓ Advertisers demand verification
  ✓ Cheapest deployment cost in history
```

**Speaker note:**
"We are not claiming the global $12B on Day 1. We are claiming $2.2M in Lagos
in 3 years. That is 1,000 devices at $7.50 CPM at 60% fill. That is achievable.
From Lagos, the playbook repeats in 4 Nigerian cities and then across Africa."

---

## SLIDE 8 — Business Model

```
SIMPLE. VERIFIED. SCALABLE.

ADVERTISERS PAY PER VERIFIED IMPRESSION

  $6–12 CPM            Minimum: $500 campaign
  (per 1,000            No estimates — verified only
  verified              Advertiser dashboard self-serve
  impressions)          (Phase 2 — manual now)


OPERATORS EARN REVENUE SHARE

  35% of gross ad revenue per vehicle
  Paid monthly
  No work required — passive income on existing asset

OUT MOBILITY KEEPS 65%

  Software margins
  Platform cost: $1/device/month
  Gross margin: >88% at scale
```

**Speaker note:**
"We don't touch the advertising content. We don't buy media. We are the
infrastructure layer that enables the transaction between brand and vehicle.
The 65/35 split is similar to App Store economics — platform takes majority,
operator takes minority, both win."

---

## SLIDE 9 — Unit Economics

```
PER DEVICE, PER MONTH

              PILOT        SCALE        MATURE
              (50 dev)     (1K dev)     (5K dev)
              ────────     ─────────    ─────────
Fill rate     30%          60%          85%
CPM           $6.00        $7.50        $12.00
Impressions   1,287        2,574        3,647
Gross rev     $7.72        $19.31       $43.76
OM share (65%)$5.02        $12.55       $28.44
Platform cost -$1.00       -$1.00       -$1.00
─────────────────────────────────────────────
CONTRIBUTION  $4.02        $11.55       $27.44
MARGIN        80%          92%          96%

BREAKEVEN: ~800 active devices

```

**Speaker note:**
"At Scale — 1,000 devices — we contribute $11.55 per device per month.
Fixed costs at that stage are ~$14,900/month. Breakeven is 1,290 devices.
We hit that in Month 14 under base case projections."

---

## SLIDE 10 — Go-to-Market

```
SUPPLY BEFORE DEMAND. ALWAYS.

PHASE 1 (0–30 DAYS): DEPLOY SUPPLY
  → Sign 2 fleet operators: 50 vehicles committed
  → Install 20 devices (pilot batch)
  → Platform live, devices streaming heartbeats

PHASE 2 (30–60 DAYS): ACTIVATE DEMAND
  → Sign 1 anchor advertiser: first paid campaign live
  → Deliver first verified impression report
  → Proof of concept: device works, advertiser pays

PHASE 3 (60–90 DAYS): PROVE THE MODEL
  → 50 active devices, 3 advertisers
  → $2,000+ MRR (Net Out Mobility revenue)
  → 1 campaign renewal (trust confirmed)
  → Investor-ready traction metrics

YEAR 1 TARGET: 1,000 devices | 10 advertisers | $9K MRR
```

**Speaker note:**
"We don't acquire advertisers until we have supply. Promising campaigns
you can't deliver kills trust permanently. Supply first — always."

---

## SLIDE 11 — Competition

```
WHY THEY DON'T WIN.

  WHAT                WHO              WHY WE WIN
  ─────               ─────────        ──────────────────────────────
  Billboards          OOH networks     Unverified. Estimated.
                                       We prove every impression.

  In-app ads          Uber Ads         Phone screen, not vehicle screen.
                                       Not available to advertisers in Nigeria.

  Radio               Multichoice,     Audio only. No measurement.
                      local stations   We are visual + verified.

  Mall screens        Viacom, local    Fixed location. Daytime only.
                      DOOH operators   We move with the city.

  US in-vehicle       Alfi, Vugo       US market. Not Africa-built.
  ad networks                          We are built for this infrastructure.

OUT-DOOR IS THE ONLY VERIFIED, MANAGED,
IN-VEHICLE ADVERTISING NETWORK IN WEST AFRICA.
The category has one company in it: us.
```

---

## SLIDE 12 — The Moat

```
FIVE COMPOUNDING ADVANTAGES

  DATA MOAT
  Every trip logged builds an irreplaceable GPS + telemetry dataset.
  More data → better verification → higher CPM premium → larger moat.

  OPERATOR LOCK-IN
  Installed devices have switching costs.
  A competitor must offer dramatically better economics to displace us.

  ADVERTISER TRUST
  The first verified impression report is the trust anchor.
  Once a CMO sees verified data, estimates feel irresponsible.

  NETWORK DENSITY
  1,000 devices = barrier.  5,000 devices = a wall.
  Advertisers need reach. You can't buy reach from 50 devices.

  OPERATIONAL DEPTH
  Fleet deployment at scale in emerging markets is genuinely hard.
  It takes 12–18 months to build. You can't buy it overnight.

  THE RULE: Every device we deploy widens the gap.
  Every impression we verify deepens the data moat.
  This compounds.
```

---

## SLIDE 13 — Traction Plan

```
WHAT WE WILL PROVE IN 90 DAYS

  DAY 30                DAY 60               DAY 90
  ──────                ──────               ──────
  20+ devices live      50 devices live      50 devices live
  2 operators signed    3rd operator         uptime >85% sustained
  1 campaign running    in pipeline          3 paying advertisers
  Device uptime 80%+    2 campaigns live     1 campaign renewed
                        Fill rate 35%+       $2,000+ MRR
                        Dashboard V1 live    Verified report in hand

  ─────────────────────────────────────────────────────────────

  AFTER 90 DAYS:
  We have a paying advertiser holding a verified impression report.
  That is proof of product. That is proof of market. That is fundable.
```

**Speaker note:**
"90 days is enough to prove the model. Not at scale — at proof of concept.
The seed round funds the scaling. The pre-seed funds the proof."

---

## SLIDE 14 — Team

```
[FOUNDER NAME]
Founder & CEO

Background:
  [Relevant: mobility, technology, Africa market, advertising, operations]

Why this:
  [1-2 sentence genuine founder-market fit reason]

Why now:
  [Personal connection to the problem or the market timing]

─────────────────────────────────────────────────────

ADVISORS
  [Name] — [Role, why relevant]
  [Name] — [Role, why relevant]

HIRING WITH SEED FUNDING
  CTO / Technical Lead
  Head of Sales (Lagos)
  Operations Manager

─────────────────────────────────────────────────────
BUILT IN LAGOS. FOR AFRICA. SCALING GLOBALLY.
```

**Speaker note:**
"We are founder-led and early. The advantage is speed, direct operator relationships,
and no organizational drag. The first 12 months are won in the field — not in an office."

---

## SLIDE 15 — The Ask

```
PRE-SEED ROUND

  RAISING           $150,000 – $300,000

  STRUCTURE         SAFE | $4M–5M cap | MFN clause

  DILUTION TARGET   <15%

  ──────────────────────────────────────────────────

  USE OF FUNDS ($200K scenario)

  Hardware (50 tablets + installation)     $10,000    5%
  Platform development (6 months)          $70,000   35%
  Operations (field, SIMs, logistics)      $25,000   12.5%
  Founder runway (12 months @ $2K/mo)      $24,000   12%
  Sales & first advertiser acquisition     $15,000    7.5%
  Legal + company setup                    $10,000    5%
  Reserve                                  $46,000   23%
  ─────────────────────────────────────────────────────────
  TOTAL                                   $200,000  100%

  ──────────────────────────────────────────────────

  90-DAY MILESTONE THIS MONEY BUYS:
  50 active devices | 3 paying advertisers | $2K MRR
  → Fundable seed round from a position of traction

  SEED TARGET: $1M at $10M pre-money (Q4 2026)
```

**Speaker note:**
"We are not raising to operate. We are raising to prove. Give us $200K and
90 days. We will come back with verified impressions, a paying advertiser,
and a clear path to $10K MRR. That is what the seed round funds."

---

## Deck Design Notes

**Format:** 16:9 slides. Dark background (#09090B). White text.
Accent color: Out Mobility blue (#1D4ED8). One accent element per slide.

**Typography:** Inter. Headings 48px bold. Body 20px regular.

**Visuals needed:**
- Slide 2: Photo of Lagos traffic (real, not stock)
- Slide 4: Photo of actual tablet in actual vehicle (non-negotiable)
- Slide 5: Screenshot of advertiser dashboard (MVP version)
- Slide 6: Simple flow diagram (not technical architecture)
- Slide 11: Clean comparison table

**Length:** 15 slides. Not 20. Investors read the first 10 in the first meeting.
The last 5 are answered in conversation.

**The single most important visual:** A real tablet in a real Lagos vehicle.
If you have this photo, the deck closes faster.
If you don't have it, get a device in a car before your first investor meeting.
