import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-asoebi-ink px-6 pt-18 text-white">
      <div className="mx-auto w-full max-w-[1600px]">
        <p className="text-xs tracking-[.2em] text-asoebi-purple-300 uppercase">
          404 · Off the runway
        </p>
        <h1 className="mt-6 font-display text-7xl tracking-[-.06em] sm:text-9xl">
          This look
          <br />
          isn’t here.
        </h1>
        <Link
          href="/"
          className="mt-10 inline-block border-b border-white py-2 text-xs tracking-[.15em] uppercase"
        >
          Return home ↗
        </Link>
      </div>
    </main>
  );
}
