import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { FeatureStrip, type Feature } from "@/components/Sections";
import { ShopGrid } from "./ShopGrid";

export const metadata = {
  title: "محصولات نیرا | عطر و ادکلن",
  description:
    "از رایحه‌های ملایم و روزمره تا عطرهای خاص و ماندگار؛ مجموعه‌ی کامل محصولات نیرا.",
};

const features: Feature[] = [
  { icon: "truck", title: "ارسال سریع", hint: "به سراسر کشور" },
  { icon: "shield", title: "تضمین اصالت", hint: "محصولات" },
  { icon: "diamond", title: "کیفیت بالا", hint: "و ماندگاری رایحه" },
  { icon: "leaf", title: "رایحه‌های خاص", hint: "و متمایز" },
];

export default function ShopPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our Products"
        title="محصولات نیرا"
        titleAccent="عطرهایی برای هر لحظه، هر خاطره"
        description="از رایحه‌های ملایم و روزمره تا عطرهای خاص و ماندگار، مجموعه‌ای از بهترین محصولات نیرا را کشف کنید."
        image="/img/brand/bloom-rose.png"
        cta={{ href: "#grid", label: "مشاهده همه محصولات" }}
      />

      <div className="bg-surface border-b border-line">
        <nav className="max-w-6xl mx-auto px-4 sm:px-8 py-3 text-xs text-muted flex items-center gap-2">
          <Link href="/" className="hover:text-accent transition-colors">
            خانه
          </Link>
          <span className="text-line">›</span>
          <span className="text-accent">محصولات</span>
        </nav>
      </div>

      <section id="grid" className="bg-background scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-14">
          <Suspense fallback={null}>
            <ShopGrid />
          </Suspense>
        </div>
      </section>

      <FeatureStrip items={features} tone="blush" />
    </div>
  );
}
