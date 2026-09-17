import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/MotionSection";
import { siteInfo } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata = {
  title: "تماس با ما | نیرا عطر صحرا",
};

const infoRows = [
  `📍 دفتر مرکزی و پخش: ${siteInfo.address}`,
  `☎ ${siteInfo.landline}`,
  `📱 ${siteInfo.phone} | ${siteInfo.phoneAlt}`,
  `🎧 پشتیبانی آنلاین: ${siteInfo.support}`,
  `📷 اینستاگرام: ${siteInfo.instagramHandle}`,
  `🕘 ${siteInfo.hours}`,
];

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="در ارتباط باشید"
        title="تماس با نیرا"
        description="برای خرید، همکاری سازمانی یا هر سوالی، تیم ما آماده‌ی پاسخگویی است."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 grid md:grid-cols-2 gap-12">
        <FadeUp className="space-y-3">
          {infoRows.map((row) => (
            <div
              key={row}
              className="rounded-xl border border-line bg-surface px-4 py-3 text-sm"
            >
              {row}
            </div>
          ))}
        </FadeUp>

        <FadeUp delay={0.1}>
          <ContactForm />
        </FadeUp>
      </div>
    </div>
  );
}
