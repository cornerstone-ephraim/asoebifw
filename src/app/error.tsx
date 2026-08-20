"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="grid min-h-[70svh] place-items-center px-5 py-24">
      <div className="max-w-xl text-center">
        <h1 className="font-display text-5xl tracking-tight">
          This page missed a step.
        </h1>
        <p className="mt-5 text-asoebi-graphite">
          We have recorded the problem. Try the page again, or return shortly.
        </p>
        <button
          type="button"
          onClick={reset}
          className="transition-linear mt-7 min-h-12 rounded-full bg-brand px-6 font-bold text-white transition-colors hover:bg-asoebi-purple-700"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
