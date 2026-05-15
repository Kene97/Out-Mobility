import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OutdoorContent from "./OutdoorContent";

export const metadata: Metadata = {
  alternates: { canonical: "/outdoor" },
  title: "Out-door — Verified In-Car Advertising Platform",
  description:
    "Get your brand in front of 100,000+ daily passengers across 6,000+ ride-hail vehicles. Verified impressions. Campaigns live in 3 minutes. No setup fees, no middleman.",
  openGraph: {
    title: "Out-door — Verified In-Car Advertising Platform",
    description: "Reach 100,000+ daily passengers with verified in-car ads. Campaigns live in 3 minutes.",
    images: [{ url: "/og-image.png", width: 3600, height: 1890 }],
  },
};

export default function OutdoorPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <OutdoorContent />
      </main>
      <Footer />
    </>
  );
}
