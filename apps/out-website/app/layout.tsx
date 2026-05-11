import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Mona Sans — the real brand display font (narrow weights used in the Figma)
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

// Cal Sans — brand heading font
const calSans = localFont({
  src: [{ path: "../public/fonts/CalSans-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-cal-sans",
  display: "swap",
});

// Instrument Sans — body / UI font
const instrumentSans = localFont({
  src: [
    { path: "../public/fonts/InstrumentSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/InstrumentSans-Medium.ttf",  weight: "500", style: "normal" },
    { path: "../public/fonts/InstrumentSans-SemiBold.ttf",weight: "600", style: "normal" },
    { path: "../public/fonts/InstrumentSans-Bold.ttf",    weight: "700", style: "normal" },
  ],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Out Mobility — Verified In-Car Advertising",
  description:
    "Get your ads in front of 100,000+ passengers daily across 6,000+ vehicles. Launch your first campaign in 3 minutes. No setup fees.",
  keywords:
    "in-car advertising, mobility advertising, verified impressions, Out Mobility, Out-door, ride-hail advertising",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Out Mobility — Verified In-Car Advertising",
    description:
      "Get visible in 6,000+ vehicles in 3 minutes. Every impression verified.",
    type: "website",
    siteName: "Out Mobility",
  },
  twitter: {
    card: "summary_large_image",
    title: "Out Mobility — Verified In-Car Advertising",
    description: "Get visible in 6,000+ vehicles in 3 minutes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${monaSans.variable} ${calSans.variable} ${instrumentSans.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
