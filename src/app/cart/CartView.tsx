"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

export function CartView() {
  const { items, removeItem, setQty, totalPrice, clear } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  if (checkedOut) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-line bg-surface p-10 text-center max-w-md mx-auto"
      >
        <p className="text-lg font-medium text-accent">سفارش شما ثبت شد ✓</p>
        <p className="text-muted text-sm mt-2">
          همکاران ما به‌زودی برای هماهنگی ارسال با شما تماس می‌گیرند.
        </p>
        <Link
          href="/shop"
          className="btn btn-primary mt-6"
        >
          بازگشت به فروشگاه
        </Link>
      </motion.div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted">سبد خرید شما خالی است.</p>
        <Link
          href="/shop"
          className="btn btn-outline mt-6"
        >
          مشاهده فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[1fr_320px] gap-8">
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
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 rounded-full border border-line px-3 py-1">
                  <button
                    onClick={() => setQty(item.slug, item.qty - 1)}
                    className="text-sm leading-none w-4"
                    aria-label="کاهش تعداد"
                  >
                    −
                  </button>
                  <span className="w-4 text-center text-xs">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.slug, item.qty + 1)}
                    className="text-sm leading-none w-4"
                    aria-label="افزایش تعداد"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm">
                  {formatPrice(item.price * item.qty)}
                  <small className="text-muted text-xs mr-1">تومان</small>
                </span>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.slug)}
              aria-label="حذف از سبد"
              className="text-muted hover:text-accent transition-colors self-start"
            >
              ✕
            </button>
          </div>
        ))}

        <button onClick={clear} className="text-xs text-muted hover:text-accent transition-colors">
          خالی کردن سبد خرید
        </button>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6 h-fit space-y-4">
        <h3 className="font-medium text-accent">خلاصه سفارش</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">جمع کل</span>
          <span>
            {formatPrice(totalPrice)}
            <small className="text-muted text-xs mr-1">تومان</small>
          </span>
        </div>
        <button
          onClick={() => setCheckedOut(true)}
          className="btn btn-primary w-full justify-center"
        >
          ثبت سفارش
        </button>
      </div>
    </div>
  );
}
