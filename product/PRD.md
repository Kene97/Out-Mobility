# Out-door — Product Requirements Document (PRD)

**Version:** 1.0 — MVP
**Status:** Active
**Owner:** Founder
**Last updated:** 2026-05-04

---

## 1. Product Overview

Out-door is a verified in-car advertising network. Android tablets mounted in
vehicles serve scheduled ad content to passengers. Advertisers buy verified
impressions through a centralized dashboard. Fleet operators earn passive revenue.
The backend verifies every ad play using device telemetry.

**This is infrastructure software. Not an ad agency. Not a media buy.**

---

## 2. Problem

In-vehicle advertising exists but is broken:
- Impressions are unverified — operators play content with no accountability
- Campaign management is manual — no centralized control
- Operators earn nothing — no passive revenue model
- Advertisers can't measure — no delivery data, no ROI

---

## 3. Solution

A three-sided platform:

| Side | Role | Value delivered |
|---|---|---|
| Advertiser | Buys campaigns | Verified impressions + real-time reporting |
| Fleet Operator | Hosts devices | Passive revenue + fleet dashboard |
| Out Mobility | Platform operator | Campaign management + verification layer |

---

## 4. Users

### Advertiser
Brand manager or media agency buying in-vehicle ad inventory.
- Creates campaigns, uploads creatives, sets budget and geo
- Monitors live delivery, downloads reports
- Pays per campaign or by CPM

### Fleet Operator
Ride-hail, taxi, or fleet company providing vehicles.
- Receives Android tablets for vehicles
- Earns revenue share on verified impressions
- Views basic fleet and earnings dashboard

### Driver
Individual vehicle operator (may or may not be fleet owner).
- Keeps tablet powered and mounted
- Views daily uptime and earnings summary
- Submits support requests

### Admin (Out Mobility team)
Internal operator of the platform.
- Approves campaigns, manages devices, reviews fraud flags
- Controls payouts, monitors system health

---

## 5. MVP Goals

1. Deploy tablets to 50–200 vehicles
2. Serve scheduled ad campaigns with verified delivery
3. Give advertisers a live dashboard and downloadable reports
4. Give operators an earnings dashboard
5. Generate first paid revenue

**Not in MVP:** Self-serve onboarding, programmatic buying, audience targeting
beyond geo, token rewards, complex analytics.

---

## 6. Non-Goals (MVP)

- No blockchain verification
- No programmatic / RTB ad buying
- No audience demographic targeting
- No driver-facing Android app (web view only)
- No payment gateway integration (manual invoicing is fine for MVP)
- No multi-language support
- No third-party ad server integration

---

## 7. Core Features

### Advertiser Dashboard
| Feature | Priority | Notes |
|---|---|---|
| Campaign creation | P0 | Name, dates, budget, geo, creative upload |
| Campaign status view | P0 | Draft / Active / Paused / Completed |
| Live impression counter | P0 | Updates every 15–30 minutes |
| Campaign report download | P0 | CSV and PDF |
| Budget management | P1 | Spend tracking, alerts at 80% / 100% |
| Creative management | P1 | Upload, preview, approve |

### Device Management (Admin)
| Feature | Priority | Notes |
|---|---|---|
| Device registration | P0 | Assign device to vehicle/operator |
| Device heartbeat monitor | P0 | Online/offline, last seen |
| Schedule push | P0 | Push campaign schedule to device |
| Fraud flag review | P1 | Flag suspicious impression batches |
| Remote device status | P1 | App version, connectivity |

### Operator / Driver Dashboard
| Feature | Priority | Notes |
|---|---|---|
| Earnings summary | P0 | Per vehicle, per month |
| Uptime tracking | P0 | % of time device was online |
| Fleet overview | P1 | All vehicles, status |
| Payout history | P1 | Past payouts and dates |

### Tablet App (Android)
| Feature | Priority | Notes |
|---|---|---|
| Ad playback engine | P0 | Video + image, scheduled |
| Local ad cache | P0 | Offline resilience |
| Impression event logger | P0 | Local SQLite, batch sync |
| Heartbeat service | P0 | Every 60 seconds |
| Schedule fetcher | P0 | Fetch and store schedule |
| GPS logging | P0 | Per impression event |
| Kiosk lockdown | P0 | No user exit from app |

---

## 8. Success Metrics

| Metric | MVP Target |
|---|---|
| Active vehicles | 50+ |
| Verified impressions/month | 100,000+ |
| Active advertiser campaigns | 3+ |
| Advertiser renewal rate | >50% |
| Device uptime | >85% fleet average |
| Impression verification rate | >90% logs verified valid |

---

## 9. Constraints

- Android tablets only (no iOS, no custom hardware)
- Backend must handle intermittent device connectivity
- All impression data must be verifiable without blockchain
- Platform must be operable by a team of 1–3 people
- Advertiser dashboard must be usable by non-technical users

---

## 10. Open Questions (Decide Before Build)

1. Manual vs. auto campaign approval for MVP?
2. Pre-pay vs. post-pay for advertisers?
3. Which Android tablet model and MDM solution?
4. Self-hosted backend vs. managed cloud (Render, Railway, Supabase)?
5. How does operator payout get processed (bank transfer, mobile money)?
