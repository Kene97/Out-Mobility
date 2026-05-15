"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Why",        href: "#why"        },
  { label: "Utility",    href: "#utility"    },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Ecosystem",  href: "#ecosystem"  },
  { label: "Roadmap",    href: "#roadmap"    },
  { label: "Community",  href: "#community"  },
  { label: "FAQ",        href: "#faq"        },
];

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#060e14]/95 backdrop-blur-sm border-b border-white/5">
      <div className="flex items-center justify-between px-4 md:px-8 h-[52px]">
        {/* Logo */}
        <a href="https://www.woutside.com" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#00aeef] rounded-[7px] flex items-center justify-center flex-shrink-0">
            <span
              className="text-white text-[11px] leading-none"
              style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900, letterSpacing: "0.04em" }}
            >
              OUT
            </span>
          </div>
          <span
            className="text-white/40 text-[12px] hidden sm:block"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            Out Mobility
          </span>
        </a>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://x.com/OutMobility"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 border border-white/10 hover:border-[#00aeef]/40 text-white/55 hover:text-white px-3 py-1.5 rounded-[8px] transition-all text-[12px]"
            style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 500 }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow on X
          </a>
          <a
            href="/whitepaper"
            className="flex items-center gap-1.5 bg-[#00aeef] hover:bg-[#00c4ff] text-white px-3 py-1.5 rounded-[8px] transition-colors text-[12px]"
            style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 600 }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v13M12 16l-4-4M12 16l4-4M4 20h16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Whitepaper
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 -mr-1 text-white/60 hover:text-white rounded-lg transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-[#060e14]/98"
          >
            <nav className="px-4 pt-3 pb-6 flex flex-col gap-1">

              {/* Section links grid */}
              <div className="grid grid-cols-3 gap-1 mb-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center py-3 px-2 text-[13px] font-medium text-white/60 rounded-lg hover:bg-white/5 hover:text-[#00aeef] transition-colors text-center"
                    style={{ fontFamily: "var(--font-cal-sans)" }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="border-t border-white/8 pt-3 flex flex-col gap-2">
                {/* Back to main site */}
                <a
                  href="https://www.woutside.com"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-3 text-[13px] font-medium text-white/50 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  woutside.com
                  <svg width="11" height="11" viewBox="0 0 18 18" fill="none">
                    <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {/* Follow on X */}
                <a
                  href="https://x.com/OutMobility"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-3 px-3 text-[13px] font-medium text-white/60 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Follow on X
                </a>

                {/* Whitepaper CTA */}
                <a
                  href="/whitepaper"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 px-3 text-[13px] font-semibold text-white bg-[#00aeef] rounded-lg hover:bg-[#00c4ff] transition-colors"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  Get Whitepaper
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
