"use client";

import { useState } from "react";
import { changePasswordAction } from "../../actions";
import { Field, btnPrimary, inputCls } from "../../ui";

export function PasswordForm() {
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [again, setAgain] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (next !== again) return setMsg({ ok: false, text: "تکرار رمز جدید یکسان نیست." });
    setBusy(true);
    try {
      const res = await changePasswordAction(cur, next);
      if (res.ok) {
        setMsg({ ok: true, text: "رمز عبور تغییر کرد." });
        setCur("");
        setNext("");
        setAgain("");
      } else setMsg({ ok: false, text: res.error });
    } catch {
      setMsg({ ok: false, text: "تغییر رمز ناموفق بود." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="رمز فعلی">
        <input type="password" required value={cur} onChange={(e) => setCur(e.target.value)} autoComplete="current-password" dir="ltr" className={`${inputCls} text-left`} />
      </Field>
      <Field label="رمز جدید (حداقل ۸ نویسه)">
        <input type="password" required minLength={8} value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" dir="ltr" className={`${inputCls} text-left`} />
      </Field>
      <Field label="تکرار رمز جدید">
        <input type="password" required value={again} onChange={(e) => setAgain(e.target.value)} autoComplete="new-password" dir="ltr" className={`${inputCls} text-left`} />
      </Field>
      {msg && (
        <p role="status" className={`text-sm rounded-lg px-3 py-2 ${msg.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>
          {msg.text}
        </p>
      )}
      <button type="submit" disabled={busy} className={btnPrimary}>
        {busy ? "در حال ذخیره…" : "تغییر رمز"}
      </button>
    </form>
  );
}
