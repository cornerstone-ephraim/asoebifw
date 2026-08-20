import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";

import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { BrandSplash } from "@/components/motion/brand-splash";
import { SiteHeader } from "@/components/navigation/site-header";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const schibstedGrotesk = localFont({
  src: [
    {
      path: "./fonts/schibsted/SchibstedGrotesk-VariableFont_wght.ttf",
      style: "normal",
      weight: "400 900",
    },
    {
      path: "./fonts/schibsted/SchibstedGrotesk-Italic-VariableFont_wght.ttf",
      style: "italic",
      weight: "400 900",
    },
  ],
  variable: "--font-schibsted-grotesk",
  display: "swap",
});

const bricolageGrotesque = localFont({
  src: "./fonts/BricolageGrotesque-Variable.ttf",
  weight: "200 800",
  style: "normal",
  variable: "--font-bricolage-grotesque",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asoebifw.com"),
  title: {
    default: "Asoebi Fashion Week",
    template: "%s | Asoebi Fashion Week",
  },
  description:
    "Discover Asoebi Fashion Week, a global celebration of African fashion, textiles, designers, craftsmanship and culture.",
  applicationName: "Asoebi Fashion Week",
  category: "fashion",
  creator: "Asoebi Fashion Week",
  publisher: "Asoebi Fashion Week",
  manifest: "/site.webmanifest",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${schibstedGrotesk.variable} ${bricolageGrotesque.variable}`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-screen flex-col bg-canvas-light font-sans text-asoebi-ink antialiased"
        suppressHydrationWarning
      >
        <BrandSplash />
        <a
          href="#main-content"
          className="transition-linear fixed top-3 left-3 z-100 -translate-y-24 rounded-full bg-asoebi-purple-950 px-5 py-3 text-sm font-bold text-white transition-transform focus-visible:translate-y-0"
        >
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <ScrollToTop />
      </body>
    </html>
  );
}
