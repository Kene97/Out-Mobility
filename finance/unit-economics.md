# Unit Economics — Out-door

**Last updated:** 2026-05-04
**Model type:** Per-device, monthly. Asset-light (operator-owned hardware).
**Currency:** USD unless noted. All assumptions stated explicitly.

---

## Model Architecture

Out-door is a two-sided marketplace. Unit economics must work on both sides.

```
DEMAND SIDE                    SUPPLY SIDE
(Advertisers)                  (Fleet Operators + Devices)
      │                               │
      │ pay CPM for                   │ provide vehicles
      │ verified impressions          │ earn revenue share
      │                               │
      └──────────── OUT MOBILITY ─────┘
                   (platform, 65% take)
```

---

## Section 1: Supply Side Economics (Per Device)

### Hardware Cost (Operator-Owned)

| Item | Cost (USD) |
|---|---|
| Android tablet (9–10", 4G LTE, 32GB) | $85 |
| Protective case + screen protector | $12 |
| In-vehicle mount (headrest/console) | $15 |
| Power adapter + cable (vehicle 12V) | $8 |
| **Total installed hardware cost** | **$120** |

Operator buys hardware. Out Mobility provides the software platform and advertiser demand.
Hardware cost recovered from revenue share over 6–10 months (by design).

### Ongoing Costs per Device per Month (Operator)

| Item | Cost/month |
|---|---|
| SIM card + 4G data (500MB/day) | $4.00 |
| Hardware depreciation ($120 / 24 months) | $5.00 |
| Physical maintenance (prorated) | $1.50 |
| **Operator total cost** | **$10.50/month** |

### Out Mobility Cost per Device per Month (Platform)

| Item | Cost/month |
|---|---|
| CDN bandwidth (creative delivery) | $0.30 |
| Database + server (prorated) | $0.10 |
| MDM software (prorated) | $0.20 |
| Support (prorated at scale) | $0.40 |
| **Out Mobility platform cost** | **$1.00/month** |

**Out Mobility cost per device is ~$1/month at scale.** This is why device count is the primary growth lever — marginal cost per new device approaches zero.

---

## Section 2: Impression Economics (Per Device)

### Impression Capacity Model

| Parameter | Value | Assumption |
|---|---|---|
| Operating hours per day | 14h | 8am–10pm |
| Ad play interval | 5 min | 300 seconds |
| Theoretical max plays/day | 168 | 14h × 12/hr |
| Device uptime factor | 85% | Connectivity + maintenance |
| Effective plays/day | 143 | 168 × 0.85 |

### Fill Rate by Stage

Fill rate = fraction of available slots filled by paying campaigns.

| Stage | Devices | Fill Rate | Reason |
|---|---|---|---|
| Pilot | 50–200 | 30% | Limited advertisers, small network |
| Scale | 200–1,000 | 60% | Growing advertiser base, network effects |
| Growth | 1,000–5,000 | 75% | Strong demand, some unsold inventory |
| Mature | 5,000+ | 85% | Supply constraint, premium pricing |

### Verified Impressions per Device per Month

| Stage | Effective Plays | Fill Rate | Impressions/Month |
|---|---|---|---|
| Pilot | 143/day | 30% | 1,287 |
| Scale | 143/day | 60% | 2,574 |
| Growth | 143/day | 75% | 3,218 |
| Mature | 143/day | 85% | 3,647 |

*Monthly = daily × 30 days*

---

## Section 3: Revenue per Device per Month

### CPM Progression

CPM increases with proof of value and network density:

| Stage | CPM | Basis |
|---|---|---|
| Pilot | $6.00 | Introductory rate — prove the model |
| Scale | $7.50 | Verified data + growing demand |
| Growth | $9.00 | Network density + audience scale |
| Mature | $12.00 | Premium verified inventory, scarcity |

### Gross Revenue per Device per Month

```
Gross Revenue = (Impressions / 1,000) × CPM
```

| Stage | Impressions | CPM | Gross Revenue |
|---|---|---|---|
| Pilot | 1,287 | $6.00 | $7.72 |
| Scale | 2,574 | $7.50 | $19.31 |
| Growth | 3,218 | $9.00 | $28.96 |
| Mature | 3,647 | $12.00 | $43.76 |

### Revenue Split

| Party | Share | Pilot | Scale | Growth | Mature |
|---|---|---|---|---|---|
| Out Mobility | 65% | $5.02 | $12.55 | $18.82 | $28.44 |
| Fleet Operator | 35% | $2.70 | $6.76 | $10.14 | $15.32 |

---

## Section 4: Contribution Margin per Device

### Out Mobility Contribution (Net of Platform Costs)

```
Contribution = Out Mobility Revenue Share − Platform Cost per Device
```

| Stage | Revenue Share | Platform Cost | Contribution | Margin |
|---|---|---|---|---|
| Pilot | $5.02 | $1.00 | $4.02 | 80% |
| Scale | $12.55 | $1.00 | $11.55 | 92% |
| Growth | $18.82 | $1.00 | $17.82 | 95% |
| Mature | $28.44 | $1.00 | $27.44 | 96% |

**This is a software margin business.** Once the platform is built, each new device adds nearly all-margin revenue.

### Operator Unit Economics

Does the operator make money? Critical for supply-side retention.

| Stage | Operator Revenue | Operator Costs | Operator Net | Payback on $120 hardware |
|---|---|---|---|---|
| Pilot | $2.70/mo | $10.50/mo | -$7.80/mo | N/A |
| Scale | $6.76/mo | $10.50/mo | -$3.74/mo | N/A |
| Growth | $10.14/mo | $10.50/mo | -$0.36/mo | ~infinite |
| Mature | $15.32/mo | $10.50/mo | +$4.82/mo | 25 months |

**Important:** The operator's core business is ride-hailing revenue. Out-door is passive income on top. Even at Pilot stage, any revenue from a screen they wouldn't otherwise monetize is additive.

**Operator framing:** "Zero downside. Your vehicle earns while your driver drives."

---

## Section 5: Demand Side Economics (Advertiser)

### Customer Acquisition Cost (CAC)

| Stage | Channel | CAC |
|---|---|---|
| Pilot | Founder-led, warm intros | $400 |
| Scale | Direct sales team | $800 |
| Growth | Sales + digital | $600 |
| Mature | Inbound + self-serve | $200 |

### Average Campaign Value

| Stage | Campaign Size | Duration |
|---|---|---|
| Pilot | $2,000 | 3–4 weeks |
| Scale | $4,000 | 4–6 weeks |
| Growth | $7,500 | 6–8 weeks |
| Mature | $12,000 | Ongoing retainer |

### Advertiser Retention Assumptions

| Stage | Renewal Rate | Reason |
|---|---|---|
| Pilot | 40% | Product still unproven, manual process |
| Scale | 60% | Verified data builds trust |
| Growth | 70% | Campaign ROI measurable |
| Mature | 80% | Infrastructure dependency |

### Advertiser LTV

```
LTV = (Campaign Size × Renewal Rate^n summed) / (1 - Renewal Rate)
```

Simplified LTV (3-year horizon):

| Stage | Year 1 Revenue | Year 2 (if renewed) | Year 3 | 3-Year LTV |
|---|---|---|---|---|
| Scale advertiser | $4,000 | $4,000 × 60% = $2,400 | $2,400 × 60% = $1,440 | $7,840 |

**LTV:CAC at Scale stage:** $7,840 / $800 = **9.8x** — excellent for B2B SaaS/infra.

---

## Section 6: Payback Period Analysis

### Advertiser Payback

```
CAC Payback = CAC / (Average Campaign Margin per Month)
Out Mobility margin on $4,000 campaign = 65% = $2,600
Campaign duration = 5 weeks ≈ 1.25 months
Monthly margin = $2,600 / 1.25 = $2,080/month
CAC Payback = $800 / $2,080 ≈ 0.4 months
```

**Advertiser CAC pays back in under 2 weeks.** This is why demand-side CAC is not a constraint — the constraint is advertiser acquisition velocity, not economics.

### Device Deployment Payback (Out Mobility perspective)

Cost to onboard a new device: admin time ~2 hours = $30 at $15/hour.
Monthly contribution at Scale: $11.55.
Payback: $30 / $11.55 = **2.6 months**.

---

## Section 7: Breakeven Analysis

### Fixed Cost Structure (Monthly)

| Cost Item | Pilot (1–2 people) | Scale (3–5 people) |
|---|---|---|
| Team salaries (Nigeria) | $3,000 | $8,000 |
| Founder runway (stipend) | $1,500 | $2,500 |
| Platform infrastructure | $100 | $400 |
| Sales & marketing | $500 | $2,000 |
| Operations | $500 | $1,500 |
| Legal / admin | $200 | $500 |
| **Total fixed costs** | **$5,800/month** | **$14,900/month** |

### Breakeven Device Count

```
Breakeven = Fixed Costs / Contribution per Device
```

| Stage | Fixed Costs | Contribution/Device | Breakeven Devices |
|---|---|---|---|
| Pilot | $5,800 | $4.02 | 1,443 |
| Scale | $14,900 | $11.55 | 1,290 |
| Growth | $14,900 | $17.82 | 836 |

**Key insight:** As fill rate and CPM improve, the breakeven device count *decreases* even as fixed costs grow. This is the compounding effect of the platform.

Realistic breakeven: **600–800 active devices** at Scale-stage economics.

---

## Section 8: Key Sensitivities

### What if CPM is 20% lower?

| CPM | Revenue/Device | Contribution | Breakeven (Scale) |
|---|---|---|---|
| $6.00 (base) | $15.44 | $9.09 | 1,639 devices |
| $7.50 (Scale) | $19.31 | $11.55 | 1,290 devices |
| $9.00 (optimistic) | $23.17 | $14.08 | 1,058 devices |

Even at $6 CPM, the model works — it just requires more devices to break even.

### What if fill rate is 20% lower than projected?

| Fill Rate | Impressions | Revenue/Device (at $7.50 CPM) | Contribution |
|---|---|---|---|
| 40% | 1,716 | $12.87 | $7.57 |
| 60% (base) | 2,574 | $19.31 | $11.55 |
| 75% | 3,218 | $24.14 | $14.44 |

**Model remains viable at 40% fill rate** — just slower to breakeven.

### What if device uptime is 20% lower?

Uptime 65% instead of 85%: impressions drop from 2,574 to 1,968/month.
Revenue per device falls from $19.31 to $14.76 (at $7.50 CPM, 60% fill).
Still contributes $8.59/device after platform costs. Still a healthy margin.

---

## Section 9: Scale Economics

The power of this model is what happens at 5,000 devices:

```
5,000 devices × $27.44 contribution/device (Mature) = $137,200/month contribution
Fixed costs at 10-person team: ~$35,000/month
EBITDA: ~$102,200/month ≈ $1.2M/year

This is at 5,000 devices — which is <1% of Lagos's addressable fleet.
```

**The economics get dramatically better with scale because:**
1. Fixed costs grow linearly (headcount)
2. Revenue grows linearly (device count)
3. CPM grows superlinearly (network density increases fill rate + price)
4. Platform costs stay flat (software scales at near-zero marginal cost)
