import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Out Mobility — Powering the Future of Transportation",
  description:
    "Out Mobility builds and operates the systems that make electric mobility practical, scalable, and economically viable — reducing transport emissions while supporting growth across cities.",
  openGraph: {
    title: "About Out Mobility — Powering the Future of Transportation",
    description:
      "Clean mobility. Zero footprint. Out Mobility builds verified mobility infrastructure for a sustainable future.",
    images: [{ url: "/og-image.png", width: 3600, height: 1890 }],
  },
};

const partners = [
  { src: "/images/about/partner-1.png", alt: "Partner", h: 39, w: 53 },
  { src: "/images/about/partner-2.png", alt: "Solana", h: 22, w: 150 },
  { src: "/images/about/partner-3.png", alt: "Cardano Foundation", h: 38, w: 137 },
  { src: "/images/about/partner-4.png", alt: "DeCharge", h: 37, w: 138 },
  { src: "/images/about/partner-5.png", alt: "Ethereum Foundation", h: 40, w: 96 },
];

const pillars = [
  {
    n: "01",
    title: "Multi-Vertical Mobility Ecosystem",
    body: "Ride-hailing, logistics, and EV services combined for efficiency.",
  },
  {
    n: "02",
    title: "100% Zero-Emission Urban Operations",
    body: "Electric vehicles power urban mobility, cutting emissions.",
  },
  {
    n: "03",
    title: "Live Pilots & Active Deployments",
    body: "Out runs demos and fleet tests on real routes.",
  },
  {
    n: "04",
    title: "Carbon-Market Ready Infrastructure",
    body: "Our systems track emissions, enabling carbon credit participation.",
  },
];

const tokenFeatures = [
  {
    tag: "Flexible",
    body: "Pay for rides, split fares, or cash out — $OUTSIDE is your key to seamless, borderless mobility.",
  },
  {
    tag: "Credible",
    body: "Every kilometer you ride mines $OUTSIDE. Daily commute? That's a crypto pay-check.",
  },
  {
    tag: "Real World Asset",
    body: "Powered by Global Carbon finance for Real World Utility.",
  },
  {
    tag: "Rewarding",
    body: "Hodl, send, or convert tokens instantly. Your keys, your crypto, no middlemen.",
  },
];

const sdgIcons = [
  "/images/about/sdg-1.png",
  "/images/about/sdg-2.png",
  "/images/about/sdg-3.png",
  "/images/about/sdg-4.png",
];

function GridPattern({ light = false }: { light?: boolean }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id={light ? "grid-light" : "grid-dark"} width="65" height="65" patternUnits="userSpaceOnUse">
          <path d="M 65 0 L 0 0 0 65" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${light ? "grid-light" : "grid-dark"})`} />
    </svg>
  );
}

export default function AboutPage() {
  return (
      <>
      <Header />
      <main>

        {/* Hero */}
        <section className="bg-white px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">
              <div className="lg:w-[510px] lg:flex-shrink-0">
                <h1
                  className="font-black uppercase leading-[0.92]"
                  style={{
                    fontFamily: "var(--font-mona-sans)",
                    fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                    letterSpacing: "-0.03em",
                    color: "#396e1e",
                  }}
                >
                  POWERING THE FUTURE OF TRANSPORTATION
                </h1>
              </div>
              <div className="flex flex-col gap-4 lg:w-[600px]">
                <h2
                  style={{
                    fontFamily: "var(--font-cal-sans)",
                    fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                    color: "#396e1e",
                  }}
                >
                  Clean Mobility, Zero footprint.
                </h2>
                <p
                  className="text-[16px] md:text-[18px] leading-[1.65]"
                  style={{ fontFamily: "var(--font-instrument-sans)", color: "#396e1e" }}
                >
                  Out Mobility builds and operates the systems that make electric mobility practical, scalable, and economically viable. Through our portfolio of mobility services and infrastructure platforms, we are reducing transport emissions while supporting growth across cities and communities.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-6 rounded-2xl text-white font-black uppercase text-[18px] mt-2 w-fit"
                  style={{
                    backgroundColor: "#396e1e",
                    fontFamily: "var(--font-mona-sans)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  CONTACT US
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Partner logos */}
        <section className="bg-[#f6f6f6] px-4 py-6 md:px-8 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-6 md:gap-10">
              {partners.map((p) => (
                <img
                  key={p.alt}
                  src={p.src}
                  alt={p.alt}
                  className="object-contain opacity-80"
                  style={{ height: p.h, width: "auto", maxWidth: p.w * 1.5 }}
                />
              ))}
              <div className="flex items-center gap-2">
                <span
                  className="font-black text-[12px] text-black"
                  style={{ fontFamily: "var(--font-mona-sans)" }}
                >
                  BEP20
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 pillars + image */}
        <section className="bg-white px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
              <div className="flex flex-col gap-10 lg:w-[557px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {pillars.map((p) => (
                    <div key={p.n} className="flex flex-col gap-3">
                      <p
                        className="font-semibold text-[36px] leading-[44px] tracking-[-0.02em]"
                        style={{ fontFamily: "var(--font-instrument-sans)", color: "#7aee41" }}
                      >
                        {p.n}
                      </p>
                      <div className="flex flex-col gap-2" style={{ color: "#396e1e" }}>
                        <p className="text-[16px] font-semibold leading-[24px]"
                          style={{ fontFamily: "var(--font-instrument-sans)" }}>
                          {p.title}
                        </p>
                        <p className="text-[14px] font-normal leading-[20px]"
                          style={{ fontFamily: "var(--font-instrument-sans)" }}>
                          {p.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-[600px] h-[300px] md:h-[446px] rounded-3xl overflow-hidden relative flex-shrink-0">
                <img
                  src="/images/about/hero.jpg"
                  alt="Out Mobility electric vehicle fleet"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="bg-white px-4 pb-8 md:px-8 md:pb-10 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div
              className="relative rounded-[40px] overflow-hidden p-10 md:p-20"
              style={{ backgroundColor: "#396e1e" }}
            >
              <div className="absolute inset-0 bg-black mix-blend-plus-lighter opacity-50 pointer-events-none" />
              <GridPattern />
              <div className="relative z-10 flex flex-col gap-2">
                <p
                  className="font-black uppercase text-white leading-[1.14]"
                  style={{
                    fontFamily: "var(--font-mona-sans)",
                    fontSize: "clamp(1.75rem, 4vw, 4.5rem)",
                    letterSpacing: "-0.02em",
                    maxWidth: 986,
                  }}
                >
                  TO CUT TRANSPORTATION CARBON EMISSIONS IN OUR OPERATIONAL AREAS BY 20% IN 10 YEARS
                </p>
                <p
                  className="text-[24px]"
                  style={{ fontFamily: "var(--font-cal-sans)", color: "#284818" }}
                >
                  _Vision
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-white px-4 pb-16 md:px-8 md:pb-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div
              className="relative rounded-[40px] overflow-hidden p-10 md:p-20"
              style={{ backgroundColor: "#396e1e" }}
            >
              <div className="absolute inset-0 bg-black mix-blend-plus-lighter opacity-50 pointer-events-none" />
              <GridPattern />
              <div className="relative z-10 flex flex-col gap-2">
                <p
                  className="font-black uppercase text-white leading-[1.14]"
                  style={{
                    fontFamily: "var(--font-mona-sans)",
                    fontSize: "clamp(1.75rem, 4vw, 4.5rem)",
                    letterSpacing: "-0.02em",
                    maxWidth: 986,
                  }}
                >
                  TO MAKE GREEN LOGISTICS ACCESSIBLE TO ALL BY ESTABLISHING A CLOSED-LOOP SYSTEM WHERE SAFE, AFFORDABLE, AND ZERO-EMISSION PRACTICES ARE THE NORM.
                </p>
                <p
                  className="text-[24px]"
                  style={{ fontFamily: "var(--font-cal-sans)", color: "#284818" }}
                >
                  _Mission
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Driving impact */}
        <section className="bg-white px-4 py-8 md:px-8 md:py-16 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
              {/* Left */}
              <div className="flex flex-col gap-8 lg:w-[526px]">
                <div className="flex flex-col gap-6" style={{ color: "#396e1e" }}>
                  <h2
                    className="font-black uppercase leading-[1.1]"
                    style={{
                      fontFamily: "var(--font-mona-sans)",
                      fontSize: "clamp(2rem, 4vw, 4.5rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Driving Impact Beyond Transportation.
                  </h2>
                  <p className="text-[16px] leading-[24px]"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    At OUT, we believe that digital transformation should empower both people and the planet. We align our core operations with the United Nations Sustainable Development Goals to ensure our growth is inclusive and responsible.
                  </p>
                </div>
                {/* SDG icons */}
                <div className="flex items-center justify-between gap-3">
                  {sdgIcons.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`SDG Goal ${i + 1}`}
                      className="w-[22%] rounded-lg object-cover"
                    />
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col gap-4 lg:w-[646px]">
                {/* Metric card */}
                <div className="bg-white border border-[#eaecf0] rounded-xl px-6 py-4 flex items-center justify-between">
                  <div style={{ color: "#396e1e" }}>
                    <p className="text-[24px] font-bold leading-[32px]"
                      style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      20%
                    </p>
                    <p className="text-[14px] font-medium leading-[20px]"
                      style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      Emissions Reduction by 2035
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <img src="/images/about/impact-1.png" alt="Team" className="w-[80px] h-[80px] rounded-lg object-cover" />
                    <img src="/images/about/impact-2.png" alt="Team" className="w-[80px] h-[80px] rounded-lg object-cover" />
                  </div>
                </div>
                {/* Large image */}
                <div className="h-[300px] md:h-[391px] rounded-2xl overflow-hidden">
                  <img
                    src="/images/about/impact-main.jpg"
                    alt="Out Mobility impact"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Token section */}
        <section className="bg-[#f6f6f6] px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left: ticker card */}
              <div
                className="relative rounded-[40px] overflow-hidden p-10 lg:p-12 flex flex-col gap-12 items-center justify-center lg:w-[602px] lg:flex-shrink-0 min-h-[440px]"
                style={{ backgroundColor: "#284818" }}
              >
                <div className="absolute inset-0 bg-black mix-blend-plus-lighter opacity-50 pointer-events-none" />
                <div className="relative z-10 flex flex-col gap-4 items-center text-center">
                  <p className="text-white text-[19px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    THE <strong>TICKER</strong> IS
                  </p>
                  <img
                    src="/images/about/outside-ticker.png"
                    alt="$OUTSIDE"
                    className="w-full max-w-[367px]"
                  />
                  <p className="text-white text-[14px] tracking-[0.01em]"
                    style={{ fontFamily: "var(--font-cal-sans)" }}>
                    CA: 0xA1B2C3D4E5F67890ABCD1234567890EF12345678
                  </p>
                  <span className="text-white text-[12px] font-black"
                    style={{ fontFamily: "var(--font-mona-sans)" }}>
                    BEP20
                  </span>
                </div>
                <Link
                  href="https://token.woutside.com/whitepaper"
                  className="relative z-10 inline-flex items-center justify-center px-10 py-6 rounded-2xl font-black uppercase text-white text-[18px]"
                  style={{
                    backgroundColor: "#7aee41",
                    fontFamily: "var(--font-mona-sans)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  PROJECT WHITEPAPER
                </Link>
              </div>

              {/* Right: feature cards */}
              <div className="flex flex-col gap-3 flex-1 justify-between">
                {/* Header chips */}
                <div className="flex gap-3">
                  <div
                    className="bg-white rounded-3xl px-6 py-5 flex-shrink-0"
                    style={{ color: "#284818" }}
                  >
                    <p className="text-[22px]" style={{ fontFamily: "var(--font-cal-sans)" }}>
                      The New Web3 Mobility
                    </p>
                  </div>
                  <div className="bg-white rounded-3xl px-6 py-5 flex-1 flex items-center justify-between">
                    <div style={{ color: "#004762" }}>
                      <p className="text-[16px] font-bold"
                        style={{ fontFamily: "var(--font-instrument-sans)" }}>
                        OUTSIDE
                      </p>
                      <div className="flex gap-2 text-[12px]">
                        <span style={{ fontFamily: "var(--font-instrument-sans)" }}>$0.62224</span>
                        <span style={{ color: "#17b26a" }}>+83.09%</span>
                      </div>
                    </div>
                    <div className="text-right" style={{ color: "#004762" }}>
                      <p className="text-[16px] font-semibold"
                        style={{ fontFamily: "var(--font-instrument-sans)" }}>
                        314.67565
                      </p>
                      <p className="text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                        $505.71
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature rows */}
                <div className="flex flex-col gap-2">
                  {tokenFeatures.map((f) => (
                    <div
                      key={f.tag}
                      className="bg-white rounded-2xl px-6 py-4 flex gap-4 items-start relative overflow-hidden"
                    >
                      <span
                        className="absolute top-0 font-extralight text-[#f9fff6] text-[110px] leading-none select-none pointer-events-none"
                        style={{
                          right: "100px",
                          transform: "translateX(100%)",
                          fontFamily: "var(--font-mona-sans)",
                          fontWeight: 200,
                        }}
                        aria-hidden="true"
                      >
                        {String(tokenFeatures.indexOf(f) + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="inline-flex items-center justify-center px-4 py-2 rounded-full text-[14px] flex-shrink-0 whitespace-nowrap"
                        style={{
                          backgroundColor: "#f9fff6",
                          color: "#284818",
                          fontFamily: "var(--font-instrument-sans)",
                          minWidth: 120,
                        }}
                      >
                        {f.tag}
                      </span>
                      <p
                        className="text-[14px] leading-[20px] flex-1"
                        style={{ fontFamily: "var(--font-instrument-sans)", color: "#284818" }}
                      >
                        {f.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Token CTA */}
                <div className="bg-white rounded-3xl px-8 py-6 flex items-center justify-between gap-4">
                  <p
                    className="text-[20px] leading-[32px]"
                    style={{ fontFamily: "var(--font-cal-sans)", color: "#284818", maxWidth: 280 }}
                  >
                    Visit the crypto project website to learn more
                  </p>
                  <Link
                    href="https://token.woutside.com"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-black text-white text-[14px] flex-shrink-0"
                    style={{
                      backgroundColor: "#284818",
                      fontFamily: "var(--font-mona-sans)",
                    }}
                  >
                    $OUTSIDE
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      </>
  );
}
