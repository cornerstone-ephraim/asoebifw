"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  ["Home", "/"],
  ["Founders", "/founders"],
  ["Asoebi Prize", "/prize"],
  ["Asoebi Vendor", "/vendor"],
  ["Asoebi After Party", "/after-party"],
] as const;

const participationLinks = [
  ["Join the Waitlist", "/#waitlist"],
  ["Apply for Accreditation", "/accreditation"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 text-asoebi-purple-950 sm:px-5 sm:pt-4">
      <motion.div
        layout
        transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`transition-linear pointer-events-auto relative mx-auto flex items-center justify-between rounded-full px-4 shadow-asoebi-float backdrop-blur-xl transition-[max-width,height,background-color,color,padding,box-shadow] duration-500 sm:px-6 ${compact ? "h-14 max-w-235 bg-asoebi-butter/95 text-asoebi-purple-950 shadow-asoebi-warm" : "h-16 max-w-295 bg-white/94 text-asoebi-purple-950"}`}
      >
        <Link
          data-site-logo
          href="/"
          className="font-display text-xl font-bold tracking-[-.04em] sm:text-2xl"
        >
          AEFW<span className="text-brand">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`transition-linear font-display text-[15px] font-semibold tracking-[-.015em] transition-colors hover:text-brand ${pathname === href ? "text-brand" : "text-asoebi-purple-950/70"}`}
            >
              {label}
            </Link>
          ))}
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
            onClick={() => setOpen(!open)}
            className={`transition-linear grid size-11 place-items-center rounded-full text-xs font-bold transition-colors lg:hidden ${compact ? "bg-white/55" : "bg-asoebi-mist"}`}
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
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile"
            initial={reduced ? false : "closed"}
            animate="open"
            exit="closed"
            variants={{
              closed: { opacity: 0, y: -12, scale: 0.98 },
              open: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: reduced ? 0 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  when: "beforeChildren",
                  staggerChildren: reduced ? 0 : 0.045,
                },
              },
            }}
            className="pointer-events-auto mx-auto mt-2 max-w-295 overflow-hidden rounded-4xl border border-white/70 bg-asoebi-mist/96 p-5 shadow-asoebi-float backdrop-blur-xl lg:hidden"
          >
            <div className="grid sm:grid-cols-2 sm:gap-x-6">
              {links.map(([label, href]) => (
                <motion.div
                  key={href}
                  variants={{
                    closed: { y: -8, opacity: 0 },
                    open: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === href ? "page" : undefined}
                    className={`block border-b py-3 font-display text-3xl tracking-[-.04em] ${pathname === href ? "border-brand text-brand" : "border-asoebi-purple-300/70"}`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
              className="mt-7 border-t border-asoebi-purple-300/70 pt-5"
            >
              <p className="text-[10px] font-bold tracking-[.18em] text-brand uppercase">
                Participate
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {participationLinks.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="transition-linear py-2 text-sm font-bold text-asoebi-purple-950 transition-colors hover:text-brand"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
