import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import CarbonContent from "./CarbonContent";

export const metadata: Metadata = {
  alternates: { canonical: "/co2" },
  title: "Carbon Impact — Out Mobility Clean Mobility Initiative",
  description:
    "Out Mobility's carbon impact program deploys 3,000+ EVs across Africa, reducing 40–200 tCO₂ per vehicle annually, creating 900+ green jobs, and serving 5 million people.",
  openGraph: {
    title: "Carbon Impact — Out Mobility",
    description: "Powering Africa's clean mobility transition with verified carbon reduction infrastructure.",
    images: [{ url: "/og-image.png", width: 3600, height: 1890 }],
  },
};

export default function CarbonPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <CarbonContent />
      </main>
    </>
  );
}
