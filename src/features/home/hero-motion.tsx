"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function HeroMotion({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      gsap.set(
        "[data-hero-atmosphere], [data-hero-eyebrow], [data-hero-title-line], [data-hero-support]",
        { clearProps: "all" },
      );
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .fromTo(
        "[data-hero-atmosphere]",
        { transform: "scale(0.96)", opacity: 0 },
        { transform: "scale(1)", opacity: 1, duration: 1.25 },
      )
      .fromTo(
        "[data-hero-eyebrow]",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.7 },
        0.3,
      )
      .fromTo(
        "[data-hero-title-line]",
        { transform: "translateY(2rem)", opacity: 0 },
        {
          transform: "translateY(0)",
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
        },
        0.38,
      )
      .fromTo(
        "[data-hero-support]",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.72 },
        0.78,
      );
  });

  return <div className="relative z-10">{children}</div>;
}
