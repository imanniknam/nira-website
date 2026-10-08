import { PageHero } from "@/components/PageHero";
import { QuoteBand } from "@/components/Sections";
import { getT } from "@/lib/content";
import { getProjects } from "@/lib/db";
import { ArchiveGrid } from "./ArchiveGrid";

export async function generateMetadata() {
  const t = await getT();
  return { title: t("archive.seo.title"), description: t("archive.seo.desc") };
}

export default async function ArchivePage() {
  const t = await getT();
  const projects = await getProjects();

  return (
    <div>
      <PageHero
        eyebrow={t("archive.hero.eyebrow")}
        title={t("archive.hero.title")}
        titleAccent={t("archive.hero.accent")}
        description={t("archive.hero.desc")}
        image={t("archive.hero.image")}
        wash="light"
        cta={{ href: "/contact", label: t("archive.hero.cta") }}
      />

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-16">
          <ArchiveGrid projects={projects} />
        </div>
      </section>

      <QuoteBand quote={t("archive.quote.text")} image={t("archive.quote.image")} />
    </div>
  );
}
