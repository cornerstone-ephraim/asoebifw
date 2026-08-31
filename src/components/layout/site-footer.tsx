import Link from "next/link";
import {
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

const exploreLinks = [
  ["Home", "/"],
  ["Founders", "/founders"],
  ["Asoebi Prize", "/prize"],
  ["Asoebi Vendor", "/vendor"],
  ["Asoebi After Party", "/after-party"],
] as const;

const actionLinks = [
  ["Join the Waitlist", "/#waitlist"],
  ["Apply for the Prize", "/prize#apply"],
  ["Apply to Participate", "/accreditation"],
] as const;

const socials = [
  ["Instagram", "https://www.instagram.com/theasoebifw", FaInstagram],
  ["TikTok", "https://www.tiktok.com/@asoebifw", FaTiktok],
  ["X", "https://x.com/asoebifw", FaXTwitter],
  ["LinkedIn", "https://www.linkedin.com/company/asoebifw", FaLinkedinIn],
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-asoebi-purple-950 px-5 pt-20 pb-8 text-white lg:px-10 lg:pt-28">
      <div className="mx-auto max-w-400">
        <div className="grid gap-16 border-b border-white/20 pb-16 lg:grid-cols-[1.25fr_.75fr] lg:pb-24">
          <div>
            <Link
              href="/"
              className="transition-linear inline-block font-display text-2xl leading-none font-bold tracking-[-.085em] whitespace-nowrap transition-opacity hover:opacity-65"
              aria-label="Asoebi Fashion Week home"
            >
              AEFW<span className="text-asoebi-gold-300">.</span>
            </Link>
            <p className="mt-12 max-w-5xl font-display text-6xl leading-[.88] tracking-[-.06em] sm:text-8xl lg:text-9xl">
              Come as you are.
              <br />
              <span className="text-asoebi-gold-300">Leave inspired.</span>
            </p>
            <p className="mt-8 max-w-lg text-sm leading-6 text-white/65">
              Boldly African, fashion forward and globally relevant. AEFW
              connects the people moving African fashion forward.
            </p>
          </div>

          <div className="grid content-end gap-12 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <nav aria-label="Explore Asoebi Fashion Week">
              <p className="text-[10px] font-bold tracking-[.18em] text-asoebi-gold-300 uppercase">
                Explore
              </p>
              <ul className="mt-5 space-y-3">
                {exploreLinks.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="transition-linear text-sm font-bold text-white/70 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Participate in Asoebi Fashion Week">
              <p className="text-[10px] font-bold tracking-[.18em] text-asoebi-gold-300 uppercase">
                Participate
              </p>
              <ul className="mt-5 space-y-3">
                {actionLinks.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="transition-linear text-sm font-bold text-white/70 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="grid gap-8 border-b border-white/20 py-8 sm:grid-cols-[auto_1fr] sm:items-center">
          <p className="text-[10px] font-bold tracking-[.18em] text-white/45 uppercase">
            Follow the story
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end">
            {socials.map(([label, href, Icon]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group transition-linear grid size-11 place-items-center rounded-full border border-white/25 text-white/70 hover:border-asoebi-gold-300 hover:bg-asoebi-gold-300 hover:text-asoebi-purple-950"
              >
                <Icon
                  aria-hidden="true"
                  className="transition-linear size-4 transition-transform group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[10px] font-bold tracking-[.16em] text-white/40 uppercase sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Asoebi Fashion Week</span>
          <span>Buy together · Pay together · Celebrate together</span>
        </div>
      </div>
    </footer>
  );
}
