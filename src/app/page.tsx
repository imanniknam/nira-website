import Image from "next/image";
import Link from "next/link";
import { visibleProducts } from "@/lib/products";
import { CollectionCard } from "@/components/ProductCard";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";
import { PageHero } from "@/components/PageHero";
import { FeatureStrip, type Feature } from "@/components/Sections";
import { Icon } from "@/components/Icon";

const features: Feature[] = [
  { icon: "truck", title: "ارسال سریع", hint: "به سراسر کشور" },
  { icon: "shield", title: "تضمین اصالت", hint: "محصولات" },
  { icon: "diamond", title: "کیفیت بالا", hint: "و ماندگاری رایحه" },
  { icon: "leaf", title: "رایحه‌های خاص", hint: "و متمایز" },
];

export default function Home() {
  const collection = visibleProducts.slice(0, 4);

  return (
    <div>
      <PageHero
        tall
        eyebrow="Nira Perfume"
        title="رایحه‌ای که"
        titleAccent="هویت شماست"
        description="عطرهایی خاص، با رایحه‌های ماندگار و طراحی منحصربه‌فرد. برای کسانی که متفاوت بودن را انتخاب می‌کنند."
        image="/img/brand/hero-rose.png"
        cta={{ href: "/shop", label: "مشاهده محصولات" }}
        secondaryCta={{ href: "/custom-order", label: "ساخت عطر اختصاصی برای شرکت‌ها" }}
      />

      <FeatureStrip items={features} tone="surface" />

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] gap-10 lg:gap-14 items-center">
          <FadeUp>
            <span className="eyebrow-latin block">Nira Collection</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-accent mt-3 leading-[1.5]">
              مجموعه
              <br />
              عطرهای نیرا
            </h2>
            <p className="text-muted mt-4 leading-8 text-sm">
              ترکیبی از ظرافت، اصالت و احساس، برای هر سلیقه‌ای.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 mt-6 text-sm text-rose hover:text-accent transition-colors"
            >
              مشاهده همه محصولات
              <Icon name="arrow" className="w-4 h-4" />
            </Link>
          </FadeUp>

          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {collection.map((p) => (
              <StaggerItem key={p.id}>
                <CollectionCard
                  href={`/product/${p.slug}`}
                  image={p.image}
                  title={p.name}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden dark-band text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 grid md:grid-cols-2 gap-10 items-center">
          <FadeUp>
            <span className="block text-white/70 text-sm">همکاری با شرکت‌ها</span>
            <h2 className="text-2xl sm:text-4xl font-bold mt-3 leading-[1.5]">
              ساخت عطر اختصاصی
              <br />
              برای برند شما
            </h2>
            <p className="text-white/80 mt-5 leading-8 text-sm sm:text-base max-w-md">
              از ایده تا رایحه. با ما همراه شوید تا عطر اختصاصی برندتان را متناسب با
              هویت و ارزش‌های کسب‌وکارتان طراحی و تولید کنیم.
            </p>
            <Link href="/custom-order" className="btn btn-ghost-light mt-8">
              شروع همکاری
              <Icon name="arrow" className="w-4 h-4" />
            </Link>
          </FadeUp>

          <FadeUp delay={0.1} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/img/products/nira-esentric-molecules-o2.jpg"
              alt="جعبه و بطری اختصاصی نیرا"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </FadeUp>
        </div>
      </section>

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeUp className="relative aspect-[5/3] rounded-2xl overflow-hidden order-2 md:order-1">
            <Image
              src="/img/brand/hero-rose.png"
              alt="نیرا — بیش از یک عطر"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </FadeUp>

          <FadeUp delay={0.1} className="order-1 md:order-2">
            <span className="block text-rose text-sm">درباره نیرا</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-accent mt-3 leading-[1.5]">
              عطر، هنر خلق
              <br />
              احساسات ماندگار
            </h2>
            <p className="text-muted mt-5 leading-8 text-sm sm:text-base">
              نیرا با الهام از زیبایی‌های طبیعت و هنر عطرسازی، رایحه‌هایی می‌سازد که
              فراتر از یک رایحه‌ی ساده هستند؛ عطر اختصاصی از یک داستانی از احساس، هویت و
              لحظه‌های خاص‌اند.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-6 text-sm text-rose hover:text-accent transition-colors"
            >
              بیشتر بدانید
              <Icon name="arrow" className="w-4 h-4" />
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
