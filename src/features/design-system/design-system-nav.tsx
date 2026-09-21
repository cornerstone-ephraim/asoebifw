"use client";

import { useEffect, useState } from "react";

const sections = [
  ["overview", "Overview"],
  ["principles", "Principles"],
  ["typography", "Typography"],
  ["colour", "Colour"],
  ["composition", "Layout"],
  ["cards", "Cards"],
  ["buttons", "Buttons"],
  ["links", "Links"],
  ["inputs", "Inputs"],
  ["motion", "Motion"],
  ["responsive", "Responsive"],
  ["imagery", "Imagery"],
  ["guidance", "Guidance"],
] as const;
export function DesignSystemNav() {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-10% 0px -75% 0px", threshold: 0 },
    );
    for (const [id] of sections) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);
  return (
    <nav
      aria-label="Design system sections"
      className="sticky top-0 z-40 border-b border-asoebi-purple-200 bg-asoebi-ivory px-3 py-2 lg:px-10"
    >
      <div className="mx-auto max-w-375 overflow-x-auto">
        <ul className="flex min-w-max gap-1">
          {sections.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={() => setActive(id)}
                className={`block min-h-11 rounded-full px-4 py-3 text-xs font-bold transition-colors ${active === id ? "bg-asoebi-purple-950 text-white" : "text-asoebi-purple-950 hover:bg-asoebi-mist"}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
