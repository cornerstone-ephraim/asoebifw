"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const links = [["Fashion Week", "/fashion-week"], ["Designers", "/designers"], ["Collections", "/collections"], ["Asoebi Prize", "/prize"], ["After Party", "/after-party"], ["About", "/about"]] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-asoebi-ink/88 text-white backdrop-blur-xl">
    <div className="mx-auto flex h-18 max-w-[1600px] items-center justify-between px-5 lg:px-10">
      <Link href="/" className="text-sm font-black tracking-[0.18em]">ASOEBI <span className="text-asoebi-purple-300">FW</span></Link>
      <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">{links.map(([label, href]) => <Link key={href} href={href} className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75 transition-colors hover:text-white">{label}</Link>)}<Link href="/tickets" className="bg-asoebi-purple-700 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-asoebi-purple-600">Get Tickets</Link></nav>
      <button type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="min-h-11 px-2 text-xs font-bold uppercase tracking-[0.16em] lg:hidden">{open ? "Close" : "Menu"}</button>
    </div>
    <AnimatePresence>{open && <motion.nav id="mobile-navigation" aria-label="Mobile" initial={reduced ? false : "closed"} animate="open" exit="closed" variants={{ closed: { clipPath: "inset(0 0 100% 0)" }, open: { clipPath: "inset(0 0 0% 0)", transition: { duration: reduced ? 0 : .55, ease: [.22, 1, .36, 1], when: "beforeChildren", staggerChildren: reduced ? 0 : .055 } } }} className="absolute inset-x-0 top-full min-h-[calc(100vh-4.5rem)] bg-asoebi-purple-950 px-6 py-10 lg:hidden"><div className="flex flex-col">{links.map(([label, href]) => <motion.div key={href} variants={{ closed: { x: -20, opacity: 0 }, open: { x: 0, opacity: 1, transition: { duration: .42, ease: [.22, 1, .36, 1] } } }}><Link href={href} onClick={() => setOpen(false)} className="block border-b border-white/15 py-4 text-3xl font-semibold tracking-[-.04em]">{label}</Link></motion.div>)}<motion.div variants={{ closed: { y: 12, opacity: 0 }, open: { y: 0, opacity: 1 } }}><Link href="/tickets" onClick={() => setOpen(false)} className="mt-8 block bg-white px-5 py-4 text-center text-xs font-bold uppercase tracking-[.16em] text-asoebi-ink">Get Tickets</Link></motion.div></div></motion.nav>}</AnimatePresence>
  </header>;
}
