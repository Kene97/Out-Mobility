# MVP Scope — Out-door

**The line between what we build now and what we build later.**

---

## MVP: Build This

### Core System
| Component | Included in MVP |
|---|---|
| Android kiosk app | Yes — ad playback, event logging, heartbeat, schedule fetch, offline mode |
| Backend API | Yes — campaign management, device management, event ingestion, verification |
| Advertiser dashboard | Yes — campaign creation, creative upload, live stats, report download |
| Operator dashboard | Yes — fleet overview, earnings summary, payout history |
| Admin dashboard | Yes — campaign approval, device monitoring, fraud review, payout management |
| Verification engine | Yes — server-side, rules-based, no blockchain |

### Campaign Features
| Feature | MVP |
|---|---|
| Campaign creation (name, dates, budget, geo) | Yes |
| Creative upload (video + image) | Yes |
| Manual campaign approval | Yes |
| Geo targeting (city-level radius) | Yes |
| Campaign status management (pause/resume) | Yes |
| Daily budget pacing | Yes |
| Campaign completion (end date / budget) | Yes |

### Analytics
| Feature | MVP |
|---|---|
| Total verified impressions | Yes |
| Budget spent | Yes |
| CPM achieved | Yes |
| Reach (unique devices) | Yes |
| Completion rate | Yes |
| Daily impressions chart | Yes |
| Per-device delivery table | Yes |
| Report download (CSV + PDF) | Yes |

### Verification
| Check | MVP |
|---|---|
| Device validity | Yes |
| Campaign window validation | Yes |
| Timestamp plausibility | Yes |
| Heartbeat correlation | Yes |
| GPS plausibility | Yes |
| Duplicate detection | Yes |
| Rate anomaly flags | Yes |
| Schedule compliance check | Yes |

---

## Future Scope: Build Later

### Phase 2 Additions
| Feature | Why deferred |
|---|---|
| Self-serve advertiser onboarding | Founder-led sales is faster for MVP |
| Programmatic / RTB buying | Complexity outweighs MVP revenue benefit |
| Payment gateway (Stripe / Flutterwave) | Manual invoicing works for early customers |
| Audience demographic targeting | Requires more fleet data to be meaningful |
| Real-time dashboard (WebSocket) | 15-min refresh is good enough for MVP |
| Self-serve operator onboarding | Admin-managed works for MVP fleet size |
| Custom campaign date ranges in analytics | Not needed for first 3 months |

### Phase 3+ Features
| Feature | Why deferred |
|---|---|
| ML fraud detection | Rules-based verification is sufficient at MVP scale |
| Camera-based passenger counting | Hardware complexity, cost, privacy |
| Route-level targeting | Requires much more fleet data and mapping |
| Audience insights product | Needs volume and data science investment |
| Open advertiser API | No external demand at MVP stage |
| Multi-currency support | Single market launch, single currency |
| Driver-facing Android app | Web view sufficient for MVP |
| Token/reward ecosystem | Separate product, future initiative |
| Out-side integration | Separate product |
| Out-leaf integration | Separate product |
| Out-charge integration | Separate product |

---

## Build Sequence

Build in this order. Do not start the next until the current is testable end-to-end.

```
1. Backend API (core models + auth + campaign CRUD)
      ↓
2. Admin dashboard (campaign approval + device registration)
      ↓
3. Android tablet app (playback + logging + heartbeat + sync)
      ↓
4. Verification service (pipeline + checks + classification)
      ↓
5. Advertiser dashboard (campaign creation + live stats + reports)
      ↓
6. Operator dashboard (earnings + fleet view)
      ↓
7. End-to-end test with real device in real vehicle
      ↓
8. First paying advertiser campaign
```

---

## Technical Debt Accepted in MVP

These are intentional shortcuts. Document them. Fix them in Phase 2.

| Shortcut | MVP approach | Production approach |
|---|---|---|
| Campaign scheduling | Simple daily batch job | Real-time schedule updates |
| Analytics | Pre-aggregated every 15 min | Real-time stream processing |
| Payout processing | Manual (admin marks paid) | Automated via payment gateway |
| Creative moderation | Manual admin review | Automated + manual |
| Device provisioning | Manual API key flash | MDM-automated enrollment |
| Multi-tenant isolation | Org ID filtering | Row-level security |
| Monitoring | Log-based | Structured metrics + alerting |

---

## Definition of Done (MVP)

The MVP is complete when:

1. A device is installed in a real vehicle and playing ads
2. An advertiser has created a campaign and sees live impression data
3. Impressions are verified by the backend (not just counted by the device)
4. An operator can see their earnings in a dashboard
5. An admin can manage campaigns, devices, and fraud flags
6. At least one advertiser has paid an invoice based on verified delivery data
