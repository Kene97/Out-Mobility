import type { Metadata } from "next";
import CTAButton from "@/components/ui/CTAButton";
import { WaitlistProvider } from "@/context/WaitlistContext";
import WaitlistModal from "@/components/ui/WaitlistModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/how-it-works" },
  title: "How In-Car Advertising Works — Out Mobility",
  description:
    "See exactly how Out Mobility delivers verified in-car advertising — from campaign setup to real-time impression tracking across 6,000+ vehicles.",
  openGraph: {
    title: "How In-Car Advertising Works — Out Mobility",
    description:
      "From campaign setup to verified impressions. See how Out-door works for advertisers and fleet operators.",
    images: [{ url: "/og-image.png", width: 3600, height: 1890 }],
  },
};

const advertiserSteps = [
  {
    n: "01",
    title: "Create your campaign",
    body: "Name your campaign, set a start date, end date, and total budget. No forms to fax. No insertion orders. Just a dashboard.",
  },
  {
    n: "02",
    title: "Upload your creative",
    body: "Drop in an MP4 (up to 60 seconds) or a static image. We review it within 24 hours. If anything needs adjusting, we'll tell you exactly what.",
  },
  {
    n: "03",
    title: "Pick your target area",
    body: "Select a city or draw a custom radius on the map. We show you the exact number of active vehicles in range before you commit.",
  },
  {
    n: "04",
    title: "Go live and track in real time",
    body: "Once approved, your ad plays across in-vehicle screens automatically. Every impression is logged in real time — GPS-verified, timestamped, device-confirmed.",
  },
];

const fleetSteps = [
  {
    n: "01",
    title: "Apply online",
    body: "Fill out a short form with your vehicle type and area. We review applications within 48 hours.",
  },
  {
    n: "02",
    title: "Get the device installed",
    body: "We install an Android tablet on your rear headrest at a location near you. Takes under an hour.",
  },
  {
    n: "03",
    title: "Drive normally",
    body: "The device activates automatically when a trip starts and serves ads based on live trip data. Nothing changes about how you drive.",
  },
  {
    n: "04",
    title: "Earnings tracked and paid",
    body: "Every impression earns you a share of the ad revenue. Tracked automatically, paid monthly.",
  },
];

const techPoints = [
  {
    title: "Trip telemetry",
    body: "The in-vehicle device communicates with our platform via mobile data, sharing trip start/end, GPS coordinates, and screen-active status.",
  },
  {
    title: "Verified impressions",
    body: "An impression is only logged when: the screen is powered on, a passenger is confirmed in the vehicle, and the ad plays to completion.",
  },
  {
    title: "Live dashboard",
    body: "Advertisers see impression counts, geographic spread, and campaign pacing update in real time — not in a delayed report.",
  },
  {
    title: "No third-party estimates",
    body: "Our data comes directly from the device, not from panel surveys or traffic model projections. What you see is what happened.",
  },
];

function StepGrid({ steps }: { steps: typeof advertiserSteps }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {steps.map((s) => (
        <div key={s.n} className="bg-[#f9fafb] rounded-2xl p-8 relative overflow-hidden">
          <span
            className="absolute top-2 right-3 font-black text-[#003a50]/5 select-none pointer-events-none"
            style={{ fontFamily: "var(--font-mona-sans)", fontSize: "7rem", lineHeight: 1 }}
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
  );
}

export default function HowItWorksPage() {
  return (
    <WaitlistProvider>
      <Header />
      <main>

        {/* Hero */}
        <section className="bg-white px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto max-w-[720px]">
            <h1
              className="font-black uppercase text-[#003a50] leading-[0.92] mb-6"
              style={{
                fontFamily: "var(--font-mona-sans)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              How it works.
            </h1>
            <p className="text-[16px] md:text-[20px] text-[#003a50]/65 leading-[1.6]"
              style={{ fontFamily: "var(--font-instrument-sans)" }}>
              In-car advertising that works simply — for the brand running the campaign and the driver carrying the screen.
            </p>
          </div>
        </section>

        {/* For advertisers */}
        <section className="bg-[#f9fafb] px-4 py-16 md:px-8 md:py-20 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <p className="text-[12px] font-semibold text-[#00aeef] uppercase tracking-widest mb-3"
              style={{ fontFamily: "var(--font-instrument-sans)" }}>
              For advertisers
            </p>
            <h2
              className="text-[#003a50] mb-10"
              style={{
                fontFamily: "var(--font-cal-sans)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Launch a campaign in 3 minutes.
            </h2>
            <StepGrid steps={advertiserSteps} />
            <div className="mt-8">
              <CTAButton className="text-[15px] py-4 px-8">
                LAUNCH YOUR CAMPAIGN
              </CTAButton>
            </div>
          </div>
        </section>

        {/* For fleet */}
        <section className="bg-white px-4 py-16 md:px-8 md:py-20 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <p className="text-[12px] font-semibold text-[#00aeef] uppercase tracking-widest mb-3"
              style={{ fontFamily: "var(--font-instrument-sans)" }}>
              For drivers & fleet operators
            </p>
            <h2
              className="text-[#003a50] mb-10"
              style={{
                fontFamily: "var(--font-cal-sans)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Install, drive, earn.
            </h2>
            <StepGrid steps={fleetSteps} />
            <div className="mt-8">
              <CTAButton className="text-[15px] py-4 px-8">
                JOIN THE FLEET
              </CTAButton>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="bg-[#003a50] px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <p className="text-[12px] font-semibold text-[#00aeef] uppercase tracking-widest mb-3"
              style={{ fontFamily: "var(--font-instrument-sans)" }}>
              The infrastructure
            </p>
            <h2
              className="text-white mb-10"
              style={{
                fontFamily: "var(--font-cal-sans)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Every impression, proven.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techPoints.map((p) => (
                <div key={p.title} className="border border-white/10 rounded-2xl p-8">
                  <h3
                    className="text-white font-semibold mb-3"
                    style={{ fontFamily: "var(--font-cal-sans)", fontSize: "1.125rem" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-[14px] text-white/55 leading-[1.65]"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WaitlistModal />
    </WaitlistProvider>
  );
}
