import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { getClientContent, getT } from "@/lib/content";
import { ContentProvider } from "@/lib/content/client";
import { getNav } from "@/lib/site";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const t = await getT();
  const clientContent = await getClientContent();
  return (
    <ContentProvider values={clientContent}>
      <CartProvider>
        <Header nav={getNav(t)} logo={t("site.logoPlum")} name={t("site.name")} />
        <main className="flex-1">{children}</main>
        <Footer />
      </CartProvider>
    </ContentProvider>
  );
}
