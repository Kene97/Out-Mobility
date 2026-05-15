import type { Metadata } from "next";
import CTAButton from "@/components/ui/CTAButton";
import { WaitlistProvider } from "@/context/WaitlistContext";
import WaitlistModal from "@/components/ui/WaitlistModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/fleet" },
  title: "Earn More From Every Trip — Out Mobility Fleet",
  description:
    "Join the Out Mobility fleet. Get a tablet installed in your vehicle, serve ads to passengers, and earn on top of every trip — no effort required.",
  openGraph: {
    title: "Earn More From Every Trip — Out Mobility Fleet",
    description:
      "Install. Drive. Earn. Join 6,000+ vehicles already running Out-door in-car advertising.",
    images: [{ url: "/og-image.png", width: 3600, height: 1890 }],
  },
};

const steps = [
  {
    n: "01",
    title: "Apply in minutes",
    body: "Fill out a short form with your vehicle details and coverage area. We review applications within 48 hours.",
  },
  {
    n: "02",
    title: "Get the tablet installed",
    body: "We handle installation at a location near you. The tablet mounts securely on the headrest — passengers can see it, nothing blocks your view.",
  },
  {
    n: "03",
    title: "Drive normally",
    body: "The device serves ads automatically based on live trip data. No action needed from you. Just drive.",
  },
  {
    n: "04",
    title: "Get paid",
    body: "Earnings are tracked per impression and paid out monthly. The more you drive, the more you earn.",
  },
];

const requirements = [
  "Ride-hail, fleet, or taxi vehicle",
  "Vehicle no older than 8 years",
  "Active within our coverage areas",
  "Clean driving record",
  "Android device compatibility (tablet provided by us)",
];

const faqs = [
  {
    q: "Do I have to do anything to run the ads?",
    a: "Nothing. The tablet runs automatically from the moment you start a trip. Ads are served and tracked without any input from you.",
  },
  {
    q: "Does it affect my passengers?",
    a: "The screen is mounted on the headrest facing rear passengers. It doesn't obstruct your view and passengers can choose to ignore it.",
  },
  {
    q: "Who owns the tablet?",
    a: "Out Mobility. We install it, maintain it, and handle any technical issues. You just drive.",
  },
  {
    q: "How much can I earn?",
    a: "Earnings vary by market, trip volume, and active hours. We'll share projected earnings for your area when you apply.",
  },
  {
    q: "Can I remove it?",
    a: "Yes. You can exit the programme with 30 days notice and we'll arrange tablet collection.",
  },
];

export default function FleetPage() {
  return (
    <WaitlistProvider>
      <Header />
      <main>

        {/* Hero */}
        <section className="bg-[#003a50] px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-[720px]">
              <p className="text-[13px] font-semibold text-[#00aeef] uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-instrument-sans)" }}>
                For drivers & fleet operators
              </p>
              <h1
                className="font-black uppercase text-white leading-[0.92] mb-6"
                style={{
                  fontFamily: "var(--font-mona-sans)",
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Earn more from<br />
                <span className="text-[#00aeef]">every trip.</span>
              </h1>
              <p className="text-[16px] md:text-[20px] text-white/60 leading-[1.6] mb-8 max-w-[540px]"
                style={{ fontFamily: "var(--font-instrument-sans)" }}>
                Install a tablet. Drive as normal. Earn on top of every fare — automatically.
              </p>
              <CTAButton className="text-[16px] md:text-[20px] py-5 md:py-6 px-10">
                JOIN THE FLEET
              </CTAButton>
            </div>
          </div>
        </section>

        {/* How it works */}
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
              How it works.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((s) => (
                <div key={s.n} className="bg-[#f9fafb] rounded-2xl p-8 relative overflow-hidden">
                  <span
                    className="absolute top-2 right-4 font-black text-[#003a50]/5 select-none pointer-events-none"
                    style={{
                      fontFamily: "var(--font-mona-sans)",
                      fontSize: "7rem",
                      lineHeight: 1,
                    }}
                  >
                    {s.n}
                  </span>
                  <h3
                    className="text-[#003a50] font-semibold mb-3 relative z-10"
                    style={{ fontFamily: "var(--font-cal-sans)", fontSize: "1.125rem" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-[#003a50]/65 leading-[1.65] relative z-10"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="bg-[#f6fcff] px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-[600px]">
              <h2
                className="text-[#003a50] mb-8"
                style={{
                  fontFamily: "var(--font-cal-sans)",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                What you need to join.
              </h2>
              <ul className="flex flex-col gap-3">
                {requirements.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-[#00aeef] flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                        <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-[15px] text-[#003a50]/80"
                      style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
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
                Driver questions.
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

        {/* CTA */}
        <section className="bg-[#00aeef] px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto text-center">
            <h2
              className="text-white font-black uppercase mb-4"
              style={{
                fontFamily: "var(--font-mona-sans)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Start earning today.
            </h2>
            <p className="text-white/75 text-[16px] mb-8"
              style={{ fontFamily: "var(--font-instrument-sans)" }}>
              Join the waitlist and be first in line when we launch in your city.
            </p>
            <CTAButton className="text-[16px] py-5 px-10 !bg-[#003a50] !text-white hover:!bg-white hover:!text-[#003a50]">
              APPLY TO JOIN
            </CTAButton>
          </div>
        </section>

      </main>
      <Footer />
      <WaitlistModal />
    </WaitlistProvider>
  );
}
