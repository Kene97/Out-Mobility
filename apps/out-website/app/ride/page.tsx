import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RideContent from "./RideContent";

export const metadata: Metadata = {
  alternates: { canonical: "/ride" },
  title: "Book a Ride — Out Mobility Clean EV Rides",
  description:
    "Book a clean EV ride with Out Mobility. AI-driven smart mobility, zero surge pricing, no driver cancellations, and earn $OUTSIDE token rewards with every trip.",
  openGraph: {
    title: "Heading Out? Book a Ride — Out Mobility",
    description: "Clean EV rides with personalised experience. Zero surge, no cancellations, and earn crypto rewards.",
    images: [{ url: "/og-image.png", width: 3600, height: 1890 }],
  },
};

export default function RidePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <RideContent />
      </main>
      <Footer />
    </>
  );
}
