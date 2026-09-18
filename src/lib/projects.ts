import type { IconName } from "@/components/Icon";

export type ProjectCategory = "perfume" | "bottle" | "gift" | "content";

export type Project = {
  slug: string;
  category: ProjectCategory;
  /** Card headline. */
  title: string;
  /** One-line summary under the card title. */
  desc: string;
  client: string;
  year: string;
  /** What نیرا delivered — rendered as the scope list on the detail page. */
  scope: string[];
  image: string;
  /** Wide crop for the page banner, when `image` is a tall poster. */
  heroImage?: string;
  intro: string;
  sections: { title: string; body: string }[];
};

export const projectFilters: { key: "all" | ProjectCategory; label: string; icon: IconName }[] = [
  { key: "all", label: "همه", icon: "grid" },
  { key: "bottle", label: "طراحی شیشه", icon: "image" },
  { key: "content", label: "محتوای تبلیغاتی", icon: "play" },
  { key: "gift", label: "گیفت سازمانی", icon: "gift" },
  { key: "perfume", label: "طراحی و تولید عطر", icon: "flask" },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  perfume: "طراحی و تولید عطر",
  bottle: "طراحی شیشه",
  gift: "گیفت سازمانی",
  content: "محتوای تبلیغاتی",
};

export const projects: Project[] = [
  {
    slug: "zest-germany",
    category: "perfume",
    title: "پروژه شرکت Zest — آلمان",
    desc: "طراحی عطر و بسته‌بندی",
    client: "Zest",
    year: "۱۴۰۴",
    scope: ["طراحی رایحه اختصاصی", "تولید نمونه و تست کیفیت", "طراحی بسته‌بندی", "تولید تیراژ سفارشی"],
    image: "/img/archive/zest-mattress-aqua.png",
    heroImage: "/img/archive/zest-hero.png",
    intro:
      "همکاری نیرا با برند Zest برای طراحی و تولید یک عطر تبلیغاتی اختصاصی؛ رایحه‌ای که قرار بود حس تازگی و آرامش محصولات این برند را در قالب یک هدیه‌ی ماندگار منتقل کند.",
    sections: [
      {
        title: "نقطه شروع",
        body: "بریف برند بر پایه‌ی سه کلمه بسته شد: تازگی، آرامش و کیفیت. تیم ما با تحلیل هویت بصری و مخاطب برند، مسیر رایحه‌ای پروژه را مشخص کرد.",
      },
      {
        title: "طراحی رایحه",
        body: "چند نمونه‌ی اولیه توسط عطارهای نیرا ساخته و در جلسات مشترک ارزیابی شد. نسخه‌ی نهایی با نت‌های آبی و خنک، متناسب با فضای محصولات برند انتخاب شد.",
      },
      {
        title: "بسته‌بندی و تحویل",
        body: "لیبل، رنگ و جعبه بر اساس هویت بصری برند طراحی و پس از تأیید، در تیراژ درخواستی تولید و تحویل داده شد.",
      },
    ],
  },
  {
    slug: "ariya-ofogh-pasargad",
    category: "gift",
    title: "پروژه شرکت آریا افق پاسارگاد",
    desc: "گیفت سازمانی",
    client: "آریا افق پاسارگاد",
    year: "۱۴۰۴",
    scope: ["طراحی هویت رایحه‌ای", "طراحی لیبل اختصاصی", "تولید عطر سازمانی", "بسته‌بندی هدیه"],
    image: "/img/archive/ariya-ofogh-pasargad-aventus.png",
    heroImage: "/img/archive/ariya-hero.png",
    intro:
      "طراحی و تولید هدیه‌ی سازمانی برای آریا افق پاسارگاد؛ عطری با لیبل اختصاصی که نقش‌مایه‌های ایرانی برند روی آن نشسته و برای مشتریان و همکاران سازمان تولید شد.",
    sections: [
      {
        title: "هویت بصری",
        body: "لیبل محصول با الهام از نقوش پاسارگاد طراحی شد تا هدیه، پیش از باز شدن هم، نام و ریشه‌ی برند را روایت کند.",
      },
      {
        title: "رایحه",
        body: "رایحه‌ای گرم و ماندگار انتخاب شد که برای استفاده‌ی روزمره در محیط کاری مناسب باشد و طیف وسیعی از مخاطبان سازمان را پوشش دهد.",
      },
      {
        title: "تحویل",
        body: "محصول نهایی در بسته‌بندی هدیه و در تیراژ مورد نیاز سازمان تولید و تحویل شد.",
      },
    ],
  },
  {
    slug: "spark-company",
    category: "bottle",
    title: "پروژه شرکت اسپارک کمپانی",
    desc: "طراحی شیشه و هویت بصری — The Smell of Victory",
    client: "اسپارک کمپانی",
    year: "۱۴۰۴",
    scope: [
      "طراحی شیشه اختصاصی",
      "حکاکی لوگوی برند روی بطری",
      "هویت بصری و کمپین معرفی",
      "ست تستر",
    ],
    image: "/img/archive/spark-company-victory.jpg",
    heroImage: "/img/archive/spark-hero.png",
    intro:
      "همکاری با اسپارک کمپانی در طراحی شیشه و هویت بصری یک عطر اختصاصی با نام The Smell of Victory؛ رایحه‌ای با زبان بصری ورزشی که لوگوی برند روی بدنه‌ی بطری نشسته است.",
    sections: [
      {
        title: "طراحی فرم",
        body: "چند گزینه‌ی فرم بطری و درب بررسی شد تا ترکیبی انتخاب شود که هم در دست خوش‌دست باشد و هم روی ویترین دیده شود.",
      },
      {
        title: "هویت بصری",
        body: "نشان برند به‌صورت برجسته روی بدنه‌ی بطری اجرا شد و کمپین معرفی محصول با شعار The Smell of Victory در فضای ورزشگاه طراحی شد.",
      },
      {
        title: "ست تستر",
        body: "برای معرفی رایحه‌ها به مشتریان، یک ست تستر با چیدمان منظم و قابل حمل طراحی و تولید شد.",
      },
    ],
  },
  {
    slug: "product-content",
    category: "content",
    title: "عکاسی و محتوای تبلیغاتی محصولات نیرا",
    desc: "تولید ویدیو و عکاسی محصول",
    client: "نیرا عطر صحرا",
    year: "۱۴۰۴",
    scope: ["عکاسی محصول", "عکاسی لایف‌استایل", "تدوین ویدیو", "محتوای شبکه‌های اجتماعی"],
    image: "/img/products/nira-de-marly-pegasus.jpg",
    intro:
      "تولید بستهٔ کامل محتوای بصری برای معرفی محصولات نیرا؛ از عکاسی استودیویی محصول تا قاب‌های لایف‌استایل که رایحه را در موقعیت‌های واقعی زندگی روایت می‌کنند.",
    sections: [
      {
        title: "عکاسی محصول",
        body: "هر محصول در نور کنترل‌شده و روی زمینه‌های متناسب با شخصیت رایحه عکاسی شد تا جزئیات شیشه و لیبل به‌درستی دیده شود.",
      },
      {
        title: "قاب‌های لایف‌استایل",
        body: "مجموعه‌ای از صحنه‌های روزمره — میز کار، سفر، مهمانی — طراحی و اجرا شد تا محصول در بستر استفاده‌ی واقعی معرفی شود.",
      },
      {
        title: "خروجی",
        body: "خروجی نهایی برای کاتالوگ چاپی، فروشگاه آنلاین و شبکه‌های اجتماعی در ابعاد و فرمت‌های مختلف آماده شد.",
      },
    ],
  },
  {
    slug: "bashgah-naft",
    category: "gift",
    title: "باشگاه شماره یک شرکت نفت",
    desc: "حضور در رویداد و غرفه‌سازی",
    client: "باشگاه شماره یک شرکت نفت",
    year: "۱۴۰۴",
    scope: ["غرفه‌سازی", "چیدمان محصول", "مشاوره حضوری رایحه", "گیفت رویداد"],
    image: "/img/brand/shop-shelf-rose.jpg",
    intro:
      "حضور نیرا در باشگاه شماره یک شرکت نفت با غرفه‌ای برای معرفی مجموعه‌ی رایحه‌ها، تست حضوری محصولات و ارائه‌ی گیفت رویداد به مهمانان.",
    sections: [
      {
        title: "غرفه",
        body: "چیدمان غرفه طوری طراحی شد که مسیر بازدیدکننده از معرفی برند تا تست رایحه و مشاوره، پیوسته و بدون ازدحام باشد.",
      },
      {
        title: "مشاوره رایحه",
        body: "کارشناسان نیرا در طول رویداد، بر اساس سلیقه و سبک زندگی هر بازدیدکننده، رایحه‌ی متناسب را پیشنهاد دادند.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, count = 2): Project[] {
  const current = getProject(slug);
  const sameCategory = current
    ? projects.filter((p) => p.slug !== slug && p.category === current.category)
    : [];
  const rest = projects.filter((p) => p.slug !== slug && !sameCategory.includes(p));
  return [...sameCategory, ...rest].slice(0, count);
}
