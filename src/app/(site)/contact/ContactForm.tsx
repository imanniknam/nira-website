"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/Icon";
import { useT } from "@/lib/content/client";
import { honeypotProps, useFormSubmit } from "@/components/useFormSubmit";
import { submitContact } from "@/app/actions";

const inputClass =
  "w-full rounded-xl border border-line bg-blush/60 px-5 py-3.5 text-sm outline-none placeholder:text-muted/80 focus:border-rose focus:bg-surface transition-colors";

export function ContactForm() {
  const t = useT();
  const { pending, error, done, onSubmit } = useFormSubmit(submitContact);

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="rounded-2xl border border-line bg-surface p-8 text-center"
      >
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blush text-accent">
          <Icon name="check" className="w-6 h-6" />
        </span>
        <p className="text-lg font-medium text-accent mt-4">{t("forms.contact.successTitle")}</p>
        <p className="text-muted text-sm mt-2">{t("forms.contact.successText")}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3.5">
      <input name="name" required maxLength={120} placeholder="نام و نام خانوادگی" aria-label="نام و نام خانوادگی" autoComplete="name" className={inputClass} />
      <input
        name="email"
        type="email"
        required
        maxLength={160}
        dir="ltr"
        placeholder="ایمیل"
        aria-label="ایمیل"
        autoComplete="email"
        className={`${inputClass} text-right placeholder:text-right`}
      />
      <textarea
        name="message"
        required
        rows={5}
        maxLength={4000}
        placeholder="پیام شما"
        aria-label="پیام شما"
        className={inputClass}
      />
      <input {...honeypotProps} />
      {error && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60 disabled:pointer-events-none">
        {pending ? "در حال ارسال…" : "ارسال پیام"}
        <Icon name="arrow" className="w-4 h-4" />
      </button>
    </form>
  );
}
