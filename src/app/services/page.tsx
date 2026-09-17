import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Stagger, StaggerItem } from "@/components/MotionSection";
import { CtaBand, SectionHeading } from "@/components/Sections";
import { Icon, type IconName } from "@/components/Icon";

export const metadata = {
  title: "خدمات ما | نیرا",
  description:
    "طراحی و تولید عطر، گیفت سازمانی، محتوای تبلیغاتی، طراحی بسته‌بندی، حضور در نمایشگاه‌ها و مشاوره برندینگ.",
};

const services: {
  icon: IconName;
  title: string;
  desc: string;
  image: string;
  href: string;
}[] = [
  {
    icon: "flask",
    title: "طراحی و تولید عطر",
    desc: "طراحی و ساخت شیشه‌های اختصاصی برای برندهای مختلف با هویت بصری دلخواه.",
    image: "/img/products/nira-esentric-molecules-o2.jpg",
    href: "/custom-order",
  },
  {
    icon: "gift",
    title: "گیفت سازمانی",
    desc: "طراحی و تولید گیفت‌های لوکس برای کارکنان و مشتریان شرکت‌ها.",
    image: "/img/products/nira-de-marly-pegasus.jpg",
    href: "/custom-order",
  },
  {
    icon: "megaphone",
    title: "محتوای تبلیغاتی",
    desc: "تولید ویدیو، عکس و محتوای دیجیتال برای معرفی محصولات و برند شما.",
    image: "/img/products/nira-allur-lifestyle.jpg",
    href: "/gallery",
  },
  {
    icon: "box",
    title: "طراحی بسته‌بندی",
    desc: "طراحی و تولید بسته‌بندی‌های خاص و شخصی‌سازی‌شده متناسب با هویت برند.",
    image: "/img/products/nira-versace-crystal-noir.jpg",
    href: "/custom-order",
  },
  {
    icon: "building",
    title: "حضور در نمایشگاه‌ها",
    desc: "برنامه‌ریزی و حضور در نمایشگاه‌های تخصصی داخلی و بین‌المللی.",
    image: "/img/brand/shop-shelf-rose.jpg",
    href: "/gallery",
  },
  {
    icon: "palette",
    title: "مشاوره برندینگ",
    desc: "ارائه راهکارهای تخصصی برای تقویت هویت برند و جایگاه آن در بازار.",
    image: "/img/products/nira-versace-lifestyle.jpg",
    href: "/contact",
  },
];

const why: { icon: IconName; title: string; hint: string }[] = [
  { icon: "diamond", title: "تجربه و تخصص", hint: "در صنعت عطر" },
  { icon: "heart", title: "تعهد به کیفیت", hint: "و جزئیات" },
  { icon: "star", title: "خلاقیت", hint: "در هر پروژه" },
  { icon: "handshake", title: "همراهی", hint: "از ایده تا اجرا" },
];

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our Services"
        title="خدمات ما"
        titleAccent="خلاقیت در خدمت برند شما"
        description="ما مجموعه‌ای از خدمات اختصاصی را برای برندهای مختلف ارائه می‌دهیم تا هویت شما را از طریق عطر، بسته‌بندی، گیفت و محتوای خلاقانه به بهترین شکل نمایش دهیم."
        image="/img/brand/bloom-rose.png"
        cta={{ href: "/contact", label: "تماس با ما" }}
      />

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <StaggerItem key={s.title} className="h-full">
                <Link
                  href={s.href}
                  className="group h-full flex flex-col rounded-2xl bg-surface border border-line overflow-hidden transition-all duration-300 hover:border-rose-soft hover:shadow-[0_22px_45px_-30px_rgba(122,34,88,0.55)]"
                >
                  <div className="relative aspect-[16/10] bg-blush">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 text-center">
                    <Icon name={s.icon} className="w-8 h-8 mx-auto text-accent" />
                    <b className="block text-accent mt-3">{s.title}</b>
                    <p className="text-xs text-muted mt-2 leading-6 flex-1">{s.desc}</p>
                    <Icon
                      name="arrow"
                      className="w-4 h-4 mt-4 text-rose transition-transform duration-300 group-hover:-translate-x-1"
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
            <SectionHeading title="چرا ما؟" />
            <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
              {why.map((w) => (
                <StaggerItem key={w.title} className="text-center">
                  <Icon name={w.icon} className="w-9 h-9 mx-auto text-accent" />
                  <b className="block text-accent mt-3 text-sm">{w.title}</b>
                  <span className="block text-xs text-muted mt-1.5">{w.hint}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="برای مشاوره و دریافت پیشنهاد اختصاصی"
        title="با ما در ارتباط باشید"
        href="/contact"
        label="تماس با ما"
        image="/img/products/nira-de-marly-lifestyle.jpg"
      />
    </div>
  );
}
