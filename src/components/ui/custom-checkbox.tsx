"use client";

import type { ReactNode } from "react";

type CustomCheckboxProps = {
  checked: boolean;
  children: ReactNode;
  describedBy?: string;
  invalid?: boolean;
  name: string;
  blurAction?: () => void;
  changeAction: (checked: boolean) => void;
};

export function CustomCheckbox({
  checked,
  children,
  describedBy,
  invalid = false,
  name,
  blurAction,
  changeAction,
}: CustomCheckboxProps) {
  return (
    <label className="group relative flex cursor-pointer items-start gap-3 text-sm leading-6 text-asoebi-graphite sm:items-center">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(event) => changeAction(event.target.checked)}
        onBlur={blurAction}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className="peer absolute top-0.5 left-0 z-10 size-6 cursor-pointer opacity-0"
      />
      <span
        aria-hidden="true"
        style={{
          borderColor: invalid
            ? "var(--color-red-700)"
            : checked
              ? "var(--color-brand)"
              : "var(--color-asoebi-purple-950)",
          borderStyle: "solid",
        }}
        className={`transition-linear mt-0.5 grid size-6 shrink-0 cursor-pointer place-items-center rounded-lg border-1 ring-1 transition-colors ring-inset peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand ${invalid ? "bg-red-50 ring-red-700" : checked ? "bg-brand text-white ring-brand" : "bg-asoebi-purple-100 text-transparent ring-asoebi-purple-950 group-hover:bg-asoebi-purple-200 group-hover:ring-brand"}`}
      >
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
          <path
            d="m3.25 8.25 3 3 6.5-6.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{children}</span>
    </label>
  );
}
