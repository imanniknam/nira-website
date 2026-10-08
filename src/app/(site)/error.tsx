"use client";

import Link from "next/link";

export default function SiteError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="bg-blush">
      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-24 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-accent">مشکلی پیش آمد</h1>
        <p className="text-muted mt-4 leading-8 text-sm">
          بارگذاری این صفحه با خطا روبه‌رو شد. دوباره تلاش کنید یا به صفحه اصلی برگردید.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button onClick={reset} className="btn btn-primary">
            تلاش دوباره
          </button>
          <Link href="/" className="btn btn-outline">
            صفحه اصلی
          </Link>
        </div>
      </div>
    </section>
  );
}
