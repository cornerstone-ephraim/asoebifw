"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const roles = {
  Partner: { line: "Build the stage with us", accent: "#3b1977", bg: "#fff0bd", ink: "#2a1157", mark: "✦" },
  Designer: { line: "Show the world your point of view", accent: "#fbcd4f", bg: "#2a1157", ink: "#ffffff", mark: "✺" },
  Buyer: { line: "Discover what fashion wears next", accent: "#3b1977", bg: "#ffd9d0", ink: "#2a1157", mark: "◒" },
  Media: { line: "Tell the stories behind the cloth", accent: "#52239f", bg: "#dcd0ff", ink: "#2a1157", mark: "◎" },
  Vendor: { line: "Meet the people looking for your craft", accent: "#3b1977", bg: "#f6b928", ink: "#2a1157", mark: "◇" },
  Other: { line: "There is a place for your perspective", accent: "#ef735d", bg: "#fffaf1", ink: "#2a1157", mark: "+" },
} as const;

type Role = keyof typeof roles;
const roleNames = Object.keys(roles) as Role[];

export function WaitlistSection() {
  const [role, setRole] = useState<Role>("Designer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const reduced = useReducedMotion();
  const valid = name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(email);

  const selectRole = (item: Role) => { setRole(item); setJoined(false); };
  const downloadCard = () => {
    if (!valid) return;
    const active = roles[role];
    const canvas = document.createElement("canvas");
    canvas.width = 1400; canvas.height = 900;
    const context = canvas.getContext("2d"); if (!context) return;
    context.fillStyle = active.bg; context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = active.accent; context.beginPath(); context.arc(1220, 150, 74, 0, Math.PI * 2); context.fill();
    context.fillStyle = active.ink; context.font = "800 24px Arial"; context.letterSpacing = "5px"; context.fillText("ASOEBI FASHION WEEK", 90, 110);
    context.globalAlpha = .65; context.font = "700 22px Arial"; context.fillText(`${role.toUpperCase()} ACCESS`, 90, 430); context.globalAlpha = 1;
    context.font = "700 72px Arial"; const words = `${name.trim()}, this is your invitation.`.split(" "); let line = ""; let y = 520;
    words.forEach((word) => { const test = `${line}${word} `; if (context.measureText(test).width > 1050 && line) { context.fillText(line, 90, y); line = `${word} `; y += 88; } else line = test; }); context.fillText(line, 90, y);
    context.globalAlpha = .35; context.fillRect(90, 780, 1220, 2); context.globalAlpha = 1;
    context.font = "700 18px Arial"; context.fillText("PRIORITY UPDATES", 90, 835); context.fillText("AFW · 2026", 1160, 835);
    context.fillStyle = active.ink; context.font = "700 54px Arial"; context.fillText(active.mark, 1202, 168);
    const link = document.createElement("a"); link.download = `asoebi-${role.toLowerCase()}-${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`; link.href = canvas.toDataURL("image/png"); link.click();
  };

  return <section id="waitlist" className="bg-[#eee8f8] px-5 py-24 lg:px-10 lg:py-36">
    <div className="mx-auto grid max-w-[1500px] overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_90px_rgba(54,23,103,.12)] lg:grid-cols-[1.05fr_.95fr]">
      <div className="p-7 sm:p-12 lg:p-16">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">Join the circle</p>
        <h2 className="font-display mt-5 max-w-2xl text-5xl leading-[.92] tracking-[-.055em] sm:text-7xl">Your place in the story starts here.</h2>
        <p className="mt-6 max-w-xl leading-7 text-asoebi-graphite">Choose how you want to experience Asoebi Fashion Week. We’ll shape your invitation around you.</p>
        <div className="mt-9 flex flex-wrap gap-2" aria-label="Choose your role">{roleNames.map((item) => <button key={item} type="button" onClick={() => selectRole(item)} aria-pressed={role === item} className={`rounded-full border px-4 py-2.5 text-xs font-bold transition-colors transition-linear ${role === item ? "border-brand bg-brand text-white" : "border-asoebi-purple-200 bg-white text-asoebi-purple-900 hover:border-brand"}`}>{item}</button>)}</div>
        <form className="mt-10 grid gap-3 sm:grid-cols-2" onSubmit={(event) => { event.preventDefault(); if (valid) setJoined(true); }}>
          <label className="sr-only" htmlFor="waitlist-name">Name</label><input id="waitlist-name" required value={name} onChange={(event) => { setName(event.target.value); setJoined(false); }} placeholder="Your name" className="min-h-13 rounded-full border border-asoebi-purple-200 px-5 text-sm outline-none focus:border-brand" />
          <label className="sr-only" htmlFor="waitlist-email">Email</label><input id="waitlist-email" required value={email} onChange={(event) => { setEmail(event.target.value); setJoined(false); }} type="email" placeholder="Email address" className="min-h-13 rounded-full border border-asoebi-purple-200 px-5 text-sm outline-none focus:border-brand" />
          <button className="min-h-13 rounded-full bg-asoebi-gold-400 px-6 text-xs font-black uppercase tracking-[.12em] text-asoebi-purple-950 sm:col-span-2">{joined ? "You’re on the list" : "Join waitlist"}</button>
          {joined && <button type="button" onClick={downloadCard} className="min-h-13 rounded-full bg-brand px-6 text-xs font-black uppercase tracking-[.12em] text-white sm:col-span-2">Download my {role.toLowerCase()} card ↓</button>}
        </form>
      </div>
      <div className="relative min-h-[42rem] overflow-hidden bg-asoebi-purple-950 p-6 sm:p-10">
        <div className="absolute inset-0 bg-[url('/images/waitlist-collage.png')] bg-cover bg-center opacity-55" />
        <div className="relative mx-auto h-full min-h-[36rem] max-w-xl" aria-label="Select a waitlist card">
          {roleNames.map((item, index) => { const card = roles[item]; const active = item === role; const distance = (index - roleNames.indexOf(role) + roleNames.length) % roleNames.length; return <motion.button type="button" key={item} onClick={() => selectRole(item)} aria-pressed={active} initial={false} animate={{ x: active ? 0 : Math.min(distance, 4) * 9, y: active ? 0 : Math.min(distance, 4) * 13, rotate: active ? 0 : (distance % 2 ? 2.2 : -1.5), scale: active ? 1 : 1 - Math.min(distance, 4) * .018 }} transition={{ duration: reduced ? 0 : .55, ease: [.22, 1, .36, 1] }} style={{ zIndex: active ? 20 : 10 - distance, backgroundColor: card.bg, color: card.ink }} className="absolute inset-0 flex min-h-[34rem] w-full cursor-pointer flex-col justify-between rounded-[1.5rem] p-7 text-left shadow-[0_24px_65px_rgba(14,5,28,.34)] sm:p-9">
            <div className="flex items-start justify-between"><span className="text-[11px] font-black uppercase tracking-[.2em]">Asoebi Fashion Week</span><span style={{ backgroundColor: card.accent }} className="grid size-12 place-items-center rounded-full text-xl text-white">{card.mark}</span></div>
            <div><p className="text-xs font-bold uppercase tracking-[.18em] opacity-65">{item} access</p><p className="font-display mt-3 text-4xl leading-[.95] tracking-[-.045em] sm:text-5xl">{name && active ? `${name}, this is your invitation.` : card.line}</p></div>
            <div className="flex justify-between border-t border-current/20 pt-5 text-[10px] font-bold uppercase tracking-[.16em]"><span>{active ? "Priority updates" : "Tap to bring forward"}</span><span>AFW · 2026</span></div>
          </motion.button>; })}
        </div>
      </div>
    </div>
  </section>;
}
