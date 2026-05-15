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

function PurpleBtn({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <motion.a
      href={href ?? "#"}
      className="inline-flex items-center justify-center bg-[#7c30ff] text-white rounded-[16px] px-10 py-5 text-[18px] whitespace-nowrap hover:bg-[#9550ff] transition-colors select-none cursor-pointer"
      style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900, letterSpacing: "0.02em" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
    >
      {children}
    </motion.a>
  );
}

/* ═══════════════════════════════════
   HERO
═══════════════════════════════════ */
function DriveHero() {
  return (
    <section className="bg-white w-full">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-20 pt-20 lg:pt-[104px] pb-16 lg:pb-[104px] flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">

        {/* Left: headline + body + CTA */}
        <div className="flex flex-col gap-5 lg:w-[455px] shrink-0">
          <motion.h1
            className="text-[64px] md:text-[96px] lg:text-[134px] leading-[0.88] font-black uppercase text-[#321367]"
            style={{ fontFamily: "var(--font-mona-sans)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            DRIVE TO OWN<span className="text-[#7c30ff]">.</span>
          </motion.h1>

          <motion.p
            className="text-[16px] lg:text-[18px] text-[#321367] leading-[28px]"
            style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            If you've ever dreamed of owning your own vehicle, this is for you.
            Drive with us and work your way to full vehicle ownership. It's yours to keep.
          </motion.p>

          <motion.p
            className="text-[16px] lg:text-[18px] text-[#321367] leading-[28px]"
            style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 700 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
          >
            Become an owner today!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          >
            <PurpleBtn>SIGN UP AS CAR OWNER</PurpleBtn>
          </motion.div>
        </div>

        {/* Right: driver illustration */}
        <motion.div
          className="relative w-full lg:w-[730px] h-[300px] md:h-[400px] lg:h-[481px] rounded-[24px] lg:rounded-[32px] overflow-hidden shrink-0"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
        >
          <Image
            src="/images/drive/driver-hero.png"
            alt="Out Mobility driver"
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
   DOWNLOAD + FEATURES SECTION
═══════════════════════════════════ */
function DownloadSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const features = [
    {
      n: "01",
      tag: "Fixed Salary + Tokens",
      bullets: ["Guaranteed monthly income", "Earn $OUTSIDE token per/km"],
    },
    {
      n: "02",
      tag: "Full Benefits",
      bullets: ["Health insurance", "Paid leave, pension plans"],
    },
    {
      n: "03",
      tag: "Carbon Impact",
      bullets: ["Earn carbon credits", "Featured in sustainability reports"],
    },
  ];

  return (
    <section ref={ref} className="bg-[#f6f6f6] w-full px-5 lg:px-20 py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 items-start">

        {/* Left: purple download card */}
        <motion.div
          className="relative w-full lg:w-[602px] lg:h-[518px] rounded-[32px] lg:rounded-[40px] overflow-hidden shrink-0 min-h-[320px]"
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/drive/download-card.jpg"
            alt="Download Out app"
            fill
            className="object-cover object-center"
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-8">
            <h2
              className="text-white text-[40px] lg:text-[52px] font-black uppercase text-center leading-[0.92]"
              style={{ fontFamily: "var(--font-mona-sans)" }}
            >
              DOWNLOAD OUT NOW
            </h2>

            {/* App store badges */}
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

          {/* Featuring row */}
          <motion.div
            className="flex flex-col sm:flex-row gap-2"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            <div className="bg-white rounded-[24px] px-10 py-[26px] flex items-center justify-center shrink-0">
              <p
                className="text-[24px] text-[#321367] whitespace-nowrap"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                Featuring
              </p>
            </div>

            {/* OUTSIDE token card */}
            <div className="bg-white rounded-[24px] h-[83px] px-6 flex items-center justify-between flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <div className="relative w-[35px] h-[35px] shrink-0">
                  <Image src="/images/drive/token-circle.png" alt="" fill className="object-cover rounded-full" />
                  <Image src="/images/drive/outside-token-avatar.png" alt="OUTSIDE" fill className="object-cover rounded-full" />
                  <div className="absolute bottom-[-1px] right-[-1px] w-[12px] h-[12px] bg-[#f0b90b] rounded-[4px] border-[1.6px] border-white overflow-hidden">
                    <Image src="/images/drive/bnb-badge.png" alt="BEP20" fill className="object-cover" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p
                    className="text-[16px] font-bold text-[#321367] leading-none"
                    style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 700 }}
                  >
                    OUTSIDE
                  </p>
                  <div
                    className="flex items-center gap-1.5 text-[12px]"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}
                  >
                    <span className="text-[#321367]">$0.62224</span>
                    <span className="text-[#17b26a]">+83.09%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p
                  className="text-[16px] font-semibold text-[#321367]"
                  style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 600 }}
                >
                  314.67565
                </p>
                <p
                  className="text-[12px] text-[#321367]"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  $505.71
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature rows */}
          <div className="flex flex-col gap-2">
            {features.map((f, i) => (
              <motion.div
                key={f.n}
                className="relative bg-white rounded-[16px] px-6 py-4 overflow-hidden flex gap-4 items-start"
                initial={{ opacity: 0, x: 24, y: 8 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.12 + i * 0.08 }}
              >
                {/* Ghost number */}
                <span
                  className="absolute top-0 right-[100px] translate-x-full text-[110px] leading-[1.1] text-[#f9f6ff] font-extralight tracking-[-2.2px] select-none pointer-events-none"
                  style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 200 }}
                  aria-hidden="true"
                >
                  {f.n}
                </span>

                {/* Tag pill */}
                <span
                  className="bg-[#f9f6ff] text-[#321367] text-[13px] px-4 py-2 rounded-full shrink-0 whitespace-nowrap h-9 flex items-center"
                  style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
                >
                  {f.tag}
                </span>

                {/* Bullets */}
                <ul
                  className="text-[14px] text-[#321367] leading-[20px] flex-1 min-w-0 list-disc ml-5"
                  style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
                >
                  {f.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* QR code row */}
          <FadeIn delay={0.4} className="bg-white rounded-[24px] px-6 py-5 flex items-center gap-6">
            <div className="relative w-[100px] h-[100px] lg:w-[133px] lg:h-[133px] shrink-0">
              <Image
                src="/images/drive/qr-code.png"
                alt="Scan to download Out app"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <p
                className="text-[20px] lg:text-[24px] text-[#321367] leading-[1.2]"
                style={{ fontFamily: "var(--font-cal-sans)" }}
              >
                Download Out app now.
              </p>
              <div className="flex items-center gap-2">
                <p
                  className="text-[15px] lg:text-[18px] text-[#321367]/70"
                  style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
                >
                  Scan to download
                </p>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="text-[#7c30ff]">
                  <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   DRIVE FOOTER
═══════════════════════════════════ */
function DriveFooter() {
  return (
    <footer className="bg-white w-full">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 pb-8 flex flex-col gap-6">

        {/* Top bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 gap-6">

          {/* Social icons */}
          <div className="flex items-center gap-[22px]">
            {[
              {
                label: "X / Twitter",
                href: "https://x.com/OutMobility",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                href: "#",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                label: "Instagram",
                href: "#",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                ),
              },
              {
                label: "TikTok",
                href: "#",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#321367]/60 hover:text-[#7c30ff] transition-colors"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Footer links */}
          <div className="flex flex-wrap gap-6 md:gap-8">
            {["Blog", "Investor relation", "Privacy", "Accessibility", "Terms"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[14px] font-medium text-[#321367] leading-[20px] hover:text-[#7c30ff] transition-colors whitespace-nowrap"
                style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 500 }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* App store badges */}
          <div className="flex gap-3 shrink-0">
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

        {/* OUTSIDE wordmark */}
        <div className="relative w-full h-[120px] lg:h-[134px] rounded-[20px] overflow-hidden bg-black">
          <Image
            src="/images/drive/footer-wordmark.png"
            alt="OUTSIDE"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Bottom: copyright */}
        <div className="flex items-center justify-between pt-8 border-t border-dashed border-[#321367]">
          <p
            className="text-[14px] text-[#321367] leading-[20px]"
            style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 400 }}
          >
            © 2026 Out Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#321367]">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <p
              className="text-[14px] font-semibold text-[#321367] leading-[20px]"
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
export default function DriveContent() {
  return (
    <>
      <TickerBar />
      <DriveHero />
      <DownloadSection />
      <DriveFooter />
    </>
  );
}
