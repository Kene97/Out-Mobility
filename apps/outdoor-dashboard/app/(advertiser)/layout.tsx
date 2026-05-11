import { AppShell } from "@/components/layout/app-shell";

export default function AdvertiserLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell role="advertiser" userName="Amara Okafor" companyName="Brand X Nigeria">
      {children}
    </AppShell>
  );
}
