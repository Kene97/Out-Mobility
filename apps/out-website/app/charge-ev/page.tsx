import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChargeContent from "./ChargeContent";

export const metadata: Metadata = {
  alternates: { canonical: "/charge-ev" },
  title: "Charge EV — Out Mobility Solar-Powered Charging Network",
  description:
    "Out Mobility's EV charging network uses solar microgrids for 99.9% uptime. Own a charging node, serve the fleet, and earn real-time revenue from the energy transition.",
  openGraph: {
    title: "Charge EV — Out Mobility",
    description: "Stay in-charge. Solar-powered EV charging hubs with 99.9% uptime across Africa.",
    images: [{ url: "/og-image.png", width: 3600, height: 1890 }],
  },
};

export default function ChargeEvPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <ChargeContent />
      </main>
      <Footer />
    </>
  );
}
