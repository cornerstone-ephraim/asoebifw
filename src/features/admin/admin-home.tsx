import Link from "next/link";

import { AdminPageHeader } from "@/features/admin/admin-page-header";
import {
  formatAdminDate,
  getApplicantName,
} from "@/features/admin/admin-utils";

export function AdminHome({
  admin,
  overview,
}: {
  admin: { email: string; name: string };
  overview: {
    prizeApplications: number;
    waitlistEntries: number;
    recentPrizeApplications: Array<{
      id: string;
      firstName?: string;
      lastName?: string;
      name?: string;
      email: string;
      submissionMode?: string;
      submittedAt: number;
    }>;
  };
}) {
  return (
    <>
      <AdminPageHeader
        eyebrow="Administration"
        title="Applications, clearly."
        description={`Signed in as ${admin.email}. Review Prize submissions and keep sight of the growing AEFW waitlist.`}
      />

      <section aria-labelledby="admin-summary" className="mt-10">
        <h2 id="admin-summary" className="sr-only">
          Application summary
        </h2>
        <div className="grid overflow-hidden rounded-4xl bg-asoebi-purple-950 text-white shadow-xl md:grid-cols-2">
          <Link
            href="/admin/prize"
            className="group transition-linear p-7 transition-colors hover:bg-white/8 sm:p-10 md:border-r md:border-white/15"
          >
            <span className="text-xs font-bold tracking-[.14em] text-asoebi-gold-300 uppercase">
              Prize applications
            </span>
            <strong className="mt-8 block font-display text-7xl leading-none tracking-[-.06em]">
              {overview.prizeApplications}
            </strong>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white/70 group-hover:text-white">
              Review submissions <span aria-hidden="true">→</span>
            </span>
          </Link>
          <Link
            href="/admin/waitlist"
            className="group transition-linear border-t border-white/15 p-7 transition-colors hover:bg-white/8 sm:p-10 md:border-t-0"
          >
            <span className="text-xs font-bold tracking-[.14em] text-asoebi-gold-300 uppercase">
              Waitlist entries
            </span>
            <strong className="mt-8 block font-display text-7xl leading-none tracking-[-.06em]">
              {overview.waitlistEntries}
            </strong>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white/70 group-hover:text-white">
              View the waitlist <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="recent-prize" className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-[.14em] text-asoebi-purple-700 uppercase">
              Latest arrivals
            </p>
            <h2
              id="recent-prize"
              className="mt-2 font-display text-4xl tracking-[-.04em] text-asoebi-purple-950"
            >
              Recent Prize applications
            </h2>
          </div>
          <Link
            href="/admin/prize"
            className="transition-linear min-h-11 rounded-full border border-asoebi-purple-950 px-5 py-3 text-sm font-bold transition-colors hover:bg-asoebi-purple-950 hover:text-white"
          >
            View all
          </Link>
        </div>

        {overview.recentPrizeApplications.length ? (
          <ul className="mt-6 divide-y divide-asoebi-purple-200 border-y border-asoebi-purple-200">
            {overview.recentPrizeApplications.map((application) => (
              <li
                key={application.id}
                className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div>
                  <p className="font-bold text-asoebi-purple-950">
                    {getApplicantName(application)}
                  </p>
                  <p className="mt-1 text-sm text-asoebi-graphite">
                    {application.email}
                  </p>
                </div>
                <div className="text-sm text-asoebi-muted sm:text-right">
                  <p className="font-bold text-asoebi-purple-800 capitalize">
                    {application.submissionMode ?? "Legacy submission"}
                  </p>
                  <p className="mt-1">
                    {formatAdminDate(application.submittedAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 rounded-3xl bg-white p-8 text-asoebi-graphite shadow-asoebi-panel">
            No Prize applications have arrived yet.
          </p>
        )}
      </section>
    </>
  );
}
