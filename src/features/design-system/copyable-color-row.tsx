"use client";

import { useEffect, useRef, useState } from "react";

import { copyText } from "@/lib/client/clipboard";

export function CopyableColorRow({
  name,
  value,
  oklch,
  rgba,
  use,
}: {
  name: string;
  value: string;
  oklch: string;
  rgba: string;
  use: string;
}) {
  const [message, setMessage] = useState("");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    window.clearTimeout(timer.current);
    try {
      await copyText(value);
      setMessage(`Copied ${value}`);
    } catch {
      setMessage("Copy failed");
    }
    timer.current = window.setTimeout(() => setMessage(""), 1800);
  };

  return (
    <article className="relative grid gap-5 border-b border-asoebi-purple-200 py-6 last:border-b-0 md:grid-cols-[.65fr_1fr_1.1fr] md:items-center">
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${name} HEX code ${value}`}
        className="absolute inset-0 z-10 rounded-xl text-left outline-offset-4"
      />
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          style={{ backgroundColor: value }}
          className="size-10 shrink-0 rounded-full border border-asoebi-purple-950/10 shadow-asoebi-soft"
        />
        <div>
          <h3 className="font-display text-2xl">{name}</h3>
          <p className="mt-1 font-mono text-[10px] font-bold tracking-[.08em] uppercase">
            {value}
          </p>
        </div>
      </div>
      <div className="space-y-1 font-mono text-[10px] font-bold tracking-[.05em] text-asoebi-muted uppercase">
        <p>{oklch}</p>
        <p>{rgba}</p>
      </div>
      <p className="max-w-md text-sm leading-6 text-asoebi-graphite">{use}</p>
      <span
        aria-live="polite"
        className={`pointer-events-none absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-asoebi-purple-950 px-3 py-2 text-[9px] font-bold tracking-[.1em] text-white uppercase transition-opacity ${message ? "opacity-100" : "opacity-0"}`}
      >
        {message || `Copy ${value}`}
      </span>
    </article>
  );
}
