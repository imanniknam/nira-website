import Link from "next/link";
import { notFound } from "next/navigation";
import { productCategoryLabels } from "@/lib/types";
import { relatedProducts } from "@/lib/product-utils";
import { decodeSlug, getPublicProducts } from "@/lib/data";
import { getT } from "@/lib/content";
import { priceLabel } from "@/lib/price";
import { ProductCard } from "@/components/ProductCard";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";
import { ProductTabs } from "./ProductTabs";
import { ProductGallery } from "./ProductGallery";
import { AddToCartButton } from "./AddToCartButton";

type Params = { params: Promise<{ slug: string }> };

async function load(rawSlug: string) {
  const slug = decodeSlug(rawSlug);
  const all = await getPublicProducts();
  return { product: all.find((p) => p.slug === slug), all };
}

export async function generateMetadata({ params }: Params) {
  const { product } = await load((await params).slug);
  if (!product) return { title: "محصول یافت نشد | نیرا" };
  return {
    title: `${product.name} | نیرا`,
    description: product.description.slice(0, 160),
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }: Params) {
  const { product, all } = await load((await params).slug);
  if (!product) notFound();
  const t = await getT();

  const related = relatedProducts(all, product.slug);
  const price = priceLabel(product, `${t("pricing.min")} تا ${t("pricing.max")} ${t("pricing.unit")}`);
  const specs = [
    { label: "عطرساز", value: product.perfumer },
    { label: "ماندگاری", value: product.longevity },
    { label: "فصل پیشنهادی", value: product.season },
  ].filter((r) => r.value && r.value !== "—");
  const summary = [
    productCategoryLabels[product.category],
    product.concentration,
    product.volume,
    product.origin,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div>
      <div className="border-b border-line bg-blush">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 text-sm text-muted">
          <Link href="/" className="hover:text-accent">
            {t("nav.home")}
          </Link>{" "}
          /{" "}
          <Link href="/shop" className="hover:text-accent">
            {t("nav.shop")}
          </Link>{" "}
          / <span>{product.name}</span>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-14 grid md:grid-cols-2 gap-12">
        <FadeUp className="min-w-0">
          <ProductGallery images={[product.image, ...product.gallery]} alt={product.name} />
        </FadeUp>

        <FadeUp delay={0.1} className="min-w-0">
          <span className="text-accent text-sm">{product.brand}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-accent mt-2">{product.name}</h1>
          {summary && <p className="text-muted text-sm mt-2">{summary}</p>}
          <span
            className={`inline-block mt-3 text-xs rounded-full px-3 py-1 ${
              product.packaging === "اورجینال"
                ? "bg-blush text-muted border border-line"
                : "bg-accent/10 text-accent"
            }`}
          >
            {product.packaging === "اورجینال" ? t("product.packOriginal") : t("product.packNira")}
          </span>
          {!product.inStock && (
            <span className="inline-block mr-2 mt-3 text-xs rounded-full px-3 py-1 border border-line text-muted">
              ناموجود
            </span>
          )}

          <div className="mt-5">
            <p className="text-xl font-bold text-accent">{price}</p>
            <p className="text-xs text-muted mt-1.5 leading-6">{t("pricing.note")}</p>
          </div>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>

          <div className="flex flex-wrap gap-2 mt-6 text-xs text-muted">
            {[t("product.badge1"), t("product.badge2"), t("product.badge3")]
              .filter(Boolean)
              .map((b) => (
                <span key={b} className="rounded-full border border-line px-3 py-1.5">
                  {b}
                </span>
              ))}
          </div>

          {specs.length > 0 && (
            <table className="w-full mt-8 text-sm border-t border-line">
              <tbody>
                {specs.map((r) => (
                  <tr key={r.label} className="border-b border-line">
                    <td className="py-2.5 text-muted w-32">{r.label}</td>
                    <td className="py-2.5">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </FadeUp>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-14">
        <ProductTabs product={product} />
      </section>

      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-20">
          <FadeUp className="mb-6">
            <span className="text-accent text-sm">{t("product.relatedKicker")}</span>
            <h2 className="text-xl sm:text-2xl font-bold text-accent mt-2">
              {t("product.relatedTitle")}
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
