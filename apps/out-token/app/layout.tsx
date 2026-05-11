import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const monaSans = localFont({
  src: [
    { path: "../public/fonts/Mona-Sans-UltraLightNarrow.ttf", weight: "200", style: "normal" },
    { path: "../public/fonts/Mona-Sans-MediumNarrow.ttf",     weight: "500", style: "normal" },
    { path: "../public/fonts/Mona-Sans-BoldNarrow.ttf",       weight: "700", style: "normal" },
    { path: "../public/fonts/Mona-Sans-BlackNarrow.ttf",      weight: "900", style: "normal" },
  ],
  variable: "--font-mona-sans",
  display: "swap",
});

const calSans = localFont({
  src: [{ path: "../public/fonts/CalSans-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-cal-sans",
  display: "swap",
});

const instrumentSans = localFont({
  src: [
    { path: "../public/fonts/InstrumentSans-Regular.ttf",  weight: "400", style: "normal" },
    { path: "../public/fonts/InstrumentSans-Medium.ttf",   weight: "500", style: "normal" },
    { path: "../public/fonts/InstrumentSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/InstrumentSans-Bold.ttf",     weight: "700", style: "normal" },
  ],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://token.out-mobility.vercel.app"),
  title: "$OUTSIDE — The Ecosystem Token Powering Out Mobility",
  description:
    "Meet $OUTSIDE — the utility token at the heart of Out Mobility's DePIN and RWA ecosystem. Powering in-car advertising, ride-hailing, EV charging, and carbon infrastructure.",
  keywords:
    "$OUTSIDE token, Out Mobility token, DePIN token, RWA token, mobility token, in-car advertising, EV infrastructure, ecosystem token, Web3 mobility",
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  openGraph: {
    title: "$OUTSIDE — The Ecosystem Token Powering Out Mobility",
    description:
      "One token. The entire Out Mobility ecosystem. DePIN, RWA, EV, and verified mobility infrastructure.",
    type: "website",
    siteName: "Out Mobility — $OUTSIDE Token",
  },
  twitter: {
    card: "summary_large_image",
    title: "$OUTSIDE — The Ecosystem Token",
    description: "One token. Every mile. The Out Mobility ecosystem token.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${monaSans.variable} ${calSans.variable} ${instrumentSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
