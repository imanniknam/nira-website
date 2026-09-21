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

      {/* The page hero. The artwork carries its own wordmark, tagline and
          feature row, so it is never cropped or written over: it sits whole on
          a black band that matches its own background (sampled from the file),
          capped in height so it cannot swallow the fold on wide screens. */}
      <section className="bg-[#050406]">
        <div className="relative w-full aspect-[1280/853] max-h-[72vh]">
          <Image
            src="/img/brand/perfume-body-splash-banner-dark.jpg"
            alt="مجموعه‌ی عطر و بادی اسپلش نیرا عطر صحرا"
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </section>

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
