# Backend Architecture — Out-door

**Version:** MVP
**Pattern:** Modular Monolith
**Runtime:** Node.js 20 LTS (TypeScript)
**Framework:** Fastify (faster than Express, built-in schema validation)

---

## Architecture Decision: Modular Monolith

**Why not microservices:**
- 1–3 developers cannot operate 8 independently deployed services
- Network overhead between services adds latency and failure modes
- Shared database is fine at MVP scale (200 devices, <10M impressions/month)

**Why not a pure monolith:**
- Domain boundaries enforced by module structure
- Each domain can become a service later — just move the folder and add HTTP
- No shared state across modules except the database and job queue

**Rule:** Modules communicate through exported service functions — never direct database access across module boundaries.

---

## Codebase Structure

```
out-door-api/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.repository.ts
│   │   │   └── auth.types.ts
│   │   │
│   │   ├── users/
│   │   │   ├── users.routes.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   └── users.types.ts
│   │   │
│   │   ├── campaigns/
│   │   │   ├── campaigns.routes.ts
│   │   │   ├── campaigns.service.ts
│   │   │   ├── campaigns.repository.ts
│   │   │   ├── campaigns.validator.ts    ← Zod schemas
│   │   │   ├── campaigns.scheduler.ts   ← schedule generation logic
│   │   │   └── campaigns.types.ts
│   │   │
│   │   ├── creatives/
│   │   │   ├── creatives.routes.ts
│   │   │   ├── creatives.service.ts     ← handles upload to R2/S3
│   │   │   ├── creatives.repository.ts
│   │   │   └── creatives.types.ts
│   │   │
│   │   ├── devices/
│   │   │   ├── devices.routes.ts        ← admin device management
│   │   │   ├── device-api.routes.ts     ← tablet-facing API
│   │   │   ├── devices.service.ts
│   │   │   ├── devices.repository.ts
│   │   │   └── devices.types.ts
│   │   │
│   │   ├── events/
│   │   │   ├── events.routes.ts         ← POST /device/events, /device/heartbeat
│   │   │   ├── events.service.ts        ← ingestion + deduplication
│   │   │   ├── events.repository.ts
│   │   │   └── events.types.ts
│   │   │
│   │   ├── verification/
│   │   │   ├── verification.service.ts  ← runs checks, classifies impressions
│   │   │   ├── verification.checks.ts   ← 8 individual check functions
│   │   │   └── verification.types.ts
│   │   │
│   │   ├── analytics/
│   │   │   ├── analytics.routes.ts
│   │   │   ├── analytics.service.ts
│   │   │   ├── analytics.repository.ts
│   │   │   └── analytics.types.ts
│   │   │
│   │   ├── payments/
│   │   │   ├── payments.routes.ts
│   │   │   ├── payments.service.ts
│   │   │   ├── payments.repository.ts
│   │   │   ├── payments.payout.ts       ← payout calculation logic
│   │   │   └── payments.types.ts
│   │   │
│   │   └── admin/
│   │       ├── admin.routes.ts
│   │       └── admin.service.ts         ← orchestrates cross-module admin ops
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   │   ├── client.ts               ← pg pool, connection management
│   │   │   ├── migrations/             ← SQL migration files (numbered)
│   │   │   └── seeds/                  ← development seed data
│   │   │
│   │   ├── storage/
│   │   │   └── r2.ts                   ← Cloudflare R2 client (S3-compatible)
│   │   │
│   │   ├── jobs/
│   │   │   ├── queue.ts                ← pg-boss instance
│   │   │   └── workers/
│   │   │       ├── verify-impressions.worker.ts
│   │   │       ├── aggregate-stats.worker.ts
│   │   │       ├── transition-campaigns.worker.ts
│   │   │       ├── generate-schedules.worker.ts
│   │   │       ├── reconcile-daily.worker.ts
│   │   │       └── generate-payouts.worker.ts
│   │   │
│   │   ├── email/
│   │   │   └── sendgrid.ts             ← transactional email client
│   │   │
│   │   └── cache/
│   │       └── memory.ts               ← node-cache for hot config (no Redis in MVP)
│   │
│   ├── shared/
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts       ← JWT verification
│   │   │   ├── device-auth.middleware.ts← API key verification
│   │   │   ├── role.middleware.ts       ← role-based access
│   │   │   ├── rate-limit.middleware.ts
│   │   │   └── error.middleware.ts
│   │   │
│   │   ├── errors/
│   │   │   └── app-error.ts            ← typed error classes
│   │   │
│   │   └── utils/
│   │       ├── crypto.ts               ← hashing, key generation
│   │       ├── geo.ts                  ← distance calculations
│   │       └── pagination.ts
│   │
│   ├── app.ts                          ← Fastify app, plugin registration
│   └── server.ts                       ← HTTP server entry point
│
├── migrations/                         ← Flyway or node-pg-migrate SQL files
├── .env.example
├── Dockerfile
├── docker-compose.yml                  ← local development
└── package.json
```

---

## Module Design Pattern

Every module follows the same 3-layer pattern:

```
Route → Service → Repository
```

**Route:** Handles HTTP — request parsing, validation, response formatting.
**Service:** Handles business logic — no HTTP, no SQL. Calls repositories.
**Repository:** Handles database — raw SQL, no business logic. Returns typed results.

```typescript
// campaigns/campaigns.service.ts — example
export class CampaignService {
  constructor(
    private readonly campaignRepo: CampaignRepository,
    private readonly creativeRepo: CreativeRepository,
    private readonly jobQueue: Queue
  ) {}

  async submitCampaign(campaignId: string, orgId: string): Promise<Campaign> {
    const campaign = await this.campaignRepo.findById(campaignId)

    if (campaign.orgId !== orgId) throw new ForbiddenError()
    if (campaign.status !== 'draft') throw new ConflictError('Campaign is not in draft state')

    const creatives = await this.creativeRepo.findByCampaign(campaignId)
    if (!creatives.some(c => c.status === 'approved')) {
      throw new ValidationError('Campaign must have at least one approved creative')
    }

    return this.campaignRepo.updateStatus(campaignId, 'submitted')
  }
}
```

---

## Background Job System (pg-boss)

pg-boss uses PostgreSQL as the job queue — no Redis, no RabbitMQ, no extra infrastructure.

```typescript
// infrastructure/jobs/queue.ts
import PgBoss from 'pg-boss'

export const queue = new PgBoss({ connectionString: process.env.DATABASE_URL })

// Job registration (in server.ts on startup)
await queue.work('verify-impressions',  { teamSize: 1 }, verifyImpressionsWorker)
await queue.work('aggregate-stats',     { teamSize: 1 }, aggregateStatsWorker)
await queue.work('transition-campaigns',{ teamSize: 1 }, transitionCampaignsWorker)
await queue.work('generate-schedules',  { teamSize: 1 }, generateSchedulesWorker)
await queue.work('reconcile-daily',     { teamSize: 1 }, reconcileDailyWorker)
await queue.work('generate-payouts',    { teamSize: 1 }, generatePayoutsWorker)
```

**Job schedule (using pg-boss cron):**

| Job | Schedule | What it does |
|---|---|---|
| `verify-impressions` | Every 5 min | Process unverified raw logs |
| `aggregate-stats` | Every 15 min | Update campaign_stats table |
| `transition-campaigns` | Every 1 min | Start/end campaigns by date |
| `generate-schedules` | 23:45 daily | Generate next-day schedules for all devices |
| `reconcile-daily` | 02:00 daily | Full recount, fix drift, lock the day |
| `generate-payouts` | 01:00 monthly | Calculate operator earnings |

---

## Request/Response Envelope

All API responses use consistent structure:

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "limit": 20, "total": 142 }  // pagination only
}

// Error
{
  "success": false,
  "error": {
    "code": "CAMPAIGN_NOT_FOUND",
    "message": "Campaign not found",
    "field": null  // populated for validation errors
  }
}
```

**Error codes are constants, not free-form strings.** Frontend can handle specific codes programmatically.

---

## Error Handling Strategy

```typescript
// shared/errors/app-error.ts
export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly statusCode: number,
    public readonly field?: string
  ) { super(message) }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super('VALIDATION_ERROR', message, 422, field)
  }
}

export class ForbiddenError extends AppError {
  constructor() { super('FORBIDDEN', 'Access denied', 403) }
}

export class ConflictError extends AppError {
  constructor(message: string) { super('CONFLICT', message, 409) }
}
```

Global error handler catches `AppError` and formats the response.
Unexpected errors are caught, logged to Sentry, and return a generic 500.

---

## Auth Architecture

**Two auth systems, one codebase:**

### User JWT (Advertisers, Operators, Admins)
- Login → bcrypt verify → issue JWT (1h access + 7d refresh)
- JWT payload: `{ sub: userId, orgId, role, iat, exp }`
- Access token stored in memory (frontend), refresh token in httpOnly cookie
- Refresh endpoint: `/auth/refresh` (accepts cookie, returns new access token)

### Device API Key (Tablets)
- Admin generates key → stored as SHA-256 hash in database
- Plain key displayed once, admin stores securely, flashes to device
- Device sends: `X-Device-Key: <plain_key>` header
- Middleware hashes the header value, queries database for matching device
- No expiry — device keys rotate manually (MDM update)

### Middleware chain
```
All routes: → rate limit → request logging
User routes: → JWT auth → role check → route handler
Device routes: → device key auth → route handler
Public routes: → route handler (login, health check)
```

---

## Rate Limiting

| Endpoint group | Limit | Window |
|---|---|---|
| `POST /auth/login` | 10 req | 15 min per IP |
| `POST /device/events` | 100 req | 1 min per device |
| `POST /device/heartbeat` | 5 req | 1 min per device |
| `GET /device/schedule` | 10 req | 10 min per device |
| All other user endpoints | 200 req | 1 min per user |

Rate limit state stored in-memory for MVP (single instance). Move to Redis when horizontal scaling starts.

---

## Service Dependencies

```
auth          → users, database
users         → database
campaigns     → database, creatives, devices, jobs
creatives     → database, storage (R2)
devices       → database, campaigns (for schedule)
events        → database, devices (for validation)
verification  → database, devices (for heartbeat lookup)
analytics     → database (read-only queries)
payments      → database, campaigns, devices
admin         → all modules (read + actions)
```

Dependency rule: no circular dependencies between modules. If two modules need each other, extract the shared logic into `shared/`.

---

## Configuration Management

```typescript
// shared/config.ts — validated at startup
const config = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  R2_ACCOUNT_ID: z.string(),
  R2_ACCESS_KEY_ID: z.string(),
  R2_SECRET_ACCESS_KEY: z.string(),
  R2_BUCKET_NAME: z.string(),
  CDN_BASE_URL: z.string().url(),
  SENDGRID_API_KEY: z.string(),
  SENTRY_DSN: z.string().url().optional(),
}).parse(process.env)

export default config
```

App fails to start if any required env variable is missing or invalid.
No silent failures from missing config.
