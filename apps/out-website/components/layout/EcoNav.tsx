"use client";

import { motion } from "framer-motion";

export default function EcoNav() {
  return (
    <>
      {/* ── Desktop: bottom-docked pill ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="flex items-center gap-2 bg-[#003a50] rounded-[16px] p-2.5"
          style={{
            boxShadow: "0 8px 40px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,58,80,0.5), 0 0 24px rgba(0,174,239,0.05)",
          }}
        >
          {/* OUT logo */}
          <a
            href="/outdoor"
            className="flex items-center justify-center h-[40px] flex-shrink-0 transition-opacity hover:opacity-80"
          >
            <img src="/logo-blue.png" alt="Out Mobility" className="h-[36px] w-auto object-contain rounded-[8px]" />
          </a>

          <div className="w-px h-5 bg-white/10" />

          {/* OUT TOKEN link */}
          <a
            href="https://token.woutside.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-white/5 border border-white/10 hover:border-[#00aeef]/30 hover:bg-[#00aeef]/10 px-3 py-2 rounded-[10px] flex-shrink-0 transition-all"
          >
            <span
              className="text-white/70 text-[13px] leading-none hover:text-[#00aeef]"
              style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
            >
              OUT TOKEN
            </span>
            <svg width="11" height="11" viewBox="0 0 18 18" fill="none">
              <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* ── Mobile: bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="mx-3 mb-3"
        >
          <div
            className="flex items-center justify-between bg-[#003a50] rounded-[14px] px-3 py-2.5"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,58,80,0.5)" }}
          >
            <a href="/outdoor" className="flex items-center justify-center w-9 h-9 flex-shrink-0">
              <img src="/logo-blue.png" alt="Out Mobility" className="h-8 w-auto object-contain rounded-[6px]" />
            </a>

            <a
              href="https://token.woutside.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white/5 border border-white/10 hover:border-[#00aeef]/30 px-3 py-2 rounded-[10px] transition-all"
            >
              <span
                className="text-white/70 text-[12px] leading-none"
                style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
              >
                OUT TOKEN
              </span>
              <svg width="10" height="10" viewBox="0 0 18 18" fill="none">
                <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
}
