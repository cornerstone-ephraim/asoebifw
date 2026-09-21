"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  designSystemGroups,
  designSystemSections,
  sectionHref,
} from "./design-system-sections";

export function DesignSystemNav({
  collapsed = false,
  children,
}: {
  collapsed?: boolean;
  children?: ReactNode;
}) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const groups = designSystemGroups
    .map((group) => ({
      ...group,
      sections: group.sections.filter((section) =>
        `${group.title} ${section.label}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
      ),
    }))
    .filter((group) => group.sections.length);
  const current = designSystemSections.find(
    (section) => sectionHref(section.slug) === pathname,
  );
  const links = (
    <nav aria-label="Design system sections" className="space-y-6 px-6 py-8">
      <label className="block">
        <span className="sr-only">Find a chapter</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a chapter…"
          className="min-h-11 w-full rounded-lg border border-asoebi-purple-100 bg-asoebi-purple-50 px-3 text-sm outline-offset-2 placeholder:text-asoebi-graphite"
        />
      </label>
      {!groups.length && (
        <p role="status" className="text-sm text-asoebi-graphite">
          No chapters found. Try a different term.
        </p>
      )}
      {groups.map((group) => (
        <div key={group.title}>
          <h2 className="mb-3 text-xs font-semibold tracking-widest text-asoebi-graphite uppercase">
            {group.title}
          </h2>
          <ul className="border-l border-asoebi-purple-100">
            {group.sections.map((section) => {
              const active = pathname === sectionHref(section.slug);
              return (
                <li key={section.slug}>
                  <Link
                    href={sectionHref(section.slug)}
                    aria-current={active ? "page" : undefined}
                    className={`-ml-px flex min-h-11 items-center border-l-2 px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${active ? "border-brand font-semibold text-brand" : "border-transparent text-asoebi-graphite hover:border-asoebi-purple-300 hover:bg-asoebi-ivory hover:text-brand-deep"}`}
                  >
                    {section.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
  return (
    <>
      <aside
        id="design-system-sidebar"
        className={`sticky top-16 hidden h-[calc(100dvh-4rem)] min-w-0 border-r border-asoebi-purple-100 bg-white ${collapsed ? "lg:invisible lg:block" : "lg:block"}`}
      >
        <div className="h-full overflow-y-auto">{!collapsed && links}</div>
        {!collapsed && children}
      </aside>
      <div className="sticky top-16 z-30 border-b border-asoebi-purple-100 bg-white lg:hidden">
        <details key={pathname} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 text-sm font-bold [&::-webkit-details-marker]:hidden">
            <span>
              Browse the system{" "}
              <span className="font-normal text-asoebi-graphite">
                / {current?.label}
              </span>
            </span>
            <span aria-hidden="true" className="group-open:hidden">
              +
            </span>
            <span aria-hidden="true" className="hidden group-open:inline">
              −
            </span>
          </summary>
          <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto">
            {links}
          </div>
        </details>
      </div>
    </>
  );
}
