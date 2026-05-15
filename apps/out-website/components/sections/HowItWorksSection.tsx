"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section
      ref={ref}
      className="bg-[#f9fafb] px-4 py-10 md:px-8 md:py-16 xl:px-20 xl:py-20"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">

          {/* ── Left: heading + image ── */}
          <div className="flex flex-col gap-6 lg:w-[602px] lg:flex-shrink-0 lg:justify-center">
            <motion.h2
              className="font-heading text-[24px] lg:text-[36px] text-[#003a50] tracking-[-0.02em] leading-[1.3]"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Get visible in over 6,000 moving vehicles in 3 minutes.
            </motion.h2>

            {/* Dashboard image — with parallax */}
            <motion.div
              ref={imgRef}
              className="w-full lg:w-[602px] h-[236px] lg:h-[493px] rounded-xl lg:rounded-[40px] overflow-hidden bg-[#f9fafb] relative"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <motion.img
                src={ASSETS.dashboard}
                alt="Passengers in a vehicle viewing the Out-door in-car screen"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ y: imgY, scale: 1.08 }}
              />
            </motion.div>
          </div>

          {/* ── Right: steps + CTA ── */}
          <div className="flex flex-col gap-3 lg:flex-1 lg:justify-between lg:min-h-[601px]">
            <div className="flex flex-col gap-1.5 lg:gap-2">
              {steps.map((s, i) => (
                <StepCard key={s.n} step={s} index={i} inView={inView} />
              ))}
            </div>

            <motion.div
              className="bg-white rounded-xl lg:rounded-3xl p-4 lg:p-8"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-heading text-[18px] lg:text-[24px] text-[#003a50] leading-[1.33]">
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
      initial={{ opacity: 0, x: 32, y: 8 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.12 + index * 0.09,
      }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
    >
      {/* Step number watermark — partially clipped at right edge */}
      <span
        className="absolute top-0 text-[110px] leading-[124px] text-[#f6fcff] font-extralight tracking-[-0.02em] whitespace-nowrap select-none pointer-events-none"
        style={{
          right: "100px",
          transform: "translateX(100%)",
          fontFamily: "var(--font-mona-sans), 'Arial Narrow', Arial, sans-serif",
          fontWeight: 200,
        }}
        aria-hidden="true"
      >
        {step.n}
      </span>

      <div className="relative flex items-start gap-4">
        <span className="hidden lg:inline-flex items-center justify-center bg-[#f6fcff] text-[#003a50] text-[13px] font-normal px-4 py-2 rounded-full flex-shrink-0 whitespace-nowrap h-9">
          {step.step}
        </span>
        <div className="flex flex-col gap-1 flex-1">
          <h3 className="text-[14px] font-semibold text-[#003a50] leading-[1.43]">
            {step.title}
          </h3>
          <p className="text-[12px] lg:text-[14px] font-normal text-[#003a50] leading-[1.57]">
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
