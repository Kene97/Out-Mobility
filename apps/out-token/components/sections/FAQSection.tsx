"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is $OUTSIDE?",
    a: "$OUTSIDE is the utility token of the Out Mobility ecosystem. It powers advertising payments, driver rewards, cross-product settlement, and governance across Out-door, Out-side, Out-leaf, and Out-charge.",
  },
  {
    q: "Has the token launched yet?",
    a: "No. $OUTSIDE has not launched. There are no tokens in circulation, no trading pairs, and no exchange listings. Anyone claiming otherwise is not associated with Out Mobility.",
  },
  {
    q: "Is $OUTSIDE on any exchange?",
    a: "No. When exchange listings happen, they will be announced exclusively through the official Out Mobility website and @OutMobility on X. Do not trust any other source.",
  },
  {
    q: "What products does $OUTSIDE support?",
    a: "All four Out Mobility products: Out-door (in-car advertising), Out-side (ride-hailing), Out-leaf (carbon credits), and Out-charge (EV charging). Each product has its own $OUTSIDE integration — payments, rewards, or settlement.",
  },
  {
    q: "Is this a DePIN or RWA token?",
    a: "Both. DePIN because it powers a physical infrastructure network of real vehicles. RWA because the value it represents — verified impressions, carbon credits, charging data — are real-world assets brought on-chain.",
  },
  {
    q: "What is the total supply?",
    a: "1,000,000,000 $OUTSIDE (1 billion). Fixed. No inflation. No new tokens can be created after the Token Generation Event (TGE). All allocation figures are currently proposed and subject to finalisation.",
  },
  {
    q: "How do I get early access?",
    a: "Sign up for the Out Mobility waitlist at out-mobility.vercel.app. Waitlist members will have priority access to the public distribution event when it launches.",
  },
  {
    q: "Why should the community follow now?",
    a: "The community building before launch will be first in line when $OUTSIDE goes live. Early followers get direct notification before the TGE, priority waitlist access, and will see the roadmap unfold in real time.",
  },
  {
    q: "Is this financial advice or a guaranteed investment?",
    a: "No. Nothing on this site is financial advice. $OUTSIDE carries real risk including total loss of value. Only participate with funds you can afford to lose. See our full disclaimer for detail.",
  },
  {
    q: "Where will updates be posted?",
    a: "All meaningful updates — milestones, TGE date, exchange listings, ecosystem launches — will be posted on @OutMobility on X and emailed to the waitlist community first.",
  },
];

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} id="faq" className="relative px-4 py-24 md:py-32 xl:px-20">
      <div className="max-w-[800px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 mb-14 text-center items-center"
        >
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-[#00aeef] rounded-full" />
            <span className="text-[#00aeef] text-[11px] tracking-[0.16em] uppercase font-semibold">FAQ</span>
            <span className="w-1 h-4 bg-[#00aeef] rounded-full" />
          </div>
          <h2
            className="text-[36px] md:text-[52px] text-white leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
          >
            Simple questions.{" "}<br />
            <span className="text-[#00aeef]">Straight answers.</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-[#0a1822] border rounded-[14px] overflow-hidden cursor-pointer transition-colors"
              style={{ borderColor: open === i ? "rgba(0,174,239,0.3)" : "rgba(255,255,255,0.06)" }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <span className="text-white text-[15px] font-medium leading-[1.4]">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: open === i ? "rgba(0,174,239,0.4)" : undefined }}
                >
                  <span className="text-white/50 text-[16px] font-light leading-none"
                    style={{ color: open === i ? "#00aeef" : undefined }}>
                    +
                  </span>
                </motion.div>
              </div>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-white/55 text-[14px] leading-[1.7] border-t border-white/5 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
