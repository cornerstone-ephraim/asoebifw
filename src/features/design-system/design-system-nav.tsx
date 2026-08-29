"use client";

import Link from "next/link";
import { useEffect, useState, type KeyboardEvent } from "react";

const sections = [
  ["#principles", "Principles"],
  ["#colour", "Colour"],
  ["#typography", "Typography"],
  ["#composition", "Composition"],
  ["#motion", "Motion"],
  ["#components", "Components"],
  ["#responsive", "Responsive"],
] as const;

export function DesignSystemNav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      return window.location.hash;
    }
    return "#principles";
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveSection(window.location.hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach(([href]) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
    }
  };

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
      className="fixed top-1/2 left-2 z-40 -translate-y-1/2 font-sans"
    >
      {/* Collapsed Vertical Indicator Bar */}
      <button
        type="button"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-20 w-1.5 cursor-pointer rounded-full bg-brand-deep ring-1 ring-asoebi-gold-900 transition-all duration-300 ease-asoebi-arrive hover:w-2 hover:bg-brand hover:ring-asoebi-gold-400"
      />

      {/* Expanded Floating Popout Card */}
      <nav
        aria-label="Design system sections"
        aria-hidden={!open}
        className={`absolute top-1/2 left-3 w-45 -translate-y-1/2 rounded-2xl border border-asoebi-graphite bg-asoebi-charcoal/95 p-4 text-asoebi-mist shadow-asoebi-deep backdrop-blur-xl transition-all duration-200 ease-asoebi-arrive before:absolute before:top-0 before:-left-4 before:h-full before:w-4 before:content-[''] ${
          open
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-2 opacity-0"
        }`}
      >
        {/* Header / Trigger */}
        <div className="flex items-center gap-3 border-b border-asoebi-graphite/50 pb-3">
          <span aria-hidden="true" className="grid shrink-0 grid-cols-2 gap-1">
            <span className="size-1 rounded-full bg-asoebi-gold-300" />
            <span className="size-1 rounded-full bg-asoebi-mist/45" />
            <span className="size-1 rounded-full bg-asoebi-mist/45" />
            <span className="size-1 rounded-full bg-asoebi-gold-300" />
          </span>
          <span className="text-[10px] font-bold tracking-[.16em] text-asoebi-muted uppercase">
            Jump to
          </span>
        </div>

        {/* Section Links */}
        <ul className="mt-2 grid gap-x-3 gap-y-1">
          {sections.map(([href, label]) => {
            const isActive = activeSection === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  tabIndex={open ? 0 : -1}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => {
                    setActiveSection(href);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors duration-150 ease-asoebi-arrive focus-visible:outline-none ${
                    isActive
                      ? "bg-asoebi-purple-950 text-asoebi-gold-300"
                      : "text-asoebi-mist/80 hover:bg-asoebi-ink/60 hover:text-asoebi-ivory focus-visible:bg-asoebi-ink/60 focus-visible:text-asoebi-ivory"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-1.5 shrink-0 rounded-full transition-all duration-200 ${
                      isActive ? "bg-asoebi-gold-300" : "bg-asoebi-graphite"
                    }`}
                  />
                  <span className="truncate">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
