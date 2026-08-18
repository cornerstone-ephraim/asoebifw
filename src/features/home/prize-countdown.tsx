"use client";

import { useEffect, useState } from "react";

const target = new Date("2026-12-01T00:00:00+01:00").getTime();

function remaining() {
  const difference = Math.max(0, target - Date.now());
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function PrizeCountdown({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState(remaining);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(remaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div
      aria-label="Countdown to the Asoebi Prize in December 2026"
      className={
        compact
          ? "grid grid-cols-4 overflow-hidden rounded-2xl bg-white/88 shadow-[0_16px_50px_rgba(42,17,87,.14)] backdrop-blur-md"
          : "grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-asoebi-purple-300 lg:grid-cols-4"
      }
    >
      {Object.entries(time).map(([label, value], index) => (
        <div
          key={label}
          className={
            compact
              ? `px-2 py-3 text-center sm:px-4 sm:py-4 ${index > 0 ? "border-l border-asoebi-purple-200/70" : ""}`
              : "bg-white p-6 sm:p-8"
          }
        >
          <strong
            className={
              compact
                ? "font-display block text-2xl leading-none tracking-[-.045em] sm:text-4xl"
                : "font-display block text-5xl tracking-[-.055em] sm:text-7xl"
            }
          >
            {String(value).padStart(2, "0")}
          </strong>
          <span
            className={
              compact
                ? "mt-1.5 block text-[7px] font-bold uppercase tracking-[.12em] text-asoebi-muted sm:text-[9px]"
                : "mt-3 block text-[10px] font-bold uppercase tracking-[.18em] text-asoebi-muted"
            }
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
