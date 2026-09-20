import { EditorialPage } from "@/components/layout/editorial-page";
import { SponsorshipForm } from "@/features/sponsorship/sponsorship-form";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Become a Sponsor",
  description:
    "Start a sponsorship conversation with Asoebi Fashion Week. Support fashion, creative talent and the culture of Asoebi.",
  path: "/sponsorship",
});

export default function SponsorshipPage() {
  return (
    <EditorialPage
      eyebrow="Sponsorship & partnerships"
      title="Be part of what comes next."
      intro="Help create a bigger stage for Asoebi fashion, creative talent and the culture that brings us together."
      heroLayout="statement"
      cta={{ href: "#enquiry", label: "Become a sponsor" }}
    >
      <section
        id="enquiry"
        className="grid scroll-mt-28 gap-12 border-t border-asoebi-purple-950/25 pt-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"
      >
        <div>
          <h2 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            A partnership that starts with you.
          </h2>
          <p className="mt-6 leading-7 text-asoebi-graphite">
            Whether you’re interested in Fashion Week, the Asoebi Prize, the
            After Party or the wider AEFW platform, we’d love to hear what you
            have in mind.
          </p>
          <p className="mt-5 leading-7 text-asoebi-graphite">
            Tell us about your organisation and how you’d like to contribute,
            through financial sponsorship, products or services. If you’re still
            exploring, that’s a good place to start too.
          </p>
          <div className="mt-8 border-t border-asoebi-purple-200 pt-6">
            <h3 className="font-bold">What happens next?</h3>
            <p className="mt-3 leading-7 text-asoebi-graphite">
              Our team will review your enquiry and follow up to discuss a
              suitable partnership.
            </p>
          </div>
        </div>
        <SponsorshipForm />
      </section>
    </EditorialPage>
  );
}
