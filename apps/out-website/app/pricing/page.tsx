import type { Metadata } from "next";
import CTAButton from "@/components/ui/CTAButton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "In-Car Advertising Pricing — Out Mobility",
  description:
    "Simple, transparent pricing for in-car advertising. No setup fees, no minimum spend, no middlemen. Pay per verified impression.",
  openGraph: {
    title: "In-Car Advertising Pricing — Out Mobility",
    description:
      "Pay per verified impression. No setup fees. No minimum spend. Campaigns start in 3 minutes.",
    images: [{ url: "/og-image.png", width: 3600, height: 1890 }],
  },
};

const tiers = [
  {
    name: "Launch",
    tagline: "For brands getting started",
    cpm: "Self-serve",
    description: "Run your own campaigns through the dashboard. Upload creative, set budget, go live.",
    features: [
      "Full dashboard access",
      "City or radius targeting",
      "Real-time impression tracking",
      "MP4 video and image formats",
      "24hr creative review",
      "No minimum commitment",
    ],
    cta: "Get early access",
    highlight: false,
  },
  {
    name: "Scale",
    tagline: "For brands with serious reach goals",
    cpm: "Managed",
    description: "Dedicated account support, priority placement, and campaign strategy included.",
    features: [
      "Everything in Launch",
      "Dedicated account manager",
      "Priority ad placement",
      "Creative guidance",
      "Weekly performance reports",
      "Multi-city campaigns",
    ],
    cta: "Talk to us",
    highlight: true,
  },
];

const faqs = [
  {
    q: "How is pricing calculated?",
    a: "We charge per verified impression — each time your ad plays to a passenger in a moving vehicle. The exact CPM depends on your target market and campaign volume.",
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fees, ever. You pay only for impressions served.",
  },
  {
    q: "What's the minimum budget?",
    a: "There's no minimum spend. Start with whatever budget works for you and scale up as you see results.",
  },
  {
    q: "How do I know impressions are real?",
    a: "Every impression is tied to trip telemetry — GPS location, device ID, and timestamp. We don't estimate or project. If it didn't happen, you don't pay for it.",
  },
  {
    q: "Can I pause or cancel anytime?",
    a: "Yes. Pause or cancel at any time from your dashboard. You're only charged for impressions already served.",
  },
];

export default function PricingPage() {
  return (
      <>
      <Header />
      <main>

        {/* Hero */}
        <section className="bg-white px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto text-center max-w-[720px] mx-auto">
            <h1
              className="font-black uppercase text-[#003a50] leading-[0.92] mb-6"
              style={{
                fontFamily: "var(--font-mona-sans)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Simple pricing.<br />
              <span className="text-[#00aeef]">No surprises.</span>
            </h1>
            <p className="text-[16px] md:text-[20px] text-[#003a50]/65 leading-[1.6]"
              style={{ fontFamily: "var(--font-instrument-sans)" }}>
              Pay per verified impression. No setup fees. No minimum spend. No middlemen.
            </p>
          </div>
        </section>

        {/* Tiers */}
        <section className="bg-[#f9fafb] px-4 py-12 md:px-8 xl:px-20 pb-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-3xl p-8 md:p-10 flex flex-col gap-6 ${
                    tier.highlight
                      ? "bg-[#003a50] text-white"
                      : "bg-white text-[#003a50]"
                  }`}
                >
                  <div>
                    <p className={`text-[12px] font-semibold uppercase tracking-widest mb-2 ${
                      tier.highlight ? "text-[#00aeef]" : "text-[#00aeef]"
                    }`} style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      {tier.tagline}
                    </p>
                    <h2
                      className="font-black mb-1"
                      style={{
                        fontFamily: "var(--font-mona-sans)",
                        fontSize: "2rem",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {tier.name}
                    </h2>
                    <p className={`text-[14px] leading-[1.6] ${
                      tier.highlight ? "text-white/60" : "text-[#003a50]/60"
                    }`} style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      {tier.description}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-3 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          tier.highlight ? "bg-[#00aeef]" : "bg-[#f6fcff] border border-[#00aeef]/30"
                        }`}>
                          <svg width="8" height="8" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                            <path d="M1 5l3.5 3.5L11 1" stroke={tier.highlight ? "white" : "#00aeef"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className={`text-[14px] ${
                          tier.highlight ? "text-white/80" : "text-[#003a50]/75"
                        }`} style={{ fontFamily: "var(--font-instrument-sans)" }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <CTAButton className={`w-full text-[15px] py-4 ${
                    tier.highlight ? "!bg-[#00aeef] !text-white" : ""
                  }`}>
                    {tier.cta.toUpperCase()}
                  </CTAButton>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-[720px]">
              <h2
                className="text-[#003a50] mb-10"
                style={{
                  fontFamily: "var(--font-cal-sans)",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Pricing questions.
              </h2>
              <div className="flex flex-col gap-6">
                {faqs.map((item) => (
                  <div key={item.q} className="border-b border-[#003a50]/10 pb-6 last:border-0">
                    <h3
                      className="text-[#003a50] font-semibold mb-2"
                      style={{ fontFamily: "var(--font-instrument-sans)", fontSize: "15px" }}
                    >
                      {item.q}
                    </h3>
                    <p className="text-[14px] text-[#003a50]/65 leading-[1.65]"
                      style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      </>
  );
}
