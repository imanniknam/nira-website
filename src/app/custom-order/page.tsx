import Link from "next/link";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";
import { CustomOrderForm } from "./CustomOrderForm";

export const metadata = {
  title: "سفارش عطر اختصاصی سازمانی | نیرا عطر صحرا",
};

const steps = [
  {
    num: "۰۱",
    title: "جلسه‌ی مشاوره و بریف برند",
    desc: "شناخت هویت برند، مخاطب هدف و پیام رایحه‌ای مورد نظر شما.",
  },
  {
    num: "۰۲",
    title: "طراحی فرمول و تست رایحه",
    desc: "ساخت چند نمونه‌ی اولیه توسط عطارهای نیرا و ارزیابی مشترک.",
  },
  {
    num: "۰۳",
    title: "طراحی بطری و بسته‌بندی",
    desc: "طراحی اختصاصی لیبل، رنگ و جعبه با هویت بصری برند شما.",
  },
  {
    num: "۰۴",
    title: "تولید انبوه و تحویل",
    desc: "تولید نهایی در تیراژ درخواستی و تحویل به‌موقع برای رویداد یا کمپین.",
  },
];

const audience = [
  "🏢 شرکت‌ها و هلدینگ‌هایی که به‌دنبال هدیه‌ای متمایز برای مشتریان و کارکنان هستند",
  "🎪 برندهایی که در نمایشگاه‌های تخصصی حضور دارند و به یک رایحه‌ی برند نیاز دارند",
  "🎁 مناسبت‌های سازمانی، افتتاحیه‌ها و رویدادهای ویژه",
  "🛍️ فروشگاه‌ها و برندهایی که می‌خواهند خط تولید عطر اختصاصی خود را راه‌اندازی کنند",
];

export default function CustomOrderPage() {
  return (
    <div>
      <section className="border-b border-line bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
          <FadeUp className="max-w-2xl">
            <span className="text-accent text-sm">خدمات سازمانی نیرا</span>
            <h1 className="text-3xl sm:text-4xl font-bold mt-3">
              عطر اختصاصی، <em className="not-italic text-accent">امضای برند شما</em>
            </h1>
            <p className="text-muted mt-4 leading-7">
              از هدایای تبلیغاتی نمایشگاهی تا رایحه‌ی اختصاصی سازمانی — تیم نیرا رایحه‌ای
              می‌سازد که فقط متعلق به برند شماست.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="#form"
                className="rounded-full bg-accent hover:bg-accent-dark transition-colors text-white px-6 py-3 text-sm"
              >
                درخواست مشاوره رایگان
              </Link>
              <Link
                href="/archive"
                className="rounded-full border border-line hover:border-accent transition-colors px-6 py-3 text-sm"
              >
                مشاهده نمونه‌کارها
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
        <FadeUp className="mb-8">
          <span className="text-accent text-sm">فرآیند کار</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2">از ایده تا بطری نهایی</h2>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <StaggerItem key={s.num}>
              <div className="rounded-2xl border border-line bg-surface p-6 h-full">
                <div className="text-3xl font-bold text-accent/40">{s.num}</div>
                <h4 className="font-medium mt-3">{s.title}</h4>
                <p className="text-muted text-sm mt-2 leading-6">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-surface border-y border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
          <FadeUp>
            <span className="text-accent text-sm">چه کسانی مناسب این خدمت هستند؟</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6">
              هدایای تبلیغاتی و رایحه‌ی سازمانی
            </h2>
            <ul className="space-y-3 max-w-2xl">
              {audience.map((a) => (
                <li key={a} className="text-muted leading-7">
                  {a}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      <section id="form" className="max-w-6xl mx-auto px-4 sm:px-8 py-20 grid md:grid-cols-2 gap-12">
        <FadeUp>
          <span className="text-accent text-sm">فرم درخواست</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2">شروع همکاری سازمانی</h2>
          <p className="text-muted mt-3 leading-7">
            اطلاعات پروژه‌ی خود را ثبت کنید؛ تیم نیرا ظرف ۴۸ ساعت با شما تماس می‌گیرد.
          </p>
          <div className="flex flex-wrap gap-2 mt-6 text-xs text-muted">
            <span className="rounded-full border border-line px-3 py-1.5">
              🔒 محرمانگی کامل بریف برند
            </span>
            <span className="rounded-full border border-line px-3 py-1.5">
              🧪 نمونه رایگان اولیه
            </span>
            <span className="rounded-full border border-line px-3 py-1.5">
              📦 امکان تیراژ سفارشی
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <CustomOrderForm />
        </FadeUp>
      </section>
    </div>
  );
}
