# Driver Tablet UI — Kiosk Interface

**Device:** Android tablet, 9–10 inch screen, portrait or landscape
**Mode:** Full-screen kiosk, no navigation chrome
**User:** Passenger (primary view) + Driver (peripheral awareness)
**Goal:** Deliver ads to passengers. Show driver their earnings. Zero distraction.

---

## Design Philosophy

This is not a dashboard. This is an ambient display that:
- Serves ad content to passengers with zero friction
- Gives the driver just enough status to know the device is working
- Never requires the driver to interact with it during driving

**Reference:** Tesla center console + Uber driver app earnings view.

---

## Color Palette (Dark Mode)

Always dark. Bright ads on dark surrounds. Reduces glare. Looks premium.

| Token | Value |
|---|---|
| Background | `#09090B` |
| Surface | `#18181B` |
| Border | `#27272A` |
| Text primary | `#FAFAFA` |
| Text secondary | `#A1A1AA` |
| Accent | `#3B82F6` |
| Success (earnings) | `#10B981` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |

---

## Screen Layout (Primary — Ad Playing)

**Landscape orientation (default, passenger-facing):**

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│                                                                   │
│                                                                   │
│                  AD CONTENT (full screen)                         │
│                  video or image                                   │
│                  no borders, no padding                           │
│                                                                   │
│                                                                   │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│  ● ACTIVE   Out-door        Today: ₦1,240 earned    6h 24m live  │
└──────────────────────────────────────────────────────────────────┘
```

**Status bar (bottom, 44px tall):**
- Left: Status dot (green = active, red = offline) + "ACTIVE" or "OFFLINE"
- Center: Out-door wordmark (small, 14px, subtle — brand presence only)
- Right: Today's earnings + uptime counter

Status bar is semi-transparent with subtle blur when video is playing (backdrop-filter).
It becomes fully opaque between ads.

---

## Screen States

### State 1: Ad Playing (Primary state)
- Ad content fills 100% of screen above status bar
- Status bar remains visible at all times (44px)
- No UI controls visible to passenger
- Driver sees earnings/status glanceable from status bar

### State 2: Between Ads (3–5 seconds)
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│                                                                   │
│              [Out Mobility wordmark — centered]                   │
│                                                                   │
│                    ₦1,240                                         │
│              earned today                                         │
│                                                                   │
│         ━━━━━━━━━━━━━━━━━━━━━━━━━  ← loading bar for next ad    │
│                                                                   │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│  ● ACTIVE   Out-door        Today: ₦1,240 earned    6h 24m live  │
└──────────────────────────────────────────────────────────────────┘
```

Between-ad screen shows:
- Out Mobility wordmark (calm, premium — not a loading spinner)
- Earnings so far today (motivates driver to keep device on)
- Thin loading bar showing next ad loading (1.5–3 seconds)

### State 3: Offline / No Network
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│                  [cached ad still plays]                          │
│                  (or last shown ad frozen)                        │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│  ⚡ OFFLINE  Out-door       Today: ₦1,240 earned    6h 24m live  │
└──────────────────────────────────────────────────────────────────┘
```

- Offline indicator replaces green dot (yellow ⚡ icon)
- Cached ads continue playing — no interruption
- Driver does not need to do anything
- Status bar text: "OFFLINE — Cached ads playing"

### State 4: No Ads Scheduled / No Content
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│                                                                   │
│              [Out Mobility wordmark — centered]                   │
│                                                                   │
│              Connecting to network...                             │
│                  (or "No content scheduled")                      │
│                                                                   │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│  ● ACTIVE   Out-door        Today: ₦0 earned        0h 0m live   │
└──────────────────────────────────────────────────────────────────┘
```

Never show an error message that would worry a passenger.
Clean fallback: Out Mobility branding + subtle status.

### State 5: Support Access (Driver-Initiated)
Driver-accessible only (not passenger-visible ideally, or placed discreetly).

Single tap-and-hold (2 seconds) on status bar bottom-right corner → reveals:

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│   Driver Support                                          [✕]    │
│   ─────────────────────────────────────────────────────────      │
│                                                                   │
│   Device ID:  DEV-00142                                           │
│   Status:     ● Online                                            │
│   Uptime:     6h 24m today                                        │
│   Earnings:   ₦1,240 today                                        │
│                                                                   │
│   [Report an issue]                                               │
│                                                                   │
│   ─────────────────────────────────────────────────────────      │
│   Support line: 0800-OUT-DOOR                                     │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

- Full-screen overlay with dark backdrop
- Auto-dismisses after 30 seconds if no interaction
- "Report an issue" opens a simple 3-option selector (screen issue / connectivity issue / other)
- No text input required — voice-friendly selections only

---

## Kiosk Lock Rules

| What | Behavior |
|---|---|
| Home button | Disabled (device owner mode) |
| Back button | Disabled |
| Notification bar | Collapsed, hidden |
| Volume buttons | Disabled or muted |
| Screen timeout | Never (wake lock always held) |
| App switcher | Disabled |
| Settings access | Blocked |
| Driver support access | Tap-and-hold on status bar (2 sec) |

---

## Typography (Tablet-Specific)

| Element | Size | Weight | Color |
|---|---|---|---|
| Earnings amount | 48px | 700 | `#10B981` (success green) |
| Earnings label | 14px | 400 | `#A1A1AA` |
| Uptime | 14px | 500 | `#FAFAFA` |
| Status text | 12px | 600 | `#10B981` or `#EF4444` |
| Wordmark | 16px | 700 | `#FAFAFA` |
| Support overlay headings | 18px | 600 | `#FAFAFA` |

---

## Earnings Display Logic

Earnings are estimated in real-time based on:
- Verified impression rate from today
- Driver's revenue share %

**Display formula:**
```
today_earnings_estimate =
  verified_impressions_today × (cpm_rate / 1000) × revenue_share_pct
```

Updated every 15 minutes from backend, cached locally.

Display: `₦1,240` (local currency, formatted with thousand separators, no decimal for whole amounts)

**Why show earnings:** Motivates driver to keep device charged and mounted.
It is the driver's passive income signal — make it feel real and rewarding.

---

## Orientation

**Default: Landscape**
- Best for horizontal video content
- More screen real estate for ads

**Portrait mode:** Supported for some vehicle configurations (rear seat, narrow mount).
Same UI layout — status bar moves to bottom in both orientations.

---

## Brightness

- Default: 70% brightness (comfortable for rear passengers, not blinding at night)
- Auto-adjust: Use ambient light sensor if available
- Min brightness enforced: 40% (device must be visible)

---

## Audio

- Default: Muted (most ride-hail etiquette expectations)
- Video ads play without sound unless explicitly configured by operator
- No auto-play audio without operator consent
- If operator enables audio: Volume capped at 40% of system max

---

## Device Heartbeat Visual

Subtle indicator in status bar shows connectivity:
- Solid green dot → Online, syncing normally
- Pulsing yellow dot → Reconnecting (will sync when back online)
- Solid red dot → Offline >10 minutes (driver may need to check network)

Pulsing animation: 2-second cycle, `opacity: 1.0 → 0.5 → 1.0`. Subtle, not alarming.

---

## MVP vs Future (Tablet UI)

| Feature | MVP | Future |
|---|---|---|
| Full-screen ad playback | Yes | — |
| Status bar (earnings, uptime) | Yes | — |
| Between-ad screen | Yes | — |
| Offline mode | Yes | — |
| Driver support overlay | Yes (basic) | Full in-app support |
| Passenger interaction | No | QR code, tap to learn more |
| Passenger rating | No | Opt-in engagement |
| Audio ads | No | Operator-configurable |
| Dual-zone content (driver + passenger) | No | Yes (separate zones) |
| Gamified earnings (streaks, bonuses) | No | Yes |
| Multilingual UI | No | Yes |
