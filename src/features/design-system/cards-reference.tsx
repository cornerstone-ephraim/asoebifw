import Image from "next/image";
import { ReferenceSection, Specimen } from "./reference-section";

export function CardsReference() {
  return (
    <ReferenceSection
      id="cards"
      title="Shape creates a relationship."
      intro="These are existing visual patterns, not a universal Card component or a hidden status code. Shape groups content; the title, copy and controls tell the reader what it means."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Specimen
          title="Open editorial block"
          detail="Square edges, a fine divider and generous whitespace. Use for principles, programme details and adjacent story chapters where a box would interrupt reading."
        >
          <div className="border-t border-asoebi-purple-300 pt-5">
            <h4 className="font-display text-3xl">A shared point of view.</h4>
            <p className="mt-3 leading-7">
              One idea, a clear heading and enough room to read.
            </p>
          </div>
          <p className="mt-5 text-xs">No radius · border-t · no shadow</p>
        </Specimen>
        <Specimen
          title="Rounded information panel"
          detail="A contained unit with related details. Use for admin enquiries, confirmation messages and form guidance. The rounded shape feels approachable; it does not mean the panel is clickable."
        >
          <div className="rounded-3xl border border-asoebi-purple-200 bg-asoebi-mist p-6">
            <h4 className="font-display text-3xl">Your enquiry is with us.</h4>
            <p className="mt-3 leading-7">
              Our team will review it and follow up.
            </p>
          </div>
          <p className="mt-5 text-xs">
            rounded-3xl · 24px · border or soft fill
          </p>
        </Specimen>
        <Specimen
          title="Illustrated invitation"
          detail="A larger, expressive card for audience identity and participation. The waitlist/accreditation deck uses illustration and layered cards to evoke an invitation. Keep stacking to this context; never stack forms or dense admin records."
        >
          <div className="relative isolate mx-3 mb-4">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 translate-x-2 translate-y-3 rotate-2 rounded-3xl bg-asoebi-gold-300"
            />
            <div className="overflow-hidden rounded-3xl bg-brand-deep text-white">
              <Image
                src="/images/waitlist/designer-card-illustration.webp"
                alt="Illustrated fashion scene from the Designer invitation card"
                width={640}
                height={360}
                sizes="(min-width:768px) 45vw, 90vw"
                className="aspect-video w-full object-cover"
              />
              <div className="p-6">
                <h4 className="font-display text-3xl">Designer</h4>
                <p className="mt-2 text-sm">
                  Show the world your point of view.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-5 text-xs">
            rounded-3xl · layered depth · role-specific art
          </p>
        </Specimen>
        <Specimen
          title="Large media frame"
          detail="Use a square, edge-to-edge frame for immersive editorial heroes; use rounded-4xl for an inset media panel. Choose the frame according to the surrounding layout, not the image’s subject."
        >
          <div className="relative aspect-video overflow-hidden rounded-4xl">
            <Image
              src="/images/editorial/asoebi-prize-hero.webp"
              alt="A designer adjusting a sculptural Asoebi garment"
              fill
              sizes="(min-width:768px) 45vw, 90vw"
              quality={90}
              className="object-cover"
            />
          </div>
          <p className="mt-5 text-xs">rounded-4xl · 32px · overflow-hidden</p>
        </Specimen>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {[
          [
            "Anatomy",
            "Lead with the subject or title, follow with supporting copy, then an explicit action when one exists.",
          ],
          [
            "Interaction",
            "A coloured panel is not automatically a link. Use a real anchor for navigation and avoid nested interactive targets.",
          ],
          [
            "Elevation",
            "shadow-asoebi-soft groups gently; float and panel lift media; deep is reserved for strong dark layers. Do not add a shadow to every block.",
          ],
        ].map(([title, copy]) => (
          <div key={title} className="border-t border-asoebi-purple-200 pt-5">
            <h3 className="font-bold">{title}</h3>
            <p className="mt-3 text-sm leading-6">{copy}</p>
          </div>
        ))}
      </div>
    </ReferenceSection>
  );
}
