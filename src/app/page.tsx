import Link from "next/link";
import Image from "next/image";
import { getDiscountedProducts, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { CountdownTimer } from "@/components/CountdownTimer";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";
import { HeroSlider } from "@/components/HeroSlider";

const brands = [
  "CARON",
  "FENDI",
  "JIMMY CHOO",
  "KARL LAGERFELD",
  "JAGUAR",
  "TRUSSARDI",
  "BALDESSARINI",
  "PACO RABANNE",
  "CREED",
  "LALIQUE",
  "CHANEL",
];

const promoBanners = [
  {
    href: "/custom-order",
    image: "/img/brand/packaging-box.jpg",
    eyebrow: "خدمات سازمانی",
    title: "عطر اختصاصی برند شما",
    cta: "ثبت سفارش",
  },
  {
    href: "/catalog",
    image: "/img/brand/shop-shelf.jpg",
    eyebrow: "کاتالوگ نیرا",
    title: "همه‌ی رایحه‌ها یک‌جا",
    cta: "مشاهده کاتالوگ",
  },
];

const giftIdeas = [
  { href: "/shop?cat=women", title: "هدیه برای خانم‌ها" },
  { href: "/shop?cat=men", title: "هدیه برای آقایان" },
  { href: "/shop?pack=%D8%A8%D8%A7%D8%B2%D8%B1%DA%AF%D8%A7%D9%86%DB%8C+%D9%86%DB%8C%D8%B1%D8%A7", title: "جعبه‌های جادویی" },
  { href: "/shop?avail=onsale", title: "کادوهای تخفیف‌دار" },
  { href: "/shop", title: "هدیه برای دوستان" },
];

const magazine = [
  {
    tag: "نمایشگاه",
    title: "برگزاری نمایشگاه عطر و ادکلن در شرکت نفت مناطق مرکزی ایران",
    image: "/img/brand/storefront-sign.jpg",
  },
  {
    tag: "همکاری",
    title: "همکاری نیرا و Zest در طراحی و تولید عطر تبلیغاتی اختصاصی",
    image: "/img/archive/zest-mattress-aqua.png",
  },
  {
    tag: "همکاری",
    title: "همکاری نیرا عطر صحرا با شرکت اسپارک کمپانی",
    image: "/img/brand/brochure-spread.jpg",
  },
  {
    tag: "پروژه",
    title: "همکاری نیرا عطر صحرا و آریا افق پاسارگاد",
    image: "/img/archive/ariya-ofogh-pasargad-aventus.png",
  },
];

const categories = [
  {
    href: "/shop?cat=women",
    label: "عطرهای زنانه",
    hint: "ظرافت و ماندگاری",
    image:
      products.find((p) => p.category === "women")?.image ?? products[0].image,
  },
  {
    href: "/shop?cat=men",
    label: "عطرهای مردانه",
    hint: "قدرت و ماندگاری",
    image: products.find((p) => p.category === "men")?.image ?? products[0].image,
  },
  {
    href: "/catalog",
    label: "کاتالوگ نیرا",
    hint: "مجموعه‌ی کامل رایحه‌ها",
    image: "/img/brand/shop-shelf.jpg",
  },
  {
    href: "/custom-order",
    label: "عطر اختصاصی سازمانی",
    hint: "برای برند شما",
    image: "/img/brand/packaging-box.jpg",
  },
];

export default function Home() {
  const featured = products.slice(0, 4);
  const deals = getDiscountedProducts();

  return (
    <div>
      <HeroSlider />

      <div className="border-y border-line bg-surface overflow-hidden">
        <div className="flex gap-10 py-4 px-4 text-sm text-muted whitespace-nowrap animate-[marquee_28s_linear_infinite]">
          {[...brands, ...brands].map((b, i) => (
            <span key={i}>{b}</span>
          ))}
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-20">
        <Stagger className="grid sm:grid-cols-2 gap-4">
          {promoBanners.map((b) => (
            <StaggerItem key={b.href}>
              <Link
                href={b.href}
                className="group relative block aspect-[16/7] rounded-2xl overflow-hidden"
              >
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-center items-start text-white">
                  <span className="text-xs text-white/80">{b.eyebrow}</span>
                  <b className="block text-lg sm:text-xl mt-1 max-w-[16ch]">{b.title}</b>
                  <span className="mt-4 rounded-full bg-white/15 group-hover:bg-accent transition-colors backdrop-blur px-4 py-2 text-xs">
                    {b.cta}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {deals.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
          <FadeUp className="rounded-2xl bg-gradient-to-l from-accent-dark to-accent text-white overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8">
              <div>
                <span className="text-white/80 text-sm">فروش ویژه</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                  پیشنهاد شگفت‌انگیز نیرا ⚡
                </h2>
                <p className="text-white/80 text-sm mt-2">
                  تا پایان زمان زیر، این رایحه‌ها با تخفیف ویژه در دسترس‌اند.
                </p>
              </div>
              <CountdownTimer />
            </div>
            {/* Reset the colour the banner sets, otherwise the cards inherit
                white text onto this white panel and prices vanish. */}
            <div className="bg-white text-foreground p-4 sm:p-6">
              <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {deals.map((p) => (
                  <StaggerItem key={p.id}>
                    <ProductCard product={p} />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </FadeUp>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-20">
        <FadeUp className="rounded-2xl bg-gradient-to-l from-accent-dark to-accent text-white p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            هدیه چی بدم؟!
          </h2>
          <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {giftIdeas.map((g) => (
              <StaggerItem key={g.title}>
                <Link
                  href={g.href}
                  className="group block rounded-xl bg-white/10 hover:bg-white transition-colors p-4 text-center h-full"
                >
                  <b className="block text-sm group-hover:text-accent-dark transition-colors">
                    {g.title}
                  </b>
                  <span className="inline-block mt-3 text-xs text-white/80 group-hover:text-accent transition-colors">
                    مشاهده
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </FadeUp>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
        <FadeUp className="flex items-end justify-between mb-8">
          <div>
            <span className="text-accent text-sm">دسته‌بندی‌ها</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              دنیای رایحه‌ی نیرا را کشف کنید
            </h2>
          </div>
          <Link href="/shop" className="text-sm text-accent hover:underline hidden sm:block">
            مشاهده همه
          </Link>
        </FadeUp>

        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <StaggerItem key={c.href}>
              <Link
                href={c.href}
                className="group relative block aspect-[4/5] rounded-2xl overflow-hidden"
              >
                <Image
                  src={c.image}
                  alt={c.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 right-4 text-white">
                  <b className="block text-sm">{c.label}</b>
                  <span className="text-xs text-white/80">{c.hint}</span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-4 pb-20">
        <FadeUp className="flex items-end justify-between mb-8">
          <div>
            <span className="text-accent text-sm">پرفروش‌ترین‌ها</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">محصولات منتخب</h2>
          </div>
          <Link
            href="/shop"
            className="text-sm text-accent hover:underline hidden sm:block"
          >
            مشاهده فروشگاه
          </Link>
        </FadeUp>

        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-20">
        <FadeUp className="flex items-end justify-between mb-8">
          <div>
            <span className="text-accent text-sm">اخبار و رویدادها</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">مجلهٔ نیرا</h2>
          </div>
          <Link href="/archive" className="text-sm text-accent hover:underline hidden sm:block">
            آرشیو پروژه‌ها
          </Link>
        </FadeUp>

        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {magazine.map((post) => (
            <StaggerItem key={post.title}>
              <Link
                href="/archive"
                className="group block rounded-2xl border border-line bg-surface overflow-hidden h-full"
              >
                <div className="relative aspect-[4/3] bg-white">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[11px] rounded-full bg-accent/10 text-accent px-2 py-0.5">
                    {post.tag}
                  </span>
                  <h3 className="text-sm mt-2 leading-6 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-surface border-y border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20 grid md:grid-cols-2 gap-10 items-center">
          <FadeUp>
            <span className="text-accent text-sm">خدمات سازمانی</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              عطرهایی که برای برندهای بزرگ ساختیم
            </h2>
            <p className="text-muted mt-4 leading-7">
              از عطر تبلیغاتی اختصاصی برای شرکت‌های صنعتی و انرژی تا هدایای سازمانی
              نمایشگاهی؛ نیرا شریک رایحه‌ی برند شماست.
            </p>
            <Link
              href="/archive"
              className="inline-block mt-6 rounded-full border border-line hover:border-accent transition-colors px-6 py-3 text-sm"
            >
              مشاهده آرشیو پروژه‌ها
            </Link>
          </FadeUp>
          <FadeUp delay={0.1} className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square rounded-2xl border border-line overflow-hidden bg-white">
              <Image
                src="/img/archive/zest-mattress-aqua.png"
                alt="پروژه Zest — آلمان"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-2xl border border-line overflow-hidden bg-white">
              <Image
                src="/img/archive/ariya-ofogh-pasargad-aventus.png"
                alt="پروژه آریا افق پاسارگاد"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-8 py-20 text-center">
        <FadeUp>
          <p className="text-xl sm:text-2xl leading-relaxed">
            &rdquo;نیرا تنها یک برند عطر نیست، بلکه یک تجربه‌ی حسی از طبیعت و احساسات
            است که در هر قطره جاری می‌شود.&ldquo;
          </p>
          <span className="block text-muted text-sm mt-4">
            — تیم طراحی نیرا عطر صحرا
          </span>
        </FadeUp>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-20">
        <FadeUp className="rounded-2xl bg-surface border border-line p-8 sm:p-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="text-accent text-sm">خدمات سازمانی</span>
            <h3 className="text-xl sm:text-2xl font-bold mt-2">
              می‌خواهید عطر اختصاصی برند خودتان را بسازید؟
            </h3>
            <p className="text-muted mt-2">
              از طراحی رایحه تا تولید و بسته‌بندی اختصاصی — همه در یک مسیر.
            </p>
          </div>
          <Link
            href="/custom-order"
            className="rounded-full bg-accent hover:bg-accent-dark transition-colors text-white px-6 py-3 text-sm whitespace-nowrap"
          >
            شروع سفارش سازمانی
          </Link>
        </FadeUp>
      </section>
    </div>
  );
}
