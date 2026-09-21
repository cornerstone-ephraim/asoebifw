"use client";

import { useLayoutEffect, type ReactNode } from "react";

export default function DesignSystemTemplate({
  children,
}: {
  children: ReactNode;
}) {
  useLayoutEffect(() => {
    // Reset before paint and before viewport observers see the new chapter.
    // Preserve native anchor navigation for direct links to a specimen.
    if (!window.location.hash)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return children;
}
