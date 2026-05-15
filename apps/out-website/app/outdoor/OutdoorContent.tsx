"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import CTAButton from "@/components/ui/CTAButton";
import { ASSETS } from "@/lib/assets";

// ─── Hero ──────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

function OutdoorHero() {
  return (
    <section className="bg-white px-4 py-12 md:px-8 md:py-16 xl:px-20 xl:py-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">

          {/* Text */}
          <div className="flex flex-col gap-4 lg:w-[485px] lg:flex-shrink-0">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
              <h1 className="font-display font-black uppercase leading-none text-[#003a50]">
                <span className="block text-[48px] md:text-[64px] lg:text-[72px] leading-[0.92]">
                  GET VISIBLE IN 6,000+ VEHICLES
                </span>
                <span className="block text-[56px] md:text-[80px] lg:text-[98px] leading-none mt-1">
                  IN{" "}
                  <span className="text-[#00aeef]">3 MINUTES</span>
                </span>
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.1} className="flex flex-col gap-1">
              <p className="font-heading text-[16px] md:text-[20px] font-semibold text-[#00aeef] leading-[1.5]">
                Connect your ads to passengers in 3 minutes.
              </p>
              <p className="text-[14px] md:text-[16px] font-normal text-[#003a50] leading-[1.6]">
                Just plug-n-play, no middleman. Every impression proven and
                verified in-app — not guessed.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.2} className="flex flex-col gap-2">
              <CTAButton>LAUNCH YOUR FIRST CAMPAIGN</CTAButton>
              <p className="text-[12px] md:text-[16px] font-medium text-[#00aeef]">
                No setup fees. Cancel anytime.
              </p>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            className="w-full lg:flex-1 lg:max-w-[652px] h-[271px] md:h-[380px] lg:h-[481px] rounded-2xl lg:rounded-[32px] overflow-hidden relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            <img
              src={ASSETS.heroDesktop}
              alt="In-car advertising tablet showing Out-door platform"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Value Prop ────────────────────────────────────────────────────────────────

function OutdoorValueProp() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white px-4 pb-8 pt-16 md:px-8 md:pt-20 xl:px-20">
      <div className="max-w-[1440px] mx-auto" ref={ref}>
        <motion.div
          className="relative bg-[#00aeef] rounded-[24px] md:rounded-[40px] overflow-hidden p-6 md:p-12 lg:p-20"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-black mix-blend-plus-lighter opacity-50 pointer-events-none" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
            <defs>
              <pattern id="outdoor-vp-grid" width="65" height="65" patternUnits="userSpaceOnUse">
                <path d="M 65 0 L 0 0 0 65" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#outdoor-vp-grid)" />
          </svg>

          <h2 className="relative z-10 font-display font-black uppercase text-white" style={{ lineHeight: 1.14 }}>
            {[
              { text: "We make in-vehicle advertising", size: "text-[32px] md:text-[52px] lg:text-[72px]", delay: 0.12 },
              { text: "QUICK, reliable, measurable, and scalable.", size: "text-[36px] md:text-[56px] lg:text-[72px]", delay: 0.22 },
            ].map((line) => (
              <motion.span
                key={line.text}
                className={`block ${line.size}`}
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: line.delay }}
              >
                {line.text}
              </motion.span>
            ))}
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Metrics ───────────────────────────────────────────────────────────────────

const metrics = [
  { label: "Vehicles daily",           raw: 6000,  fmt: (n: number) => `${Math.round(n).toLocaleString()}+` },
  { label: "Passengers see you daily", raw: 100000, fmt: (n: number) => `${Math.round(n).toLocaleString()}+` },
  { label: "Impressions daily",        raw: 1,     fmt: (n: number) => `${n.toFixed(n < 1 ? 1 : 0)}M+` },
  { label: "Speed to success rate",    raw: 97.59, fmt: (n: number) => `${n.toFixed(2)}%` },
];

function Counter({ raw, fmt, inView, delay }: { raw: number; fmt: (n: number) => string; inView: boolean; delay: number }) {
  const [display, setDisplay] = useState(fmt(0));

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(fmt(raw * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, raw, fmt, delay]);

  return <>{display}</>;
}

function OutdoorMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-white px-4 py-8 md:px-8 md:py-16 xl:px-20 xl:pb-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

          <div className="grid grid-cols-2 gap-3 lg:w-[616px] lg:flex-shrink-0">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#f6fcff] border border-[#cceffc] lg:border-0 rounded-xl lg:rounded-2xl p-4 lg:p-8 flex flex-col justify-center gap-1 h-[86px] lg:h-[104px]"
              >
                <p className="font-heading text-[20px] lg:text-[24px] font-normal text-[#00aeef] leading-[1.3] tabular-nums">
                  <Counter raw={m.raw} fmt={m.fmt} inView={inView} delay={i * 0.09} />
                </p>
                <p className="text-[12px] lg:text-[16px] font-semibold text-[#003a50] leading-tight">{m.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex flex-col gap-6 lg:w-[483px]"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-[24px] lg:text-[36px] text-[#003a50] tracking-[-0.02em] leading-[1.22]">
                Real utilities begin with{" "}
                <span className="text-[#00aeef]">Innovation.</span>
              </h2>
              <p className="text-[14px] lg:text-[16px] font-normal text-[#003a50] leading-[1.6]">
                Our EVs aren't just cars. They're nodes. Every mile driven maps
                data, serves ads, balances the grid, and creates verifiable RWAs.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <CTAButton>DOWNLOAD APP NOW</CTAButton>
              <p className="text-[12px] lg:text-[16px] font-medium text-[#00aeef]">No setup fees. Cancel anytime.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ──────────────────────────────────────────────────────────────

const steps = [
  { n: "01", step: "Step 1", title: "Create your campaign",  desc: "Set a name, budget, start and end date. No complicated setup." },
  { n: "02", step: "Step 2", title: "Upload your creative",  desc: "A short MP4 or image. Max 60 seconds. We handle delivery." },
  { n: "03", step: "Step 3", title: "Pick your target area", desc: "Choose a city or custom radius. We show you how many vehicles are in range." },
  { n: "04", step: "Step 4", title: "Submit and go live",    desc: "We review your campaign within 24 hours. Once live, track every impression in real time." },
];

function StepCard({ step, index, inView }: { step: typeof steps[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      className="relative bg-white rounded-xl lg:rounded-2xl px-6 py-4 overflow-hidden"
      initial={{ opacity: 0, x: 32, y: 8 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 + index * 0.09 }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
    >
      <span
        className="absolute top-0 text-[110px] leading-[124px] text-[#f6fcff] font-extralight tracking-[-0.02em] whitespace-nowrap select-none pointer-events-none"
        style={{ right: "100px", transform: "translateX(100%)", fontFamily: "var(--font-mona-sans)", fontWeight: 200 }}
        aria-hidden="true"
      >
        {step.n}
      </span>
      <div className="relative flex items-start gap-4">
        <span className="hidden lg:inline-flex items-center justify-center bg-[#f6fcff] text-[#003a50] text-[13px] font-normal px-4 py-2 rounded-full flex-shrink-0 whitespace-nowrap h-9">
          {step.step}
        </span>
        <div className="flex flex-col gap-1 flex-1">
          <h3 className="text-[14px] font-semibold text-[#003a50] leading-[1.43]">{step.title}</h3>
          <p className="text-[12px] lg:text-[14px] font-normal text-[#003a50] leading-[1.57]">{step.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function OutdoorHowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section ref={ref} className="bg-[#f9fafb] px-4 py-10 md:px-8 md:py-16 xl:px-20 xl:py-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">

          <div className="flex flex-col gap-6 lg:w-[602px] lg:flex-shrink-0 lg:justify-center">
            <motion.h2
              className="font-heading text-[24px] lg:text-[36px] text-[#003a50] tracking-[-0.02em] leading-[1.3]"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Get visible in over 6,000 moving vehicles in 3 minutes.
            </motion.h2>

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

          <div className="flex flex-col gap-3 lg:flex-1 lg:justify-between lg:min-h-[601px]">
            <div className="flex flex-col gap-1.5 lg:gap-2">
              {steps.map((s, i) => <StepCard key={s.n} step={s} index={i} inView={inView} />)}
            </div>

            <motion.div
              className="bg-white rounded-xl lg:rounded-3xl p-4 lg:p-8"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-heading text-[18px] lg:text-[24px] text-[#003a50] leading-[1.33]">
                  Launch a campaign in 3 minutes
                </p>
                <CTAButton className="flex-shrink-0">GET STARTED</CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Root export ───────────────────────────────────────────────────────────────

export default function OutdoorContent() {
  return (
    <>
      <OutdoorHero />
      <OutdoorValueProp />
      <OutdoorMetrics />
      <OutdoorHowItWorks />
    </>
  );
}
