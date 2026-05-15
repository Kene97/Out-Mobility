"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TickerBar from "@/components/sections/TickerBar";

const SPRING = { type: "spring" as const, stiffness: 420, damping: 26 };

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Concentric ring bullet — matches Figma map location marker */
function RingDot() {
  return (
    <div className="relative shrink-0 w-5 h-5 flex items-center justify-center">
      <div className="absolute bg-[#00aeef] opacity-10 rounded-full w-5 h-5" />
      <div className="absolute bg-[#00aeef] opacity-20 rounded-full w-3 h-3" />
      <div className="bg-[#00aeef] rounded-full w-[6px] h-[6px] shrink-0" />
    </div>
  );
}

/* ═══════════════════════════════════
   HERO
═══════════════════════════════════ */
function RideHero() {
  return (
    <section className="bg-white w-full">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-20 pt-20 lg:pt-[104px] pb-16 lg:pb-[104px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-8">

        {/* Left: headline + body + booking inputs */}
        <div className="flex flex-col gap-8 lg:max-w-[608px] shrink-0">

          {/* Headline */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-[60px] md:text-[96px] lg:text-[131px] leading-[0.88] font-black uppercase text-[#004762]"
                style={{ fontFamily: "var(--font-mona-sans)" }}
              >
                HEADING <span className="text-[#00aeef]">OUT</span>?
              </p>
            </motion.div>
            <motion.p
              className="text-[68px] md:text-[110px] lg:text-[152px] leading-[0.88] font-black uppercase text-[#004762]"
              style={{ fontFamily: "var(--font-mona-sans)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
            >
              BOOK A RIDE
            </motion.p>
          </div>

          {/* Body */}
          <motion.p
            className="text-[16px] lg:text-[18px] text-[#004762] leading-[28px]"
            style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          >
            We take you around town, where ever you need to be — on{" "}
            <span className="font-bold text-[#00aeef]">Clean EV rides</span>,
            a personalised experience specially designed for you.
          </motion.p>

          {/* Booking inputs + CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:items-end"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {/* Pickup / destination inputs */}
            <div className="relative flex flex-col gap-3 w-full sm:w-[369px] shrink-0">

              {/* Vertical connector line */}
              <div className="absolute left-[21px] top-[43px] h-[calc(100%-43px-16px)] w-px bg-[#00aeef] z-10 pointer-events-none" />

              {/* Switch button */}
              <div className="absolute left-[8px] top-1/2 -translate-y-1/2 z-20 bg-[#004762] rounded-full w-[26px] h-[26px] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />
                </svg>
              </div>

              {/* Pickup input */}
              <div className="bg-[#f6f6f6] border border-[#e3e3e3] rounded-[80px] h-[54px] flex items-center gap-3 px-4">
                <div className="w-3 h-3 rounded-full border-2 border-[#00aeef] shrink-0 ml-1" />
                <p
                  className="text-[14px] text-[#667085] flex-1"
                  style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 500 }}
                >
                  Pickup address?
                </p>
              </div>

              {/* Destination input */}
              <div className="bg-[#f6f6f6] border border-[#e3e3e3] rounded-[80px] h-[54px] flex items-center gap-3 px-4">
                <div className="w-3 h-3 bg-[#00aeef] rounded-[2px] shrink-0 relative ml-1">
                  <div className="absolute inset-[3px] bg-white rounded-[1px]" />
                </div>
                <p
                  className="text-[14px] text-[#667085] flex-1"
                  style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 500 }}
                >
                  Where to?
                </p>
              </div>
            </div>

            {/* DOWNLOAD NOW CTA */}
            <motion.button
              className="bg-[#00aeef] text-white rounded-[16px] px-10 py-5 text-[18px] font-black uppercase whitespace-nowrap shrink-0 hover:bg-[#00c4ff] transition-colors"
              style={{ fontFamily: "var(--font-mona-sans)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
            >
              DOWNLOAD NOW
            </motion.button>
          </motion.div>
        </div>

        {/* Right: map image */}
        <motion.div
          className="relative w-full lg:w-[481px] h-[300px] md:h-[400px] lg:h-[481px] rounded-[24px] lg:rounded-[32px] overflow-hidden shrink-0"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <Image
            src="/images/ride/ride-map.jpg"
            alt="Out Mobility ride booking map"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   FEATURES + DOWNLOAD SECTION
═══════════════════════════════════ */
const features = [
  { text: "AI-driven smart mobility that plans with you." },
  { text: "Ride cheaper on electric vehicle, with personalised experience" },
  {
    parts: [
      { text: "Pay in Crypto with Out " },
      { text: "native token,", accent: true },
      { text: " no hassle." },
    ],
  },
  { text: "Zero surge, no driver cancellation." },
  { text: "Real Carbon credit tracking with tradable token reward" },
];

function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-[#f6f6f6] w-full px-5 lg:px-20 py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 items-start">

        {/* Left: blue download card */}
        <motion.div
          className="relative w-full lg:w-[602px] lg:h-[518px] rounded-[32px] lg:rounded-[40px] overflow-hidden shrink-0 min-h-[320px]"
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/ride/download-card.jpg"
            alt="Download Out app"
            fill
            className="object-cover object-center"
          />

          {/* Noise overlay */}
          <div className="absolute inset-0 bg-black mix-blend-plus-lighter opacity-50 pointer-events-none" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-8">
            <h2
              className="text-[#004762] text-[52px] lg:text-[80px] font-black uppercase text-center leading-[0.92]"
              style={{ fontFamily: "var(--font-mona-sans)" }}
            >
              DOWNLOAD OUT NOW
            </h2>

            <div className="flex gap-3">
              <a
                href="#"
                className="bg-black border border-[#a6a6a6] rounded-[7px] h-10 px-3 flex items-center gap-2 hover:border-white/40 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <p className="text-white/60 text-[8px] leading-none" style={{ fontFamily: "var(--font-instrument-sans)" }}>Download on the</p>
                  <p className="text-white text-[12px] font-semibold leading-tight" style={{ fontFamily: "var(--font-instrument-sans)" }}>App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="bg-black border border-[#a6a6a6] rounded-[5px] h-10 px-3 flex items-center gap-2 hover:border-white/40 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
                  <path d="M3.18 23.76c.3.16.65.17.97.05l.1-.06 11.04-6.37-2.39-2.4-9.72 8.78zm-1.13-20.8a1.7 1.7 0 0 0-.05.42v20.24c0 .14.02.28.05.41l.06.1 11.33-11.33v-.27L2.11 2.86l-.06.1zm19.42 9.05-2.48-1.43-2.69 2.69 2.69 2.68 2.5-1.44a1.5 1.5 0 0 0 0-2.5zm-18.3 10.16 9.83-9.83-2.4-2.39L2.05 21.1l1.12 1.07z" />
                </svg>
                <div>
                  <p className="text-white/60 text-[8px] leading-none" style={{ fontFamily: "var(--font-instrument-sans)" }}>Get it on</p>
                  <p className="text-white text-[12px] font-semibold leading-tight" style={{ fontFamily: "var(--font-instrument-sans)" }}>Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right column */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">

          {/* Featuring + token card row */}
          <motion.div
            className="flex flex-col sm:flex-row gap-2"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            <div className="bg-white rounded-[24px] px-10 py-[26px] flex items-center justify-center shrink-0">
              <p className="text-[24px] text-[#004762] whitespace-nowrap" style={{ fontFamily: "var(--font-cal-sans)" }}>
                Featuring
              </p>
            </div>

            {/* OUTSIDE token card */}
            <div className="bg-white rounded-[24px] h-[83px] px-6 flex items-center justify-between flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <div className="relative w-[35px] h-[35px] shrink-0">
                  <Image src="/images/ride/token-ellipse.png" alt="" fill className="object-cover rounded-full" />
                  <Image src="/images/ride/token-avatar.png" alt="OUTSIDE" fill className="object-cover rounded-full" />
                  <div className="absolute bottom-[-1px] right-[-1px] w-[12px] h-[12px] bg-[#f0b90b] rounded-[4px] border-[1.6px] border-white overflow-hidden">
                    <Image src="/images/ride/bnb-icon.png" alt="BEP20" fill className="object-cover" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[16px] font-bold text-[#004762] leading-none" style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 700 }}>OUTSIDE</p>
                  <div className="flex items-center gap-1.5 text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    <span className="text-[#004762]">$0.62224</span>
                    <span className="text-[#17b26a]">+83.09%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-[16px] font-semibold text-[#004762]" style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 600 }}>314.67565</p>
                <p className="text-[12px] text-[#004762]" style={{ fontFamily: "var(--font-instrument-sans)" }}>$505.71</p>
              </div>
            </div>
          </motion.div>

          {/* Feature list card */}
          <motion.div
            className="relative bg-white rounded-[24px] px-10 py-8 overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
          >
            <div className="flex flex-col gap-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-4">
                  <RingDot />
                  <p
                    className="text-[16px] lg:text-[18px] text-[#004762] leading-[1.4]"
                    style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
                  >
                    {"parts" in f ? (
                      f.parts?.map((part, j) =>
                        part.accent ? (
                          <span key={j} className="text-[#00aeef] underline underline-offset-2">{part.text}</span>
                        ) : (
                          <span key={j}>{part.text}</span>
                        )
                      )
                    ) : (
                      f.text
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* Decorative token circle — bottom-right, partially clipped */}
            <div className="absolute bottom-[-55px] right-[-32px] w-[130px] h-[130px] pointer-events-none select-none">
              <Image
                src="/images/ride/token-circle-deco.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* QR / download row */}
          <FadeIn delay={0.32} className="bg-white rounded-[24px] px-6 py-5 flex items-center gap-6">
            {/* QR code */}
            <div className="relative w-[100px] h-[100px] lg:w-[133px] lg:h-[133px] shrink-0 rounded-[8px] overflow-hidden bg-[#eee]">
              <Image
                src="/images/ride/qr-code.png"
                alt="Scan to download Out app"
                fill
                className="object-contain"
              />
            </div>

            {/* Text + download icon */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              {/* Download icon button */}
              <div className="bg-[#f6fcff] rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#004762" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[18px] lg:text-[20px] text-[#004762] leading-[30px]" style={{ fontFamily: "var(--font-cal-sans)" }}>
                  Download Out app now.
                </p>
                <p className="text-[14px] lg:text-[16px] text-[#004762]/70 leading-[24px]" style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}>
                  Scan to download
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════ */
export default function RideContent() {
  return (
    <>
      <TickerBar />
      <RideHero />
      <FeaturesSection />
    </>
  );
}
