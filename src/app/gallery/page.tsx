import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Stagger, StaggerItem } from "@/components/MotionSection";

export const metadata = {
  title: "گالری و مجله نیرا | نیرا عطر صحرا",
};

const items = [
  {
    image: "/img/brand/shop-shelf.jpg",
    title: "برگزاری نمایشگاه عطر ادکلن در شرکت نفت مناطق مرکزی ایران",
    caption: "۹ مرداد ۱۴۰۴",
    aspect: "aspect-[4/5]",
  },
  {
    image: "/img/archive/zest-mattress-aqua.png",
    title: "همکاری نیرا و Zest در طراحی و تولید عطر تبلیغاتی اختصاصی",
    caption: "۳۱ تیر ۱۴۰۴",
    aspect: "aspect-[4/3]",
  },
  {
    image: "/img/brand/packaging-box.jpg",
    title: "همکاری شرکت نیرا عطر صحرا با شرکت اسپارک کمپانی",
    caption: "۳۱ تیر ۱۴۰۴",
    aspect: "aspect-square",
  },
  {
    image: "/img/archive/ariya-ofogh-pasargad-aventus.png",
    title: "همکاری عطر نیرا صحرا و آریا افق پاسارگاد",
    caption: "۳۱ تیر ۱۴۰۴",
    aspect: "aspect-[4/5]",
  },
  {
    image: "/img/brand/watch-table-lifestyle.jpg",
    title: "حضور عطر نیرا صحرا در باشگاه شماره یک شرکت نفت",
    caption: "۳۰ تیر ۱۴۰۴",
    aspect: "aspect-[4/3]",
  },
  {
    image: "/img/products/lamour-lalique.jpg",
    title: "تأثیر عطر بر روانشناسی و احساسات",
    caption: "۱۷ اردیبهشت ۱۴۰۴ · مجله نیرا",
    aspect: "aspect-square",
  },
  {
    image: "/img/brand/storefront-sign.jpg",
    title: "نمای فروشگاه نیرا عطر صحرا",
    caption: "شادآباد، تهران",
    aspect: "aspect-[3/4]",
  },
  {
    image: "/img/brand/brochure-spread.jpg",
    title: "بروشور و کاتالوگ چاپی نیرا",
    caption: "معرفی برند",
    aspect: "aspect-[4/5]",
  },
];

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        eyebrow="مجله و رزومه‌ی حضور نیرا"
        title="گالری نیرا"
        description="مروری بر حضور نیرا در نمایشگاه‌های تخصصی، همکاری‌های سازمانی و یادداشت‌های مجله‌ی نیرا."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
        <Stagger className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {items.map((item, i) => (
            <StaggerItem key={i} className="mb-4 break-inside-avoid">
              <div
                className={`relative w-full rounded-2xl overflow-hidden border border-line ${item.aspect}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-3 right-3 left-3 text-white">
                  <b className="block text-sm leading-6">{item.title}</b>
                  <span className="text-xs text-white/80">{item.caption}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="text-center mt-14">
          <Link
            href="/archive"
            className="inline-block rounded-full border border-line hover:border-accent transition-colors px-6 py-3 text-sm"
          >
            مشاهده آرشیو پروژه‌های سازمانی
          </Link>
        </div>
      </div>
    </div>
  );
}
