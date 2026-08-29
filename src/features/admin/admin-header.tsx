"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

const adminLinks = [
  ["Overview", "/admin"],
  ["Prize applications", "/admin/prize"],
  ["Waitlist", "/admin/waitlist"],
] as const;

export function AdminHeader({ email }: { email?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-asoebi-purple-950 text-white shadow-lg">
      <div className="mx-auto flex min-h-18 max-w-400 items-center justify-between gap-5 px-5 lg:px-10">
        <Link
          href={email ? "/admin" : "/"}
          className="transition-linear shrink-0 font-display text-xl font-bold tracking-[-.04em] transition-opacity hover:opacity-75"
        >
          AEFW<span className="text-asoebi-gold-300">.</span>{" "}
          <span className="font-sans text-xs tracking-[.12em] text-white/55 uppercase">
            Admin
          </span>
        </Link>

        {email ? (
          <div className="flex min-w-0 items-center gap-3">
            <nav aria-label="Admin" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {adminLinks.map(([label, href]) => {
                  const active =
                    href === "/admin"
                      ? pathname === href
                      : pathname.startsWith(href);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={`transition-linear block rounded-full px-4 py-2 text-sm font-bold transition-colors ${active ? "bg-asoebi-gold-300 text-asoebi-purple-950" : "text-white/65 hover:bg-white/10 hover:text-white"}`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <button
              type="button"
              onClick={async () => {
                await authClient.signOut();
                router.replace("/admin/sign-in");
                router.refresh();
              }}
              className="transition-linear min-h-11 shrink-0 rounded-full border border-white/25 px-4 text-xs font-bold transition-colors hover:border-white hover:bg-white hover:text-asoebi-purple-950"
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link
            href="/"
            className="transition-linear rounded-full border border-white/25 px-4 py-2.5 text-xs font-bold transition-colors hover:bg-white hover:text-asoebi-purple-950"
          >
            Return to website
          </Link>
        )}
      </div>

      {email && (
        <nav
          aria-label="Admin mobile"
          className="overflow-x-auto border-t border-white/10 px-5 lg:hidden"
        >
          <ul className="mx-auto flex max-w-400 gap-1 py-2">
            {adminLinks.map(([label, href]) => {
              const active =
                href === "/admin"
                  ? pathname === href
                  : pathname.startsWith(href);
              return (
                <li key={href} className="shrink-0">
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-full px-4 py-2 text-sm font-bold ${active ? "bg-asoebi-gold-300 text-asoebi-purple-950" : "text-white/65"}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
