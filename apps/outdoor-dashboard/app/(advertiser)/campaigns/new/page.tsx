"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Check,
  MapPin,
  FileVideo,
  X,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { ProgressBar } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";

const STEPS = ["Campaign basics", "Upload your ad", "Target area", "Review & launch"];

type Radius = "city-wide" | "center" | "custom";

interface FormState {
  name: string;
  startDate: string;
  endDate: string;
  budget: string;
  city: string;
  radius: Radius;
  customRadius: string;
  file: File | null;
}

const CITY_OPTIONS = [
  { value: "lagos", label: "Lagos, Nigeria" },
  { value: "abuja", label: "Abuja, Nigeria" },
  { value: "portHarcourt", label: "Port Harcourt, Nigeria" },
  { value: "kano", label: "Kano, Nigeria" },
];

const VEHICLE_COUNTS: Record<string, Record<Radius, number>> = {
  lagos: { "city-wide": 142, center: 64, custom: 90 },
  abuja: { "city-wide": 38, center: 18, custom: 25 },
  portHarcourt: { "city-wide": 22, center: 10, custom: 15 },
  kano: { "city-wide": 15, center: 7, custom: 11 },
};

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
          <div
            className={`size-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
              i < current
                ? "bg-[var(--color-success)] text-white"
                : i === current
                ? "bg-[var(--color-accent)] text-white"
                : "bg-[var(--color-surface-subtle)] text-[var(--color-text-tertiary)] border border-[var(--color-border)]"
            }`}
          >
            {i < current ? <Check size={14} /> : i + 1}
          </div>
          <span
            className={`text-xs font-medium hidden sm:block whitespace-nowrap ${
              i === current ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-tertiary)]"
            }`}
          >
            {label}
          </span>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-px mx-1 ${i < current ? "bg-[var(--color-success)]" : "bg-[var(--color-border)]"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Step 1 ── */
function Step1({ form, update }: { form: FormState; update: (k: keyof FormState, v: string) => void }) {
  const budget = parseFloat(form.budget) || 0;
  const cpm = 6.5;
  const estImpressions = budget > 0 ? Math.round((budget / cpm) * 1000) : 0;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Name your campaign</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">Give it a clear name so you can find it easily later.</p>
      </div>

      <Input
        label="Campaign name"
        placeholder='e.g. "Brand Awareness May 2026"'
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        helper="Something you'll recognise later"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start date"
          type="date"
          value={form.startDate}
          onChange={(e) => update("startDate", e.target.value)}
        />
        <Input
          label="End date"
          type="date"
          value={form.endDate}
          onChange={(e) => update("endDate", e.target.value)}
        />
      </div>

      <Input
        label="Total budget"
        type="number"
        placeholder="2000"
        value={form.budget}
        onChange={(e) => update("budget", e.target.value)}
        prefix="$"
        helper="Minimum $500 per campaign"
      />

      {budget >= 500 && (
        <div className="p-4 bg-[var(--color-accent-subtle)] rounded-[var(--radius-lg)] border border-[var(--color-border)]">
          <p className="text-[13px] text-[var(--color-text-primary)]">
            <span className="font-semibold">Estimated reach:</span>{" "}
            ~{estImpressions.toLocaleString()} impressions at $6.50 CPM
          </p>
          <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
            Based on current fleet inventory. Final numbers are verified.
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Step 2 ── */
function Step2({ form, update }: { form: FormState; update: (k: keyof FormState, v: File | null) => void }) {
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      update("file", file);
      setUploading(true);
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((p) => {
          if (p >= 100) { clearInterval(interval); setUploading(false); return 100; }
          return p + 12;
        });
      }, 120);
    },
    [update]
  );

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Upload your ad</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          This is what passengers will see on the screen in the vehicle.
        </p>
      </div>

      {!form.file ? (
        <label
          className={`flex flex-col items-center justify-center gap-3 h-40 sm:h-52 border-2 border-dashed rounded-[var(--radius-xl)] cursor-pointer transition-all ${
            dragging
              ? "border-[var(--color-accent)] bg-[var(--color-accent-subtle)]"
              : "border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)]"
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
          <div className="size-12 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] flex items-center justify-center">
            <Upload size={22} className="text-[var(--color-text-secondary)]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              Drag & drop, or <span className="text-[var(--color-accent)]">click to browse</span>
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              MP4 up to 60 sec · max 50MB &nbsp;·&nbsp; JPG / PNG up to 5MB
            </p>
          </div>
          <input
            type="file"
            accept="video/mp4,image/jpeg,image/png"
            className="sr-only"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
        </label>
      ) : (
        <div className="border border-[var(--color-border)] rounded-[var(--radius-xl)] p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="size-10 rounded-[var(--radius-md)] bg-[var(--color-accent-subtle)] flex items-center justify-center shrink-0">
              <FileVideo size={20} className="text-[var(--color-accent)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{form.file.name}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {(form.file.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            </div>
            <button
              onClick={() => update("file", null)}
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {uploading ? (
            <div>
              <ProgressBar value={uploadProgress} />
              <p className="text-xs text-[var(--color-text-secondary)] mt-1.5">Uploading… {uploadProgress}%</p>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[var(--color-success)]">
              <Check size={14} />
              <span className="text-xs font-medium">Upload complete</span>
            </div>
          )}
        </div>
      )}

      <div className="p-3 bg-[var(--color-surface-subtle)] rounded-[var(--radius-md)] border border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-text-secondary)]">
          <span className="font-medium text-[var(--color-text-primary)]">Tips: </span>
          Short videos (15–30 sec) perform best. Make sure your brand logo appears in the first 3 seconds.
          We'll review your ad before it goes live.
        </p>
      </div>
    </div>
  );
}

/* ── Step 3 ── */
function Step3({ form, update }: { form: FormState; update: (k: keyof FormState, v: string) => void }) {
  const vehicles = VEHICLE_COUNTS[form.city]?.[form.radius] ?? 0;
  const budget = parseFloat(form.budget) || 0;
  const weeklyImpressions = vehicles * 1000 * 0.18;
  const cityLabel = CITY_OPTIONS.find((c) => c.value === form.city)?.label ?? form.city;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Where should your ad run?</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Choose the city and area you want to reach.
        </p>
      </div>

      <Select
        label="Target city"
        options={CITY_OPTIONS}
        value={form.city}
        onChange={(e) => update("city", e.target.value)}
        placeholder="Select a city"
      />

      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
          Coverage area
        </label>
        {[
          { value: "city-wide", label: "Entire city", desc: "Widest reach across all active vehicles" },
          { value: "center", label: "City centre only", desc: "Focus on high-traffic central areas" },
          { value: "custom", label: "Custom radius", desc: "Set a specific distance" },
        ].map((opt) => (
          <label
            key={opt.value}
            className={`flex items-start gap-3 p-3.5 rounded-[var(--radius-lg)] border cursor-pointer transition-all ${
              form.radius === opt.value
                ? "border-[var(--color-accent)] bg-[var(--color-accent-subtle)]"
                : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
            }`}
          >
            <input
              type="radio"
              name="radius"
              value={opt.value}
              checked={form.radius === opt.value}
              onChange={(e) => update("radius", e.target.value)}
              className="mt-0.5 accent-[var(--color-accent)]"
            />
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">{opt.label}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">{opt.desc}</p>
            </div>
          </label>
        ))}
        {form.radius === "custom" && (
          <Input
            placeholder="e.g. 15"
            suffix="km"
            type="number"
            value={form.customRadius}
            onChange={(e) => update("customRadius", e.target.value)}
            helper="Custom radius from city centre"
          />
        )}
      </div>

      {/* Map placeholder */}
      <div className="h-36 sm:h-48 rounded-[var(--radius-xl)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-center">
        <div className="text-center">
          <MapPin size={24} className="text-[var(--color-text-tertiary)] mx-auto mb-2" />
          <p className="text-sm text-[var(--color-text-secondary)]">
            {form.city ? `${cityLabel} — ${form.radius === "city-wide" ? "Full city" : form.radius === "center" ? "City centre" : "Custom area"}` : "Select a city to preview map"}
          </p>
        </div>
      </div>

      {/* Estimates */}
      {form.city && (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)]">
            <p className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Vehicles in area</p>
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">~{vehicles}</p>
          </div>
          <div className="p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)]">
            <p className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Est. weekly reach</p>
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">~{Math.round(weeklyImpressions / 1000)}K</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Step 4 ── */
function Step4({ form }: { form: FormState }) {
  const budget = parseFloat(form.budget) || 0;
  const cpm = 6.5;
  const estImpressions = budget > 0 ? Math.round((budget / cpm) * 1000) : 0;
  const cityLabel = CITY_OPTIONS.find((c) => c.value === form.city)?.label ?? form.city;
  const radiusLabel = { "city-wide": "Entire city", center: "City centre", custom: `${form.customRadius}km radius` }[form.radius];

  const rows = [
    { label: "Campaign name", value: form.name || "—" },
    { label: "Dates", value: form.startDate && form.endDate ? `${form.startDate} – ${form.endDate}` : "—" },
    { label: "Total budget", value: budget > 0 ? formatCurrency(budget) : "—" },
    { label: "Rate per 1,000 shown", value: "$6.50 CPM" },
    { label: "Target area", value: cityLabel ? `${cityLabel} · ${radiusLabel}` : "—" },
    { label: "Your ad", value: form.file?.name ?? "—" },
    { label: "Estimated reach", value: estImpressions > 0 ? `~${estImpressions.toLocaleString()} total impressions` : "—" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Review your campaign</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Double check everything before you submit.
        </p>
      </div>

      <div className="border border-[var(--color-border)] rounded-[var(--radius-xl)] overflow-hidden">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-start gap-4 px-5 py-3.5 ${i < rows.length - 1 ? "border-b border-[var(--color-border)]" : ""}`}
          >
            <span className="text-xs text-[var(--color-text-secondary)] w-36 shrink-0 pt-0.5">{row.label}</span>
            <span className="text-sm font-medium text-[var(--color-text-primary)] flex-1 break-words">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[var(--color-warning-subtle)] border border-[var(--color-warning)] border-opacity-30 rounded-[var(--radius-lg)]">
        <p className="text-sm text-[var(--color-text-primary)]">
          <span className="font-medium">What happens next: </span>
          We&apos;ll review your campaign within 24 hours. You&apos;ll get an email when it goes live.
          Estimated impressions are projections — final numbers are always verified.
        </p>
      </div>

      <div className="flex items-center gap-2 text-[var(--color-success)]">
        <ShieldCheck size={16} />
        <span className="text-sm font-medium">Every impression will be GPS-verified</span>
      </div>
    </div>
  );
}

/* ── Wizard ── */
export default function NewCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    startDate: "",
    endDate: "",
    budget: "",
    city: "",
    radius: "city-wide",
    customRadius: "",
    file: null,
  });

  function update(key: keyof FormState, value: string | File | null) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/campaigns");
  }

  const canProceed = [
    form.name && form.startDate && form.endDate && parseFloat(form.budget) >= 500,
    true, // file optional for now
    form.city !== "",
    true,
  ][step];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back */}
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Cancel
      </Link>

      <StepIndicator current={step} />

      {/* Step content */}
      <div className="bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] p-5 sm:p-7 shadow-[var(--shadow-sm)] mb-6">
        {step === 0 && <Step1 form={form} update={(k, v) => update(k, v as string)} />}
        {step === 1 && <Step2 form={form} update={(k, v) => update(k, v as File | null)} />}
        {step === 2 && <Step3 form={form} update={(k, v) => update(k, v as string)} />}
        {step === 3 && <Step4 form={form} />}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button variant="ghost" onClick={() => setStep((s) => s - 1)} icon={<ArrowLeft size={14} />}>
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < STEPS.length - 1 ? (
          <Button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed}
            icon={<ArrowRight size={14} />}
            iconPosition="right"
          >
            Continue
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            loading={submitting}
            icon={<Check size={14} />}
          >
            Submit campaign
          </Button>
        )}
      </div>

      {step === STEPS.length - 1 && (
        <p className="mt-4 text-xs text-center text-[var(--color-text-tertiary)]">
          You can pause or cancel your campaign at any time after it goes live.
        </p>
      )}
    </div>
  );
}
