"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const stories = [
  {
    src: "/images/editorial/fashion-story/the-collective-portrait.webp",
    alt: "Five models presenting varied contemporary Asoebi silhouettes",
    position: "object-center",
  },
  {
    src: "/images/editorial/fashion-story/cloth-in-motion.webp",
    alt: "Three models wearing coordinated purple and gold Asoebi looks in motion",
    position: "object-center",
  },
  {
    src: "/images/editorial/fashion-story/the-textile-detail.webp",
    alt: "A fashion artisan refining the detailed bodice of a purple Asoebi gown",
    position: "object-center",
  },
  {
    src: "/images/editorial/fashion-story/the-modern-runway.webp",
    alt: "Four models presenting contemporary Asoebi designs on an outdoor runway",
    position: "object-center",
  },
  {
    src: "/images/editorial/fashion-story/the-celebration-portrait.webp",
    alt: "Asoebi Fashion Week guests gathering in coordinated evening looks",
    position: "object-center",
  },  
] as const;

export function FashionStoryCrossfade() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let timer: number | undefined;
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        setActive((current) => (current + 1) % stories.length);
      }, 6000);
    };
    const handleVisibility = () => {
      if (document.hidden) window.clearInterval(timer);
      else start();
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reducedMotion]);

  const story = stories[active];

  return (
    <div className="relative mt-12 aspect-[2.35/1] min-h-80 w-full overflow-hidden bg-asoebi-purple-950">
      <AnimatePresence initial={false}>
        <motion.div
          key={story.src}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={story.src}
            alt={story.alt}
            fill
            sizes="(min-width: 1600px) 1600px, 100vw"
            className={`object-cover ${story.position}`}
          />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-asoebi-purple-950/25 via-transparent to-transparent" />
    </div>
  );
}
