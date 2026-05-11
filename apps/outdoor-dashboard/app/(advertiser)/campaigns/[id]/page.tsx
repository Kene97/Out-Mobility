"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Pause, ShieldCheck, Info } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";
import { mockCampaigns, mockCampaignStats } from "@/lib/mock-data";
import { formatNumber, formatCurrency, formatDateShort, daysRemaining, budgetPercent } from "@/lib/utils";

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const campaign = mockCampaigns.find((c) => c.id === id) ?? mockCampaigns[0];
  const stats = mockCampaignStats;

  const budgetPct = budgetPercent(campaign.spent, campaign.budget);
  const days = daysRemaining(campaign.endDate);

  return (
    <div>
      {/* Back + header */}
      <div className="mb-6">
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-4 transition-colors"
        >
          <ArrowLeft size={14} /> Back to campaigns
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
                {campaign.name}
              </h1>
              <Badge variant={campaign.status as "active" | "paused" | "completed"} />
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {formatDateShort(campaign.startDate)} – {formatDateShort(campaign.endDate)} · {campaign.targetCity}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {campaign.status === "active" && (
              <Button variant="ghost" size="sm" icon={<Pause size={14} />}>
                Pause
              </Button>
            )}
            <Button variant="ghost" size="sm" icon={<Download size={14} />}>
              Export report
            </Button>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* Impressions */}
        <Card className="col-span-2 sm:col-span-1">
          <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
            Times your ad was shown
          </p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
              {formatNumber(stats.verifiedImpressions)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-[var(--color-success)]" />
            <span className="text-[11px] text-[var(--color-success)] font-medium">Verified</span>
            <button className="text-[var(--color-text-tertiary)]" aria-label="What does verified mean?">
              <Info size={11} />
            </button>
          </div>
        </Card>

        {/* Budget */}
        <Card>
          <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
            Budget spent
          </p>
          <p className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight mb-2">
            {formatCurrency(campaign.spent)}
          </p>
          <ProgressBar value={budgetPct} size="sm" className="mb-1" />
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            {budgetPct}% of {formatCurrency(campaign.budget)}
          </p>
        </Card>

        {/* CPM */}
        <Card>
          <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
            Rate per 1,000 shown
          </p>
          <p className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight mb-1">
            {campaign.cpm ? `$${campaign.cpm.toFixed(2)}` : "—"}
          </p>
          <p className="text-[11px] text-[var(--color-text-secondary)]">CPM</p>
        </Card>

        {/* Days remaining */}
        <Card>
          <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
            Days remaining
          </p>
          <p className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight mb-1">{days}</p>
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            Ends {formatDateShort(campaign.endDate)}
          </p>
        </Card>
      </div>

      {/* Chart */}
      <Card className="mb-6">
        <CardHeader title="How many times your ad was shown" description="Daily verified impressions" />
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.dailyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
              />
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: 13,
                  boxShadow: "var(--shadow-md)",
                }}
                formatter={(v: unknown) => [formatNumber(v as number), "Impressions"]}
              />
              <Bar dataKey="impressions" fill="var(--color-accent)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Device delivery */}
      <Card padding="none">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
          <div>
            <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)]">Delivery by vehicle</h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Device IDs are anonymised to protect driver privacy.
            </p>
          </div>
          <Button variant="ghost" size="sm" icon={<Download size={14} />}>
            CSV
          </Button>
        </div>

        {/* Mobile */}
        <div className="sm:hidden divide-y divide-[var(--color-border)]">
          {stats.deviceDelivery.map((d) => (
            <div key={d.deviceId} className="px-5 py-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{d.deviceId}</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Uptime {d.uptime}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{formatNumber(d.impressions)}</p>
                <Badge variant={d.status as "online" | "offline" | "paused"} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-surface-subtle)]">
                {["Device ID", "Times shown", "Uptime", "Status"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide text-left"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.deviceDelivery.map((d) => (
                <tr key={d.deviceId} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)]">
                  <td className="px-5 py-4 text-sm font-mono text-[var(--color-text-primary)]">{d.deviceId}</td>
                  <td className="px-5 py-4 text-sm font-mono text-[var(--color-text-primary)]">{formatNumber(d.impressions)}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text-primary)]">{d.uptime}%</td>
                  <td className="px-5 py-4">
                    <Badge variant={d.status as "online" | "offline" | "paused"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-[var(--color-border)]">
          <Button variant="ghost" size="md" icon={<Download size={14} />} className="w-full sm:w-auto">
            Download full verified report
          </Button>
        </div>
      </Card>
    </div>
  );
}
