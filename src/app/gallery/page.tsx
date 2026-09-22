import { PageHero } from "@/components/PageHero";
import { QuoteBand } from "@/components/Sections";
import { GalleryGrid } from "./GalleryGrid";

export const metadata = {
  title: "گالری نمایشگاه‌ها | نیرا",
  description:
    "نمایشگاه‌هایی که نیرا در شرکت ملی نفت ایران، شهرداری تهران، شرکت گاز، پتروشیمی و مجتمع‌های رفاهی برگزار کرده است.",
};

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Gallery"
        title="گالری نمایشگاه‌ها"
        titleAccent="حضور نیرا در نمایشگاه‌های سازمانی"
        description="از شرکت ملی نفت و شهرداری تهران تا شرکت گاز و پتروشیمی؛ نگاهی به نمایشگاه‌هایی که نیرا در آن‌ها غرفه داشته است."
        image="/img/brand/gallery-hero.png"
        wash="light"
        cta={{ href: "/contact", label: "تماس با ما" }}
      />

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-16">
          <GalleryGrid />
        </div>
      </section>

      <QuoteBand
        quote="«حضور در نمایشگاه‌ها فرصتی برای معرفی هنر عطرسازی به جهان است.»"
        image="/img/products/nira-allur-lifestyle.jpg"
      />
    </div>
  );
}
