"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const features = [
  {
    n: "01",
    tag: "Flexible",
    desc: "Pay for rides, split fares, or cash out — $OUTSIDE is your key to seamless, borderless mobility.",
  },
  {
    n: "02",
    tag: "Credible",
    desc: "Every kilometer you ride mines $OUTSIDE. Daily commute? That's a crypto paycheck.",
  },
  {
    n: "03",
    tag: "Real World Asset",
    desc: "Powered by Global Carbon finance for Real World Utility.",
  },
  {
    n: "04",
    tag: "Rewarding",
    desc: "Hodl, send, or convert tokens instantly. Your keys, your crypto, no middlemen.",
  },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="bg-[#f6f6f6] px-4 py-10 md:px-8 md:py-16 xl:px-20 xl:py-24"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">

          {/* ── Left: Token card ── */}
          <motion.div
            className="relative bg-[#004762] rounded-[32px] lg:rounded-[40px] overflow-hidden lg:w-[602px] lg:h-[518px] lg:flex-shrink-0 p-8 flex flex-col items-center justify-center gap-10 min-h-[380px]"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* HODL watermark */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none" aria-hidden="true">
              <div className="flex gap-0 opacity-[0.04]">
                {[0, 1].map((col) => (
                  <div key={col} className="flex flex-col items-center">
                    {["HODL", "HODL", "HODL", "HODL", "HODL"].map((t, i) => (
                      <p key={i} className="font-display font-black text-white text-[129px] leading-none whitespace-nowrap">
                        {t}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Noise overlay */}
            <div className="absolute inset-0 bg-black mix-blend-plus-lighter opacity-50 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-[394px]">
              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-white text-[19px] font-normal text-center">
                  THE <span className="font-bold">TICKER</span> IS
                </p>

                <div className="flex flex-col items-center gap-3 w-full">
                  <img
                    src="/images/outside-ticker.png"
                    alt="$OUTSIDE"
                    className="w-[90%] max-w-[367px] object-contain"
                  />
                  <p className="text-white text-[14px] font-normal tracking-wide text-center break-all opacity-80">
                    CA: <span className="font-heading tracking-[0.01em]">0xA1B2C3D4E5F67890ABCD1234567890EF12345678</span>
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <img src="/images/bep20-logo.png" alt="BEP20" className="h-5 object-contain" />
                  <span className="font-body font-bold text-white text-[12px]">BEP20</span>
                </div>
              </div>

              <Link
                href="https://token.woutside.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center bg-[#00aeef] text-white font-display font-black uppercase rounded-2xl px-10 py-6 text-[20px] hover:bg-[#00c4ff] transition-colors overflow-hidden"
              >
                <GridOverlay />
                PROJECT WHITEPAPER
              </Link>
            </div>
          </motion.div>

          {/* ── Right: feature cards ── */}
          <div className="flex flex-col gap-3 lg:flex-1 lg:self-stretch lg:justify-between">

            {/* Header row: tag + token price */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            >
              <div className="bg-white rounded-[24px] px-6 h-[83px] flex items-center flex-shrink-0">
                <p className="font-heading text-[#004762] text-[20px] lg:text-[24px] whitespace-nowrap">
                  The New Web3 Mobility
                </p>
              </div>

              {/* Token price card */}
              <div className="bg-white rounded-[24px] px-6 h-[83px] flex items-center justify-between flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0 w-[35px] h-[35px]">
                    <img
                      src="/images/token-circle.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover rounded-full"
                    />
                    <img
                      src="/images/outside-avatar.png"
                      alt="OUTSIDE token"
                      className="absolute inset-0 w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-body font-bold text-[#004762] text-[16px] leading-none">OUTSIDE</p>
                    <div className="flex items-center gap-1.5 text-[12px]">
                      <span className="font-body text-[#004762]">$0.62224</span>
                      <span className="font-body text-[#17b26a]">+83.09%</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="font-body font-semibold text-[#004762] text-[16px]">314.67565</p>
                  <p className="font-body text-[#004762] text-[12px]">$505.71</p>
                </div>
              </div>
            </motion.div>

            {/* Feature rows */}
            <div className="flex flex-col gap-2 flex-1">
              {features.map((f, i) => (
                <motion.div
                  key={f.n}
                  className="relative bg-white rounded-2xl px-6 py-4 overflow-hidden flex gap-4 items-start"
                  initial={{ opacity: 0, x: 24, y: 8 }}
                  animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.12 + i * 0.08 }}
                >
                  {/* Step watermark */}
                  <span
                    className="absolute top-0 text-[110px] leading-[1.1] text-[#f6fcff] font-extralight tracking-[-0.02em] select-none pointer-events-none"
                    style={{ right: "100px", transform: "translateX(100%)", fontFamily: "var(--font-mona-sans), Arial, sans-serif", fontWeight: 200 }}
                    aria-hidden="true"
                  >
                    {f.n}
                  </span>

                  <span className="bg-[#f6fcff] text-[#004762] text-[13px] font-normal px-4 py-2 rounded-full flex-shrink-0 whitespace-nowrap h-9 flex items-center">
                    {f.tag}
                  </span>
                  <p className="font-body text-[13px] lg:text-[14px] text-[#004762] leading-[1.55] flex-1">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA card */}
            <motion.div
              className="bg-white rounded-2xl lg:rounded-3xl px-6 py-5 lg:px-10 lg:py-6 flex items-center justify-between gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.46 }}
            >
              <p className="font-heading text-[#004762] text-[18px] lg:text-[24px] leading-[1.33]">
                Visit the crypto project website to learn more
              </p>
              <Link
                href="https://token.woutside.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00364b] border border-[#004762] text-white font-display font-black uppercase rounded-lg px-5 py-3 text-[14px] flex items-center gap-2 flex-shrink-0 hover:bg-[#004762] transition-colors"
              >
                <img src="/images/outside-ticker.png" alt="$OUTSIDE" className="h-5 object-contain" />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GridOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid-btn" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-btn)" />
    </svg>
  );
}
