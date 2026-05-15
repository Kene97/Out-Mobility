"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Ride",      href: "#ride"    },
  { label: "Drive",     href: "#drive"   },
  { label: "Outdoor",   href: "/outdoor" },
  { label: "Charge EV", href: "#charge"  },
  { label: "CO₂",       href: "#co2"     },
  { label: "About",     href: "/about"   },
];

export default function EcoNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
            href="/"
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

          {/* Nav links */}
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-3 py-2 rounded-[8px] text-[13px] whitespace-nowrap leading-none transition-all ${
                pathname === link.href
                  ? "bg-[#00aeef]/15 border border-[#00aeef]/25 text-[#00aeef]"
                  : "text-white/65 hover:text-white hover:bg-white/8"
              }`}
              style={{ fontFamily: "var(--font-cal-sans)" }}
            >
              {link.label}
            </a>
          ))}

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
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden mb-1 bg-[#003a50] rounded-[14px]"
                style={{ boxShadow: "0 -4px 24px rgba(0,0,0,0.2)" }}
              >
                <div className="p-2 grid grid-cols-3 gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-center px-2 py-3 rounded-[8px] text-[13px] text-center transition-colors ${
                        pathname === link.href
                          ? "bg-[#00aeef]/15 text-[#00aeef]"
                          : "text-white/65 hover:bg-white/8 hover:text-white"
                      }`}
                      style={{ fontFamily: "var(--font-cal-sans)" }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className="px-2 pb-2 flex flex-col gap-1">
                  <a
                    href="https://token.woutside.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-white/5 rounded-[8px] text-[#00aeef]/80 text-[12px] hover:text-[#00aeef] transition-colors"
                    style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 500 }}
                  >
                    OUT TOKEN ↗
                  </a>
                  <div className="border-t border-white/8 mt-1 pt-1 flex flex-col gap-1">
                    <a
                      href="https://x.com/OutMobility"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] text-white/65 text-[13px] hover:bg-white/8 hover:text-white transition-colors"
                      style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 500 }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      Follow on X
                    </a>
                    <a
                      href="https://token.woutside.com/whitepaper"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 py-2.5 bg-[#00aeef] rounded-[8px] text-white text-[13px] font-semibold hover:bg-[#00c4ff] transition-colors"
                      style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 600 }}
                    >
                      Get Whitepaper
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="flex items-center justify-between bg-[#003a50] rounded-[14px] px-3 py-2.5"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,58,80,0.5)" }}
          >
            <a href="/" className="flex items-center justify-center w-9 h-9 bg-[#00aeef] rounded-[8px] flex-shrink-0">
              <span className="text-white text-[10px] leading-none" style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}>OUT</span>
            </a>

            <span className="text-white/60 text-[12px]" style={{ fontFamily: "var(--font-cal-sans)" }}>
              {navLinks.find((l) => l.href === pathname)?.label ?? "Menu"}
            </span>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }} className="block w-[18px] h-[1.5px] bg-white/60 rounded-full origin-center" />
              <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} className="block w-[18px] h-[1.5px] bg-white/60 rounded-full" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }} className="block w-[18px] h-[1.5px] bg-white/60 rounded-full origin-center" />
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
