"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/content/client";
import { honeypotProps, useFormSubmit } from "@/components/useFormSubmit";
import { submitOrder } from "@/app/actions";

const fieldClass =
  "w-full rounded-xl border border-line bg-blush/60 px-4 py-3 text-sm outline-none focus:border-rose focus:bg-surface transition-colors";

const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);

export function CustomOrderForm() {
  const t = useT();
  const { pending, error, done, onSubmit } = useFormSubmit(submitOrder);

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="rounded-2xl border border-line bg-surface p-8 text-center"
      >
        <p className="text-lg font-medium text-accent">{t("forms.order.successTitle")}</p>
        <p className="text-muted text-sm mt-2">{t("forms.order.successText")}</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="company" label="نام شرکت / برند" placeholder="مثال: آریا افق پاسارگاد" autoComplete="organization" />
        <Field name="name" label="نام و سمت شما" placeholder="نام و نام خانوادگی" autoComplete="name" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="phone" label="شماره تماس" type="tel" placeholder="۰۹۱۲..." autoComplete="tel" ltr />
        <Field name="email" label="ایمیل" type="email" placeholder="you@company.com" autoComplete="email" ltr />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField name="service" label="نوع خدمت" options={lines(t("forms.order.services"))} />
        <SelectField name="volume" label="تیراژ تقریبی" options={lines(t("forms.order.volumes"))} />
      </div>
      <div>
        <label htmlFor="details" className="block text-sm mb-1.5 text-accent">
          توضیح پروژه
        </label>
        <textarea
          id="details"
          name="details"
          required
          rows={4}
          maxLength={4000}
          placeholder="هدف پروژه، مناسبت، سبک رایحه‌ی مدنظر و ددلاین را بنویسید..."
          className={fieldClass}
        />
      </div>
      <input {...honeypotProps} />
      {error && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary w-full justify-center disabled:opacity-60 disabled:pointer-events-none"
      >
        {pending ? "در حال ارسال…" : "ارسال درخواست"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  ltr,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  ltr?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm mb-1.5 text-accent">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        dir={ltr ? "ltr" : undefined}
        required
        className={`${fieldClass} ${ltr ? "text-right placeholder:text-right" : ""}`}
      />
    </div>
  );
}

function SelectField({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm mb-1.5 text-accent">
        {label}
      </label>
      <select id={name} name={name} className={fieldClass}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
