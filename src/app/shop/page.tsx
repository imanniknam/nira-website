import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { products } from "@/lib/products";
import { ShopGrid } from "./ShopGrid";

export const metadata = {
  title: "فروشگاه عطر و ادکلن | نیرا عطر صحرا",
};

export default function ShopPage() {
  return (
    <div>
      <PageHero
        eyebrow={`${products.length} محصول اصل`}
        title="فروشگاه نیرا"
        description="مجموعه‌ای از اورجینال‌ترین عطرهای برندهای معتبر جهانی، همراه با پک بازرگانی اقتصادی نیرا و مشاوره‌ی رایگان انتخاب رایحه."
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
        <Suspense fallback={null}>
          <ShopGrid />
        </Suspense>
      </div>
    </div>
  );
}
