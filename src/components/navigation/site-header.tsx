"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MobileNav } from "./mobile-nav";
import { LuChevronDown } from "react-icons/lu";

const links = [
  ["Home", "/"],
  ["Founders", "/founders"],
  ["Asoebi Fashion Week", "/fashion-week"],
  ["Asoebi Prize", "/prize"],
  ["Asoebi Vendor", "/vendor"],
  ["Asoebi After Party", "/after-party"],
] as const;

const participationLinks = [
  ["Join the Waitlist", "/#waitlist"],
  ["Apply to Participate", "/accreditation"],
  ["Apply to sponsor", "/sponsorship"],
] as const;

export function SiteHeader() {
  const [compact, setCompact] = useState(false);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  // Scroll threshold detection for compact state
  useEffect(() => {
    const updateHeader = () => {
      const openingSection = document.querySelector<HTMLElement>(
        "main > section:first-child, main > header:first-child",
      );
      const boundary = openingSection
        ? openingSection.offsetTop + openingSection.offsetHeight * 0.5
        : 160;
      setCompact(window.scrollY > Math.max(96, boundary));
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 text-asoebi-purple-950 sm:px-5 sm:pt-4">
      <SiteHeaderContent
        key={pathname}
        pathname={pathname}
        compact={compact}
        reduced={reduced}
      />
    </header>
  );
}

function SiteHeaderContent({
  pathname,
  compact,
  reduced,
}: {
  pathname: string;
  compact: boolean;
  reduced: boolean | null;
}) {
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !exploreRef.current?.contains(event.target)
      ) {
        setExploreOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && exploreOpen) {
        setExploreOpen(false);
        exploreButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [exploreOpen]);

  return (
    <>
      <motion.div
        layout
        transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`transition-linear pointer-events-auto relative mx-auto flex items-center justify-between rounded-full px-4 shadow-asoebi-float backdrop-blur-xl transition-[max-width,height,background-color,color,padding,box-shadow] duration-250 sm:px-6 ${
          compact
            ? "h-14 max-w-190 bg-white/80 text-asoebi-purple-950 shadow-asoebi-warm"
            : "h-16 max-w-200 bg-white/94 text-asoebi-purple-950"
        }`}
      >
        <Link
          data-site-logo
          href="/"
          className="font-display text-xl leading-none font-bold tracking-[-.085em] sm:text-2xl"
        >
          AEFW<span className="text-asoebi-gold-500">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.slice(0, 2).map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`transition-linear font-display text-[15px] font-semibold tracking-[-.015em] transition-colors hover:text-brand ${
                pathname === href ? "text-brand" : "text-asoebi-purple-950/70"
              }`}
            >
              {label}
            </Link>
          ))}
          <div
            ref={exploreRef}
            className="group relative"
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              )
                setExploreOpen(false);
            }}
          >
            <button
              ref={exploreButtonRef}
              type="button"
              aria-expanded={exploreOpen}
              aria-controls="explore-navigation"
              onClick={() => setExploreOpen((value) => !value)}
              className={`flex min-h-11 cursor-pointer items-center gap-2 font-display text-[15px] font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${links.slice(2).some(([, href]) => pathname === href) ? "text-brand" : "text-asoebi-purple-950/70"}`}
            >
              Explore{" "}
              <LuChevronDown
                aria-hidden="true"
                className={`ease-arrive text-xs transition-transform duration-200 motion-reduce:transition-none ${exploreOpen ? "rotate-180" : ""}`}
              />
            </button>
            <motion.div
              id="explore-navigation"
              inert={!exploreOpen}
              aria-hidden={!exploreOpen}
              initial={false}
              animate={{
                opacity: exploreOpen ? 1 : 0,
                transform: reduced
                  ? "none"
                  : exploreOpen
                    ? "translateY(0) scale(1)"
                    : "translateY(-4px) scale(0.97)",
              }}
              transition={{
                duration: reduced ? 0 : 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ pointerEvents: exploreOpen ? "auto" : "none" }}
              className="absolute top-full left-1/2 mt-3 w-64 origin-top -translate-x-1/2 rounded-2xl border border-asoebi-purple-950/10 bg-asoebi-ivory p-2 shadow-asoebi-float"
            >
              {links.slice(2).map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  onClick={() => setExploreOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold hover:bg-asoebi-mist focus-visible:bg-asoebi-mist focus-visible:outline-2 focus-visible:outline-brand aria-[current=page]:text-brand"
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          </div>
          <Link
            href="/sponsorship"
            aria-current={pathname === "/sponsorship" ? "page" : undefined}
            className="transition-linear font-display text-sm font-semibold whitespace-nowrap text-brand transition-colors hover:text-asoebi-purple-950"
          >
            Apply to sponsor
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/prize#apply"
            className="group transition-linear rounded-full bg-asoebi-gold-300 px-4 py-3 text-[10px] font-black tracking-widest text-asoebi-purple-950 uppercase transition-colors hover:bg-asoebi-gold-400 sm:px-5 sm:text-[11px]"
          >
            Apply for Prize{" "}
            <span
              aria-hidden="true"
              className="transition-linear inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5"
            >
              ↗
            </span>
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((prev) => !prev)}
            className={`transition-linear grid size-11 place-items-center rounded-full text-xs font-bold transition-colors lg:hidden ${
              compact ? "bg-white/55" : "bg-asoebi-mist"
            }`}
          >
            <span aria-hidden="true" className="flex flex-col gap-1.5">
              {open ? (
                <>
                  <i className="block h-px w-4 translate-y-[3.5px] rotate-45 bg-current" />
                  <i className="block h-px w-4 translate-y-[-3.5px] -rotate-45 bg-current" />
                </>
              ) : (
                <>
                  <i className="block h-px w-4 bg-current" />
                  <i className="block h-px w-4 bg-current" />
                  <i className="block h-px w-4 bg-current" />
                </>
              )}
            </span>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <MobileNav
            links={links}
            participationLinks={participationLinks}
            pathname={pathname}
            reduced={reduced}
            closeAction={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
