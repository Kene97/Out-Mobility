import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Out-door — In-Car Advertising Network",
  description:
    "Verified in-car advertising delivered to passengers across Nigeria. Launch campaigns in minutes.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text-primary)]">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
