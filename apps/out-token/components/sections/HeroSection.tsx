"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden grid-bg">
      {/* Radial glow — top center */}
      <div className="absolute inset-0 pointer-events-none glow-sky" />
      {/* Right-side glow for mascot */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#00aeef]/8 rounded-full blur-[120px] pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#060e14] to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center pt-[52px] pb-[120px] px-6 xl:px-16">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-16">

          {/* ── Left: text ── */}
          <div className="flex flex-col gap-6 lg:w-[500px] xl:w-[560px] lg:flex-shrink-0">

            {/* Eyebrow */}
            <motion.div {...fadeUp(0.05)} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00aeef] animate-pulse" />
              <span
                className="text-[#00aeef] text-[11px] tracking-[0.18em] uppercase"
                style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 600 }}
              >
                The Out Mobility Ecosystem Token
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00aeef] animate-pulse" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.12)}
              className="text-[56px] md:text-[72px] lg:text-[80px] xl:text-[96px] leading-[0.92] tracking-tight text-white"
              style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
            >
              ONE TOKEN.
              <br />
              <span className="text-[#00aeef]">EVERY</span>{" "}
              <span className="text-white/80">MILE.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-[16px] md:text-[18px] text-white/50 leading-[1.65] max-w-[440px]"
              style={{ fontFamily: "var(--font-instrument-sans)" }}
            >
              Ecosystem Token powers the entire Out Mobility stack — advertising,
              ride-hailing, carbon credits, and EV charging. Real infrastructure.
              Real utility.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.28)} className="flex flex-col sm:flex-row items-start gap-3">
              <a
                href="https://x.com/OutMobility"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#00aeef] hover:bg-[#00c4ff] text-white px-7 py-3.5 rounded-[12px] transition-colors"
                style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900, fontSize: "13px", letterSpacing: "0.08em" }}
              >
                FOLLOW @OUTMOBILITY
                <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
                  <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#tokenomics"
                className="flex items-center gap-2 border border-white/12 text-white/55 hover:border-[#00aeef]/45 hover:text-white px-7 py-3.5 rounded-[12px] transition-all"
                style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 500, fontSize: "13px" }}
              >
                View Tokenomics
              </a>
              <a
                href="/whitepaper"
                className="flex items-center gap-2 border border-white/12 text-white/55 hover:border-[#00aeef]/45 hover:text-white px-7 py-3.5 rounded-[12px] transition-all"
                style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 500, fontSize: "13px" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3v13M12 16l-4-4M12 16l4-4M4 20h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Whitepaper
              </a>
            </motion.div>

            {/* Status badge */}
            <motion.div {...fadeUp(0.34)}>
              <div className="inline-flex items-center gap-2 bg-white/4 border border-white/8 rounded-full px-4 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/70 animate-pulse" />
                <span
                  className="text-white/40 text-[11px] tracking-wide"
                  style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 500 }}
                >
                  Token not yet launched — community building now
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Mascot ── */}
          <motion.div
            className="flex-1 relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0 min-h-[260px] md:min-h-[380px] lg:min-h-0"
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          >
            {/* Ground shadow glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-16 bg-[#00aeef]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Mascot */}
            <div className="relative w-full max-w-[440px] md:max-w-[560px] lg:max-w-[640px] aspect-square">
              <Image
                src="/mascot/mascot-main.png"
                alt="Ecosystem Token mascot — Out Mobility blue car"
                fill
                className="object-contain"
                priority
                style={{ filter: "drop-shadow(0 0 60px rgba(0,174,239,0.3)) drop-shadow(0 0 20px rgba(0,174,239,0.15))" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-[96px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="text-white/20 text-[10px] tracking-widest uppercase" style={{ fontFamily: "var(--font-instrument-sans)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-white/15 to-transparent"
        />
      </motion.div>
    </section>
  );
}
