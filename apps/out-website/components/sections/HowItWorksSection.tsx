"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CTAButton from "@/components/ui/CTAButton";
import { ASSETS } from "@/lib/assets";

const steps = [
  {
    n:    "01",
    step: "Step 1",
    title: "Create your campaign",
    desc:  "Set a name, budget, start and end date. No complicated setup.",
  },
  {
    n:    "02",
    step: "Step 2",
    title: "Upload your creative",
    desc:  "A short MP4 or image. Max 60 seconds. We handle delivery.",
  },
  {
    n:    "03",
    step: "Step 3",
    title: "Pick your target area",
    desc:  "Choose a city or custom radius. We show you how many vehicles are in range.",
  },
  {
    n:    "04",
    step: "Step 4",
    title: "Submit and go live",
    desc:  "We review your campaign within 24 hours. Once live, track every impression in real time.",
  },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="bg-[#f9fafb] px-4 py-10 md:px-8 md:py-16 xl:px-20 xl:py-20"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">

          {/* ── Left: image + heading ── */}
          <div className="flex flex-col gap-6 lg:w-[602px] lg:flex-shrink-0 lg:justify-center">
            {/* heading: mobile shows above image on mobile, after image on desktop */}
            <motion.h2
              className="text-[24px] lg:text-[36px] text-[#003a50] tracking-[-0.02em] leading-[1.3] lg:hidden"
              style={{ fontFamily: "'Cal Sans', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Get visible in over 6,000 moving vehicles in 3 minutes.
            </motion.h2>

            <motion.h2
              className="hidden lg:block text-[36px] text-[#003a50] tracking-[-0.02em] leading-[1.22]"
              style={{ fontFamily: "'Cal Sans', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Get visible in over 6,000 moving vehicles in 3 minutes.
            </motion.h2>

            {/* Dashboard image */}
            <motion.div
              className="w-full lg:w-[602px] h-[236px] lg:h-[493px] rounded-xl lg:rounded-[40px] overflow-hidden bg-[#f9fafb] relative"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <img
                src={ASSETS.dashboard}
                alt="Out-door advertiser dashboard showing campaign analytics"
                className="absolute w-full object-cover"
                style={{ top: "-9.19%", height: "118.38%", left: "0.01%", width: "99.99%" }}
              />
            </motion.div>
          </div>

          {/* ── Right: steps + CTA ── */}
          <div className="flex flex-col gap-3 lg:flex-1 lg:justify-between lg:min-h-[601px]">
            {/* Steps */}
            <div className="flex flex-col gap-1.5 lg:gap-2">
              {steps.map((s, i) => (
                <StepCard key={s.n} step={s} index={i} inView={inView} />
              ))}
            </div>

            {/* CTA card */}
            <motion.div
              className="bg-white rounded-xl lg:rounded-3xl p-4 lg:p-8"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
            >
              <div className="flex items-center justify-between gap-4">
                <p
                  className="text-[18px] lg:text-[24px] text-[#003a50] leading-[1.33]"
                  style={{ fontFamily: "'Cal Sans', sans-serif" }}
                >
                  Launch a campaign in 3 minutes
                </p>
                <CTAButton size="sm" className="flex-shrink-0 text-[14px] lg:text-[20px] px-5 lg:px-12 py-4 lg:py-6">
                  GET STARTED
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface StepCardProps {
  step: { n: string; step: string; title: string; desc: string };
  index: number;
  inView: boolean;
}

function StepCard({ step, index, inView }: StepCardProps) {
  return (
    <motion.div
      className="relative bg-white rounded-xl lg:rounded-2xl px-6 py-4 overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1 + index * 0.07,
      }}
    >
      {/* Step number watermark — partially clipped at right edge */}
      <span
        className="absolute top-0 text-[110px] leading-[124px] text-[#f6fcff] font-extralight tracking-[-0.02em] whitespace-nowrap select-none pointer-events-none"
        style={{
          right: "100px",
          transform: "translateX(100%)",
          fontFamily: "var(--font-barlow-condensed), 'Arial Narrow', Arial, sans-serif",
          fontWeight: 200,
        }}
        aria-hidden="true"
      >
        {step.n}
      </span>

      <div className="relative flex items-start gap-4">
        {/* Step badge — desktop only */}
        <span className="hidden lg:inline-flex items-center justify-center bg-[#f6fcff] text-[#003a50] text-[13px] font-normal px-4 py-2 rounded-full flex-shrink-0 whitespace-nowrap h-9">
          {step.step}
        </span>

        {/* Content */}
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-[14px] font-semibold text-[#003a50] leading-[1.43]">
            {step.title}
          </p>
          <p className="text-[12px] lg:text-[14px] font-normal text-[#003a50] leading-[1.57]">
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
