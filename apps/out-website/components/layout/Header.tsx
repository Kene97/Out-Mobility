"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import OutLogo from "@/components/ui/OutLogo";
import AppStoreBadges from "@/components/ui/AppStoreBadges";

const footerLinks = ["Blog", "Investor relation", "Privacy", "Accessibility", "Terms"];

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
      {/* Main bar */}
      <div className="flex items-center justify-between px-4 md:px-8 xl:px-20 max-w-[1440px] mx-auto h-[72px]">
        <a href="/" className="flex items-center">
          <OutLogo size={44} />
        </a>

        {/* Desktop: App Store badges */}
        <div className="hidden md:flex">
          <AppStoreBadges />
        </div>

        {/* Mobile: hamburger */}
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
            <nav className="px-4 pt-4 pb-6 flex flex-col gap-1">
              {footerLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="py-3 px-2 text-[14px] font-medium text-[#003a50] rounded-lg hover:bg-[#f6fcff] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100 mt-2">
                <AppStoreBadges size="sm" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
