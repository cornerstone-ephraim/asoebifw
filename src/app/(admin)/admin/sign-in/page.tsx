import type { Metadata } from "next";

import { AdminSignInForm } from "@/features/admin/admin-sign-in-form";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function AdminSignInPage() {
  return (
    <main id="main-content" className="bg-asoebi-mist px-5 pt-36 pb-20">
      <section className="mx-auto min-h-[65svh] max-w-xl rounded-4xl bg-asoebi-paper p-7 shadow-xl sm:p-12">
        <p className="text-xs font-black tracking-[.16em] text-asoebi-purple-700 uppercase">
          Private administration
        </p>
        <h1 className="mt-4 font-display text-5xl leading-none tracking-[-.05em] text-asoebi-purple-950 sm:text-6xl">
          Welcome back.
        </h1>
        <p className="mt-5 max-w-md leading-7 text-asoebi-graphite">
          Enter an approved administrator email and we will send a one-time
          sign-in code.
        </p>
        <AdminSignInForm />
      </section>
    </main>
  );
}
