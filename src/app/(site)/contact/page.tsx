import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";
import { Icon, type IconName } from "@/components/Icon";
import { getT } from "@/lib/content";
import { getSiteInfo, toTel } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export async function generateMetadata() {
  const t = await getT();
  return { title: t("contact.seo.title"), description: t("contact.seo.desc") };
}

type Line = { text: string; href?: string };

export default async function ContactPage() {
  const t = await getT();
  const info = getSiteInfo(t);

  const channels: { icon: IconName; title: string; lines: Line[] }[] = [
    {
      icon: "phone",
      title: t("contact.channel.phone"),
      lines: [
        { text: info.landline, href: `tel:${toTel(info.landline)}` },
        { text: info.phone, href: `tel:${toTel(info.phone)}` },
        { text: info.phoneAlt, href: `tel:${toTel(info.phoneAlt)}` },
      ].filter((l) => l.text),
    },
    {
      icon: "mail",
      title: t("contact.channel.email"),
      lines: info.email ? [{ text: info.email, href: `mailto:${info.email}` }] : [],
    },
    {
      icon: "pin",
      title: t("contact.channel.address"),
      lines: [{ text: info.address }, { text: info.hours }].filter((l) => l.text),
    },
  ];

  const socials: { icon: IconName; href: string; label: string }[] = [
    { icon: "instagram" as const, href: info.instagram, label: "اینستاگرام" },
    { icon: "telegram" as const, href: info.telegram, label: "تلگرام" },
    { icon: "linkedin" as const, href: info.linkedin, label: "لینکدین" },
    { icon: "globe" as const, href: info.website, label: "وب‌سایت" },
  ].filter((s) => s.href);

  const mapHref =
    info.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}`;

  return (
    <div>
      <PageHero
        eyebrow={t("contact.hero.eyebrow")}
        title={t("contact.hero.title")}
        description={t("contact.hero.desc")}
        image={t("contact.hero.image")}
        cta={{ href: "#form", label: t("contact.hero.cta") }}
      />

      <section className="bg-blush">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-14">
          <Stagger className="grid sm:grid-cols-3 gap-8 sm:divide-x sm:divide-x-reverse divide-line">
            {channels.map((c) => (
              <StaggerItem key={c.title} className="text-center px-4">
                <Icon name={c.icon} className="w-8 h-8 mx-auto text-accent" />
                <b className="block text-accent mt-3 text-sm">{c.title}</b>
                {c.lines.map((line) =>
                  line.href ? (
                    <a
                      key={line.text}
                      href={line.href}
                      className="block text-xs text-muted mt-1.5 leading-6 hover:text-accent transition-colors"
                    >
                      {line.text}
                    </a>
                  ) : (
                    <span key={line.text} className="block text-xs text-muted mt-1.5 leading-6">
                      {line.text}
                    </span>
                  ),
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="form" className="bg-background scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Static map stand-in: no embed (it needs a provider key), so the
              card carries the address and opens the location in a map app. */}
          <FadeUp className="order-2 md:order-1">
            <a
              href={mapHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`${info.address} — مشاهده روی نقشه`}
              className="group relative block rounded-2xl overflow-hidden border border-line bg-blush aspect-[4/3]"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-2 px-6">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-accent text-white transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon name="pin" className="w-5 h-5" />
                </span>
                <span className="text-sm text-accent">{info.address}</span>
                <span className="text-[11px] text-rose">مشاهده روی نقشه</span>
              </div>
            </a>
          </FadeUp>

          <FadeUp delay={0.1} className="order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-accent">{t("contact.form.title")}</h2>
            <p className="text-muted mt-3 text-sm leading-8">{t("contact.form.desc")}</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="relative overflow-hidden bg-blush">
        <div className="absolute inset-y-0 left-0 w-1/2 hidden md:block">
          <Image
            src={t("contact.follow.image")}
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#fceaf0]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
          <FadeUp className="max-w-lg">
            <span className="eyebrow-latin block">{t("contact.follow.eyebrow")}</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-accent mt-3">
              {t("contact.follow.title")}
            </h2>
            <p className="text-muted mt-4 leading-8 text-sm sm:text-base">
              {t("contact.follow.desc")}
            </p>
            <div className="flex items-center gap-3 mt-7">
              {socials.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-line bg-surface text-accent hover:bg-accent hover:text-white hover:border-accent transition-colors"
                >
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
