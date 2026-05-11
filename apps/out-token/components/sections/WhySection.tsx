"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const points = [
  {
    icon: "⬡",
    title: "Fragmented networks need a shared currency.",
    body: "Four products. Thousands of vehicles. Millions of transactions. Without a shared token, value created in one part of the ecosystem cannot flow to another. $OUTSIDE fixes that.",
  },
  {
    icon: "◈",
    title: "Contributors deserve a stake in what they build.",
    body: "Drivers, operators, and community members make the network work. $OUTSIDE gives them a way to earn, hold, and participate in the value they help create — not just a cash payout.",
  },
  {
    icon: "◎",
    title: "Real infrastructure should have real token utility.",
    body: "This is not a speculation token. $OUTSIDE is the economic layer of a physical network — vehicles, screens, chargers, and verified data. The token earns its value by doing real work.",
  },
];

export default function WhySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="why" className="relative px-4 py-24 md:py-32 xl:px-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">

          {/* Left: label + heading */}
          <div className="lg:w-[420px] lg:flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-2">
                <span className="w-1 h-4 bg-[#00aeef] rounded-full" />
                <span className="text-[#00aeef] text-[11px] tracking-[0.16em] uppercase font-semibold">
                  Why this token
                </span>
              </div>
              <h2
                className="text-[36px] md:text-[48px] lg:text-[52px] text-white leading-[1.05] tracking-tight"
                style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
              >
                Infrastructure needs
                {" "}<span className="text-[#00aeef]">an engine.</span>
              </h2>
              <p className="text-white/55 text-[15px] leading-[1.7]">
                Out Mobility is not one product. It is an ecosystem. $OUTSIDE is the
                economic thread that runs through all of it — making the whole greater
                than the sum of its parts.
              </p>
            </motion.div>
          </div>

          {/* Right: points */}
          <div className="flex-1 flex flex-col gap-4">
            {points.map((pt, i) => (
              <motion.div
                key={pt.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#0a1822] border border-white/6 rounded-[16px] p-6 md:p-8 flex gap-5 hover:border-[#00aeef]/20 transition-colors"
              >
                <span className="text-[#00aeef] text-[22px] flex-shrink-0 mt-0.5">{pt.icon}</span>
                <div className="flex flex-col gap-2">
                  <p className="text-white text-[15px] md:text-[16px] font-semibold leading-[1.4]">
                    {pt.title}
                  </p>
                  <p className="text-white/50 text-[14px] leading-[1.65]">{pt.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
