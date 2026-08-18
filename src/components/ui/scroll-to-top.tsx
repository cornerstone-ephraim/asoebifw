"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 700);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
          }
          initial={reduced ? false : { opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.9 }}
          className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-asoebi-purple-950 text-lg text-white shadow-[0_12px_35px_rgba(24,7,47,.3)] transition-colors transition-linear hover:bg-brand sm:bottom-7 sm:right-7"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
