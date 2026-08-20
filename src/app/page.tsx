import { HomePage } from "@/features/home/home-page";
import { WaitlistSection } from "@/features/waitlist/waitlist-section";
import { createMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Asoebi Fashion Week",
  description:
    "The global home of Asoebi fashion, culture and celebration, bringing together Fashion Week, the Asoebi Prize, Asoebi Vendor and the official After Party.",
  path: "/",
  keywords: ["Asoebi Prize", "Asoebi Vendor", "African fashion platform"],
});

export default function Page() {
  return (
    <main id="main-content">
      <HomePage />
      <WaitlistSection />
    </main>
  );
}
