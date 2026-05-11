import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div>
      <PageHeader title="Admin Settings" description="System configuration and API settings." />
      <div className="max-w-2xl flex flex-col gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">API Configuration</h3>
          <div className="flex flex-col gap-4">
            <Input label="API Base URL" defaultValue="https://api.outdmobility.com/v1" />
            <Input label="Webhook URL" defaultValue="https://outdmobility.com/webhooks/impressions" />
            <div className="flex justify-end">
              <Button size="sm">Save</Button>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">CPM Rate</h3>
          <div className="flex flex-col gap-4">
            <Input label="Default CPM (USD)" defaultValue="6.50" prefix="$" type="number" />
            <div className="flex justify-end">
              <Button size="sm">Update rate</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
