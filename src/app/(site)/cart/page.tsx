import { PageHero } from "@/components/PageHero";
import { getT } from "@/lib/content";
import { CartView } from "./CartView";

export async function generateMetadata() {
  const t = await getT();
  return { title: `${t("cart.title")} | ${t("site.name")}`, robots: { index: false } };
}

export default async function CartPage() {
  const t = await getT();
  return (
    <div>
      <PageHero eyebrow="Your Cart" title={t("cart.title")} image="/img/brand/marble-rose.png" />
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
        <CartView />
      </div>
    </div>
  );
}
