import type { ReactNode } from "react";
import styles from "./documentation.module.css";
import { designSystemGroups } from "./design-system-sections";

export function ReferenceSection({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
  tone?: "paper" | "mist" | "ivory";
}) {
  const group = designSystemGroups.find((group) =>
    group.sections.some((section) => section.slug === id),
  );
  const label =
    group?.sections.find((section) => section.slug === id)?.label ?? title;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 px-5 py-10 sm:px-8 lg:px-12 lg:py-14"
    >
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="mb-4 text-xs font-semibold tracking-widest text-brand uppercase">
            {group?.title ?? "Reference"}
          </p>
          <h1
            id={`${id}-title`}
            className="font-display text-4xl leading-tight tracking-tight sm:text-5xl"
          >
            {label}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-asoebi-graphite">
            {intro}
          </p>
        </header>
        <div className={styles.examples}>{children}</div>
      </div>
    </section>
  );
}
export function Specimen({
  title,
  detail,
  children,
}: {
  title: string;
  detail: string;
  children: ReactNode;
}) {
  return (
    <article className="min-w-0 rounded-xl border border-asoebi-purple-100 bg-white p-5 sm:p-6">
      <h2 className="font-display text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-asoebi-graphite">{detail}</p>
      <div className="mt-6 border-t border-asoebi-purple-100 pt-6">
        {children}
      </div>
    </article>
  );
}
export const demoButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-asoebi-purple-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50";
export const demoInput =
  "min-h-13 w-full rounded-2xl border border-asoebi-purple-300 bg-white px-4 py-3 text-base aria-invalid:border-red-700 disabled:cursor-not-allowed disabled:bg-asoebi-mist";
