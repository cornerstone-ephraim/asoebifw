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
    <header className="flex flex-wrap items-end justify-between gap-6 border-b border-asoebi-purple-200 pb-8">
      <div>
        <p className="text-xs font-black tracking-[.16em] text-asoebi-purple-700 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[.92] tracking-[-.05em] text-asoebi-purple-950 sm:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-asoebi-graphite sm:text-base sm:leading-7">
          {description}
        </p>
      </div>
      {action}
    </header>
  );
}
