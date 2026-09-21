import Link from "next/link";
import { DesignSystemHero } from "@/features/design-system/design-system-hero";
import {
  designSystemGroups,
  sectionHref,
} from "@/features/design-system/design-system-sections";

export default function DesignSystemPage() {
  return (
    <>
      <DesignSystemHero />
      <section
        aria-labelledby="browse-title"
        className="px-5 py-12 sm:px-8 lg:px-12"
      >
        <h2
          id="browse-title"
          className="font-display text-2xl font-semibold tracking-tight"
        >
          Find what you need.
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-asoebi-graphite">
          Each chapter brings together the decisions, examples and
          implementation guidance for one part of the system.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {designSystemGroups.map((group) => (
            <div key={group.title}>
              <h3 className="border-b border-asoebi-purple-200 pb-3 font-display text-xl">
                {group.title}
              </h3>
              <ul className="mt-2">
                {group.sections
                  .filter((section) => section.slug)
                  .map((section) => (
                    <li key={section.slug}>
                      <Link
                        href={sectionHref(section.slug)}
                        className="flex min-h-12 items-center justify-between gap-4 py-3 text-sm hover:text-brand hover:underline"
                      >
                        {section.label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
