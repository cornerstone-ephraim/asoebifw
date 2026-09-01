"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { useFloatingListbox } from "@/components/ui/use-floating-listbox";

export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
};

export type CustomSelectProps = {
  id: string;
  label: string;
  options: readonly Option[];
  placeholder?: string;
  value?: string;
  changeAction: (value: string) => void;
  invalid?: boolean;
  disabled?: boolean;
  describedBy?: string;
  className?: string;
  triggerClassName?: string;
  selectedTextClassName?: string;
  /** Maximum height in pixels for the dropdown list */
  maxListHeight?: number;
};

function findEnabledIndex(
  options: readonly Option[],
  startIndex: number,
  direction: 1 | -1,
) {
  if (!options.some((option) => !option.disabled)) return -1;

  let index = startIndex;
  for (let attempts = 0; attempts < options.length; attempts += 1) {
    index = (index + direction + options.length) % options.length;
    if (!options[index]?.disabled) return index;
  }

  return -1;
}

function moveFocusFromTrigger(
  trigger: HTMLButtonElement | null,
  direction: 1 | -1,
) {
  if (!trigger) return;

  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
  const visibleCandidates = candidates.filter(
    (candidate) => candidate.getClientRects().length > 0,
  );
  const focusable = visibleCandidates.length ? visibleCandidates : candidates;
  const triggerIndex = focusable.indexOf(trigger);
  const nextTarget = focusable[triggerIndex + direction];

  window.setTimeout(() => nextTarget?.focus(), 0);
}

export function CustomSelect({
  id,
  label,
  options,
  placeholder = "Select an option",
  value,
  changeAction,
  invalid = false,
  disabled = false,
  describedBy,
  className = "",
  triggerClassName = "",
  selectedTextClassName = "",
  maxListHeight = 240,
}: CustomSelectProps) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);

  const selectedIndex = useMemo(
    () => options.findIndex((opt) => opt.value === value),
    [options, value],
  );

  const [highlightedIndex, setHighlightedIndex] = useState(() =>
    selectedIndex >= 0 ? selectedIndex : 0,
  );

  const { style: listboxStyle, updatePosition } = useFloatingListbox({
    open,
    triggerRef,
    optionCount: options.length,
    maxHeight: maxListHeight,
  });

  const openDropdown = useCallback(
    (initialIndex?: number) => {
      if (disabled) return;
      const targetIndex =
        initialIndex !== undefined
          ? options[initialIndex]?.disabled
            ? findEnabledIndex(options, initialIndex, 1)
            : initialIndex
          : selectedIndex >= 0
            ? selectedIndex
            : findEnabledIndex(options, -1, 1);
      setHighlightedIndex(targetIndex);
      updatePosition();
      setOpen(true);
    },
    [disabled, options, selectedIndex, updatePosition],
  );

  const closeDropdown = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, []);

  const selectOption = useCallback(
    (index: number) => {
      const option = options[index];
      if (!option || option.disabled) return;

      changeAction(option.value);
      closeDropdown(true);
    },
    [options, changeAction, closeDropdown],
  );

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const insideTrigger = containerRef.current?.contains(target);
      const insideListbox = listboxRef.current?.contains(target);

      if (!insideTrigger && !insideListbox) closeDropdown(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, closeDropdown]);

  useEffect(() => {
    if (open) {
      updatePosition();
      listboxRef.current?.focus({ preventScroll: true });
    }
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open || highlightedIndex < 0) return;
    const activeEl = document.getElementById(
      `${listboxId}-${highlightedIndex}`,
    );
    if (typeof activeEl?.scrollIntoView === "function") {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [open, highlightedIndex, listboxId]);

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      openDropdown(selectedIndex >= 0 ? selectedIndex : 0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openDropdown(selectedIndex >= 0 ? selectedIndex : options.length - 1);
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      openDropdown();
    }
  };

  const handleListboxKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (!options.length) return;

    switch (event.key) {
      case "Escape": {
        event.preventDefault();
        closeDropdown(true);
        break;
      }
      case "Tab": {
        event.preventDefault();
        moveFocusFromTrigger(triggerRef.current, event.shiftKey ? -1 : 1);
        closeDropdown(false);
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        setHighlightedIndex((previous) =>
          findEnabledIndex(options, previous, 1),
        );
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        setHighlightedIndex((previous) =>
          findEnabledIndex(options, previous, -1),
        );
        break;
      }
      case "Home": {
        event.preventDefault();
        setHighlightedIndex(findEnabledIndex(options, -1, 1));
        break;
      }
      case "End": {
        event.preventDefault();
        setHighlightedIndex(findEnabledIndex(options, 0, -1));
        break;
      }
      case "Enter":
      case " ": {
        event.preventDefault();
        selectOption(highlightedIndex);
        break;
      }
    }
  };

  const selected = options[selectedIndex];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-label={label}
        aria-describedby={describedBy}
        data-invalid={invalid || undefined}
        onClick={() => (open ? closeDropdown(false) : openDropdown())}
        onKeyDown={handleTriggerKeyDown}
        className={`group transition-linear flex min-h-13 w-full items-center justify-between gap-4 rounded-full border bg-white px-5 text-left text-sm outline-hidden transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
          disabled
            ? "cursor-not-allowed border-asoebi-purple-100 bg-asoebi-mist opacity-60"
            : invalid
              ? "border-brand"
              : "border-asoebi-purple-200 hover:border-asoebi-purple-400"
        } ${triggerClassName}`}
      >
        <span
          className={`flex min-w-0 items-center gap-2 truncate ${
            selected ? "text-asoebi-purple-950" : "text-asoebi-muted"
          } ${selectedTextClassName}`}
        >
          {selected?.icon}
          {selected?.label ?? placeholder}
        </span>

        <span
          aria-hidden="true"
          className={`grid size-7 shrink-0 place-items-center rounded-full bg-asoebi-mist text-brand transition-transform duration-200 ease-in-out group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5 ${
            open ? "rotate-180" : ""
          }`}
        >
          ↓
        </span>
      </button>

      {open &&
        createPortal(
          <ul
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            aria-label={label}
            aria-activedescendant={
              highlightedIndex >= 0
                ? `${listboxId}-${highlightedIndex}`
                : undefined
            }
            onKeyDown={handleListboxKeyDown}
            style={listboxStyle}
            className="fixed z-100 [scrollbar-width:thin] [scrollbar-color:theme(colors.asoebi-purple-200)_transparent] overflow-y-auto rounded-3xl bg-white p-2 shadow-[0_18px_55px_rgba(42,17,87,.16)] outline-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-asoebi-purple-200 hover:[&::-webkit-scrollbar-thumb]:bg-asoebi-purple-300 [&::-webkit-scrollbar-track]:bg-transparent"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;

              return (
                <li
                  key={option.value}
                  id={`${listboxId}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  onPointerEnter={() => {
                    if (!option.disabled) setHighlightedIndex(index);
                  }}
                  onClick={() => selectOption(index)}
                  className={`flex min-h-12 items-center justify-between gap-4 rounded-2xl px-4 py-3 text-sm transition-colors ${
                    option.disabled
                      ? "cursor-not-allowed text-asoebi-muted opacity-50"
                      : isHighlighted
                        ? "cursor-pointer bg-asoebi-mist text-asoebi-purple-950"
                        : "cursor-pointer text-asoebi-graphite"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {option.icon}
                    <span className="truncate">{option.label}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`grid size-6 shrink-0 place-items-center rounded-full bg-brand text-xs text-white transition-opacity ${
                      isSelected ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    ✓
                  </span>
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </div>
  );
}
