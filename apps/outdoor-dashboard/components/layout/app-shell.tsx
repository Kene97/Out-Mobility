import { Sidebar, MobileNav, MobileHeader } from "./sidebar";

interface AppShellProps {
  children: React.ReactNode;
  role?: "advertiser" | "admin";
  userName?: string;
  companyName?: string;
}

export function AppShell({ children, role = "advertiser", userName, companyName }: AppShellProps) {
  return (
    <div className="flex h-screen bg-[var(--color-bg)] overflow-hidden">
      <Sidebar role={role} userName={userName} companyName={companyName} />

      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <MobileHeader />
        <div className="flex-1 px-4 py-4 sm:px-6 lg:px-8 pb-20 lg:pb-8">
          {children}
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
