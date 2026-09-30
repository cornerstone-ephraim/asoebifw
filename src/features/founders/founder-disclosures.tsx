import Image from "next/image";

import { FiChevronDown } from "react-icons/fi";

const founders = [
  {
    name: "Keniye Koroye",
    portrait: "/images/founders/keniye-koroye.webp",
    bio: [
      "Keniye Koroye is a multidisciplinary design engineer and product strategist working at the intersection of fashion, culture and technology. He approaches fashion as a living system shaped by people, craft, commerce and community.",
      "Educated at SCAD and Domus Academy, Keniye combines creative direction, user insight and market strategy to build culturally relevant experiences. Awarded the UK Global Talent Visa by Tech Nation in 2021, he brings an international perspective to platforms that position African designers, makers and stories for a global audience.",
    ],
  },
  {
    name: "Abiola Orimolade",
    portrait: "/images/founders/abiola-orimolade.webp",
    bio: [
      "Abiola Orimolade is an international fashion entrepreneur and creative platform builder committed to discovering and creating opportunities for emerging African talent.",
      "He founded BlackNBold Fashion House at Obafemi Awolowo University, produced the Ife Runway Fashion Show, and later established Nigerian Student Fashion and Design Week (NSFDW). Through his platforms, he has created international showcase opportunities for Nigerian creatives at New York Fashion Week and Dallas Fashion Week.",
      "Abiola is also the publisher of BlackNBold Magazine, named BEFFTA UK Magazine of the Year in 2016. With a background in Information Technology and an MBA from Sul Ross State University, USA, he combines fashion, business, and talent development to build pathways for African creatives on the global stage.",
    ],
  },
] as const;

export function FounderDisclosures() {
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
      {founders.map((founder) => (
        <article
          key={founder.name}
          className="border-t border-asoebi-purple-950/25 pt-6"
        >
          <div className="relative mb-6 aspect-4/5 max-w-40 overflow-hidden bg-asoebi-mist sm:max-w-72">
            <Image
              src={founder.portrait}
              alt={`Portrait placeholder for ${founder.name}`}
              fill
              sizes="(min-width: 640px) 288px, 160px"
              className="object-cover object-top"
            />
          </div>
          <h2 className="font-display text-4xl leading-none tracking-[-.055em] sm:text-5xl">
            {founder.name}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-asoebi-graphite">
            {founder.bio[0]}
          </p>
          <details className="group mt-4">
            <summary className="transition-linear inline-flex min-h-11 cursor-pointer list-none items-center gap-3 text-sm font-bold transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
              <span>
                Read biography
                <span className="sr-only"> of {founder.name}</span>
              </span>
              <FiChevronDown
                aria-hidden="true"
                className="transition-linear size-4 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
              />
            </summary>
            <div className="max-w-xl space-y-5 pt-3 text-base leading-7 text-asoebi-graphite">
              {founder.bio.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </details>
        </article>
      ))}
    </div>
  );
}
