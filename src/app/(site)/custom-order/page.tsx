import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";
import { CtaBand, SectionHeading } from "@/components/Sections";
import { Icon, type IconName } from "@/components/Icon";
import { getT } from "@/lib/content";
import { getProjects } from "@/lib/db";
import { CustomOrderForm } from "./CustomOrderForm";

export async function generateMetadata() {
  const t = await getT();
  return { title: t("custom.seo.title"), description: t("custom.seo.desc") };
}

const whyIcons: IconName[] = ["flask", "diamond", "sparkle", "handshake"];
const chipIcons: IconName[] = ["shield", "flask", "box"];

export default async function CustomOrderPage() {
  const t = await getT();
  const samples = (await getProjects()).filter((p) => p.image).slice(0, 5);
  return (
    <div>
      <PageHero
        eyebrow={t("custom.hero.eyebrow")}
        title={t("custom.hero.title")}
        titleAccent={t("custom.hero.accent")}
        description={t("custom.hero.desc")}
        image={t("custom.hero.image")}
        cta={{ href: "#form", label: t("custom.hero.cta") }}
      />

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
          <SectionHeading
            title={t("custom.whyTitle")}
            subtitle={t("custom.whySub")}
          />
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 sm:divide-x sm:divide-x-reverse divide-line">
            {whyIcons.map((icon, i) => (
              <StaggerItem key={i} className="text-center px-3">
                <Icon name={icon} className="w-9 h-9 mx-auto text-accent" />
                <b className="block text-accent mt-4 text-sm">{t(`custom.why.${i}.title`)}</b>
                <span className="block text-xs text-muted mt-1.5 leading-6">{t(`custom.why.${i}.hint`)}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {samples.length > 0 && (
        <section className="bg-surface border-y border-line">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
            <SectionHeading title={t("custom.samples.title")} subtitle={t("custom.samples.sub")} />
            <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mt-12">
              {samples.map((p) => (
                <StaggerItem key={p.slug}>
                  <Link
                    href={`/archive/${p.slug}`}
                    className="group block rounded-2xl overflow-hidden bg-surface border border-line transition-shadow duration-300 hover:shadow-[0_22px_45px_-30px_rgba(122,34,88,0.6)]"
                  >
                    <span className="relative block aspect-[3/4] bg-background">
                      <Image
                        src={p.image!}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="block p-3 text-center">
                      <b className="block text-xs font-medium text-accent leading-6">{p.client}</b>
                      <span className="block text-[11px] text-muted mt-0.5">{p.desc}</span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="text-center mt-10">
              <Link href="/archive" className="btn btn-outline">
                {t("custom.samples.cta")}
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="bg-blush">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeUp className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden order-2 md:order-1">
            <Image
              src={t("custom.process.image")}
              alt={t("custom.process.alt")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </FadeUp>

          <FadeUp delay={0.1} className="order-1 md:order-2">
            <span className="eyebrow-latin block">{t("custom.process.eyebrow")}</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-accent mt-3">{t("custom.process.title")}</h2>
            <p className="text-muted mt-4 leading-8 text-sm sm:text-base max-w-lg">
              {t("custom.process.desc")}
            </p>

            <ol className="mt-8 space-y-4">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="text-sm text-accent flex-1 border-b border-dashed border-line pb-3">
                    {t(`custom.step.${i}`)}
                  </span>
                  <span className="shrink-0 w-8 h-8 rounded-full bg-accent text-white text-xs flex items-center justify-center">
                    {(i + 1).toLocaleString("fa-IR")}
                  </span>
                </li>
              ))}
            </ol>
          </FadeUp>
        </div>
      </section>

      <section id="form" className="bg-background scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 grid md:grid-cols-2 gap-10 lg:gap-14">
          <FadeUp>
            <span className="eyebrow-latin block">{t("custom.form.eyebrow")}</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-accent mt-3">
              {t("custom.form.title")}
            </h2>
            <p className="text-muted mt-4 leading-8 text-sm sm:text-base max-w-md">
              {t("custom.form.desc")}
            </p>
            <div className="flex flex-wrap gap-2 mt-7 text-xs text-muted">
              {chipIcons.map((icon, i) => ({ icon, label: t(`custom.chip.${i}`) })).map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2"
                >
                  <Icon name={chip.icon} className="w-4 h-4 text-rose" />
                  {chip.label}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <CustomOrderForm />
          </FadeUp>
        </div>
      </section>

      <CtaBand
        eyebrow={t("custom.cta.eyebrow")}
        title={t("custom.cta.title")}
        href="/contact"
        label={t("custom.cta.label")}
        image={t("custom.cta.image")}
      />
    </div>
  );
}
