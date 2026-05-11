"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tv2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    if (email === "admin@outdmobility.com") {
      router.push("/admin/overview");
    } else if (email && password) {
      router.push("/dashboard");
    } else {
      setError("Please check your email and password.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      {/* Top bar */}
      <div className="px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-7 rounded-[var(--radius-md)] bg-[var(--color-brand-navy)] flex items-center justify-center">
            <Tv2 size={14} className="text-[var(--color-brand-sky)]" />
          </div>
          <span className="text-sm font-bold text-[var(--color-text-primary)]">Out-door</span>
        </Link>
        <Link href="/signup" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
          Create account
        </Link>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
              Welcome back
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Sign in to manage your campaigns.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full h-10 px-3 pr-10 text-sm text-[var(--color-text-primary)] bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] focus:ring-opacity-30 transition-all placeholder:text-[var(--color-text-tertiary)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-[var(--color-danger)] bg-[var(--color-danger-subtle)] px-3 py-2.5 rounded-[var(--radius-md)]">
                {error}
              </p>
            )}

            <div className="flex items-center justify-end">
              <Link href="/forgot-password" className="text-xs text-[var(--color-accent)] hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" loading={loading} className="w-full h-11 text-[15px] mt-1">
              Sign in
            </Button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-3 bg-[var(--color-surface-subtle)] rounded-[var(--radius-md)] border border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-text-secondary)] mb-1 font-medium">Demo access</p>
            <p className="text-xs text-[var(--color-text-tertiary)]">
              Advertiser: any email + any password
            </p>
            <p className="text-xs text-[var(--color-text-tertiary)]">
              Admin: admin@outdmobility.com
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[var(--color-accent)] font-medium hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
