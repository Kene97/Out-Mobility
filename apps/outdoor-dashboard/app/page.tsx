import Link from "next/link";
import { ArrowRight, CheckCircle, Tv2, MapPin, BarChart2, Shield } from "lucide-react";

const features = [
  {
    icon: Tv2,
    title: "In-car screens that work",
    description:
      "Android tablets mounted in ride-hail, fleet, and taxi vehicles across Lagos and Abuja. Your ad, in front of every passenger.",
  },
  {
    icon: Shield,
    title: "Every impression verified",
    description:
      "Trip-level GPS + device telemetry confirms your ad was shown. No fake views, no wasted budget.",
  },
  {
    icon: MapPin,
    title: "Precise geo-targeting",
    description:
      "Target city-wide or focus on specific neighbourhoods. We have vehicles in the right places.",
  },
  {
    icon: BarChart2,
    title: "Live campaign reporting",
    description:
      "Track impressions, budget, and CPM in real time. Download verified reports anytime.",
  },
];

const stats = [
  { value: "167+", label: "Screens deployed" },
  { value: "142", label: "Active vehicles" },
  { value: "97.3%", label: "Verification rate" },
  { value: "$5–8", label: "CPM" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-[var(--radius-md)] bg-[var(--color-brand-navy)] flex items-center justify-center">
              <Tv2 size={16} className="text-[var(--color-brand-sky)]" />
            </div>
            <span className="text-[16px] font-bold text-[var(--color-text-primary)] tracking-tight">
              Out-door
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 h-9 px-4 text-sm font-medium text-white bg-[var(--color-accent)] rounded-[var(--radius-md)] hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Get started <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-24 sm:pt-28 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-accent-subtle)] text-[var(--color-accent)] text-xs font-medium mb-6">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            142 vehicles active now in Lagos
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[var(--color-text-primary)] leading-[1.1] tracking-tight mb-6">
            Your ad. In every{" "}
            <span className="text-[var(--color-accent)]">ride</span>.
            <br />
            Verified.
          </h1>

          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10">
            Out-door connects brands to passengers inside vehicles across Nigeria.
            Launch a campaign in 3 minutes. Every impression is verified by GPS and
            device telemetry — not guessed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 text-[15px] font-semibold text-white bg-[var(--color-accent)] rounded-[var(--radius-md)] hover:bg-[var(--color-accent-hover)] transition-colors shadow-[var(--shadow-sm)]"
            >
              Launch your first campaign <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 text-[15px] font-medium text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-[var(--radius-md)] hover:bg-[var(--color-surface-subtle)] transition-colors"
            >
              Sign in to dashboard
            </Link>
          </div>
          <p className="mt-5 text-xs text-[var(--color-text-tertiary)]">
            No setup fees. Minimum budget $500. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-bg)] py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="how-it-works" className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight mb-3">
              Infrastructure-grade advertising
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
              We&apos;re not a media agency. We&apos;re the software layer that makes in-vehicle
              advertising reliable, measurable, and scalable.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="p-6 bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xs)]"
                >
                  <div className="size-10 rounded-[var(--radius-md)] bg-[var(--color-accent-subtle)] flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[var(--color-accent)]" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-2">{f.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 sm:px-6 bg-[var(--color-bg)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] text-center mb-10">
            Launch a campaign in 3 minutes
          </h2>
          <div className="flex flex-col gap-0">
            {[
              { step: "1", title: "Create your campaign", body: "Set a name, budget, start and end date. No complicated setup." },
              { step: "2", title: "Upload your creative", body: "A short MP4 or image. Max 60 seconds. We handle delivery." },
              { step: "3", title: "Pick your target area", body: "Choose a city or custom radius. We show you how many vehicles are in range." },
              { step: "4", title: "Submit and go live", body: "We review your campaign within 24 hours. Once live, track every impression in real time." },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex gap-4 sm:gap-6">
                <div className="flex flex-col items-center">
                  <div className="size-9 shrink-0 rounded-full bg-[var(--color-accent)] text-white text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </div>
                  {i < arr.length - 1 && <div className="w-px flex-1 bg-[var(--color-border)] my-1" />}
                </div>
                <div className="pb-8">
                  <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 bg-[var(--color-brand-navy)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to reach passengers?</h2>
          <p className="text-slate-400 mb-8 text-[15px]">
            Join the brands already running verified in-car campaigns across Nigeria.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 h-12 px-6 text-[15px] font-semibold bg-[var(--color-brand-sky)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity"
          >
            Launch your campaign <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-[var(--radius-sm)] bg-[var(--color-brand-navy)] flex items-center justify-center">
              <Tv2 size={12} className="text-[var(--color-brand-sky)]" />
            </div>
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">Out-door</span>
            <span className="text-[var(--color-text-tertiary)] text-sm">by Out Mobility</span>
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)]">© 2026 Out Mobility Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
