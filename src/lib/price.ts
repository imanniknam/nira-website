/** Prices are stored as whole tomans (integers) on each product. */

export const formatToman = (amount: number) => `${Math.round(amount).toLocaleString("fa-IR")} تومان`;

/**
 * What to show for a product: its custom price text if the editor set one, else
 * the numeric price, else the site-wide indicative range (`fallback`).
 */
export function priceLabel(product: { price: number; priceText?: string }, fallback: string) {
  if (product.priceText) return product.priceText;
  return product.price > 0 ? formatToman(product.price) : fallback;
}
