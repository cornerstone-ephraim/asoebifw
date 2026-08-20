"use client";

import { motion, useReducedMotion } from "motion/react";
import { Children, type ReactNode } from "react";

export function EditorialReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={className}>
      {Children.map(children, (child) => (
        <motion.div
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, transform: "translateY(1.5rem)" }
          }
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true, amount: 0.24, margin: "0px 0px -8% 0px" }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.68,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
