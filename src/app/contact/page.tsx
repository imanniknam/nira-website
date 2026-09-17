import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";
import { Icon, type IconName } from "@/components/Icon";
import { siteInfo } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata = {
  title: "تماس با ما | نیرا",
  description:
    "راه‌های ارتباط با نیرا: تلفن، ایمیل، نشانی دفتر مرکزی و فرم تماس مستقیم.",
};

const channels: { icon: IconName; title: string; lines: string[] }[] = [
  {
    icon: "phone",
    title: "تلفن",
    lines: [siteInfo.landline, `${siteInfo.phone} | ${siteInfo.phoneAlt}`],
  },
  { icon: "mail", title: "ایمیل", lines: [siteInfo.email] },
  { icon: "pin", title: "آدرس", lines: [siteInfo.address, siteInfo.hours] },
];

const socials: { icon: IconName; href: string; label: string }[] = [
  { icon: "instagram", href: siteInfo.instagram, label: "اینستاگرام" },
  { icon: "telegram", href: siteInfo.telegram, label: "تلگرام" },
  { icon: "linkedin", href: siteInfo.linkedin, label: "لینکدین" },
  { icon: "globe", href: siteInfo.website, label: "وب‌سایت" },
];

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact Us"
        title="با ما در ارتباط باشید"
        description="ما همیشه آماده‌ی پاسخگویی به سوالات شما هستیم. برای مشاوره، همکاری یا هرگونه پرسش، از طریق راه‌های زیر با ما در تماس باشید."
        image="/img/brand/hero-rose.png"
        cta={{ href: "#form", label: "ارسال پیام" }}
      />

      <section className="bg-blush">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-14">
          <Stagger className="grid sm:grid-cols-3 gap-8 sm:divide-x sm:divide-x-reverse divide-line">
            {channels.map((c) => (
              <StaggerItem key={c.title} className="text-center px-4">
                <Icon name={c.icon} className="w-8 h-8 mx-auto text-accent" />
                <b className="block text-accent mt-3 text-sm">{c.title}</b>
                {c.lines.map((line) => (
                  <span key={line} className="block text-xs text-muted mt-1.5 leading-6">
                    {line}
                  </span>
                ))}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="form" className="bg-background scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Static map stand-in: the real embed needs a provider key, so the
              card carries the address in the meantime. */}
          <FadeUp className="relative rounded-2xl overflow-hidden border border-line bg-blush aspect-[4/3] order-2 md:order-1">
            <div
              aria-hidden
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-2">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-accent text-white">
                <Icon name="pin" className="w-5 h-5" />
              </span>
              <span className="text-sm text-accent">{siteInfo.address}</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-accent">فرم تماس</h2>
            <p className="text-muted mt-3 text-sm leading-8">
              پیام خود را برای ما ارسال کنید.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="relative overflow-hidden bg-blush">
        <div className="absolute inset-y-0 left-0 w-1/2 hidden md:block">
          <Image
            src="/img/products/nira-de-marly-lifestyle.jpg"
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#fceaf0]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
          <FadeUp className="max-w-lg">
            <span className="eyebrow-latin block">Follow Us</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-accent mt-3">
              ما را دنبال کنید
            </h2>
            <p className="text-muted mt-4 leading-8 text-sm sm:text-base">
              برای دیدن جدیدترین محصولات، پشت صحنه‌ها و اخبار برند نیرا.
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
