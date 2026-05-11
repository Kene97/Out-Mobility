import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md";
}

export function Card({ className, padding = "md", children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)]",
        padding === "md" && "p-6",
        padding === "sm" && "p-4",
        padding === "none" && "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function CardHeader({ title, description, action, className }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-5", className)}>
      <div>
        <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
