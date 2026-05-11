"use client";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles = {
  primary: "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] active:scale-[0.98]",
  secondary: "bg-white text-[var(--color-accent)] border border-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)] active:scale-[0.98]",
  ghost: "bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)] active:scale-[0.98]",
  danger: "bg-[var(--color-danger)] text-white hover:opacity-90 active:scale-[0.98]",
  link: "bg-transparent text-[var(--color-accent)] hover:underline p-0 h-auto",
};

const sizeStyles = {
  sm: "h-8 px-3 text-[13px] font-medium gap-1.5",
  md: "h-10 px-4 text-sm font-medium gap-2",
  lg: "h-12 px-5 text-[15px] font-semibold gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--radius-md)] transition-all duration-100 whitespace-nowrap select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          isDisabled && "opacity-40 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={14} />
            {children}
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && icon}
            {children}
            {icon && iconPosition === "right" && icon}
          </>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
