import type { Metadata } from "next";
import { Instrument_Sans, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
  weight: ["700", "800", "900"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Out Mobility — Verified In-Car Advertising",
  description:
    "Get your ads in front of 100,000+ passengers daily across 6,000+ vehicles. Launch your first campaign in 3 minutes. No setup fees.",
  keywords:
    "in-car advertising, mobility advertising, verified impressions, Out Mobility, Out-door, ride-hail advertising",
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
      className={`${instrumentSans.variable} ${barlowCondensed.variable}`}
    >
      <head>
        {/* Cal Sans from Fontshare CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cal-sans@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
