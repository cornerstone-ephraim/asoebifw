import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";

interface NavLinkItem {
  readonly label: string;
  readonly href: string;
}

interface MobileNavProps {
  readonly links: readonly (readonly [string, string])[];
  readonly participationLinks: readonly (readonly [string, string])[];
  readonly pathname: string;
  readonly reduced: boolean | null;
  readonly closeAction: () => void;
}

const itemVariants = {
  closed: { y: -8, opacity: 0 },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export const MobileNav = ({
  links,
  participationLinks,
  pathname,
  reduced,
  closeAction,
}: MobileNavProps) => {
  return (
    <motion.nav
      id="mobile-navigation"
      aria-label="Mobile"
      initial={reduced ? false : "closed"}
      animate="open"
      exit="closed"
      variants={{
        closed: { opacity: 0, y: -12, scale: 0.98 },
        open: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: reduced ? 0 : 0.45,
            ease: [0.22, 1, 0.36, 1],
            when: "beforeChildren",
            staggerChildren: reduced ? 0 : 0.045,
          },
        },
      }}
      className="pointer-events-auto mx-auto mt-2 max-w-295 overflow-hidden rounded-4xl border border-white/70 bg-asoebi-mist/96 p-5 shadow-asoebi-float backdrop-blur-xl lg:hidden"
    >
      <div className="grid sm:grid-cols-2 sm:gap-x-6">
        {links.map(([label, href]) => (
          <motion.div
            key={href}
            variants={{
              closed: { y: -8, opacity: 0 },
              open: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <Link
              href={href}
              onClick={closeAction}
              aria-current={pathname === href ? "page" : undefined}
              className={`block border-b py-3 font-display text-3xl tracking-[-.04em] ${pathname === href ? "border-brand text-brand" : "border-asoebi-purple-300/70"}`}
            >
              {label}
            </Link>
          </motion.div>
        ))}
      </div>
      <motion.div
        variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
        className="mt-4 border-asoebi-purple-300/70 pt-4"
      >
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {participationLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={closeAction}
              className="transition-linear py-2 text-sm font-bold text-asoebi-purple-950 transition-colors hover:text-brand"
            >
              {label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};
