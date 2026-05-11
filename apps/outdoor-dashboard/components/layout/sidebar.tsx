"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  BarChart2,
  FileText,
  Image,
  Settings,
  HelpCircle,
  LogOut,
  Shield,
  Tv2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const advertiserNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/creatives", label: "Creatives", icon: Image },
  { href: "/reports", label: "Reports", icon: FileText },
];

const advertiserBottom: NavItem[] = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help", icon: HelpCircle },
];

const adminNav: NavItem[] = [
  { href: "/admin/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/admin/devices", label: "Devices", icon: Tv2 },
  { href: "/admin/fraud", label: "Fraud Review", icon: AlertTriangle },
];

const adminBottom: NavItem[] = [
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  role?: "advertiser" | "admin";
  userName?: string;
  companyName?: string;
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2.5 px-3 h-9 rounded-[var(--radius-md)] text-sm transition-all duration-100",
        "relative",
        active
          ? "bg-[var(--color-accent-subtle)] text-[var(--color-accent)] font-medium"
          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-primary)]"
      )}
    >
      {active && (
        <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[var(--color-accent)] rounded-r-full" />
      )}
      <Icon size={16} strokeWidth={active ? 2 : 1.5} className="shrink-0" />
      <span>{item.label}</span>
    </Link>
  );
}

export function Sidebar({ role = "advertiser", userName, companyName }: SidebarProps) {
  const pathname = usePathname();

  const nav = role === "admin" ? adminNav : advertiserNav;
  const bottom = role === "admin" ? adminBottom : advertiserBottom;

  return (
    <aside className="hidden lg:flex flex-col w-[240px] shrink-0 h-screen bg-white border-r border-[var(--color-border)] sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-[var(--color-border)] shrink-0">
        <div className="size-7 rounded-[var(--radius-md)] bg-[var(--color-brand-navy)] flex items-center justify-center">
          <Tv2 size={14} className="text-[var(--color-brand-sky)]" />
        </div>
        <div>
          <span className="text-[15px] font-bold text-[var(--color-text-primary)] tracking-tight">
            Out-door
          </span>
          {role === "admin" && (
            <span className="ml-1.5 text-[10px] font-medium text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-1.5 py-0.5 rounded-full">
              Admin
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto flex flex-col gap-0.5">
        {nav.map((item) => (
          <NavLink key={item.href} item={item} active={pathname.startsWith(item.href)} />
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-[var(--color-border)] pt-3 flex flex-col gap-0.5">
        {bottom.map((item) => (
          <NavLink key={item.href} item={item} active={pathname === item.href} />
        ))}

        {/* User */}
        <div className="mt-3 flex items-center gap-2.5 px-3 py-2">
          <div className="size-8 rounded-full bg-[var(--color-accent-subtle)] flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-[var(--color-accent)]">
              {userName?.[0] ?? "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-[var(--color-text-primary)] truncate">
              {userName ?? "User"}
            </p>
            {companyName && (
              <p className="text-[11px] text-[var(--color-text-secondary)] truncate">{companyName}</p>
            )}
          </div>
          <button
            className="text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors"
            aria-label="Sign out"
            onClick={() => (window.location.href = "/login")}
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ── Mobile bottom nav ─────────────────────────────────────────────── */

const mobileNav: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/settings", label: "Account", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--color-border)] flex">
      {mobileNav.map((item) => {
        const Icon = item.icon;
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
              active ? "text-[var(--color-accent)]" : "text-[var(--color-text-tertiary)]"
            )}
          >
            <Icon size={20} strokeWidth={active ? 2 : 1.5} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/* ── Mobile top header ─────────────────────────────────────────────── */

export function MobileHeader({ title }: { title?: string }) {
  return (
    <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-[var(--color-border)] flex items-center gap-3 px-4 h-14">
      <div className="size-7 rounded-[var(--radius-md)] bg-[var(--color-brand-navy)] flex items-center justify-center shrink-0">
        <Tv2 size={14} className="text-[var(--color-brand-sky)]" />
      </div>
      <span className="text-[15px] font-bold text-[var(--color-text-primary)]">
        {title ?? "Out-door"}
      </span>
    </header>
  );
}
