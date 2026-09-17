import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";
import { CtaBand, SectionHeading } from "@/components/Sections";
import { Icon, type IconName } from "@/components/Icon";
import { CustomOrderForm } from "./CustomOrderForm";

export const metadata = {
  title: "همکاری با شرکت‌ها | نیرا",
  description:
    "طراحی و تولید عطر اختصاصی سازمانی: از فرمولاسیون و رایحه‌ی برند تا بسته‌بندی و تحویل.",
};

const why: { icon: IconName; title: string; hint: string }[] = [
  { icon: "flask", title: "توسعه فرمولاسیون", hint: "با عطرسازان حرفه‌ای" },
  { icon: "diamond", title: "رایحه‌های اختصاصی", hint: "مخصوص برند شما" },
  { icon: "sparkle", title: "کیفیت بالا", hint: "مواد اولیه مرغوب" },
  { icon: "handshake", title: "همکاری بلندمدت", hint: "و پشتیبانی کامل" },
];

const steps = [
  "مشاوره و نیازسنجی",
  "طراحی رایحه اختصاصی",
  "تولید و تست کیفیت",
  "بسته‌بندی و تحویل",
];

export default function CustomOrderPage() {
  return (
    <div>
      <PageHero
        eyebrow="Corporate Solutions"
        title="عطرهای اختصاصی"
        titleAccent="برای برند شما"
        description="با ما رایحه‌ای منحصربه‌فرد برای برندتان خلق کنید. عطرهای اختصاصی، هویت و ارزش برند شما را در ذهن مشتریان ماندگار می‌کند."
        image="/img/brand/petals-rose.png"
        cta={{ href: "#form", label: "تماس با ما" }}
      />

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
          <SectionHeading
            title="چرا نیرا؟"
            subtitle="تجربه، خلاقیت و کیفیت، کنار شما"
          />
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 sm:divide-x sm:divide-x-reverse divide-line">
            {why.map((w) => (
              <StaggerItem key={w.title} className="text-center px-3">
                <Icon name={w.icon} className="w-9 h-9 mx-auto text-accent" />
                <b className="block text-accent mt-4 text-sm">{w.title}</b>
                <span className="block text-xs text-muted mt-1.5 leading-6">{w.hint}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-blush">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeUp className="relative aspect-[5/4] rounded-2xl overflow-hidden order-2 md:order-1">
            <Image
              src="/img/products/nira-versace-crystal-noir.jpg"
              alt="فرآیند طراحی عطر اختصاصی"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </FadeUp>

          <FadeUp delay={0.1} className="order-1 md:order-2">
            <span className="eyebrow-latin block">Our Process</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-accent mt-3">فرآیند همکاری</h2>
            <p className="text-muted mt-4 leading-8 text-sm sm:text-base max-w-lg">
              از مشاوره‌ی اولیه تا تولید نهایی، در کنار شما هستیم. ما با درک نیازهای
              برند شما، رایحه‌ای اختصاصی و متناسب با هویت کسب‌وکارتان طراحی می‌کنیم.
            </p>

            <ol className="mt-8 space-y-4">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-4">
                  <span className="text-sm text-accent flex-1 border-b border-dashed border-line pb-3">
                    {s}
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
            <span className="eyebrow-latin block">Request a Quote</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-accent mt-3">
              شروع همکاری سازمانی
            </h2>
            <p className="text-muted mt-4 leading-8 text-sm sm:text-base max-w-md">
              اطلاعات پروژه‌ی خود را ثبت کنید؛ تیم نیرا ظرف ۴۸ ساعت با شما تماس می‌گیرد.
            </p>
            <div className="flex flex-wrap gap-2 mt-7 text-xs text-muted">
              {[
                { icon: "shield" as const, label: "محرمانگی کامل بریف برند" },
                { icon: "flask" as const, label: "نمونه رایگان اولیه" },
                { icon: "box" as const, label: "امکان تیراژ سفارشی" },
              ].map((chip) => (
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
        eyebrow="برند خود را متمایز کنید"
        title="همین حالا با ما تماس بگیرید"
        href="/contact"
        label="تماس با ما"
        image="/img/products/nira-esentric-molecules-o2.jpg"
      />
    </div>
  );
}
