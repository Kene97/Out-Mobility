"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const utilities = [
  {
    tag: "PAYMENTS",
    icon: "◈",
    title: "Advertising Payments",
    body: "Brands and advertisers pay for verified in-car impressions using $OUTSIDE. Recurring. Real. Demand-driven.",
    product: "Out-door",
    productColor: "#00aeef",
  },
  {
    tag: "REWARDS",
    icon: "⬡",
    title: "Driver & Operator Rewards",
    body: "Every driver who runs ads, every operator who grows the fleet — they earn $OUTSIDE for their contribution to the network.",
    product: "All Products",
    productColor: "#00aeef",
  },
  {
    tag: "STAKING",
    icon: "◎",
    title: "Premium Access Staking",
    body: "Advertisers who stake $OUTSIDE unlock priority placement, advanced targeting, and early inventory access.",
    product: "Out-door",
    productColor: "#00aeef",
  },
  {
    tag: "SETTLEMENT",
    icon: "⊕",
    title: "Cross-Product Settlement",
    body: "Rides, carbon credits, EV charging — every transaction across the ecosystem settles through $OUTSIDE.",
    product: "Out-side · Out-leaf · Out-charge",
    productColor: "#00aeef",
  },
  {
    tag: "GOVERNANCE",
    icon: "⊗",
    title: "Ecosystem Governance",
    body: "Token holders will participate in key ecosystem decisions as the network matures. Stake in the outcome, voice in the direction.",
    product: "Ecosystem",
    productColor: "#00aeef",
  },
  {
    tag: "DATA",
    icon: "⊞",
    title: "Data Marketplace Access",
    body: "Future: verified mobility data — routes, audiences, patterns — accessible to researchers and planners using $OUTSIDE.",
    product: "Coming soon",
    productColor: "rgba(255,255,255,0.3)",
  },
];

export default function UtilitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="utility" className="relative px-4 py-24 md:py-32 xl:px-20">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,174,239,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 mb-14 text-center items-center"
        >
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-[#00aeef] rounded-full" />
            <span className="text-[#00aeef] text-[11px] tracking-[0.16em] uppercase font-semibold">Token Utility</span>
            <span className="w-1 h-4 bg-[#00aeef] rounded-full" />
          </div>
          <h2
            className="text-[36px] md:text-[52px] text-white leading-[1.05] tracking-tight max-w-[640px]"
            style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
          >
            What{" "}<span className="text-[#00aeef]">$OUTSIDE</span>{" "}actually does.
          </h2>
          <p className="text-white/50 text-[15px] leading-[1.7] max-w-[520px]">
            A token without utility is just a number. Every function below is tied to
            a real product, a real transaction, a real contributor.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {utilities.map((u, i) => (
            <motion.div
              key={u.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-[#0a1822] border border-white/6 rounded-[16px] p-6 flex flex-col gap-4 hover:border-[#00aeef]/25 hover:bg-[#0d1f2e] transition-all"
            >
              <div className="flex items-start justify-between">
                <span className="text-[#00aeef] text-[24px]">{u.icon}</span>
                <span className="text-[10px] tracking-[0.14em] text-[#00aeef]/60 font-semibold bg-[#00aeef]/8 px-2.5 py-1 rounded-full border border-[#00aeef]/15">
                  {u.tag}
                </span>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-white text-[16px] font-semibold leading-[1.3]">{u.title}</h3>
                <p className="text-white/50 text-[13px] leading-[1.65]">{u.body}</p>
              </div>
              <div className="pt-2 border-t border-white/6">
                <span className="text-[11px] font-medium" style={{ color: u.productColor }}>
                  {u.product}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
