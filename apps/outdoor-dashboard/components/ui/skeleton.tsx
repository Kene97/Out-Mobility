import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

export function Skeleton({ width, height, rounded, className, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton", rounded && "!rounded-full", className)}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-sm)]">
      <Skeleton height={12} width="60%" className="mb-3" />
      <Skeleton height={36} width="50%" className="mb-2" />
      <Skeleton height={12} width="40%" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <tr className="border-b border-[var(--color-border)]">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton height={14} width={i === 0 ? "70%" : "50%"} />
        </td>
      ))}
    </tr>
  );
}
