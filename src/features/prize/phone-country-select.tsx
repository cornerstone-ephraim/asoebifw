"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import {
  getLocalizedPhoneCountryOptions,
  phoneCountryOptions,
} from "@/features/prize/phone";

type PhoneCountrySelectProps = {
  id: string;
  value?: string;
  changeAction: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
};

export function PhoneCountrySelect({
  id,
  value,
  changeAction,
  invalid = false,
  describedBy,
}: PhoneCountrySelectProps) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [options, setOptions] = useState(phoneCountryOptions);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setOptions(getLocalizedPhoneCountryOptions());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!open) return;

    searchRef.current?.focus({ preventScroll: true });
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [open]);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return options;

    return options.filter((option) =>
      `${option.name} ${option.value} ${option.callingCode}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [options, query]);

  const selected = options.find((option) => option.value === value);
  const activeOption = filteredOptions[highlightedIndex];

  useEffect(() => {
    if (!open || !activeOption) return;

    const option = document.getElementById(
      `${listboxId}-${activeOption.value}`,
    );
    option?.scrollIntoView?.({ block: "nearest" });
  }, [activeOption, listboxId, open]);

  const close = (restoreFocus: boolean) => {
    setOpen(false);
    setQuery("");
    if (restoreFocus) triggerRef.current?.focus({ preventScroll: true });
  };

  const select = (country: string) => {
    changeAction(country);
    close(true);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }

    if (!filteredOptions.length) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const movement = event.key === "ArrowDown" ? 1 : -1;
      setHighlightedIndex(
        (index) =>
          (index + movement + filteredOptions.length) % filteredOptions.length,
      );
      return;
    }

    if (event.key === "Enter" && activeOption) {
      event.preventDefault();
      select(activeOption.value);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-describedby={describedBy}
        data-invalid={invalid || undefined}
        aria-label={`Country code${selected ? `, ${selected.name} ${selected.callingCode}` : ""}`}
        onClick={() => (open ? close(false) : setOpen(true))}
        onKeyDown={(event) => {
          if (
            event.key === "ArrowDown" ||
            event.key === "ArrowUp" ||
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={`group transition-linear flex min-h-13 w-full min-w-0 items-center justify-between gap-1 rounded-full border bg-white px-3 text-sm outline-hidden transition-colors sm:gap-2 sm:px-4 ${invalid ? "border-red-700" : "border-asoebi-purple-300 hover:border-asoebi-purple-500 focus-visible:border-brand"}`}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span aria-hidden="true" className="text-lg leading-none">
            {selected?.flag ?? "🌍"}
          </span>
          <span className="truncate font-semibold text-asoebi-purple-950">
            {selected?.callingCode ?? "Code"}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`transition-linear text-brand transition-transform ${open ? "rotate-180" : ""}`}
        >
          ↓
        </span>
      </button>

      {open && (
        <div className="absolute top-full left-0 z-40 mt-2 w-72 max-w-[calc(100vw-5rem)] rounded-3xl bg-white p-2 shadow-asoebi-panel sm:w-80 sm:max-w-none">
          <label htmlFor={`${id}-search`} className="sr-only">
            Search countries or calling codes
          </label>
          <input
            ref={searchRef}
            id={`${id}-search`}
            role="combobox"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setHighlightedIndex(0);
            }}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search country or code"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls={listboxId}
            aria-activedescendant={
              activeOption ? `${listboxId}-${activeOption.value}` : undefined
            }
            className="min-h-11 w-full rounded-full border border-asoebi-purple-200 bg-asoebi-mist px-4 text-sm outline-hidden placeholder:text-asoebi-muted focus:border-brand"
          />

          <ul
            id={listboxId}
            role="listbox"
            aria-label="Countries and calling codes"
            className="mt-2 max-h-72 overflow-y-auto overscroll-contain"
          >
            {filteredOptions.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;

              return (
                <li
                  id={`${listboxId}-${option.value}`}
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onPointerMove={() => setHighlightedIndex(index)}
                  onClick={() => select(option.value)}
                  className={`transition-linear flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl px-3 py-2 text-sm transition-colors ${isHighlighted ? "bg-asoebi-mist" : "bg-white"}`}
                >
                  <span aria-hidden="true" className="text-xl leading-none">
                    {option.flag}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-semibold text-asoebi-purple-950">
                    {option.name}
                  </span>
                  <span className="shrink-0 text-asoebi-muted">
                    {option.callingCode}
                  </span>
                  {isSelected && (
                    <span aria-hidden="true" className="text-brand">
                      ✓
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          {!filteredOptions.length && (
            <p role="status" className="px-4 py-6 text-sm text-asoebi-muted">
              No country found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
