import { createMetadata } from "@/lib/seo";
import { EditorialPage } from "@/components/layout/editorial-page";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "Fashion Week Accreditation",
  description:
    "Accreditation for Asoebi Fashion Week is currently closed. Join the waitlist for future access announcements.",
  path: "/accreditation",
  keywords: [
    "fashion week accreditation",
    "fashion media access",
    "fashion buyers",
  ],
});

export default function Page() {
  return (
    <EditorialPage
      eyebrow="Press · Buyers · Industry"
      title="Accreditation"
      intro="Accreditation is not currently open. Details will be announced when the official Fashion Week programme is ready."
      heroImage="/images/waitlist/media-card-illustration.webp"
      heroImageAlt="An editorial illustration representing fashion media and runway coverage"
      heroTone="mist"
    >
      <div className="border-y border-asoebi-purple-950/25 py-12 lg:py-16">
        <div>
          <h2 className="font-display text-5xl tracking-tighter">
            Applications
            <br />
            <em>are currently closed.</em>
          </h2>
          <p className="mt-8 max-w-2xl text-asoebi-graphite">
            No accreditation requests are being accepted at this time. Join the
            AEFW waitlist to hear when access opens for media, buyers and
            fashion industry professionals.
          </p>
        </div>
        <div className="mt-12 border-t border-asoebi-purple-950/25 pt-8">
          <Link
            href="/#waitlist"
            className="transition-linear inline-flex min-h-13 items-center rounded-full bg-asoebi-purple-950 px-7 text-sm font-black tracking-[.08em] text-white uppercase transition-colors hover:bg-brand"
          >
            Join the waitlist
          </Link>
        </div>
      </div>
    </EditorialPage>
  );
}
