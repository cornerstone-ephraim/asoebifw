import { createMetadata } from "@/lib/seo";
import { EditorialPage } from "@/components/layout/editorial-page";
import { AccreditationForm } from "@/features/accreditation/accreditation-form";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Fashion Week Accreditation",
  description:
    "Register interest in Asoebi Fashion Week accreditation for media, buyers, designers, partners and fashion industry professionals.",
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
      intro="Register your interest in Fashion Week accreditation. Applications will be processed once the official programme opens."
      heroImage="/images/waitlist/media-card-illustration.png"
      heroImageAlt="An editorial illustration representing fashion media and runway coverage"
      heroTone="mist"
    >
      <div className="border-y border-asoebi-purple-950/25 py-12 lg:py-16">
        <div>
          <h2 className="font-display text-5xl tracking-tighter">
            Your place
            <br />
            <em>behind the story.</em>
          </h2>
          <p className="mt-8 max-w-2xl text-asoebi-graphite">
            Choose the accreditation that reflects your place in the industry.
            Your generated card confirms receipt of your application and remains
            pending until the AEFW team completes its review.
          </p>
        </div>
        <div className="mt-12">
          <AccreditationForm />
        </div>
      </div>
    </EditorialPage>
  );
}
