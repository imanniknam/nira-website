/**
 * Every editable piece of site copy and every swappable image, with its
 * default. The admin panel builds its forms straight from this registry and
 * pages read values through `t(key)` (see ./index.ts) — an override saved from
 * the panel wins, otherwise the default below is used.
 */
export type FieldType = "text" | "textarea" | "image" | "url";

export type Field = { key: string; label: string; type: FieldType; def: string };
export type Group = { title: string; fields: Field[] };
export type Section = { id: string; title: string; hint?: string; groups: Group[] };

const f = (key: string, label: string, def: string, type: FieldType = "text"): Field => ({
  key,
  label,
  type,
  def,
});
const ta = (key: string, label: string, def: string) => f(key, label, def, "textarea");
const img = (key: string, label: string, def: string) => f(key, label, def, "image");
const url = (key: string, label: string, def: string) => f(key, label, def, "url");

const seo = (page: string, title: string, desc: string): Group => ({
  title: "سئو (عنوان و توضیح در گوگل)",
  fields: [f(`${page}.seo.title`, "عنوان صفحه", title), ta(`${page}.seo.desc`, "توضیح صفحه", desc)],
});

const hero = (
  page: string,
  d: { eyebrow: string; title: string; accent?: string; desc?: string; image: string; cta?: string },
): Group => ({
  title: "بنر بالای صفحه",
  fields: [
    f(`${page}.hero.eyebrow`, "برچسب لاتین بالای عنوان", d.eyebrow),
    f(`${page}.hero.title`, "عنوان", d.title),
    ...(d.accent !== undefined ? [f(`${page}.hero.accent`, "عنوان برجسته (خط دوم)", d.accent)] : []),
    ...(d.desc !== undefined ? [ta(`${page}.hero.desc`, "توضیح", d.desc)] : []),
    ...(d.cta !== undefined ? [f(`${page}.hero.cta`, "متن دکمه", d.cta)] : []),
    img(`${page}.hero.image`, "تصویر بنر", d.image),
  ],
});

const cta = (
  page: string,
  d: { eyebrow?: string; title: string; label: string; image: string },
): Group => ({
  title: "بخش دعوت به اقدام (پایین صفحه)",
  fields: [
    ...(d.eyebrow !== undefined ? [f(`${page}.cta.eyebrow`, "متن کوچک بالا", d.eyebrow)] : []),
    f(`${page}.cta.title`, "عنوان", d.title),
    f(`${page}.cta.label`, "متن دکمه", d.label),
    img(`${page}.cta.image`, "تصویر پس‌زمینه", d.image),
  ],
});

const features4 = [
  ["truck", "ارسال سریع", "به سراسر کشور"],
  ["shield", "تضمین اصالت", "محصولات"],
  ["diamond", "کیفیت بالا", "و ماندگاری رایحه"],
  ["leaf", "رایحه‌های خاص", "و متمایز"],
];

const why4 = (page: string, d: [string, string][]): Group => ({
  title: "چهار مزیت (آیکون‌دار)",
  fields: d.flatMap(([title, hint], i) => [
    f(`${page}.why.${i}.title`, `مزیت ${i + 1} — عنوان`, title),
    f(`${page}.why.${i}.hint`, `مزیت ${i + 1} — توضیح کوتاه`, hint),
  ]),
});

export const sections: Section[] = [
  {
    id: "site",
    title: "اطلاعات کلی سایت",
    hint: "نام برند، تلفن‌ها، نشانی، شبکه‌های اجتماعی، لوگو و فوتر که در تمام صفحات استفاده می‌شوند.",
    groups: [
      {
        title: "برند و لوگو",
        fields: [
          f("site.name", "نام برند", "نیرا عطر صحرا"),
          f("site.tagline", "شعار (لاتین)", "More Than Perfume"),
          img("site.logoPlum", "لوگو روی زمینه روشن (هدر)", "/logo-plum.svg"),
          img("site.logoCream", "لوگو روی زمینه تیره (فوتر)", "/logo-cream.svg"),
        ],
      },
      {
        title: "راه‌های ارتباطی",
        fields: [
          f("site.phone", "موبایل ۱", "۰۹۱۲۳۱۱۴۳۴۷"),
          f("site.phoneAlt", "موبایل ۲", "۰۹۱۲۴۳۷۶۸۲"),
          f("site.support", "شماره پشتیبانی", "۰۹۰۲۲۳۵۰۹۵۸"),
          f("site.landline", "تلفن ثابت", "۰۲۱-۶۶۶۴۳۷۱۵"),
          f("site.email", "ایمیل", "info@niraperfume.com"),
          f("site.address", "نشانی", "تهران، شادآباد، بلوک A پلاک ۱۵"),
          f("site.hours", "ساعات کاری", "شنبه تا پنج‌شنبه، ۹ تا ۱۹"),
          url("site.mapUrl", "لینک نقشه (گوگل‌مپ / نشان / بلد)", ""),
        ],
      },
      {
        title: "شبکه‌های اجتماعی",
        fields: [
          url("site.instagram", "اینستاگرام", "https://www.instagram.com/nira.perfume"),
          url("site.telegram", "تلگرام", "https://t.me/niraperfume"),
          url("site.linkedin", "لینکدین", "https://www.linkedin.com/company/niraperfume"),
          url("site.website", "وب‌سایت", "https://niraperfume.com"),
        ],
      },
      {
        title: "منوی سایت",
        fields: [
          f("nav.home", "خانه", "خانه"),
          f("nav.shop", "محصولات", "محصولات"),
          f("nav.archive", "آرشیو", "آرشیو"),
          f("nav.gallery", "گالری", "گالری"),
          f("nav.services", "خدمات", "خدمات ما"),
          f("nav.custom", "همکاری با شرکت‌ها", "همکاری با شرکت‌ها"),
          f("nav.contact", "تماس", "تماس با ما"),
          f("nav.catalog", "کاتالوگ (فقط فوتر)", "کاتالوگ نیرا"),
        ],
      },
      {
        title: "فوتر و سئوی پیش‌فرض",
        fields: [
          f("footer.copyright", "متن کپی‌رایت", "© ۱۴۰۴ نیرا عطر صحرا. تمامی حقوق محفوظ است."),
          f("site.seo.title", "عنوان پیش‌فرض سایت", "نیرا | رایحه‌ای که هویت شماست"),
          ta(
            "site.seo.desc",
            "توضیح پیش‌فرض سایت",
            "نیرا، خانه‌ی رایحه‌های ماندگار و اختصاصی. از عطرهای اورجینال برندهای جهانی تا طراحی و تولید عطر سازمانی برای برند شما.",
          ),
          img("site.ogImage", "تصویر اشتراک‌گذاری (شبکه‌های اجتماعی)", "/img/brand/hero-rose.png"),
        ],
      },
    ],
  },
  {
    id: "home",
    title: "صفحه اصلی",
    groups: [
      seo("home", "نیرا | رایحه‌ای که هویت شماست", "نیرا، خانه‌ی رایحه‌های ماندگار و اختصاصی. از عطرهای اورجینال برندهای جهانی تا طراحی و تولید عطر سازمانی برای برند شما."),
      hero("home", {
        eyebrow: "Nira Perfume",
        title: "رایحه‌ای که",
        accent: "هویت شماست",
        desc: "عطرهایی خاص، با رایحه‌های ماندگار و طراحی منحصربه‌فرد. برای کسانی که متفاوت بودن را انتخاب می‌کنند.",
        cta: "مشاهده محصولات",
        image: "/img/brand/hero-rose.png",
      }),
      {
        title: "دکمه دوم بنر",
        fields: [f("home.hero.cta2", "متن دکمه دوم", "ساخت عطر اختصاصی برای شرکت‌ها")],
      },
      {
        title: "نوار چهار ویژگی (صفحه اصلی و محصولات)",
        fields: features4.flatMap(([, title, hint], i) => [
          f(`features.${i}.title`, `ویژگی ${i + 1} — عنوان`, title),
          f(`features.${i}.hint`, `ویژگی ${i + 1} — توضیح`, hint),
        ]),
      },
      {
        title: "بخش مجموعه عطرها",
        fields: [
          f("home.collection.eyebrow", "برچسب", "Nira Collection"),
          ta("home.collection.title", "عنوان (هر خط یک سطر)", "مجموعه\nعطرهای نیرا"),
          ta("home.collection.desc", "توضیح", "ترکیبی از ظرافت، اصالت و احساس، برای هر سلیقه‌ای."),
          f("home.collection.link", "متن لینک", "مشاهده همه محصولات"),
        ],
      },
      {
        title: "بنر بزرگ محصولات",
        fields: [
          img("home.banner.image", "تصویر بنر", "/img/banners/splash-light.jpg"),
          f("home.banner.alt", "متن جایگزین تصویر", "مجموعه‌ی عطر و بادی اسپلش نیرا عطر صحرا"),
        ],
      },
      {
        title: "بخش همکاری با شرکت‌ها",
        fields: [
          f("home.corp.kicker", "برچسب", "همکاری با شرکت‌ها"),
          ta("home.corp.title", "عنوان (هر خط یک سطر)", "ساخت عطر اختصاصی\nبرای برند شما"),
          ta("home.corp.desc", "توضیح", "از ایده تا رایحه. با ما همراه شوید تا عطر اختصاصی برندتان را متناسب با هویت و ارزش‌های کسب‌وکارتان طراحی و تولید کنیم."),
          f("home.corp.cta", "متن دکمه", "شروع همکاری"),
          img("home.corp.image", "تصویر", "/img/products/nira-esentric-molecules-o2.jpg"),
        ],
      },
      {
        title: "بخش درباره نیرا",
        fields: [
          img("home.about.image", "تصویر", "/img/brand/hero-rose.png"),
          f("home.about.kicker", "برچسب", "درباره نیرا"),
          ta("home.about.title", "عنوان (هر خط یک سطر)", "عطر، هنر خلق\nاحساسات ماندگار"),
          ta("home.about.desc", "توضیح", "نیرا با الهام از زیبایی‌های طبیعت و هنر عطرسازی، رایحه‌هایی می‌سازد که فراتر از یک رایحه‌ی ساده هستند؛ عطر اختصاصی از یک داستانی از احساس، هویت و لحظه‌های خاص‌اند."),
          f("home.about.link", "متن لینک", "خدمات ما"),
        ],
      },
    ],
  },
  {
    id: "shop",
    title: "فروشگاه و محصولات",
    groups: [
      seo("shop", "محصولات نیرا | عطر و ادکلن", "از رایحه‌های ملایم و روزمره تا عطرهای خاص و ماندگار؛ مجموعه‌ی کامل محصولات نیرا."),
      {
        title: "بنر بالای فروشگاه",
        fields: [
          img("shop.banner.image", "تصویر بنر (تیره)", "/img/banners/splash-dark.jpg"),
          f("shop.banner.alt", "متن جایگزین تصویر", "مجموعه‌ی عطر و بادی اسپلش نیرا عطر صحرا"),
        ],
      },
      {
        title: "عنوان فروشگاه",
        fields: [
          f("shop.eyebrow", "برچسب", "Our Products"),
          f("shop.title", "عنوان", "محصولات نیرا"),
          ta("shop.desc", "توضیح", "از رایحه‌های ملایم و روزمره تا عطرهای خاص و ماندگار، مجموعه‌ای از بهترین محصولات نیرا را کشف کنید."),
        ],
      },
      {
        title: "قیمت (نمایش در همه محصولات)",
        fields: [
          f("pricing.min", "کمترین قیمت", "۵٫۵"),
          f("pricing.max", "بیشترین قیمت", "۶٫۵"),
          f("pricing.unit", "واحد", "میلیون تومان"),
          ta("pricing.note", "توضیح زیر قیمت", "قیمت‌ها به تومان است. تأیید نهایی سفارش با تماس کارشناسان نیرا انجام می‌شود."),
        ],
      },
      {
        title: "صفحه تک‌محصول",
        fields: [
          f("product.badge1", "نشان ۱", "تحویل اکسپرس"),
          f("product.badge2", "نشان ۲", "پشتیبانی ۲۴ ساعته"),
          f("product.badge3", "نشان ۳", "۷ روز ضمانت بازگشت"),
          f("product.packOriginal", "توضیح پک اورجینال", "پک اورجینال (بسته‌بندی برند اصلی)"),
          f("product.packNira", "توضیح پک نیرا", "پک بازرگانی نیرا عطر صحرا"),
          f("product.relatedKicker", "برچسب محصولات مرتبط", "محصولات مرتبط"),
          f("product.relatedTitle", "عنوان محصولات مرتبط", "شاید این‌ها را هم دوست داشته باشید"),
          f("product.addToCart", "دکمه افزودن", "افزودن به درخواست خرید"),
        ],
      },
    ],
  },
  {
    id: "services",
    title: "خدمات ما",
    groups: [
      seo("services", "خدمات ما | نیرا", "طراحی و تولید عطر، گیفت سازمانی، محتوای تبلیغاتی، طراحی بسته‌بندی، حضور در نمایشگاه‌ها و مشاوره برندینگ."),
      hero("services", {
        eyebrow: "Our Services",
        title: "خدمات ما",
        accent: "خلاقیت در خدمت برند شما",
        desc: "ما مجموعه‌ای از خدمات اختصاصی را برای برندهای مختلف ارائه می‌دهیم تا هویت شما را از طریق عطر، بسته‌بندی، گیفت و محتوای خلاقانه به بهترین شکل نمایش دهیم.",
        cta: "تماس با ما",
        image: "/img/brand/bloom-rose.png",
      }),
      ...[
        ["طراحی و تولید عطر", "طراحی و ساخت شیشه‌های اختصاصی برای برندهای مختلف با هویت بصری دلخواه.", "/img/products/nira-esentric-molecules-o2.jpg"],
        ["گیفت سازمانی", "طراحی و تولید گیفت‌های لوکس برای کارکنان و مشتریان شرکت‌ها.", "/img/products/nira-de-marly-pegasus.jpg"],
        ["محتوای تبلیغاتی", "تولید ویدیو، عکس و محتوای دیجیتال برای معرفی محصولات و برند شما.", "/img/products/nira-allur-lifestyle.jpg"],
        ["طراحی بسته‌بندی", "طراحی و تولید بسته‌بندی‌های خاص و شخصی‌سازی‌شده متناسب با هویت برند.", "/img/products/nira-versace-crystal-noir.jpg"],
        ["حضور در نمایشگاه‌ها", "برنامه‌ریزی و حضور در نمایشگاه‌های تخصصی داخلی و بین‌المللی.", "/img/brand/shop-shelf-rose.jpg"],
        ["مشاوره برندینگ", "ارائه راهکارهای تخصصی برای تقویت هویت برند و جایگاه آن در بازار.", "/img/products/nira-versace-lifestyle.jpg"],
      ].map(
        ([title, desc, image], i): Group => ({
          title: `کارت خدمت ${i + 1}`,
          fields: [
            f(`services.items.${i}.title`, "عنوان", title),
            ta(`services.items.${i}.desc`, "توضیح", desc),
            img(`services.items.${i}.image`, "تصویر", image),
          ],
        }),
      ),
      {
        title: "بخش «چرا ما؟»",
        fields: [f("services.whyTitle", "عنوان", "چرا ما؟")],
      },
      why4("services", [
        ["تجربه و تخصص", "در صنعت عطر"],
        ["تعهد به کیفیت", "و جزئیات"],
        ["خلاقیت", "در هر پروژه"],
        ["همراهی", "از ایده تا اجرا"],
      ]),
      cta("services", {
        eyebrow: "برای مشاوره و دریافت پیشنهاد اختصاصی",
        title: "با ما در ارتباط باشید",
        label: "تماس با ما",
        image: "/img/products/nira-de-marly-lifestyle.jpg",
      }),
    ],
  },
  {
    id: "custom",
    title: "همکاری با شرکت‌ها",
    groups: [
      seo("custom", "همکاری با شرکت‌ها | نیرا", "طراحی و تولید عطر اختصاصی سازمانی: از فرمولاسیون و رایحه‌ی برند تا بسته‌بندی و تحویل."),
      hero("custom", {
        eyebrow: "Corporate Solutions",
        title: "عطرهای اختصاصی",
        accent: "برای برند شما",
        desc: "با ما رایحه‌ای منحصربه‌فرد برای برندتان خلق کنید. عطرهای اختصاصی، هویت و ارزش برند شما را در ذهن مشتریان ماندگار می‌کند.",
        cta: "تماس با ما",
        image: "/img/brand/petals-rose.png",
      }),
      {
        title: "بخش «چرا نیرا؟»",
        fields: [
          f("custom.whyTitle", "عنوان", "چرا نیرا؟"),
          f("custom.whySub", "زیرعنوان", "تجربه، خلاقیت و کیفیت، کنار شما"),
        ],
      },
      why4("custom", [
        ["توسعه فرمولاسیون", "با عطرسازان حرفه‌ای"],
        ["رایحه‌های اختصاصی", "مخصوص برند شما"],
        ["کیفیت بالا", "مواد اولیه مرغوب"],
        ["همکاری بلندمدت", "و پشتیبانی کامل"],
      ]),
      {
        title: "نمونه همکاری‌ها",
        fields: [
          f("custom.samples.title", "عنوان", "نمونه‌ای از همکاری‌های ما"),
          f("custom.samples.sub", "زیرعنوان", "عطرهای اختصاصی که برای برندها و سازمان‌ها ساخته‌ایم"),
          f("custom.samples.cta", "متن دکمه", "مشاهده همه پروژه‌ها"),
        ],
      },
      {
        title: "فرآیند همکاری",
        fields: [
          img("custom.process.image", "تصویر", "/img/brand/atelier-counter.jpg"),
          f("custom.process.alt", "متن جایگزین تصویر", "ارزیابی رایحه روی میز کار نیرا"),
          f("custom.process.eyebrow", "برچسب", "Our Process"),
          f("custom.process.title", "عنوان", "فرآیند همکاری"),
          ta("custom.process.desc", "توضیح", "از مشاوره‌ی اولیه تا تولید نهایی، در کنار شما هستیم. ما با درک نیازهای برند شما، رایحه‌ای اختصاصی و متناسب با هویت کسب‌وکارتان طراحی می‌کنیم."),
          f("custom.step.0", "مرحله ۱", "مشاوره و نیازسنجی"),
          f("custom.step.1", "مرحله ۲", "طراحی رایحه اختصاصی"),
          f("custom.step.2", "مرحله ۳", "تولید و تست کیفیت"),
          f("custom.step.3", "مرحله ۴", "بسته‌بندی و تحویل"),
        ],
      },
      {
        title: "بخش فرم درخواست",
        fields: [
          f("custom.form.eyebrow", "برچسب", "Request a Quote"),
          f("custom.form.title", "عنوان", "شروع همکاری سازمانی"),
          ta("custom.form.desc", "توضیح", "اطلاعات پروژه‌ی خود را ثبت کنید؛ تیم نیرا ظرف ۴۸ ساعت با شما تماس می‌گیرد."),
          f("custom.chip.0", "نشان ۱", "محرمانگی کامل بریف برند"),
          f("custom.chip.1", "نشان ۲", "نمونه رایگان اولیه"),
          f("custom.chip.2", "نشان ۳", "امکان تیراژ سفارشی"),
          ta("forms.order.services", "گزینه‌های «نوع خدمت» (هر خط یک گزینه)", "عطر تبلیغاتی اختصاصی\nهدیه سازمانی نمایشگاهی\nراه‌اندازی خط تولید عطر برند\nسایر"),
          ta("forms.order.volumes", "گزینه‌های «تیراژ» (هر خط یک گزینه)", "تا ۱۰۰ عدد\n۱۰۰ تا ۵۰۰ عدد\n۵۰۰ تا ۲۰۰۰ عدد\nبیش از ۲۰۰۰ عدد"),
          f("forms.order.successTitle", "پیام موفقیت — عنوان", "درخواست شما ثبت شد ✓"),
          f("forms.order.successText", "پیام موفقیت — متن", "تیم نیرا ظرف ۴۸ ساعت با شما تماس می‌گیرد."),
        ],
      },
      cta("custom", {
        eyebrow: "برند خود را متمایز کنید",
        title: "همین حالا با ما تماس بگیرید",
        label: "تماس با ما",
        image: "/img/products/nira-esentric-molecules-o2.jpg",
      }),
    ],
  },
  {
    id: "contact",
    title: "تماس با ما",
    groups: [
      seo("contact", "تماس با ما | نیرا", "راه‌های ارتباط با نیرا: تلفن، ایمیل، نشانی دفتر مرکزی و فرم تماس مستقیم."),
      hero("contact", {
        eyebrow: "Contact Us",
        title: "با ما در ارتباط باشید",
        desc: "ما همیشه آماده‌ی پاسخگویی به سوالات شما هستیم. برای مشاوره، همکاری یا هرگونه پرسش، از طریق راه‌های زیر با ما در تماس باشید.",
        cta: "ارسال پیام",
        image: "/img/brand/hero-rose.png",
      }),
      {
        title: "عنوان کارت‌های ارتباطی",
        fields: [
          f("contact.channel.phone", "تلفن", "تلفن"),
          f("contact.channel.email", "ایمیل", "ایمیل"),
          f("contact.channel.address", "آدرس", "آدرس"),
        ],
      },
      {
        title: "فرم تماس",
        fields: [
          f("contact.form.title", "عنوان", "فرم تماس"),
          ta("contact.form.desc", "توضیح", "پیام خود را برای ما ارسال کنید."),
          f("forms.contact.successTitle", "پیام موفقیت — عنوان", "پیام شما ارسال شد"),
          f("forms.contact.successText", "پیام موفقیت — متن", "تیم نیرا به‌زودی با شما تماس می‌گیرد."),
        ],
      },
      {
        title: "بخش «ما را دنبال کنید»",
        fields: [
          img("contact.follow.image", "تصویر", "/img/products/nira-de-marly-lifestyle.jpg"),
          f("contact.follow.eyebrow", "برچسب", "Follow Us"),
          f("contact.follow.title", "عنوان", "ما را دنبال کنید"),
          ta("contact.follow.desc", "توضیح", "برای دیدن جدیدترین محصولات، پشت صحنه‌ها و اخبار برند نیرا."),
        ],
      },
    ],
  },
  {
    id: "gallery",
    title: "گالری نمایشگاه‌ها",
    hint: "متن‌های صفحه فهرست و صفحه‌ی هر رویداد. خود رویدادها را از بخش «رویدادهای گالری» مدیریت کنید.",
    groups: [
      seo("gallery", "گالری نمایشگاه‌ها | نیرا", "نمایشگاه‌هایی که نیرا در شرکت ملی نفت ایران، شهرداری تهران، شرکت گاز، پتروشیمی و مجتمع‌های رفاهی برگزار کرده است."),
      hero("gallery", {
        eyebrow: "Gallery",
        title: "گالری نمایشگاه‌ها",
        accent: "حضور نیرا در نمایشگاه‌های سازمانی",
        desc: "از شرکت ملی نفت و شهرداری تهران تا شرکت گاز و پتروشیمی؛ نگاهی به نمایشگاه‌هایی که نیرا در آن‌ها غرفه داشته است.",
        cta: "تماس با ما",
        image: "/img/brand/gallery-hero.png",
      }),
      {
        title: "جمله‌ی برجسته",
        fields: [
          ta("gallery.quote.text", "جمله", "«حضور در نمایشگاه‌ها فرصتی برای معرفی هنر عطرسازی به جهان است.»"),
          img("gallery.quote.image", "تصویر پس‌زمینه", "/img/products/nira-allur-lifestyle.jpg"),
        ],
      },
      cta("gallery", {
        eyebrow: "در رویداد بعدی کنار شما هستیم",
        title: "برای حضور در نمایشگاه برند خود با ما تماس بگیرید",
        label: "تماس با ما",
        image: "/img/products/nira-allur-lifestyle.jpg",
      }),
    ],
  },
  {
    id: "archive",
    title: "آرشیو پروژه‌ها",
    hint: "متن‌های صفحه فهرست و صفحه‌ی هر پروژه. خود پروژه‌ها را از بخش «پروژه‌های آرشیو» مدیریت کنید.",
    groups: [
      seo("archive", "آرشیو پروژه‌ها | نیرا", "پروژه‌های نیرا برای زست المان، فدرال، آریا پروفیل چابهار، اسپارک کمپانی و آریا افق پاسارگاد."),
      hero("archive", {
        eyebrow: "Our Archive",
        title: "آرشیو ما",
        accent: "نگاهی به پروژه‌ها و همکاری‌های ما",
        desc: "در این بخش می‌توانید نمونه‌ی عملی از پروژه‌های انجام‌شده برای برندهای مختلف را ببینید؛ از طراحی عطر و شیشه تا تولید گیفت و محتوای تبلیغاتی.",
        cta: "تماس با ما",
        image: "/img/archive/archive-hero.png",
      }),
      {
        title: "جمله‌ی برجسته",
        fields: [
          ta("archive.quote.text", "جمله", "«هر پروژه، داستانی از اعتماد است که با خلاقیت و دقت ساخته می‌شود.»"),
          img("archive.quote.image", "تصویر پس‌زمینه", "/img/products/nira-versace-lifestyle.jpg"),
        ],
      },
      {
        title: "صفحه‌ی هر پروژه",
        fields: [
          f("archive.detail.cta", "دکمه بنر", "پروژه مشابه برای برند شما"),
          f("archive.detail.ctaEyebrow", "بخش پایانی — متن کوچک", "پروژه بعدی، برند شماست"),
          f("archive.detail.ctaTitle", "بخش پایانی — عنوان", "بیایید رایحه‌ی برند شما را بسازیم"),
          f("archive.detail.ctaLabel", "بخش پایانی — دکمه", "شروع همکاری"),
          img("archive.detail.ctaImage", "بخش پایانی — تصویر", "/img/products/nira-esentric-molecules-o2.jpg"),
        ],
      },
    ],
  },
  {
    id: "catalog",
    title: "کاتالوگ",
    groups: [
      seo("catalog", "کاتالوگ نیرا | مجموعه کامل رایحه‌ها", "مرور بصری کل مجموعه‌ی نیرا."),
      hero("catalog", {
        eyebrow: "Catalog",
        title: "کاتالوگ محصولات",
        desc: "مرور بصری و لوکس‌وار کل مجموعه‌ی نیرا، برای معرفی و الهام.",
        image: "/img/brand/petals-rose.png",
      }),
    ],
  },
  {
    id: "cart",
    title: "سبد درخواست خرید",
    groups: [
      {
        title: "متن‌های سبد",
        fields: [
          f("cart.title", "عنوان صفحه", "سبد خرید"),
          f("cart.empty", "پیام سبد خالی", "لیست درخواست شما خالی است."),
          ta("cart.note", "توضیح خلاصه درخواست", "قیمت‌ها به تومان است. پس از ثبت درخواست، کارشناسان ما برای تأیید نهایی سفارش و هماهنگی ارسال با شما تماس می‌گیرند."),
          f("cart.submit", "دکمه ثبت", "ثبت درخواست و تماس کارشناس"),
          f("cart.successTitle", "پیام موفقیت — عنوان", "درخواست شما ثبت شد ✓"),
          ta("cart.successText", "پیام موفقیت — متن", "کارشناسان ما به‌زودی برای تأیید نهایی سفارش و تکمیل خرید با شما تماس می‌گیرند."),
        ],
      },
    ],
  },
  {
    id: "notfound",
    title: "صفحه ۴۰۴",
    groups: [
      {
        title: "صفحه پیدا نشد",
        fields: [
          f("notfound.title", "عنوان", "صفحه‌ای که دنبالش بودید پیدا نشد"),
          ta("notfound.desc", "توضیح", "ممکن است نشانی تغییر کرده یا صفحه حذف شده باشد. از لینک‌های زیر ادامه دهید."),
        ],
      },
    ],
  },
];

export const fieldMap: Record<string, Field> = Object.fromEntries(
  sections.flatMap((s) => s.groups.flatMap((g) => g.fields)).map((fl) => [fl.key, fl]),
);

/** Key prefixes also needed inside client components (sent to the browser). */
export const CLIENT_PREFIXES = ["pricing.", "forms.", "cart.", "nav.", "product.", "site.name", "site.logo"];
