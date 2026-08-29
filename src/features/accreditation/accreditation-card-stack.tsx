"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import {
  accreditationCards,
  accreditationRoleNames,
  type AccreditationRole,
} from "@/features/accreditation/card-config";

type AccreditationCardStackProps = {
  name: string;
  role: AccreditationRole;
  selectRole: (role: AccreditationRole) => void;
};

export function AccreditationCardStack({
  name,
  role,
  selectRole,
}: AccreditationCardStackProps) {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex min-h-104 items-center overflow-hidden rounded-4xl bg-asoebi-purple-950 p-6 sm:min-h-120 sm:p-10">
      <div className="absolute inset-0 bg-[url('/images/waitlist-collage.png')] bg-cover bg-center opacity-45" />
      <div
        className="relative mx-auto aspect-3/2 w-full max-w-xl"
        aria-label="Accreditation card preview"
      >
        {accreditationRoleNames.map((item, index) => {
          const card = accreditationCards[item];
          const active = item === role;
          const distance =
            (index -
              accreditationRoleNames.indexOf(role) +
              accreditationRoleNames.length) %
            accreditationRoleNames.length;

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
                backgroundColor: card.background,
                color: card.ink,
              }}
              className="absolute inset-0 flex w-full flex-col justify-between rounded-3xl p-5 text-left shadow-asoebi-deep sm:p-9"
            >
              {active && (
                <Image
                  src={card.illustration}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 42vw, 90vw"
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
                  {card.label} accreditation
                </p>
                <p className="mt-2 font-display text-2xl leading-[.95] tracking-[-.045em] sm:mt-3 sm:text-5xl">
                  {name && active
                    ? `${name}, your application is in review.`
                    : card.line}
                </p>
              </div>
              <div className="relative z-10 flex justify-between border-t border-current/20 pt-3 text-[7px] font-bold tracking-widest uppercase sm:pt-5 sm:text-[10px] sm:tracking-[.16em]">
                <span>
                  {active ? "Pending review" : "Tap to bring forward"}
                </span>
                <span>AEFW · 2027</span>
              </div>
              {active && (
                <button
                  type="button"
                  aria-label={`Show next card. Current card: ${card.label}`}
                  onClick={() =>
                    selectRole(
                      accreditationRoleNames[
                        (accreditationRoleNames.indexOf(role) + 1) %
                          accreditationRoleNames.length
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
  );
}
