"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { categoryLabels, formatPrice, getDiscountPercent } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { Icon } from "@/components/Icon";

/**
 * Placeholder score so the card can carry the star row from the design. It is
 * derived from the slug, so a product always shows the same value — swap this
 * for a real average once reviews are stored.
 */
function placeholderRating(slug: string) {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) % 1000;
  return 4 + (hash % 10) / 10;
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5 text-rose">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon
          key={i}
          name="star"
          filled={i < Math.round(value)}
          className={`w-3.5 h-3.5 ${i < Math.round(value) ? "" : "text-rose-soft"}`}
        />
      ))}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const discount = getDiscountPercent(product);
  const rating = placeholderRating(product.slug);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="h-full"
    >
      <div className="group h-full flex flex-col rounded-2xl bg-surface border border-line overflow-hidden transition-shadow duration-300 hover:shadow-[0_22px_45px_-30px_rgba(122,34,88,0.6)]">
        <div className="relative aspect-square bg-blush">
          <Link href={`/product/${product.slug}`} className="absolute inset-0 block">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
          {discount > 0 && (
            <span className="absolute top-3 right-3 z-10 rounded-full bg-rose px-2.5 py-1 text-[11px] text-white">
              ٪{discount.toLocaleString("fa-IR")} تخفیف
            </span>
          )}
          <button
            onClick={() => setLiked((v) => !v)}
            aria-label="افزودن به علاقه‌مندی‌ها"
            aria-pressed={liked}
            className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-white/85 backdrop-blur flex items-center justify-center text-accent hover:text-rose transition-colors"
          >
            <Icon name="heart" filled={liked} className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 flex flex-col flex-1 text-center">
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-sm font-medium text-accent leading-6">{product.name}</h3>
          </Link>
          <span className="text-xs text-muted mt-1">
            عطر {categoryLabels[product.category]}
          </span>

          <div className="flex items-center justify-center gap-2 mt-2">
            <Stars value={rating} />
            <span className="text-[11px] text-muted">
              ({rating.toLocaleString("fa-IR", { minimumFractionDigits: 1 })})
            </span>
          </div>

          <div className="mt-2">
            {product.originalPrice && (
              <span className="block text-[11px] text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm font-bold text-accent">
              {formatPrice(product.price)}
              <small className="font-normal text-muted text-xs mr-1">تومان</small>
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              addItem({
                slug: product.slug,
                name: product.name,
                brand: product.brand,
                image: product.image,
                price: product.price,
              });
              setAdded(true);
              setTimeout(() => setAdded(false), 1400);
            }}
            className="mt-4 w-full rounded-full bg-accent hover:bg-accent-dark transition-colors text-white py-2.5 text-xs flex items-center justify-center gap-2"
          >
            <Icon name={added ? "check" : "bag"} className="w-4 h-4" />
            {added ? "افزوده شد" : "افزودن به سبد"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/** Quiet variant used by the home-page collection row: artwork, name, arrow. */
export function CollectionCard({
  href,
  image,
  title,
}: {
  href: string;
  image: string;
  title: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-blush">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between mt-3 px-1">
        <b className="text-sm font-medium text-accent">{title}</b>
        <Icon
          name="arrow"
          className="w-4 h-4 text-rose transition-transform duration-300 group-hover:-translate-x-1"
        />
      </div>
    </Link>
  );
}
