"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CommunitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="community" className="relative px-4 py-24 md:py-32 xl:px-20 overflow-hidden">
      {/* Bg glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,174,239,0.09) 0%, transparent 65%)" }} />

      <div className="max-w-[900px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-br from-[#0a1822] to-[#060e14] border border-[#00aeef]/20 rounded-[24px] p-10 md:p-16 text-center flex flex-col items-center gap-8"
        >
          {/* Token emblem */}
          <div className="w-20 h-20 rounded-full bg-[#00aeef]/10 border border-[#00aeef]/30 flex items-center justify-center animate-pulse-glow">
            <span
              className="text-[#00aeef] text-[13px] leading-none font-black tracking-wider"
              style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
            >
              $OUT
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center gap-2">
              <span className="w-1 h-4 bg-[#00aeef] rounded-full" />
              <span className="text-[#00aeef] text-[11px] tracking-[0.16em] uppercase font-semibold">Community</span>
              <span className="w-1 h-4 bg-[#00aeef] rounded-full" />
            </div>
            <h2
              className="text-[36px] md:text-[56px] text-white leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
            >
              The journey starts{" "}<span className="text-[#00aeef]">now.</span>
            </h2>
            <p className="text-white/55 text-[16px] leading-[1.7] max-w-[480px] mx-auto">
              $OUTSIDE hasn't launched yet. But the community building now will be
              first in line when it does. Follow along on X. Watch the roadmap unfold.
              Be here before it's obvious.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <motion.a
              href="https://x.com/OutMobility"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              className="flex items-center gap-2.5 bg-[#00aeef] hover:bg-[#00c4ff] text-white px-10 py-4 rounded-[14px] transition-colors"
              style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900, fontSize: "15px", letterSpacing: "0.08em" }}
            >
              FOLLOW @OUTMOBILITY ON X
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>

          {/* What we post */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
            {[
              { emoji: "📡", label: "Network milestones" },
              { emoji: "🔐", label: "Token development updates" },
              { emoji: "🚗", label: "Ecosystem growth" },
              { emoji: "🗳️", label: "Community announcements" },
              { emoji: "📅", label: "TGE date — first" },
              { emoji: "📊", label: "Real data. No noise." },
            ].map((item) => (
              <div key={item.label} className="bg-white/4 rounded-[10px] px-4 py-3 flex items-center gap-2.5">
                <span className="text-[16px]">{item.emoji}</span>
                <span className="text-white/55 text-[12px] font-medium leading-tight">{item.label}</span>
              </div>
            ))}
          </div>

          <p className="text-white/30 text-[12px] max-w-[400px] leading-[1.6]">
            We post signals, not noise. When something meaningful happens,
            we share it. When it doesn't, we don't.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
