import { PageHero } from "@/components/PageHero";
import { CartView } from "./CartView";

export const metadata = {
  title: "سبد خرید | نیرا عطر صحرا",
};

export default function CartPage() {
  return (
    <div>
      <PageHero
        eyebrow="Your Cart"
        title="سبد خرید"
        image="/img/brand/marble-rose.png"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
        <CartView />
      </div>
    </div>
  );
}
