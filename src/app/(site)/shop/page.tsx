import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { CmsFeatureStrip } from "@/components/FeatureStripCms";
import { Eyebrow } from "@/components/Eyebrow";
import { getT } from "@/lib/content";
import { getPublicProducts } from "@/lib/data";
import { ShopGrid } from "./ShopGrid";

export async function generateMetadata() {
  const t = await getT();
  return { title: t("shop.seo.title"), description: t("shop.seo.desc") };
}

export default async function ShopPage() {
  const t = await getT();
  const products = await getPublicProducts();

  return (
    <div>
      <div className="bg-blush border-b border-line">
        <nav className="max-w-6xl mx-auto px-4 sm:px-8 py-3 text-xs text-muted flex items-center gap-2">
          <Link href="/" className="hover:text-accent transition-colors">
            {t("nav.home")}
          </Link>
          <span className="text-line">›</span>
          <span className="text-accent">{t("nav.shop")}</span>
        </nav>
      </div>

      {/* The page hero. The artwork carries its own wordmark, tagline and
          feature row, so it is never cropped or written over: it sits whole on
          a black band that matches its own background (sampled from the file),
          capped in height so it cannot swallow the fold on wide screens. */}
      <section className="bg-[#050406]">
        <div className="relative w-full aspect-[1280/853] max-h-[72vh]">
          <Image
            src={t("shop.banner.image")}
            alt={t("shop.banner.alt")}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </section>

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 sm:pt-12">
          <Eyebrow text={t("shop.eyebrow")} />
          <h1 className="text-2xl sm:text-3xl font-bold text-accent mt-2">{t("shop.title")}</h1>
          <p className="text-muted mt-3 text-sm leading-7 max-w-xl">{t("shop.desc")}</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
          <Suspense fallback={null}>
            <ShopGrid products={products} />
          </Suspense>
        </div>
      </section>

      <CmsFeatureStrip tone="blush" />
    </div>
  );
}
