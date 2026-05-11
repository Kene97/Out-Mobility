# Design System — Out-door

**Version:** 1.0 — MVP
**Philosophy:** Infrastructure-grade clarity. Every pixel earns its place.

---

## 1. Design Principles

1. **Clarity over decoration** — if it doesn't help the user decide, remove it
2. **Density without chaos** — show a lot of information without overwhelming
3. **Trust through precision** — exact numbers, clear labels, honest states
4. **Speed first** — instant feedback, no waiting without indication
5. **Every screen answers: "What do I do next?"**

---

## 2. Color System

### Semantic Palette

| Token | Value | Usage |
|---|---|---|
| `color-bg` | `#F8FAFC` | Page background |
| `color-surface` | `#FFFFFF` | Cards, panels, modals |
| `color-surface-subtle` | `#F1F5F9` | Sidebar, table headers, input bg |
| `color-border` | `#E2E8F0` | All borders |
| `color-border-strong` | `#CBD5E1` | Focused inputs, dividers |

| Token | Value | Usage |
|---|---|---|
| `color-text-primary` | `#0F172A` | Headings, primary content |
| `color-text-secondary` | `#475569` | Labels, metadata, subtext |
| `color-text-tertiary` | `#94A3B8` | Placeholder, disabled text |
| `color-text-inverse` | `#FFFFFF` | Text on dark backgrounds |

| Token | Value | Usage |
|---|---|---|
| `color-accent` | `#1D4ED8` | Primary actions, links, focus rings |
| `color-accent-hover` | `#1E40AF` | Hover state on primary |
| `color-accent-subtle` | `#EFF6FF` | Accent backgrounds (badges, highlights) |

| Token | Value | Usage |
|---|---|---|
| `color-success` | `#059669` | Valid, active, paid, online |
| `color-success-subtle` | `#ECFDF5` | Success badge backgrounds |
| `color-warning` | `#D97706` | Pending, suspicious, stale |
| `color-warning-subtle` | `#FFFBEB` | Warning badge backgrounds |
| `color-danger` | `#DC2626` | Error, invalid, rejected, offline |
| `color-danger-subtle` | `#FEF2F2` | Error badge backgrounds |
| `color-neutral` | `#64748B` | Draft, inactive, unknown |
| `color-neutral-subtle` | `#F8FAFC` | Neutral badge backgrounds |

### Usage Rules
- Never use raw hex values in components — always use tokens
- Accent (`#1D4ED8`) appears **once** per screen as the primary action
- Data visualizations use a 4-color sequential scale: `#BFDBFE → #3B82F6 → #1D4ED8 → #1E3A8A`
- Red never appears in a chart — it is reserved for errors only

### Dark Mode (Driver Tablet Only)
| Token | Value |
|---|---|
| `tablet-bg` | `#09090B` |
| `tablet-surface` | `#18181B` |
| `tablet-border` | `#27272A` |
| `tablet-text` | `#FAFAFA` |
| `tablet-text-secondary` | `#A1A1AA` |
| `tablet-accent` | `#3B82F6` |
| `tablet-success` | `#10B981` |

---

## 3. Typography System

**Font family:** Inter (variable font)
`font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`

### Type Scale

| Name | Size | Line height | Weight | Usage |
|---|---|---|---|---|
| `display` | 48px | 1.1 | 700 | Hero numbers (big metrics) |
| `heading-1` | 32px | 1.2 | 700 | Page titles |
| `heading-2` | 24px | 1.3 | 600 | Section titles |
| `heading-3` | 18px | 1.4 | 600 | Card titles, panel headers |
| `heading-4` | 16px | 1.5 | 600 | Subsection labels |
| `body-lg` | 16px | 1.6 | 400 | Primary body text |
| `body` | 14px | 1.5 | 400 | Default UI text |
| `body-sm` | 13px | 1.5 | 400 | Secondary info, table cells |
| `label` | 12px | 1.4 | 500 | Form labels, column headers |
| `caption` | 11px | 1.4 | 400 | Footnotes, timestamps |
| `mono` | 13px | 1.5 | 400 | IDs, codes, numbers |

### Typographic Rules
- **Metric numbers** use `display` or `heading-1` + `font-variant-numeric: tabular-nums`
- **Table column headers** always use `label` (12px/500) in `color-text-secondary`, uppercase
- **Status text** always uses `body-sm` with accompanying badge
- **Never more than 3 font sizes on one screen**
- **Minimum 14px for all interactive text**

---

## 4. Spacing System

Base unit: **4px**

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Tight: icon gaps, inline padding |
| `space-2` | 8px | Small: chip padding, compact rows |
| `space-3` | 12px | Default: button padding (vertical) |
| `space-4` | 16px | Standard: card padding (small), form spacing |
| `space-5` | 20px | — |
| `space-6` | 24px | Card padding, section spacing |
| `space-8` | 32px | Large section gaps |
| `space-10` | 40px | Page-level section spacing |
| `space-12` | 48px | Hero section padding |
| `space-16` | 64px | Max section separation |

### Spacing Rules
- Card padding: `space-6` (24px) on all sides
- Form field spacing: `space-4` (16px) between fields
- Page header to content: `space-8` (32px)
- Sidebar item height: 36px (comfortable touch + click)

---

## 5. Grid System

### Dashboard Layout
```
┌──────────────────────────────────────────────────────────┐
│  Sidebar (240px fixed)  │  Main content area (fluid)     │
│                         │                                │
│                         │  Page header (48px)            │
│                         │  ─────────────────────         │
│                         │                                │
│                         │  Content (max-width 1200px)    │
│                         │                                │
└─────────────────────────┴────────────────────────────────┘
```

- Sidebar: 240px, fixed, left
- Main content: fluid, `padding: 0 32px`
- Max content width: 1200px (centered within main)
- Page header: 64px tall, includes page title + primary action

### 12-Column Grid (within content area)
- Columns: 12
- Gutter: 24px
- Common layouts:
  - Metric cards: 3 cards × 4 columns = full row (or 4 cards × 3 columns)
  - Main + side panel: 8 col + 4 col
  - Full width table: 12 col
  - Two-column form: 6 col + 6 col

### Breakpoints
| Name | Width | Behavior |
|---|---|---|
| `sm` | 640px | Mobile — sidebar collapses to bottom nav |
| `md` | 768px | Tablet — condensed sidebar |
| `lg` | 1024px | Default layout |
| `xl` | 1280px | Comfortable dashboard layout |

**Note:** Advertiser dashboard is primarily desktop (1024px+). Mobile responsiveness is secondary for MVP.

---

## 6. Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 4px | Tags, status dots, small inputs |
| `radius-md` | 8px | Buttons, cards, inputs |
| `radius-lg` | 12px | Modals, dropdowns, panels |
| `radius-xl` | 16px | Large cards, drawer panels |
| `radius-full` | 9999px | Badge pills, avatar circles |

---

## 7. Shadow System

| Token | Value | Usage |
|---|---|---|
| `shadow-xs` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift: inline elements |
| `shadow-sm` | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` | Cards, buttons |
| `shadow-md` | `0 4px 8px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)` | Dropdowns, popovers |
| `shadow-lg` | `0 12px 24px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)` | Modals |
| `shadow-focus` | `0 0 0 3px rgba(29,78,216,0.25)` | Focus ring on interactive elements |

---

## 8. Component Specifications

### Buttons

**Sizes:**
- SM: height 32px, px 12px, text 13px/500
- MD (default): height 40px, px 16px, text 14px/500
- LG: height 48px, px 20px, text 15px/600

**Variants:**

| Variant | Background | Text | Border | Use when |
|---|---|---|---|---|
| Primary | `color-accent` | white | none | One per screen — the main CTA |
| Secondary | white | `color-accent` | `color-accent` | Secondary actions |
| Ghost | transparent | `color-text-secondary` | `color-border` | Tertiary actions |
| Danger | `color-danger` | white | none | Destructive actions |
| Link | transparent | `color-accent` | none | Inline navigation |

**States:** normal → hover (darken 10%) → pressed (darken 15%) → disabled (opacity 40%, no pointer)

**Loading state:** Replace label with spinner (16px), maintain button width.

**Icon buttons:** Same height rules, width = height (square), `radius-md`.

---

### Status Badges

Pill-shaped. `radius-full`. Font: `label` (12px/500).
Padding: `4px 10px`.

| Status | Background | Text color | Use |
|---|---|---|---|
| Active | `color-success-subtle` | `color-success` | Campaign live, device online |
| Paused | `color-warning-subtle` | `color-warning` | Campaign paused, device stale |
| Pending | `color-warning-subtle` | `color-warning` | Awaiting review |
| Draft | `color-neutral-subtle` | `color-neutral` | Not submitted |
| Completed | `color-accent-subtle` | `color-accent` | Campaign done |
| Cancelled | `color-danger-subtle` | `color-danger` | Terminated |
| Offline | `color-danger-subtle` | `color-danger` | Device offline |
| Valid | `color-success-subtle` | `color-success` | Impression verified |
| Invalid | `color-danger-subtle` | `color-danger` | Rejected |
| Suspicious | `#FFF7ED` | `#C2410C` | Fraud-flagged |

Always pair a status dot (8px circle, same color as text) before the label text.

---

### Cards

Base card: `background: white`, `border: 1px solid color-border`, `radius-lg`, `shadow-sm`

**Metric Card:**
```
┌───────────────────────────┐
│ label (12px, secondary)   │
│                           │
│ 142,891                   │  ← display or heading-1 size
│ ↑ 12% vs last week        │  ← trend indicator (green/red)
└───────────────────────────┘
```
Width: auto (fills column). Height: 100px.
Trend: green arrow up = good, red arrow down = bad. Always contextualized (not just raw change).

**Campaign Card (list row — used in mobile fallback):**
Single-line layout with: name, status badge, impressions, spend, date range, actions menu.

**Data Card (container):**
- Header: title (heading-3) + optional action button, right-aligned
- Body: content (table, chart, list)
- Footer (optional): summary or pagination

---

### Tables

**Structure:**
```
┌─────────────────────────────────────────────────────────┐
│  COLUMN  │  COLUMN   │   COLUMN    │  COLUMN  │ ACTIONS │
├──────────┼───────────┼─────────────┼──────────┼─────────┤
│ row data │ row data  │ row data    │ badge    │  •••    │
│ row data │ row data  │ row data    │ badge    │  •••    │
└─────────────────────────────────────────────────────────┘
```

- Header row: `color-surface-subtle` background, `label` text (uppercase, 11px/500, secondary color)
- Row height: 52px (data), 40px (compact)
- Hover: `color-surface-subtle` background on row
- Border: only bottom border on each row (`color-border`)
- Actions column: hidden until row hover (3-dot menu or inline text links)
- Numeric columns: right-aligned, monospace font
- Sort: arrow indicators on sortable column headers
- Pagination: bottom right, "1–20 of 142 results"

**Empty table state:** centered illustration + headline + CTA (see States section).

---

### Forms

**Text Input:**
- Height: 40px
- Background: white
- Border: `1px solid color-border` → focus: `1px solid color-accent` + `shadow-focus`
- `radius-md`
- Label above (never placeholder as label)
- Helper text below (12px, secondary) — always shown if needed
- Error: border `color-danger`, error message below in red

**Select / Dropdown:**
Same visual as text input. Chevron icon right-aligned.

**File Upload:**
```
┌──────────────────────────────────┐
│                                  │
│   ↑  Drag & drop or click to     │
│      upload                      │
│                                  │
│   MP4, JPG, PNG • Max 50MB       │
│                                  │
└──────────────────────────────────┘
```
Dashed border (`color-border`). Hover: `color-accent-subtle` background.
Progress bar appears during upload.

**Form layout:**
- Labels: `label` (12px/500), `color-text-secondary`, 6px below label to input
- Spacing between fields: `space-5` (20px)
- Section dividers within long forms: horizontal rule + section title

---

### Navigation (Sidebar)

```
┌───────────────────────┐
│  [Logo] Out-door       │
│                        │
│  ○ Dashboard           │  ← active: accent left border (3px) + accent text
│  ○ Campaigns           │  ← inactive: secondary text
│  ○ Analytics           │
│  ○ Reports             │
│                        │
│  ─────────────────     │
│                        │
│  ○ Account             │
│  ○ Help                │
└────────────────────────┘
```

- Width: 240px
- Background: `color-surface`
- Right border: `1px solid color-border`
- Item height: 36px, `radius-md` on item background
- Active item: left accent bar (3px, `color-accent`) + accent text + `color-accent-subtle` background
- Hover: `color-surface-subtle` background
- Logo area: 64px tall, contains wordmark

---

### Modals

- Backdrop: `rgba(0,0,0,0.4)` blur
- Panel: white, `radius-xl`, `shadow-lg`, max-width 560px (default), 720px (wide)
- Header: title (heading-3) + close button (X, top right)
- Body: `space-6` padding
- Footer: right-aligned buttons (Ghost left, Primary right)
- Animation: fade in + scale up from 95% (150ms ease-out)

---

### Loading States

**Skeleton screen** (preferred over spinner for content areas):
- Animated gradient shimmer (`#E2E8F0 → #F1F5F9 → #E2E8F0`, 1.5s loop)
- Match the shape of the content it's replacing
- Show skeleton immediately, never blank screen

**Spinner:**
- 20px circle, `color-accent`, 2px stroke
- Used for button loading states and small inline loaders

**Page-level loading:**
- Skeleton of the full layout (sidebar remains, content area shows skeleton)
- Never a full-page spinner

---

### Empty States

Every empty state has 3 elements:
1. Illustration (simple SVG icon, not cartoon — monochrome, 64px)
2. Headline (heading-3): "No campaigns yet" — factual, not cute
3. CTA button (Primary): "Create campaign"

| Context | Headline | CTA |
|---|---|---|
| No campaigns | No campaigns yet | Create campaign |
| No devices | No devices registered | Register device |
| No impressions | No data for this period | — |
| No fraud flags | All clear | — |
| No payouts | No payouts this period | — |

Empty states with no available action (e.g., "No impressions") show no CTA — just headline.

---

### Error States

**Inline form error:**
Red border on input + red helper text below (`color-danger`, 12px).

**Toast notifications:**
- Bottom right, slide in from right (200ms)
- Auto-dismiss: 4 seconds (success) / persistent (error)
- Max width: 380px

| Type | Icon | Border | Text |
|---|---|---|---|
| Success | ✓ check | `color-success` | Positive confirmation |
| Error | ✗ × | `color-danger` | What went wrong |
| Warning | ⚠ | `color-warning` | Non-blocking caution |
| Info | ℹ | `color-accent` | Neutral update |

**Full page error:**
```
HTTP 404 / 500 states:
  Heading: "Something went wrong"
  Body: Clear one-liner explanation
  CTA: "Go to dashboard" (primary) | "Try again" (secondary)
```

---

## 9. Interaction & Motion Rules

**Principle:** Motion must have meaning. Never animate for style.

### Timing
| Duration | Use |
|---|---|
| 100ms | Hover transitions (color, border) |
| 150ms | Button press, badge appearance |
| 200ms | Dropdown open, tooltip appear |
| 250ms | Modal open/close |
| 300ms | Page transitions, sidebar expand |

**Easing:** `ease-out` for entrance (fast start, slow end). `ease-in` for exit.

### Rules
- **Hover:** Color/background transitions at 100ms. No scale transforms on functional elements.
- **Button press:** Subtle scale (0.98) at 100ms. Returns to 1.0 at 100ms.
- **Modals:** Scale from 0.95 + fade in at 200ms. Never slide from edge.
- **Toast:** Slide in from right at 200ms. Fade out at 150ms.
- **Skeleton:** Shimmer loops at 1.5s — never faster (feels anxious).
- **Charts:** Animate on first render only (bars grow up, lines draw right). No animation on data refresh.
- **No:** parallax, floating elements, bounce effects, decorative animations.

### Focus States
- All interactive elements have visible focus ring: `shadow-focus` (3px blue ring)
- Never remove focus outline — keyboard navigation must be visible
- Focus ring only on keyboard navigation (`:focus-visible`), not mouse click

---

## 10. Iconography

**Library:** Lucide Icons (MIT license, consistent stroke width, tree-shakeable)

**Rules:**
- Size: 16px (inline/nav), 20px (button icons), 24px (standalone)
- Stroke width: 1.5px (standard), 2px (emphasis)
- Color: inherits from text color — never hardcoded
- Never use icons without labels in navigation (accessibility)
- Status dots (8px circles) are not icons — they are CSS, not SVG
