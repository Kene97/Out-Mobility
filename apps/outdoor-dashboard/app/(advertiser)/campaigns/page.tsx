"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MoreHorizontal, Pause, Play, Download, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { ProgressBar } from "@/components/ui/progress";
import { EmptyState } from "@/components/ui/empty-state";
import { mockCampaigns } from "@/lib/mock-data";
import { formatNumber, formatCurrency, formatDateShort, budgetPercent } from "@/lib/utils";
import type { CampaignStatus } from "@/types";

const statusFilters: { label: string; value: CampaignStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Paused", value: "paused" },
  { label: "Completed", value: "completed" },
  { label: "Draft", value: "draft" },
];

export default function CampaignsPage() {
  const [filter, setFilter] = useState<CampaignStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = mockCampaigns.filter((c) => {
    const matchStatus = filter === "all" || c.status === filter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <PageHeader
        title="Campaigns"
        description="Create and manage your advertising campaigns."
        action={
          <Link href="/campaigns/new">
            <Button>New campaign</Button>
          </Link>
        }
      />

      {/* Filters + search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`shrink-0 h-8 px-3 rounded-[var(--radius-md)] text-sm font-medium transition-all ${
                filter === f.value
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)]"
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
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-8 pr-3 w-full sm:w-56 text-sm bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] focus:ring-opacity-30 transition-all placeholder:text-[var(--color-text-tertiary)]"
          />
        </div>
      </div>

      {/* Mobile: card list */}
      <div className="sm:hidden flex flex-col gap-3">
        {filtered.length === 0 ? (
          <EmptyState
            type="campaigns"
            title="No campaigns found"
            description="Try changing your filter or search term."
          />
        ) : (
          filtered.map((c) => (
            <Card key={c.id} padding="sm">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <Link href={`/campaigns/${c.id}`} className="text-sm font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-accent)] block truncate">
                    {c.name}
                  </Link>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                    {formatDateShort(c.startDate)} – {formatDateShort(c.endDate)}
                  </p>
                </div>
                <Badge variant={c.status as "active" | "paused" | "draft" | "completed" | "cancelled"} />
              </div>
              {c.status !== "draft" && (
                <>
                  <div className="grid grid-cols-2 gap-y-1.5 text-xs mb-3">
                    <span className="text-[var(--color-text-secondary)]">Times shown</span>
                    <span className="font-medium text-right">{formatNumber(c.impressions)}</span>
                    <span className="text-[var(--color-text-secondary)]">Amount spent</span>
                    <span className="font-medium text-right">{formatCurrency(c.spent)} / {formatCurrency(c.budget)}</span>
                    <span className="text-[var(--color-text-secondary)]">Rate per 1,000 shown</span>
                    <span className="font-medium text-right">{c.cpm ? `$${c.cpm.toFixed(2)}` : "—"}</span>
                  </div>
                  <ProgressBar value={budgetPercent(c.spent, c.budget)} size="sm" />
                </>
              )}
              <div className="flex gap-2 mt-3">
                <Link href={`/campaigns/${c.id}`} className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full">
                    <Eye size={13} /> View
                  </Button>
                </Link>
                {c.status === "active" && (
                  <Button variant="ghost" size="sm">
                    <Pause size={13} /> Pause
                  </Button>
                )}
                {c.status === "paused" && (
                  <Button variant="ghost" size="sm">
                    <Play size={13} /> Resume
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Desktop: table */}
      <Card padding="none" className="hidden sm:block overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            type="campaigns"
            title="No campaigns found"
            description="Try changing your filter or create your first campaign."
            action={{ label: "Create campaign", onClick: () => (window.location.href = "/campaigns/new") }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)]">
                  {["Campaign", "Status", "Times shown", "Amount spent", "Rate/1K", "Ends"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide text-left"
                    >
                      {h}
                    </th>
                  ))}
                  <th className="px-5 py-3 w-12" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)] transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/campaigns/${c.id}`}
                        className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        {c.name}
                      </Link>
                      <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
                        {formatDateShort(c.startDate)} – {formatDateShort(c.endDate)}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={c.status as "active" | "paused" | "draft" | "completed" | "cancelled"} />
                    </td>
                    <td className="px-5 py-4 text-sm font-mono text-[var(--color-text-primary)]">
                      {c.status === "draft" ? "—" : formatNumber(c.impressions)}
                    </td>
                    <td className="px-5 py-4">
                      {c.status === "draft" ? (
                        <span className="text-sm text-[var(--color-text-tertiary)]">—</span>
                      ) : (
                        <div className="flex flex-col gap-1.5">
                          <span className="text-sm text-[var(--color-text-primary)]">
                            {formatCurrency(c.spent)} <span className="text-[var(--color-text-tertiary)]">/ {formatCurrency(c.budget)}</span>
                          </span>
                          <ProgressBar value={budgetPercent(c.spent, c.budget)} size="sm" className="w-24" />
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm font-mono text-[var(--color-text-primary)]">
                      {c.cpm ? `$${c.cpm.toFixed(2)}` : "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                      {formatDateShort(c.endDate)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === c.id ? null : c.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-[var(--radius-md)] hover:bg-[var(--color-border)] transition-all text-[var(--color-text-secondary)]"
                          aria-label="Actions"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        {openMenu === c.id && (
                          <div className="absolute right-0 top-8 z-20 w-44 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] py-1">
                            <Link href={`/campaigns/${c.id}`} className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)]">
                              <Eye size={14} /> View details
                            </Link>
                            {c.status === "active" && (
                              <button className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] w-full">
                                <Pause size={14} /> Pause
                              </button>
                            )}
                            {c.status === "paused" && (
                              <button className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] w-full">
                                <Play size={14} /> Resume
                              </button>
                            )}
                            <button className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] w-full">
                              <Download size={14} /> Download report
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
            Showing {filtered.length} of {mockCampaigns.length} campaigns
          </div>
        )}
      </Card>
    </div>
  );
}
