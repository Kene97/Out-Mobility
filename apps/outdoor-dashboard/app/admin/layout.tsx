import { AppShell } from "@/components/layout/app-shell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell role="admin" userName="Kene Omenuko-Rene" companyName="Out Mobility · Admin">
      {children}
    </AppShell>
  );
}
