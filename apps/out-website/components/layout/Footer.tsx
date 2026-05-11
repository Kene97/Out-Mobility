import { ASSETS } from "@/lib/assets";
import AppStoreBadges from "@/components/ui/AppStoreBadges";

const footerLinks = [
  "Blog",
  "Investor relation",
  "Privacy",
  "Accessibility",
  "Terms",
];

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-20">
        <div className="py-8 flex flex-col gap-6">

          {/* Desktop top row: social + links + badges | Mobile: links row */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:pt-8">
            {/* Social icons */}
            <div className="flex items-center gap-5 order-2 md:order-1">
              <a href="#" aria-label="X / Twitter">
                <img src={ASSETS.twitter} alt="X" className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img src={ASSETS.linkedin} alt="LinkedIn" className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" aria-label="Instagram">
                <img src={ASSETS.instagram} alt="Instagram" className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" aria-label="TikTok">
                <img src={ASSETS.tiktok} alt="TikTok" className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 order-1 md:order-2">
              {footerLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[13px] md:text-[14px] font-medium text-[#003a50] hover:text-[#00aeef] transition-colors whitespace-nowrap"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* App store badges */}
            <div className="order-3">
              <AppStoreBadges size="sm" />
            </div>
          </div>

          {/* Footer "OUTSIDE" wordmark banner */}
          <div className="relative bg-[#003a50] rounded-2xl md:rounded-[20px] h-12 md:h-[134px] overflow-hidden flex items-center justify-center">
            {/* Noise overlay */}
            <div className="absolute inset-0 bg-black mix-blend-plus-lighter opacity-50 pointer-events-none" />
            <img
              src={ASSETS.footerLogo}
              alt="Out Mobility"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />
          </div>

          {/* Bottom row: copyright + language */}
          <div className="border-t border-dashed border-[#003a50] pt-8 flex items-center justify-between">
            <p className="text-[12px] md:text-[14px] font-normal text-[#003a50]">
              © 2026 Out Inc. All rights reserved.
            </p>
            <button className="hidden md:flex items-center gap-1.5 text-[14px] font-semibold text-[#003a50] hover:text-[#00aeef] transition-colors">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              English
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
