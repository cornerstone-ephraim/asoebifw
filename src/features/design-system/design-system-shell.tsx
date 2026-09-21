import type { ReactNode } from "react";

export function DesignSystemShell({ children }: { children: ReactNode }) {
  return (
    <main
      id="main-content"
      className="min-w-0 bg-asoebi-paper text-asoebi-purple-950"
    >
      {children}
    </main>
  );
}
