import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getProducts } from "@/lib/db";
import { decodeSlug } from "@/lib/data";
import type { Product } from "@/lib/types";
import { ProductEditor } from "./ProductEditor";

const blank: Product = {
  id: "",
  slug: "",
  brand: "NIRA",
  name: "",
  category: "unisex",
  price: 0,
  packaging: "بازرگانی نیرا",
  inStock: true,
  published: true,
  image: "",
  gallery: [],
  volume: "۵۰ میلی‌لیتر",
  sizes: ["۵۰ میلی‌لیتر"],
  qualities: [],
  concentration: "ادو پرفیوم",
  origin: "ساخت ایران",
  perfumer: "تیم عطرسازی نیرا",
  longevity: "بالا",
  season: "همه فصول",
  notes: { top: "", middle: "", base: "" },
  description: "",
};

export default async function ProductEdit({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const slug = decodeSlug((await params).slug);
  const isNew = slug === "new";
  const product = isNew ? blank : (await getProducts()).find((p) => p.slug === slug);
  if (!product) notFound();
  return <ProductEditor initial={{ ...product, published: product.published !== false }} isNew={isNew} />;
}
