"use client";

import { useState, type FormEvent } from "react";
import type { FormResult } from "@/app/actions";

/** Shared submit handling for the public forms: pending state, server error, success flag. */
export function useFormSubmit(
  action: (form: FormData) => Promise<FormResult>,
  onSuccess?: () => void,
) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>, extra?: Record<string, string>) {
    e.preventDefault();
    if (pending) return;
    const form = new FormData(e.currentTarget);
    for (const [k, v] of Object.entries(extra ?? {})) form.set(k, v);
    setPending(true);
    setError("");
    try {
      const res = await action(form);
      if (res.ok) {
        setDone(true);
        onSuccess?.();
      } else setError(res.error);
    } catch {
      setError("ارسال انجام نشد. اتصال اینترنت را بررسی و دوباره تلاش کنید.");
    } finally {
      setPending(false);
    }
  }

  return { pending, error, done, onSubmit };
}

/** Hidden trap field for bots; real visitors never see or fill it. */
export const honeypotProps = {
  name: "website",
  tabIndex: -1,
  autoComplete: "off",
  "aria-hidden": true,
  className: "absolute -left-[9999px] h-0 w-0 opacity-0",
} as const;
