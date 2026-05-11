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
  metadataBase: new URL("https://out-mobility.vercel.app"),
  title: "Out Mobility — Your Brand in 6,000+ Moving Vehicles",
  description:
    "Run verified in-car ads across 6,000+ ride-hail vehicles and reach 100,000+ daily passengers. Real-time impression tracking. Campaigns live in 3 minutes. No setup fees, no middleman.",
  keywords:
    "in-car advertising, mobility advertising, verified impressions, Out Mobility, Out-door, ride-hail advertising, fleet advertising, programmatic OOH",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Out Mobility — Your Brand in 6,000+ Moving Vehicles",
    description:
      "Verified in-car advertising infrastructure. 100,000+ daily passengers, real-time impression tracking, campaigns live in 3 minutes.",
    type: "website",
    siteName: "Out Mobility",
    images: [
      {
        url: "/og-image.png",
        width: 3600,
        height: 1890,
        alt: "Out Mobility — Verified In-Car Advertising Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Out Mobility — Your Brand in 6,000+ Moving Vehicles",
    description:
      "Verified in-car advertising. 100,000+ daily passengers, real-time impression tracking, campaigns live in 3 minutes.",
    images: ["/og-image.png"],
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
