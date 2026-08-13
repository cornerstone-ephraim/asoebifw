"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export function HeroMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set("[data-hero-reveal]", { clearProps: "all" });
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .fromTo("[data-hero-atmosphere]", { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.25 })
      .fromTo("[data-hero-line]", { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, duration: 1.05, ease: "power2.inOut" }, 0.15)
      .fromTo("[data-hero-eyebrow]", { clipPath: "inset(0 100% 0 0)", opacity: 0 }, { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.7 }, 0.3)
      .fromTo("[data-hero-title-line]", { yPercent: 110 }, { yPercent: 0, duration: 1.05, stagger: 0.09 }, 0.38)
      .fromTo("[data-hero-support]", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72 }, 0.78);
  }, { scope });

  return <div ref={scope} className="relative z-10">{children}</div>;
}
