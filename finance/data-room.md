# Data Room Structure — Out Mobility

**Purpose:** Organized investor due diligence package.
**Access:** Notion, Google Drive, or Docsend with link tracking.
**Principle:** Investors should find every answer without asking a question.

---

## Data Room Index

```
OUT MOBILITY — INVESTOR DATA ROOM
├── 00 — Start Here
├── 01 — Company Overview
├── 02 — Product
├── 03 — Technology & Architecture
├── 04 — Traction & Metrics
├── 05 — Financial Model
├── 06 — Market Analysis
├── 07 — Team
├── 08 — Legal & Corporate
└── 09 — References & Appendix
```

---

## Section 00 — Start Here

| Document | Contents |
|---|---|
| `executive-summary.pdf` | 2-page overview: what we do, traction, ask |
| `investor-deck.pdf` | 15-slide presentation |
| `data-room-guide.md` | How to navigate this data room |
| `last-updated.md` | Date of last update per section |

**The executive summary is the first document.** It must answer in 2 pages:
what we do, what we've built, what we've proven, and what we're asking for.

---

## Section 01 — Company Overview

| Document | Contents |
|---|---|
| `company-overview.md` | What Out Mobility is (infrastructure, not ad agency) |
| `product-vision.md` | Full product ecosystem (Out-door → Out-side → Out-leaf → Out-charge) |
| `why-now.md` | Market timing argument |
| `investor-narrative.md` | Full written VC memo (from `finance/investor-narrative.md`) |
| `competitive-positioning.md` | Competitive analysis (from `finance/competitive-positioning.md`) |
| `team.md` | (Linked to Section 07) |

---

## Section 02 — Product

| Document | Contents |
|---|---|
| `PRD.md` | Full product requirements document (from `product/PRD.md`) |
| `mvp-scope.md` | What's in MVP vs future (from `product/mvp-scope.md`) |
| `user-flows.pdf` | Advertiser + Driver + Admin flow diagrams |
| `campaign-lifecycle.md` | Campaign state machine and business rules |
| `product-screenshots/` | Folder: UI screenshots or mockups of all 3 dashboards |
| `demo-video.mp4` | 3–5 minute product walkthrough (dashboard + device in field) |
| `device-demo.mp4` | Field video: tablet in actual vehicle, ad playing |

**The field video is critical.** Investors need to see a real screen in a real car.
Deck screenshots alone will not close a check.

---

## Section 03 — Technology & Architecture

| Document | Contents |
|---|---|
| `system-architecture.md` | High-level system overview |
| `backend-architecture.md` | Modular monolith, service structure |
| `database-schema.md` | Full PostgreSQL schema |
| `device-fleet-system.md` | Device management, kiosk mode, sync protocol |
| `verification-system.md` | How impressions are verified (no blockchain) |
| `ad-delivery-engine.md` | Scheduling algorithm |
| `deployment.md` | Infrastructure, hosting, scalability path |
| `security-overview.md` | Auth model, data protection, fraud prevention |

**For technical investors:** This section should answer "can they actually build it?"
**For non-technical investors:** The executive summary covers this — these docs are reference.

---

## Section 04 — Traction & Metrics

This is the most important section post-pilot. It must be honest and precise.

| Document | Contents |
|---|---|
| `traction-dashboard.pdf` | Current state snapshot: devices, impressions, MRR, advertisers |
| `monthly-metrics/` | Folder: one PDF per month of operations (KPI report format) |
| `advertiser-case-study-1.pdf` | Anonymized: Campaign X — budget, impressions delivered, CPM, renewal |
| `advertiser-case-study-2.pdf` | Same — different industry/budget |
| `operator-testimonial.pdf` | Quote + fleet size + earnings from an operator |
| `device-uptime-report.pdf` | 30-day fleet uptime chart from admin dashboard |
| `verification-integrity-report.pdf` | % valid / suspicious / invalid + explanation of checks |
| `sample-impression-report.pdf` | The actual report an advertiser receives (redacted) |

**The sample impression report is the trust anchor.** When an investor sees the level
of data granularity — per device, per hour, GPS-validated — they understand the moat.

### Traction Page Format

```
TRACTION SNAPSHOT — as of [Date]
═══════════════════════════════════
Active devices:          142
Fleet operators:         4
Verified impressions:    3.2M (all time) / 1.9M (this month)
Active advertiser campaigns:  7
Completed campaigns:     12
Avg CPM achieved:       $7.20
Campaign renewal rate:  64%
Fleet uptime (30d avg): 91%
MRR (Net):             $13,800
ARR run rate:          $165,600
═══════════════════════════════════
[These are illustrative — replace with actuals]
```

---

## Section 05 — Financial Model

| Document | Contents |
|---|---|
| `financial-model.xlsx` | Full 3-year model: revenue, costs, headcount, cash flow |
| `unit-economics.md` | Per-device unit economics (from `finance/unit-economics.md`) |
| `revenue-model.md` | 3-scenario revenue projections (from `finance/revenue-model.md`) |
| `pricing-strategy.md` | CPM pricing rationale (from `finance/pricing-strategy.md`) |
| `fundraising-strategy.md` | Round structure, use of funds, valuation logic |
| `current-financials.pdf` | Actual P&L to date (bank statements + expense summary) |
| `cap-table.pdf` | Current cap table + post-money pro forma |

**The financial model spreadsheet must:**
- Show all assumptions explicitly (no hidden formulas)
- Have a "assumptions" tab with every input defined
- Show unit economics in a separate tab
- Model all 3 scenarios (conservative/moderate/aggressive)
- Show cash position month by month with burn rate

---

## Section 06 — Market Analysis

| Document | Contents |
|---|---|
| `market-sizing.md` | TAM/SAM/SOM (from `finance/market-sizing.md`) |
| `competitive-positioning.md` | Competitor analysis (from `finance/competitive-positioning.md`) |
| `nigeria-mobility-report.pdf` | Third-party data on Lagos ride-hail market size |
| `african-advertising-market.pdf` | Africa advertising spend data (eMarketer or similar) |
| `market-references.md` | All cited sources with links |

---

## Section 07 — Team

| Document | Contents |
|---|---|
| `team-bios.pdf` | Founder(s) bio, professional history, why this, why now |
| `linkedin-profiles.md` | Links to LinkedIn for each team member |
| `advisors.pdf` | Advisor names, roles, engagement terms |
| `hiring-plan.md` | Roles to be hired with seed funding, timeline, salary ranges |
| `org-chart.pdf` | Current + post-seed org structure |

**Team section honesty rule:** If the team is 1 founder today, say so.
Investors respect honesty. They punish discovery of inflated claims.

---

## Section 08 — Legal & Corporate

| Document | Contents |
|---|---|
| `certificate-of-incorporation.pdf` | Company registration document |
| `shareholder-register.pdf` | Current shareholders + ownership % |
| `ip-ownership.md` | Confirmation that all IP is owned by the company |
| `operator-agreements-sample.pdf` | Redacted fleet operator agreement template |
| `advertiser-terms.pdf` | Advertiser terms of service |
| `employment-agreements.md` | Confirmation that all contractors/employees have signed NDAs + IP assignment |
| `outstanding-liabilities.md` | Any loans, convertible notes, or obligations |
| `regulatory-status.md` | In-vehicle advertising regulations (Nigeria) + compliance status |

---

## Section 09 — References & Appendix

| Document | Contents |
|---|---|
| `references.md` | Industry contacts available for diligence calls |
| `press-coverage.pdf` | Any press mentions (if applicable) |
| `awards-recognition.pdf` | Any accelerator programs, recognition |
| `faq.md` | Pre-answered common investor questions |
| `glossary.md` | Key terms: CPM, fill rate, heartbeat, verified impression, etc. |

---

## Data Room Best Practices

**What makes a data room close deals:**

1. **The field video.** If investors can see a real tablet in a real vehicle playing a real ad, 80% of "is this real?" concerns dissolve.

2. **A real impression report.** The actual report you send to advertisers, with real data (redacted advertiser name). Shows product maturity.

3. **An operator on a call.** The most powerful proof point is a fleet operator who says "I get paid every month. I'm adding 20 more vehicles."

4. **Honest metrics.** Investors find out the truth in diligence. Front-load honesty. If Month 1 was weak, show it and explain why Month 3 is different.

5. **Model assumptions visible.** Every number in the financial model has a source. No black boxes.

**What kills data rooms:**

- Documents that contradict each other
- Metrics that can't be verified
- Missing sections that investors have to ask for
- Financial model with hidden assumptions
- Team bios that can't be verified on LinkedIn
- No demo video or product screenshots

---

## Access Control

| Tier | Access | Who |
|---|---|---|
| Teaser (public) | Executive summary + deck only | Cold outreach, warm intros |
| Full data room | All sections except legal | Investors in active conversation |
| Legal room | Section 08 + full cap table | Investors post-term sheet |

**Use Docsend or Notion with password access.** Know who is reading what.
