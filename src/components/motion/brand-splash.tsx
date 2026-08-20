"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useState } from "react";

const SPLASH_SESSION_KEY = "aefw-brand-splash-seen";
const HOLD_DURATION = 1250;
const HANDOFF_DURATION = 1150;

type LogoTarget = {
  left: number;
  top: number;
  scale: number;
};

export function BrandSplash() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [handoff, setHandoff] = useState(false);
  const [target, setTarget] = useState<LogoTarget | null>(null);

  useLayoutEffect(() => {
    const siteLogo = document.querySelector<HTMLElement>("[data-site-logo]");
    if (!siteLogo) return;

    const updateTarget = () => {
      const bounds = siteLogo.getBoundingClientRect();
      const splashWidth = Math.min(window.innerWidth * 0.4, 520);

      setTarget({
        left: bounds.left,
        top: bounds.top,
        scale: bounds.width / splashWidth,
      });
    };

    updateTarget();
    window.addEventListener("resize", updateTarget);
    return () => window.removeEventListener("resize", updateTarget);
  }, []);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SPLASH_SESSION_KEY) === "true";

    if (alreadySeen || reducedMotion) {
      const quickExit = window.setTimeout(() => setVisible(false), 80);
      return () => window.clearTimeout(quickExit);
    }

    document.body.style.overflow = "hidden";
    const beginHandoff = window.setTimeout(
      () => setHandoff(true),
      HOLD_DURATION,
    );
    const finishSplash = window.setTimeout(() => {
      sessionStorage.setItem(SPLASH_SESSION_KEY, "true");
      document.body.style.overflow = "";
      setVisible(false);
    }, HOLD_DURATION + HANDOFF_DURATION);

    return () => {
      window.clearTimeout(beginHandoff);
      window.clearTimeout(finishSplash);
      document.body.style.overflow = "";
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: handoff ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.55,
            delay: handoff ? 0.6 : 0,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="fixed inset-0 z-90 bg-asoebi-purple-950"
        >
          <motion.span
            initial={false}
            animate={
              handoff && target
                ? {
                    left: target.left,
                    top: target.top,
                    x: 0,
                    y: 0,
                    scale: target.scale,
                  }
                : {
                    left: "50%",
                    top: "50%",
                    x: "-50%",
                    y: "-50%",
                    scale: 1,
                  }
            }
            transition={{
              duration: reducedMotion ? 0 : 1.15,
              ease: [0.77, 0, 0.175, 1],
            }}
            className="fixed block w-[40vw] max-w-130 origin-top-left font-display text-[clamp(5rem,14vw,13rem)] leading-none font-bold tracking-[-.065em] whitespace-nowrap text-white"
          >
            AEFW<span className="text-asoebi-gold-300">.</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
