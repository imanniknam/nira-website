"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="border-t border-line bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 flex flex-wrap items-center justify-between gap-6">
        <p className="text-sm text-muted max-w-md">
          همیشه اولین نفر باشید! برای اطلاع از آخرین تخفیف‌ها و جدیدترین کالاها در
          خبرنامه ثبت‌نام کنید.
        </p>

        {submitted ? (
          <span className="text-sm text-accent">عضویت شما ثبت شد ✓</span>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="flex gap-0 rounded-full border border-line overflow-hidden focus-within:border-accent transition-colors"
          >
            <input
              type="email"
              required
              placeholder="آدرس ایمیل خود را وارد کنید..."
              className="w-56 sm:w-72 bg-transparent px-4 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accent-dark transition-colors text-white px-5 py-2 text-sm whitespace-nowrap"
            >
              عضویت
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
