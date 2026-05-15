"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  { n: "01", label: "Backed by RWA" },
  { n: "02", label: "Agentic AI for Movement" },
  { n: "03", label: "Join 15K+ already OUT" },
  { n: "04", label: "Carbon-Market Ready Infra." },
];

export default function MetricsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-white px-4 py-8 md:px-8 md:py-16 xl:px-20 xl:pb-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Left: heading + feature cards */}
          <div className="flex flex-col gap-6 lg:w-[616px] lg:flex-shrink-0">
            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-heading text-[24px] lg:text-[32px] text-[#004762] tracking-[-0.02em] leading-[1.35]">
                Real utilities begin with{" "}
                <span className="text-[#00aeef]">Innovation.</span>
              </h2>
              <p className="text-[14px] lg:text-[16px] font-normal text-[#004762] leading-[1.6]">
                Our EVs aren't just cars. They're nodes. Every mile driven maps
                data, serves ads, balances the grid, and creates verifiable RWAs.
              </p>
            </motion.div>

            {/* 2×2 feature grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((f, i) => (
                <motion.div
                  key={f.n}
                  className="bg-[#f6fcff] rounded-2xl px-6 py-8 h-[80px] flex items-center gap-3"
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                >
                  <span className="font-body font-bold text-[#00aeef] text-[16px] tracking-[-0.02em] flex-shrink-0">
                    {f.n}
                  </span>
                  <span className="font-body font-semibold text-[#004762] text-[14px] lg:text-[16px] leading-[1.4]">
                    {f.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: aerial city image */}
          <motion.div
            className="w-full lg:w-[600px] lg:flex-shrink-0 h-[280px] md:h-[380px] lg:h-[446px] rounded-2xl lg:rounded-[24px] overflow-hidden"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <img
              src="/images/hero-city.jpg"
              alt="Out Mobility fleet — smart city infrastructure"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
