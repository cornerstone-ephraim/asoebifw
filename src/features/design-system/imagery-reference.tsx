import Image from "next/image";
import { ReferenceSection } from "./reference-section";

const images = [
  [
    "Asoebi Prize",
    "/images/editorial/asoebi-prize-hero.webp",
    "A designer adjusting an elaborate Asoebi garment",
    "Craft in progress",
    "A designer and garment communicate skill, authorship and a body of work. The page’s brief supplies the competition details; the image should not imply a winner has already been chosen.",
  ],
  [
    "Asoebi Vendor",
    "/images/editorial/vendor-hero.webp",
    "An Asoebi fabric consultation in a textile shop",
    "Commerce through a human interaction",
    "Fabric, choice and conversation make the vendor proposition legible. This is more useful than another runway image because the task is discovering and buying from makers.",
  ],
  [
    "After Party",
    "/images/editorial/asoebi-after-party-hero.webp",
    "Guests celebrating together in coordinated Asoebi attire",
    "Celebration in company",
    "Movement, guests and evening light signal a social occasion. Clothing remains central so the party feels connected to the fashion platform.",
  ],
  [
    "Founders",
    "/images/editorial/asoebi-founders-hero.webp",
    "Purple woven Aso Oke and textile samples arranged on a studio worktable",
    "The work behind the vision",
    "The founders’ page uses a craft-led image without founder portraits, respecting their choice to keep their photographs off the page. The statement layout gives the vision equal space.",
  ],
] as const;
export function ImageryReference() {
  return (
    <ReferenceSection
      id="imagery"
      title="Let the image explain the page."
      intro="The current direction is editorial realism: believable people, natural skin texture, detailed textiles and purposeful settings. Consistent styling connects the pages; different activities make their subjects distinct."
    >
      <div className="grid gap-8 md:grid-cols-2">
        {images.map(([page, src, alt, title, copy]) => (
          <figure key={page} className="min-w-0">
            <div className="relative aspect-3/2 overflow-hidden bg-asoebi-mist">
              <Image
                src={src}
                alt={alt}
                fill
                quality={90}
                sizes="(min-width:1580px) 734px, (min-width:768px) 46vw, 90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="border-b border-asoebi-purple-200 py-6">
              <p className="text-sm font-bold text-brand">{page}</p>
              <h3 className="mt-2 font-display text-3xl tracking-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-asoebi-graphite">
                {copy}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-10 grid gap-7 lg:grid-cols-3">
        {[
          [
            "Palette as material",
            "Use #FFF8EE in settings, #2A1157 and #18131E in tailoring, #52239F in textile accents and #D69A12 in small fabric details. These are image art-direction values, not replacements for UI tokens. Preserve natural skin tones instead of applying a purple colour wash.",
          ],
          [
            "Photography and illustration",
            "Photorealistic editorial imagery grounds the page in craft and people. Illustrated invitation cards add a distinct, playful layer to participation. Generated scenes are conceptual illustrations of the experience; they should not be presented as documentary proof of an event or as portraits of real founders.",
          ],
          [
            "Crop and delivery",
            "Choose a focal point that survives narrow and wide crops. Keep faces and textile details out of text overlays. Large production images use quality 90 and sizes values based on the rendered crop, including tall mobile heroes. More compression quality cannot recover detail missing from the original source.",
          ],
        ].map(([title, copy]) => (
          <article key={title}>
            <h3 className="font-display text-2xl">{title}</h3>
            <p className="mt-4 text-sm leading-6">{copy}</p>
          </article>
        ))}
      </div>
      <p className="mt-8 rounded-2xl bg-asoebi-mist p-6 text-sm leading-6">
        Before publishing: check desktop and mobile crops, facial and hand
        details, credible fabrics, text contrast and descriptive alt text. Keep
        lettering and logos in HTML rather than generating them into an image. A
        hero should support the content, not replace it.
      </p>
    </ReferenceSection>
  );
}
