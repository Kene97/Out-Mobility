"use client";

import { motion } from "framer-motion";
import CTAButton from "@/components/ui/CTAButton";

export default function HeroSection() {
  return (
    <section className="bg-white px-4 py-12 md:px-8 md:py-16 xl:px-20 xl:py-[72px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">

          {/* Left: big cyan headline */}
          <motion.div
            className="lg:w-[510px] lg:flex-shrink-0"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display font-black uppercase text-[#00aeef] text-[44px] md:text-[64px] lg:text-[88px] leading-[0.92]">
              POWERING THE FUTURE OF TRANSPORTATION
            </h1>
          </motion.div>

          {/* Right: subhead + body + CTA */}
          <motion.div
            className="flex flex-col gap-4 lg:w-[600px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          >
            <h2 className="font-heading text-[#004762] text-[22px] md:text-[28px] leading-[1.3]">
              The new Mobility OS.
            </h2>
            <p className="text-[15px] md:text-[18px] font-normal text-[#004762] leading-[1.6]">
              Cheap rides. Max vibes. 100% EV. Drivers earn more. Everything Onchain.
              Step out into comfort. AI-matched shared rides with people who actually
              vibe with you. Book in seconds. Pay with crypto or fiat. We outside.
            </p>
            <div className="mt-2">
              <CTAButton>LEARN MORE</CTAButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
