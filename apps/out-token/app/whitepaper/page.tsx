"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4 print:mb-3">
      <span className="w-1 h-4 bg-[#00aeef] rounded-full print:bg-[#00aeef]" />
      <span
        className="text-[#00aeef] text-[10px] md:text-[11px] tracking-[0.18em] uppercase font-semibold print:text-[9px]"
        style={{ fontFamily: "var(--font-instrument-sans)" }}
      >
        {children}
      </span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[28px] md:text-[36px] text-white leading-[1.15] tracking-[-0.01em] mb-6 print:text-[24px] print:text-black print:mb-4"
      style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
    >
      {children}
    </h2>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`text-white/65 text-[15px] md:text-[16px] leading-[1.8] print:text-black print:text-[12px] print:leading-[1.7] ${className}`}
      style={{ fontFamily: "var(--font-instrument-sans)" }}
    >
      {children}
    </p>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#0a1822] border border-white/8 rounded-[16px] p-6 md:p-8 print:border print:border-gray-200 print:rounded-lg print:bg-white print:p-5 ${className}`}>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="border-t border-white/8 my-12 print:border-gray-200 print:my-8" />;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-2.5 py-1 bg-[#00aeef]/10 text-[#00aeef] border border-[#00aeef]/20 rounded-full text-[10px] tracking-wide font-semibold print:bg-transparent print:text-[#00aeef] print:border-[#00aeef] print:text-[9px]"
      style={{ fontFamily: "var(--font-instrument-sans)" }}
    >
      {children}
    </span>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-[10px] px-5 py-3 mt-4 print:bg-transparent print:border-yellow-600">
      <p className="text-yellow-300/80 text-[13px] leading-[1.7] print:text-yellow-700 print:text-[11px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
        {children}
      </p>
    </div>
  );
}

function RiskItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-[#00aeef]/30 pl-5 py-1 print:border-gray-400">
      <p className="text-white font-semibold text-[14px] mb-1 print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
        {title}
      </p>
      <p className="text-white/55 text-[13px] leading-[1.7] print:text-gray-600 print:text-[11px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
        {children}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Tokenomics donut (pure CSS)
───────────────────────────────────────────── */
const allocations = [
  { label: "Ecosystem Reserve",     pct: 30, color: "#00aeef",  note: "Milestone-based release" },
  { label: "Community & Rewards",   pct: 25, color: "#00c4ff",  note: "Activity-driven unlock" },
  { label: "Core Team & Founders",  pct: 20, color: "#004762",  note: "4yr vesting · 12-month cliff" },
  { label: "Strategic Partners",    pct: 10, color: "#0099d4",  note: "2yr vesting · 6-month cliff" },
  { label: "Liquidity Provision",   pct: 10, color: "#006fa0",  note: "At TGE" },
  { label: "Public Distribution",   pct:  5, color: "#003a50",  note: "At TGE" },
];

function DonutChart() {
  const r = 60;
  const cx = 80;
  const cy = 80;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  const segments = allocations.map((a) => {
    const dash = (a.pct / 100) * circumference;
    const gap = circumference - dash;
    const seg = { ...a, dash, gap, offset };
    offset += dash;
    return seg;
  });

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 print:flex-row print:gap-8">
      <div className="relative flex-shrink-0">
        <svg width="160" height="160" viewBox="0 0 160 160" className="print:w-[120px] print:h-[120px]">
          {segments.map((s) => (
            <circle
              key={s.label}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="22"
              strokeDasharray={`${s.dash} ${s.gap}`}
              strokeDashoffset={-s.offset}
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
            />
          ))}
          <circle cx={cx} cy={cy} r={r - 14} fill="#0a1822" className="print:fill-white" />
          <text x={cx} y={cy - 6} textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" className="print:fill-black">
            1B
          </text>
          <text x={cx} y={cy + 10} textAnchor="middle" fill="#00aeef" fontSize="9">
            TOKEN
          </text>
        </svg>
      </div>

      <div className="flex flex-col gap-2.5 flex-1 w-full">
        {allocations.map((a) => (
          <div key={a.label} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-[3px] flex-shrink-0 print:border print:border-gray-300" style={{ background: a.color }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-white/80 text-[13px] font-medium print:text-black print:text-[11px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                  {a.label}
                </span>
                <span className="text-[#00aeef] font-bold text-[14px] flex-shrink-0 print:text-[12px]" style={{ fontFamily: "var(--font-mona-sans)" }}>
                  {a.pct}%
                </span>
              </div>
              <div className="text-white/35 text-[11px] print:text-gray-500 print:text-[10px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                {a.note}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Architecture diagram (styled HTML)
───────────────────────────────────────────── */
function ArchDiagram() {
  const layers = [
    { label: "Applications Layer",      items: ["Out-door Ads", "Out-side Rides", "Out-leaf Carbon", "Out-charge EV"],   color: "#00aeef" },
    { label: "AI & Data Layer",         items: ["Route Intelligence", "Audience Verification", "Urban Analytics", "Predictive Ops"], color: "#0099d4" },
    { label: "Verification Layer",      items: ["Trip Telemetry", "Device Attestation", "Impression Proof", "Smart Audit"], color: "#006fa0" },
    { label: "Edge Device Layer",       items: ["Android Tablets", "EV Chargers", "Fleet Devices", "Roadside Units"],    color: "#004762" },
    { label: "Connectivity & Infra",    items: ["Cloud Orchestration", "API Gateway", "Data Pipeline", "Network"],       color: "#003a50" },
  ];

  return (
    <div className="flex flex-col gap-2 print:gap-1.5">
      {layers.map((layer) => (
        <div key={layer.label} className="rounded-[10px] overflow-hidden print:rounded-md">
          <div
            className="px-4 py-2 text-white text-[11px] font-semibold tracking-[0.06em] print:text-[10px]"
            style={{ background: layer.color, fontFamily: "var(--font-instrument-sans)" }}
          >
            {layer.label}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 print:bg-gray-200">
            {layer.items.map((item) => (
              <div
                key={item}
                className="px-3 py-2 text-white/55 text-[12px] bg-[#0a1822] print:bg-white print:text-gray-600 print:text-[10px]"
                style={{ fontFamily: "var(--font-instrument-sans)" }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-3 text-center">
        <Tag>Future: Ecosystem Token Layer · DePIN Protocol · DAO Governance</Tag>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Roadmap visual
───────────────────────────────────────────── */
const phases = [
  {
    n: "0", name: "Foundation", status: "Active",
    items: ["Out-door platform live", "Advertiser dashboard deployed", "First fleet partnerships", "Device hardware deployed", "Initial revenue generation"],
    color: "#00aeef",
  },
  {
    n: "1", name: "Community Build", status: "Upcoming",
    items: ["Ecosystem token architecture", "Community growth on X", "Tokenomics finalised", "Whitepaper published", "Early contributor programme"],
    color: "#0099d4",
  },
  {
    n: "2", name: "Token Generation Event", status: "Planned",
    items: ["TGE execution", "Liquidity provisioning", "Exchange listings", "Community distribution begins", "Token utility activation"],
    color: "#006fa0",
  },
  {
    n: "3", name: "Ecosystem Rollout", status: "Future",
    items: ["Out-side ride-hailing launch", "Out-leaf carbon credits", "Out-charge EV deployment", "Cross-product token settlement", "Fleet operator onboarding"],
    color: "#004762",
  },
  {
    n: "4", name: "Utility Expansion", status: "Future",
    items: ["DePIN protocol integration", "Data marketplace activation", "Governance framework live", "RWA tokenisation pilots", "Global market expansion"],
    color: "#003a50",
  },
];

function RoadmapDiagram() {
  return (
    <div className="flex flex-col md:flex-row gap-3 print:flex-row print:gap-2">
      {phases.map((p) => (
        <div key={p.n} className="flex-1 bg-[#0a1822] border border-white/8 rounded-[12px] overflow-hidden print:bg-white print:border-gray-200 print:rounded-md">
          <div className="px-4 py-3 flex items-center gap-2" style={{ background: p.color }}>
            <span className="text-white/60 text-[11px] print:text-[9px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>Phase {p.n}</span>
          </div>
          <div className="px-4 py-4 print:px-3 print:py-3">
            <p className="text-white font-bold text-[13px] mb-1 print:text-black print:text-[11px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
              {p.name}
            </p>
            <div className="inline-block px-2 py-0.5 rounded-full text-[9px] mb-3 print:mb-2"
              style={{
                background: p.status === "Active" ? "rgba(0,174,239,0.15)" : "rgba(255,255,255,0.05)",
                color: p.status === "Active" ? "#00aeef" : "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-instrument-sans)",
                border: p.status === "Active" ? "1px solid rgba(0,174,239,0.3)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {p.status}
            </div>
            <ul className="flex flex-col gap-1.5 print:gap-1">
              {p.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#00aeef] text-[10px] mt-0.5 flex-shrink-0">▸</span>
                  <span className="text-white/50 text-[11px] leading-[1.5] print:text-gray-600 print:text-[10px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function WhitepaperPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  function handlePrint() {
    window.print();
  }

  return (
    <>
      {/* ── Print-only global styles ── */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
          @page { margin: 18mm 18mm 18mm 18mm; }
        }
        @media screen {
          .print-only { display: none; }
        }
      `}</style>

      {/* ── Sticky top bar (screen only) ── */}
      <header className="no-print fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 h-[52px] bg-[#060e14]/95 backdrop-blur-sm border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#00aeef] rounded-[7px] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[11px] leading-none" style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900, letterSpacing: "0.04em" }}>
              OUT
            </span>
          </div>
          <span className="text-white/40 text-[12px] hidden sm:block" style={{ fontFamily: "var(--font-instrument-sans)" }}>
            Out Mobility
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 border border-white/10 hover:border-[#00aeef]/40 text-white/55 hover:text-white px-3 py-1.5 rounded-[8px] transition-all text-[12px]"
            style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 500 }}
          >
            ← Back to Ecosystem
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-[#00aeef] hover:bg-[#00c4ff] text-white px-3 py-1.5 rounded-[8px] transition-colors text-[12px] cursor-pointer"
            style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 600 }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v13M12 16l-4-4M12 16l4-4M4 20h16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </header>

      {/* ── Document ── */}
      <div
        ref={contentRef}
        className="min-h-screen bg-[#060e14] print:bg-white pt-[52px] print:pt-0"
      >
        <div className="max-w-[860px] mx-auto px-4 md:px-8 py-16 print:py-0 print:px-0">

          {/* ══════════════════════════════════════
              COVER
          ══════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20 print:mb-12 print:border-b print:border-gray-200 print:pb-10"
          >
            {/* Logo mark */}
            <div className="flex items-center gap-3 mb-12 print:mb-8">
              <div className="w-10 h-10 bg-[#00aeef] rounded-[9px] flex items-center justify-center flex-shrink-0 print:bg-[#00aeef]">
                <span className="text-white text-[13px] leading-none" style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900, letterSpacing: "0.04em" }}>
                  OUT
                </span>
              </div>
              <span className="text-white/40 text-[13px] print:text-gray-500" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                Out Mobility
              </span>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 mb-6 print:mb-4">
              <span className="w-1 h-4 bg-[#00aeef] rounded-full print:bg-[#00aeef]" />
              <span className="text-[#00aeef] text-[11px] tracking-[0.18em] uppercase font-semibold print:text-[10px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                Ecosystem Whitepaper · Version 1.0
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-[52px] md:text-[72px] text-white leading-[0.95] tracking-tight mb-6 print:text-[48px] print:text-black"
              style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}
            >
              OUT MOBILITY
              <br />
              <span className="text-[#00aeef]">ECOSYSTEM</span>
              <br />
              WHITEPAPER
            </h1>

            <p className="text-white/55 text-[18px] leading-[1.65] max-w-[560px] mb-8 print:text-black print:text-[14px] print:mb-6" style={{ fontFamily: "var(--font-instrument-sans)" }}>
              The infrastructure thesis, token architecture, and long-term roadmap
              for a globally scalable mobility ecosystem powered by verified data,
              edge devices, and a native ecosystem token.
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 print:gap-3">
              {[
                { k: "Token", v: "Coming Soon" },
                { k: "Supply", v: "1,000,000,000" },
                { k: "Status", v: "Pre-Launch" },
                { k: "Published", v: "May 2026" },
              ].map((m) => (
                <div key={m.k} className="bg-white/4 border border-white/8 rounded-[10px] px-4 py-2.5 print:bg-transparent print:border-gray-300 print:rounded-md">
                  <div className="text-white/35 text-[10px] tracking-wide uppercase print:text-gray-500 print:text-[9px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>{m.k}</div>
                  <div className="text-white font-semibold text-[14px] print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>{m.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ══════════════════════════════════════
              01. EXECUTIVE SUMMARY
          ══════════════════════════════════════ */}
          <section id="executive-summary" className="mb-16 print:mb-10 print-break">
            <SectionLabel>01 · Executive Summary</SectionLabel>
            <SectionHeading>What We Are Building</SectionHeading>

            <Body className="mb-5">
              Out Mobility is a mobility infrastructure company. We build the software, hardware, and
              coordination layer that turns vehicles into verified, managed, revenue-generating
              infrastructure. We are not an advertising agency. We are not a media company.
              We are infrastructure — the kind that makes entire mobility ecosystems function.
            </Body>

            <Body className="mb-5">
              Our first product, Out-door, is a verified in-car advertising network deployed through
              Android tablets mounted in ride-hail, fleet, and taxi vehicles. Every impression is proven
              through trip telemetry and device attestation — not estimated. Advertisers get verified
              reach. Fleet operators get a new revenue stream. Riders get connected entertainment.
            </Body>

            <Body className="mb-5">
              Out-door is the wedge. The larger vision is a full-stack mobility ecosystem: ride-hailing
              through Out-side, EV charging infrastructure through Out-charge, and carbon credit
              coordination through Out-leaf. Each product generates real-world data, real-world revenue,
              and real-world utility — all coordinated through a single native ecosystem token.
            </Body>

            <Body className="mb-5">
              The Ecosystem Token is not speculative. It is not a fundraising mechanism.
              It is the coordination layer for a network of infrastructure products that will span
              vehicles, chargers, riders, operators, and advertisers across emerging markets globally.
            </Body>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 print:gap-3">
              {[
                { n: "6,000+", label: "Target vehicles · Phase 1" },
                { n: "4", label: "Ecosystem products" },
                { n: "1B", label: "Fixed token supply" },
              ].map((s) => (
                <Card key={s.label} className="text-center">
                  <div className="text-[32px] font-black text-[#00aeef] leading-none mb-1 print:text-[24px]" style={{ fontFamily: "var(--font-mona-sans)" }}>
                    {s.n}
                  </div>
                  <div className="text-white/50 text-[12px] print:text-gray-500 print:text-[10px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {s.label}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              02. PROBLEM STATEMENT
          ══════════════════════════════════════ */}
          <section id="problem" className="mb-16 print:mb-10">
            <SectionLabel>02 · Problem Statement</SectionLabel>
            <SectionHeading>What Is Broken</SectionHeading>

            <Body className="mb-8">
              Transportation moves billions of people daily. Yet the infrastructure layer beneath it —
              the software, data, coordination, and monetisation — remains fragmented, inefficient,
              and largely unverified. Six structural problems define the gap we are addressing.
            </Body>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-3">
              {[
                {
                  n: "01",
                  title: "Advertising Without Verification",
                  body: "Billions of dollars are spent on out-of-home and in-vehicle advertising annually. Almost none of it is verifiably proven. Impressions are estimated, not confirmed. Advertisers pay for guesses.",
                },
                {
                  n: "02",
                  title: "Untapped Fleet Value",
                  body: "Hundreds of thousands of ride-hail and taxi vehicles sit idle between trips, or carry passengers with zero monetisation beyond the fare. Fleet operators have no way to activate the attention asset they control.",
                },
                {
                  n: "03",
                  title: "EV Infrastructure Gaps",
                  body: "Electric vehicle adoption is accelerating globally. The charging infrastructure required to support it is not keeping pace — especially in emerging markets where grid reliability and capital access are scarce.",
                },
                {
                  n: "04",
                  title: "Urban Mobility Fragmentation",
                  body: "Ride-hailing, transit, micro-mobility, and fleet management operate in silos. There is no shared coordination layer — no common protocol that lets these systems communicate, settle, or reward participants fairly.",
                },
                {
                  n: "05",
                  title: "Broken Carbon Accountability",
                  body: "Carbon credits are opaque, difficult to verify, and inaccessible to most operators. The vehicles generating the cleanest miles have no way to monetise their environmental contribution.",
                },
                {
                  n: "06",
                  title: "No Infrastructure Coordination Token",
                  body: "Existing Web3 mobility projects prioritise speculation over infrastructure. There is no credible token designed specifically to coordinate payments, rewards, and governance across a real mobility stack.",
                },
              ].map((p) => (
                <Card key={p.n}>
                  <div className="text-[#00aeef]/40 text-[11px] font-bold mb-2 print:text-[10px]" style={{ fontFamily: "var(--font-mona-sans)" }}>
                    {p.n}
                  </div>
                  <h3 className="text-white font-semibold text-[16px] mb-2 print:text-black print:text-[13px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {p.title}
                  </h3>
                  <Body className="text-[14px] print:text-[11px]">{p.body}</Body>
                </Card>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              03. ECOSYSTEM OVERVIEW
          ══════════════════════════════════════ */}
          <section id="ecosystem" className="mb-16 print:mb-10 print-break">
            <SectionLabel>03 · Ecosystem Overview</SectionLabel>
            <SectionHeading>Four Products. One Network.</SectionHeading>

            <Body className="mb-8">
              The Out Mobility ecosystem consists of four interconnected infrastructure products,
              each generating real-world data and revenue, all coordinated through a single ecosystem token.
            </Body>

            <div className="flex flex-col gap-4 print:gap-3">
              {[
                {
                  product: "Out-door",
                  tagline: "Verified In-Car Advertising",
                  status: "ACTIVE",
                  body: "Android tablets mounted in ride-hail and fleet vehicles deliver verified advertising to passengers. Every impression is confirmed through trip telemetry and device attestation — not estimated. Advertisers access a proven attention network. Fleet operators earn a new revenue stream. This is the current revenue engine of the ecosystem.",
                  token: "Ecosystem Token used for: Ad payments · Operator rewards · Premium access staking",
                },
                {
                  product: "Out-side",
                  tagline: "Ride-Hailing & Subscriptions",
                  status: "UPCOMING",
                  body: "A ride-hailing layer built natively on mobility infrastructure. Out-side enables subscription-based passenger transport with driver reward structures powered by the ecosystem token. The data collected through Out-door creates the foundation for route intelligence and driver scoring used in Out-side.",
                  token: "Ecosystem Token used for: Fare settlement · Driver incentives · Subscriber benefits",
                },
                {
                  product: "Out-leaf",
                  tagline: "Carbon Credits & Sustainability",
                  status: "UPCOMING",
                  body: "Out-leaf turns verified clean miles into tokenised carbon credits. Fleet operators running EVs or low-emission vehicles can earn verifiable carbon credits based on trip data already captured by the Out Mobility stack — creating a new revenue stream from sustainability.",
                  token: "Ecosystem Token used for: Carbon credit settlement · Offset purchases · Verification staking",
                },
                {
                  product: "Out-charge",
                  tagline: "EV Charging Infrastructure",
                  status: "UPCOMING",
                  body: "Out-charge deploys EV charging infrastructure targeting fleet operators and urban mobility hubs. By connecting charging infrastructure to the broader ecosystem, Out-charge enables dynamic pricing, fleet-specific billing, and operator reward distribution — all settled through the ecosystem token.",
                  token: "Ecosystem Token used for: Charging payments · Operator rewards · Energy credit settlement",
                },
              ].map((p) => (
                <Card key={p.product} className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-black text-[20px] print:text-black print:text-[16px]" style={{ fontFamily: "var(--font-mona-sans)" }}>
                          {p.product}
                        </h3>
                        <span
                          className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide"
                          style={{
                            background: p.status === "ACTIVE" ? "rgba(0,174,239,0.15)" : "rgba(255,255,255,0.05)",
                            color: p.status === "ACTIVE" ? "#00aeef" : "rgba(255,255,255,0.35)",
                            border: p.status === "ACTIVE" ? "1px solid rgba(0,174,239,0.3)" : "1px solid rgba(255,255,255,0.08)",
                            fontFamily: "var(--font-instrument-sans)",
                          }}
                        >
                          {p.status}
                        </span>
                      </div>
                      <div className="text-[#00aeef] text-[12px] font-medium print:text-[10px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                        {p.tagline}
                      </div>
                    </div>
                  </div>
                  <Body className="text-[14px] print:text-[11px]">{p.body}</Body>
                  <div className="bg-white/3 border border-white/6 rounded-[8px] px-4 py-2.5 print:bg-transparent print:border-gray-200">
                    <p className="text-white/40 text-[11px] print:text-gray-500 print:text-[10px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      {p.token}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              04. PRODUCT STRATEGY
          ══════════════════════════════════════ */}
          <section id="strategy" className="mb-16 print:mb-10">
            <SectionLabel>04 · Product Strategy</SectionLabel>
            <SectionHeading>Why Out-door First</SectionHeading>

            <Body className="mb-5">
              Infrastructure companies do not launch all products simultaneously. They find the
              highest-certainty wedge — the product with the clearest revenue model, the shortest
              path to deployment, and the best data-generation characteristics — and they use it
              to fund the rest.
            </Body>

            <Body className="mb-5">
              Out-door is that wedge. In-vehicle advertising is a multi-billion dollar industry with
              a well-understood business model: advertisers pay for attention. What does not exist is
              a verified, managed, scalable version of that model for fleet vehicles in emerging markets.
              Out-door builds it.
            </Body>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 print:gap-3">
              {[
                {
                  title: "Revenue from Day One",
                  body: "Advertisers pay per campaign. Fleet operators earn per active tablet. No speculative revenue — just infrastructure being used and paid for.",
                },
                {
                  title: "Data as the Foundation",
                  body: "Every trip generates route data, passenger dwell time, device telemetry, and verification records — the intelligence layer for every product that follows.",
                },
                {
                  title: "Fleet Relationships as Distribution",
                  body: "Fleet operators onboarded for Out-door become the distribution network for Out-side, Out-charge, and Out-leaf. The wedge builds the channel.",
                },
              ].map((c) => (
                <Card key={c.title}>
                  <h3 className="text-white font-semibold text-[15px] mb-2 print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {c.title}
                  </h3>
                  <Body className="text-[13px] print:text-[11px]">{c.body}</Body>
                </Card>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              05. TECHNOLOGY ARCHITECTURE
          ══════════════════════════════════════ */}
          <section id="technology" className="mb-16 print:mb-10 print-break">
            <SectionLabel>05 · Technology Architecture</SectionLabel>
            <SectionHeading>How the Infrastructure Works</SectionHeading>

            <Body className="mb-5">
              The Out Mobility infrastructure stack is designed as a layered system. Each layer
              builds on the one beneath it. The result is a network where physical devices generate
              real-world data, AI processes and verifies it, applications consume it, and the token
              coordinates payment and participation across the whole system.
            </Body>

            <div className="mb-8 print:mb-6">
              <ArchDiagram />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-3">
              {[
                {
                  title: "Edge Devices",
                  body: "Android tablets, EV charger units, and fleet-mounted sensors form the physical infrastructure layer. These devices are the data source — trip logs, GPS coordinates, device health, and audience presence signals all originate here.",
                },
                {
                  title: "Verification Layer",
                  body: "Trip telemetry and device attestation combine to produce verified impression records. This is the core differentiator — every ad impression is anchored to a confirmed trip event, not an estimate.",
                },
                {
                  title: "AI & Data Layer",
                  body: "Route intelligence, audience analytics, predictive operations, and urban mobility signals are processed centrally. This layer makes the network smarter over time — improving targeting, pricing, and fleet efficiency.",
                },
                {
                  title: "Future: Blockchain & DePIN",
                  body: "The verification layer is designed to be anchored on-chain over time. Device attestations, impression proofs, and carbon verifications will migrate to decentralised infrastructure — making the network auditable, trustless, and globally composable.",
                },
              ].map((c) => (
                <Card key={c.title}>
                  <h3 className="text-white font-semibold text-[15px] mb-2 print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {c.title}
                  </h3>
                  <Body className="text-[13px] print:text-[11px]">{c.body}</Body>
                </Card>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              06. TOKEN UTILITY
          ══════════════════════════════════════ */}
          <section id="utility" className="mb-16 print:mb-10">
            <SectionLabel>06 · Token Utility</SectionLabel>
            <SectionHeading>What the Ecosystem Token Does</SectionHeading>

            <Body className="mb-8">
              The Ecosystem Token is a utility token. It performs specific, defined functions within the
              Out Mobility ecosystem. It is not a share of the company. It is not a promise of
              profit. It is the coordination mechanism for a network of infrastructure products.
            </Body>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-3">
              {[
                {
                  n: "01",
                  title: "Advertising Payments",
                  tag: "Out-door",
                  body: "Advertisers who settle campaigns in the Ecosystem Token access preferential rates and priority placement within the Out-door network. This creates direct demand tied to network usage.",
                },
                {
                  n: "02",
                  title: "Driver & Operator Rewards",
                  tag: "All Products",
                  body: "Fleet operators and drivers who contribute to the network — active devices, verified trips, charging uptime — earn ecosystem token distributions based on verifiable contribution metrics.",
                },
                {
                  n: "03",
                  title: "Premium Access & Staking",
                  tag: "Out-door",
                  body: "Advertisers can stake ecosystem tokens to unlock premium campaign features: advanced audience targeting, extended campaign windows, and priority ad rotation.",
                },
                {
                  n: "04",
                  title: "Cross-Product Settlement",
                  tag: "All Products",
                  body: "As Out-side, Out-leaf, and Out-charge scale, the Ecosystem Token becomes the shared settlement currency across all products — enabling operators and users to move value without friction.",
                },
                {
                  n: "05",
                  title: "Ecosystem Governance",
                  tag: "Future",
                  body: "Token holders will gain participation rights in ecosystem governance decisions — including fee structures, network expansion priorities, and product roadmap input — as the governance framework matures.",
                },
                {
                  n: "06",
                  title: "Data Marketplace Access",
                  tag: "Future",
                  body: "Anonymised mobility intelligence — route data, audience density, urban flow patterns — will be accessible via the data marketplace. Access will be gated and priced in ecosystem tokens.",
                },
              ].map((u) => (
                <Card key={u.n}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#00aeef]/40 text-[11px] font-bold print:text-[9px]" style={{ fontFamily: "var(--font-mona-sans)" }}>{u.n}</span>
                    <Tag>{u.tag}</Tag>
                  </div>
                  <h3 className="text-white font-semibold text-[15px] mb-2 print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {u.title}
                  </h3>
                  <Body className="text-[13px] print:text-[11px]">{u.body}</Body>
                </Card>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              07. TOKENOMICS
          ══════════════════════════════════════ */}
          <section id="tokenomics" className="mb-16 print:mb-10 print-break">
            <SectionLabel>07 · Tokenomics</SectionLabel>
            <SectionHeading>Supply, Allocation & Distribution</SectionHeading>

            <Body className="mb-8">
              The Ecosystem Token supply is fixed at 1,000,000,000 tokens. No additional tokens
              will ever be minted. The allocation structure is designed to prioritise long-term
              ecosystem health over short-term extraction.
            </Body>

            <Card className="mb-8">
              <DonutChart />
            </Card>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left print:text-[10px]">
                <thead>
                  <tr className="border-b border-white/8 print:border-gray-200">
                    {["Allocation", "Share", "Tokens", "Vesting Schedule"].map((h) => (
                      <th key={h} className="pb-3 pr-6 text-white/40 text-[11px] font-semibold tracking-wide print:text-gray-500 print:text-[10px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((a, i) => (
                    <tr key={a.label} className={`border-b border-white/5 print:border-gray-100 ${i % 2 === 0 ? "" : ""}`}>
                      <td className="py-3 pr-6">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-[2px] flex-shrink-0" style={{ background: a.color }} />
                          <span className="text-white text-[13px] print:text-black print:text-[11px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>{a.label}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-6 text-[#00aeef] font-bold text-[14px] print:text-[12px]" style={{ fontFamily: "var(--font-mona-sans)" }}>{a.pct}%</td>
                      <td className="py-3 pr-6 text-white/55 text-[13px] print:text-gray-600 print:text-[11px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                        {(a.pct * 10_000_000).toLocaleString()}
                      </td>
                      <td className="py-3 text-white/45 text-[12px] print:text-gray-500 print:text-[10px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>{a.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Note>
              ⚠ Proposed allocation — subject to change before Token Generation Event (TGE). All vesting schedules and distribution timelines will be finalised and published prior to token launch. This is not an offering document.
            </Note>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 print:gap-3">
              {[
                { k: "Total Supply", v: "1,000,000,000" },
                { k: "Team Cliff", v: "12 Months" },
                { k: "Community Unlock", v: "Activity-Driven" },
                { k: "Launch Status", v: "Pre-TGE" },
              ].map((s) => (
                <Card key={s.k} className="text-center">
                  <div className="text-white/35 text-[10px] tracking-wide uppercase mb-1 print:text-gray-500 print:text-[9px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>{s.k}</div>
                  <div className="text-white font-bold text-[14px] print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>{s.v}</div>
                </Card>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              08. DATA & INFRASTRUCTURE
          ══════════════════════════════════════ */}
          <section id="data" className="mb-16 print:mb-10">
            <SectionLabel>08 · Data & Infrastructure</SectionLabel>
            <SectionHeading>The Intelligence Layer</SectionHeading>

            <Body className="mb-5">
              Every trip completed through the Out Mobility ecosystem generates data. Not aggregate
              estimates — verified, device-level records. This data is the foundation of the network's
              long-term value proposition and the engine of its AI layer.
            </Body>

            <Body className="mb-5">
              Route intelligence tells us where vehicles travel, how long trips take, and which corridors
              carry the highest passenger density. Audience verification confirms that a human was present
              during an ad impression. Urban analytics aggregates this into city-level mobility intelligence
              — the kind of data that urban planners, logistics companies, and infrastructure investors pay
              significant sums to access.
            </Body>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 print:gap-3">
              {[
                {
                  title: "Mobility Data",
                  items: ["Trip origin & destination", "Route corridor mapping", "Dwell time by zone", "Fleet utilisation rates"],
                },
                {
                  title: "Audience Intelligence",
                  items: ["Verified impression records", "Passenger presence signals", "Ad interaction data", "Demographic inference (privacy-preserving)"],
                },
                {
                  title: "Future DePIN Layer",
                  items: ["On-chain trip attestation", "Decentralised device registry", "Trustless impression proofs", "Composable mobility data marketplace"],
                },
              ].map((c) => (
                <Card key={c.title}>
                  <h3 className="text-white font-semibold text-[14px] mb-3 print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {c.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {c.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#00aeef] text-[10px] mt-1 flex-shrink-0">▸</span>
                        <span className="text-white/50 text-[12px] leading-[1.6] print:text-gray-600 print:text-[10px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              09. CARBON & SUSTAINABILITY
          ══════════════════════════════════════ */}
          <section id="sustainability" className="mb-16 print:mb-10 print-break">
            <SectionLabel>09 · Carbon & Sustainability</SectionLabel>
            <SectionHeading>Infrastructure for a Cleaner Network</SectionHeading>

            <Body className="mb-5">
              Out Mobility is not a sustainability company by branding. We are a mobility infrastructure
              company that recognises the structural opportunity at the intersection of transport and
              climate. Out-leaf and Out-charge are not additions to the ecosystem — they are its
              natural evolution.
            </Body>

            <Body className="mb-5">
              As fleet operators adopt EVs — driven by cost economics, regulation, or both — they
              accumulate verifiable clean miles. Out-leaf turns those miles into monetisable carbon
              credits, verified through the same trip telemetry that powers Out-door and Out-side.
              No new data collection required. The infrastructure already captures what is needed.
            </Body>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 print:gap-3">
              {[
                {
                  title: "EV Fleet Integration",
                  body: "Out-charge provides charging infrastructure purpose-built for fleet operators. Scheduled charging, fleet-specific billing, and token-denominated payment remove friction from EV fleet operations.",
                },
                {
                  title: "Carbon Credit Verification",
                  body: "Trip data captured through the Out Mobility stack provides the evidence base for carbon credit generation. Out-leaf standardises the methodology and manages the issuance pipeline.",
                },
                {
                  title: "Operator Revenue from Sustainability",
                  body: "Fleet operators running clean vehicles earn carbon credit income on top of advertising revenue and ride-hailing fares. Sustainability becomes a financial argument, not just an ethical one.",
                },
                {
                  title: "Long-Term Environmental Positioning",
                  body: "As the network scales, the aggregate environmental impact — verified miles, clean trips, reduced idle emissions — becomes a significant and auditable contribution to urban air quality.",
                },
              ].map((c) => (
                <Card key={c.title}>
                  <h3 className="text-white font-semibold text-[15px] mb-2 print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {c.title}
                  </h3>
                  <Body className="text-[13px] print:text-[11px]">{c.body}</Body>
                </Card>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              10. ROADMAP
          ══════════════════════════════════════ */}
          <section id="roadmap" className="mb-16 print:mb-10">
            <SectionLabel>10 · Roadmap</SectionLabel>
            <SectionHeading>Where We Are. Where We Are Going.</SectionHeading>

            <Body className="mb-8">
              The Out Mobility roadmap is phased by product maturity, not calendar ambition. Each phase
              unlocks the next. Phase 0 is live. The network is real. The revenue is real.
            </Body>

            <RoadmapDiagram />

            <Note>
              ⚠ Roadmap is indicative. Timelines are subject to change based on market conditions, regulatory approvals, and capital deployment. Phases may run in parallel where feasible.
            </Note>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              11. MARKET OPPORTUNITY
          ══════════════════════════════════════ */}
          <section id="market" className="mb-16 print:mb-10 print-break">
            <SectionLabel>11 · Market Opportunity</SectionLabel>
            <SectionHeading>The Size of the Opportunity</SectionHeading>

            <Body className="mb-5">
              Out Mobility operates at the intersection of three large, fast-growing markets:
              mobility infrastructure, digital advertising, and blockchain-enabled coordination.
              The opportunity is not a slice of a single market — it is the coordination layer
              across all three.
            </Body>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 print:gap-3">
              {[
                {
                  market: "Global Out-of-Home Advertising",
                  size: "$50B+",
                  note: "Annual market, growing at ~8% CAGR. In-vehicle and transit advertising represents a verified, captive audience segment.",
                },
                {
                  market: "Ride-Hailing & Fleet Tech",
                  size: "$200B+",
                  note: "Total addressable market for mobility platforms globally. Emerging markets — Africa, Southeast Asia, Latin America — are the highest-growth corridors.",
                },
                {
                  market: "EV Charging Infrastructure",
                  size: "$140B+",
                  note: "Projected market by 2030. Fleet-specific charging is underserved. Out-charge targets the fleet segment before the consumer market.",
                },
                {
                  market: "Carbon Credit Markets",
                  size: "$2T+",
                  note: "Projected voluntary carbon market by 2050. Verified, transport-sector credits are among the most credible and liquid categories.",
                },
              ].map((m) => (
                <Card key={m.market}>
                  <div className="text-[28px] font-black text-[#00aeef] leading-none mb-1 print:text-[20px]" style={{ fontFamily: "var(--font-mona-sans)" }}>
                    {m.size}
                  </div>
                  <h3 className="text-white font-semibold text-[14px] mb-2 print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {m.market}
                  </h3>
                  <Body className="text-[12px] print:text-[10px]">{m.note}</Body>
                </Card>
              ))}
            </div>

            <Body>
              The Out Mobility opportunity is not simply a share of these markets. It is the
              infrastructure layer that sits beneath them — verified data, coordinated participation,
              and a settlement token that makes cross-product value exchange possible. Infrastructure
              companies extract value at every level of the stack.
            </Body>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              12. BUSINESS MODEL
          ══════════════════════════════════════ */}
          <section id="business-model" className="mb-16 print:mb-10">
            <SectionLabel>12 · Business Model</SectionLabel>
            <SectionHeading>How the Network Makes Money</SectionHeading>

            <div className="flex flex-col gap-4 print:gap-3">
              {[
                {
                  type: "Primary Revenue",
                  color: "#00aeef",
                  items: [
                    { title: "Advertising Campaign Fees", body: "Advertisers pay per campaign. Revenue is split between Out Mobility (platform fee) and fleet operators (device host reward). Both fiat and ecosystem token settlement are supported." },
                    { title: "Device Subscription (Fleet)", body: "Fleet operators may be offered subsidised hardware in exchange for a revenue-share arrangement. The platform earns a percentage of all advertising revenue generated by each device." },
                  ],
                },
                {
                  type: "Secondary Revenue",
                  color: "#0099d4",
                  items: [
                    { title: "Ride-Hailing Commission", body: "Out-side takes a platform fee on each trip completed through the network. Driver rewards in ecosystem tokens reduce cash cost of operations while increasing token utility." },
                    { title: "EV Charging Margins", body: "Out-charge earns on energy throughput and fleet billing management. Token-denominated billing creates recurring ecosystem token demand." },
                    { title: "Carbon Credit Issuance", body: "Out-leaf earns a percentage of carbon credits generated through the platform. Clean fleet operators earn the remainder." },
                  ],
                },
                {
                  type: "Ecosystem Monetisation",
                  color: "#004762",
                  items: [
                    { title: "Data Marketplace", body: "Anonymised mobility intelligence is sold to urban planners, logistics operators, and research institutions. Access priced in ecosystem tokens creates floor demand from non-speculative buyers." },
                    { title: "Token Protocol Fees", body: "As ecosystem transaction volume grows, protocol-level fees in the ecosystem token create a self-sustaining treasury mechanism for ecosystem development." },
                  ],
                },
              ].map((section) => (
                <Card key={section.type}>
                  <div className="flex items-center gap-2 mb-4 print:mb-3">
                    <div className="w-1 h-5 rounded-full" style={{ background: section.color }} />
                    <h3 className="text-white font-bold text-[16px] print:text-black print:text-[13px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      {section.type}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4 print:gap-3">
                    {section.items.map((item) => (
                      <div key={item.title}>
                        <p className="text-white font-semibold text-[13px] mb-1 print:text-black print:text-[11px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                          {item.title}
                        </p>
                        <Body className="text-[13px] print:text-[11px]">{item.body}</Body>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              13. RISK FACTORS
          ══════════════════════════════════════ */}
          <section id="risks" className="mb-16 print:mb-10 print-break">
            <SectionLabel>13 · Risk Factors</SectionLabel>
            <SectionHeading>What Could Go Wrong</SectionHeading>

            <Body className="mb-8">
              We are building real infrastructure in complex markets. Risk is inherent. We disclose
              the following risk categories not as disclaimers, but as evidence of strategic clarity.
            </Body>

            <div className="flex flex-col gap-4 print:gap-3">
              <Card>
                <h3 className="text-white font-semibold text-[15px] mb-4 print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                  Execution Risks
                </h3>
                <div className="flex flex-col gap-3">
                  <RiskItem title="Fleet Onboarding Velocity">
                    The speed at which fleet operators adopt Out-door hardware determines early revenue growth. Slower-than-expected adoption delays the data generation required for subsequent products.
                  </RiskItem>
                  <RiskItem title="Hardware Operations">
                    Device uptime, maintenance, and replacement in field conditions introduces operational complexity. Hardware failures reduce verified impression inventory and operator confidence.
                  </RiskItem>
                  <RiskItem title="Advertiser Acquisition">
                    Building a sufficient advertiser base requires sales infrastructure and market credibility. Initial revenue concentration in a small number of advertisers creates dependency risk.
                  </RiskItem>
                </div>
              </Card>

              <Card>
                <h3 className="text-white font-semibold text-[15px] mb-4 print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                  Regulatory & Token Risks
                </h3>
                <div className="flex flex-col gap-3">
                  <RiskItem title="Token Regulatory Classification">
                    The regulatory classification of utility tokens varies significantly by jurisdiction. Changes in applicable law may affect token availability, transferability, or exchange access in certain markets.
                  </RiskItem>
                  <RiskItem title="Exchange Listing Uncertainty">
                    Listing on centralised or decentralised exchanges is not guaranteed. Liquidity conditions at TGE depend on market conditions, exchange policies, and regulatory approval in target jurisdictions.
                  </RiskItem>
                  <RiskItem title="DePIN & Blockchain Infrastructure">
                    The integration of on-chain verification and DePIN infrastructure depends on the maturity and cost-effectiveness of underlying blockchain protocols at the time of implementation.
                  </RiskItem>
                </div>
              </Card>

              <Card>
                <h3 className="text-white font-semibold text-[15px] mb-4 print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                  Market & Adoption Risks
                </h3>
                <div className="flex flex-col gap-3">
                  <RiskItem title="Competitive Landscape">
                    Incumbent advertising networks and emerging mobility platforms may replicate elements of the Out Mobility model. Differentiation through verified data and ecosystem integration is the primary defence.
                  </RiskItem>
                  <RiskItem title="EV Infrastructure Timing">
                    Out-charge and Out-leaf depend on sufficient EV fleet adoption in target markets. This adoption curve is subject to policy, infrastructure investment, and consumer demand in ways outside our control.
                  </RiskItem>
                  <RiskItem title="Token Speculation Risk">
                    As with any pre-launch token, speculative market behaviour may not reflect underlying infrastructure value. We discourage participation motivated by short-term price appreciation.
                  </RiskItem>
                </div>
              </Card>
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              14. COMMUNITY VISION
          ══════════════════════════════════════ */}
          <section id="community" className="mb-16 print:mb-10">
            <SectionLabel>14 · Community Vision</SectionLabel>
            <SectionHeading>Who Builds This With Us</SectionHeading>

            <Body className="mb-5">
              Out Mobility is not a closed infrastructure play. The long-term vision is a network
              owned and operated, in part, by the people who build and use it. Fleet operators,
              drivers, advertisers, developers, and riders are all participants in the ecosystem —
              and the Ecosystem Token is the mechanism through which their contribution is recognised and rewarded.
            </Body>

            <Body className="mb-5">
              The community building now — before the token launches, before the ecosystem is complete —
              is the most important cohort. Early contributors who understand the infrastructure thesis
              and help build awareness, partnerships, and adoption are the network's first multipliers.
            </Body>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 print:gap-3">
              {[
                {
                  title: "Operators & Drivers",
                  body: "Fleet operators and drivers are the physical infrastructure of the network. The Ecosystem Token rewards their contribution in proportion to verified activity — trips completed, devices deployed, uptime maintained.",
                },
                {
                  title: "Advertisers & Brands",
                  body: "Advertisers who use ecosystem tokens for campaign settlement become participants in the network, not just buyers of inventory. Staking, priority access, and governance participation tie their interests to network health.",
                },
                {
                  title: "Community & Governance",
                  body: "As the ecosystem matures, community governance will give token holders a voice in key decisions: fee structures, treasury allocation, expansion priorities, and protocol upgrades. The roadmap includes a formal governance framework.",
                },
              ].map((c) => (
                <Card key={c.title}>
                  <h3 className="text-white font-semibold text-[15px] mb-2 print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {c.title}
                  </h3>
                  <Body className="text-[13px] print:text-[11px]">{c.body}</Body>
                </Card>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════
              15. LEGAL & DISCLAIMER
          ══════════════════════════════════════ */}
          <section id="legal" className="mb-16 print:mb-10 print-break">
            <SectionLabel>15 · Legal & Disclaimer</SectionLabel>
            <SectionHeading>Important Information</SectionHeading>

            <div className="bg-[#0a1822] border border-yellow-400/15 rounded-[16px] p-6 md:p-8 print:bg-transparent print:border-gray-300 print:rounded-lg print:p-5">
              <div className="flex flex-col gap-5 print:gap-4">
                {[
                  {
                    title: "Not Financial Advice",
                    body: "This whitepaper is for informational purposes only. Nothing in this document constitutes financial advice, investment advice, trading advice, or any other form of advice. You should not treat any of the content herein as such. Out Mobility does not recommend that any cryptocurrency, token, or digital asset should be bought, sold, or held by you.",
                  },
                  {
                    title: "No Guaranteed Returns",
                    body: "Purchasing or holding ecosystem tokens involves risk, including the possible loss of the entire amount paid. The value of tokens may be volatile, and there is no guarantee of any return on investment. Past performance of any digital asset is not indicative of future results.",
                  },
                  {
                    title: "Roadmap Subject to Change",
                    body: "The roadmap, timelines, product plans, and tokenomics described in this whitepaper are indicative and subject to change without notice. Out Mobility reserves the right to modify any aspect of the ecosystem plan in response to regulatory requirements, market conditions, technical constraints, or strategic decisions.",
                  },
                  {
                    title: "Jurisdictional Restrictions",
                    body: "The availability of ecosystem tokens may vary by jurisdiction. It is your responsibility to determine whether your participation in any token-related activity is lawful in your jurisdiction. This whitepaper does not constitute an offer or solicitation in any jurisdiction where such offers are prohibited.",
                  },
                  {
                    title: "Forward-Looking Statements",
                    body: "This whitepaper contains forward-looking statements that involve risks and uncertainties. Actual results may differ materially from those anticipated due to factors including but not limited to: regulatory changes, market conditions, technical challenges, and competitive dynamics. These statements speak only as of the date of publication.",
                  },
                ].map((d) => (
                  <div key={d.title} className="border-l-2 border-yellow-400/30 pl-5 print:border-yellow-600">
                    <p className="text-white/80 font-semibold text-[13px] mb-1 print:text-black print:text-[12px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      {d.title}
                    </p>
                    <p className="text-white/45 text-[12px] leading-[1.75] print:text-gray-600 print:text-[10px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      {d.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Footer ── */}
          <div className="border-t border-white/8 pt-10 pb-16 print:border-gray-200 print:pb-8 print:pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#00aeef] rounded-[7px] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[11px] leading-none" style={{ fontFamily: "var(--font-mona-sans)", fontWeight: 900 }}>OUT</span>
                </div>
                <div>
                  <div className="text-white text-[13px] font-semibold print:text-black print:text-[11px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>Out Mobility</div>
                  <div className="text-white/35 text-[11px] print:text-gray-500 print:text-[10px]" style={{ fontFamily: "var(--font-instrument-sans)" }}>Ecosystem Whitepaper · v1.0 · May 2026</div>
                </div>
              </div>
              <div className="flex items-center gap-3 no-print">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-[#00aeef] hover:bg-[#00c4ff] text-white px-5 py-2.5 rounded-[10px] transition-colors text-[13px] cursor-pointer"
                  style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 600 }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v13M12 16l-4-4M12 16l4-4M4 20h16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download PDF
                </button>
                <Link
                  href="/"
                  className="text-white/40 hover:text-white text-[13px] transition-colors"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  ← Back to Ecosystem
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
