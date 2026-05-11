"use client";

import { motion } from "framer-motion";
import CTAButton from "@/components/ui/CTAButton";
import { ASSETS } from "@/lib/assets";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function HeroSection() {
  return (
    <section className="bg-white px-4 py-12 md:px-8 md:py-16 xl:px-20 xl:py-16 max-w-[1440px] mx-auto">
      <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">

        {/* ── Text column ── */}
        <div className="flex flex-col gap-4 lg:w-[485px] lg:flex-shrink-0">

          {/* Headline */}
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

          {/* Sub-headline + body */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="flex flex-col gap-1"
          >
            <p className="font-heading text-[16px] md:text-[20px] font-semibold text-[#00aeef] leading-[1.5]">
              Connect your ads to passengers in 3 minutes.
            </p>
            <p className="text-[14px] md:text-[16px] font-normal text-[#003a50] leading-[1.6]">
              Just plug-n-play, no middleman. Every impression proven and
              verified in-app — not guessed.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="flex flex-col gap-2"
          >
            <CTAButton fullWidth className="text-[16px] md:text-[20px] py-5 md:py-6">
              LAUNCH YOUR FIRST CAMPAIGN
            </CTAButton>
            <p className="text-[12px] md:text-[16px] font-medium text-[#00aeef]">
              No setup fees. Cancel anytime.
            </p>
          </motion.div>
        </div>

        {/* ── Hero image ── */}
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
          <img
            src={ASSETS.heroOverlay}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
