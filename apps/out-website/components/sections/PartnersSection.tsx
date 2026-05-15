"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  { src: "/images/about/partner-1.png", alt: "Pinecone" },
  { src: "/images/about/partner-2.png", alt: "Solana" },
  { src: "/images/about/partner-3.png", alt: "Cardano Foundation" },
  { src: "/images/about/partner-4.png", alt: "DeCharge" },
  { src: "/images/about/partner-5.png", alt: "Ethereum Foundation" },
  { src: "/images/bep20-logo.png",      alt: "BEP20" },
];

export default function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="px-4 pb-8 md:px-8 xl:px-20">
      <div className="max-w-[1440px] mx-auto" ref={ref}>
        <motion.div
          className="bg-[#f6f6f6] rounded-lg px-6 md:px-12 lg:px-16 py-6 flex flex-wrap items-center justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {partners.map((p) => (
            <img
              key={p.alt}
              src={p.src}
              alt={p.alt}
              className="object-contain h-7 md:h-9 opacity-75"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
