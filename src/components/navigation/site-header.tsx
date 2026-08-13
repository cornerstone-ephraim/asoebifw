"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [["Fashion Week", "/fashion-week"], ["Designers", "/designers"], ["Collections", "/collections"], ["Asoebi Prize", "/prize"], ["After Party", "/after-party"], ["About", "/about"]] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const updateHeader = () => {
      const openingSection = document.querySelector<HTMLElement>("main > section:first-child, main > header:first-child");
      const boundary = openingSection ? openingSection.offsetTop + openingSection.offsetHeight * 0.5 : 160;
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

  return <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 text-asoebi-purple-950 sm:px-5 sm:pt-4">
    <motion.div layout transition={{ duration: reduced ? 0 : .5, ease: [.22, 1, .36, 1] }} className={`pointer-events-auto relative mx-auto flex items-center justify-between rounded-full px-4 shadow-[0_14px_45px_rgba(40,20,73,.16)] backdrop-blur-xl transition-[max-width,height,background-color,color,padding,box-shadow] transition-linear duration-500 sm:px-6 ${compact ? "h-14 max-w-[940px] bg-[#eee4ca]/95 text-asoebi-purple-950 shadow-[0_16px_50px_rgba(80,55,28,.18)]" : "h-16 max-w-[1180px] bg-white/94 text-asoebi-purple-950"}`}>
      <Link href="/" className="font-display text-xl font-bold tracking-[-.04em] sm:text-2xl">Asoebi<span className="text-brand">.</span></Link>
      <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">{links.map(([label, href]) => <Link key={href} href={href} className="font-display text-[15px] font-semibold tracking-[-.015em] text-asoebi-purple-950/70 transition-colors transition-linear hover:text-brand">{label}</Link>)}</nav>
      <div className="flex items-center gap-2">
        <Link href="/tickets" className="rounded-full bg-asoebi-gold-300 px-4 py-3 text-[10px] font-black uppercase tracking-[0.1em] text-asoebi-purple-950 transition-colors transition-linear hover:bg-asoebi-gold-400 sm:px-5 sm:text-[11px]">Tickets <span aria-hidden="true">↗</span></Link>
        <button type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)} className={`grid size-11 place-items-center rounded-full text-xs font-bold transition-colors transition-linear lg:hidden ${compact ? "bg-white/55" : "bg-[#eee8f8]"}`}><span aria-hidden="true" className="flex flex-col gap-1.5">{open ? <><i className="block h-px w-4 translate-y-[3.5px] rotate-45 bg-current"/><i className="block h-px w-4 -translate-y-[3.5px] -rotate-45 bg-current"/></> : <><i className="block h-px w-4 bg-current"/><i className="block h-px w-4 bg-current"/><i className="block h-px w-4 bg-current"/></>}</span></button>
      </div>
    </motion.div>
    <AnimatePresence>{open && <motion.nav id="mobile-navigation" aria-label="Mobile" initial={reduced ? false : "closed"} animate="open" exit="closed" variants={{ closed: { opacity: 0, y: -12, scale: .98 }, open: { opacity: 1, y: 0, scale: 1, transition: { duration: reduced ? 0 : .45, ease: [.22, 1, .36, 1], when: "beforeChildren", staggerChildren: reduced ? 0 : .045 } } }} className="pointer-events-auto mx-auto mt-2 max-w-[1180px] overflow-hidden rounded-[1.75rem] border border-white/70 bg-[#eee8f8]/96 p-5 shadow-[0_18px_60px_rgba(40,20,73,.18)] backdrop-blur-xl lg:hidden"><div className="grid sm:grid-cols-2 sm:gap-x-6">{links.map(([label, href]) => <motion.div key={href} variants={{ closed: { y: -8, opacity: 0 }, open: { y: 0, opacity: 1, transition: { duration: .35, ease: [.22, 1, .36, 1] } } }}><Link href={href} onClick={() => setOpen(false)} className="font-display block border-b border-asoebi-purple-300/70 py-3 text-3xl tracking-[-.04em]">{label}</Link></motion.div>)}</div><motion.p variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }} className="mt-5 text-xs leading-5 text-asoebi-purple-950/55">Fashion, cloth and culture,together on the global stage.</motion.p></motion.nav>}</AnimatePresence>
  </header>;
}
