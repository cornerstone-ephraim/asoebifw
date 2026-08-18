"use client";

import type { ReactNode } from "react";

type CustomCheckboxProps = {
  checked: boolean;
  children: ReactNode;
  describedBy?: string;
  invalid?: boolean;
  name: string;
  onBlur?: () => void;
  onChange: (checked: boolean) => void;
};

export function CustomCheckbox({
  checked,
  children,
  describedBy,
  invalid = false,
  name,
  onBlur,
  onChange,
}: CustomCheckboxProps) {
  return (
    <label className="group flex cursor-pointer items-start gap-3 text-sm leading-6 text-asoebi-graphite">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        onBlur={onBlur}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border-2 transition-colors transition-linear peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand ${checked ? "border-brand bg-brand text-white" : "border-asoebi-purple-700 bg-white text-transparent group-hover:border-brand"}`}
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
