"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/page-header";
import { mockDevices } from "@/lib/mock-data";
import { formatNumber, formatDate } from "@/lib/utils";
import type { DeviceStatus } from "@/types";

const statusFilters: { label: string; value: DeviceStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Online", value: "online" },
  { label: "Paused", value: "paused" },
  { label: "Offline", value: "offline" },
];

export default function AdminDevicesPage() {
  const [filter, setFilter] = useState<DeviceStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = mockDevices.filter((d) => {
    const matchStatus = filter === "all" || d.status === filter;
    const matchSearch =
      d.deviceId.toLowerCase().includes(search.toLowerCase()) ||
      d.city.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <PageHeader
        title="Device Fleet"
        description={`${mockDevices.filter((d) => d.status === "online").length} of ${mockDevices.length} devices online`}
      />

      {/* Map placeholder */}
      <div className="h-48 sm:h-64 bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-[var(--radius-xl)] flex items-center justify-center mb-6">
        <div className="text-center">
          <MapPin size={28} className="text-[var(--color-text-tertiary)] mx-auto mb-2" />
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">Live device map</p>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-1">Mapbox integration — Lagos, Nigeria</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="flex gap-1">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`h-8 px-3 rounded-[var(--radius-md)] text-sm font-medium transition-all ${
                filter === f.value ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="sm:ml-auto relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
          <input
            type="text"
            placeholder="Search devices…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-8 pr-3 w-full sm:w-52 text-sm bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] focus:ring-opacity-30 placeholder:text-[var(--color-text-tertiary)]"
          />
        </div>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden flex flex-col gap-3">
        {filtered.map((d) => (
          <Card key={d.id}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-mono font-semibold text-[var(--color-text-primary)]">{d.deviceId}</p>
              <Badge variant={d.status} />
            </div>
            <div className="grid grid-cols-2 gap-y-1.5 text-xs">
              <span className="text-[var(--color-text-secondary)]">City</span>
              <span className="text-right text-[var(--color-text-primary)]">{d.city}</span>
              <span className="text-[var(--color-text-secondary)]">Impressions today</span>
              <span className="text-right font-mono text-[var(--color-text-primary)]">{formatNumber(d.impressionsToday)}</span>
              <span className="text-[var(--color-text-secondary)]">Uptime</span>
              <span className="text-right text-[var(--color-text-primary)]">{d.uptime}%</span>
              <span className="text-[var(--color-text-secondary)]">Last seen</span>
              <span className="text-right text-[var(--color-text-primary)]">{formatDate(d.lastSeen, { hour: "numeric", minute: "2-digit" })}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop table */}
      <Card padding="none" className="hidden sm:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)]">
                {["Device ID", "Status", "City", "Impressions today", "Uptime", "Last seen"].map((h) => (
                  <th key={h} className="px-5 py-3 text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)]">
                  <td className="px-5 py-4 text-sm font-mono font-medium text-[var(--color-text-primary)]">{d.deviceId}</td>
                  <td className="px-5 py-4"><Badge variant={d.status} /></td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">{d.city}</td>
                  <td className="px-5 py-4 text-sm font-mono text-[var(--color-text-primary)]">{formatNumber(d.impressionsToday)}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text-primary)]">{d.uptime}%</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                    {formatDate(d.lastSeen, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
          Showing {filtered.length} of {mockDevices.length} devices
        </div>
      </Card>
    </div>
  );
}
