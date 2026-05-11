"use client";

import { ShieldCheck, AlertTriangle, XCircle, Flag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { mockFraudRecords } from "@/lib/mock-data";
import { formatNumber, formatDateShort } from "@/lib/utils";

export default function AdminFraudPage() {
  const flagged = mockFraudRecords.filter((r) => r.flag !== "valid");
  const valid = mockFraudRecords.filter((r) => r.flag === "valid");

  return (
    <div>
      <PageHeader
        title="Fraud Review"
        description="Review and action flagged impressions from the verification pipeline."
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-[var(--color-warning)]" />
            <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Suspicious</p>
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">
            {mockFraudRecords.filter((r) => r.flag === "suspicious").length}
          </p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <XCircle size={14} className="text-[var(--color-danger)]" />
            <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Invalid</p>
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">
            {mockFraudRecords.filter((r) => r.flag === "invalid").length}
          </p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={14} className="text-[var(--color-success)]" />
            <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Verified OK</p>
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">{valid.length}</p>
        </Card>
      </div>

      {/* Flagged records */}
      {flagged.length > 0 ? (
        <Card padding="none" className="mb-4">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[var(--color-border)]">
            <Flag size={16} className="text-[var(--color-warning)]" />
            <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)]">Flagged records</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--color-surface-subtle)]">
                  {["Device", "Campaign", "Date", "Impressions", "Flag", "Reason", "Action"].map((h) => (
                    <th key={h} className="px-5 py-3 text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {flagged.map((r) => (
                  <tr key={r.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)]">
                    <td className="px-5 py-4 text-sm font-mono text-[var(--color-text-primary)]">{r.deviceId}</td>
                    <td className="px-5 py-4 text-sm text-[var(--color-text-primary)]">{r.campaignName}</td>
                    <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">{formatDateShort(r.date)}</td>
                    <td className="px-5 py-4 text-sm font-mono text-[var(--color-text-primary)]">{formatNumber(r.impressions)}</td>
                    <td className="px-5 py-4">
                      <Badge variant={r.flag === "suspicious" ? "suspicious" : "invalid"} />
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)] max-w-[200px]">{r.reason ?? "—"}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5">
                        <Button size="sm" variant="ghost">Approve</Button>
                        <Button size="sm" variant="danger">Reject</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="flex flex-col items-center py-8 text-center">
            <ShieldCheck size={28} className="text-[var(--color-success)] mb-3" />
            <p className="text-[15px] font-semibold text-[var(--color-text-primary)]">All clear</p>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">No flagged impressions to review.</p>
          </div>
        </Card>
      )}

      {/* Trust note */}
      <div className="flex items-start gap-3 p-4 bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
        <ShieldCheck size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
        <p className="text-xs text-[var(--color-text-secondary)]">
          Impressions are automatically flagged by the verification pipeline when GPS telemetry,
          device heartbeat, or impression velocity falls outside normal parameters.
          Rejected impressions are excluded from advertiser reports and billing.
        </p>
      </div>
    </div>
  );
}
