# Analytics & Reporting — Out-door

---

## Core Metric Definitions

### Impression
One verified ad play on one device.
- Creative displayed for full duration (or ≥ 80% of duration for video)
- Verified against heartbeat, timestamp, and GPS checks
- Counted once per play event (no double-counting)

### Reach
Number of unique devices that delivered at least one verified impression for a campaign.
- Proxy for "unique vehicles" — not unique passengers (that's a future metric)

### Frequency
Average number of impressions per reached device.
```
frequency = total_impressions / reach
```

### CPM (Cost Per Mille)
Cost per 1,000 verified impressions.
```
cpm = (total_spend / total_verified_impressions) * 1000
```
For MVP, CPM is set at campaign creation (fixed rate). Future: dynamic CPM.

### Completion Rate
Percentage of video ads played to completion (or ≥ 80% of duration).
```
completion_rate = complete_plays / total_plays
```

### Device Uptime
Percentage of expected operating hours during which device sent a heartbeat.
```
uptime = (heartbeat_minutes / expected_operating_minutes) * 100
```
Expected operating hours defined per operator (e.g., 8am–10pm = 14 hours/day).

---

## Advertiser Analytics

### Campaign Dashboard (Live)
Updated every 15–30 minutes.

| Metric | Display |
|---|---|
| Total verified impressions | Big number, primary KPI |
| Budget spent | Progress bar (spent / total) |
| CPM | Calculated live |
| Active devices (today) | Count |
| Completion rate | Percentage |
| Days remaining | Countdown |

### Campaign Analytics (Deep Dive)
Available on campaign detail page.

**Impressions over time**
- Line chart: daily verified impressions for campaign duration
- Shows pacing vs. expected

**Delivery by vehicle**
- Table: Device ID (anonymized), impressions delivered, uptime %
- Sortable by impressions

**Geographic delivery**
- Map: delivery density by area (grouped by GPS clusters)
- Heatmap overlay showing where most impressions occurred

**Hourly distribution**
- Bar chart: impressions by hour of day (averaged across campaign)
- Shows peak delivery times

---

## Operator Analytics

### Fleet Dashboard
| Metric | Display |
|---|---|
| Total active vehicles | Count |
| Fleet uptime (this month) | % average across fleet |
| Total impressions delivered | Count |
| Estimated earnings (this month) | Currency amount |
| Pending payout | Currency amount |

### Vehicle Detail
| Metric | Display |
|---|---|
| Uptime % (this month) | Gauge / percentage |
| Impressions delivered (this month) | Count |
| Last seen | Timestamp |
| Current GPS (last known) | Map pin |
| Earnings this month | Currency |

---

## Admin Analytics

### System Overview
| Metric | What it shows |
|---|---|
| Active campaigns | Running right now |
| Active devices | Heartbeat in last 5 min |
| Impressions today | Verified, fleet-wide |
| Impressions this month | Verified, fleet-wide |
| Pending fraud flags | Count needing review |
| Pending payouts | Count and total value |
| Event ingestion lag | Median seconds, device → server |

### Verification Summary
| Metric | What it shows |
|---|---|
| Total logs received | Raw event count |
| Valid impressions | Passed all checks |
| Flagged impressions | Suspicious, pending review |
| Rejected impressions | Failed verification |
| Verification rate | Valid / total |

---

## Report Downloads

### Advertiser Campaign Report

**CSV format:**
```
date, device_id, impressions, completions, completion_rate, gps_lat, gps_lng
2026-05-04, DEV-001, 142, 138, 97.2%, 6.4521, 3.3902
...
```

**PDF format includes:**
- Campaign summary (name, dates, total impressions, spend, CPM)
- Daily impressions chart
- Geographic delivery map
- Verification statement: "X impressions verified via Out Mobility telemetry system"

### Operator Earnings Report

**PDF format:**
- Operator name, period
- Per-vehicle breakdown: uptime %, impressions, earnings
- Total payout amount
- Out Mobility stamp / signature (for reconciliation)

---

## Analytics Architecture (MVP)

Data flow:
```
Verified impressions table
  → Aggregation job (runs every 15 minutes)
    → campaign_stats table (pre-aggregated)
      → Dashboard API reads from campaign_stats
        → Frontend renders charts
```

**Why pre-aggregate:** Avoids heavy queries on raw impression logs for every dashboard load.
Acceptable staleness: 15–30 minutes for live view. Reports are generated on demand from raw data.

---

## MVP vs Future Scope

| Feature | MVP | Future |
|---|---|---|
| Impression count | Yes | — |
| Reach | Yes | — |
| Frequency | Yes | — |
| CPM | Fixed rate, calculated | Dynamic, auction-based |
| Completion rate | Yes | — |
| Device uptime | Yes | — |
| Geo heatmap | Basic (GPS cluster) | Precise route mapping |
| Audience demographics | No | Inferred from route data |
| Passenger count | No | Camera-based estimation |
| Real-time dashboard | 15-min refresh | True real-time (WebSocket) |
| Custom date ranges | No | Yes |
| Cohort analysis | No | Yes |
| Exported API | No | Yes (advertiser API) |
