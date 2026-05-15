"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import OutLogo from "@/components/ui/OutLogo";

const navLinks = [
  { label: "Advertise",    href: "/advertise"    },
  { label: "Fleet",        href: "/fleet"        },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing",      href: "/pricing"      },
  { label: "Blog",         href: "/blog"         },
  { label: "Contact",      href: "/contact"      },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-[0_1px_0_0_#e5e7eb]" : ""
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 xl:px-20 max-w-[1440px] mx-auto h-[72px]">
        <a href="/" className="flex items-center">
          <OutLogo size={44} />
        </a>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://x.com/OutMobility"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 border border-[#003a50]/15 hover:border-[#00aeef]/40 text-[#003a50]/60 hover:text-[#00aeef] px-4 py-2 rounded-[10px] transition-all text-[13px]"
            style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 500 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow on X
          </a>
          <a
            href="https://token.woutside.com/whitepaper"
            className="flex items-center gap-1.5 bg-[#003a50] hover:bg-[#00aeef] text-white px-4 py-2 rounded-[10px] transition-colors text-[13px]"
            style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 600 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v13M12 16l-4-4M12 16l4-4M4 20h16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Get Whitepaper
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 -mr-2 text-[#003a50] rounded-lg hover:bg-[#f6fcff] transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} strokeWidth={1.75} /> : <Menu size={24} strokeWidth={1.75} />}
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
            className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <nav className="px-4 pt-3 pb-6 flex flex-col gap-1">

              {/* Section nav links */}
              <div className="grid grid-cols-3 gap-1 mb-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center py-3 px-2 text-[13px] font-medium text-[#003a50]/70 rounded-lg hover:bg-[#f6fcff] hover:text-[#00aeef] transition-colors text-center"
                    style={{ fontFamily: "var(--font-cal-sans)" }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                {/* OUT TOKEN */}
                <a
                  href="https://token.woutside.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-3 text-[13px] font-semibold text-[#003a50] rounded-lg hover:bg-[#f6fcff] transition-colors"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  OUT TOKEN
                  <svg width="11" height="11" viewBox="0 0 18 18" fill="none">
                    <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="#003a50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {/* Follow on X */}
                <a
                  href="https://x.com/OutMobility"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-3 px-3 text-[14px] font-medium text-[#003a50] rounded-lg hover:bg-[#f6fcff] transition-colors"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#003a50]/60">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Follow on X
                </a>

                {/* Get Whitepaper */}
                <a
                  href="https://token.woutside.com/whitepaper"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 px-3 text-[14px] font-semibold text-white bg-[#003a50] rounded-lg hover:bg-[#00aeef] transition-colors"
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
