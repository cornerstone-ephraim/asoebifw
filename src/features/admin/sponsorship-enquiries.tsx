"use client";

import { useState } from "react";
import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Doc } from "../../../convex/_generated/dataModel";
import { CustomSelect } from "@/components/ui/custom-select";
import { enquiryStatuses } from "@/features/sponsorship/schema";
import { formatAdminDate } from "./admin-utils";

function Enquiry({ entry }: { entry: Doc<"sponsorshipEnquiries"> }) {
  const update = useMutation(api.sponsorship.updateStatus);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState("");
  return (
    <article className="rounded-3xl border border-asoebi-purple-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0 break-words">
          <h2 className="font-display text-3xl tracking-tight">
            {entry.organisation}
          </h2>
          <p className="mt-2 font-bold">{entry.name}</p>
          <a
            className="mt-2 block break-all underline"
            href={`mailto:${entry.email}`}
          >
            {entry.email}
          </a>
          {entry.phone && <p className="mt-2">{entry.phone}</p>}
          <p className="mt-3 text-sm text-asoebi-muted">
            {formatAdminDate(entry.submittedAt)}
          </p>
        </div>
        <div className="w-full sm:w-56">
          <label
            htmlFor={`status-${entry._id}`}
            className="mb-2 block text-sm font-bold"
          >
            Enquiry status
          </label>
          <CustomSelect
            id={`status-${entry._id}`}
            label={`Status for ${entry.organisation}`}
            value={entry.status}
            options={enquiryStatuses.map((value) => ({ value, label: value }))}
            disabled={pending}
            changeAction={async (value) => {
              setPending(true);
              setFeedback("");
              try {
                await update({
                  id: entry._id,
                  status: value as Doc<"sponsorshipEnquiries">["status"],
                });
                setFeedback("Status saved.");
              } catch {
                setFeedback("Could not save status. Please try again.");
              } finally {
                setPending(false);
              }
            }}
          />
          <p role="status" className="mt-2 text-sm">
            {feedback}
          </p>
        </div>
      </div>
      <dl className="mt-6 grid gap-4 border-t border-asoebi-purple-100 pt-5 sm:grid-cols-3">
        {[
          ["Interest", entry.interest],
          ["Support", entry.supportType],
          ["Indicative budget", entry.budget || "Not provided"],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-sm text-asoebi-muted">{label}</dt>
            <dd className="mt-1 font-bold break-words">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 break-words whitespace-pre-wrap">{entry.message}</p>
      <p className="mt-6 text-sm text-asoebi-graphite">
        {entry.emailStatus === "sent"
          ? "Confirmation and team notification sent."
          : entry.emailStatus === "failed"
            ? "One or more emails failed. The enquiry is saved; follow up directly."
            : "Email delivery pending or unconfirmed. Check before following up."}
      </p>
    </article>
  );
}
export function SponsorshipEnquiries() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.sponsorship.list,
    {},
    { initialNumItems: 20 },
  );
  return (
    <div className="mt-8 space-y-5">
      {status === "LoadingFirstPage" ? (
        <p role="status">Loading enquiries…</p>
      ) : !results.length ? (
        <p>No sponsorship enquiries yet.</p>
      ) : (
        results.map((entry) => <Enquiry key={entry._id} entry={entry} />)
      )}
      {status !== "Exhausted" && status !== "LoadingFirstPage" && (
        <button
          disabled={status === "LoadingMore"}
          onClick={() => loadMore(20)}
          className="min-h-12 rounded-full bg-asoebi-purple-950 px-6 text-sm font-bold text-white disabled:opacity-60"
        >
          {status === "LoadingMore" ? "Loading…" : "Load more enquiries"}
        </button>
      )}
    </div>
  );
}
