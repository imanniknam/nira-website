import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { QuoteBand, SectionHeading } from "@/components/Sections";
import { Stagger, StaggerItem } from "@/components/MotionSection";
import { Icon } from "@/components/Icon";
import { venues } from "@/lib/events";
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

      <section className="bg-blush/60 border-y border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-16">
          <SectionHeading
            eyebrow="Exhibitions"
            title="سازمان‌هایی که میزبان نیرا بوده‌اند"
            subtitle="نیرا تا امروز در نمایشگاه‌ها و رویدادهای این سازمان‌ها غرفه داشته است."
          />

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-10">
            {venues.map((venue) => {
              const body = (
                <>
                  <span className="flex-none inline-flex items-center justify-center w-9 h-9 rounded-full bg-blush text-rose">
                    <Icon name="building" className="w-4 h-4" />
                  </span>
                  <span className="text-sm leading-7 text-accent">{venue.name}</span>
                  {venue.eventSlug && (
                    <Icon
                      name="arrow"
                      className="w-4 h-4 text-rose mr-auto flex-none transition-transform duration-300 group-hover:-translate-x-1"
                    />
                  )}
                </>
              );

              return (
                <StaggerItem key={venue.name}>
                  {venue.eventSlug ? (
                    <Link
                      href={`/gallery/${venue.eventSlug}`}
                      className="group h-full flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-rose-soft"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="h-full flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
                      {body}
                    </div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <QuoteBand
        quote="«حضور در نمایشگاه‌ها فرصتی برای معرفی هنر عطرسازی به جهان است.»"
        image="/img/products/nira-allur-lifestyle.jpg"
      />
    </div>
  );
}
