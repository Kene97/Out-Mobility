"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ValuePropSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white px-4 pb-8 pt-4 md:px-8 md:pt-8 xl:px-20">
      <div className="max-w-[1440px] mx-auto" ref={ref}>
        <motion.div
          className="relative bg-[#00aeef] rounded-[24px] md:rounded-[40px] overflow-hidden p-8 md:p-16 lg:p-20"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Noise overlay */}
          <div className="absolute inset-0 bg-black mix-blend-plus-lighter opacity-50 pointer-events-none" />

          {/* Grid pattern */}
          <GridPattern />

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-6 max-w-[883px]">
            <div className="flex flex-col">
              {[
                { text: "THE VALUE IS THE RWA", delay: 0.1 },
                { text: "WE TURN THE ENTIRE FLEET INTO A REAL WORLD DEPIN.", delay: 0.2 },
              ].map((line) => (
                <motion.p
                  key={line.text}
                  className="font-display font-black uppercase text-white text-[28px] md:text-[48px] lg:text-[72px] leading-[1.14]"
                  initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                  animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: line.delay }}
                >
                  {line.text}
                </motion.p>
              ))}
            </div>

            <motion.p
              className="font-body font-medium text-white text-[16px] md:text-[21px] leading-[1.7] capitalize"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
            >
              By tracking physical movement and converting it into verifiable on-chain data,
              we can create real revenue opportunities for everyone involved in riding,
              driving, and charging.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GridPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid-rwa" width="65" height="65" patternUnits="userSpaceOnUse">
          <path d="M 65 0 L 0 0 0 65" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-rwa)" />
    </svg>
  );
}
