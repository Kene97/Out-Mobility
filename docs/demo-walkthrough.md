# Product Demo Walkthrough — Out Mobility

**Format:** 3 minutes. Investor audience. Screen share or in-person.
**Goal:** An investor walks away having *felt* the verification advantage — not just heard about it.
**Rule:** Show real data. Never demo a blank state. Never apologize for what isn't built.

---

## The Demo Premise

You are showing an investor what an advertiser sees, what the admin sees, and — if you have it — what a device looks like in a real vehicle.

The emotional arc:
```
Skepticism → Curiosity → Trust → Conviction
     │             │          │         │
  "Is this    "Show me    "That's    "That's
   real?"      the data"   actual     fundable"
                           proof"
```

Everything in the demo serves that arc.

---

## Before You Open the Screen

Say this (20 seconds):

> "I'm going to show you three things in three minutes. First, what an advertiser sees when their campaign is live. Second, what our verification engine actually produces. Third — if I can get to it — a device playing an ad in a real Lagos vehicle. The third one is the most important. Let's start."

Then open the advertiser dashboard.

**Don't start with the admin panel. Don't start with the device map. Start where the money comes from: the advertiser.**

---

## Minute 1 — The Advertiser Experience (0:00–1:00)

**Screen:** Advertiser Dashboard → Campaign Detail page

### What to show:

Open the active campaign view. Point to the verified impression counter.

> "This number — 144,318 — is not an estimate. Every one of these impressions has a GPS coordinate attached to it, a device ID, and a heartbeat confirmation from our backend. When an advertiser buys from us, they're not buying projected reach. They're buying proof."

Point to the live impression feed (if available — updates every 15 minutes):

> "This updates every 15 minutes. If you were [Brand X]'s CMO right now, this is what you'd be looking at. You can see which devices delivered impressions this morning, which ones were offline, and what your running CPM is against your budget."

Click to the verified impressions breakdown:

> "Each line is one verified impression cycle. Device ID. Timestamp. GPS coordinate. Duration. Status: valid, suspicious, or flagged. The flagged ones don't bill. The advertiser only pays for confirmed delivery."

**Time check: 1:00**

---

## Minute 2 — The Verification Engine (1:00–2:00)

**Screen:** Admin Dashboard → Fraud Flag Review OR Sample Impression Report PDF

### Option A: Show the admin fraud panel (if platform is live)

> "Switch to the operator side. This is our admin view — what our team sees every day."

Open the fraud flag queue:

> "These are impressions our system flagged as suspicious. This device here — you can see a cluster of 200 impressions logged in 12 minutes. That's 10× our normal playback rate. Our system auto-flagged it and held those impressions from billing. The advertiser didn't pay for them. We investigated, found a GPS anomaly — the device reported coordinates in the middle of the Lagos Lagoon — and those impressions are permanently invalid."

> "That's the verification moat. When a brand manager sees that we caught fraud and protected their budget, the trust is permanent. No billboard can do that."

### Option B: Show the sample impression report PDF (if platform is in development)

Open the report PDF:

> "This is what we send to an advertiser after a campaign. This is not a deck. This is not a screenshot. Every row is a verified impression. GPS coordinate. Timestamp. Device ID. Heartbeat status. We exported 144,000 rows from our pilot. The advertiser can open this in Excel and verify any impression they want."

> "When we handed this to [Brand X], they asked: 'Can you run this next month?' That's the answer to every question about advertiser demand."

**Time check: 2:00**

---

## Minute 3 — The Physical Proof (2:00–3:00)

**If you have the field video:**

> "Last thing. This is a real device in a real Lagos vehicle."

Play the 30–60 second clip. Show:
1. The tablet mounted in the vehicle (headrest or console)
2. An ad playing full-screen
3. The device ID visible in a corner (or shown separately in the admin panel to prove it matches)

> "That vehicle is in Lagos right now. That device is sending heartbeats to our backend every 60 seconds. The passenger in the back seat sees this ad. The device confirms delivery. The advertiser gets credited one impression. We earn $0.007 per impression at our standard CPM."

> "Multiply that by 1,000 devices running 8 hours a day. That's the business."

**If you don't have the field video yet:**

> "I don't have the field video yet — we haven't started installation. What I can show you is the device screen in kiosk mode."

Show the tablet running the app in a controlled environment:

> "This is the exact hardware, the exact software, that goes into vehicles. Kiosk-locked — the passenger can't exit the app, can't change settings. It auto-launches on boot. The only thing it does is play ads and send verified logs."

> "In 30 days, this device will be in a vehicle. In 60 days, we'll have 50 of them."

**Closing line (always, regardless of which path):**

> "The product works. The advertiser pays. The data is real. The question is how fast we can deploy. That's what the funding solves."

---

## The Verification Moment

The most important moment in the demo is when the investor understands that verification is not a feature — it's the product.

**Watch for this signal:** The investor leans forward, reads a row in the impression log, and asks "wait, this shows exactly where the car was?"

When that happens, stop talking. Let them read.

Then say: "Yes. Every impression."

That's the trust moment. Don't rush past it.

---

## Demo Setup Checklist

Before any investor meeting:

- [ ] Advertiser dashboard loaded with a real (or realistic seeded) campaign
- [ ] Campaign has at least 50,000 verified impressions displayed
- [ ] Fraud flags section has at least 1 example flagged case ready to discuss
- [ ] Sample impression report PDF is ready to share (not open in a tab — downloadable)
- [ ] Field video is queued and ready to play (no loading time in the meeting)
- [ ] Admin device map shows at least 10 devices with green heartbeats
- [ ] Internet connection is stable (have hotspot backup)
- [ ] Browser is in presentation mode (no notifications, no tabs)

**The one thing you cannot fake:** The field video. Get the device in a car before the meeting. A real photo/video of a real tablet in a real Lagos vehicle closes more checks than any slide.

---

## If Things Go Wrong

| Problem | Response |
|---|---|
| Platform is down | "Let me show you the impression report instead — same data, different format." Open the PDF. |
| Investor asks to see something you haven't built | "That's Phase 2. Right now I want to show you what's live." Redirect to what you have. |
| Video won't play | "I'll send this to you after the meeting. Let me describe what you'll see." Give the visual description. |
| Data looks sparse | "We're pre-launch — these are seeded test impressions to validate the system. The verification logic runs identically on real data." |
| Investor tries to click around | Let them. That's engagement. Answer everything they find. |

---

## Versions of the Demo

**10-minute meeting:** Use Minute 1 only. Show the impression report. Ask what questions they have.

**30-minute meeting:** Full 3-minute demo, then Q&A. Save 2 minutes of field video for the end.

**Async (investor asks for demo link):** Record a 5-minute Loom using this exact script. Add your voiceover. Share via Docsend so you can track who watches it.

**Technical investor:** Go deeper on Minute 2 — show the verification SQL schema (or describe it), explain the 8 checks, show the fraud flag taxonomy. They want to know if the verification is real.

**Non-technical investor:** Skip the fraud detail. Stay in Minute 1 — the impression counter and the sample report are enough. The field video closes them.

---

## The Demo is a Sales Tool, Not a Product Tour

You are not showing every feature. You are making one argument:

**"Verification is the product. We have it. They don't."**

Every minute of the demo serves that argument. If a feature doesn't serve it, don't show it.

The demo ends when the investor believes verification exists and works. Not when you've shown every dashboard. Know the difference.
