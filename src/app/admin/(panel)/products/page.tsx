import { requireAdmin } from "@/lib/auth";
import { getProducts } from "@/lib/db";
import { productCategoryLabels } from "@/lib/types";
import { formatToman } from "@/lib/price";
import { deleteProductAction, moveProductAction } from "../../actions";
import { CollectionList } from "../CollectionList";

export default async function ProductsAdmin() {
  await requireAdmin();
  const products = await getProducts();
  return (
    <div className="max-w-4xl pb-16">
      <header className="mb-5">
        <h1 className="text-xl font-bold text-accent">محصولات</h1>
        <p className="text-sm text-muted mt-1">ترتیب این فهرست، ترتیب نمایش محصولات در سایت است.</p>
      </header>
      <CollectionList
        basePath="/admin/products"
        noun="محصول"
        moveAction={moveProductAction}
        deleteAction={deleteProductAction}
        rows={products.map((p) => ({
          slug: p.slug,
          title: p.name,
          subtitle: `${p.brand} · ${productCategoryLabels[p.category]} · ${p.volume} · ${p.price > 0 ? formatToman(p.price) : "بدون قیمت"}`,
          image: p.image,
          muted: p.published === false,
          tags: [
            ...(p.published === false ? ["پیش‌نویس (مخفی)"] : []),
            ...(!p.inStock ? ["ناموجود"] : []),
            ...(p.badge ? [p.badge] : []),
          ],
        }))}
      />
    </div>
  );
}
