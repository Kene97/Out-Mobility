"use client";

import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Desktop nav (Figma design) ── */}
      <div className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-center pt-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 bg-[#004762] rounded-[16px] p-3"
          style={{
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,174,239,0.15)"
              : "0 4px 16px rgba(0,0,0,0.3)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* OUT logo square */}
          <a
            href="https://out-mobility.vercel.app"
            className="relative flex items-center justify-center w-[72px] h-[56px] bg-[#222] rounded-[8px] overflow-hidden flex-shrink-0"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[48px] h-[48px] bg-[#00aeef] rounded-[7px] flex items-center justify-center">
                <span
                  className="text-white text-[15px] leading-none"
                  style={{
                    fontFamily: "var(--font-mona-sans), 'Arial Narrow', Arial, sans-serif",
                    fontWeight: 900,
                    letterSpacing: "0.04em",
                  }}
                >
                  OUT
                </span>
              </div>
            </div>
          </a>

          {/* Ecosystem links group */}
          <div className="flex items-center gap-2 bg-[#00364b] h-[56px] px-2 rounded-[8px]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-3 rounded-[8px] border border-[#004762] text-white text-[16px] leading-none whitespace-nowrap hover:bg-[#004762] hover:border-[#00aeef]/30 transition-all"
                style={{ fontFamily: "var(--font-cal-sans), system-ui, sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* $OUTSIDE CTA — active state (we're on the token site) */}
          <div className="flex items-center gap-2 bg-[#00364b] border border-[#004762] h-[56px] px-5 rounded-[8px] flex-shrink-0">
            <span
              className="text-[#00aeef] text-[18px] font-black tracking-tight"
              style={{ fontFamily: "var(--font-mona-sans), 'Arial Narrow', Arial, sans-serif", fontWeight: 900 }}
            >
              $OUTSIDE
            </span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[#00aeef]">
              <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile nav ── */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mx-3 mt-3 bg-[#004762] rounded-[14px] px-3 py-2.5"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
        >
          {/* Logo */}
          <a href="https://out-mobility.vercel.app" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#00aeef] rounded-[8px] flex items-center justify-center">
              <span
                className="text-white text-[12px] leading-none"
                style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
              >
                OUT
              </span>
            </div>
          </a>

          {/* Token badge */}
          <span
            className="text-[#00aeef] text-[15px] font-black tracking-tight"
            style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
          >
            $OUTSIDE
          </span>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px] bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-white rounded-full"
            />
          </button>
        </motion.div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mx-3 mt-1 bg-[#004762] rounded-[14px]"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
            >
              <div className="p-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-[8px] text-white text-[16px] hover:bg-[#00364b] transition-colors"
                    style={{ fontFamily: "var(--font-cal-sans)" }}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-1 pt-2 border-t border-white/10">
                  <a
                    href="https://x.com/OutMobility"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 rounded-[8px] bg-[#00aeef]/10 text-[#00aeef] hover:bg-[#00aeef]/20 transition-colors"
                  >
                    <span className="font-semibold text-[15px]">Follow @OutMobility</span>
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
