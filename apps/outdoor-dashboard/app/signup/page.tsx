"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tv2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const perks = [
  "Launch campaigns in 3 minutes",
  "GPS-verified impression reporting",
  "Real-time dashboard",
  "No monthly fees",
];

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", password: "" });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col lg:flex-row">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 bg-[var(--color-brand-navy)] p-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="size-8 rounded-[var(--radius-md)] bg-white/10 flex items-center justify-center">
            <Tv2 size={16} className="text-[var(--color-brand-sky)]" />
          </div>
          <span className="text-[15px] font-bold text-white">Out-door</span>
        </Link>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3 leading-snug">
            Reach passengers.
            <br />
            Verified.
          </h2>
          <p className="text-sm text-slate-400 mb-8 leading-relaxed">
            In-car advertising that works — delivered to passengers across Nigeria
            and verified by GPS telemetry.
          </p>
          <ul className="flex flex-col gap-3">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-slate-300">
                <CheckCircle size={16} className="text-[var(--color-brand-sky)] shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-slate-600">
          © 2026 Out Mobility Inc.
        </p>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <div className="lg:hidden px-4 py-4 flex items-center justify-between border-b border-[var(--color-border)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-7 rounded-[var(--radius-md)] bg-[var(--color-brand-navy)] flex items-center justify-center">
              <Tv2 size={14} className="text-[var(--color-brand-sky)]" />
            </div>
            <span className="text-sm font-bold text-[var(--color-text-primary)]">Out-door</span>
          </Link>
          <Link href="/login" className="text-sm text-[var(--color-text-secondary)]">Sign in</Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
                Create your account
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Free to join. Start your first campaign today.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Your name"
                placeholder="Amara Okafor"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
              <Input
                label="Company / Brand name"
                placeholder="Brand X Nigeria"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                required
              />
              <Input
                label="Work email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                helper="At least 8 characters"
                required
                minLength={8}
              />

              <Button type="submit" loading={loading} className="w-full h-11 text-[15px] mt-2">
                Create account — it&apos;s free
              </Button>

              <p className="text-[11px] text-center text-[var(--color-text-tertiary)]">
                By creating an account you agree to our{" "}
                <Link href="#" className="underline">Terms</Link> and{" "}
                <Link href="#" className="underline">Privacy Policy</Link>.
              </p>
            </form>

            <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
              Already have an account?{" "}
              <Link href="/login" className="text-[var(--color-accent)] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
