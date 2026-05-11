"use client";

import { Tv2, Megaphone, ShieldCheck, Activity, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/page-header";
import { mockSystemHealth, mockCampaigns, mockDevices } from "@/lib/mock-data";
import { formatNumber, formatDate } from "@/lib/utils";

const dailyImpressions = [
  { day: "Apr 28", impressions: 11200 },
  { day: "Apr 29", impressions: 12800 },
  { day: "Apr 30", impressions: 13400 },
  { day: "May 1", impressions: 14100 },
  { day: "May 2", impressions: 13900 },
  { day: "May 3", impressions: 15200 },
  { day: "May 4", impressions: 14820 },
];

function StatusDot({ status }: { status: "healthy" | "degraded" | "down" }) {
  const map = { healthy: "text-[var(--color-success)]", degraded: "text-[var(--color-warning)]", down: "text-[var(--color-danger)]" };
  const Icon = { healthy: CheckCircle, degraded: AlertTriangle, down: XCircle }[status];
  return <Icon size={16} className={map[status]} />;
}

export default function AdminOverviewPage() {
  const health = mockSystemHealth;
  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active").length;
  const onlineDevices = mockDevices.filter((d) => d.status === "online").length;

  return (
    <div>
      <PageHeader
        title="System Overview"
        description={`Last updated ${formatDate(health.lastUpdated, { hour: "numeric", minute: "2-digit" })}`}
      />

      {/* System health */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <Card>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">API</p>
            <StatusDot status={health.apiStatus} />
          </div>
          <p className="text-lg font-bold text-[var(--color-text-primary)] capitalize">{health.apiStatus}</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Device pipeline</p>
            <StatusDot status={health.devicePipelineStatus} />
          </div>
          <p className="text-lg font-bold text-[var(--color-text-primary)] capitalize">{health.devicePipelineStatus}</p>
        </Card>
        <Card className="col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Impressions today</p>
            <Activity size={14} className="text-[var(--color-accent)]" />
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">{formatNumber(health.impressionsToday)}</p>
        </Card>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Active devices", value: `${onlineDevices} / ${health.totalDevices}`, icon: Tv2, color: "text-[var(--color-success)]" },
          { label: "Active campaigns", value: String(activeCampaigns), icon: Megaphone, color: "text-[var(--color-accent)]" },
          { label: "Total devices", value: String(health.totalDevices), icon: Tv2, color: "text-[var(--color-text-secondary)]" },
          { label: "Verification rate", value: "97.3%", icon: ShieldCheck, color: "text-[var(--color-success)]" },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">{m.label}</p>
                <Icon size={14} className={m.color} />
              </div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">{m.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-4">Daily impressions</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyImpressions} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} />
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

        {/* Device status breakdown */}
        <Card>
          <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-4">Device status</h3>
          <div className="flex flex-col gap-3">
            {[
              { label: "Online", count: mockDevices.filter((d) => d.status === "online").length, variant: "online" as const, total: health.totalDevices },
              { label: "Paused", count: mockDevices.filter((d) => d.status === "paused").length, variant: "paused" as const, total: health.totalDevices },
              { label: "Offline", count: mockDevices.filter((d) => d.status === "offline").length, variant: "offline" as const, total: health.totalDevices },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={row.variant} />
                    <span className="text-sm text-[var(--color-text-secondary)]">{row.label}</span>
                  </div>
                  <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{row.count}</span>
                </div>
                <div className="w-full h-1.5 bg-[var(--color-surface-subtle)] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      row.variant === "online" ? "bg-[var(--color-success)]" :
                      row.variant === "paused" ? "bg-[var(--color-warning)]" : "bg-[var(--color-danger)]"
                    }`}
                    style={{ width: `${(row.count / row.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent campaigns */}
      <Card padding="none">
        <div className="px-5 py-4 border-b border-[var(--color-border)]">
          <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)]">Active campaigns</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-surface-subtle)]">
                {["Campaign", "Advertiser", "Status", "Impressions", "Budget used"].map((h) => (
                  <th key={h} className="px-5 py-3 text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockCampaigns.filter((c) => c.status !== "draft").slice(0, 4).map((c) => (
                <tr key={c.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)]">
                  <td className="px-5 py-4 text-sm font-medium text-[var(--color-text-primary)]">{c.name}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">Brand X Nigeria</td>
                  <td className="px-5 py-4"><Badge variant={c.status as "active" | "paused" | "completed"} /></td>
                  <td className="px-5 py-4 text-sm font-mono text-[var(--color-text-primary)]">{formatNumber(c.impressions)}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text-primary)]">{Math.round((c.spent / c.budget) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
