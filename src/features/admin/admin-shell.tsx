import type { ReactNode } from "react";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-asoebi-mist px-5 py-12 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-400">{children}</div>
    </main>
  );
}
