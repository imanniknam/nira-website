import { PageHero } from "@/components/PageHero";
import { QuoteBand } from "@/components/Sections";
import { getT } from "@/lib/content";
import { getEvents } from "@/lib/db";
import { GalleryGrid } from "./GalleryGrid";

export async function generateMetadata() {
  const t = await getT();
  return { title: t("gallery.seo.title"), description: t("gallery.seo.desc") };
}

export default async function GalleryPage() {
  const t = await getT();
  const events = await getEvents();

  return (
    <div>
      <PageHero
        eyebrow={t("gallery.hero.eyebrow")}
        title={t("gallery.hero.title")}
        titleAccent={t("gallery.hero.accent")}
        description={t("gallery.hero.desc")}
        image={t("gallery.hero.image")}
        wash="light"
        cta={{ href: "/contact", label: t("gallery.hero.cta") }}
      />

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-16">
          <GalleryGrid events={events} />
        </div>
      </section>

      <QuoteBand quote={t("gallery.quote.text")} image={t("gallery.quote.image")} />
    </div>
  );
}
