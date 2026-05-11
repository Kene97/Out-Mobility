"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helper, error, prefix, suffix, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3 text-sm text-[var(--color-text-secondary)] pointer-events-none select-none">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-10 px-3 text-sm text-[var(--color-text-primary)] bg-white",
              "border rounded-[var(--radius-md)] outline-none transition-all duration-100",
              "placeholder:text-[var(--color-text-tertiary)]",
              error
                ? "border-[var(--color-danger)] focus:ring-1 focus:ring-[var(--color-danger)]"
                : "border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] focus:ring-opacity-30",
              prefix && "pl-8",
              suffix && "pr-8",
              props.disabled && "opacity-50 cursor-not-allowed bg-[var(--color-surface-subtle)]",
              className
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 text-sm text-[var(--color-text-secondary)] pointer-events-none select-none">
              {suffix}
            </span>
          )}
        </div>
        {(helper || error) && (
          <p
            className={cn(
              "text-[12px]",
              error ? "text-[var(--color-danger)]" : "text-[var(--color-text-secondary)]"
            )}
          >
            {error ?? helper}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helper?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helper, error, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-3 py-2.5 text-sm text-[var(--color-text-primary)] bg-white",
            "border rounded-[var(--radius-md)] outline-none transition-all duration-100 resize-none",
            "placeholder:text-[var(--color-text-tertiary)]",
            error
              ? "border-[var(--color-danger)] focus:ring-1 focus:ring-[var(--color-danger)]"
              : "border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] focus:ring-opacity-30",
            className
          )}
          {...props}
        />
        {(helper || error) && (
          <p className={cn("text-[12px]", error ? "text-[var(--color-danger)]" : "text-[var(--color-text-secondary)]")}>
            {error ?? helper}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helper?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, helper, error, options, placeholder, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            "w-full h-10 px-3 text-sm text-[var(--color-text-primary)] bg-white appearance-none",
            "border rounded-[var(--radius-md)] outline-none transition-all duration-100",
            "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_12px_center]",
            error
              ? "border-[var(--color-danger)]"
              : "border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] focus:ring-opacity-30",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {(helper || error) && (
          <p className={cn("text-[12px]", error ? "text-[var(--color-danger)]" : "text-[var(--color-text-secondary)]")}>
            {error ?? helper}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
