"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const concepts = [
  {
    term: "DePIN",
    full: "Decentralised Physical Infrastructure Network",
    icon: "⬡",
    body: "DePIN is when real-world physical infrastructure — vehicles, chargers, sensors, screens — is economically powered by a token network instead of a single corporation. Participants who contribute physical infrastructure earn the token. The more the network grows, the more valuable the token becomes. Out Mobility is a DePIN company. Ecosystem Token is our DePIN token.",
    example: "Example: A driver installs an Out-door tablet in their vehicle. They contribute verified attention infrastructure to the network. They earn Ecosystem Token for every verified trip.",
  },
  {
    term: "RWA",
    full: "Real World Asset",
    icon: "◈",
    body: "RWA means bringing real-world value onto a blockchain. Instead of purely digital assets, RWA tokens are backed by something physical — like carbon credits, vehicle data, or verified advertising inventory. Out Mobility creates verified, measurable value in the physical world. Ecosystem Token is how that value is represented and traded.",
    example: "Example: An EV trip generates a verified emission reduction. Out-leaf converts that into a carbon credit. That credit is denominated in Ecosystem Token — a real-world asset, on-chain.",
  },
  {
    term: "Utility Token",
    full: "A token that does a real job",
    icon: "◎",
    body: "A utility token is different from a speculative coin. It has a specific job inside a specific ecosystem. Ecosystem Token is used to pay for advertising, earn driver rewards, stake for premium access, and settle cross-product transactions. Its value comes from its usefulness — not from hype.",
    example: "Example: An advertiser wants premium placement on Out-door. They stake Ecosystem Token. The staked tokens are locked, reducing circulating supply. The advertiser gets priority. Everyone benefits.",
  },
  {
    term: "The Ecosystem",
    full: "Why four products make one network",
    icon: "⊕",
    body: "Out-door, Out-side, Out-leaf, and Out-charge are not four separate companies. They are four layers of the same physical network — vehicles. Every product uses the same drivers, the same vehicles, and increasingly the same token. As each product launches, Ecosystem Token becomes more useful, more demanded, and more embedded in the daily operations of the network.",
    example: "Example: A driver uses Out-side to pick up passengers, earns Ecosystem Token in tips. Their vehicle shows Out-door ads and earns Ecosystem Token in rewards. Their EV charges through Out-charge, settled in Ecosystem Token. One vehicle. One driver. Three Ecosystem Token touch points.",
  },
];

export default function KnowledgeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState<string | null>(null);

  return (
    <section ref={ref} id="learn" className="relative px-4 py-24 md:py-32 xl:px-20">
      {/* Subtle bg */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,71,98,0.25) 0%, transparent 70%)" }} />

      <div className="max-w-[1200px] mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 mb-14 text-center items-center"
        >
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-[#00aeef] rounded-full" />
            <span className="text-[#00aeef] text-[11px] tracking-[0.16em] uppercase font-semibold">Ecosystem Hub</span>
            <span className="w-1 h-4 bg-[#00aeef] rounded-full" />
          </div>
          <h2
            className="text-[36px] md:text-[52px] text-white leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
          >
            Understand the{" "}<span className="text-[#00aeef]">language.</span>
          </h2>
          <p className="text-white/50 text-[15px] leading-[1.7] max-w-[480px]">
            Web3 has a lot of words. Here's what they actually mean in the
            context of Out Mobility.
          </p>
        </motion.div>

        {/* Concept cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {concepts.map((c, i) => (
            <motion.div
              key={c.term}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0a1822] border border-white/6 rounded-[16px] overflow-hidden cursor-pointer hover:border-[#00aeef]/20 transition-colors"
              onClick={() => setActive(active === c.term ? null : c.term)}
            >
              <div className="p-6 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="text-[#00aeef] text-[22px] flex-shrink-0 mt-0.5">{c.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white text-[18px] font-bold" style={{ fontFamily: "var(--font-cal-sans)" }}>
                        {c.term}
                      </h3>
                      <span className="text-white/35 text-[12px]">— {c.full}</span>
                    </div>
                  </div>
                </div>
                <motion.span
                  animate={{ rotate: active === c.term ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#00aeef]/60 text-[20px] flex-shrink-0 mt-0.5 font-light"
                >
                  +
                </motion.span>
              </div>

              <AnimatePresence>
                {active === c.term && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-white/6 pt-4 flex flex-col gap-3">
                      <p className="text-white/60 text-[14px] leading-[1.7]">{c.body}</p>
                      <div className="bg-[#00aeef]/8 border border-[#00aeef]/15 rounded-[10px] px-4 py-3">
                        <p className="text-[#00aeef]/80 text-[13px] leading-[1.6] italic">{c.example}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
