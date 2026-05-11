"use client";

import { useState } from "react";
import { Save, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { useToast } from "@/components/ui/toast";
import { mockUser } from "@/lib/mock-data";

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="grid sm:grid-cols-[240px_1fr] gap-6">
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
        {description && <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">{description}</p>}
      </div>
      <Card>{children}</Card>
    </div>
  );
}

export default function SettingsPage() {
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: mockUser.name,
    email: mockUser.email,
    company: mockUser.companyName ?? "",
  });
  const [notifications, setNotifications] = useState({
    campaignLive: true,
    weeklyReport: true,
    budgetAlert: true,
    impressionMilestone: false,
  });

  async function saveProfile() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast("success", "Profile saved", "Your changes have been saved successfully.");
  }

  return (
    <div>
      <PageHeader title="Settings" description="Manage your account and preferences." />

      <div className="flex flex-col gap-8 max-w-3xl">

        {/* Profile */}
        <Section title="Your profile" description="Update your name, company, and email address.">
          <div className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Full name"
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              />
              <Input
                label="Company name"
                value={profile.company}
                onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))}
              />
            </div>
            <Input
              label="Email address"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
            />
            <div className="flex justify-end">
              <Button size="sm" loading={saving} icon={<Save size={13} />} onClick={saveProfile}>
                Save changes
              </Button>
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" description="Choose when you want to receive email updates.">
          <div className="flex flex-col gap-4">
            {[
              { key: "campaignLive" as const, label: "Campaign goes live", desc: "When your campaign is approved and starts running" },
              { key: "weeklyReport" as const, label: "Weekly summary", desc: "A summary of impressions and spend each week" },
              { key: "budgetAlert" as const, label: "Budget alert", desc: "When you've used 80% or more of your budget" },
              { key: "impressionMilestone" as const, label: "Impression milestones", desc: "When you hit 10K, 50K, 100K impressions" },
            ].map((item) => (
              <label key={item.key} className="flex items-start justify-between gap-4 cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{item.label}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{item.desc}</p>
                </div>
                <div className="relative shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={notifications[item.key]}
                    onChange={(e) => setNotifications((n) => ({ ...n, [item.key]: e.target.checked }))}
                    className="sr-only"
                  />
                  <div
                    onClick={() => setNotifications((n) => ({ ...n, [item.key]: !n[item.key] }))}
                    className={`w-10 h-5.5 h-[22px] rounded-full transition-colors cursor-pointer flex items-center px-0.5 ${
                      notifications[item.key] ? "bg-[var(--color-accent)]" : "bg-[var(--color-border-strong)]"
                    }`}
                  >
                    <div
                      className={`size-[18px] rounded-full bg-white shadow transition-transform ${
                        notifications[item.key] ? "translate-x-[18px]" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              </label>
            ))}
          </div>
        </Section>

        {/* Password */}
        <Section title="Password" description="Change your login password.">
          <div className="flex flex-col gap-4">
            <Input label="Current password" type="password" placeholder="••••••••" />
            <Input label="New password" type="password" placeholder="Min. 8 characters" helper="At least 8 characters" />
            <Input label="Confirm new password" type="password" placeholder="••••••••" />
            <div className="flex justify-end">
              <Button size="sm" variant="secondary">Update password</Button>
            </div>
          </div>
        </Section>

        {/* Billing contact */}
        <Section title="Billing contact" description="Who should receive invoices and billing emails.">
          <div className="flex flex-col gap-4">
            <Input label="Billing contact name" placeholder="Finance team" defaultValue={mockUser.name} />
            <Input label="Billing email" type="email" placeholder="billing@company.com" defaultValue={mockUser.email} />
            <div className="flex justify-end">
              <Button size="sm" variant="secondary">Save billing info</Button>
            </div>
          </div>
        </Section>

        {/* Danger zone */}
        <Section title="Account" description="Permanently delete your account and all campaign data.">
          <div className="flex items-start gap-3 p-4 bg-[var(--color-danger-subtle)] border border-[var(--color-danger)] border-opacity-20 rounded-[var(--radius-md)]">
            <AlertTriangle size={16} className="text-[var(--color-danger)] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">Delete account</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 mb-3">
                This will permanently delete your account and all campaign data. This cannot be undone.
              </p>
              <Button variant="danger" size="sm">Delete my account</Button>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
