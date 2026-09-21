import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeatureStrip, type Feature } from "@/components/Sections";
import { Eyebrow } from "@/components/Eyebrow";
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
      <div className="bg-blush border-b border-line">
        <nav className="max-w-6xl mx-auto px-4 sm:px-8 py-3 text-xs text-muted flex items-center gap-2">
          <Link href="/" className="hover:text-accent transition-colors">
            خانه
          </Link>
          <span className="text-line">›</span>
          <span className="text-accent">محصولات</span>
        </nav>
      </div>

      {/* Brand key visual. It carries its own wordmark, tagline and feature row,
          so it is shown whole — no crop, no overlay text. */}
      <div className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6">
          <div className="relative aspect-[1280/853] rounded-3xl overflow-hidden border border-line">
            <Image
              src="/img/brand/perfume-body-splash-banner-dark.jpg"
              alt="مجموعه‌ی عطر و بادی اسپلش نیرا عطر صحرا"
              fill
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 sm:pt-12">
          <Eyebrow text="Our Products" />
          <h1 className="text-2xl sm:text-3xl font-bold text-accent mt-2">
            محصولات نیرا
          </h1>
          <p className="text-muted mt-3 text-sm leading-7 max-w-xl">
            از رایحه‌های ملایم و روزمره تا عطرهای خاص و ماندگار، مجموعه‌ای از بهترین
            محصولات نیرا را کشف کنید.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
          <Suspense fallback={null}>
            <ShopGrid />
          </Suspense>
        </div>
      </section>

      <FeatureStrip items={features} tone="blush" />
    </div>
  );
}
