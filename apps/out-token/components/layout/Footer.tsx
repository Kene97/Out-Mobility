const ecosystemLinks = [
  { label: "Out-door",   href: "https://out-mobility.vercel.app#outdoor" },
  { label: "Out-side",   href: "https://out-mobility.vercel.app#ride" },
  { label: "Out-leaf",   href: "https://out-mobility.vercel.app#co2" },
  { label: "Out-charge", href: "https://out-mobility.vercel.app#charge" },
];

const tokenLinks = [
  { label: "Why $OUTSIDE", href: "#why" },
  { label: "Token Utility",  href: "#utility" },
  { label: "Tokenomics",     href: "#tokenomics" },
  { label: "Roadmap",        href: "#roadmap" },
  { label: "FAQ",            href: "#faq" },
];

const legalLinks = [
  { label: "Privacy",    href: "https://out-mobility.vercel.app#privacy" },
  { label: "Disclaimer", href: "#disclaimer" },
];

export default function Footer() {
  return (
    <footer id="disclaimer" className="bg-[#060e14] border-t border-white/6">
      <div className="max-w-[1200px] mx-auto px-4 xl:px-20 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00aeef] rounded-[8px] flex items-center justify-center">
                <span
                  className="text-white text-[11px] leading-none font-black"
                  style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
                >
                  OUT
                </span>
              </div>
              <div>
                <p className="text-white text-[13px] font-bold leading-none">Out Mobility</p>
                <p className="text-white/35 text-[11px] mt-0.5">$OUTSIDE Token</p>
              </div>
            </div>
            <p className="text-white/35 text-[13px] leading-[1.6]">
              The ecosystem token powering verified mobility infrastructure.
            </p>
            <a
              href="https://x.com/OutMobility"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#00aeef] text-[13px] font-medium hover:text-white transition-colors"
            >
              @OutMobility
              <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Token links */}
          <div className="flex flex-col gap-3">
            <p className="text-white/30 text-[11px] tracking-[0.14em] uppercase font-semibold mb-1">$OUTSIDE</p>
            {tokenLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-white/55 text-[13px] hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          {/* Ecosystem links */}
          <div className="flex flex-col gap-3">
            <p className="text-white/30 text-[11px] tracking-[0.14em] uppercase font-semibold mb-1">Ecosystem</p>
            {ecosystemLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-white/55 text-[13px] hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
            <a
              href="https://out-mobility.vercel.app"
              className="text-[#00aeef]/70 text-[13px] hover:text-[#00aeef] transition-colors"
            >
              Main Site →
            </a>
          </div>

          {/* Legal + status */}
          <div className="flex flex-col gap-3">
            <p className="text-white/30 text-[11px] tracking-[0.14em] uppercase font-semibold mb-1">Legal</p>
            {legalLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-white/55 text-[13px] hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex items-center gap-2 bg-yellow-400/8 border border-yellow-400/15 rounded-[8px] px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/70 animate-pulse flex-shrink-0" />
              <span className="text-yellow-400/70 text-[11px] font-medium">Token not yet launched</span>
            </div>
          </div>
        </div>

        {/* Disclaimer block */}
        <div className="border-t border-white/6 pt-8 flex flex-col gap-4">
          <p className="text-white/25 text-[11px] leading-[1.7] max-w-[900px]">
            <strong className="text-white/40">Disclaimer:</strong>{" "}
            Nothing on this website constitutes financial advice, investment advice, or a solicitation to buy or sell
            any asset. $OUTSIDE has not launched and is not available for purchase or trading. All tokenomics figures
            are proposed and subject to change before the Token Generation Event (TGE). Participation in any future
            token event carries significant risk including total loss. Do not participate with funds you cannot afford
            to lose. Out Mobility makes no guarantee of returns or price performance. This site is for informational
            and educational purposes only.
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-white/20 text-[11px]">
              © 2026 Out Inc. All rights reserved.
            </p>
            <p className="text-white/20 text-[11px]">
              Built on Out Mobility infrastructure. Powered by $OUTSIDE.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
