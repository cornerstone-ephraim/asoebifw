"use client";

type AdminPaginationProps = {
  page: number;
  pageCount: number;
  total: number;
  itemLabel: string;
  changeAction: (page: number) => void;
};

export function AdminPagination({
  page,
  pageCount,
  total,
  itemLabel,
  changeAction,
}: AdminPaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav
      aria-label={`${itemLabel} pagination`}
      className="mt-6 flex flex-wrap items-center justify-between gap-4"
    >
      <p className="text-sm text-asoebi-muted">
        Page {page} of {pageCount} · {total} {itemLabel}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => changeAction(page - 1)}
          className="transition-linear min-h-11 rounded-full border border-asoebi-purple-300 bg-white px-4 text-sm font-bold text-asoebi-purple-950 transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={page === pageCount}
          onClick={() => changeAction(page + 1)}
          className="transition-linear min-h-11 rounded-full bg-asoebi-purple-950 px-4 text-sm font-bold text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
