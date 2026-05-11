import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  size?: "sm" | "md";
  color?: "accent" | "success" | "warning" | "danger";
}

const colorMap = {
  accent: "bg-[var(--color-accent)]",
  success: "bg-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]",
  danger: "bg-[var(--color-danger)]",
};

export function ProgressBar({ value, className, size = "md", color = "accent" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "w-full rounded-full bg-[var(--color-surface-subtle)] overflow-hidden",
        size === "sm" ? "h-1.5" : "h-2",
        className
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-300", colorMap[color])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
