import type { Metadata } from "next";
import CTAButton from "@/components/ui/CTAButton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/advertise" },
  title: "In-Car Advertising Platform — Out Mobility",
  description:
    "Reach 100,000+ daily passengers with verified in-car ads across 6,000+ ride-hail and fleet vehicles. Campaigns live in 3 minutes. Real impressions, not estimates.",
  openGraph: {
    title: "In-Car Advertising Platform — Out Mobility",
    description:
      "Reach 100,000+ daily passengers with verified in-car ads. Campaigns live in 3 minutes.",
    images: [{ url: "/og-image.png", width: 3600, height: 1890 }],
  },
};

const stats = [
  { value: "6,000+",   label: "Active vehicles" },
  { value: "100K+",    label: "Daily passengers" },
  { value: "1M+",      label: "Monthly impressions" },
  { value: "3 min",    label: "Campaign launch time" },
];

const reasons = [
  {
    title: "Captive audience",
    body: "Passengers are seated, screens are at eye level, and there's nowhere else to look. Average trip duration is 14 minutes — that's 14 minutes of verified attention.",
  },
  {
    title: "Verified impressions",
    body: "Every impression is tied to trip telemetry — GPS, timestamp, and device data. No panel estimates. No assumed viewability. Real proof of delivery.",
  },
  {
    title: "Real-time tracking",
    body: "Your dashboard updates live as campaigns run. See impressions, reach, and geographic distribution as they happen, not in a weekly report.",
  },
  {
    title: "3-minute launch",
    body: "Upload your creative, set a budget, pick a city, and go live. No insertion orders, no agency middlemen, no minimum spends.",
  },
];

const faqs = [
  {
    q: "What ad formats do you support?",
    a: "Short-form video (MP4, up to 60 seconds) and static images. All creatives are reviewed within 24 hours before going live.",
  },
  {
    q: "How is viewability measured?",
    a: "Impressions are logged when a screen is active and a passenger is in the vehicle, verified through trip telemetry from the fleet device.",
  },
  {
    q: "Is there a minimum spend?",
    a: "No. Set a budget that works for you. We don't require minimum commitments or long-term contracts.",
  },
  {
    q: "Which cities are you live in?",
    a: "We're currently rolling out across major cities. Join the waitlist to get early access when we launch in your target market.",
  },
  {
    q: "Can I target specific areas within a city?",
    a: "Yes. You can target a full city or draw a custom radius. The platform shows you how many vehicles are in range before you commit.",
  },
];

export default function AdvertisePage() {
  return (
      <>
      <Header />
      <main>

        {/* Hero */}
        <section className="bg-white px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-[800px]">
              <p className="text-[13px] font-semibold text-[#00aeef] uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-instrument-sans)" }}>
                For advertisers
              </p>
              <h1
                className="font-black uppercase text-[#003a50] leading-[0.92] mb-6"
                style={{
                  fontFamily: "var(--font-mona-sans)",
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Put your brand inside<br />
                <span className="text-[#00aeef]">6,000+ moving vehicles.</span>
              </h1>
              <p className="text-[16px] md:text-[20px] text-[#003a50]/70 leading-[1.6] mb-8 max-w-[560px]"
                style={{ fontFamily: "var(--font-instrument-sans)" }}>
                Reach passengers where they are — seated, attentive, and going somewhere. Every impression verified. No estimates.
              </p>
              <CTAButton className="text-[16px] md:text-[20px] py-5 md:py-6 px-10">
                LAUNCH YOUR CAMPAIGN
              </CTAButton>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#f6fcff] px-4 py-12 md:px-8 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-6 md:p-8">
                  <p
                    className="font-black text-[#00aeef] leading-none mb-1"
                    style={{
                      fontFamily: "var(--font-mona-sans)",
                      fontSize: "clamp(1.75rem, 4vw, 3rem)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[13px] text-[#003a50]/60 font-medium"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why it works */}
        <section className="bg-white px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <h2
              className="text-[#003a50] mb-12"
              style={{
                fontFamily: "var(--font-cal-sans)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Why in-car advertising works.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reasons.map((r) => (
                <div key={r.title} className="bg-[#f9fafb] rounded-2xl p-8">
                  <h3
                    className="text-[#003a50] font-semibold mb-3"
                    style={{
                      fontFamily: "var(--font-cal-sans)",
                      fontSize: "1.125rem",
                    }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#003a50]/70 leading-[1.65]"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {r.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#f9fafb] px-4 py-16 md:px-8 md:py-24 xl:px-20">
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
                Common questions.
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

        {/* CTA banner */}
        <section className="bg-[#003a50] px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto text-center">
            <h2
              className="text-white font-black uppercase mb-4"
              style={{
                fontFamily: "var(--font-mona-sans)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Ready to get visible?
            </h2>
            <p className="text-white/60 text-[16px] mb-8"
              style={{ fontFamily: "var(--font-instrument-sans)" }}>
              Join the waitlist and launch your first campaign the day we go live in your city.
            </p>
            <CTAButton className="text-[16px] py-5 px-10">
              GET EARLY ACCESS
            </CTAButton>
          </div>
        </section>

      </main>
      <Footer />
      </>
  );
}
