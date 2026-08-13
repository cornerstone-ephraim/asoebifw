import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://asoebifw.com"),
  title: { default: "Asoebi Fashion Week", template: "%s | Asoebi Fashion Week" },
  description:
    "The global home of Asoebi fashion, culture and celebration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={schibstedGrotesk.variable}>
      <body className="flex min-h-screen flex-col bg-canvas-light font-sans text-asoebi-ink antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
