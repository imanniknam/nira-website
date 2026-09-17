"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/Icon";

const inputClass =
  "w-full rounded-xl border border-line bg-blush/60 px-5 py-3.5 text-sm outline-none placeholder:text-muted/80 focus:border-rose focus:bg-surface transition-colors";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-line bg-surface p-8 text-center"
      >
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blush text-accent">
          <Icon name="check" className="w-6 h-6" />
        </span>
        <p className="text-lg font-medium text-accent mt-4">پیام شما ارسال شد</p>
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
      className="space-y-3.5"
    >
      <input required placeholder="نام و نام خانوادگی" aria-label="نام و نام خانوادگی" className={inputClass} />
      <input
        type="email"
        required
        placeholder="ایمیل"
        aria-label="ایمیل"
        className={inputClass}
      />
      <textarea
        required
        rows={5}
        placeholder="پیام شما"
        aria-label="پیام شما"
        className={inputClass}
      />
      <button type="submit" className="btn btn-primary">
        ارسال پیام
        <Icon name="arrow" className="w-4 h-4" />
      </button>
    </form>
  );
}
