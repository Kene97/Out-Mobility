import AppStoreBadges from "@/components/ui/AppStoreBadges";

const footerLinks = [
  { label: "Blog",               href: "/blog" },
  { label: "Advertise",          href: "/advertise" },
  { label: "Fleet",              href: "/fleet" },
  { label: "Investor Relations", href: "#" },
  { label: "Privacy",            href: "#" },
  { label: "Terms",              href: "#" },
];

const socials = [
  {
    label: "X / Twitter",
    href: "https://x.com/OutMobility",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-20">
        <div className="py-8 flex flex-col gap-6">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:pt-8">
            {/* Social icons */}
            <div className="flex items-center gap-5 order-2 md:order-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="text-[#003a50] opacity-60 hover:opacity-100 transition-opacity"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 order-1 md:order-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] md:text-[14px] font-medium text-[#003a50] hover:text-[#00aeef] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* App store badges */}
            <div className="order-3">
              <AppStoreBadges size="sm" />
            </div>
          </div>

          {/* Footer "OUTSIDE" wordmark banner */}
          <div className="relative bg-black rounded-2xl md:rounded-[20px] h-16 md:h-[134px] overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-black mix-blend-plus-lighter opacity-50 pointer-events-none" />
            <img
              src="/images/footer-logo.png"
              alt="Out Mobility"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />
          </div>

          {/* Bottom row */}
          <div className="border-t border-dashed border-[#003a50] pt-8 flex items-center justify-between">
            <p className="text-[12px] md:text-[14px] font-normal text-[#003a50]">
              © 2026 Out Inc. All rights reserved.
            </p>
            <button className="hidden md:flex items-center gap-1.5 text-[14px] font-semibold text-[#003a50] hover:text-[#00aeef] transition-colors">
              <svg
                width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.75"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
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
