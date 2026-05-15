export default function TickerSection() {
  const items = [
    "ECOSYSTEM TOKEN",
    "DEPIN",
    "RWA",
    "UTILITY TOKEN",
    "OUT-DOOR",
    "OUT-SIDE",
    "OUT-LEAF",
    "OUT-CHARGE",
    "MOBILITY INFRASTRUCTURE",
    "COMMUNITY-LED",
    "WEB3 NATIVE",
    "COMING SOON",
  ];

  const doubled = [...items, ...items];

  return (
    <div className="border-y border-[#00aeef]/10 bg-[#00aeef]/5 py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap gap-0">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-6">
            <span
              className="text-[#00aeef]/70 text-[11px] tracking-[0.2em] font-semibold uppercase"
            >
              {item}
            </span>
            <span className="text-[#00aeef]/30 text-[8px]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
