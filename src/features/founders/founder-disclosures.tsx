"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
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
    imageStyle: "object-[center_90%] object-cover",
  },
  {
    name: "Abiola Orimolade",
    portrait: "/images/founders/abiola-orimolade.webp",
    bio: [
      "Abiola Orimolade is an international fashion entrepreneur and creative platform builder committed to discovering and creating opportunities for emerging African talent.",
      "He founded BlackNBold Fashion House at Obafemi Awolowo University, produced the Ife Runway Fashion Show, and later established Nigerian Student Fashion and Design Week (NSFDW). Through his platforms, he has created international showcase opportunities for Nigerian creatives at New York Fashion Week and Dallas Fashion Week.",
      "Abiola is also the publisher of BlackNBold Magazine, named BEFFTA UK Magazine of the Year in 2016. With a background in Information Technology and an MBA from Sul Ross State University, USA, he combines fashion, business, and talent development to build pathways for African creatives on the global stage.",
    ],
    imageStyle: "object-top object-cover",
  },
] as const;

export function FounderDisclosures() {
  const [expanded, setExpanded] = useState<string[]>([]);
  const reduced = useReducedMotion();
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
      {founders.map((founder) => (
        <article
          key={founder.name}
          className="border-t border-asoebi-purple-950/25 pt-6"
        >
          <div className="relative mb-6 aspect-square max-w-40 overflow-hidden bg-asoebi-mist sm:max-w-72">
            <Image
              src={founder.portrait}
              alt={`Portrait placeholder for ${founder.name}`}
              fill
              sizes="(min-width: 640px) 288px, 160px"
              className={founder.imageStyle}
            />
          </div>
          <h2 className="font-display text-4xl leading-none tracking-[-.055em] sm:text-5xl">
            {founder.name}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-asoebi-graphite">
            {founder.bio[0]}
          </p>
          <div className="mt-4">
            <button
              type="button"
              aria-expanded={expanded.includes(founder.name)}
              aria-controls={`biography-${founder.name.replaceAll(" ", "-")}`}
              onClick={() =>
                setExpanded((current) =>
                  current.includes(founder.name)
                    ? current.filter((name) => name !== founder.name)
                    : [...current, founder.name],
                )
              }
              className="transition-linear inline-flex min-h-11 cursor-pointer items-center gap-3 text-sm font-bold transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              <span>
                Read biography
                <span className="sr-only"> of {founder.name}</span>
              </span>
              <FiChevronDown
                aria-hidden="true"
                className={`ease-arrive size-4 transition-transform duration-200 motion-reduce:transition-none ${expanded.includes(founder.name) ? "rotate-180" : ""}`}
              />
            </button>
            <motion.div
              id={`biography-${founder.name.replaceAll(" ", "-")}`}
              inert={!expanded.includes(founder.name)}
              aria-hidden={!expanded.includes(founder.name)}
              initial={false}
              animate={{
                height: expanded.includes(founder.name) ? "auto" : 0,
                opacity: expanded.includes(founder.name) ? 1 : 0,
              }}
              transition={{
                duration: reduced ? 0 : 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden"
            >
              <div className="max-w-xl space-y-5 pt-3 text-base leading-7 text-asoebi-graphite">
                {founder.bio.slice(1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </article>
      ))}
    </div>
  );
}
