import Image from "next/image";
import Link from "next/link";
import { getPublicProducts } from "@/lib/data";
import { getT } from "@/lib/content";
import { Lines } from "@/components/Lines";
import { CmsFeatureStrip } from "@/components/FeatureStripCms";
import { CollectionCard } from "@/components/ProductCard";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";

export async function generateMetadata() {
  const t = await getT();
  return { title: t("home.seo.title"), description: t("home.seo.desc") };
}

export default async function Home() {
  const t = await getT();
  const collection = (await getPublicProducts()).slice(0, 4);

  return (
    <div>
      <PageHero
        tall
        eyebrow={t("home.hero.eyebrow")}
        title={t("home.hero.title")}
        titleAccent={t("home.hero.accent")}
        description={t("home.hero.desc")}
        image={t("home.hero.image")}
        cta={{ href: "/shop", label: t("home.hero.cta") }}
        secondaryCta={{ href: "/custom-order", label: t("home.hero.cta2") }}
      />

      <CmsFeatureStrip tone="surface" />

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] gap-10 lg:gap-14 items-center">
          <FadeUp>
            <span className="eyebrow-latin block">{t("home.collection.eyebrow")}</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-accent mt-3 leading-[1.5]">
              <Lines text={t("home.collection.title")} />
            </h2>
            <p className="text-muted mt-4 leading-8 text-sm">
              {t("home.collection.desc")}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 mt-6 text-sm text-rose hover:text-accent transition-colors"
            >
              {t("home.collection.link")}
              <Icon name="arrow" className="w-4 h-4" />
            </Link>
          </FadeUp>

          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {collection.map((p) => (
              <StaggerItem key={p.id}>
                <CollectionCard
                  href={`/product/${p.slug}`}
                  image={p.image}
                  title={p.name}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* The banner carries its own wordmark, tagline and feature row, so it is
          shown whole (no crop, no overlay) rather than used as a hero plate. */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-16 sm:pb-24">
          <FadeUp>
            <Link
              href="/shop"
              aria-label={t("home.banner.alt")}
              className="group block relative aspect-[1280/853] rounded-3xl overflow-hidden border border-line"
            >
              <Image
                src={t("home.banner.image")}
                alt={t("home.banner.alt")}
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </Link>
          </FadeUp>
        </div>
      </section>

      <section className="relative overflow-hidden dark-band text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 grid md:grid-cols-2 gap-10 items-center">
          <FadeUp>
            <span className="block text-white/70 text-sm">{t("home.corp.kicker")}</span>
            <h2 className="text-2xl sm:text-4xl font-bold mt-3 leading-[1.5]">
              <Lines text={t("home.corp.title")} />
            </h2>
            <p className="text-white/80 mt-5 leading-8 text-sm sm:text-base max-w-md">
              {t("home.corp.desc")}
            </p>
            <Link href="/custom-order" className="btn btn-ghost-light mt-8">
              {t("home.corp.cta")}
              <Icon name="arrow" className="w-4 h-4" />
            </Link>
          </FadeUp>

          <FadeUp delay={0.1} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src={t("home.corp.image")}
              alt={t("home.corp.kicker")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </FadeUp>
        </div>
      </section>

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeUp className="relative aspect-[5/3] rounded-2xl overflow-hidden order-2 md:order-1">
            <Image
              src={t("home.about.image")}
              alt={t("home.about.kicker")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </FadeUp>

          <FadeUp delay={0.1} className="order-1 md:order-2">
            <span className="block text-rose text-sm">{t("home.about.kicker")}</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-accent mt-3 leading-[1.5]">
              <Lines text={t("home.about.title")} />
            </h2>
            <p className="text-muted mt-5 leading-8 text-sm sm:text-base">
              {t("home.about.desc")}
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 mt-6 text-sm text-rose hover:text-accent transition-colors"
            >
              {t("home.about.link")}
              <Icon name="arrow" className="w-4 h-4" />
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
