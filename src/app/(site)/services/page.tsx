import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Stagger, StaggerItem } from "@/components/MotionSection";
import { CtaBand, SectionHeading } from "@/components/Sections";
import { Icon, type IconName } from "@/components/Icon";
import { getT } from "@/lib/content";

export async function generateMetadata() {
  const t = await getT();
  return { title: t("services.seo.title"), description: t("services.seo.desc") };
}

const serviceMeta: { icon: IconName; href: string }[] = [
  { icon: "flask", href: "/custom-order" },
  { icon: "gift", href: "/custom-order" },
  { icon: "megaphone", href: "/gallery" },
  { icon: "box", href: "/custom-order" },
  { icon: "building", href: "/gallery" },
  { icon: "palette", href: "/contact" },
];

const whyIcons: IconName[] = ["diamond", "heart", "star", "handshake"];

export default async function ServicesPage() {
  const t = await getT();

  return (
    <div>
      <PageHero
        eyebrow={t("services.hero.eyebrow")}
        title={t("services.hero.title")}
        titleAccent={t("services.hero.accent")}
        description={t("services.hero.desc")}
        image={t("services.hero.image")}
        cta={{ href: "/contact", label: t("services.hero.cta") }}
      />

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceMeta.map((s, i) => (
              <StaggerItem key={i} className="h-full">
                <Link
                  href={s.href}
                  className="group h-full flex flex-col rounded-2xl bg-surface border border-line overflow-hidden transition-all duration-300 hover:border-rose-soft hover:shadow-[0_22px_45px_-30px_rgba(122,34,88,0.55)]"
                >
                  <div className="relative aspect-[16/10] bg-blush">
                    <Image
                      src={t(`services.items.${i}.image`)}
                      alt={t(`services.items.${i}.title`)}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 text-center">
                    <Icon name={s.icon} className="w-8 h-8 mx-auto text-accent" />
                    <b className="block text-accent mt-3">{t(`services.items.${i}.title`)}</b>
                    <p className="text-xs text-muted mt-2 leading-6 flex-1">
                      {t(`services.items.${i}.desc`)}
                    </p>
                    <Icon
                      name="arrow"
                      className="w-4 h-4 mt-4 mx-auto text-rose transition-transform duration-300 group-hover:-translate-x-1"
                    />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-background pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="rounded-2xl bg-blush px-4 sm:px-8 py-12">
            <SectionHeading title={t("services.whyTitle")} />
            <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
              {whyIcons.map((icon, i) => (
                <StaggerItem key={i} className="text-center">
                  <Icon name={icon} className="w-9 h-9 mx-auto text-accent" />
                  <b className="block text-accent mt-3 text-sm">{t(`services.why.${i}.title`)}</b>
                  <span className="block text-xs text-muted mt-1.5">{t(`services.why.${i}.hint`)}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={t("services.cta.eyebrow")}
        title={t("services.cta.title")}
        href="/contact"
        label={t("services.cta.label")}
        image={t("services.cta.image")}
      />
    </div>
  );
}
