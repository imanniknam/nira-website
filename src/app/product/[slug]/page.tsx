import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoryLabels,
  formatPrice,
  getDiscountPercent,
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";
import { ProductTabs } from "./ProductTabs";
import { AddToCartButton } from "./AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  // Next.js 16 passes this dynamic segment still percent-encoded when it
  // contains non-ASCII characters, so decode it before matching.
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    // rawSlug wasn't encoded; use as-is.
  }
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug);

  return (
    <div>
      <div className="border-b border-line bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 text-sm text-muted">
          <Link href="/" className="hover:text-accent">
            خانه
          </Link>{" "}
          /{" "}
          <Link href="/shop" className="hover:text-accent">
            فروشگاه
          </Link>{" "}
          / <span>{product.name}</span>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-14 grid md:grid-cols-2 gap-12">
        <FadeUp>
          <div className="relative aspect-square rounded-2xl bg-white border border-line overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8"
              priority
            />
          </div>
          {product.gallery.length > 0 && (
            <div className="flex gap-3 mt-4">
              {product.gallery.map((src) => (
                <div
                  key={src}
                  className="relative w-20 h-20 rounded-xl border border-line bg-white overflow-hidden flex-none"
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </FadeUp>

        <FadeUp delay={0.1}>
          <span className="text-accent text-sm">{product.brand}</span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2">{product.name}</h1>
          <p className="text-muted text-sm mt-2">
            {categoryLabels[product.category]} · {product.concentration} ·{" "}
            {product.volume} · {product.origin}
          </p>
          <span
            className={`inline-block mt-3 text-xs rounded-full px-3 py-1 ${
              product.packaging === "اورجینال"
                ? "bg-background text-muted border border-line"
                : "bg-accent/10 text-accent"
            }`}
          >
            {product.packaging === "اورجینال"
              ? "پک اورجینال (بسته‌بندی برند اصلی)"
              : "پک بازرگانی نیرا عطر صحرا"}
          </span>

          <div className="mt-6 flex items-center gap-3">
            <div className="text-2xl font-bold">
              {formatPrice(product.price)}
              <small className="text-muted text-sm mr-1 font-normal">تومان</small>
            </div>
            {product.originalPrice && (
              <>
                <span className="text-muted line-through text-sm">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="rounded-full bg-[#D60644] px-2.5 py-1 text-xs text-white">
                  ٪{getDiscountPercent(product).toLocaleString("fa-IR")} تخفیف
                </span>
              </>
            )}
          </div>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>

          <div className="flex flex-wrap gap-2 mt-6 text-xs text-muted">
            <span className="rounded-full border border-line px-3 py-1.5">
              🚚 تحویل اکسپرس
            </span>
            <span className="rounded-full border border-line px-3 py-1.5">
              ☎ پشتیبانی ۲۴ ساعته
            </span>
            <span className="rounded-full border border-line px-3 py-1.5">
              ↩ ۷ روز ضمانت بازگشت
            </span>
          </div>

          <table className="w-full mt-8 text-sm border-t border-line">
            <tbody>
              <tr className="border-b border-line">
                <td className="py-2.5 text-muted w-32">عطار</td>
                <td className="py-2.5">{product.perfumer}</td>
              </tr>
              <tr className="border-b border-line">
                <td className="py-2.5 text-muted">ماندگاری</td>
                <td className="py-2.5">{product.longevity}</td>
              </tr>
              <tr>
                <td className="py-2.5 text-muted">فصل پیشنهادی</td>
                <td className="py-2.5">{product.season}</td>
              </tr>
            </tbody>
          </table>
        </FadeUp>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-14">
        <ProductTabs product={product} />
      </section>

      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-20">
          <FadeUp className="mb-6">
            <span className="text-accent text-sm">محصولات مرتبط</span>
            <h2 className="text-xl sm:text-2xl font-bold mt-2">
              شاید این‌ها را هم دوست داشته باشید
            </h2>
          </FadeUp>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}
    </div>
  );
}
