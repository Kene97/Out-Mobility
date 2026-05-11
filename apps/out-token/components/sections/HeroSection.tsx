"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20 overflow-hidden grid-bg">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none glow-sky" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060e14] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[900px] mx-auto flex flex-col items-center text-center gap-8">

        {/* Token emblem / mascot anchor */}
        <motion.div {...fadeUp(0)} className="relative">
          <div className="animate-pulse-glow w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full bg-[#0a1822] border border-[#00aeef]/30 flex items-center justify-center relative">
            {/* Outer dashed ring (SVG) */}
            <svg className="absolute animate-slow-spin" style={{ inset: "-14px", width: "calc(100% + 28px)", height: "calc(100% + 28px)" }} viewBox="0 0 188 188" fill="none">
              <circle cx="94" cy="94" r="92" stroke="rgba(0,174,239,0.18)" strokeWidth="1.5" strokeDasharray="4 8" />
            </svg>
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-[#00aeef]/5" />
            {/* Token ticker */}
            <div className="flex flex-col items-center gap-0.5">
              <span
                className="text-[#00aeef] text-[32px] md:text-[42px] leading-none tracking-tight"
                style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
              >
                $
              </span>
              <span
                className="text-white text-[18px] md:text-[22px] leading-none tracking-widest"
                style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
              >
                OUTSIDE
              </span>
            </div>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.div {...fadeUp(0.1)} className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00aeef] animate-pulse" />
          <span
            className="text-[#00aeef] text-[11px] md:text-[12px] tracking-[0.18em] uppercase font-semibold"
          >
            The Out Mobility Ecosystem Token
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00aeef] animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.15)}
          className="text-[48px] md:text-[72px] lg:text-[88px] leading-[0.95] tracking-tight text-white"
          style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
        >
          ONE TOKEN.{" "}
          <br />
          <span className="text-[#00aeef]">EVERY</span>{" "}
          <span className="text-white/80">MILE.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.22)}
          className="text-[16px] md:text-[20px] text-white/60 leading-[1.6] max-w-[560px]"
        >
          $OUTSIDE powers the entire Out Mobility stack — advertising, ride-hailing,
          carbon credits, and EV charging. Real infrastructure. Real utility.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.28)} className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href="https://x.com/OutMobility"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 bg-[#00aeef] hover:bg-[#00c4ff] text-white px-8 py-4 rounded-[14px] transition-colors"
            style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900, fontSize: "14px", letterSpacing: "0.08em" }}
          >
            FOLLOW @OUTMOBILITY
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="#tokenomics"
            className="flex items-center gap-2 border border-white/15 text-white/70 hover:border-[#00aeef]/50 hover:text-white px-8 py-4 rounded-[14px] transition-all text-[14px] font-medium"
          >
            View Tokenomics
          </a>
        </motion.div>

        {/* Status badge */}
        <motion.div {...fadeUp(0.34)}>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400/80 animate-pulse" />
            <span className="text-white/50 text-[12px] font-medium tracking-wide">
              Token not yet launched — community building now
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-white/25 text-[11px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
