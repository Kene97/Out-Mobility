# Frontend Architecture — Out-door

**Principle:** Simple, fast, maintainable. Build for a team of 1–2 developers.
Avoid frameworks and abstractions that require expertise to operate.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR for fast first load, file-based routing, API routes |
| Language | TypeScript (strict) | Type safety across API boundaries |
| Styling | Tailwind CSS + CSS variables for tokens | Fast, consistent, no CSS files to manage |
| Component primitives | Radix UI | Accessible, unstyled, reliable behavior |
| Charts | Recharts | Simple, composable, React-native |
| Forms | React Hook Form + Zod | Fast, type-safe, minimal re-renders |
| Server state | TanStack Query (React Query) | Caching, loading/error states, polling |
| Client state | Zustand (minimal) | Simple stores for auth, UI state only |
| Icons | Lucide React | Consistent stroke, tree-shakeable |
| Maps | Mapbox GL JS | Reliable, Africa-ready, free tier adequate for MVP |
| Auth | NextAuth.js (JWT strategy) | Drop-in, handles session, JWT compatible with API |
| HTTP client | Axios (typed) | Interceptors for auth headers + error handling |

**Total bundle estimate (gzip):** ~180KB initial, ~60KB per route chunk — acceptable.

---

## Application Structure

Three distinct apps, one codebase (monorepo-lite via Next.js route groups):

| App | Path group | Users |
|---|---|---|
| Advertiser dashboard | `(advertiser)` | Advertisers |
| Admin control panel | `(admin)` | Out Mobility team |
| Operator dashboard | `(operator)` | Fleet operators |

Tablet kiosk app = **separate Android project** (not part of this web frontend).

---

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, providers)
│   ├── page.tsx                      # Marketing landing (redirects to /login)
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── (advertiser)/
│   │   ├── layout.tsx                # Sidebar + auth guard
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── campaigns/
│   │   │   ├── page.tsx              # Campaign list
│   │   │   ├── new/
│   │   │   │   └── page.tsx          # Campaign creation wizard
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Campaign detail
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   └── reports/
│   │       └── page.tsx
│   │
│   ├── (admin)/
│   │   ├── layout.tsx
│   │   ├── overview/
│   │   │   └── page.tsx
│   │   ├── campaigns/
│   │   │   └── page.tsx
│   │   ├── devices/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── fraud/
│   │   │   └── page.tsx
│   │   ├── payouts/
│   │   │   └── page.tsx
│   │   └── system/
│   │       └── page.tsx
│   │
│   └── (operator)/
│       ├── layout.tsx
│       ├── fleet/
│       │   └── page.tsx
│       └── earnings/
│           └── page.tsx
│
├── components/
│   ├── ui/                           # Design system primitives
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Table.tsx
│   │   ├── Modal.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── FileUpload.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Toast.tsx
│   │   ├── Tooltip.tsx
│   │   └── EmptyState.tsx
│   │
│   ├── layout/
│   │   ├── Sidebar.tsx               # Role-aware navigation
│   │   ├── PageHeader.tsx            # Title + primary action slot
│   │   └── AppShell.tsx              # Sidebar + main content wrapper
│   │
│   ├── campaign/
│   │   ├── CampaignTable.tsx
│   │   ├── CampaignCard.tsx
│   │   ├── CampaignStatusBadge.tsx
│   │   ├── CampaignWizard.tsx        # 4-step creation wizard
│   │   ├── CampaignMetrics.tsx       # Metric card row
│   │   ├── CampaignChart.tsx         # Daily impressions bar chart
│   │   └── CampaignReviewModal.tsx   # Admin review modal
│   │
│   ├── device/
│   │   ├── DeviceMap.tsx             # Mapbox map with device pins
│   │   ├── DeviceTable.tsx
│   │   ├── DeviceDetailPanel.tsx     # Slide-in side panel
│   │   ├── HeartbeatChart.tsx        # 24h heartbeat bar
│   │   └── DeviceStatusBadge.tsx
│   │
│   ├── analytics/
│   │   ├── MetricCard.tsx            # Single metric card with trend
│   │   ├── ImpressionsChart.tsx
│   │   └── DeliveryTable.tsx
│   │
│   └── fraud/
│       ├── FraudFlagTable.tsx
│       └── FraudReviewModal.tsx
│
├── hooks/
│   ├── useCampaigns.ts               # TanStack Query for campaigns
│   ├── useDevices.ts
│   ├── useAnalytics.ts
│   ├── usePayouts.ts
│   └── useSystemHealth.ts
│
├── stores/
│   ├── auth.store.ts                 # User session, role
│   └── ui.store.ts                  # Sidebar open/close, active modal
│
├── lib/
│   ├── api.ts                        # Axios instance, interceptors
│   ├── auth.ts                       # NextAuth config
│   ├── query-client.ts               # TanStack Query setup
│   └── utils.ts                      # cn(), formatCurrency(), formatDate()
│
├── types/
│   ├── campaign.ts
│   ├── device.ts
│   ├── user.ts
│   ├── analytics.ts
│   └── api.ts                        # API response envelope types
│
└── styles/
    ├── globals.css                   # Tailwind directives + CSS variables
    └── tokens.css                    # Design token CSS variables
```

---

## State Management

### Rule: minimize client-side state.

| Data type | Where it lives | Tool |
|---|---|---|
| Server data (campaigns, devices, stats) | TanStack Query cache | `useQuery` / `useMutation` |
| Auth session | NextAuth session | `useSession()` |
| UI state (sidebar open, modal open) | Zustand | `ui.store.ts` |
| Form state | React Hook Form | `useForm()` |
| URL state (filters, pagination) | URL params | `useSearchParams()` |

**No Redux. No Context API for data.** TanStack Query handles server state with built-in caching, loading, and error states.

---

## API Integration Pattern

### Typed API client
```typescript
// lib/api.ts
const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })

// Attach JWT to every request
api.interceptors.request.use(config => {
  const token = getToken() // from NextAuth session
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally (refresh token or redirect to login)
api.interceptors.response.use(null, handleAuthError)
```

### Query hooks pattern
```typescript
// hooks/useCampaigns.ts
export function useCampaigns(status?: CampaignStatus) {
  return useQuery({
    queryKey: ['campaigns', status],
    queryFn: () => api.get<Campaign[]>('/campaigns', { params: { status } })
  })
}

export function useCreateCampaign() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateCampaignInput) => api.post('/campaigns', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['campaigns'] })
  })
}
```

### Data polling (for live dashboards)
```typescript
// Campaign detail — poll every 15 minutes for impression updates
useQuery({
  queryKey: ['campaign-stats', id],
  queryFn: () => api.get(`/campaigns/${id}/stats`),
  refetchInterval: 15 * 60 * 1000 // 15 minutes
})

// Admin system health — poll every 30 seconds
useQuery({
  queryKey: ['system-health'],
  queryFn: () => api.get('/admin/system/health'),
  refetchInterval: 30_000
})
```

---

## Design Token Integration

CSS variables bridge the design system to Tailwind:

```css
/* styles/tokens.css */
:root {
  --color-bg: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-border: #E2E8F0;
  --color-text-primary: #0F172A;
  --color-text-secondary: #475569;
  --color-accent: #1D4ED8;
  --color-success: #059669;
  --color-warning: #D97706;
  --color-danger: #DC2626;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.06);
}
```

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        // ...
      }
    }
  }
}
```

Usage: `className="bg-surface border border-border rounded-md"`

---

## Component Design Rules

### Every UI component:
1. Has a TypeScript interface for all props
2. Handles its own loading and error states (no blank renders)
3. Has a documented empty state
4. Is accessible (keyboard navigable, ARIA labels)
5. Uses design tokens, never hardcoded colors

### Component file structure:
```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  icon?: LucideIcon
  onClick?: () => void
  children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', loading, ...props }: ButtonProps) {
  // implementation
}
```

---

## Auth & Role Guards

Three roles: `advertiser`, `operator`, `admin`

```typescript
// app/(admin)/layout.tsx
export default async function AdminLayout({ children }) {
  const session = await getServerSession()
  if (!session || session.user.role !== 'admin') redirect('/login')
  return <AppShell role="admin">{children}</AppShell>
}
```

Route groups enforce role access at the layout level.
No role checking scattered in page components.

---

## Performance Rules

1. **No data fetched in pages** — all data in `useQuery` hooks (client) or `generateStaticParams` (server)
2. **Charts lazy-loaded** — `dynamic(() => import('./ImpressionsChart'), { ssr: false })`
3. **Mapbox lazy-loaded** — same pattern
4. **Images via Next.js `<Image>`** — automatic optimization
5. **Tailwind purge** — only used classes in production bundle
6. **No moment.js** — use `date-fns` (tree-shakeable, 2KB vs 67KB)

---

## MVP vs Future (Frontend)

| Feature | MVP | Future |
|---|---|---|
| Advertiser dashboard | Yes — full | Self-serve onboarding, payment gateway |
| Admin dashboard | Yes — full | Advanced analytics, bulk operations |
| Operator dashboard | Yes — basic | Full fleet management, driver management |
| Real-time updates | 15-min polling | WebSocket live updates |
| Mobile optimization | Fallback only | Responsive first |
| Map view (devices) | Mapbox with pins | Route heat maps, live tracking |
| Chart types | Bar, line only | Heat maps, geo maps, funnels |
| Notifications | Toast only | Email, in-app notification center |
| Dark mode (dashboards) | No | System preference toggle |
| i18n | English only | Multi-language |
| Tablet kiosk app | Separate (Android) | — |
