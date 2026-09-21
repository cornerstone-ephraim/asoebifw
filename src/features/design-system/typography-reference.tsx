import { ReferenceSection } from "./reference-section";

const sizes = [
  [
    "text-xs",
    "12px / 16px",
    "Eyebrows, labels and compact metadata",
    "ASOEBI FASHION WEEK",
    "text-xs font-bold tracking-[.18em] uppercase",
  ],
  [
    "text-sm",
    "14px / 20px",
    "Admin detail, form labels and supporting copy",
    "Your enquiry has been received.",
    "text-sm",
  ],
  [
    "text-base",
    "16px / 24px",
    "Body copy and sponsorship inputs",
    "Tell us about the partnership you have in mind.",
    "text-base",
  ],
  [
    "text-lg",
    "18px / 28px",
    "Editorial introductions; often paired with leading-8",
    "A bigger stage for African fashion.",
    "text-lg",
  ],
  [
    "text-xl",
    "20px / 28px",
    "Compact wordmarks and emphasis",
    "Asoebi Fashion Week",
    "font-display text-xl",
  ],
  [
    "text-2xl",
    "24px / 32px",
    "Small component headings",
    "The details matter.",
    "font-display text-2xl",
  ],
  [
    "text-3xl",
    "30px / 36px",
    "Card titles and organisation names",
    "Made to connect.",
    "font-display text-3xl tracking-tight",
  ],
  [
    "text-4xl",
    "36px / 40px",
    "Compact section and confirmation headings",
    "You’re on the list.",
    "font-display text-4xl tracking-tight",
  ],
  [
    "text-5xl",
    "48px / 48px",
    "Mobile statements and form introductions",
    "Cloth carries memory.",
    "font-display text-5xl tracking-tight",
  ],
  [
    "text-6xl",
    "60px / 60px",
    "Editorial chapters and admin headings at sm",
    "Culture in motion.",
    "font-display text-6xl tracking-tight",
  ],
  [
    "text-7xl",
    "72px / 72px",
    "Large mobile/tablet editorial statements",
    "Our story.",
    "font-display text-7xl tracking-tight",
  ],
  [
    "text-8xl",
    "96px / 96px",
    "Desktop section statements",
    "Asoebi.",
    "font-display text-8xl tracking-tight",
  ],
] as const;
export function TypographyReference() {
  return (
    <ReferenceSection
      id="typography"
      title="A voice at every size."
      intro="Bricolage Grotesque gives statements their character. Schibsted Grotesk carries reading, navigation and forms. The specimens below use the actual utility sizes, not scaled screenshots."
      tone="mist"
    >
      <div className="mb-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl bg-asoebi-purple-950 p-7 text-white">
          <h3 className="text-sm font-bold">
            Bricolage Grotesque · font-display
          </h3>
          <p className="mt-6 font-display text-5xl tracking-tight">
            Aa. Woven together.
          </p>
          <p className="mt-6 text-sm leading-6 text-white/80">
            Variable weight 200–800. Use for headlines, chapter titles and card
            names. Tight tracking and short lines give it presence. The current
            display font is Bricolage; the licensed Being replacement is not
            installed.
          </p>
        </article>
        <article className="rounded-3xl bg-white p-7">
          <h3 className="text-sm font-bold">Schibsted Grotesk · font-sans</h3>
          <p className="mt-6 text-2xl leading-9">
            Fashion, culture and the people who bring them together.
          </p>
          <p className="mt-6 text-sm leading-6">
            Variable weight 400–900, with a real italic face. Use for
            paragraphs, controls and small labels. Body text commonly uses
            1.75–1.8 line height; do not inherit the tight display leading.
          </p>
        </article>
      </div>
      <p className="mb-6 text-sm leading-6">
        Sizes assume the default 16px root. Listed line heights are Tailwind
        defaults; editorial headings often override them with 0.86–0.98 leading.
        Font size does not determine heading level: preserve the document
        hierarchy.
      </p>
      <div className="divide-y divide-asoebi-purple-200 border-y border-asoebi-purple-200">
        {sizes.map(([token, size, use, sample, classes]) => (
          <article
            key={token}
            className="grid min-w-0 gap-5 py-7 lg:grid-cols-[20rem_1fr]"
          >
            <div>
              <h3 className="text-sm font-bold">
                {token} · {size}
              </h3>
              <p className="mt-2 text-sm leading-6 text-asoebi-graphite">
                {use}
              </p>
            </div>
            <p className={`min-w-0 wrap-break-word ${classes}`}>{sample}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-3xl border border-asoebi-purple-300 p-6">
        <h3 className="font-display text-2xl">Fluid hero type</h3>
        <p className="mt-3 leading-7">
          The statement hero uses <code>clamp(3.5rem, 7vw, 8rem)</code>: 56px
          minimum, a viewport-based middle, and 128px maximum. At 375px and
          768px it is 56px; at 1440px it is about 101px. It grows without
          forcing a desktop headline onto a phone.
        </p>
        <p className="mt-4 text-sm leading-6">
          Small exceptions: 10px utility metadata appears in compact internal
          labels. Keep essential instructions at body size. Avoid long all-caps
          paragraphs and simulated italics for the display font.
        </p>
      </div>
    </ReferenceSection>
  );
}
