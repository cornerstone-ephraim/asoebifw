"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HomeMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const animated =
        "[data-motion-reveal], [data-motion-media], [data-motion-row], [data-motion-list] > *";
      if (reduced) {
        gsap.set(animated, { clearProps: "all" });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.utils
          .toArray<HTMLElement>("[data-motion-reveal]")
          .forEach((element) => {
            gsap.fromTo(
              element,
              { y: 28, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.72,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 78%",
                  once: true,
                },
              },
            );
          });

        gsap.utils
          .toArray<HTMLElement>("[data-motion-media]")
          .forEach((element, index) => {
            const fromLeft = index % 2 === 0;
            const media =
              element.querySelector<HTMLElement>("[role='img']") ?? element;
            gsap.fromTo(
              media,
              {
                clipPath: fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
                scale: 1.045,
              },
              {
                clipPath: "inset(0 0% 0 0%)",
                scale: 1,
                duration: 1.05,
                ease: "power3.out",
                scrollTrigger: { trigger: media, start: "top 76%", once: true },
              },
            );
          });

        gsap.utils
          .toArray<HTMLElement>("[data-motion-row]")
          .forEach((element) => {
            gsap.fromTo(
              element,
              { x: -18, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.78,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  once: true,
                },
              },
            );
          });

        gsap.utils
          .toArray<HTMLElement>("[data-motion-list]")
          .forEach((list) => {
            gsap.fromTo(
              Array.from(list.children),
              { x: 34, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.62,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: list, start: "top 74%", once: true },
              },
            );
          });

        if (scope.current?.querySelector("[data-motion-ribbon]")) {
          gsap.to("[data-motion-ribbon]", {
            xPercent: -50,
            duration: 24,
            repeat: -1,
            ease: "none",
          });
        }
      });

      mm.add("(max-width: 767px)", () => {
        gsap.utils
          .toArray<HTMLElement>(
            "[data-motion-reveal], [data-motion-media], [data-motion-row]",
          )
          .forEach((element) => {
            gsap.fromTo(
              element,
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.62,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 82%",
                  once: true,
                },
              },
            );
          });
        if (scope.current?.querySelector("[data-motion-ribbon]")) {
          gsap.to("[data-motion-ribbon]", {
            xPercent: -50,
            duration: 18,
            repeat: -1,
            ease: "none",
          });
        }
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <main id="main-content" ref={scope}>
      {children}
    </main>
  );
}
