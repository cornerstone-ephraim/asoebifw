"use client";

import { useEffect, useRef, useState } from "react";
import { ReferenceSection } from "./reference-section";
import styles from "./reference.module.css";

const devices = [
  {
    name: "Mobile",
    width: 375,
    copy: "A single reading column. Copy leads, supporting content follows. Controls span the available width and keep their touch target size.",
  },
  {
    name: "Tablet",
    width: 768,
    copy: "Use available space for paired fields and small grids. Keep the hero in one column until there is room for a deliberate two-column composition.",
  },
  {
    name: "Desktop",
    width: 1280,
    copy: "The hero splits into an editorial headline and supporting copy. Wider gutters and bounded line lengths keep the page composed.",
  },
];
export function ResponsiveReference() {
  const [selected, setSelected] = useState(0);
  const [available, setAvailable] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const [canvasHeight, setCanvasHeight] = useState(740);
  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === element) setAvailable(entry.contentRect.width);
        else setCanvasHeight(entry.contentRect.height);
      }
    });
    observer.observe(element);
    if (canvas.current) observer.observe(canvas.current);
    return () => observer.disconnect();
  }, []);
  const device = devices[selected];
  const scale = available ? Math.min(1, available / device.width) : 1;
  return (
    <ReferenceSection
      id="responsive"
      title="Mobile. Tablet. Desktop."
      intro="Start with the smallest layout, then add space and columns where the content needs them. Device names are convenient examples; CSS breakpoints follow available width, not a particular device model."
      tone="mist"
    >
      <div className="mb-8 grid gap-5 md:grid-cols-3">
        {devices.map((device) => (
          <article key={device.name} className="rounded-3xl bg-white p-6">
            <h3 className="font-display text-3xl">{device.name}</h3>
            <p className="mt-2 text-sm font-bold text-brand">
              {device.width}px example viewport
            </p>
            <p className="mt-4 text-sm leading-6">{device.copy}</p>
          </article>
        ))}
      </div>
      <fieldset>
        <legend className="mb-3 text-sm font-bold">
          Choose a layout to inspect
        </legend>
        <div className="flex flex-wrap gap-3">
          {devices.map((device, index) => (
            <label
              key={device.name}
              className="flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-asoebi-purple-300 bg-white px-5 text-sm font-bold"
            >
              <input
                type="radio"
                name="ds-device"
                checked={index === selected}
                onChange={() => setSelected(index)}
                className="accent-brand"
              />
              {device.name}
            </label>
          ))}
        </div>
      </fieldset>
      <p role="status" className="my-5 text-sm">
        {device.name} · {device.width}px canvas · {Math.round(scale * 100)}%
        display scale. This is a layout specimen, not a live form.
      </p>
      <div
        ref={frame}
        className="overflow-hidden rounded-3xl border border-asoebi-purple-300 bg-asoebi-purple-100"
      >
        <div
          className="mx-auto"
          style={{ width: device.width * scale, height: canvasHeight * scale }}
        >
          <div
            ref={canvas}
            className={styles.preview}
            style={{
              width: device.width,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <div className={styles.previewContent}>
              <div className="mb-8 flex items-center justify-between border-b border-asoebi-purple-200 pb-4">
                <span className="font-display text-xl font-bold">AEFW.</span>
                <span className="text-sm">
                  {selected === 2
                    ? "Founders · Prize · Vendor · After Party"
                    : "Menu"}
                </span>
              </div>
              <div className={styles.previewGrid}>
                <p className={styles.previewTitle}>
                  Be part of what comes next.
                </p>
                <p className="text-base leading-7">
                  Help create a bigger stage for Asoebi fashion, creative talent
                  and the culture that brings us together.
                </p>
              </div>
              <div className={styles.previewFields}>
                <div className={styles.previewField}>Full name</div>
                <div className={styles.previewField}>Organisation</div>
              </div>
              <div className="mt-4 rounded-full bg-asoebi-purple-950 px-6 py-4 text-center text-sm font-bold text-white">
                Send enquiry
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl">Breakpoints in use</h3>
          <p className="mt-3 leading-7">
            Base styles apply first. sm starts at 640px, md at 768px, lg at
            1024px and xl at 1280px. The sponsorship form pairs fields from sm;
            the statement hero splits from lg. This specimen uses the same
            thresholds inside its own container.
          </p>
        </div>
        <div>
          <h3 className="font-display text-2xl">
            Verify behaviour, not just width
          </h3>
          <p className="mt-3 leading-7">
            Check long labels, validation messages, image focal points, keyboard
            order and 200% zoom. Content must remain readable without page-wide
            horizontal scrolling. The swatch matrix may scroll within its own
            frame.
          </p>
        </div>
      </div>
    </ReferenceSection>
  );
}
