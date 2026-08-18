import Image from "next/image";
import Link from "next/link";

import type { Designer } from "@/types/content";
import { getDesignerMedia } from "./designer-media";

export function DesignerGrid({ designers }: { designers: Designer[] }) {
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {designers.map((designer, index) => {
        const media = getDesignerMedia(designer.slug);
        return (
          <Link
            key={designer.slug}
            href={`/designers/${designer.slug}`}
            className={`group ${index % 3 === 1 ? "lg:mt-20" : ""}`}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-asoebi-mist shadow-[0_18px_55px_rgba(42,17,87,.10)]">
              <Image
                src={media.src}
                alt={`${designer.name}, Asoebi Fashion Week designer`}
                fill
                sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                className={`object-cover transition-transform transition-linear duration-700 group-hover:scale-[1.025] ${media.portraitPosition}`}
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-5">
              <div>
                <h2 className="font-display text-3xl tracking-[-.04em]">
                  {designer.name}
                </h2>
                <p className="mt-1 text-sm text-asoebi-muted">
                  {designer.location}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="mt-1 transition-transform transition-linear group-hover:translate-x-1"
              >
                ↗
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
