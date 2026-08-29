import type { ReactNode } from "react";

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-8 border-b border-asoebi-purple-200 pb-10">
      <div>
        <p className="text-xs font-black tracking-[.16em] text-asoebi-purple-700 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[.9] tracking-[-.055em] text-asoebi-purple-950 sm:text-7xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-asoebi-graphite">
          {description}
        </p>
      </div>
      {action}
    </header>
  );
}
