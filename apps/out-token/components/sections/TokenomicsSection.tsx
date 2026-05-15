"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const allocations = [
  { label: "Ecosystem Reserve & Treasury", pct: 30, color: "#00aeef", tokens: "300,000,000", vesting: "Milestone-based" },
  { label: "Community & Rewards",          pct: 25, color: "#00c4ff", tokens: "250,000,000", vesting: "Monthly, activity-driven" },
  { label: "Core Team & Founders",         pct: 20, color: "#0099d4", tokens: "200,000,000", vesting: "4yr, 12-month cliff" },
  { label: "Strategic Partners & Advisors",pct: 10, color: "#007ba8", tokens: "100,000,000", vesting: "2yr, 6-month cliff" },
  { label: "Liquidity Provision",          pct: 10, color: "#005e80", tokens: "100,000,000", vesting: "At TGE" },
  { label: "Public Distribution",          pct:  5, color: "#004762", tokens:  "50,000,000", vesting: "At TGE" },
];

function DonutChart() {
  const radius = 80;
  const cx = 100;
  const cy = 100;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const segments = allocations.map((a) => {
    const dash = (a.pct / 100) * circumference;
    const gap = circumference - dash;
    const seg = { ...a, dash, gap, offset };
    offset += dash;
    return seg;
  });

  return (
    <div className="relative w-[200px] h-[200px] flex-shrink-0">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        {/* Track */}
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
        {/* Segments */}
        {segments.map((s) => (
          <circle
            key={s.label}
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke={s.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${s.dash - 2} ${circumference - s.dash + 2}`}
            strokeDashoffset={-s.offset}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      {/* Centre label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white text-[11px] font-medium tracking-wide">TOTAL SUPPLY</span>
        <span className="text-[#00aeef] text-[13px] font-bold mt-0.5">1,000,000,000</span>
        <span className="text-white/40 text-[10px]">Ecosystem Token</span>
      </div>
    </div>
  );
}

export default function TokenomicsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="tokenomics" className="relative px-4 py-24 md:py-32 xl:px-20">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 mb-14"
        >
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-[#00aeef] rounded-full" />
            <span className="text-[#00aeef] text-[11px] tracking-[0.16em] uppercase font-semibold">Tokenomics</span>
          </div>
          <h2
            className="text-[36px] md:text-[52px] text-white leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
          >
            Supply, built to{" "}<span className="text-[#00aeef]">last.</span>
          </h2>
          <p className="text-white/50 text-[15px] leading-[1.7] max-w-[540px]">
            Fixed supply. Gradual release. Every allocation tied to real activity
            or locked behind vesting. All figures are{" "}
            <span className="text-yellow-400/80 font-medium">proposed</span>{" "}
            — subject to change before TGE.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:items-start">

          {/* Donut chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-center gap-8 lg:flex-shrink-0"
          >
            <DonutChart />
            {/* Legend */}
            <div className="flex flex-col gap-2 w-full max-w-[220px]">
              {allocations.map((a) => (
                <div key={a.label} className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: a.color }} />
                  <span className="text-white/55 text-[11px] leading-tight">{a.label}</span>
                  <span className="ml-auto text-white/80 text-[11px] font-semibold flex-shrink-0">{a.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Allocation table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <div className="bg-[#0a1822] border border-white/6 rounded-[16px] overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-3 gap-4 px-6 py-3 border-b border-white/6">
                <span className="text-white/30 text-[11px] uppercase tracking-widest font-semibold">Allocation</span>
                <span className="text-white/30 text-[11px] uppercase tracking-widest font-semibold text-right">Tokens</span>
                <span className="text-white/30 text-[11px] uppercase tracking-widest font-semibold text-right">Vesting</span>
              </div>
              {allocations.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                  className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: a.color }} />
                    <span className="text-white/75 text-[13px] leading-tight">{a.label}</span>
                  </div>
                  <span className="text-white/60 text-[12px] text-right font-mono">{a.tokens}</span>
                  <span className="text-white/40 text-[11px] text-right leading-tight">{a.vesting}</span>
                </motion.div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-4 flex items-start gap-2 px-1">
              <span className="text-yellow-400/60 text-[12px] mt-0.5">⚠</span>
              <p className="text-white/30 text-[12px] leading-[1.6]">
                All tokenomics are <span className="text-yellow-400/70">proposed</span> and subject to change before the Token Generation Event (TGE). Final figures will be published and locked before launch.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Supply stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Supply",       value: "1,000,000,000", sub: "Fixed. No inflation." },
            { label: "Team Cliff",         value: "12 months",      sub: "Then 36-month vest" },
            { label: "Community Unlock",   value: "Activity-based", sub: "Not calendar-based" },
            { label: "Launch Status",      value: "Coming Soon",    sub: "TGE date TBC" },
          ].map((s) => (
            <div key={s.label} className="bg-[#0a1822] border border-white/6 rounded-[14px] p-5 flex flex-col gap-1">
              <span className="text-white/35 text-[11px] uppercase tracking-widest">{s.label}</span>
              <span className="text-[#00aeef] text-[18px] font-bold leading-tight mt-1" style={{ fontFamily: "var(--font-mona-sans)" }}>{s.value}</span>
              <span className="text-white/35 text-[11px]">{s.sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
