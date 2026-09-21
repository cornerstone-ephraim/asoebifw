"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ReferenceSection, Specimen, demoButton } from "./reference-section";
import styles from "./reference.module.css";

const tokens = [
  ["micro", "220ms", "Brief feedback"],
  ["interface", "400ms", "Larger interface changes"],
  ["component", "680ms", "Component entrance"],
  ["editorial / section", "900ms", "Editorial hierarchy"],
  ["hero", "1500ms", "Large first-arrival sequence"],
];
function MotionStage({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const reached = useInView(stage, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -8% 0px",
  });
  return (
    <div ref={stage} data-playing={reached} className={className}>
      {children}
    </div>
  );
}

export function MotionExamples() {
  const [replay, setReplay] = useState(0);
  const [quiet, setQuiet] = useState(false);
  const systemReduced = useReducedMotion();
  const reduced = quiet || Boolean(systemReduced);
  return (
    <ReferenceSection
      id="motion"
      title="Motion you can inspect."
      intro="Movement explains arrival, continuity and feedback. These isolated examples are replayable; the reference text stays still. Durations below are the current CSS tokens, with implementation exceptions called out."
      tone="ivory"
    >
      <div className="mb-7 flex flex-wrap items-center gap-5">
        <button
          type="button"
          className={demoButton}
          onClick={() => setReplay((value) => value + 1)}
        >
          Replay examples
        </button>
        <label className="flex min-h-12 items-center gap-3 text-sm font-bold">
          <input
            type="checkbox"
            checked={quiet}
            onChange={(event) => setQuiet(event.target.checked)}
            className="size-5 accent-brand"
          />
          Preview reduced motion
        </label>
        <p role="status" className="text-sm">
          {systemReduced
            ? "Your device requests reduced motion; travel is disabled."
            : quiet
              ? "Reduced-motion preview: final states appear immediately."
              : "Full-motion preview. Each replay runs once."}
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3" data-quiet={reduced}>
        <Specimen
          title="Arrival · translate + opacity"
          detail="A short rise introduces content as it comes into view. The component token is 680ms. The production EditorialReveal uses 24px of travel and an ease-out curve (0.23, 1, 0.32, 1)."
        >
          <MotionStage className="overflow-hidden rounded-2xl bg-asoebi-mist p-6">
            <div
              key={`arrival-${replay}`}
              className={`${styles.arrival} rounded-2xl bg-brand p-6 text-white`}
            >
              <p className="font-display text-3xl">A new chapter.</p>
            </div>
          </MotionStage>
          <p className="mt-4 text-sm leading-6">
            Use for occasional editorial entrances. Avoid repeating it every
            time a user scrolls back.
          </p>
        </Specimen>
        <Specimen
          title="Hierarchy · small stagger"
          detail="Introduce a headline, then its support. This demonstration uses the 900ms editorial token with 80ms between lines, matching the home hero’s title stagger."
        >
          <MotionStage
            className="overflow-hidden rounded-2xl bg-asoebi-purple-950 p-6 text-white"
            key={`stagger-${replay}`}
          >
            <p className={`${styles.stagger} font-display text-3xl`}>
              Fashion.
            </p>
            <p
              className={`${styles.stagger} font-display text-3xl`}
              style={{ animationDelay: reduced ? "0ms" : "80ms" }}
            >
              Culture.
            </p>
            <p
              className={`${styles.stagger} font-display text-3xl text-asoebi-gold-300`}
              style={{ animationDelay: reduced ? "0ms" : "160ms" }}
            >
              Community.
            </p>
          </MotionStage>
          <p className="mt-4 text-sm leading-6">
            Use for a short sequence, never a long list of form fields or admin
            records.
          </p>
        </Specimen>
        <Specimen
          title="Travel · one object, two positions"
          detail="The travel curve (0.77, 0, 0.175, 1) accelerates then settles. This illustrative pass uses 900ms; it explains the easing without moving content the reader is using."
        >
          <MotionStage className="overflow-hidden rounded-2xl bg-asoebi-mist p-6">
            <div className="h-20">
              <div
                key={`travel-${replay}`}
                className={`${styles.travel} grid size-20 place-items-center rounded-2xl bg-asoebi-gold-300 font-display text-2xl`}
              >
                Aa
              </div>
            </div>
          </MotionStage>
          <p className="mt-4 text-sm leading-6">
            Reduced motion goes straight to the final position. No looping or
            autoplay marquee in this reference.
          </p>
        </Specimen>
      </div>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-asoebi-purple-200">
        <table className="w-full text-left text-sm">
          <caption className="p-4 text-left font-bold">
            Duration tokens · globals.css
          </caption>
          <thead className="bg-asoebi-mist">
            <tr>
              <th className="p-4">Token suffix</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Intended role</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map(([token, time, use]) => (
              <tr key={token} className="border-t border-asoebi-purple-200">
                <th className="p-4 font-semibold">{token}</th>
                <td className="p-4">{time}</td>
                <td className="p-4">{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Specimen
          title="Scroll · wait until content is reached"
          detail="The small panel below uses the same 24px entrance as EditorialReveal, with a 50% visibility threshold and an 8% bottom inset for this compact specimen. The production wrapper uses 24%; do not apply percentage thresholds blindly to a very tall section."
        >
          <div className="rounded-2xl bg-asoebi-mist p-6">
            <motion.div
              initial={
                reduced ? false : { opacity: 0, transform: "translateY(24px)" }
              }
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              viewport={{ once: true, amount: 0.5, margin: "0px 0px -8% 0px" }}
              transition={{
                duration: reduced ? 0 : 0.68,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="rounded-2xl bg-white p-6 font-display text-3xl"
            >
              Discovered as you scroll.
            </motion.div>
          </div>
        </Specimen>
        <Specimen
          title="Continuity and feedback"
          detail="The site header contracts as the opening section passes. ArrowLink shifts its arrow for hover and focus. Form submission changes its label and reports success or an error; motion never replaces that message."
        >
          <p className="leading-7">
            Keep new route navigation at the top. Do not animate an inherited
            scroll position back to zero or let route changes trigger distant
            entrances. For reduced motion, preserve content and feedback while
            removing travel.
          </p>
          <p className="mt-4 text-sm leading-6">
            The arrive token is (0.22, 1, 0.36, 1). Existing GSAP hero timelines
            also use power3.out / power4.out; the token table is not a claim
            that every animation is identical.
          </p>
        </Specimen>
      </div>
    </ReferenceSection>
  );
}
