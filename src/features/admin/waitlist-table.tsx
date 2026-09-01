"use client";

import { useMemo, useState } from "react";

import { AdminPagination } from "@/features/admin/admin-pagination";
import { createWaitlistCsv } from "@/features/admin/admin-csv";
import type { WaitlistEntry } from "@/features/admin/admin-types";
import {
  formatAdminDate,
  getApplicantName,
} from "@/features/admin/admin-utils";

const pageSize = 25;

export function WaitlistTable({
  entries,
  initialSearch = "",
}: {
  entries: WaitlistEntry[];
  initialSearch?: string;
}) {
  const [query, setQuery] = useState(initialSearch);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return entries
      .filter((entry) =>
        normalizedQuery
          ? `${getApplicantName(entry)} ${entry.email}`
              .toLowerCase()
              .includes(normalizedQuery)
          : true,
      )
      .sort((first, second) =>
        sortOrder === "newest"
          ? second.submittedAt - first.submittedAt
          : first.submittedAt - second.submittedAt,
      );
  }, [entries, query, sortOrder]);

  const pageCount = Math.max(1, Math.ceil(filteredEntries.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageEntries = filteredEntries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const exportCsv = () => {
    const blob = new Blob([createWaitlistCsv(filteredEntries)], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `aefw-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (!entries.length) {
    return (
      <p className="mt-8 rounded-3xl bg-white p-8 text-asoebi-graphite shadow-asoebi-panel">
        The waitlist is empty.
      </p>
    );
  }

  return (
    <section aria-label="Waitlist management" className="mt-8">
      <div className="rounded-3xl bg-white p-4 shadow-asoebi-panel sm:p-5">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(20rem,1fr)_auto_auto] lg:items-end">
          <div>
            <label
              htmlFor="waitlist-admin-search"
              className="mb-2 block text-xs font-bold text-asoebi-purple-800"
            >
              Search the waitlist
            </label>
            <input
              id="waitlist-admin-search"
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Name or email"
              className="min-h-11 w-full rounded-full border border-asoebi-purple-200 bg-asoebi-mist px-4 text-sm outline-hidden placeholder:text-asoebi-muted focus-visible:border-brand"
            />
          </div>
          <div>
            <label
              htmlFor="waitlist-sort"
              className="mb-2 block text-xs font-bold text-asoebi-purple-800"
            >
              Order
            </label>
            <select
              id="waitlist-sort"
              value={sortOrder}
              onChange={(event) => {
                setSortOrder(event.target.value as "newest" | "oldest");
                setPage(1);
              }}
              className="min-h-11 w-full rounded-full border border-asoebi-purple-200 bg-white px-4 text-sm font-bold text-asoebi-purple-950 outline-hidden focus-visible:border-brand sm:w-auto"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
          <button
            type="button"
            onClick={exportCsv}
            disabled={!filteredEntries.length}
            className="transition-linear min-h-11 rounded-full bg-asoebi-purple-950 px-5 text-sm font-bold text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-2 lg:col-span-1"
          >
            Export {filteredEntries.length} CSV
          </button>
        </div>
        <p aria-live="polite" className="mt-4 text-sm text-asoebi-muted">
          {filteredEntries.length} of {entries.length} people
        </p>
      </div>

      {pageEntries.length ? (
        <>
          <div className="mt-5 grid gap-3 md:hidden">
            {pageEntries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-3xl bg-white p-5 shadow-asoebi-panel"
              >
                <h2 className="font-display text-2xl tracking-[-.035em] text-asoebi-purple-950">
                  {getApplicantName(entry)}
                </h2>
                <a
                  href={`mailto:${entry.email}`}
                  className="transition-linear mt-2 block truncate text-sm text-asoebi-graphite transition-colors hover:text-brand"
                >
                  {entry.email}
                </a>
                <p className="mt-4 border-t border-asoebi-purple-100 pt-4 text-sm text-asoebi-muted">
                  Joined {formatAdminDate(entry.submittedAt)}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 hidden overflow-hidden rounded-3xl bg-white shadow-asoebi-panel md:block">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Asoebi Fashion Week waitlist entries
              </caption>
              <thead className="bg-asoebi-purple-950 text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold">
                    Email address
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-asoebi-purple-100">
                {pageEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="transition-linear transition-colors hover:bg-asoebi-mist/55"
                  >
                    <th
                      scope="row"
                      className="px-6 py-5 font-bold text-asoebi-purple-950"
                    >
                      {getApplicantName(entry)}
                    </th>
                    <td className="px-6 py-5">
                      <a
                        href={`mailto:${entry.email}`}
                        className="transition-linear text-asoebi-graphite underline-offset-4 transition-colors hover:text-brand hover:underline"
                      >
                        {entry.email}
                      </a>
                    </td>
                    <td className="px-6 py-5 text-asoebi-graphite">
                      {formatAdminDate(entry.submittedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="mt-5 rounded-3xl bg-white p-8 shadow-asoebi-panel">
          <p className="font-bold text-asoebi-purple-950">
            No waitlist entries match that search.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setPage(1);
            }}
            className="transition-linear mt-4 min-h-11 rounded-full bg-asoebi-purple-950 px-5 text-sm font-bold text-white transition-colors hover:bg-brand"
          >
            Clear search
          </button>
        </div>
      )}

      <AdminPagination
        page={currentPage}
        pageCount={pageCount}
        total={filteredEntries.length}
        itemLabel="people"
        changeAction={setPage}
      />
    </section>
  );
}
