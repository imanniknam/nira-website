import type { IconName } from "@/components/Icon";

export type EventCategory = "intl" | "local" | "photos";

export type GalleryEvent = {
  slug: string;
  category: EventCategory;
  /** Card headline. */
  title: string;
  /** Place · date line under the title. */
  meta: string;
  location: string;
  date: string;
  image: string;
  /** Wide banner for the page header; the card image stays uncropped below. */
  heroImage?: string;
  gallery: string[];
  intro: string;
  /** Short bullets shown as the "نگاه کلی" list. */
  highlights: string[];
  sections: { title: string; body: string }[];
  /** Optional archive project this event belongs to. */
  relatedProject?: string;
};

export const eventFilters: { key: "all" | EventCategory; label: string; icon: IconName }[] = [
  { key: "all", label: "همه رویدادها", icon: "calendar" },
  { key: "intl", label: "همکاری‌های بین‌المللی", icon: "globe" },
  { key: "local", label: "رویدادهای داخلی", icon: "building" },
  { key: "photos", label: "گالری تصاویر", icon: "image" },
];

export const eventCategoryLabels: Record<EventCategory, string> = {
  intl: "همکاری بین‌المللی",
  local: "رویداد داخلی",
  photos: "گالری تصاویر",
};

export const events: GalleryEvent[] = [
  {
    slug: "naft-markazi-exhibition",
    category: "local",
    title: "نمایشگاه عطر و ادکلن در شرکت نفت مناطق مرکزی ایران",
    meta: "ایران · مرداد ۱۴۰۴",
    location: "تهران، ایران",
    date: "مرداد ۱۴۰۴",
    image: "/img/brand/shop-shelf-rose.jpg",
    heroImage: "/img/brand/gallery-hero.png",
    gallery: [
      "/img/brand/shop-shelf-rose.jpg",
      "/img/products/signature-set-four-rose.jpg",
      "/img/products/signature-set-tester-rose.jpg",
    ],
    intro:
      "برگزاری نمایشگاه اختصاصی عطر و ادکلن نیرا در محل شرکت نفت مناطق مرکزی ایران؛ فرصتی برای معرفی حضوری مجموعه‌ی رایحه‌ها به کارکنان سازمان و مشاوره‌ی تخصصی انتخاب عطر.",
    highlights: [
      "غرفه‌ی اختصاصی در محل سازمان",
      "تست حضوری مجموعه‌ی کامل رایحه‌ها",
      "مشاوره‌ی تخصصی انتخاب عطر",
    ],
    sections: [
      {
        title: "چیدمان غرفه",
        body: "ست تستر کامل نیرا در غرفه مستقر شد تا بازدیدکنندگان بتوانند طیف وسیعی از رایحه‌ها را در یک نشست تست کنند.",
      },
      {
        title: "مشاوره رایحه",
        body: "کارشناسان نیرا در طول رویداد، بر اساس سلیقه و سبک زندگی هر بازدیدکننده، گزینه‌ی متناسب را پیشنهاد دادند.",
      },
    ],
    relatedProject: "naft-markazi",
  },
  {
    slug: "zest-collaboration",
    category: "intl",
    title: "همکاری نیرا و Zest در طراحی عطر تبلیغاتی اختصاصی",
    meta: "آلمان · تیر ۱۴۰۴",
    location: "آلمان",
    date: "تیر ۱۴۰۴",
    image: "/img/archive/zest-mattress-aqua.png",
    heroImage: "/img/archive/zest-hero.png",
    gallery: [
      "/img/archive/zest-hero.png",
      "/img/archive/zest-mattress-aqua.png",
      "/img/brand/packaging-box-rose.jpg",
    ],
    intro:
      "همکاری با برند آلمانی Zest برای طراحی و تولید یک عطر تبلیغاتی اختصاصی؛ رایحه‌ای که حس تازگی محصولات این برند را در قالب یک هدیه‌ی ماندگار منتقل می‌کند.",
    highlights: [
      "طراحی رایحه بر اساس بریف برند",
      "بسته‌بندی هماهنگ با هویت بصری",
      "تولید در تیراژ سفارشی",
    ],
    sections: [
      {
        title: "از بریف تا نمونه",
        body: "تیم نیرا پس از تحلیل هویت برند، چند نمونه‌ی اولیه ساخت و نسخه‌ی نهایی در جلسات مشترک انتخاب شد.",
      },
      {
        title: "تحویل",
        body: "محصول نهایی با لیبل و جعبه‌ی اختصاصی برند تولید و برای کمپین تبلیغاتی Zest تحویل داده شد.",
      },
    ],
    relatedProject: "zest-germany",
  },
  {
    slug: "bashgah-naft",
    category: "local",
    title: "حضور نیرا در باشگاه شماره یک شرکت نفت",
    meta: "تهران · تیر ۱۴۰۴",
    location: "تهران، ایران",
    date: "تیر ۱۴۰۴",
    image: "/img/brand/storefront-sign-rose.jpg",
    gallery: ["/img/brand/storefront-sign-rose.jpg", "/img/brand/shop-shelf-rose.jpg"],
    intro:
      "حضور نیرا در باشگاه شماره یک شرکت نفت با غرفه‌ای برای معرفی مجموعه‌ی رایحه‌ها، تست حضوری محصولات و ارائه‌ی گیفت رویداد به مهمانان.",
    highlights: ["غرفه‌سازی و چیدمان محصول", "تست حضوری رایحه‌ها", "گیفت اختصاصی رویداد"],
    sections: [
      {
        title: "مسیر بازدیدکننده",
        body: "چیدمان غرفه طوری طراحی شد که مسیر بازدیدکننده از معرفی برند تا تست رایحه و مشاوره، پیوسته و بدون ازدحام باشد.",
      },
    ],
    relatedProject: "bashgah-naft",
  },
  {
    slug: "ariya-ofogh-pasargad",
    category: "intl",
    title: "همکاری نیرا عطر صحرا و آریا افق پاسارگاد",
    meta: "ایران · تیر ۱۴۰۴",
    location: "ایران",
    date: "تیر ۱۴۰۴",
    image: "/img/archive/ariya-ofogh-pasargad-aventus.png",
    gallery: [
      "/img/archive/ariya-ofogh-pasargad-aventus.png",
      "/img/products/signature-set-tester-rose.jpg",
    ],
    intro:
      "طراحی و تولید هدیه‌ی سازمانی برای آریا افق پاسارگاد؛ عطری با لیبل اختصاصی که نقش‌مایه‌های ایرانی برند روی آن نشسته است.",
    highlights: ["لیبل اختصاصی با نقوش پاسارگاد", "رایحه‌ی مناسب محیط کاری", "بسته‌بندی هدیه"],
    sections: [
      {
        title: "هویت بصری",
        body: "لیبل محصول با الهام از نقوش پاسارگاد طراحی شد تا هدیه، پیش از باز شدن هم، ریشه‌ی برند را روایت کند.",
      },
    ],
    relatedProject: "ariya-ofogh-pasargad",
  },
  {
    slug: "product-photography",
    category: "photos",
    title: "عکاسی و محتوای تبلیغاتی محصولات نیرا",
    meta: "استودیو برند",
    location: "استودیو نیرا",
    date: "۱۴۰۴",
    image: "/img/products/nira-de-marly-pegasus.jpg",
    gallery: [
      "/img/products/nira-esentric-molecules-o2.jpg",
      "/img/products/nira-lamour-lalique.jpg",
      "/img/products/nira-versace-lifestyle.jpg",
    ],
    intro:
      "مجموعه‌ای از قاب‌های استودیویی و لایف‌استایل که برای معرفی محصولات نیرا در کاتالوگ، فروشگاه آنلاین و شبکه‌های اجتماعی تولید شده‌اند.",
    highlights: ["عکاسی محصول در نور کنترل‌شده", "قاب‌های لایف‌استایل", "خروجی چندفرمته"],
    sections: [
      {
        title: "رویکرد بصری",
        body: "هر رایحه در فضایی عکاسی شد که با شخصیت آن هم‌خوان باشد؛ از میز کار و سفر تا قاب‌های شبانه.",
      },
    ],
    relatedProject: "product-content",
  },
  {
    slug: "gift-sets",
    category: "photos",
    title: "ست‌های هدیه و گیفت سازمانی نیرا",
    meta: "گالری تصاویر",
    location: "استودیو نیرا",
    date: "۱۴۰۴",
    image: "/img/products/signature-set-four-rose.jpg",
    gallery: [
      "/img/products/signature-set-four-rose.jpg",
      "/img/brand/packaging-box-rose.jpg",
      "/img/products/signature-set-tester-rose.jpg",
    ],
    intro:
      "نمونه‌هایی از ست‌های هدیه و گیفت سازمانی نیرا؛ از بطری‌های رنگی مجموعه تا جعبه‌های اختصاصی برند.",
    highlights: ["ست چهارتایی رایحه‌ها", "جعبه‌ی اختصاصی برند", "ست تستر سازمانی"],
    sections: [
      {
        title: "بسته‌بندی",
        body: "جعبه‌ها و ست‌ها طوری طراحی شده‌اند که هم برای هدیه‌ی فردی و هم برای تیراژ سازمانی قابل استفاده باشند.",
      },
    ],
  },
];

export function getEvent(slug: string): GalleryEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getRelatedEvents(slug: string, count = 2): GalleryEvent[] {
  const current = getEvent(slug);
  const sameCategory = current
    ? events.filter((e) => e.slug !== slug && e.category === current.category)
    : [];
  const rest = events.filter((e) => e.slug !== slug && !sameCategory.includes(e));
  return [...sameCategory, ...rest].slice(0, count);
}
