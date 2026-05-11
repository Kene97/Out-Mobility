import { BarChart2, Tv2, Clock, ShieldCheck, Download } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const icons = {
  campaigns: BarChart2,
  devices: Tv2,
  impressions: Clock,
  fraud: ShieldCheck,
  reports: Download,
};

interface EmptyStateProps {
  type?: keyof typeof icons;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ type, icon, title, description, action, className }: EmptyStateProps) {
  const Icon = type ? icons[type] : null;

  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <div className="w-14 h-14 rounded-[var(--radius-xl)] bg-[var(--color-surface-subtle)] flex items-center justify-center mb-4 text-[var(--color-text-tertiary)]">
        {icon ?? (Icon && <Icon size={24} strokeWidth={1.5} />)}
      </div>
      <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-1.5">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--color-text-secondary)] max-w-xs leading-relaxed">{description}</p>
      )}
      {action && (
        <div className="mt-5">
          <Button onClick={action.onClick} size="md">
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
