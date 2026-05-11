"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight, Play, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { ProgressBar } from "@/components/ui/progress";
import { mockCampaigns, mockAnalytics } from "@/lib/mock-data";
import { formatNumber, formatCurrency, formatDateShort, budgetPercent } from "@/lib/utils";

function MetricCard({
  label,
  value,
  trend,
  trendLabel,
  children,
}: {
  label: string;
  value: string;
  trend?: number;
  trendLabel?: string;
  children?: React.ReactNode;
}) {
  const positive = (trend ?? 0) >= 0;
  return (
    <Card>
      <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
        {label}
      </p>
      <p className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight mb-1">
        {value}
      </p>
      {trend !== undefined && (
        <p
          className={`text-xs font-medium flex items-center gap-1 ${
            positive ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"
          }`}
        >
          <ArrowUpRight size={12} className={positive ? "" : "rotate-180"} />
          {positive ? "+" : ""}
          {trend}% {trendLabel}
        </p>
      )}
      {children}
    </Card>
  );
}

const activeCampaigns = mockCampaigns.filter(
  (c) => c.status === "active" || c.status === "paused"
);

export default function DashboardPage() {
  const { totalImpressions, impressionsTrend, activeCampaigns: activeCount, campaignsTrend, totalSpent, spentTrend } =
    mockAnalytics;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description={`Good morning, Amara. Here's what's happening today.`}
        action={
          <Link href="/campaigns/new">
            <Button size="md">
              New campaign
            </Button>
          </Link>
        }
      />

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <MetricCard
          label="Active campaigns"
          value={String(activeCount)}
          trend={campaignsTrend}
          trendLabel="this week"
        />
        <MetricCard
          label="Times your ads were shown"
          value={formatNumber(totalImpressions)}
          trend={impressionsTrend}
          trendLabel="vs last week"
        />
        <MetricCard
          label="Total spent"
          value={formatCurrency(totalSpent)}
          trend={spentTrend}
          trendLabel="vs last week"
        />
      </div>

      {/* Active campaigns table */}
      <Card padding="none" className="mb-6">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
          <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)]">
            Your campaigns
          </h2>
          <Link href="/campaigns" className="text-xs text-[var(--color-accent)] hover:underline flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {/* Mobile: card list */}
        <div className="sm:hidden divide-y divide-[var(--color-border)]">
          {activeCampaigns.map((c) => (
            <div key={c.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{c.name}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                    Ends {formatDateShort(c.endDate)}
                  </p>
                </div>
                <Badge variant={c.status as "active" | "paused"} />
              </div>
              <div className="grid grid-cols-2 gap-y-1 text-xs">
                <span className="text-[var(--color-text-secondary)]">Times shown</span>
                <span className="font-medium text-[var(--color-text-primary)] text-right">{formatNumber(c.impressions)}</span>
                <span className="text-[var(--color-text-secondary)]">Spent</span>
                <span className="font-medium text-[var(--color-text-primary)] text-right">{formatCurrency(c.spent)}</span>
              </div>
              <ProgressBar value={budgetPercent(c.spent, c.budget)} className="mt-3" size="sm" />
              <p className="text-[10px] text-[var(--color-text-tertiary)] mt-1">
                {budgetPercent(c.spent, c.budget)}% of {formatCurrency(c.budget)} budget used
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-surface-subtle)]">
                {["Campaign", "Status", "Times shown", "Spent", "Ends"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide text-left first:rounded-tl-none last:rounded-tr-none"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeCampaigns.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)] transition-colors group"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/campaigns/${c.id}`}
                      className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={c.status as "active" | "paused"} />
                  </td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text-primary)] font-mono">
                    {formatNumber(c.impressions)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-[var(--color-text-primary)]">
                        {formatCurrency(c.spent)}
                      </span>
                      <ProgressBar value={budgetPercent(c.spent, c.budget)} size="sm" className="w-20" />
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                    {formatDateShort(c.endDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">
          Quick actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => {}}
            className="flex items-center gap-3 p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-sm)] transition-all text-left group"
          >
            <div className="size-9 rounded-[var(--radius-md)] bg-[var(--color-warning-subtle)] flex items-center justify-center shrink-0">
              <Play size={16} className="text-[var(--color-warning)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">Resume &ldquo;Product Launch Q2&rdquo;</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Campaign is currently paused</p>
            </div>
          </button>

          <button
            onClick={() => {}}
            className="flex items-center gap-3 p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-sm)] transition-all text-left group"
          >
            <div className="size-9 rounded-[var(--radius-md)] bg-[var(--color-accent-subtle)] flex items-center justify-center shrink-0">
              <Download size={16} className="text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">Download May report</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Brand Awareness May 2026</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
