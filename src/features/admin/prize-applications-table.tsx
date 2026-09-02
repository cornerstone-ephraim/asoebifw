"use client";

import { useMemo, useState } from "react";
import { useMutation } from "convex/react";

import { api } from "../../../convex/_generated/api";
import { AdminPagination } from "@/features/admin/admin-pagination";
import { AdminFilterSelect } from "@/features/admin/admin-filter-select";
import { createPrizeApplicationsCsv } from "@/features/admin/admin-csv";
import {
  PrizeApplicationCard,
  PrizeApplicationRow,
} from "@/features/admin/prize-application-item";
import {
  getPrizeStatusLabel,
  prizeStatusOptions,
  type PrizeApplication,
  type PrizeApplicationStatus,
  type PrizeEmailStatus,
  type PrizeSubmissionMode,
} from "@/features/admin/admin-types";
import { getApplicantName } from "@/features/admin/admin-utils";

const pageSize = 20;

type FilterValue<T extends string> = "all" | T;
type SortOrder = "newest" | "oldest";

export function PrizeApplicationsTable({
  applications: initialApplications,
  initialSearch = "",
  initialStatus = "all",
  initialEmailStatus = "all",
}: {
  applications: PrizeApplication[];
  initialSearch?: string;
  initialStatus?: FilterValue<PrizeApplicationStatus>;
  initialEmailStatus?: FilterValue<PrizeEmailStatus>;
}) {
  const updatePrizeStatus = useMutation(api.admin.updatePrizeStatus);
  const [applications, setApplications] = useState(initialApplications);
  const [query, setQuery] = useState(initialSearch);
  const [status, setStatus] =
    useState<FilterValue<PrizeApplicationStatus>>(initialStatus);
  const [submissionMode, setSubmissionMode] =
    useState<FilterValue<PrizeSubmissionMode>>("all");
  const [emailStatus, setEmailStatus] =
    useState<FilterValue<PrizeEmailStatus>>(initialEmailStatus);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState("");

  const filteredApplications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return applications
      .filter((application) => {
        const matchesQuery = normalizedQuery
          ? `${getApplicantName(application)} ${application.email} ${application.phone ?? ""}`
              .toLowerCase()
              .includes(normalizedQuery)
          : true;
        const matchesStatus = status === "all" || application.status === status;
        const matchesSubmissionMode =
          submissionMode === "all" ||
          application.submissionMode === submissionMode;
        const matchesEmailStatus =
          emailStatus === "all" || application.emailStatus === emailStatus;

        return (
          matchesQuery &&
          matchesStatus &&
          matchesSubmissionMode &&
          matchesEmailStatus
        );
      })
      .sort((first, second) =>
        sortOrder === "newest"
          ? second.submittedAt - first.submittedAt
          : first.submittedAt - second.submittedAt,
      );
  }, [applications, emailStatus, query, sortOrder, status, submissionMode]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredApplications.length / pageSize),
  );
  const currentPage = Math.min(page, pageCount);
  const pageApplications = filteredApplications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const filtersActive =
    Boolean(query) ||
    status !== "all" ||
    submissionMode !== "all" ||
    emailStatus !== "all" ||
    sortOrder !== "newest";

  const clearFilters = () => {
    setQuery("");
    setStatus("all");
    setSubmissionMode("all");
    setEmailStatus("all");
    setSortOrder("newest");
    setPage(1);
  };

  const exportCsv = () => {
    const blob = new Blob([createPrizeApplicationsCsv(filteredApplications)], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `aefw-prize-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const changeStatus = async (
    application: PrizeApplication,
    nextStatus: PrizeApplicationStatus,
  ) => {
    const previousStatus = application.status;
    if (previousStatus === nextStatus || updatingId) return;

    setUpdatingId(application.id);
    setUpdateMessage("");
    setApplications((current) =>
      current.map((item) =>
        item.id === application.id ? { ...item, status: nextStatus } : item,
      ),
    );

    try {
      await updatePrizeStatus({
        applicationId: application.id,
        status: nextStatus,
      });
      setUpdateMessage(
        `${getApplicantName(application)} marked as ${getPrizeStatusLabel(nextStatus)}.`,
      );
    } catch {
      setApplications((current) =>
        current.map((item) =>
          item.id === application.id
            ? { ...item, status: previousStatus }
            : item,
        ),
      );
      setUpdateMessage("The review status could not be updated. Try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (!applications.length) {
    return (
      <p className="mt-8 rounded-3xl bg-white p-8 text-asoebi-graphite shadow-asoebi-panel">
        No Prize applications have arrived yet.
      </p>
    );
  }

  return (
    <section aria-label="Prize application review" className="mt-8">
      <div className="rounded-3xl bg-white p-4 shadow-asoebi-panel sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(15rem,1fr)_repeat(4,auto)] lg:items-end">
          <div>
            <label
              htmlFor="prize-admin-search"
              className="mb-2 block text-xs font-bold text-asoebi-purple-800"
            >
              Search applicants
            </label>
            <input
              id="prize-admin-search"
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Name, email or phone"
              className="min-h-11 w-full rounded-full border border-asoebi-purple-200 bg-asoebi-mist px-4 text-sm outline-hidden placeholder:text-asoebi-muted focus-visible:border-brand"
            />
          </div>
          <AdminFilterSelect
            id="prize-status-filter"
            label="Review status"
            value={status}
            changeAction={(value) => {
              setStatus(value as FilterValue<PrizeApplicationStatus>);
              setPage(1);
            }}
            options={prizeStatusOptions}
          />
          <AdminFilterSelect
            id="prize-mode-filter"
            label="Submission"
            value={submissionMode}
            changeAction={(value) => {
              setSubmissionMode(value as FilterValue<PrizeSubmissionMode>);
              setPage(1);
            }}
            options={[
              { label: "Instagram", value: "instagram" },
              { label: "YouTube", value: "youtube" },
              { label: "Website", value: "website" },
              { label: "PDF", value: "pdf" },
            ]}
          />
          <AdminFilterSelect
            id="prize-email-filter"
            label="Email"
            value={emailStatus}
            changeAction={(value) => {
              setEmailStatus(value as FilterValue<PrizeEmailStatus>);
              setPage(1);
            }}
            options={[
              { label: "Pending", value: "pending" },
              { label: "Sent", value: "sent" },
              { label: "Failed", value: "failed" },
            ]}
          />
          <AdminFilterSelect
            id="prize-sort"
            label="Order"
            value={sortOrder}
            includeAll={false}
            changeAction={(value) => {
              setSortOrder(value as SortOrder);
              setPage(1);
            }}
            options={[
              { label: "Newest first", value: "newest" },
              { label: "Oldest first", value: "oldest" },
            ]}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-asoebi-purple-100 pt-4">
          <p aria-live="polite" className="text-sm text-asoebi-muted">
            {filteredApplications.length} of {applications.length} applications
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="transition-linear min-h-10 rounded-full px-4 text-sm font-bold text-asoebi-purple-800 transition-colors hover:bg-asoebi-mist hover:text-brand"
              >
                Clear filters
              </button>
            )}
            <button
              type="button"
              onClick={exportCsv}
              disabled={!filteredApplications.length}
              className="transition-linear min-h-10 rounded-full bg-asoebi-purple-950 px-4 text-sm font-bold text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-40"
            >
              Export {filteredApplications.length} CSV
            </button>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {updateMessage}
      </p>

      {pageApplications.length ? (
        <>
          <div className="mt-5 grid gap-4 lg:hidden">
            {pageApplications.map((application) => (
              <PrizeApplicationCard
                key={application.id}
                application={application}
                updating={updatingId === application.id}
                statusChangeAction={(nextStatus) =>
                  void changeStatus(application, nextStatus)
                }
              />
            ))}
          </div>

          <div className="mt-5 hidden overflow-hidden rounded-3xl bg-white shadow-asoebi-panel lg:block">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Asoebi Fashion Prize applications
              </caption>
              <thead className="bg-asoebi-purple-950 text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Applicant
                  </th>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Submission
                  </th>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Received
                  </th>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-4 text-right font-bold">
                    Review
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-asoebi-purple-100">
                {pageApplications.map((application) => (
                  <PrizeApplicationRow
                    key={application.id}
                    application={application}
                    updating={updatingId === application.id}
                    statusChangeAction={(nextStatus) =>
                      void changeStatus(application, nextStatus)
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="mt-5 rounded-3xl bg-white p-8 shadow-asoebi-panel">
          <p className="font-bold text-asoebi-purple-950">
            No applications match these filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="transition-linear mt-4 min-h-11 rounded-full bg-asoebi-purple-950 px-5 text-sm font-bold text-white transition-colors hover:bg-brand"
          >
            Clear filters
          </button>
        </div>
      )}

      <AdminPagination
        page={currentPage}
        pageCount={pageCount}
        total={filteredApplications.length}
        itemLabel="applications"
        changeAction={setPage}
      />
    </section>
  );
}
