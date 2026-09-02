"use client";

import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { OtpInput } from "@/components/ui/otp-input";
import {
  adminAccounts,
  getAdminAccount,
  type AdminAccountId,
} from "@/features/admin/admin-accounts";
import { authClient } from "@/lib/auth-client";

type Step = "account" | "code";
type Message = { text: string; tone: "error" | "success" };

export function AdminSignInForm() {
  const router = useRouter();
  const [accountId, setAccountId] = useState<AdminAccountId | "">("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<Step>("account");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const account = getAdminAccount(accountId);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = window.setInterval(() => {
      setResendCooldown((current) => Math.max(0, current - 1));
    }, 1_000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  async function sendCode() {
    if (!account) {
      setMessage({ text: "Choose an account to continue.", tone: "error" });
      return false;
    }

    setPending(true);
    setMessage(null);

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: account.email,
      type: "sign-in",
    });

    setPending(false);

    if (error) {
      setMessage({
        text: "We could not send a sign-in code to this account.",
        tone: "error",
      });
      return false;
    }

    setResendCooldown(30);
    return true;
  }

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const sent = await sendCode();

    if (!sent || !account) return;
    setStep("code");
    setMessage({
      text: `A six-digit code was sent to ${account.name}'s email.`,
      tone: "success",
    });
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!account || code.length !== 6) {
      setMessage({ text: "Enter the complete six-digit code.", tone: "error" });
      return;
    }

    setPending(true);
    setMessage(null);

    const { error } = await authClient.signIn.emailOtp({
      email: account.email,
      otp: code,
      name: account.name,
    });

    setPending(false);

    if (error) {
      setMessage({
        text: "That code is invalid or has expired.",
        tone: "error",
      });
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={step === "account" ? requestCode : verifyCode}
      className="mt-10 space-y-6"
      noValidate
    >
      {step === "account" && (
        <fieldset>
          <legend className="text-sm font-bold">Who is signing in?</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {adminAccounts.map((adminAccount) => (
              <label
                key={adminAccount.id}
                className="transition-linear group relative cursor-pointer rounded-2xl border border-asoebi-purple-200 bg-white p-4 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-asoebi-purple-950 hover:border-asoebi-purple-600 has-checked:border-asoebi-purple-950 has-checked:bg-asoebi-mist"
              >
                <input
                  type="radio"
                  name="admin-account"
                  value={adminAccount.id}
                  checked={accountId === adminAccount.id}
                  onChange={() => {
                    setAccountId(adminAccount.id);
                    setMessage(null);
                  }}
                  className="sr-only"
                />
                <span className="block font-bold text-asoebi-purple-950">
                  {adminAccount.name}
                </span>
                <span className="mt-1 block text-xs text-asoebi-muted">
                  {adminAccount.emailHint}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-4 size-4 rounded-full border border-asoebi-purple-400 bg-white group-has-checked:border-4 group-has-checked:border-asoebi-purple-950"
                />
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === "code" && (
        <OtpInput
          id="admin-code"
          label="Six-digit code"
          value={code}
          changeAction={setCode}
          disabled={pending}
          invalid={message?.tone === "error"}
          describedBy={message ? "admin-sign-in-message" : undefined}
          autoFocus
        />
      )}

      {message && (
        <p
          id="admin-sign-in-message"
          role={message.tone === "error" ? "alert" : "status"}
          className={`text-sm font-semibold ${message.tone === "error" ? "text-red-700" : "text-emerald-800"}`}
        >
          {message.text}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || (step === "account" && !accountId)}
        className="transition-linear min-h-13 w-full rounded-full bg-asoebi-gold-500 px-6 text-sm font-black tracking-[.08em] text-asoebi-purple-950 uppercase transition-colors hover:bg-asoebi-gold-400 disabled:cursor-not-allowed disabled:opacity-65"
      >
        {pending
          ? "Please wait"
          : step === "account"
            ? "Send sign-in code"
            : "Enter admin area"}
      </button>

      {step === "code" && (
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <button
            type="button"
            disabled={pending || resendCooldown > 0}
            onClick={async () => {
              const sent = await sendCode();
              if (sent) {
                setMessage({
                  text: "A new sign-in code has been sent.",
                  tone: "success",
                });
              }
            }}
            className="transition-linear min-h-11 text-sm font-bold text-asoebi-purple-800 underline-offset-4 transition-colors hover:text-asoebi-purple-950 hover:underline disabled:cursor-not-allowed disabled:text-asoebi-muted disabled:no-underline"
          >
            {resendCooldown > 0
              ? `Resend code in ${resendCooldown}s`
              : "Resend code"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("account");
              setCode("");
              setMessage(null);
              setResendCooldown(0);
            }}
            className="transition-linear min-h-11 text-sm font-bold text-asoebi-purple-800 underline-offset-4 transition-colors hover:text-asoebi-purple-950 hover:underline"
          >
            Choose another account
          </button>
        </div>
      )}
    </form>
  );
}
