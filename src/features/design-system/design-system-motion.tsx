"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function DesignSystemMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLElement>(null);
  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = "[data-ds-hero-line], [data-ds-reveal], [data-ds-swatches] > *, [data-ds-specimen]";
    if (reduced) { gsap.set(targets, { clearProps: "all" }); return; }
    const mm = gsap.matchMedia();
    gsap.fromTo("[data-ds-meta]", { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: .9, ease: "power3.out" });
    gsap.fromTo("[data-ds-hero-line]", { yPercent: 112, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1.05, stagger: .1, ease: "power4.out", delay: .12 });
    gsap.fromTo("[data-ds-hero-copy]", { x: 28, opacity: 0 }, { x: 0, opacity: 1, duration: .75, ease: "power3.out", delay: .48 });
    mm.add("(min-width: 768px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-ds-reveal]").forEach((element, index) => gsap.fromTo(element, { x: index % 2 ? 38 : -38, opacity: 0 }, { x: 0, opacity: 1, duration: .8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 84%", once: true } }));
      gsap.utils.toArray<HTMLElement>("[data-ds-swatches]").forEach((grid) => gsap.fromTo(Array.from(grid.children), { y: 56, rotate: -2, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, duration: .72, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: grid, start: "top 82%", once: true } }));
      gsap.utils.toArray<HTMLElement>("[data-ds-specimen]").forEach((element) => gsap.fromTo(element, { clipPath: "inset(0 0 100% 0)", scale: 1.025 }, { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1, ease: "power4.out", scrollTrigger: { trigger: element, start: "top 83%", once: true } }));
      gsap.to("[data-ds-image]", { yPercent: -7, ease: "none", scrollTrigger: { trigger: "[data-ds-image-wrap]", start: "top bottom", end: "bottom top", scrub: .8 } });
      gsap.to("[data-ds-card-stack] > *", { y: (index) => index * -3, rotate: (index) => (index - 1) * 1.3, ease: "none", scrollTrigger: { trigger: "[data-ds-card-stack]", start: "top bottom", end: "center center", scrub: .7 } });
    });
    mm.add("(max-width: 767px)", () => gsap.utils.toArray<HTMLElement>("[data-ds-reveal], [data-ds-specimen]").forEach((element) => gsap.fromTo(element, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 90%", once: true } })));
    return () => mm.revert();
  }, { scope });
  return <main ref={scope} className="bg-[#fff8ee] pt-28 text-asoebi-purple-950">{children}</main>;
}
