"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Heading = { id: string; label: string };

export function DocumentOutline() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState("");
  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const frame = requestAnimationFrame(() => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(
          "#main-content h2, #main-content h3",
        ),
      );
      const counts = new Map<string, number>();
      const entries = nodes.map((node) => {
        const label = node.textContent?.trim() ?? "";
        const slug = label
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        const count = (counts.get(slug) ?? 0) + 1;
        counts.set(slug, count);
        if (!node.id) node.id = `topic-${slug}${count > 1 ? `-${count}` : ""}`;
        node.style.scrollMarginTop = "9rem";
        return { id: node.id, label };
      });
      setHeadings(entries);
      setActive(entries[0]?.id ?? "");
      observer = new IntersectionObserver(
        (visible) => {
          const first = visible
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
            )[0];
          if (first) setActive(first.target.id);
        },
        { rootMargin: "-15% 0px -60% 0px" },
      );
      nodes.forEach((node) => observer?.observe(node));
      const hash = window.location.hash.slice(1);
      if (hash)
        document.getElementById(hash)?.scrollIntoView({ behavior: "instant" });
    });
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);
  if (!headings.length) return null;
  return (
    <nav
      aria-label="On this page"
      className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto py-2 pr-5"
    >
      <p className="mb-5 text-xs font-semibold tracking-widest text-asoebi-graphite uppercase">
        On this page
      </p>
      <ul className="border-l border-asoebi-purple-100">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={active === heading.id ? "location" : undefined}
              onClick={() => setActive(heading.id)}
              className={`-ml-px block border-l px-4 py-2 text-sm leading-6 hover:text-brand ${active === heading.id ? "border-brand font-semibold text-brand" : "border-transparent text-asoebi-graphite"}`}
            >
              {heading.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
