"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function LoginForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-line bg-surface p-8 text-center"
      >
        <p className="text-lg font-medium">خوش آمدید ✓</p>
        <p className="text-muted text-sm mt-2">ورود شما با موفقیت انجام شد.</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-4"
    >
      <div>
        <label className="block text-sm mb-1.5">شماره موبایل</label>
        <input
          type="tel"
          required
          placeholder="۰۹۱۲..."
          className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-sm mb-1.5">رمز عبور</label>
        <input
          type="password"
          required
          className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-accent hover:bg-accent-dark transition-colors text-white px-6 py-3 text-sm"
      >
        ورود
      </button>
    </form>
  );
}
