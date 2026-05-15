export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "in-car-advertising-complete-guide",
    title: "In-Car Advertising: The Complete Guide for Brands",
    description:
      "Everything brands need to know about in-car advertising — how it works, why it outperforms traditional OOH, and how to run a campaign.",
    date: "2026-05-15",
    category: "Advertising",
    readTime: "8 min read",
    excerpt:
      "In-car advertising puts your brand inside moving vehicles — reaching passengers in a captive, high-attention environment. Here's everything you need to know.",
    content: `
<p>In-car advertising is exactly what it sounds like: your brand, inside a vehicle, seen by the passengers riding in it. Not billboards glimpsed at 60mph. Not a banner ad skipped in 0.3 seconds. A screen, at eye level, for the entire duration of a trip.</p>

<p>The average rideshare trip lasts 14 minutes. That's 14 minutes of near-guaranteed attention — no scroll, no skip, no second screen competing for focus. It's one of the last genuinely captive advertising surfaces left.</p>

<h2>Why in-car advertising works</h2>

<p>Most advertising is interruption-based. You're trying to watch something, read something, or get somewhere, and an ad gets in the way. In-car advertising is different because the passenger is already seated with nowhere to be. The environment is closed. The screen is the only thing in front of them.</p>

<p>This produces something rare in modern advertising: sustained, voluntary attention. Passengers look at the screen because it's there, it's content, and the alternative is staring out the window.</p>

<h2>How verified impressions work</h2>

<p>Traditional OOH advertising — billboards, transit panels, bus shelters — estimates viewership using traffic models and panel surveys. Someone counted the cars on that road and multiplied by an assumed percentage who looked at the sign. It's a guess dressed up as data.</p>

<p>In-car advertising with Out Mobility works differently. Every impression is logged when:</p>

<ul>
<li>The in-vehicle screen is powered on and active</li>
<li>A passenger is confirmed in the vehicle via trip telemetry</li>
<li>The ad plays to completion</li>
</ul>

<p>This data comes directly from the device — GPS-stamped, timestamped, tied to a real trip. There's no estimation layer. If the ad played, you get the impression. If it didn't, you don't pay for it.</p>

<h2>Who in-car advertising is for</h2>

<p>The format works best for brands whose customers move through cities — financial services, food delivery, consumer apps, local businesses, and lifestyle brands all see strong performance. The geographic precision of in-car advertising (you can target a specific city radius) makes it especially powerful for market launches and local activations.</p>

<h2>How to run an in-car campaign</h2>

<p>With Out Mobility, a campaign goes live in three steps:</p>

<ol>
<li><strong>Upload your creative.</strong> A short MP4 (up to 60 seconds) or a static image. We review it within 24 hours.</li>
<li><strong>Set your targeting and budget.</strong> Choose a city or draw a radius. Set a budget — any amount, no minimum.</li>
<li><strong>Go live.</strong> Once approved, your ad starts playing across the fleet. Track every impression in real time from your dashboard.</li>
</ol>

<p>No insertion orders. No agency middlemen. No negotiated placements. Just a self-serve dashboard and a verified result.</p>

<h2>The future of in-vehicle advertising</h2>

<p>The global rideshare market is growing. More vehicles, more trips, more passengers. In-car screens are becoming standard fleet hardware — a managed screen in every vehicle, running content for every passenger. The infrastructure is being built now.</p>

<p>Brands that get in early build the first-mover advantage in a channel that will only expand as autonomous vehicles, shared mobility, and urban transport networks grow.</p>
    `.trim(),
  },
  {
    slug: "rideshare-advertising-roi",
    title: "Rideshare Advertising ROI: What Brands Actually Get",
    description:
      "A clear breakdown of what brands can expect from rideshare and in-car advertising — impressions, reach, cost efficiency, and how to measure it.",
    date: "2026-05-12",
    category: "Advertising",
    readTime: "6 min read",
    excerpt:
      "ROI from rideshare advertising is measurable in a way most OOH never is. Here's what the numbers look like and how to read them.",
    content: `
<p>Return on investment in advertising comes down to one question: how much did you pay to reach someone who could actually buy from you? Most advertising channels make this hard to answer. Rideshare advertising makes it surprisingly easy.</p>

<h2>What you're actually paying for</h2>

<p>In-car advertising with Out Mobility is priced per verified impression — each time your ad plays to a passenger in a moving vehicle. Unlike billboard CPMs, which are built on traffic count estimates, in-car CPMs are based on confirmed playback events tied to real trips.</p>

<p>This means your cost per impression is a real number, not a modelled one.</p>

<h2>Reach and frequency</h2>

<p>The Out Mobility network currently runs across 6,000+ active vehicles, reaching 100,000+ daily passengers. A city-level campaign running for one week can generate hundreds of thousands of verified impressions — concentrated in specific geographies and time windows you choose.</p>

<p>Because trips happen at predictable times (commute hours, evening peak, weekend nights), you can reach specific behavioural audiences without any demographic targeting or data collection. The trip pattern is the signal.</p>

<h2>How to calculate your ROI</h2>

<p>Start with three numbers:</p>

<ul>
<li><strong>Campaign cost:</strong> your total spend for the period</li>
<li><strong>Impressions delivered:</strong> verified plays from your dashboard</li>
<li><strong>Conversion rate:</strong> your baseline from other channels, or a tracked landing page specific to the campaign</li>
</ul>

<p>Cost per impression gives you a direct comparison to other CPM-priced channels. For most markets, in-car CPMs sit below premium digital and significantly below premium OOH — with higher attention rates than either.</p>

<h2>What good measurement looks like</h2>

<p>Set up a campaign-specific landing page or promo code before you launch. This gives you a direct attribution path — passengers who convert after seeing your ad can be traced back to the campaign.</p>

<p>Use your Out Mobility dashboard to pull impression data by geography and time period. Cross-reference this with your sales or lead data from the same windows. The overlap is your signal.</p>

<h2>The honest answer</h2>

<p>In-car advertising is high-attention, verified, and increasingly cost-competitive. It won't replace digital performance channels for direct-response at scale — but for brand awareness in a specific city, a market launch, or reaching consumers in a captive moment, the ROI case is strong and the measurement is cleaner than most alternatives.</p>
    `.trim(),
  },
  {
    slug: "ooh-advertising-why-vehicles-beat-billboards",
    title: "Out-of-Home Advertising in 2026: Why Moving Vehicles Beat Static Billboards",
    description:
      "Static OOH is holding up. But in-vehicle advertising is growing faster, measuring better, and delivering attention that billboards can't. Here's why.",
    date: "2026-05-08",
    category: "Industry",
    readTime: "7 min read",
    excerpt:
      "Billboards reach people in transit. In-car advertising reaches people who have already stopped — seated, attentive, and going nowhere for the next 14 minutes.",
    content: `
<p>Out-of-home advertising never went away. While digital cannibalized print, TV, and radio, OOH held its ground — because you can't skip a billboard. But within OOH, something is shifting. Static formats are plateauing. Digital and in-vehicle formats are growing.</p>

<p>The reason is simple: attention.</p>

<h2>The problem with static OOH</h2>

<p>A billboard on a highway reaches thousands of people per day. But a driver doing 70mph gets roughly 1.5 seconds of exposure per pass. Passengers in the back seat might get a few more seconds — if they're looking in the right direction at the right moment. It's interruption without engagement.</p>

<p>OOH planners know this. That's why frequency matters so much in billboard campaigns — you book enough locations across enough roads that your message is seen across multiple exposures. It works, but it's expensive and hard to attribute.</p>

<h2>What changes inside a vehicle</h2>

<p>When you're a passenger in a rideshare, you're in a fundamentally different attentional state. You're not driving. You're not responsible for watching the road. You're seated, probably looking at your phone — or, when a screen is in front of you, looking at that.</p>

<p>The average rideshare trip is 14 minutes. In-car screens positioned on headrests are at eye level and impossible to miss. There's no environmental noise competing for the passenger's attention. The vehicle is a closed, controlled context.</p>

<p>This produces what advertisers call a captive audience — not in the aggressive sense, but in the practical sense. The passenger is there, and so is your ad.</p>

<h2>Measurement: the defining difference</h2>

<p>Static OOH is measured through traffic counts and panel surveys. You pay for a share of everyone who passes a sign. Some of them saw it. Most of them probably didn't.</p>

<p>In-car advertising with Out Mobility is measured differently. Every impression is a confirmed event: the screen was on, a passenger was in the vehicle, and the ad played. The data comes from device telemetry, not estimates.</p>

<p>This matters for budget allocation. Brands increasingly want channels they can measure. OOH has historically struggled here. In-vehicle advertising solves it.</p>

<h2>Where in-car fits in the mix</h2>

<p>In-car advertising isn't replacing billboards. It's complementing them. Use billboards for ambient reach across a wide geographic area. Use in-vehicle screens for high-attention, verified delivery in specific cities and corridors.</p>

<p>Together, they produce the OOH stack: broad reach for awareness, targeted in-vehicle delivery for depth. The channels reinforce each other without cannibalising budget.</p>
    `.trim(),
  },
  {
    slug: "how-to-advertise-inside-rideshare-vehicles",
    title: "How to Advertise Inside Rideshare Vehicles (The Practical Guide)",
    description:
      "Step-by-step guide to running your first in-car advertising campaign — creative specs, targeting, budgeting, and what to expect.",
    date: "2026-05-05",
    category: "How-to",
    readTime: "5 min read",
    excerpt:
      "Running an in-car ad campaign is simpler than you think. Here's the practical playbook — specs, setup, and what good results look like.",
    content: `
<p>Advertising inside rideshare vehicles used to require relationships with media agencies, negotiated placements, and paper insertion orders. That model still exists for large enterprise buys — but it's no longer the only way in.</p>

<p>With Out Mobility, you can launch a campaign from a dashboard in under 3 minutes. Here's how.</p>

<h2>Step 1: Get your creative ready</h2>

<p>In-car screens are horizontal displays positioned on vehicle headrests. Your creative should be designed for this format:</p>

<ul>
<li><strong>Video:</strong> MP4 format, up to 60 seconds, 1920×1080 or 1280×720 recommended</li>
<li><strong>Image:</strong> JPG or PNG, same resolution targets</li>
<li><strong>Keep it simple:</strong> passengers are in a moving vehicle — bold text, clear message, single call to action</li>
</ul>

<p>Don't try to tell the whole brand story in one ad. Pick one message. A promo code, a product benefit, a brand moment. Simple creative consistently outperforms complex creative in captive environments.</p>

<h2>Step 2: Set your targeting</h2>

<p>Choose a city or draw a custom radius on the map. The platform shows you how many active vehicles are within your selected area. This gives you an impression range before you commit any budget.</p>

<p>Time-based targeting is coming — for now, campaigns run across all active hours within your selected area.</p>

<h2>Step 3: Set a budget</h2>

<p>There's no minimum spend. Set a daily or total campaign budget. The system serves your ad until the budget is exhausted, then pauses automatically. You can top up, extend, or adjust at any time.</p>

<h2>Step 4: Submit for review</h2>

<p>All creatives are reviewed within 24 hours. We check for policy compliance and technical quality. If anything needs adjusting, we'll tell you specifically what to change. Once approved, your campaign goes live automatically.</p>

<h2>What to track</h2>

<p>Your dashboard shows impressions in real time — how many times your ad has played, in which areas, across how many vehicles. Watch for:</p>

<ul>
<li><strong>Total impressions:</strong> your headline delivery number</li>
<li><strong>Pacing:</strong> is the campaign spending evenly, or are there gaps?</li>
<li><strong>Geographic spread:</strong> which areas are delivering and which aren't</li>
</ul>

<p>Set up a campaign-specific URL or promo code before launch so you can track what comes in from this channel specifically.</p>

<h2>What results look like</h2>

<p>A city-level campaign with a modest budget running for one week should deliver tens of thousands of verified impressions. Brand lift — increased search volume, direct website visits, promo redemptions — typically follows 2–4 weeks into a sustained campaign. One-week tests give you delivery data but are too short for meaningful brand effect measurement.</p>
    `.trim(),
  },
  {
    slug: "vehicle-advertising-earn-money-drivers",
    title: "Vehicle Advertising: How Drivers Earn More Without Doing More",
    description:
      "How rideshare and fleet drivers earn additional income through in-car advertising — without changing how they drive or how they work.",
    date: "2026-05-01",
    category: "Fleet",
    readTime: "5 min read",
    excerpt:
      "A tablet in your vehicle, serving ads to passengers. You drive the same routes, the same hours — and earn more per trip. Here's how it works.",
    content: `
<p>Rideshare income is variable. Earnings per trip depend on surge pricing, route length, time of day, and platform algorithms that change without warning. Drivers are always looking for ways to make earnings more predictable.</p>

<p>In-car advertising is one answer. Not a replacement for fare income — an addition to it.</p>

<h2>What it actually involves</h2>

<p>Joining the Out Mobility fleet means one thing: getting a tablet installed on your rear headrest. That's it. Once it's in, the device runs automatically. You drive your normal routes, pick up your normal passengers, and the screen serves ads based on live trip data.</p>

<p>You don't manage the content. You don't interact with the device. You don't change anything about how you work.</p>

<h2>How earnings are calculated</h2>

<p>You earn a share of the ad revenue generated during your trips. Revenue is calculated per impression — each time an ad plays to a passenger in your vehicle. The more you drive, the more impressions your vehicle generates, the more you earn.</p>

<p>Earnings are tracked in real time and paid out monthly. You can see your total impressions and estimated earnings in your driver portal at any time.</p>

<h2>What passengers think</h2>

<p>Most passengers don't mind. The screen is positioned on the headrest in front of them — it's ambient content, not an intrusion. We don't serve loud audio ads by default. Content is managed to be appropriate for mixed audiences.</p>

<p>Drivers occasionally get questions from curious passengers. The honest answer: it's a managed advertising system, you earn from it, and it doesn't affect the ride in any way.</p>

<h2>What vehicles qualify</h2>

<p>We work with ride-hail vehicles, licensed taxis, and private hire vehicles. The vehicle needs to be no older than 8 years and actively operating in one of our covered areas. The tablet is provided and installed by us — no cost to the driver.</p>

<h2>How to apply</h2>

<p>Applications take under 5 minutes. You'll provide your vehicle details, operating area, and contact information. We review applications within 48 hours and follow up with next steps for installation scheduling.</p>

<p>There's no long-term commitment required. You can exit the programme with 30 days notice and we'll arrange tablet collection.</p>
    `.trim(),
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
