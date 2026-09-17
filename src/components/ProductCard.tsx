"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { formatPrice, getDiscountPercent } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const discount = getDiscountPercent(product);

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
      <Link
        href={`/product/${product.slug}`}
        className="group block rounded-2xl border border-line bg-surface overflow-hidden"
      >
        <div className="relative aspect-square bg-white">
          {discount > 0 && (
            <span className="absolute top-3 left-3 z-10 rounded-full bg-[#D60644] px-2.5 py-1 text-xs text-white">
              ٪{discount.toLocaleString("fa-IR")} تخفیف
            </span>
          )}
          {product.badge && (
            <span className="absolute top-3 right-3 z-10 rounded-full bg-accent px-2.5 py-1 text-xs text-white">
              {product.badge}
            </span>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <span className="text-xs tracking-wide text-muted">{product.brand}</span>
          <h3 className="font-medium mt-1 text-sm">{product.name}</h3>
          <span
            className={`inline-block mt-2 text-[11px] rounded-full px-2 py-0.5 ${
              product.packaging === "اورجینال"
                ? "bg-background text-muted border border-line"
                : "bg-accent/10 text-accent"
            }`}
          >
            {product.packaging === "اورجینال" ? "پک اورجینال" : "پک بازرگانی نیرا"}
          </span>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-xs text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-sm">
                {formatPrice(product.price)}
                <small className="text-muted text-xs mr-1">تومان</small>
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                addItem({
                  slug: product.slug,
                  name: product.name,
                  brand: product.brand,
                  image: product.image,
                  price: product.price,
                });
                setAdded(true);
                setTimeout(() => setAdded(false), 1200);
              }}
              className="w-7 h-7 rounded-full bg-accent hover:bg-accent-dark transition-colors text-white flex items-center justify-center text-sm"
              aria-label="افزودن به سبد خرید"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={added ? "ok" : "plus"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                >
                  {added ? "✓" : "+"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
