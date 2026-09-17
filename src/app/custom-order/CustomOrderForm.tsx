"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function CustomOrderForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-line bg-surface p-8 text-center"
      >
        <p className="text-lg font-medium">درخواست شما ثبت شد ✓</p>
        <p className="text-muted text-sm mt-2">
          تیم نیرا ظرف ۴۸ ساعت با شما تماس می‌گیرد.
        </p>
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
        <Field label="نام شرکت / برند" placeholder="مثال: آریا افق پاسارگاد" />
        <Field label="نام و سمت شما" placeholder="نام و نام خانوادگی" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="شماره تماس" type="tel" placeholder="۰۹۱۲..." />
        <Field label="ایمیل" type="email" placeholder="you@company.com" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField
          label="نوع خدمت"
          options={[
            "عطر تبلیغاتی اختصاصی",
            "هدیه سازمانی نمایشگاهی",
            "راه‌اندازی خط تولید عطر برند",
            "سایر",
          ]}
        />
        <SelectField
          label="تیراژ تقریبی"
          options={["تا ۱۰۰ عدد", "۱۰۰ تا ۵۰۰ عدد", "۵۰۰ تا ۲۰۰۰ عدد", "بیش از ۲۰۰۰ عدد"]}
        />
      </div>
      <div>
        <label className="block text-sm mb-1.5">توضیح پروژه</label>
        <textarea
          required
          rows={4}
          placeholder="هدف پروژه، مناسبت، سبک رایحه‌ی مدنظر و ددلاین را بنویسید..."
          className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-accent hover:bg-accent-dark transition-colors text-white px-6 py-3 text-sm"
      >
        ارسال درخواست
      </button>
    </form>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
      />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block text-sm mb-1.5">{label}</label>
      <select className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm outline-none focus:border-accent">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
