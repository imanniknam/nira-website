import { PageHero } from "@/components/PageHero";
import { QuoteBand } from "@/components/Sections";
import { ArchiveGrid } from "./ArchiveGrid";

export const metadata = {
  title: "آرشیو پروژه‌ها | نیرا",
  description:
    "نگاهی به پروژه‌ها و همکاری‌های نیرا با برندهای مختلف: طراحی عطر، شیشه، گیفت سازمانی و محتوای تبلیغاتی.",
};

export default function ArchivePage() {
  return (
    <div>
      <PageHero
        eyebrow="Our Archive"
        title="آرشیو ما"
        titleAccent="نگاهی به پروژه‌ها و همکاری‌های ما"
        description="در این بخش می‌توانید نمونه‌ی عملی از پروژه‌های انجام‌شده برای برندهای مختلف را ببینید؛ از طراحی عطر و شیشه تا تولید گیفت و محتوای تبلیغاتی."
        image="/img/archive/archive-hero.png"
        wash="light"
        cta={{ href: "/contact", label: "تماس با ما" }}
      />

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-16">
          <ArchiveGrid />
        </div>
      </section>

      <QuoteBand
        quote="«هر پروژه، داستانی از اعتماد است که با خلاقیت و دقت ساخته می‌شود.»"
        image="/img/products/nira-versace-lifestyle.jpg"
      />
    </div>
  );
}
