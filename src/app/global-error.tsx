"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
          <h1>Something went wrong.</h1>
          <p>Please refresh the page to try again.</p>
        </main>
      </body>
    </html>
  );
}
