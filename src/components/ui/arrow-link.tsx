import Link from "next/link";

export function ArrowLink({
  href,
  children,
  inverse = false,
}: {
  href: string;
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group transition-linear inline-flex min-h-11 items-center gap-3 border-b py-2 text-xs font-semibold tracking-[0.16em] uppercase transition-colors ${inverse ? "border-asoebi-paper/40 hover:border-asoebi-paper" : "border-asoebi-ink/30 hover:border-brand hover:text-brand"}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-linear transition-transform duration-300 group-hover:translate-x-1"
      >
        ↗
      </span>
    </Link>
  );
}
