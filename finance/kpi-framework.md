# KPI Framework — Out Mobility (Investor-Facing)

**These are the metrics that determine if the business is healthy and on track.**
Track weekly internally. Report monthly to investors.

---

## Tier 1: North Star Metrics

The three numbers that matter most. If these are growing, everything else is secondary.

| Metric | Definition | Target (Year 1 End) |
|---|---|---|
| **Verified Impressions / Month** | Count of impressions passing all verification checks | 3M+ |
| **Active Devices** | Devices that sent a heartbeat in the last 24 hours | 1,000+ |
| **Out Mobility Net Revenue (MRR)** | 65% of gross ad revenue per month | $9,000+ |

---

## Tier 2: Supply Metrics (Fleet Health)

| Metric | Definition | Formula | Target |
|---|---|---|---|
| Active Devices | Devices with heartbeat in last 24h | `count(devices where last_seen > now - 1d)` | 1,000 (Year 1) |
| Fleet Uptime % | % of operating hours devices are online | `online_heartbeat_minutes / expected_minutes` | >85% |
| Device Deployment Rate | New devices added per week | `new_devices / week` | 20/week at Scale |
| Device Churn Rate | Devices suspended or lost per month | `suspended / total` | <2%/month |
| Time to First Impression | Hours from device registration to first verified impression | — | <48 hours |
| Impressions per Device per Month | Average verified impressions across fleet | `total_impressions / active_devices` | 2,000+ (Scale) |

### Supply Health Dashboard (Weekly)

```
Week ending May 4, 2026
─────────────────────────────────────────
Active devices:         134 / 142 (94%)
Fleet uptime:           91%                ✓
New devices this week:  8
Devices offline >24h:   3                  ⚠
Avg impressions/device: 1,847              ✓
Fill rate:              51%                ✓
─────────────────────────────────────────
```

---

## Tier 3: Demand Metrics (Advertiser Health)

| Metric | Definition | Formula | Target |
|---|---|---|---|
| Active Advertisers | Advertisers with a live or recently completed campaign | — | 10+ (Year 1) |
| CPM Achieved | Average CPM across all active campaigns | `total_spend / (impressions/1000)` | >$7.00 |
| Fill Rate | % of available impression slots filled by paid campaigns | `paid_impressions / max_impressions` | >60% (Scale) |
| Campaign Renewal Rate | % of advertisers who run a second campaign | `renewed / total first campaigns` | >55% |
| Advertiser CAC | Total sales cost / new advertisers acquired | — | <$800 |
| Average Campaign Value | Mean spend per campaign | `total_campaign_spend / campaigns` | >$3,000 |
| Days to First Campaign | Days from signup to first campaign live | — | <14 days |

---

## Tier 4: Revenue & Financial Metrics

| Metric | Definition | Formula | Target |
|---|---|---|---|
| Gross Revenue | Total ad spend by advertisers | `impressions × CPM / 1000` | See revenue model |
| Out Mobility Net Revenue (MRR) | 65% of gross revenue | `gross × 0.65` | $9K (Y1), $90K (Y2) |
| Gross Margin | Net revenue minus platform costs | `(net_rev - platform_costs) / net_rev` | >88% |
| Revenue per Device | Monthly net revenue / active devices | `net_MRR / active_devices` | >$12 (Scale) |
| MoM Revenue Growth | Month over month revenue change | `(this_month - last) / last` | >25% MoM (Seed stage) |
| ARR | MRR × 12 | — | $108K (Y1), $1M+ (Y2) |
| LTV:CAC | 3-year advertiser LTV / CAC | — | >8x |
| CAC Payback Period | CAC / monthly margin from advertiser | — | <2 months |

---

## Tier 5: Operator Economics

| Metric | Definition | Target |
|---|---|---|
| Operator Count | Distinct fleet operators on network | 5+ (Year 1) |
| Avg Revenue per Operator | Monthly payout per operator | Growing MoM |
| Operator Churn | Operators who leave the network | <5%/quarter |
| Operator NPS | Net Promoter Score (surveyed quarterly) | >40 |
| Time to First Payout | Days from operator signup to first payment | <60 days |
| Revenue per Vehicle | Monthly gross ad revenue per vehicle | >$12 (Scale) |

---

## Tier 6: Verification & Trust Metrics

These are the metrics that prove Out-door is infrastructure, not just ad tech.

| Metric | Definition | Formula | Target |
|---|---|---|---|
| Verification Rate | % of raw logs that pass verification | `valid / total_logs` | >85% |
| Fraud Flag Rate | % of logs flagged as suspicious | `suspicious / total_logs` | <5% |
| Impression Accuracy | Discrepancy between dashboard and reconciled count | — | <2% |
| Device Sequence Integrity | Gaps in device sequence numbers detected | — | <0.1% of events |
| Heartbeat Coverage | % of impression windows with supporting heartbeat | — | >95% |

**These metrics are the proof of infrastructure quality.** An advertiser seeing
95%+ heartbeat coverage has confidence that their impressions were real.

---

## Investor Reporting Template (Monthly)

```
OUT MOBILITY — Investor Update | [Month] [Year]
════════════════════════════════════════════════

HEADLINE METRICS
  Active Devices:         _______  (▲/▼ vs last month)
  Verified Impressions:   _______  (▲/▼ vs last month)
  MRR (Net):             $______   (▲/▼ vs last month)
  Active Advertisers:     _______  (▲/▼ vs last month)

SUPPLY (FLEET)
  Fleet uptime:           _____%
  New devices this month: _______
  Operator count:         _______
  Impressions per device: _______

DEMAND (ADVERTISERS)
  New campaigns:          _______
  Campaign renewals:      _______
  Avg CPM:               $______
  Fill rate:              _____%

FINANCIAL
  Gross Revenue:         $______
  Net Revenue (65%):     $______
  Gross Margin:           _____%
  Cash on hand:          $______
  Runway:                 _____ months

MILESTONES THIS MONTH
  ✓ [What was achieved]
  ✗ [What was missed + why]

FOCUS FOR NEXT MONTH
  1. [Priority 1]
  2. [Priority 2]
  3. [Priority 3]

ASK (if any)
  [Intro request, advice needed, help wanted]
════════════════════════════════════════════════
```

---

## Red Flag Metrics (When to Worry)

| Metric | Warning | Critical |
|---|---|---|
| Fleet uptime | <80% | <70% |
| MoM Revenue Growth | <15% | <5% or negative |
| Advertiser renewal rate | <40% | <25% |
| Fraud flag rate | >8% | >15% |
| Device churn | >5%/month | >10%/month |
| Fill rate | <30% | <15% |
| Verification rate | <80% | <70% |

When any metric hits **Warning:** investigate immediately.
When any metric hits **Critical:** stop current priorities, fix root cause.

---

## The Single Most Important Leading Indicator

**Fill Rate.** Everything else is a lagging indicator.

Fill rate tells you:
- Whether advertisers trust the product (if fill is low, it's a demand problem)
- Whether the fleet is performing (if impressions are low, it's a supply problem)
- Whether you're on the path to profitability (>60% fill = healthy unit economics)

Track fill rate daily. If fill rate drops more than 10 points week-over-week: crisis mode.
