# Deployment Architecture — Out-door

**Philosophy:** Start cheap. Build for scale. Never pay for scale you don't have.
**MVP target:** Supports 50–1,000 devices, <$100/month infrastructure.

---

## MVP Infrastructure (Phase 0–1)

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLOUDFLARE                               │
│   DNS + CDN + DDoS protection (Free tier)                        │
│   Serves ad creatives globally from R2                           │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTPS
          ┌──────────────┴──────────────┐
          │                              │
          ▼                              ▼
┌──────────────────┐          ┌────────────────────┐
│  Railway.app     │          │  Cloudflare R2     │
│                  │          │                    │
│  API Server      │          │  Ad Creatives      │
│  (Node.js)       │          │  (video + images)  │
│  + pg-boss jobs  │          │                    │
│  1GB RAM / 1 CPU │          │  0 egress fees     │
│  ~$10/month      │          │  ~$0 at MVP scale  │
│                  │          └────────────────────┘
│  ┌────────────┐  │
│  │ PostgreSQL │  │
│  │ (Railway)  │  │
│  │ 1GB RAM    │  │
│  │ ~$5/month  │  │
│  └────────────┘  │
└──────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│  Vercel (Free / Pro $20/month)   │
│                                  │
│  Next.js Frontend:               │
│  - Advertiser Dashboard          │
│  - Admin Dashboard               │
│  - Operator Dashboard            │
└──────────────────────────────────┘
```

**MVP Monthly Cost Estimate:**
| Service | Cost |
|---|---|
| Railway API server | ~$10/month |
| Railway PostgreSQL | ~$5/month |
| Cloudflare R2 | ~$0 (10GB free) |
| Cloudflare DNS/CDN | Free |
| Vercel (frontend) | Free or $20/month |
| Sentry | Free |
| SendGrid | Free (100 emails/day) |
| Better Uptime | Free |
| **Total** | **~$15–35/month** |

---

## Environment Strategy

Three environments:

| Environment | Purpose | Hosting |
|---|---|---|
| `development` | Local dev with docker-compose | Developer laptop |
| `staging` | Pre-production testing | Railway (separate project) |
| `production` | Live system | Railway (main project) |

**Environment variables:** Never committed to git. Managed in Railway dashboard for server, Vercel dashboard for frontend. `.env.example` documents all required variables.

**Staging:** Uses production-like config with test data. Devices in staging use a separate API base URL. Never shares database with production.

---

## Docker & Local Development

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/outdoor_dev
      NODE_ENV: development
    depends_on: [db]
    volumes:
      - ./src:/app/src  # hot reload

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: outdoor_dev
      POSTGRES_PASSWORD: postgres
    ports: ["5432:5432"]
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Optional: pgAdmin for local DB browsing
  pgadmin:
    image: dpage/pgadmin4
    ports: ["5050:80"]
    environment:
      PGADMIN_DEFAULT_EMAIL: dev@outmobility.io
      PGADMIN_DEFAULT_PASSWORD: dev

volumes:
  postgres_data:
```

---

## Dockerfile

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS build
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM base AS production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

Multi-stage build: final image is ~150MB (no TypeScript compiler, no dev deps).

---

## CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]     # → production
    branches: [staging]  # → staging

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env: { POSTGRES_PASSWORD: test }
        options: --health-cmd pg_isready
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm test
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test

  deploy-api:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Railway
        run: npx @railway/cli@latest up --service out-door-api
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

**Deploy pipeline: push → test → deploy (2–5 minutes total)**

---

## Database Migrations on Deploy

Migrations run automatically on startup:

```typescript
// server.ts
async function start() {
  logger.info('Running database migrations...')
  await runMigrations()  // node-pg-migrate: applies pending SQL files
  
  logger.info('Starting background job workers...')
  await startJobWorkers()
  
  logger.info('Starting HTTP server...')
  await app.listen({ port: config.PORT, host: '0.0.0.0' })
  logger.info({ port: config.PORT }, 'Server running')
}
```

**Migration safety rules:**
- Never drop columns in production migration (add `deleted_at` instead, drop later)
- Never rename columns (add new column, backfill, switch, drop old)
- Long-running migrations (backfills) run as separate one-off scripts, not in the deploy migration

---

## Scale-Out Architecture (Phase 2+: 1,000–10,000 devices)

When MVP outgrows Railway, migrate to AWS:

```
┌──────────────────────────────────────────────────────────────────┐
│                    AWS INFRASTRUCTURE                            │
│                                                                  │
│  ┌──────────────────────────────┐                                │
│  │    Application Load Balancer │  ← Route 53 DNS               │
│  └──────────────┬───────────────┘                                │
│                 │                                                 │
│     ┌───────────┴────────────┐                                   │
│     ▼                        ▼                                   │
│  ┌──────────┐          ┌──────────┐    ECS Fargate               │
│  │  API     │          │  API     │    (auto-scaling)             │
│  │ Task 1   │          │ Task 2   │    $30–80/month               │
│  └──────────┘          └──────────┘                              │
│        │                    │                                     │
│        └────────┬───────────┘                                    │
│                 ▼                                                 │
│  ┌──────────────────────────────┐                                │
│  │  RDS PostgreSQL (Multi-AZ)   │  ← db.t3.medium: $50/month    │
│  │  Primary + Read Replica      │                                │
│  └──────────────────────────────┘                                │
│                                                                  │
│  ┌──────────────────────────────┐                                │
│  │  SQS Queue                   │  ← Event ingestion buffer     │
│  │  (device event batches)      │    Decouples device → verify  │
│  └──────────────────────────────┘                                │
│                                                                  │
│  ┌──────────────────────────────┐                                │
│  │  ElastiCache Redis           │  ← Rate limiting, session     │
│  │  (cache.t3.micro)            │    cache, schedule cache       │
│  └──────────────────────────────┘                                │
│                                                                  │
│  ┌──────────────────────────────┐                                │
│  │  S3 + CloudFront             │  ← Creative delivery at scale │
│  └──────────────────────────────┘                                │
└──────────────────────────────────────────────────────────────────┘
```

**Scale-out cost estimate (1,000 devices):**
- ECS Fargate (2 tasks): ~$60/month
- RDS PostgreSQL Multi-AZ: ~$100/month
- SQS: ~$1/month
- CloudFront + S3: ~$20/month
- ElastiCache: ~$15/month
- **Total:** ~$200/month

---

## Scaling Decision Points

| Metric | Action |
|---|---|
| API response time p95 >500ms | Add second API container (horizontal scale) |
| DB connections >80% | Add read replica for analytics queries |
| Event ingestion queue growing | Move to SQS + async consumer |
| Schedule generation taking >5min | Parallelize across multiple workers |
| Heartbeat DB writes >10,000/min | Add Redis cache, batch writes |
| Impression logs >100GB/month | Move analytics to ClickHouse |
| 5,000+ devices | Move to dedicated device-api service |

**The current schema and API design handle all of these without change.**
Only the infrastructure changes — code is the same.

---

## CDN Strategy for West Africa

Cloudflare has major PoPs in:
- Lagos, Nigeria
- Nairobi, Kenya
- Johannesburg, South Africa
- Cairo, Egypt

Ad creatives served from Cloudflare edge = <50ms download time in Lagos.
This is critical for tablets on 4G networks in field conditions.

**Fallback:** Device caches creatives locally. If CDN is unreachable, already-cached files play. Users never see a blank screen due to CDN issues.

---

## Security Hardening (Production)

| Control | Implementation |
|---|---|
| HTTPS everywhere | Cloudflare SSL + Railway auto-TLS |
| Database access | PostgreSQL only accessible from API (Railway private network) |
| Secrets management | Railway environment variables (encrypted at rest) |
| API rate limiting | In-memory (MVP), Redis (scale) |
| Input validation | Zod schemas on all endpoints |
| SQL injection | Parameterized queries only (never string concatenation) |
| CORS | Whitelist: dashboard domains only |
| Helmet.js | HTTP security headers (CSP, HSTS, etc.) |
| API key rotation | Admin can regenerate device API key via dashboard |
| Log sanitization | Never log API keys, passwords, payment data |

---

## Backup Strategy

| Data | Backup frequency | Retention | Method |
|---|---|---|---|
| PostgreSQL database | Continuous WAL + daily snapshot | 30 days | Railway managed backup |
| R2 creative files | Not backed up (re-uploadable) | — | Advertiser retains source |
| Application logs | Logtail retention | 7 days (free), 30 days (paid) | Logtail |
| Code | Git (GitHub) | Forever | GitHub |

**Recovery drill:** Test database restore from backup monthly. Document exact restore procedure.

---

## Deployment Runbook

**Deploy a new version:**
```bash
git push origin main  # triggers CI/CD pipeline
# Wait ~3 minutes for: test → build → deploy → migrations → health check
# Check Sentry for new errors
# Check /health endpoint
# Done
```

**Rollback:**
```bash
railway rollback  # rolls back to previous deployment
# Or: git revert + push
```

**Emergency database access:**
```bash
railway connect out-door-db  # Railway managed PostgreSQL shell
```

**Check logs:**
```bash
railway logs --service out-door-api --tail 100
# Or: Logtail dashboard for searchable logs
```
