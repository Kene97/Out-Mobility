"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ValuePropSection() {
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
          {/* Noise overlay */}
          <div className="absolute inset-0 bg-black mix-blend-plus-lighter opacity-50 pointer-events-none" />

          {/* Background grid pattern */}
          <GridPattern />

          <h2
            className="relative z-10 font-display font-black uppercase text-white"
            style={{ lineHeight: 1.14 }}
          >
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

function GridPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid" width="65" height="65" patternUnits="userSpaceOnUse">
          <path d="M 65 0 L 0 0 0 65" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}
