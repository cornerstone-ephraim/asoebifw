import { FiChevronDown } from "react-icons/fi";

const founders = [
  {
    name: "Keniye Koroye",
    bio: [
      "Keniye Koroye is a multidisciplinary design engineer and product strategist working at the intersection of fashion, culture and technology. He approaches fashion as a living system shaped by people, craft, commerce and community.",
      "Educated at SCAD and Domus Academy, Keniye combines creative direction, user insight and market strategy to build culturally relevant experiences. Awarded the UK Global Talent Visa by Tech Nation in 2021, he brings an international perspective to platforms that position African designers, makers and stories for a global audience.",
    ],
  },
  {
    name: "Abiola Orimolade",
    bio: [
      "Abiola Orimolade is an international fashion entrepreneur and creative platform builder committed to discovering and creating opportunities for emerging African talent.",
      "He founded BlackNBold Fashion House at Obafemi Awolowo University, produced the Ife Runway Fashion Show, and later established Nigerian Student Fashion and Design Week (NSFDW). Through his platforms, he has created international showcase opportunities for Nigerian creatives at New York Fashion Week and Dallas Fashion Week.",
      "Abiola is also the publisher of BlackNBold Magazine, named BEFFTA UK Magazine of the Year in 2016. With a background in Information Technology and an MBA from Sul Ross State University, USA, he combines fashion, business, and talent development to build pathways for African creatives on the global stage.",
    ],
  },
] as const;

export function FounderDisclosures() {
  return (
    <div className="mt-8 border-y border-asoebi-purple-950/25">
      {founders.map((founder) => (
        <details
          key={founder.name}
          className="group border-b border-asoebi-purple-950/20 last:border-b-0"
        >
          <summary className="transition-linear flex min-h-24 cursor-pointer list-none items-center justify-between gap-5 py-8 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
            <span className="font-display text-5xl leading-[.9] tracking-[-.055em] sm:text-7xl lg:text-8xl">
              {founder.name}
            </span>
            <FiChevronDown
              aria-hidden="true"
              className="transition-linear size-8 shrink-0 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none sm:size-10"
            />
          </summary>
          <div className="max-w-4xl space-y-5 pb-10 text-lg leading-8 text-asoebi-graphite">
            {founder.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
