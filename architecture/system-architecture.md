# System Architecture — Out-door

**Version:** MVP
**Last updated:** 2026-05-04

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTS                              │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Advertiser  │  │   Operator/  │  │   Admin          │  │
│  │  Dashboard   │  │   Driver     │  │   Dashboard      │  │
│  │  (Web App)   │  │   Dashboard  │  │   (Web App)      │  │
│  │              │  │   (Web App)  │  │                  │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘  │
└─────────┼─────────────────┼───────────────────┼────────────┘
          │                 │                   │
          └─────────────────┴───────────────────┘
                            │ HTTPS / REST API
┌───────────────────────────┼────────────────────────────────┐
│                    BACKEND API LAYER                        │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────┐  │
│  │    Auth     │  │  Campaign   │  │   Device Mgmt      │  │
│  │   Service   │  │  Service    │  │   Service          │  │
│  └─────────────┘  └─────────────┘  └────────────────────┘  │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────┐  │
│  │  Analytics  │  │  Payout     │  │   Verification     │  │
│  │  Service    │  │  Service    │  │   Service          │  │
│  └─────────────┘  └─────────────┘  └────────────────────┘  │
│                                                             │
└───────────────────────────┬────────────────────────────────┘
                            │
           ┌────────────────┼────────────────┐
           │                │                │
    ┌──────┴──────┐  ┌──────┴──────┐  ┌─────┴──────┐
    │  PostgreSQL │  │  CDN/Object │  │   Job      │
    │  Database   │  │  Storage    │  │  Scheduler │
    │             │  │  (creatives)│  │            │
    └─────────────┘  └─────────────┘  └────────────┘
           │
    ┌──────┴──────────────────────────────────────────────┐
    │                  DEVICE LAYER                        │
    │                                                      │
    │  ┌──────────────────────────────────────────────┐    │
    │  │              Android Tablet                  │    │
    │  │                                              │    │
    │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐   │    │
    │  │  │  Kiosk   │  │  Event   │  │  Sync    │   │    │
    │  │  │  Player  │  │  Logger  │  │ Service  │   │    │
    │  │  └──────────┘  └──────────┘  └──────────┘   │    │
    │  │                                              │    │
    │  │  ┌──────────┐  ┌──────────┐                 │    │
    │  │  │Heartbeat │  │  Local   │                 │    │
    │  │  │ Service  │  │  Cache   │                 │    │
    │  │  └──────────┘  └──────────┘                 │    │
    │  └──────────────────────────────────────────────┘    │
    └──────────────────────────────────────────────────────┘
```

---

## Component Descriptions

### 1. Advertiser Dashboard (Web)
- React SPA (or Next.js)
- Campaign creation, creative upload, live analytics, report download
- Auth via JWT tokens from API

### 2. Operator/Driver Dashboard (Web)
- Simple web interface (can be same app as advertiser, different role view)
- Earnings summary, device status, payout history

### 3. Admin Dashboard (Web)
- Internal tool — can be a simple admin panel (same app, admin role)
- Campaign approval, device monitoring, fraud review, payout control

### 4. Backend API
Single REST API. Can be a monolith for MVP (split into services later).

**Logical services (can all live in one codebase for MVP):**

| Service | Responsibility |
|---|---|
| Auth | Login, JWT, roles |
| Campaign | CRUD, lifecycle transitions, scheduling |
| Device | Registration, heartbeat, schedule delivery |
| Event Ingestion | Receive impression logs from tablets |
| Verification | Process raw logs into verified impressions |
| Analytics | Aggregate stats, serve dashboard queries |
| Payout | Calculate operator earnings, manage payout state |

### 5. Database (PostgreSQL)
Single primary database for MVP.
All core entities stored here. See `data-model.md`.

### 6. Object Storage (S3-compatible)
Stores ad creatives (video files, images).
CDN layer serves these directly to devices.
- Upload: advertiser uploads to API → API stores in object storage
- Delivery: devices download from CDN URL directly

### 7. Job Scheduler
Cron-style background jobs:
- Every 15 min: aggregate impression stats
- Every midnight: transition SCHEDULED → ACTIVE campaigns, generate daily schedules
- Every hour: check for completed campaigns (budget or end_date)
- Every 5 min: check for offline devices (no heartbeat)

### 8. Android Tablet App
See `device-architecture.md` for full detail.

---

## Request Flow Examples

### Advertiser creates campaign:
```
Browser → POST /campaigns → API validates → Save to DB → Return campaign ID
Browser → POST /campaigns/:id/creatives → API stores file in object storage
          → Save creative record in DB → Return creative URL
Browser → POST /campaigns/:id/submit → API validates → Status = SUBMITTED
          → Admin notification triggered
```

### Device fetches schedule:
```
Tablet → GET /device/schedule → API authenticates device key
       → Query DB for today's schedule for this device
       → Return schedule JSON (with creative CDN URLs)
Tablet downloads creatives from CDN directly
```

### Device syncs impression logs:
```
Tablet → POST /device/events (batch of impression logs)
       → API saves raw logs to impression_logs table
       → Returns 200 OK
       → Verification job picks up unprocessed logs (async)
       → Verified impressions update campaign stats
```

---

## Tech Stack (MVP Recommendation)

| Layer | Choice | Reason |
|---|---|---|
| Frontend | Next.js (React) | Fast to build, SSR for performance |
| Backend API | Node.js (Express or Fastify) | Fast to develop, JSON-native |
| Database | PostgreSQL (managed) | Reliable, relational, free tier available |
| Object storage | Cloudflare R2 or AWS S3 | Cheap, CDN-integrated |
| Hosting | Railway or Render | Simple deploy, no DevOps required |
| Android app | Native Android (Kotlin) or React Native | Kiosk mode is easier in native |
| Auth | JWT + refresh tokens | Simple, stateless |
| Background jobs | pg-boss or BullMQ | Postgres-backed queue, no extra infra |

**MVP can run on a single $25–50/month server for the first 200 devices.**

---

## Scalability Notes (Not MVP — But Designed For)

- Event ingestion can become a separate service + message queue (Kafka/SQS) when device count grows
- Analytics can move to a read replica or OLAP store (Clickhouse) when query volume demands it
- API can be split into microservices per domain when team grows
- CDN handles creative delivery at any scale without backend changes

---

## Security Baseline

- All API endpoints require JWT (except /auth/login)
- Device endpoints use device API key (not user JWT)
- HTTPS everywhere
- Ad creatives served from CDN (no direct DB access)
- Admin endpoints require admin role check
- Rate limiting on device event ingestion endpoint
- Input validation on all API inputs
