"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { productCategoryLabels, type Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { Icon } from "@/components/Icon";
import { useT } from "@/lib/content/client";
import { priceLabel } from "@/lib/price";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const t = useT();
  const [added, setAdded] = useState(false);
  const price = priceLabel(product, `${t("pricing.min")} تا ${t("pricing.max")} ${t("pricing.unit")}`);

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
          {product.badge && (
            <span className="absolute top-3 right-3 z-10 rounded-full bg-accent text-white text-[11px] px-3 py-1">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <span className="absolute top-3 left-3 z-10 rounded-full bg-white/90 text-muted text-[11px] px-3 py-1">
              ناموجود
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1 text-center">
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-sm font-medium text-accent leading-6">{product.name}</h3>
          </Link>
          <span className="text-xs text-muted mt-1">
            عطر {productCategoryLabels[product.category]}
          </span>

          <p className="text-xs text-accent mt-2">{price}</p>

          <div className="mt-auto pt-4">
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
            className="w-full rounded-full bg-accent hover:bg-accent-dark transition-colors text-white py-2.5 text-xs flex items-center justify-center gap-2"
          >
            <Icon name={added ? "check" : "bag"} className="w-4 h-4" />
            {added ? "افزوده شد" : "درخواست خرید"}
          </motion.button>
          </div>
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
