"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState, useTransition } from "react";

import { submitWaitlist } from "@/features/waitlist/action";
import { idleActionResult } from "@/lib/action-result";

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
  const [result, setResult] = useState(idleActionResult);
  const [pending, startTransition] = useTransition();
  const reduced = useReducedMotion();
  const valid = name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(email);

  const selectRole = (item: Role) => {
    setRole(item);
    setResult(idleActionResult);
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
      <div className="mx-auto grid max-w-375 overflow-hidden rounded-4xl bg-white shadow-asoebi-panel lg:grid-cols-[1.05fr_.95fr]">
        <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            Join the circle
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[.92] tracking-[-.055em] sm:text-7xl">
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
              if (!valid) return;
              startTransition(async () => {
                setResult(
                  await submitWaitlist({
                    name,
                    email,
                    role: (role === "Other"
                      ? "community"
                      : role.toLowerCase()) as
                      | "partner"
                      | "designer"
                      | "buyer"
                      | "media"
                      | "vendor"
                      | "community",
                    website: "",
                  }),
                );
              });
            }}
          >
            <fieldset className="sm:col-span-2">
              <legend className="mb-3 px-1 text-[10px] font-bold tracking-[.16em] text-asoebi-muted uppercase">
                I am joining as
              </legend>
              <div className="flex flex-wrap gap-2">
                {roleNames.map((item) => {
                  const active = item === role;
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={active}
                      onClick={() => selectRole(item)}
                      className={`transition-linear min-h-11 rounded-full border px-4 py-2 text-xs font-bold transition-colors ${active ? "border-brand bg-brand text-white" : "border-asoebi-purple-200 bg-white text-asoebi-purple-950 hover:border-brand hover:text-brand"}`}
                    >
                      {item === "Other" ? "Community" : item}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <label className="sr-only" htmlFor="waitlist-name">
              Name
            </label>
            <input
              id="waitlist-name"
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setResult(idleActionResult);
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
                setResult(idleActionResult);
              }}
              type="email"
              placeholder="Email address"
              className="min-h-13 rounded-full border border-asoebi-purple-200 px-5 text-sm outline-hidden focus:border-brand"
            />
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden="true"
            />
            <button
              disabled={pending}
              className="min-h-13 rounded-full bg-asoebi-gold-400 px-6 text-xs font-black tracking-[.12em] text-asoebi-purple-950 uppercase disabled:cursor-wait disabled:opacity-60 sm:col-span-2"
            >
              {pending
                ? "Joining…"
                : result.status === "success"
                  ? "You’re on the list"
                  : "Join waitlist"}
            </button>
            {result.status !== "idle" && (
              <p
                role={result.status === "error" ? "alert" : "status"}
                className={`sm:col-span-2 ${result.status === "error" ? "text-red-700" : "text-asoebi-graphite"}`}
              >
                {result.message}
              </p>
            )}
            {result.status === "success" && (
              <button
                type="button"
                onClick={downloadCard}
                className="group min-h-13 rounded-full bg-brand px-6 text-xs font-black tracking-[.12em] text-white uppercase sm:col-span-2"
              >
                Download my {role.toLowerCase()} card{" "}
                <span
                  aria-hidden="true"
                  className="transition-linear inline-block transition-transform group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5"
                >
                  ↓
                </span>
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
                <motion.div
                  key={item}
                  initial={false}
                  animate={{
                    transform: active
                      ? "translate3d(0, 0, 0) rotate(0deg) scale(1)"
                      : `translate3d(${Math.min(distance, 4) * 9}px, ${Math.min(distance, 4) * 13}px, 0) rotate(${distance % 2 ? 2.2 : -1.5}deg) scale(${1 - Math.min(distance, 4) * 0.018})`,
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
                  className="absolute inset-0 flex w-full flex-col justify-between rounded-3xl p-5 text-left shadow-asoebi-deep sm:p-9"
                >
                  {active && (
                    <Image
                      src={card.illustration}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 38vw, 90vw"
                      className="pointer-events-none object-contain object-bottom opacity-20"
                    />
                  )}
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-[9px] font-black tracking-[.16em] uppercase sm:text-[11px] sm:tracking-[.2em]">
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
                    <p className="text-[9px] font-bold tracking-[.14em] uppercase opacity-65 sm:text-xs sm:tracking-[.18em]">
                      {item === "Other" ? "Community access" : `${item} access`}
                    </p>
                    <p className="mt-2 font-display text-2xl leading-[.95] tracking-[-.045em] sm:mt-3 sm:text-5xl">
                      {name && active
                        ? `${name}, this is your invitation.`
                        : card.line}
                    </p>
                  </div>
                  <div className="relative z-10 flex justify-between border-t border-current/20 pt-3 text-[7px] font-bold tracking-widest uppercase sm:pt-5 sm:text-[10px] sm:tracking-[.16em]">
                    <span>
                      {active ? "Priority updates" : "Tap to bring forward"}
                    </span>
                    <span>AFW · 2026</span>
                  </div>
                  {active && (
                    <button
                      type="button"
                      aria-label={`Show next card. Current card: ${item}`}
                      onClick={() =>
                        selectRole(
                          roleNames[
                            (roleNames.indexOf(role) + 1) % roleNames.length
                          ],
                        )
                      }
                      className="absolute inset-0 z-20 cursor-pointer rounded-3xl bg-transparent"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
