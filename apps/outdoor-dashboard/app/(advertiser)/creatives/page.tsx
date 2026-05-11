"use client";

import { useState, useCallback } from "react";
import { Upload, FileVideo, Image as ImageIcon, Trash2, Eye, X, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { ProgressBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatDateShort } from "@/lib/utils";

interface Creative {
  id: string;
  name: string;
  type: "video" | "image";
  size: number;
  duration?: number;
  uploadedAt: string;
  usedInCampaigns: number;
}

const mockCreatives: Creative[] = [
  { id: "cr1", name: "brand_awareness_may.mp4", type: "video", size: 28.4, duration: 30, uploadedAt: "2026-04-28", usedInCampaigns: 1 },
  { id: "cr2", name: "promo_flash.mp4", type: "video", size: 14.1, duration: 15, uploadedAt: "2026-05-08", usedInCampaigns: 1 },
  { id: "cr3", name: "q2_launch.mp4", type: "video", size: 42.7, duration: 45, uploadedAt: "2026-04-20", usedInCampaigns: 1 },
  { id: "cr4", name: "static_banner.png", type: "image", size: 1.2, uploadedAt: "2026-05-01", usedInCampaigns: 0 },
];

export default function CreativesPage() {
  const [creatives, setCreatives] = useState(mockCreatives);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          setCreatives((prev) => [
            {
              id: `cr${Date.now()}`,
              name: file.name,
              type: file.type.includes("video") ? "video" : "image",
              size: parseFloat((file.size / (1024 * 1024)).toFixed(1)),
              uploadedAt: new Date().toISOString().split("T")[0],
              usedInCampaigns: 0,
            },
            ...prev,
          ]);
          return 100;
        }
        return p + 8;
      });
    }, 100);
  }, []);

  return (
    <div>
      <PageHeader
        title="Creatives"
        description="Upload and manage your ad files."
      />

      {/* Upload area */}
      <label
        className={`flex flex-col items-center justify-center gap-3 h-44 border-2 border-dashed rounded-[var(--radius-xl)] cursor-pointer transition-all mb-6 ${
          dragging ? "border-[var(--color-accent)] bg-[var(--color-accent-subtle)]" : "border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)]"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files[0];
          if (f) handleFile(f);
        }}
      >
        {uploading ? (
          <div className="w-full max-w-xs px-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-2 text-center">Uploading…</p>
            <ProgressBar value={uploadProgress} />
            <p className="text-xs text-[var(--color-text-tertiary)] mt-1 text-center">{uploadProgress}%</p>
          </div>
        ) : (
          <>
            <div className="size-12 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] flex items-center justify-center">
              <Upload size={22} className="text-[var(--color-text-secondary)]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                Drag & drop, or <span className="text-[var(--color-accent)]">click to browse</span>
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                MP4 up to 60 sec / 50MB &nbsp;·&nbsp; JPG / PNG up to 5MB
              </p>
            </div>
          </>
        )}
        <input
          type="file"
          accept="video/mp4,image/jpeg,image/png"
          className="sr-only"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </label>

      {/* Creatives grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {creatives.map((cr) => {
          const Icon = cr.type === "video" ? FileVideo : ImageIcon;
          return (
            <Card key={cr.id} padding="none">
              {/* Thumbnail */}
              <div className="h-28 bg-[var(--color-surface-subtle)] rounded-t-[var(--radius-lg)] flex items-center justify-center border-b border-[var(--color-border)]">
                <Icon size={28} className="text-[var(--color-text-tertiary)]" />
              </div>

              <div className="p-4">
                <p className="text-sm font-medium text-[var(--color-text-primary)] truncate mb-1">{cr.name}</p>
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] mb-3">
                  <span>{cr.size} MB</span>
                  {cr.duration && <><span>·</span><span>{cr.duration}s</span></>}
                  <span>·</span>
                  <span>{formatDateShort(cr.uploadedAt)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    {cr.usedInCampaigns > 0
                      ? `Used in ${cr.usedInCampaigns} campaign${cr.usedInCampaigns > 1 ? "s" : ""}`
                      : "Not yet used"}
                  </span>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-surface-subtle)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors" aria-label="Preview">
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => setCreatives((prev) => prev.filter((c) => c.id !== cr.id))}
                      className="p-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-danger-subtle)] text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {creatives.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-[var(--color-text-secondary)]">No creatives yet. Upload your first ad above.</p>
        </div>
      )}
    </div>
  );
}
