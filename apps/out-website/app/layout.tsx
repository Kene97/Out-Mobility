import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { WaitlistProvider } from "@/context/WaitlistContext";
import WaitlistModal from "@/components/ui/WaitlistModal";
import EcoNav from "@/components/layout/EcoNav";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://woutside.com"),
  alternates: { canonical: "/" },
  title: "Out Mobility — The New Mobility OS",
  description:
    "Cheap rides. Max vibes. 100% EV. Drivers earn more. Everything Onchain. AI-matched shared rides, verified in-car advertising, and the $OUTSIDE token — powering the future of transportation.",
  keywords:
    "Out Mobility, mobility OS, EV ride-hail, in-car advertising, $OUTSIDE token, RWA, DePIN, verified impressions, fleet advertising, Web3 mobility",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Out Mobility — The New Mobility OS",
    description:
      "Cheap rides. Max vibes. 100% EV. AI-matched rides, verified in-car ads, and the $OUTSIDE token — powering the future of transportation.",
    type: "website",
    siteName: "Out Mobility",
    images: [
      {
        url: "/og-image.png",
        width: 3600,
        height: 1890,
        alt: "Out Mobility — The New Mobility OS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Out Mobility — The New Mobility OS",
    description:
      "Cheap rides. Max vibes. 100% EV. AI-matched rides, verified in-car ads, and the $OUTSIDE token.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Out Mobility",
  url: "https://woutside.com",
  logo: "https://woutside.com/favicon.png",
  description:
    "Out Mobility is a mobility infrastructure company building the software layer that turns vehicles into verified, managed advertising and mobility infrastructure.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@woutside.com",
    contactType: "customer support",
  },
  sameAs: ["https://x.com/OutMobility", "https://token.woutside.com"],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <WaitlistProvider>
          <EcoNav />
          {children}
          <WaitlistModal />
        </WaitlistProvider>
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wpukuhj3uk");`,
          }}
        />
      </body>
    </html>
  );
}
