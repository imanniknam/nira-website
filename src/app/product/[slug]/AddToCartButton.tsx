"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 rounded-full border border-line px-4 py-2">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="text-lg leading-none w-5"
          aria-label="کاهش تعداد"
        >
          −
        </button>
        <span className="w-5 text-center text-sm">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="text-lg leading-none w-5"
          aria-label="افزایش تعداد"
        >
          +
        </button>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          addItem(
            {
              slug: product.slug,
              name: product.name,
              brand: product.brand,
              image: product.image,
              price: product.price,
            },
            qty
          );
          setAdded(true);
          setTimeout(() => setAdded(false), 1800);
        }}
        className="flex-1 rounded-full bg-accent hover:bg-accent-dark transition-colors text-white px-6 py-3 text-sm relative overflow-hidden text-center"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={added ? "added" : "add"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="block"
          >
            {added ? "به سبد اضافه شد ✓" : "افزودن به سبد خرید"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
