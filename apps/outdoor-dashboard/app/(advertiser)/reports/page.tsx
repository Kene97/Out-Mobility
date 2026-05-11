"use client";

import { Download, ShieldCheck, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/page-header";
import { mockReports, mockCampaigns } from "@/lib/mock-data";
import { formatDateShort } from "@/lib/utils";

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Reports"
        description="Download verified impression data for your campaigns."
      />

      {/* Trust statement */}
      <div className="flex items-start gap-3 p-4 bg-[var(--color-success-subtle)] border border-[var(--color-success)] border-opacity-20 rounded-[var(--radius-lg)] mb-6">
        <ShieldCheck size={18} className="text-[var(--color-success)] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[var(--color-text-primary)]">Verified impression data only</p>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            All data in these reports is authenticated by Out Mobility telemetry — trip-level GPS plus device heartbeat.
            No estimates, no projections.
          </p>
        </div>
      </div>

      {/* Mobile: card list */}
      <div className="sm:hidden flex flex-col gap-3">
        {mockReports.map((r) => {
          const campaign = mockCampaigns.find((c) => c.id === r.campaignId);
          return (
            <Card key={r.id}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-start gap-2.5">
                  <div className="size-8 rounded-[var(--radius-md)] bg-[var(--color-accent-subtle)] flex items-center justify-center shrink-0">
                    <FileText size={14} className="text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{r.campaignName}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{r.period}</p>
                  </div>
                </div>
                {campaign && <Badge variant={campaign.status as "active" | "paused" | "completed"} />}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" icon={<Download size={13} />} className="flex-1 justify-center">
                  CSV
                </Button>
                <Button variant="ghost" size="sm" icon={<Download size={13} />} className="flex-1 justify-center">
                  PDF
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Desktop: table */}
      <Card padding="none" className="hidden sm:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)]">
                {["Campaign", "Period", "Status", "Download"].map((h) => (
                  <th key={h} className="px-5 py-3 text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockReports.map((r) => {
                const campaign = mockCampaigns.find((c) => c.id === r.campaignId);
                return (
                  <tr key={r.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="size-7 rounded-[var(--radius-md)] bg-[var(--color-accent-subtle)] flex items-center justify-center shrink-0">
                          <FileText size={13} className="text-[var(--color-accent)]" />
                        </div>
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">{r.campaignName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">{r.period}</td>
                    <td className="px-5 py-4">
                      {campaign && <Badge variant={campaign.status as "active" | "paused" | "completed"} />}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" icon={<Download size={13} />}>CSV</Button>
                        <Button variant="ghost" size="sm" icon={<Download size={13} />}>PDF</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
          Showing {mockReports.length} reports
        </div>
      </Card>
    </div>
  );
}
