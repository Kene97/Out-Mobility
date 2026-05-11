"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  toast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: "border-l-[var(--color-success)] text-[var(--color-success)]",
  error:   "border-l-[var(--color-danger)] text-[var(--color-danger)]",
  warning: "border-l-[var(--color-warning)] text-[var(--color-warning)]",
  info:    "border-l-[var(--color-accent)] text-[var(--color-accent)]",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    const duration = type === "error" ? 8000 : 4000;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const remove = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => {
          const Icon = icons[t.type];
          return (
            <div
              key={t.id}
              style={{ animation: "slide-in-right 200ms ease-out" }}
              className={cn(
                "pointer-events-auto flex items-start gap-3 w-[360px] max-w-[calc(100vw-2rem)]",
                "bg-white border border-[var(--color-border)] border-l-4 rounded-[var(--radius-lg)]",
                "shadow-[var(--shadow-lg)] px-4 py-3",
                styles[t.type]
              )}
              role="alert"
            >
              <Icon size={18} className="shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{t.title}</p>
                {t.message && (
                  <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">{t.message}</p>
                )}
              </div>
              <button
                onClick={() => remove(t.id)}
                className="shrink-0 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                aria-label="Dismiss"
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx.toast;
}
