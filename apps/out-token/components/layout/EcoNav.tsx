"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Ride",      href: "https://out-mobility.vercel.app#ride"    },
  { label: "Drive",     href: "https://out-mobility.vercel.app#drive"   },
  { label: "Outdoor",   href: "https://out-mobility.vercel.app#outdoor" },
  { label: "Charge EV", href: "https://out-mobility.vercel.app#charge"  },
  { label: "CO₂",       href: "https://out-mobility.vercel.app#co2"     },
  { label: "About",     href: "https://out-mobility.vercel.app#about"   },
];

export default function EcoNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Desktop: bottom-docked pill ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="flex items-center gap-2 bg-[#004762] rounded-[16px] p-2.5"
          style={{
            boxShadow: "0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,174,239,0.12), 0 0 24px rgba(0,174,239,0.06)",
          }}
        >
          {/* OUT logo */}
          <a
            href="https://out-mobility.vercel.app"
            className="flex items-center justify-center w-[52px] h-[40px] bg-[#00aeef] hover:bg-[#00c4ff] rounded-[10px] flex-shrink-0 transition-colors"
          >
            <span
              className="text-white text-[12px] leading-none"
              style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900, letterSpacing: "0.04em" }}
            >
              OUT
            </span>
          </a>

          <div className="w-px h-5 bg-white/10" />

          {/* Ecosystem links */}
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 rounded-[8px] text-white/65 text-[13px] hover:text-white hover:bg-[#00364b] transition-all whitespace-nowrap leading-none"
              style={{ fontFamily: "var(--font-cal-sans)" }}
            >
              {link.label}
            </a>
          ))}

          <div className="w-px h-5 bg-white/10" />

          {/* OUT TOKEN — active */}
          <div className="flex items-center gap-1.5 bg-[#00aeef]/15 border border-[#00aeef]/25 px-3 py-2 rounded-[10px] flex-shrink-0">
            <span
              className="text-[#00aeef] text-[13px] leading-none"
              style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
            >
              OUT TOKEN
            </span>
            <svg width="11" height="11" viewBox="0 0 18 18" fill="none">
              <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile: bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="mx-3 mb-3"
        >
          {/* Drawer */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden mb-1 bg-[#004762] rounded-[14px]"
                style={{ boxShadow: "0 -4px 24px rgba(0,0,0,0.4)" }}
              >
                <div className="p-2 grid grid-cols-3 gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center px-2 py-3 rounded-[8px] text-white/65 text-[13px] hover:bg-[#00364b] hover:text-white transition-colors text-center"
                      style={{ fontFamily: "var(--font-cal-sans)" }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className="px-2 pb-2">
                  <a
                    href="https://out-mobility.vercel.app"
                    className="flex items-center justify-center gap-2 py-2.5 bg-white/5 rounded-[8px] text-white/50 text-[12px] hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}
                  >
                    outmobility.com ↗
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom pill */}
          <div
            className="flex items-center justify-between bg-[#004762] rounded-[14px] px-3 py-2.5"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,174,239,0.1)" }}
          >
            <a
              href="https://out-mobility.vercel.app"
              className="flex items-center justify-center w-9 h-9 bg-[#00aeef] rounded-[8px] flex-shrink-0"
            >
              <span
                className="text-white text-[10px] leading-none"
                style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
              >
                OUT
              </span>
            </a>

            <span
              className="text-[#00aeef] text-[13px]"
              style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
            >
              OUT TOKEN
            </span>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                className="block w-[18px] h-[1.5px] bg-white/70 rounded-full origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block w-[18px] h-[1.5px] bg-white/70 rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                className="block w-[18px] h-[1.5px] bg-white/70 rounded-full origin-center"
              />
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
