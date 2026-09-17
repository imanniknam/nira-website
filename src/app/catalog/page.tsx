import Image from "next/image";
import Link from "next/link";
import { categoryLabels, visibleProducts } from "@/lib/products";
import { PageHero } from "@/components/PageHero";
import { Stagger, StaggerItem } from "@/components/MotionSection";

export const metadata = {
  title: "کاتالوگ نیرا | مجموعه کامل رایحه‌ها",
};

export default function CatalogPage() {
  return (
    <div>
      <PageHero
        eyebrow="Catalog"
        title="کاتالوگ محصولات"
        description="مرور بصری و لوکس‌وار کل مجموعه‌ی نیرا — بدون قیمت، برای معرفی و الهام."
        image="/img/brand/petals-rose.png"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {visibleProducts.map((p) => (
            <StaggerItem key={p.id}>
              <Link
                href={`/product/${p.slug}`}
                className="group block rounded-2xl border border-line bg-surface overflow-hidden"
              >
                <div className="relative aspect-[4/5] bg-blush">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <h4 className="text-sm font-medium text-accent">{p.name}</h4>
                  <span className="text-xs text-muted">{categoryLabels[p.category]}</span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="text-center mt-14">
          <Link
            href="/shop"
            className="btn btn-outline"
          >
            مشاهده و خرید از فروشگاه
          </Link>
        </div>
      </div>
    </div>
  );
}
