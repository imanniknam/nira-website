import { PageHero } from "@/components/PageHero";
import { QuoteBand } from "@/components/Sections";
import { GalleryGrid } from "./GalleryGrid";

export const metadata = {
  title: "گالری نمایشگاه‌ها | نیرا",
  description:
    "حضور نیرا در رویدادهای بین‌المللی و نمایشگاه‌های تخصصی، همراه با گالری تصاویر برند.",
};

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Gallery"
        title="گالری نمایشگاه‌ها"
        titleAccent="حضور در رویدادهای بین‌المللی"
        description="در این بخش می‌توانید تصاویری از حضور ما در نمایشگاه‌های داخلی و بین‌المللی، غرفه‌ها، تعاملات و معرفی محصولات به مخاطبان حرفه‌ای را مشاهده کنید."
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
