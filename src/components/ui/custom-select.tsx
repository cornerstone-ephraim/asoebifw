"use client";

import { useEffect, useId, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  id: string;
  label: string;
  options: readonly Option[];
  placeholder: string;
  value?: string;
  changeAction: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
};

export function CustomSelect({
  id,
  label,
  options,
  placeholder,
  value,
  changeAction,
  invalid = false,
  describedBy,
}: CustomSelectProps) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(
    Math.max(selectedIndex, 0),
  );

  useEffect(() => {
    if (!open) return;
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [open]);

  useEffect(() => {
    if (open) listboxRef.current?.focus({ preventScroll: true });
  }, [open]);

  const openList = (direction: 1 | -1 = 1) => {
    const fallback = direction === 1 ? 0 : options.length - 1;
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : fallback);
    setOpen(true);
  };

  const selectOption = (index: number) => {
    changeAction(options[index].value);
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  };

  const selected = options[selectedIndex];

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openList(event.key === "ArrowDown" ? 1 : -1);
          }
        }}
        className={`group transition-linear flex min-h-13 w-full items-center justify-between gap-4 rounded-full border bg-white px-5 text-left text-sm outline-hidden transition-colors ${invalid ? "border-brand" : "border-asoebi-purple-200 hover:border-asoebi-purple-400"}`}
      >
        <span
          className={selected ? "text-asoebi-purple-950" : "text-asoebi-muted"}
        >
          {selected?.label ?? placeholder}
        </span>
        <span
          aria-hidden="true"
          className={`transition-linear grid size-7 shrink-0 place-items-center rounded-full bg-asoebi-mist text-brand transition-transform group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5 ${open ? "rotate-180" : ""}`}
        >
          ↓
        </span>
      </button>

      {open && (
        <ul
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`${listboxId}-${highlightedIndex}`}
          onKeyDown={(event) => {
            if (event.key === "Escape" || event.key === "Tab") {
              if (event.key === "Escape") event.preventDefault();
              setOpen(false);
              if (event.key === "Escape") {
                triggerRef.current?.focus({ preventScroll: true });
              }
              return;
            }
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              const movement = event.key === "ArrowDown" ? 1 : -1;
              setHighlightedIndex(
                (index) => (index + movement + options.length) % options.length,
              );
              return;
            }
            if (event.key === "Home" || event.key === "End") {
              event.preventDefault();
              setHighlightedIndex(
                event.key === "Home" ? 0 : options.length - 1,
              );
              return;
            }
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              selectOption(highlightedIndex);
            }
          }}
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-3xl bg-white p-2 shadow-[0_18px_55px_rgba(42,17,87,.16)] outline-hidden"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlightedIndex;
            return (
              <li
                id={`${listboxId}-${index}`}
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onPointerEnter={() => setHighlightedIndex(index)}
                onClick={() => selectOption(index)}
                className={`transition-linear flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded-2xl px-4 py-3 text-sm transition-colors ${isHighlighted ? "bg-asoebi-mist text-asoebi-purple-950" : "text-asoebi-graphite"}`}
              >
                <span>{option.label}</span>
                <span
                  aria-hidden="true"
                  className={`transition-linear grid size-6 place-items-center rounded-full bg-brand text-xs text-white transition-opacity ${isSelected ? "opacity-100" : "opacity-0"}`}
                >
                  ✓
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
