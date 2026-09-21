import type { ReactNode } from "react";

export function ReferenceSection({
  id,
  title,
  intro,
  children,
  tone = "paper",
}: {
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
  tone?: "paper" | "mist" | "ivory";
}) {
  const tones = {
    paper: "bg-asoebi-paper",
    mist: "bg-asoebi-mist",
    ivory: "bg-asoebi-ivory",
  };
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-24 px-5 py-16 lg:px-10 lg:py-24 ${tones[tone]}`}
    >
      <div className="mx-auto max-w-375">
        <header className="mb-10 grid gap-5 border-t border-asoebi-purple-200 pt-6 lg:grid-cols-2 lg:items-end">
          <h2
            id={`${id}-title`}
            className="font-display text-4xl leading-none tracking-tight sm:text-5xl lg:text-6xl"
          >
            {title}
          </h2>
          <p className="max-w-xl leading-7 text-asoebi-graphite">{intro}</p>
        </header>
        {children}
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
    <article className="min-w-0 rounded-3xl border border-asoebi-purple-200 bg-white p-5 sm:p-7">
      <h3 className="font-display text-2xl tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-asoebi-graphite">{detail}</p>
      <div className="mt-7">{children}</div>
    </article>
  );
}
export const demoButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-asoebi-purple-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50";
export const demoInput =
  "min-h-13 w-full rounded-2xl border border-asoebi-purple-300 bg-white px-4 py-3 text-base aria-invalid:border-red-700 disabled:cursor-not-allowed disabled:bg-asoebi-mist";
