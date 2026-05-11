import { cn } from "@/lib/utils";

type BadgeVariant =
  | "active"
  | "paused"
  | "pending"
  | "draft"
  | "completed"
  | "cancelled"
  | "offline"
  | "valid"
  | "invalid"
  | "suspicious"
  | "online"
  | "healthy"
  | "degraded"
  | "down";

const variantConfig: Record<BadgeVariant, { dot: string; text: string; bg: string }> = {
  active:    { dot: "bg-[var(--color-success)]",  text: "text-[var(--color-success)]",  bg: "bg-[var(--color-success-subtle)]" },
  online:    { dot: "bg-[var(--color-success)]",  text: "text-[var(--color-success)]",  bg: "bg-[var(--color-success-subtle)]" },
  healthy:   { dot: "bg-[var(--color-success)]",  text: "text-[var(--color-success)]",  bg: "bg-[var(--color-success-subtle)]" },
  valid:     { dot: "bg-[var(--color-success)]",  text: "text-[var(--color-success)]",  bg: "bg-[var(--color-success-subtle)]" },
  paused:    { dot: "bg-[var(--color-warning)]",  text: "text-[var(--color-warning)]",  bg: "bg-[var(--color-warning-subtle)]" },
  pending:   { dot: "bg-[var(--color-warning)]",  text: "text-[var(--color-warning)]",  bg: "bg-[var(--color-warning-subtle)]" },
  degraded:  { dot: "bg-[var(--color-warning)]",  text: "text-[var(--color-warning)]",  bg: "bg-[var(--color-warning-subtle)]" },
  draft:     { dot: "bg-[var(--color-neutral)]",  text: "text-[var(--color-neutral)]",  bg: "bg-[var(--color-neutral-subtle)] border border-[var(--color-border)]" },
  completed: { dot: "bg-[var(--color-accent)]",   text: "text-[var(--color-accent)]",   bg: "bg-[var(--color-accent-subtle)]" },
  cancelled: { dot: "bg-[var(--color-danger)]",   text: "text-[var(--color-danger)]",   bg: "bg-[var(--color-danger-subtle)]" },
  offline:   { dot: "bg-[var(--color-danger)]",   text: "text-[var(--color-danger)]",   bg: "bg-[var(--color-danger-subtle)]" },
  invalid:   { dot: "bg-[var(--color-danger)]",   text: "text-[var(--color-danger)]",   bg: "bg-[var(--color-danger-subtle)]" },
  down:      { dot: "bg-[var(--color-danger)]",   text: "text-[var(--color-danger)]",   bg: "bg-[var(--color-danger-subtle)]" },
  suspicious:{ dot: "bg-[#c2410c]",               text: "text-[#c2410c]",               bg: "bg-[#fff7ed]" },
};

const labelMap: Record<BadgeVariant, string> = {
  active: "Active", online: "Online", healthy: "Healthy", valid: "Verified",
  paused: "Paused", pending: "Pending", degraded: "Degraded",
  draft: "Draft", completed: "Completed", cancelled: "Cancelled",
  offline: "Offline", invalid: "Invalid", down: "Down", suspicious: "Suspicious",
};

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

export function Badge({ variant, label, className }: BadgeProps) {
  const config = variantConfig[variant];
  const displayLabel = label ?? labelMap[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-full text-[11px] font-medium leading-none whitespace-nowrap",
        config.bg,
        config.text,
        className
      )}
    >
      <span className={cn("size-[7px] rounded-full shrink-0", config.dot)} />
      {displayLabel}
    </span>
  );
}
