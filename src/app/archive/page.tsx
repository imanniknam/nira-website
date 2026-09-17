import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";

export const metadata = {
  title: "آرشیو پروژه‌های سازمانی | نیرا عطر صحرا",
};

const projects = [
  {
    logo: "ZEST",
    logoSub: "GERMANY",
    image: "/img/archive/zest-mattress-aqua.png",
    tag: "آلمان · Zest",
    title: "پروژه تولید ادکلن برای شرکت Zest — آلمان",
    desc: "طراحی و تولید عطر تبلیغاتی اختصاصی برند",
  },
  {
    logo: "آریا افق",
    logoSub: "پاسارگاد",
    image: "/img/archive/ariya-ofogh-pasargad-aventus.png",
    tag: "ایران · پاسارگاد",
    title: "پروژه تولید ادکلن برای شرکت آریا افق پاسارگاد",
    desc: "طراحی هویت رایحه‌ای و تولید عطر سازمانی",
  },
  {
    logo: "اسپارک",
    logoSub: "کمپانی",
    image: undefined,
    tag: "ایران · Spark",
    title: "همکاری مستمر با شرکت اسپارک کمپانی",
    desc: "طراحی رایحه اختصاصی و هدایای سازمانی",
  },
  {
    logo: "نفت مناطق",
    logoSub: "مرکزی ایران",
    image: undefined,
    tag: "ایران · نفت",
    title: "شرکت نفت مناطق مرکزی ایران",
    desc: "عطر سازمانی برای ارتقاء فرهنگ سازمانی",
  },
] satisfies { logo: string; logoSub: string; image?: string; tag: string; title: string; desc: string }[];

export default function ArchivePage() {
  return (
    <div>
      <PageHero
        eyebrow="پروژه‌های عطر سازمانی"
        title="آرشیو نیرا"
        description="هر کارت زیر یک پروژه‌ی طراحی و تولید عطر اختصاصی برای یک برند یا شرکت است."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((p) => (
            <StaggerItem key={p.title}>
              <div className="rounded-2xl border border-line bg-surface p-6 h-full flex flex-col">
                {p.image ? (
                  <div className="relative aspect-square rounded-xl border border-line overflow-hidden mb-4 bg-white">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square rounded-xl bg-background border border-line flex items-center justify-center text-center font-bold mb-4">
                    {p.logo}
                    <br />
                    {p.logoSub}
                  </div>
                )}
                <span className="text-xs text-accent">{p.tag}</span>
                <b className="text-sm mt-2 leading-6">{p.title}</b>
                <span className="text-xs text-muted mt-1">{p.desc}</span>
              </div>
            </StaggerItem>
          ))}
          <StaggerItem>
            <div className="rounded-2xl border border-dashed border-line p-6 h-full flex flex-col items-center justify-center text-center opacity-70">
              <div className="aspect-square w-full rounded-xl bg-background border border-line flex items-center justify-center text-center font-bold mb-4">
                + پروژه‌ی
                <br />
                بعدی شما
              </div>
              <b className="text-sm">برند شما می‌تواند اینجا باشد</b>
              <span className="text-xs text-muted mt-1">
                درخواست طراحی عطر اختصاصی سازمانی
              </span>
            </div>
          </StaggerItem>
        </Stagger>

        <FadeUp className="rounded-2xl bg-surface border border-line p-8 sm:p-10 flex flex-wrap items-center justify-between gap-6 mt-14">
          <div>
            <span className="text-accent text-sm">خدمات سفارشی‌سازی</span>
            <h3 className="text-xl sm:text-2xl font-bold mt-2">
              پروژه بعدی، برند شماست
            </h3>
            <p className="text-muted mt-2">
              تیم نیرا از طراحی رایحه تا تولید و بسته‌بندی نهایی همراه شماست.
            </p>
          </div>
          <Link
            href="/custom-order"
            className="rounded-full bg-accent hover:bg-accent-dark transition-colors text-white px-6 py-3 text-sm whitespace-nowrap"
          >
            درخواست همکاری سازمانی
          </Link>
        </FadeUp>
      </div>
    </div>
  );
}
