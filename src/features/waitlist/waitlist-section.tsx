"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { CustomSelect } from "@/components/ui/custom-select";

const roles = {
  Partner: {
    line: "Build the stage with us",
    accent: "#3b1977",
    bg: "#fff0bd",
    ink: "#2a1157",
    mark: "✦",
    illustration: "/images/waitlist/partner-card-illustration.png",
  },
  Designer: {
    line: "Show the world your point of view",
    accent: "#fbcd4f",
    bg: "#2a1157",
    ink: "#ffffff",
    mark: "✺",
    illustration: "/images/waitlist/designer-card-illustration.png",
  },
  Buyer: {
    line: "Discover what fashion wears next",
    accent: "#3b1977",
    bg: "#ffd9d0",
    ink: "#2a1157",
    mark: "◒",
    illustration: "/images/waitlist/buyer-card-illustration.png",
  },
  Media: {
    line: "Tell the stories behind the cloth",
    accent: "#52239f",
    bg: "#dcd0ff",
    ink: "#2a1157",
    mark: "◎",
    illustration: "/images/waitlist/media-card-illustration.png",
  },
  Vendor: {
    line: "Meet the people looking for your craft",
    accent: "#3b1977",
    bg: "#f6b928",
    ink: "#2a1157",
    mark: "◇",
    illustration: "/images/waitlist/vendor-card-illustration.png",
  },
  Other: {
    line: "There is a place for your perspective",
    accent: "#ef735d",
    bg: "#fffaf1",
    ink: "#2a1157",
    mark: "+",
    illustration: "/images/waitlist/other-card-illustration.png",
  },
} as const;

type Role = keyof typeof roles;
const roleNames = Object.keys(roles) as Role[];

function isRole(value: string): value is Role {
  return value in roles;
}

function loadIllustration(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = document.createElement("img");
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

export function WaitlistSection() {
  const [role, setRole] = useState<Role>("Designer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const reduced = useReducedMotion();
  const valid = name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(email);

  const selectRole = (item: Role) => {
    setRole(item);
    setJoined(false);
  };
  const downloadCard = async () => {
    if (!valid) return;
    const active = roles[role];
    const canvas = document.createElement("canvas");
    canvas.width = 1400;
    canvas.height = 900;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = active.bg;
    context.fillRect(0, 0, canvas.width, canvas.height);
    try {
      const illustration = await loadIllustration(active.illustration);
      context.globalAlpha = 0.2;
      context.drawImage(illustration, 0, 0, canvas.width, canvas.height);
      context.globalAlpha = 1;
    } catch {
      context.globalAlpha = 1;
    }
    context.fillStyle = active.accent;
    context.beginPath();
    context.arc(1220, 150, 74, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = active.ink;
    context.font = "800 24px Arial";
    context.letterSpacing = "5px";
    context.fillText("ASOEBI FASHION WEEK", 90, 110);
    context.globalAlpha = 0.65;
    context.font = "700 22px Arial";
    context.fillText(
      role === "Other" ? "COMMUNITY ACCESS" : `${role.toUpperCase()} ACCESS`,
      90,
      430,
    );
    context.globalAlpha = 1;
    context.font = "700 72px Arial";
    const words = `${name.trim()}, this is your invitation.`.split(" ");
    let line = "";
    let y = 520;
    words.forEach((word) => {
      const test = `${line}${word} `;
      if (context.measureText(test).width > 1050 && line) {
        context.fillText(line, 90, y);
        line = `${word} `;
        y += 88;
      } else line = test;
    });
    context.fillText(line, 90, y);
    context.globalAlpha = 0.35;
    context.fillRect(90, 780, 1220, 2);
    context.globalAlpha = 1;
    context.font = "700 18px Arial";
    context.fillText("PRIORITY UPDATES", 90, 835);
    context.fillText("AFW · 2026", 1160, 835);
    context.fillStyle = active.ink;
    context.font = "700 54px Arial";
    context.fillText(active.mark, 1202, 168);
    const link = document.createElement("a");
    link.download = `asoebi-${role.toLowerCase()}-${name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <section
      id="waitlist"
      className="bg-asoebi-mist px-5 py-24 lg:px-10 lg:py-36"
    >
      <div className="mx-auto grid max-w-375 overflow-hidden rounded-4xl bg-white shadow-[0_24px_90px_rgba(54,23,103,.12)] lg:grid-cols-[1.05fr_.95fr]">
        <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
            Join the circle
          </p>
          <h2 className="font-display mt-5 max-w-2xl text-5xl leading-[.92] tracking-[-.055em] sm:text-7xl">
            Your place in the story starts here.
          </h2>
          <p className="mt-6 max-w-xl leading-7 text-asoebi-graphite">
            Choose how you want to experience Asoebi Fashion Week. We’ll shape
            your invitation around you.
          </p>
          <form
            className="mt-9 grid gap-3 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (valid) setJoined(true);
            }}
          >
            <div className="sm:col-span-2">
              <label
                className="mb-2 block px-4 text-[10px] font-bold uppercase tracking-[.16em] text-asoebi-muted"
                htmlFor="waitlist-role"
              >
                Personnel type
              </label>
              <CustomSelect
                id="waitlist-role"
                label="Personnel type"
                value={role}
                onChange={(value) => {
                  if (isRole(value)) selectRole(value);
                }}
                options={roleNames.map((item) => ({
                  label: item,
                  value: item,
                }))}
                placeholder="Choose your personnel type"
              />
            </div>
            <label className="sr-only" htmlFor="waitlist-name">
              Name
            </label>
            <input
              id="waitlist-name"
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setJoined(false);
              }}
              placeholder="Your name"
              className="min-h-13 rounded-full border border-asoebi-purple-200 px-5 text-sm outline-hidden focus:border-brand"
            />
            <label className="sr-only" htmlFor="waitlist-email">
              Email
            </label>
            <input
              id="waitlist-email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setJoined(false);
              }}
              type="email"
              placeholder="Email address"
              className="min-h-13 rounded-full border border-asoebi-purple-200 px-5 text-sm outline-hidden focus:border-brand"
            />
            <button className="min-h-13 rounded-full bg-asoebi-gold-400 px-6 text-xs font-black uppercase tracking-[.12em] text-asoebi-purple-950 sm:col-span-2">
              {joined ? "You’re on the list" : "Join waitlist"}
            </button>
            {joined && (
              <button
                type="button"
                onClick={downloadCard}
                className="min-h-13 rounded-full bg-brand px-6 text-xs font-black uppercase tracking-[.12em] text-white sm:col-span-2"
              >
                Download my {role.toLowerCase()} card ↓
              </button>
            )}
          </form>
        </div>
        <div className="relative flex items-center overflow-hidden bg-asoebi-purple-950 p-6 sm:p-10">
          <div className="absolute inset-0 bg-[url('/images/waitlist-collage.png')] bg-cover bg-center opacity-55" />
          <div
            className="relative mx-auto aspect-3/2 w-full max-w-xl"
            aria-label="Select a waitlist card"
          >
            {roleNames.map((item, index) => {
              const card = roles[item];
              const active = item === role;
              const distance =
                (index - roleNames.indexOf(role) + roleNames.length) %
                roleNames.length;
              return (
                <motion.button
                  type="button"
                  key={item}
                  onClick={() => selectRole(item)}
                  aria-pressed={active}
                  initial={false}
                  animate={{
                    x: active ? 0 : Math.min(distance, 4) * 9,
                    y: active ? 0 : Math.min(distance, 4) * 13,
                    rotate: active ? 0 : distance % 2 ? 2.2 : -1.5,
                    scale: active ? 1 : 1 - Math.min(distance, 4) * 0.018,
                  }}
                  transition={{
                    duration: reduced ? 0 : 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    zIndex: active ? 20 : 10 - distance,
                    backgroundColor: card.bg,
                    color: card.ink,
                  }}
                  className="absolute inset-0 flex w-full cursor-pointer flex-col justify-between rounded-3xl p-5 text-left shadow-[0_24px_65px_rgba(14,5,28,.34)] sm:p-9"
                >
                  <Image
                    src={card.illustration}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 38vw, 90vw"
                    className="pointer-events-none object-contain object-bottom opacity-20"
                  />
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-[9px] font-black uppercase tracking-[.16em] sm:text-[11px] sm:tracking-[.2em]">
                      Asoebi Fashion Week
                    </span>
                    <span
                      style={{ backgroundColor: card.accent }}
                      className="grid size-9 place-items-center rounded-full text-base text-white sm:size-12 sm:text-xl"
                    >
                      {card.mark}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <p className="text-[9px] font-bold uppercase tracking-[.14em] opacity-65 sm:text-xs sm:tracking-[.18em]">
                      {item === "Other" ? "Community access" : `${item} access`}
                    </p>
                    <p className="font-display mt-2 text-2xl leading-[.95] tracking-[-.045em] sm:mt-3 sm:text-5xl">
                      {name && active
                        ? `${name}, this is your invitation.`
                        : card.line}
                    </p>
                  </div>
                  <div className="relative z-10 flex justify-between border-t border-current/20 pt-3 text-[7px] font-bold uppercase tracking-[.1em] sm:pt-5 sm:text-[10px] sm:tracking-[.16em]">
                    <span>
                      {active ? "Priority updates" : "Tap to bring forward"}
                    </span>
                    <span>AFW · 2026</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
