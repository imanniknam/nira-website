"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { useT } from "@/lib/content/client";
import { formatToman } from "@/lib/price";
import { honeypotProps, useFormSubmit } from "@/components/useFormSubmit";
import { submitCartRequest } from "@/app/actions";

const inputClass =
  "w-full rounded-xl border border-line bg-blush/60 px-4 py-3 text-sm outline-none placeholder:text-muted/80 focus:border-rose focus:bg-surface transition-colors";

export function CartView() {
  const { items, removeItem, setQty, totalCount, clear, hydrated } = useCart();
  const t = useT();
  const { pending, error, done, onSubmit } = useFormSubmit(submitCartRequest, clear);
  const priced = items.length > 0 && items.every((i) => (i.price ?? 0) > 0);
  const total = items.reduce((sum, i) => sum + (i.price ?? 0) * i.qty, 0);

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="rounded-2xl border border-line bg-surface p-10 text-center max-w-md mx-auto"
      >
        <p className="text-lg font-medium text-accent">{t("cart.successTitle")}</p>
        <p className="text-muted text-sm mt-2 leading-7">{t("cart.successText")}</p>
        <Link href="/shop" className="btn btn-primary mt-6">
          بازگشت به فروشگاه
        </Link>
      </motion.div>
    );
  }

  // Avoid flashing the "empty" state while the saved cart is still loading.
  if (!hydrated) return <div className="min-h-[200px]" aria-busy="true" />;

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted">{t("cart.empty")}</p>
        <Link href="/shop" className="btn btn-outline mt-6">
          مشاهده فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[1fr_340px] gap-8">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.slug}
            className="flex gap-4 rounded-2xl border border-line bg-surface p-4"
          >
            <Link
              href={`/product/${item.slug}`}
              className="relative w-20 h-20 rounded-xl bg-blush border border-line overflow-hidden flex-none"
            >
              <Image src={item.image} alt={item.name} fill sizes="80px" className="object-contain p-1.5" />
            </Link>
            <div className="flex-1 min-w-0">
              <span className="text-xs text-muted">{item.brand}</span>
              <h3 className="font-medium text-sm truncate">{item.name}</h3>
              {(item.price ?? 0) > 0 && (
                <p className="text-xs text-accent mt-1">
                  {formatToman(item.price! * item.qty)}
                  {item.qty > 1 && <span className="text-muted"> ({formatToman(item.price!)} × {item.qty.toLocaleString("fa-IR")})</span>}
                </p>
              )}
              <div className="flex items-center mt-2">
                <div className="flex items-center gap-3 rounded-full border border-line px-3 py-1">
                  <button
                    type="button"
                    onClick={() => setQty(item.slug, item.qty - 1)}
                    disabled={item.qty <= 1}
                    className="text-sm leading-none w-4 disabled:opacity-30"
                    aria-label="کاهش تعداد"
                  >
                    −
                  </button>
                  <span className="w-4 text-center text-xs">{item.qty.toLocaleString("fa-IR")}</span>
                  <button
                    type="button"
                    onClick={() => setQty(item.slug, item.qty + 1)}
                    className="text-sm leading-none w-4"
                    aria-label="افزایش تعداد"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.slug)}
              aria-label="حذف از سبد"
              className="text-muted hover:text-accent transition-colors self-start"
            >
              ✕
            </button>
          </div>
        ))}

        <button type="button" onClick={clear} className="text-xs text-muted hover:text-accent transition-colors">
          خالی کردن لیست
        </button>
      </div>

      <form
        onSubmit={(e) =>
          onSubmit(e, { items: JSON.stringify(items.map((i) => ({ slug: i.slug, name: i.name, qty: i.qty }))) })
        }
        className="rounded-2xl border border-line bg-surface p-6 h-fit space-y-4"
      >
        <h3 className="font-medium text-accent">خلاصه درخواست</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">تعداد اقلام</span>
          <span>{totalCount.toLocaleString("fa-IR")}</span>
        </div>
        {priced && (
          <div className="flex items-center justify-between text-sm border-t border-line pt-3">
            <span className="text-accent font-medium">جمع کل</span>
            <b className="text-accent">{formatToman(total)}</b>
          </div>
        )}
        <p className="text-xs text-muted leading-6">{t("cart.note")}</p>

        <input name="name" required maxLength={120} autoComplete="name" placeholder="نام و نام خانوادگی" aria-label="نام و نام خانوادگی" className={inputClass} />
        <input
          name="phone"
          type="tel"
          required
          dir="ltr"
          autoComplete="tel"
          placeholder="شماره موبایل (۰۹۱۲...)"
          aria-label="شماره موبایل"
          className={`${inputClass} text-right placeholder:text-right`}
        />
        <textarea name="note" rows={2} maxLength={1000} placeholder="توضیحات (اختیاری)" aria-label="توضیحات" className={inputClass} />
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
          {pending ? "در حال ثبت…" : t("cart.submit")}
        </button>
      </form>
    </div>
  );
}
