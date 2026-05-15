import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import DriveContent from "./DriveContent";

export const metadata: Metadata = {
  alternates: { canonical: "/drive" },
  title: "Drive to Own — Out Mobility Vehicle Ownership Programme",
  description:
    "Drive with Out Mobility and work your way to full vehicle ownership. Earn a guaranteed salary, $OUTSIDE tokens, carbon credits, and full employment benefits.",
  openGraph: {
    title: "Drive to Own — Out Mobility",
    description: "Turn your daily drive into a path to vehicle ownership. Guaranteed income, tokens, and benefits.",
    images: [{ url: "/og-image.png", width: 3600, height: 1890 }],
  },
};

export default function DrivePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <DriveContent />
      </main>
    </>
  );
}
