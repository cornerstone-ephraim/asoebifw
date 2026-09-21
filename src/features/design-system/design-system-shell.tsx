"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import { DocumentOutline } from "./document-outline";
import styles from "./documentation.module.css";
import { DesignSystemNav } from "./design-system-nav";

export function DesignSystemShell({ children }: { children: ReactNode }) {
  const [width, setWidth] = useState(256);
  const [collapsed, setCollapsed] = useState(false);
  const drag = useRef<{ x: number; width: number } | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("asoebi-design-sidebar") ?? "null",
        );
        if (
          saved &&
          typeof saved.width === "number" &&
          Number.isFinite(saved.width)
        ) {
          setWidth(Math.min(400, Math.max(220, saved.width)));
          setCollapsed(saved.collapsed === true);
        }
      } catch {
        /* Storage is optional. */
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  function update(nextWidth: number, nextCollapsed = collapsed) {
    const bounded = Math.min(400, Math.max(220, nextWidth));
    setWidth(bounded);
    setCollapsed(nextCollapsed);
    try {
      localStorage.setItem(
        "asoebi-design-sidebar",
        JSON.stringify({ width: bounded, collapsed: nextCollapsed }),
      );
    } catch {
      /* Keep controls usable when storage is unavailable. */
    }
  }
  return (
    <div
      className={`${styles.root} min-h-screen bg-white text-asoebi-purple-950`}
    >
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-asoebi-purple-100 bg-white px-5 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            aria-controls="design-system-sidebar"
            onClick={() => update(width, !collapsed)}
            className="hidden size-11 shrink-0 items-center justify-center rounded-xl border border-asoebi-purple-100 hover:bg-asoebi-mist lg:inline-flex"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="2" y="3" width="16" height="14" rx="2" />
              <path d="M7 3v14" />
              <path d={collapsed ? "m11 7 3 3-3 3" : "m14 7-3 3 3 3"} />
            </svg>
          </button>
          <Link
            href="/internal/design-system"
            className="font-display text-xl font-bold tracking-tight"
          >
            Asoebi{" "}
            <span className="font-sans text-xs font-normal text-asoebi-graphite sm:text-sm">
              / Design system
            </span>
          </Link>
        </div>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4"
        >
          Website <span aria-hidden="true">↗</span>
        </Link>
      </header>
      <div
        style={
          { "--sidebar-width": `${collapsed ? 0 : width}px` } as CSSProperties
        }
        className="mx-auto max-w-480 lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)]"
      >
        <DesignSystemNav collapsed={collapsed}>
          <div
            role="separator"
            aria-label="Resize sidebar"
            aria-orientation="vertical"
            aria-valuemin={220}
            aria-valuemax={400}
            aria-valuenow={width}
            aria-controls="design-system-sidebar"
            tabIndex={0}
            onKeyDown={(event) => {
              const values: Record<string, number> = {
                ArrowLeft: width - 16,
                ArrowRight: width + 16,
                Home: 220,
                End: 400,
              };
              if (event.key in values) {
                event.preventDefault();
                update(values[event.key]);
              }
            }}
            onDoubleClick={() => update(256)}
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              event.preventDefault();
              drag.current = { x: event.clientX, width };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (drag.current)
                update(drag.current.width + event.clientX - drag.current.x);
            }}
            onPointerUp={() => {
              drag.current = null;
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
            onLostPointerCapture={() => {
              drag.current = null;
            }}
            className="absolute top-0 right-0 bottom-0 z-10 w-2 cursor-col-resize touch-none hover:bg-asoebi-purple-300 focus-visible:bg-asoebi-purple-300 focus-visible:outline-2 focus-visible:outline-brand"
          />
        </DesignSystemNav>
        <div className={styles.workspace}>
          <div className={styles.layout}>
            <main id="main-content" tabIndex={-1} className={styles.content}>
              {children}
            </main>
            <aside className={styles.outline}>
              <DocumentOutline />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
