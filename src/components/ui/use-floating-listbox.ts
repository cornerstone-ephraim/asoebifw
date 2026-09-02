"use client";

import {
  type CSSProperties,
  type RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

export function useFloatingListbox({
  open,
  triggerRef,
  optionCount,
  maxHeight,
}: {
  open: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  optionCount: number;
  maxHeight: number;
}) {
  const [style, setStyle] = useState<CSSProperties>({});

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportPadding = 8;
    const gap = 8;
    const desiredHeight = Math.min(maxHeight, optionCount * 48 + 16);
    const spaceBelow = window.innerHeight - triggerRect.bottom - gap;
    const spaceAbove = triggerRect.top - gap;
    const placeAbove =
      spaceBelow < Math.min(desiredHeight, 160) && spaceAbove > spaceBelow;
    const availableHeight = Math.max(
      96,
      placeAbove ? spaceAbove - viewportPadding : spaceBelow - viewportPadding,
    );
    const renderedHeight = Math.min(desiredHeight, availableHeight);
    const width = Math.min(
      Math.max(triggerRect.width, 176),
      window.innerWidth - viewportPadding * 2,
    );
    const left = Math.min(
      Math.max(triggerRect.left, viewportPadding),
      window.innerWidth - width - viewportPadding,
    );

    setStyle({
      left,
      top: placeAbove
        ? Math.max(viewportPadding, triggerRect.top - gap - renderedHeight)
        : triggerRect.bottom + gap,
      width,
      maxHeight: renderedHeight,
    });
  }, [maxHeight, optionCount, triggerRef]);

  useEffect(() => {
    if (!open) return;

    const update = () => updatePosition();
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, updatePosition]);

  return { style, updatePosition };
}
