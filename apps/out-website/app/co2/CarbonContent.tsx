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
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Reusable green CTA button ── */
function GreenBtn({ label, href = "/contact" }: { label: string; href?: string }) {
  return (
    <motion.a
      href={href}
      className="inline-flex items-center justify-center bg-[#396e1e] rounded-[16px] px-10 py-5 text-[18px] text-white whitespace-nowrap hover:bg-[#284818] transition-colors"
      style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900, letterSpacing: "0.02em" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
    >
      {label}
    </motion.a>
  );
}

/* ═══════════════════════════════════
   HERO
═══════════════════════════════════ */
function CarbonHero() {
  return (
    <section className="bg-white w-full">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-20 pt-20 lg:pt-[104px] pb-16 lg:pb-[104px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-6">

        {/* Left: headline + body + CTA */}
        <div className="flex flex-col gap-4 lg:w-[510px] shrink-0">
          <FadeIn>
            <h1
              className="text-[64px] md:text-[88px] lg:text-[110px] leading-[0.9] font-black uppercase text-[#396e1e]"
              style={{ fontFamily: "var(--font-mona-sans)" }}
            >
              CARBON IMPACT<span className="text-[#7aee41]">.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p
              className="text-[20px] lg:text-[24px] text-[#396e1e]"
              style={{ fontFamily: "var(--font-cal-sans)" }}
            >
              Clean Mobility, Zero footprint.
            </p>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p
              className="text-[16px] lg:text-[18px] text-[#396e1e] leading-[28px]"
              style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
            >
              The future of transport should be clean, inclusive, and scalable. OUT is creating an electric mobility system that cuts emissions, generates jobs, and maximizes carbon value—one trip at a time.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GreenBtn label="PARTNER WITH US" />
          </FadeIn>
        </div>

        {/* Center: CO2 leaf image */}
        <FadeIn delay={0.1} className="relative w-full lg:w-[571px] h-[300px] md:h-[380px] lg:h-[446px] rounded-[24px] overflow-hidden shrink-0">
          <Image
            src="/images/carbon/hero-co2.jpg"
            alt="CO₂ leaf — carbon and nature"
            fill
            priority
            className="object-cover object-center"
          />
        </FadeIn>

        {/* Right: SDG icon squares */}
        <FadeIn delay={0.2} className="flex flex-row lg:flex-col gap-2 shrink-0">
          {[
            { src: "/images/carbon/sdg-1.png", alt: "SDG 7 — Affordable and Clean Energy",    bg: "#ff3a20" },
            { src: "/images/carbon/sdg-2.png", alt: "SDG 11 — Sustainable Cities",            bg: "#4d9f38" },
            { src: "/images/carbon/sdg-3.png", alt: "SDG 3 — Good Health and Well-being",     bg: "#a31942" },
            { src: "/images/carbon/sdg-4.png", alt: "SDG 13 — Climate Action",               bg: "#3f7e44" },
          ].map((sdg) => (
            <div
              key={sdg.alt}
              className="relative w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] rounded-[4px] overflow-hidden shrink-0"
              style={{ backgroundColor: sdg.bg }}
            >
              <Image src={sdg.src} alt={sdg.alt} fill className="object-cover object-center" />
            </div>
          ))}
        </FadeIn>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   ECOSYSTEM
═══════════════════════════════════ */
function EcosystemSection() {
  return (
    <section className="bg-[#f6f6f6] w-full py-16 lg:py-20 flex flex-col gap-10 lg:gap-12">

      {/* Header */}
      <FadeIn className="max-w-[890px] mx-auto px-5 lg:px-20 text-center flex flex-col gap-6">
        <p
          className="text-[28px] lg:text-[40px] text-[#284818]"
          style={{ fontFamily: "var(--font-cal-sans)" }}
        >
          An Integrated Clean Mobility Ecosystem
        </p>
        <p
          className="text-[16px] lg:text-[18px] text-[#284818] leading-[26px]"
          style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
        >
          OUT provides a clean mobility solution for Africa, combining electric ride-hailing with low-carbon transit services. Our solar-powered charging hubs ensure reliable green energy.
        </p>
      </FadeIn>

      {/* Full-width EV hub image */}
      <FadeIn className="relative w-full h-[300px] md:h-[480px] lg:h-[708px] overflow-hidden">
        <Image
          src="/images/carbon/ev-hub.jpg"
          alt="EV charging hub — integrated clean mobility"
          fill
          className="object-cover object-center"
        />
      </FadeIn>

      {/* 3 numbered feature cards */}
      <div className="max-w-[1440px] mx-auto px-5 lg:px-28 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { num: "01", title: "EV Taxis",            sub: "For daily travel across urban centers" },
            { num: "02", title: "Electric Minibuses",  sub: "Shared urban routes for mass transit" },
            { num: "03", title: "2 Wheeled EVs",       sub: "Last-mile delivery solutions" },
          ].map((card) => (
            <FadeIn key={card.num}>
              <div className="relative bg-white rounded-[16px] h-[128px] p-6 overflow-hidden">
                {/* ghost number */}
                <p
                  className="absolute left-6 bottom-[-8px] text-[92px] font-extralight leading-none text-[#eaecf0] tracking-[-1.84px] select-none"
                  style={{ fontFamily: "var(--font-mona-sans)" }}
                >
                  {card.num}
                </p>
                <div className="relative z-10 flex flex-col gap-1">
                  <p
                    className="text-[14px] font-bold text-[#284818] leading-[20px]"
                    style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 700 }}
                  >
                    {card.title}
                  </p>
                  <p
                    className="text-[14px] text-[#284818] leading-[20px]"
                    style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
                  >
                    {card.sub}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Bottom row: green image card + right content */}
      <div className="max-w-[1440px] mx-auto px-5 lg:px-28 w-full flex flex-col lg:flex-row gap-8">

        {/* Left: green inset image */}
        <FadeIn className="bg-white border border-[#f2f4f7] rounded-[16px] w-full lg:w-[519px] h-[280px] lg:h-[310px] overflow-hidden shrink-0 p-[15px]">
          <div className="relative w-full h-full rounded-[8px] overflow-hidden bg-[#7aee41]">
            <Image
              src="/images/carbon/green-card-inner.jpg"
              alt="Carbon green mobility"
              fill
              className="object-cover object-center"
            />
          </div>
        </FadeIn>

        {/* Right: ride-to-earn row + text block */}
        <div className="flex flex-col gap-4 flex-1">

          {/* Top action row */}
          <FadeIn className="flex flex-col md:flex-row gap-2">
            {/* Coin icon card */}
            <div className="bg-white border border-[#f2f4f7] rounded-[16px] w-[91px] h-[68px] flex items-center justify-center shrink-0">
              <div className="w-[30px] h-[30px] rounded-full bg-[#f9fff6] border-[4.5px] border-[#f9fff6] flex items-center justify-center">
                <Image src="/images/carbon/icon-coins.svg" alt="" width={15} height={15} />
              </div>
            </div>
            {/* Label card */}
            <div className="bg-white border border-[#f2f4f7] rounded-[16px] flex-1 h-[68px] flex items-center px-6">
              <p
                className="text-[18px] text-[#284818] leading-[28px] whitespace-nowrap"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                Ride-to-Earn Carbon Model
              </p>
            </div>
            {/* CTA button */}
            <GreenBtn label="PARTNER WITH US" />
          </FadeIn>

          {/* Blockchain text card */}
          <FadeIn delay={0.1}>
            <div className="bg-white border border-[#f2f4f7] rounded-[16px] px-8 py-6">
              <p
                className="text-[16px] text-[#284818] leading-[26px] font-semibold mb-[14px]"
                style={{ fontFamily: "var(--font-instrument-sans)" }}
              >
                OUT uses blockchain technology, allowing passengers to earn tokens and carbon credits for every fully electric ride.
              </p>
              <p
                className="text-[16px] text-[#284818] leading-[26px]"
                style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
              >
                This ride-to-earn model helps both riders and drivers reduce emissions while making electric vehicles more affordable. The ecosystem features digital wallets, corporate mobility solutions, and an EV fleet investment, transforming the entire value chain from vehicles and charging to finance and community ownership.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>

    </section>
  );
}

/* ═══════════════════════════════════
   OUTCOMES
═══════════════════════════════════ */
function OutcomesSection() {
  return (
    <section className="bg-white pb-12 lg:pb-12 pt-16 lg:pt-20 flex flex-col gap-12 lg:gap-16">

      {/* Top row: heading + CTA | two feature items */}
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 w-full flex flex-col lg:flex-row items-start justify-between gap-10">

        {/* Left */}
        <FadeIn className="flex flex-col gap-10 lg:w-[686px] shrink-0">
          <p
            className="text-[28px] lg:text-[40px] text-[#284818] leading-snug"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            Proposed future outcomes for environment, economy, and society.
          </p>
          <GreenBtn label="CONTACT US" />
        </FadeIn>

        {/* Right: feature items */}
        <div className="flex flex-col gap-0 lg:w-[558px]">
          {[
            {
              icon: "/images/carbon/icon-users.svg",
              title: "Green Jobs & Communities",
              body: "By year 10, over 3,000 green jobs will be created, including indirect roles. We aim to serve urban areas with 0.5–1 million people, impacting over 5 million in total.",
            },
            {
              icon: "/images/carbon/icon-feather.svg",
              title: "CO₂ Reductions",
              body: "Electric vehicles save 0.4–1.0 kg of CO₂ per km compared to diesel. Routa plans to reduce tens of thousands of tons of CO₂ over the next decade.",
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={0.1 * i} className="p-4 flex flex-col gap-4 rounded-[8px]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#f9fff6] flex items-center justify-center shrink-0">
                  <Image src={item.icon} alt="" width={20} height={20} />
                </div>
                <p
                  className="text-[16px] font-bold text-[#284818] leading-[24px]"
                  style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 700 }}
                >
                  {item.title}
                </p>
              </div>
              <p
                className="text-[16px] text-[#284818] leading-[24px]"
                style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
              >
                {item.body}
              </p>
            </FadeIn>
          ))}
        </div>

      </div>

      {/* Bottom row: stats grid | outcomes photo */}
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12 w-full flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* Stats 2x2 grid */}
        <FadeIn className="grid grid-cols-2 gap-8 lg:w-[557px] shrink-0">
          {[
            { val: "40 - 200", label: "tCO₂ Saved Annually",   sub: "Per e-bus at 200 km/day"     },
            { val: "3,000",    label: "EV Ride-Hailing Cars",   sub: "Deployed within 2-5 years"   },
            { val: "900",      label: "Direct Driver Jobs",     sub: "Plus mechanics and operators" },
            { val: "5M",       label: "People Reached",         sub: "Within 10 years"             },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <p
                className="text-[24px] text-[#7aee41] leading-[30px]"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                {stat.val}
              </p>
              <p
                className="text-[16px] font-semibold text-[#284818] leading-[24px]"
                style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 600 }}
              >
                {stat.label}
              </p>
              <p
                className="text-[14px] text-[#284818] leading-[20px]"
                style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
              >
                {stat.sub}
              </p>
            </div>
          ))}
        </FadeIn>

        {/* Outcomes photo */}
        <FadeIn delay={0.15} className="relative w-full lg:w-[514px] h-[220px] lg:h-[260px] rounded-[24px] overflow-hidden shrink-0">
          <Image
            src="/images/carbon/outcomes-photo.jpg"
            alt="Green mobility outcomes"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0">
            <Image
              src="/images/carbon/outcomes-overlay.png"
              alt=""
              fill
              className="object-cover object-center"
            />
          </div>
        </FadeIn>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   GREEN REVOLUTION
═══════════════════════════════════ */
function GreenRevolutionSection() {
  return (
    <section className="bg-[#f6f6f6] w-full p-5 md:p-10 lg:p-20">
      <div className="max-w-[1440px] mx-auto px-0 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

          {/* Left: city image */}
          <FadeIn className="relative w-full lg:w-[579px] h-[300px] md:h-[400px] lg:h-[572px] rounded-[16px] overflow-hidden shrink-0">
            <Image
              src="/images/carbon/green-city.jpg"
              alt="City — Africa clean mobility transition"
              fill
              className="object-cover object-center"
            />
          </FadeIn>

          {/* Right: text */}
          <FadeIn delay={0.15} className="flex flex-col gap-8 lg:w-[565px] shrink-0">
            <div className="flex flex-col gap-6 text-[#284818]">
              <h2
                className="text-[48px] md:text-[60px] lg:text-[72px] font-black uppercase leading-[1.1] lg:leading-[80px]"
                style={{ fontFamily: "var(--font-mona-sans)" }}
              >
                POWERING A GREEN REVOLUTION
              </h2>
              <p
                className="text-[24px] lg:text-[32px]"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                Partner in Africa&apos;s Clean Mobility Transition
              </p>
              <p
                className="text-[16px] lg:text-[18px] leading-[24px]"
                style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
              >
                Together, we can turn every trip in Africa into a cleaner, greener journey. Join us in building the future of sustainable mobility.
              </p>
            </div>
            <GreenBtn label="CONTACT US" />
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   CARBON FOOTER
═══════════════════════════════════ */
function CarbonFooter() {
  return (
    <footer className="bg-white w-full">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 pb-8 flex flex-col gap-6">

        {/* Top bar: social | links | app stores */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 gap-6">

          {/* Social icons */}
          <div className="flex items-center gap-[22px]">
            {[
              { src: "/images/carbon/social-x.svg",         alt: "X / Twitter", href: "https://x.com/OutMobility" },
              { src: "/images/carbon/social-linkedin.svg",  alt: "LinkedIn",    href: "#" },
              { src: "/images/carbon/social-instagram.svg", alt: "Instagram",   href: "#" },
              { src: "/images/carbon/social-tiktok.svg",    alt: "TikTok",      href: "#" },
            ].map((s) => (
              <a key={s.alt} href={s.href} target="_blank" rel="noopener noreferrer" className="relative w-5 h-5 block">
                <Image src={s.src} alt={s.alt} fill className="object-contain" />
              </a>
            ))}
          </div>

          {/* Footer links */}
          <div className="flex flex-wrap gap-6 md:gap-8">
            {["Blog", "Investor relation", "Privacy", "Accessibility", "Terms"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[14px] font-medium text-[#396e1e] leading-[20px] hover:text-[#284818] transition-colors whitespace-nowrap"
                style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 500 }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* App store badges (styled) */}
          <div className="flex gap-4 shrink-0">
            <a href="#" className="bg-black border border-[#a6a6a6] rounded-[7px] h-10 px-3 flex items-center gap-2 hover:border-white/40 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              <div>
                <p className="text-white/60 text-[8px] leading-none" style={{ fontFamily: "var(--font-instrument-sans)" }}>Download on the</p>
                <p className="text-white text-[12px] font-semibold leading-tight" style={{ fontFamily: "var(--font-instrument-sans)" }}>App Store</p>
              </div>
            </a>
            <a href="#" className="bg-black border border-[#a6a6a6] rounded-[5px] h-10 px-3 flex items-center gap-2 hover:border-white/40 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0"><path d="M3.18 23.76c.3.16.65.17.97.05l.1-.06 11.04-6.37-2.39-2.4-9.72 8.78zm-1.13-20.8a1.7 1.7 0 0 0-.05.42v20.24c0 .14.02.28.05.41l.06.1 11.33-11.33v-.27L2.11 2.86l-.06.1zm19.42 9.05-2.48-1.43-2.69 2.69 2.69 2.68 2.5-1.44a1.5 1.5 0 0 0 0-2.5zm-18.3 10.16 9.83-9.83-2.4-2.39L2.05 21.1l1.12 1.07z"/></svg>
              <div>
                <p className="text-white/60 text-[8px] leading-none" style={{ fontFamily: "var(--font-instrument-sans)" }}>Get it on</p>
                <p className="text-white text-[12px] font-semibold leading-tight" style={{ fontFamily: "var(--font-instrument-sans)" }}>Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* OUTSIDE wordmark container */}
        <div className="relative w-full h-[134px] rounded-[20px] overflow-hidden bg-black">
          <Image
            src="/images/carbon/footer-wordmark.png"
            alt="OUTSIDE"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Bottom: copyright | language */}
        <div className="flex items-center justify-between pt-8 border-t border-dashed border-[#396e1e]">
          <p
            className="text-[14px] text-[#396e1e] leading-[20px]"
            style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
          >
            © 2026 Out Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Image src="/images/carbon/icon-globe.svg" alt="" width={20} height={20} />
            <p
              className="text-[14px] font-semibold text-[#396e1e] leading-[20px]"
              style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 600 }}
            >
              English
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* ═══════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════ */
export default function CarbonContent() {
  return (
    <>
      <TickerBar />
      <CarbonHero />
      <EcosystemSection />
      <OutcomesSection />
      <GreenRevolutionSection />
      <CarbonFooter />
    </>
  );
}
