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
  /** Poster/product shot. Empty until the AI banner is ready. */
  image?: string;
  /** Wide crop for the page banner, when `image` is a tall poster. */
  heroImage?: string;
  intro: string;
  sections: { title: string; body: string }[];
};

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
    title: "شرکت زست المان",
    desc: "طراحی عطر و بسته‌بندی",
    client: "زست المان",
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
    slug: "federal-production",
    category: "gift",
    title: "شرکت تولیدی فدرال",
    desc: "طراحی و تولید عطر سازمانی",
    client: "تولیدی فدرال",
    year: "به‌زودی",
    scope: [
      "طراحی رایحه اختصاصی",
      "لیبل و بسته‌بندی سازمانی",
      "تولید تیراژ سفارشی",
      "تحویل هماهنگ",
    ],
    intro:
      "همکاری نیرا با شرکت تولیدی فدرال برای طراحی و تولید عطر سازمانی؛ محصولی متناسب با هویت شرکت که به‌عنوان هدیه به مشتریان و همکاران ارائه می‌شود. (متن نمونه — پس از دریافت اطلاعات نهایی پروژه جایگزین می‌شود.)",
    sections: [
      {
        title: "نقطه شروع",
        body: "بریف شرکت بررسی و مسیر رایحه‌ای پروژه بر اساس هویت و مخاطبان آن مشخص شد.",
      },
      {
        title: "طراحی و تولید",
        body: "نمونه‌های اولیه ساخته، ارزیابی و پس از تأیید در تیراژ مورد نیاز تولید شد.",
      },
      {
        title: "تحویل",
        body: "محصول نهایی در بسته‌بندی هماهنگ با برند تحویل داده شد.",
      },
    ],
  },
  {
    slug: "ariya-profile-chabahar",
    category: "gift",
    title: "شرکت تعاونی آریا پروفیل چابهار",
    desc: "گیفت سازمانی و بسته‌بندی اختصاصی",
    client: "تعاونی آریا پروفیل چابهار",
    year: "به‌زودی",
    scope: [
      "طراحی هویت رایحه‌ای",
      "لیبل اختصاصی",
      "تولید عطر سازمانی",
      "بسته‌بندی هدیه",
    ],
    intro:
      "طراحی و تولید هدیه‌ی سازمانی برای شرکت تعاونی آریا پروفیل چابهار؛ عطری که هویت و ریشه‌ی شرکت را در قالب یک هدیه‌ی ماندگار منتقل می‌کند. (متن نمونه — پس از دریافت اطلاعات نهایی پروژه جایگزین می‌شود.)",
    sections: [
      {
        title: "هویت بصری",
        body: "لیبل و بسته‌بندی با الهام از هویت شرکت و فضای جنوب کشور طراحی شد.",
      },
      {
        title: "رایحه",
        body: "رایحه‌ای مناسب استفاده‌ی روزمره و پسند طیف وسیعی از مخاطبان انتخاب شد.",
      },
      {
        title: "تحویل",
        body: "محصول نهایی در تیراژ سفارشی تولید و تحویل داده شد.",
      },
    ],
  },
  {
    slug: "spark-company",
    category: "bottle",
    title: "شرکت اسپارک کمپانی",
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
    slug: "ariya-ofogh-pasargad",
    category: "gift",
    title: "شرکت آریا افق پاسارگاد",
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
