"use client";

import { useState } from "react";
import { Check, X, Eye } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { mockCampaigns } from "@/lib/mock-data";
import { formatCurrency, formatNumber, formatDateShort } from "@/lib/utils";
import type { CampaignStatus } from "@/types";

const statusFilters: { label: string; value: CampaignStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Submitted", value: "submitted" },
  { label: "Active", value: "active" },
  { label: "Paused", value: "paused" },
  { label: "Completed", value: "completed" },
];

export default function AdminCampaignsPage() {
  const [filter, setFilter] = useState<CampaignStatus | "all">("all");
  const campaigns = mockCampaigns.filter((c) =>
    filter === "all" ? true : c.status === filter
  );

  return (
    <div>
      <PageHeader title="All Campaigns" description="Review, approve, and manage advertiser campaigns." />

      <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`shrink-0 h-8 px-3 rounded-[var(--radius-md)] text-sm font-medium transition-all ${
              filter === f.value ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)]">
                {["Campaign", "Advertiser", "Status", "Budget", "Impressions", "Dates", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)]">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{c.name}</p>
                    <p className="text-xs text-[var(--color-text-tertiary)]">{c.targetCity}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">Brand X Nigeria</td>
                  <td className="px-5 py-4"><Badge variant={c.status as "active" | "paused" | "draft" | "completed"} /></td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text-primary)]">{formatCurrency(c.budget)}</td>
                  <td className="px-5 py-4 text-sm font-mono text-[var(--color-text-primary)]">
                    {c.impressions > 0 ? formatNumber(c.impressions) : "—"}
                  </td>
                  <td className="px-5 py-4 text-xs text-[var(--color-text-secondary)]">
                    {formatDateShort(c.startDate)} – {formatDateShort(c.endDate)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      {c.status === "submitted" && (
                        <>
                          <Button size="sm" icon={<Check size={13} />}>Approve</Button>
                          <Button size="sm" variant="danger" icon={<X size={13} />}>Reject</Button>
                        </>
                      )}
                      {c.status !== "submitted" && (
                        <Button size="sm" variant="ghost" icon={<Eye size={13} />}>View</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
          {campaigns.length} campaigns
        </div>
      </Card>
    </div>
  );
}
