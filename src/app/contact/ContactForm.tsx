"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-line bg-surface p-8 text-center"
      >
        <p className="text-lg font-medium">پیام شما ارسال شد ✓</p>
        <p className="text-muted text-sm mt-2">تیم نیرا به‌زودی با شما تماس می‌گیرد.</p>
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
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1.5">نام و نام خانوادگی</label>
          <input
            required
            className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm mb-1.5">شماره تماس</label>
          <input
            type="tel"
            required
            className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1.5">موضوع</label>
        <input
          placeholder="خرید، همکاری، پشتیبانی..."
          className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-sm mb-1.5">پیام شما</label>
        <textarea
          required
          rows={4}
          className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-accent hover:bg-accent-dark transition-colors text-white px-6 py-3 text-sm"
      >
        ارسال پیام
      </button>
    </form>
  );
}
