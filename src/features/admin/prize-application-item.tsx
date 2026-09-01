"use client";

import { CustomSelect, type Option } from "@/components/ui/custom-select";
import {
  prizeStatusOptions,
  type PrizeApplication,
  type PrizeApplicationStatus,
} from "@/features/admin/admin-types";
import {
  formatAdminDate,
  getApplicantName,
} from "@/features/admin/admin-utils";
import { useMemo } from "react";

const statusClasses: Record<PrizeApplicationStatus, string> = {
  submitted: "bg-asoebi-gold-100 text-asoebi-purple-950",
  reviewing: "bg-asoebi-mist text-asoebi-purple-900",
  reviewed: "bg-sky-100 text-sky-950",
  shortlisted: "bg-emerald-100 text-emerald-950",
  rejected: "bg-red-100 text-red-900",
};

function EmailStatus({ status }: { status: PrizeApplication["emailStatus"] }) {
  if (!status) return null;

  const classes = {
    pending: "bg-asoebi-gold-100 text-asoebi-gold-900",
    sent: "bg-emerald-100 text-emerald-900",
    failed: "bg-red-100 text-red-900",
  }[status];

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${classes}`}>
      Email {status}
    </span>
  );
}

function StatusSelect({
  application,
  disabled,
  idPrefix,
  changeAction,
}: {
  application: PrizeApplication;
  disabled: boolean;
  idPrefix: "card" | "row";
  changeAction: (status: PrizeApplicationStatus) => void;
}) {
  const id = `${idPrefix}-status-${application.id}`;
  const applicantName = getApplicantName(application);

  // Map options to include status-colored indicator dots
  const optionsWithBadges: readonly Option[] = useMemo(
    () =>
      prizeStatusOptions.map((opt) => ({
        value: opt.value,
        label: opt.label,
        icon: (
          <span
            aria-hidden="true"
            className={`size-2 shrink-0 rounded-full ${
              statusClasses[opt.value as PrizeApplicationStatus] ??
              "bg-asoebi-purple-400"
            }`}
          />
        ),
      })),
    [],
  );

  return (
    <div className="w-full sm:w-auto">
      <CustomSelect
        id={id}
        label={`Review status for ${applicantName}`}
        value={application.status}
        disabled={disabled}
        options={optionsWithBadges}
        changeAction={(val) => changeAction(val as PrizeApplicationStatus)}
        className="w-44"
        triggerClassName={`min-h-10 border-transparent px-3 text-xs font-bold ${statusClasses[application.status]}`}
        selectedTextClassName="text-current"
      />
    </div>
  );
}

function ReviewActions({ application }: { application: PrizeApplication }) {
  const reviewUrl = application.submissionUrl || application.legacyPdfUrl;

  return (
    <div className="flex flex-wrap gap-2 lg:justify-end">
      {reviewUrl ? (
        <a
          href={reviewUrl}
          target="_blank"
          rel="noreferrer"
          className="transition-linear inline-flex min-h-10 items-center rounded-full bg-asoebi-purple-950 px-4 text-xs font-bold text-white transition-colors hover:bg-brand"
        >
          Open submission{" "}
          <span aria-hidden="true" className="ml-2">
            ↗
          </span>
        </a>
      ) : (
        <span className="self-center text-xs font-semibold text-asoebi-muted">
          Link unavailable
        </span>
      )}
      {application.idDocumentAvailable && (
        <a
          href={`/admin/prize/id/${application.id}`}
          target="_blank"
          rel="noreferrer"
          className="transition-linear inline-flex min-h-10 items-center rounded-full border border-asoebi-purple-300 px-4 text-xs font-bold text-asoebi-purple-950 transition-colors hover:border-brand hover:text-brand"
        >
          Verify age{" "}
          <span aria-hidden="true" className="ml-2">
            ↗
          </span>
        </a>
      )}
    </div>
  );
}

export function PrizeApplicationCard({
  application,
  updating,
  statusChangeAction,
}: {
  application: PrizeApplication;
  updating: boolean;
  statusChangeAction: (status: PrizeApplicationStatus) => void;
}) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-asoebi-panel">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-2xl tracking-[-.035em] text-asoebi-purple-950">
            {getApplicantName(application)}
          </h2>
          <a
            href={`mailto:${application.email}`}
            className="transition-linear mt-1 block truncate text-sm text-asoebi-graphite transition-colors hover:text-brand"
          >
            {application.email}
          </a>
          {application.phone && (
            <a
              href={`tel:${application.phone}`}
              className="transition-linear mt-1 block text-sm text-asoebi-graphite transition-colors hover:text-brand"
            >
              {application.phone}
            </a>
          )}
        </div>
        <EmailStatus status={application.emailStatus} />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-asoebi-purple-100 py-4 text-sm">
        <div>
          <dt className="text-xs font-bold text-asoebi-muted">Submission</dt>
          <dd className="mt-1 font-bold text-asoebi-purple-900 capitalize">
            {application.submissionMode ?? "Legacy"}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-bold text-asoebi-muted">Received</dt>
          <dd className="mt-1 text-asoebi-graphite">
            {formatAdminDate(application.submittedAt)}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold text-asoebi-muted">
            Review status
          </p>
          <StatusSelect
            application={application}
            disabled={updating}
            idPrefix="card"
            changeAction={statusChangeAction}
          />
        </div>
        <ReviewActions application={application} />
      </div>
    </article>
  );
}

export function PrizeApplicationRow({
  application,
  updating,
  statusChangeAction,
}: {
  application: PrizeApplication;
  updating: boolean;
  statusChangeAction: (status: PrizeApplicationStatus) => void;
}) {
  return (
    <tr className="transition-linear transition-colors hover:bg-asoebi-mist/55">
      <th scope="row" className="px-5 py-5 font-normal">
        <span className="block font-bold text-asoebi-purple-950">
          {getApplicantName(application)}
        </span>
        <a
          href={`mailto:${application.email}`}
          className="transition-linear mt-1 block text-asoebi-graphite underline-offset-4 transition-colors hover:text-brand hover:underline"
        >
          {application.email}
        </a>
        {application.phone && (
          <a
            href={`tel:${application.phone}`}
            className="transition-linear mt-1 block text-asoebi-graphite underline-offset-4 transition-colors hover:text-brand hover:underline"
          >
            {application.phone}
          </a>
        )}
      </th>
      <td className="px-5 py-5 font-bold text-asoebi-purple-800 capitalize">
        {application.submissionMode ?? "Legacy"}
      </td>
      <td className="px-5 py-5 text-asoebi-graphite">
        {formatAdminDate(application.submittedAt)}
      </td>
      <td className="px-5 py-5">
        <div className="space-y-2">
          <StatusSelect
            application={application}
            disabled={updating}
            idPrefix="row"
            changeAction={statusChangeAction}
          />
          <EmailStatus status={application.emailStatus} />
        </div>
      </td>
      <td className="px-5 py-5">
        <ReviewActions application={application} />
      </td>
    </tr>
  );
}
