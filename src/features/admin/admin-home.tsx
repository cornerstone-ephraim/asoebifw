import Link from "next/link";

import { AdminPageHeader } from "@/features/admin/admin-page-header";
import {
  formatAdminDate,
  getApplicantName,
} from "@/features/admin/admin-utils";

type RecentActivity = {
  id: string;
  type: "prize" | "waitlist";
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  submissionMode?: string;
  status?: string;
  submittedAt: number;
};

export function AdminHome({
  admin,
  overview,
}: {
  admin: { email: string; name: string };
  overview: {
    prizeApplications: number;
    awaitingReview: number;
    failedPrizeEmails: number;
    waitlistEntries: number;
    recentActivity: RecentActivity[];
  };
}) {
  const summaries = [
    {
      label: "Prize applications",
      value: overview.prizeApplications,
      href: "/admin/prize",
      detail: "View every submission",
    },
    {
      label: "Awaiting review",
      value: overview.awaitingReview,
      href: "/admin/prize?status=submitted",
      detail: "Needs attention",
    },
    {
      label: "Email failures",
      value: overview.failedPrizeEmails,
      href: "/admin/prize?emailStatus=failed",
      detail: "Check notifications",
    },
    {
      label: "Waitlist",
      value: overview.waitlistEntries,
      href: "/admin/waitlist",
      detail: "View the audience",
    },
  ] as const;

  return (
    <>
      <AdminPageHeader
        eyebrow="Administration"
        title="Overview"
        description={`Signed in as ${admin.email}. Review new submissions and monitor the AEFW audience.`}
      />

      <section aria-labelledby="admin-summary" className="mt-8">
        <h2 id="admin-summary" className="sr-only">
          Application summary
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summaries.map((summary, index) => (
            <Link
              key={summary.label}
              href={summary.href}
              className={`group transition-linear rounded-3xl p-6 shadow-asoebi-panel transition-colors ${index === 0 ? "bg-asoebi-purple-950 text-white hover:bg-brand" : "bg-white text-asoebi-purple-950 hover:bg-asoebi-paper"}`}
            >
              <span
                className={`text-xs font-bold tracking-[.12em] uppercase ${index === 0 ? "text-asoebi-gold-300" : "text-asoebi-purple-700"}`}
              >
                {summary.label}
              </span>
              <strong className="mt-5 block font-display text-5xl leading-none tracking-[-.055em]">
                {summary.value}
              </strong>
              <span
                className={`mt-5 flex items-center justify-between gap-3 text-sm font-bold ${index === 0 ? "text-white/70" : "text-asoebi-muted"}`}
              >
                {summary.detail}
                <span
                  aria-hidden="true"
                  className="transition-linear transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="recent-activity" className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-[.14em] text-asoebi-purple-700 uppercase">
              Latest activity
            </p>
            <h2
              id="recent-activity"
              className="mt-2 font-display text-4xl tracking-[-.04em] text-asoebi-purple-950"
            >
              What arrived recently
            </h2>
          </div>
          <Link
            href="/admin/prize"
            className="transition-linear min-h-11 rounded-full border border-asoebi-purple-950 px-5 py-3 text-sm font-bold transition-colors hover:bg-asoebi-purple-950 hover:text-white"
          >
            Review applications
          </Link>
        </div>

        {overview.recentActivity.length ? (
          <ul className="mt-6 overflow-hidden rounded-3xl bg-white shadow-asoebi-panel">
            {overview.recentActivity.map((activity) => {
              const destination =
                activity.type === "prize"
                  ? `/admin/prize?search=${encodeURIComponent(activity.email)}`
                  : `/admin/waitlist?search=${encodeURIComponent(activity.email)}`;

              return (
                <li
                  key={`${activity.type}-${activity.id}`}
                  className="border-b border-asoebi-purple-100 last:border-b-0"
                >
                  <Link
                    href={destination}
                    className="group transition-linear grid gap-3 p-5 transition-colors hover:bg-asoebi-mist/55 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-asoebi-purple-950">
                          {getApplicantName(activity)}
                        </p>
                        <span className="rounded-full bg-asoebi-mist px-2.5 py-1 text-xs font-bold text-asoebi-purple-800">
                          {activity.type === "prize" ? "Prize" : "Waitlist"}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-asoebi-graphite">
                        {activity.email}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-5 text-sm text-asoebi-muted sm:text-right">
                      <div>
                        {activity.type === "prize" && (
                          <p className="font-bold text-asoebi-purple-800 capitalize">
                            {activity.submissionMode ?? "Legacy submission"}
                          </p>
                        )}
                        <p className="mt-1">
                          {formatAdminDate(activity.submittedAt)}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="transition-linear text-lg transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-6 rounded-3xl bg-white p-8 text-asoebi-graphite shadow-asoebi-panel">
            No activity has arrived yet.
          </p>
        )}
      </section>
    </>
  );
}
