"use client";

import {
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
  useRef,
} from "react";

type OtpInputProps = {
  id: string;
  label: string;
  value: string;
  changeAction: (value: string) => void;
  length?: number;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
  autoFocus?: boolean;
};

function digitsOnly(value: string, length: number) {
  return value.replace(/\D/g, "").slice(0, length);
}

export function OtpInput({
  id,
  label,
  value,
  changeAction,
  length = 6,
  disabled = false,
  invalid = false,
  describedBy,
  autoFocus = false,
}: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, index) => value[index] ?? "");

  const focusInput = (index: number) => {
    inputRefs.current[Math.max(0, Math.min(index, length - 1))]?.focus();
  };

  const insertDigits = (rawValue: string, startIndex: number) => {
    const incoming = digitsOnly(rawValue, length - startIndex);
    if (!incoming) return;

    const next = [...digits];
    incoming.split("").forEach((digit, offset) => {
      next[startIndex + offset] = digit;
    });
    changeAction(next.join(""));
    focusInput(Math.min(startIndex + incoming.length, length - 1));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const incoming = digitsOnly(event.target.value, length);

    if (incoming.length > 1) {
      insertDigits(incoming, index);
      return;
    }

    const next = [...digits];
    next[index] = incoming;
    changeAction(next.join(""));

    if (incoming && index < length - 1) focusInput(index + 1);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const next = [...digits];

      if (next[index]) {
        next[index] = "";
      } else if (index > 0) {
        next[index - 1] = "";
        focusInput(index - 1);
      }

      changeAction(next.join(""));
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusInput(index - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (
    event: ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    event.preventDefault();
    insertDigits(event.clipboardData.getData("text"), index);
  };

  return (
    <fieldset aria-describedby={describedBy} aria-invalid={invalid}>
      <legend className="block text-sm font-bold">{label}</legend>
      <div className="mt-3 grid grid-cols-6 gap-2 sm:gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            id={`${id}-${index + 1}`}
            name={`${id}-${index + 1}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={index === 0 ? length : 1}
            required
            disabled={disabled}
            autoFocus={autoFocus && index === 0}
            value={digit}
            aria-label={`${label}, digit ${index + 1} of ${length}`}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onPaste={(event) => handlePaste(event, index)}
            className={`transition-linear aspect-square min-w-0 rounded-xl border bg-white text-center text-xl font-black text-asoebi-purple-950 outline-hidden transition-colors focus-visible:border-asoebi-gold-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asoebi-purple-950 disabled:opacity-60 sm:rounded-2xl sm:text-2xl ${invalid ? "border-red-700" : "border-asoebi-purple-300"}`}
          />
        ))}
      </div>
    </fieldset>
  );
}
