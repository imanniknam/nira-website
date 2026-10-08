"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import { btnPrimary, inputCls } from "../ui";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);
  return (
    <form action={action} className="rounded-2xl bg-white border border-line p-6 space-y-4 shadow-sm">
      <div>
        <label htmlFor="username" className="block text-xs font-medium text-accent mb-1.5">
          نام کاربری
        </label>
        <input id="username" name="username" required autoFocus defaultValue={state?.username ?? ""} autoComplete="username" dir="ltr" className={`${inputCls} text-left`} />
      </div>
      <div>
        <label htmlFor="password" className="block text-xs font-medium text-accent mb-1.5">
          رمز عبور
        </label>
        <input id="password" name="password" type="password" required autoComplete="current-password" dir="ltr" className={`${inputCls} text-left`} />
      </div>
      {state?.error && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={`${btnPrimary} w-full`}>
        {pending ? "در حال ورود…" : "ورود"}
      </button>
    </form>
  );
}
