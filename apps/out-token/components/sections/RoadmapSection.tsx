"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const phases = [
  {
    phase: "Phase 0",
    title: "Foundation",
    status: "active",
    items: [
      "Out-door network deployed",
      "Token documentation published",
      "Website and waitlist live",
      "Smart contract development begins",
      "Community waitlist building",
    ],
  },
  {
    phase: "Phase 1",
    title: "Community Build",
    status: "upcoming",
    items: [
      "Grow @OutMobility community",
      "Token information hub launched",
      "Smart contract audit complete",
      "Tokenomics finalised and locked",
      "TGE parameters announced to waitlist",
    ],
  },
  {
    phase: "Phase 2",
    title: "Token Launch (TGE)",
    status: "planned",
    items: [
      "Public distribution event",
      "DEX liquidity deployed",
      "Community rewards programme begins",
      "Driver & operator Ecosystem Token payouts start",
      "Token holder dashboard live",
    ],
  },
  {
    phase: "Phase 3",
    title: "Ecosystem Rollout",
    status: "future",
    items: [
      "Ecosystem Token-denominated ad payments (Out-door)",
      "Out-side launch with rider rewards",
      "Out-leaf pilot: first carbon credits in Ecosystem Token",
      "Ecosystem Token staking for advertisers activated",
      "CEX listing pursuit begins",
    ],
  },
  {
    phase: "Phase 4",
    title: "Utility Expansion",
    status: "future",
    items: [
      "Governance framework live",
      "Out-charge: EV charging settled in Ecosystem Token",
      "Data marketplace pilot",
      "Multi-market DePIN expansion",
      "Cross-chain integrations",
    ],
  },
];

const statusConfig = {
  active:   { label: "Active",       dot: "#00aeef",  line: "#00aeef",  text: "text-[#00aeef]" },
  upcoming: { label: "Upcoming",     dot: "#00aeef80", line: "#00aeef40", text: "text-[#00aeef]/70" },
  planned:  { label: "Planned",      dot: "rgba(255,255,255,0.3)", line: "rgba(255,255,255,0.1)", text: "text-white/50" },
  future:   { label: "Future",       dot: "rgba(255,255,255,0.2)", line: "rgba(255,255,255,0.06)", text: "text-white/35" },
};

export default function RoadmapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="roadmap" className="relative px-4 py-24 md:py-32 xl:px-20">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 mb-16"
        >
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-[#00aeef] rounded-full" />
            <span className="text-[#00aeef] text-[11px] tracking-[0.16em] uppercase font-semibold">Roadmap</span>
          </div>
          <h2
            className="text-[36px] md:text-[52px] text-white leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
          >
            Built in{" "}<span className="text-[#00aeef]">phases,</span>
            {" "}not promises.
          </h2>
          <p className="text-white/50 text-[15px] leading-[1.7] max-w-[520px]">
            Each phase unlocks when the network is ready — not when the calendar says so.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical spine */}
          <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-[#00aeef]/60 via-[#00aeef]/20 to-transparent hidden md:block" />

          {phases.map((phase, i) => {
            const cfg = statusConfig[phase.status as keyof typeof statusConfig];
            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-6 pb-10 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 flex flex-col items-center gap-0 hidden md:flex">
                  <div
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center relative z-10"
                    style={{
                      borderColor: cfg.dot,
                      background: phase.status === "active" ? `${cfg.dot}20` : "#060e14",
                    }}
                  >
                    {phase.status === "active" && (
                      <span className="w-2 h-2 rounded-full bg-[#00aeef] animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div
                  className="flex-1 bg-[#0a1822] border rounded-[16px] p-6 md:p-7"
                  style={{
                    borderColor: phase.status === "active"
                      ? "rgba(0,174,239,0.3)"
                      : "rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-white/35 text-[11px] tracking-[0.12em] uppercase font-semibold">{phase.phase}</span>
                      <h3
                        className="text-white text-[20px] font-bold leading-tight mt-0.5"
                        style={{ fontFamily: "var(--font-cal-sans)" }}
                      >
                        {phase.title}
                      </h3>
                    </div>
                    <span
                      className={`text-[10px] font-bold tracking-[0.1em] px-2.5 py-1.5 rounded-full border flex-shrink-0 ${cfg.text}`}
                      style={{
                        borderColor: `${cfg.dot}40`,
                        background: `${cfg.dot}10`,
                      }}
                    >
                      {cfg.label.toUpperCase()}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: cfg.dot }}
                        />
                        <span className="text-white/55 text-[13px] leading-[1.55]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
