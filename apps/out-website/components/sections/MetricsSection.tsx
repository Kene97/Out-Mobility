"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CTAButton from "@/components/ui/CTAButton";

const metrics = [
  { value: "6,000+",   label: "Vehicles daily" },
  { value: "100,000+", label: "Passengers sees you daily" },
  { value: "1M+",      label: "Impressions daily" },
  { value: "97.59%",   label: "Speed to success rate" },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  },
});

export default function MetricsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="bg-white px-4 py-8 md:px-8 md:py-16 xl:px-20 xl:pb-20"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

          {/* ── Metrics grid ── */}
          <div className="grid grid-cols-2 gap-3 lg:w-[616px] lg:flex-shrink-0">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                variants={fadeUp(i * 0.08)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="bg-[#f6fcff] border border-[#cceffc] lg:border-0 rounded-xl lg:rounded-2xl p-4 lg:p-8 flex flex-col justify-center gap-1 h-[86px] lg:h-[104px]"
              >
                <p
                  className="text-[20px] lg:text-[24px] font-normal text-[#00aeef] leading-[1.3]"
                  style={{ fontFamily: "'Cal Sans', sans-serif" }}
                >
                  {m.value}
                </p>
                <p className="text-[12px] lg:text-[16px] font-semibold text-[#003a50] leading-tight">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Innovation text + CTA ── */}
          <motion.div
            className="flex flex-col gap-6 lg:w-[483px]"
            variants={fadeUp(0.18)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <div className="flex flex-col gap-2">
              <h2
                className="text-[24px] lg:text-[36px] text-[#003a50] tracking-[-0.02em] leading-[1.22]"
                style={{ fontFamily: "'Cal Sans', sans-serif" }}
              >
                Real utilities begin with{" "}
                <span className="text-[#00aeef]">Innovation.</span>
              </h2>
              <p className="text-[14px] lg:text-[16px] font-normal text-[#003a50] leading-[1.6]">
                Our EVs aren't just cars. They're nodes. Every mile driven maps
                data, serves ads, balances the grid, and creates verifiable
                RWAs.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <CTAButton>DOWNLOAD APP NOW</CTAButton>
              <p className="text-[12px] lg:text-[16px] font-medium text-[#00aeef]">
                No setup fees. Cancel anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
