"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, TrendingUp, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { mockAnalytics, mockCampaigns } from "@/lib/mock-data";
import { formatNumber, formatCurrency } from "@/lib/utils";

const weeklyData = [
  { week: "Apr 7", impressions: 18200, spend: 480 },
  { week: "Apr 14", impressions: 22100, spend: 590 },
  { week: "Apr 21", impressions: 26800, spend: 680 },
  { week: "Apr 28", impressions: 31200, spend: 790 },
  { week: "May 5", impressions: 44591, spend: 940 },
];

const cpmTrend = [
  { week: "Apr 7", cpm: 7.2 },
  { week: "Apr 14", cpm: 6.9 },
  { week: "Apr 21", cpm: 6.7 },
  { week: "Apr 28", cpm: 6.5 },
  { week: "May 5", cpm: 6.58 },
];

function MetricCard({ label, value, trend, suffix }: { label: string; value: string; trend?: number; suffix?: string }) {
  const positive = (trend ?? 0) >= 0;
  return (
    <Card>
      <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">{label}</p>
      <p className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight mb-1">
        {value}
        {suffix && <span className="text-base font-medium text-[var(--color-text-secondary)] ml-1">{suffix}</span>}
      </p>
      {trend !== undefined && (
        <p className={`text-xs font-medium flex items-center gap-0.5 ${positive ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}>
          <ArrowUpRight size={12} className={positive ? "" : "rotate-180"} />
          {positive ? "+" : ""}{trend}% vs last period
        </p>
      )}
    </Card>
  );
}

export default function AnalyticsPage() {
  const { totalImpressions, impressionsTrend, totalSpent, spentTrend, verifiedRate, verifiedTrend, activeCampaigns } = mockAnalytics;

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Performance summary across all your campaigns."
      />

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <MetricCard label="Times your ads were shown" value={formatNumber(totalImpressions)} trend={impressionsTrend} />
        <MetricCard label="Total amount spent" value={formatCurrency(totalSpent)} trend={spentTrend} />
        <MetricCard label="Verified impression rate" value={`${verifiedRate}%`} trend={verifiedTrend} />
        <MetricCard label="Active campaigns" value={String(activeCampaigns)} />
      </div>

      {/* Verification callout */}
      <div className="flex items-start sm:items-center gap-3 p-4 bg-[var(--color-success-subtle)] border border-[var(--color-success)] border-opacity-20 rounded-[var(--radius-lg)] mb-6">
        <ShieldCheck size={18} className="text-[var(--color-success)] shrink-0 mt-0.5 sm:mt-0" />
        <div>
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            {verifiedRate}% of your impressions are GPS-verified
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Verified using trip-level GPS data + device telemetry from every vehicle in your campaign.
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)]">Impressions over time</h3>
              <p className="text-xs text-[var(--color-text-secondary)]">Weekly totals</p>
            </div>
            <TrendingUp size={16} className="text-[var(--color-success)]" />
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "white", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", fontSize: 12, boxShadow: "var(--shadow-md)" }}
                  formatter={(v: unknown) => [formatNumber(v as number), "Impressions"]}
                />
                <Bar dataKey="impressions" fill="var(--color-accent)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)]">Rate per 1,000 shown</h3>
              <p className="text-xs text-[var(--color-text-secondary)]">CPM trend</p>
            </div>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpmTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} domain={[5.5, 8]} />
                <Tooltip
                  contentStyle={{ background: "white", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", fontSize: 12, boxShadow: "var(--shadow-md)" }}
                  formatter={(v: unknown) => [`$${(v as number).toFixed(2)}`, "CPM"]}
                />
                <Line type="monotone" dataKey="cpm" stroke="var(--color-accent)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Campaign breakdown */}
      <Card padding="none">
        <div className="px-5 py-4 border-b border-[var(--color-border)]">
          <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)]">By campaign</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-surface-subtle)]">
                {["Campaign", "Times shown", "Amount spent", "Rate/1K", "Verified"].map((h) => (
                  <th key={h} className="px-5 py-3 text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockCampaigns.filter((c) => c.status !== "draft").map((c) => (
                <tr key={c.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)]">
                  <td className="px-5 py-4 text-sm font-medium text-[var(--color-text-primary)]">{c.name}</td>
                  <td className="px-5 py-4 text-sm font-mono text-[var(--color-text-primary)]">{formatNumber(c.impressions)}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text-primary)]">{formatCurrency(c.spent)}</td>
                  <td className="px-5 py-4 text-sm font-mono text-[var(--color-text-primary)]">${c.cpm.toFixed(2)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-[var(--color-success)]">
                      <ShieldCheck size={14} />
                      <span className="text-sm font-medium">97.3%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
