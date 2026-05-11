"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const products = [
  {
    id: "outdoor",
    name: "Out-door",
    tag: "ACTIVE",
    tagColor: "#00aeef",
    headline: "Verified In-Car Advertising",
    desc: "Android tablets in ride-hail vehicles serve verified ads. Advertisers pay in $OUTSIDE. Drivers earn in $OUTSIDE. Every impression proven.",
    role: "$OUTSIDE powers payments, rewards, and premium staking.",
    status: "Live — MVP focus",
  },
  {
    id: "outside",
    name: "Out-side",
    tag: "UPCOMING",
    tagColor: "rgba(255,255,255,0.35)",
    headline: "Ride-Hailing & Subscriptions",
    desc: "Riders earn $OUTSIDE cashback on completed trips. Drivers earn bonuses. Subscriptions payable in token.",
    role: "$OUTSIDE is the loyalty and settlement layer for mobility.",
    status: "Coming soon",
  },
  {
    id: "outleaf",
    name: "Out-leaf",
    tag: "UPCOMING",
    tagColor: "rgba(255,255,255,0.35)",
    headline: "Carbon Credits & Sustainability",
    desc: "Every EV trip creates verified emission reductions. Out-leaf converts those into carbon credits denominated in $OUTSIDE.",
    role: "$OUTSIDE is the settlement currency for every carbon credit.",
    status: "Coming soon",
  },
  {
    id: "outcharge",
    name: "Out-charge",
    tag: "UPCOMING",
    tagColor: "rgba(255,255,255,0.35)",
    headline: "EV Charging Infrastructure",
    desc: "Fleet chargers deployed across operator hubs. Charging sessions settled in $OUTSIDE. Hosts earn for providing infrastructure.",
    role: "$OUTSIDE settles every charging transaction.",
    status: "Coming soon",
  },
];

export default function EcosystemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="ecosystem" className="relative px-4 py-24 md:py-32 xl:px-20">
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
            <span className="text-[#00aeef] text-[11px] tracking-[0.16em] uppercase font-semibold">Ecosystem Alignment</span>
          </div>
          <h2
            className="text-[36px] md:text-[52px] text-white leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
          >
            Four products.{" "}<br className="hidden md:block" />
            <span className="text-[#00aeef]">One token.</span>
          </h2>
          <p className="text-white/50 text-[15px] leading-[1.7] max-w-[540px]">
            $OUTSIDE doesn't power one product. It powers the entire stack —
            from the screen in a vehicle to the carbon credit it creates.
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-[#0a1822] border border-white/6 rounded-[20px] p-7 flex flex-col gap-4 overflow-hidden hover:border-[#00aeef]/20 transition-all"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00aeef]/0 to-[#00aeef]/0 group-hover:from-[#00aeef]/5 group-hover:to-transparent transition-all pointer-events-none rounded-[20px]" />

              <div className="flex items-start justify-between relative z-10">
                <div className="flex flex-col gap-1.5">
                  <h3
                    className="text-white text-[22px] leading-none font-black tracking-tight"
                    style={{ fontFamily: "var(--font-mona-sans)" }}
                  >
                    {p.name}
                  </h3>
                  <span className="text-white/60 text-[14px] font-medium">{p.headline}</span>
                </div>
                <span
                  className="text-[10px] font-bold tracking-[0.12em] px-3 py-1.5 rounded-full border"
                  style={{
                    color: p.tagColor,
                    borderColor: `${p.tagColor}30`,
                    background: `${p.tagColor}10`,
                  }}
                >
                  {p.tag}
                </span>
              </div>

              <p className="text-white/45 text-[14px] leading-[1.65] relative z-10">{p.desc}</p>

              <div className="mt-auto pt-4 border-t border-white/6 relative z-10">
                <p className="text-[#00aeef]/70 text-[12px] font-medium leading-[1.5]">{p.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DePIN + RWA banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 bg-gradient-to-r from-[#00aeef]/10 via-[#00aeef]/5 to-transparent border border-[#00aeef]/20 rounded-[16px] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
        >
          <div className="flex-1">
            <p className="text-white text-[16px] md:text-[18px] font-semibold leading-[1.4]">
              This is{" "}
              <span className="text-[#00aeef]">DePIN</span>{" "}and{" "}
              <span className="text-[#00aeef]">RWA</span>{" "}infrastructure.
            </p>
            <p className="text-white/45 text-[14px] leading-[1.6] mt-2">
              Physical vehicles. Real trips. Verified data. $OUTSIDE is the token
              that makes all of it economically connected — and tradeable.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            {["DePIN", "RWA", "EV", "AI", "Data"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold tracking-[0.1em] px-3 py-1.5 rounded-full bg-[#00aeef]/10 border border-[#00aeef]/20 text-[#00aeef]/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
