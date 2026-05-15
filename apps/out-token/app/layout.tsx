import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
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
  metadataBase: new URL("https://token.woutside.com"),
  title: "Out Mobility — The Ecosystem Token",
  description:
    "A native utility token coordinating payments, rewards, and governance across 6,000+ vehicles, four infrastructure products, and an emerging DePIN network. Token launch coming soon.",
  keywords:
    "Out Mobility token, ecosystem token, DePIN, RWA, mobility infrastructure, in-car advertising token, EV charging token, web3 mobility, utility token, fleet token",
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  openGraph: {
    title: "Out Mobility — The Ecosystem Token",
    description:
      "Payments. Rewards. Governance. One token across in-car advertising, ride-hailing, EV charging, and carbon infrastructure. Token launch coming soon.",
    type: "website",
    siteName: "Out Mobility",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Out Mobility — Ecosystem Token",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Out Mobility — The Ecosystem Token",
    description:
      "Payments. Rewards. Governance. One token powering the entire Out Mobility infrastructure stack.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${monaSans.variable} ${calSans.variable} ${instrumentSans.variable}`}>
      <body className="antialiased">{children}</body>
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wpukuhj3uk");`,
        }}
      />
    </html>
  );
}
