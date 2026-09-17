import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";
import { FeatureStrip, QuoteBand, SectionHeading, type Feature } from "@/components/Sections";
import { Icon, type IconName } from "@/components/Icon";
import { siteInfo } from "@/lib/site";

export const metadata = {
  title: "درباره ما | نیرا",
  description:
    "نیرا، داستانی از عشق به زیبایی؛ از مواد اولیه مرغوب تا رایحه‌هایی که بخشی از هویت شما می‌شوند.",
};

const features: Feature[] = [
  { icon: "leaf", title: "مواد اولیه مرغوب", hint: "با کیفیت بالا" },
  { icon: "diamond", title: "کیفیت تضمینی", hint: "در تمام مراحل" },
  { icon: "shield", title: "تضمین اصالت", hint: "محصولات" },
  { icon: "heart", title: "رضایت مشتریان", hint: "هدف ماست" },
];

const values: { icon: IconName; title: string }[] = [
  { icon: "flower", title: "کیفیت" },
  { icon: "shield", title: "اعتماد" },
  { icon: "leaf", title: "پایداری" },
  { icon: "heart", title: "عشق به زیبایی" },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title="درباره ما"
        titleAccent="داستانی از عشق به زیبایی"
        description="ما در نیرا باور داریم که عطر فقط یک رایحه نیست؛ یک خاطره است، یک احساس، بخشی از هویت شماست. از همین رو با عشق و دقت، رایحه‌هایی خلق می‌کنیم که در هر لحظه همراه شما باشند."
        image="/img/brand/hero-rose.png"
        cta={{ href: "/contact", label: "ما را بیشتر بشناسید" }}
      />

      <FeatureStrip items={features} tone="surface" />

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeUp className="relative aspect-[5/4] rounded-2xl overflow-hidden order-2 md:order-1">
            <Image
              src="/img/brand/marble-rose.png"
              alt="قصه‌ی نیرا"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </FadeUp>

          <FadeUp delay={0.1} className="order-1 md:order-2">
            <span className="eyebrow-latin block">Our Story</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-accent mt-3">قصه ما</h2>
            <p className="text-muted mt-5 leading-8 text-sm sm:text-base max-w-lg">
              نیرا با هدف ارائه‌ی عطرهای لوکس و ماندگار متولد شد. ما با تیمی از
              علاقه‌مندان به هنر عطرسازی، تلاش می‌کنیم تا با ترکیبی از سنت و نوآوری،
              تجربه‌ای منحصربه‌فرد از عطر را برای شما طراحی کنیم.
            </p>
            <span className="block mt-6 text-rose text-lg italic">
              {siteInfo.tagline}
            </span>
          </FadeUp>
        </div>
      </section>

      <section className="bg-blush">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
          <SectionHeading eyebrow="Our Values" title="ارزش‌های ما" />
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((v) => (
              <StaggerItem key={v.title} className="text-center">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface text-accent">
                  <Icon name={v.icon} className="w-8 h-8" />
                </span>
                <b className="block text-accent mt-4 text-sm">{v.title}</b>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <QuoteBand
        quote="«هر عطر، داستانی دارد؛ و ما این داستان‌ها را با شما به اشتراک می‌گذاریم.»"
        author="نیرا"
        image="/img/products/nira-spray-lifestyle.jpg"
      />
    </div>
  );
}
