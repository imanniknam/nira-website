import type { Product } from "./types";

export function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "fa"));
}

/**
 * Scent families are not stored on products, so they are derived from each
 * product's note pyramid. A product can belong to several.
 */
export const scentFamilies = ["گلی", "میوه‌ای", "چوبی", "شرقی", "خنک"] as const;

const FAMILY_KEYWORDS: Record<(typeof scentFamilies)[number], string[]> = {
  "گلی": ["گل", "رز", "یاس", "زنبق", "نرگس", "بنفشه", "شکوفه", "لاله", "ارکیده", "مریم", "نیلوفر", "ماگنولیا"],
  "میوه‌ای": ["میوه", "سیب", "لیمو", "پرتقال", "توت", "هلو", "آناناس", "انبه", "گلابی", "انار", "انجیر", "آلبالو", "برگاموت", "نارنگی", "گریپ"],
  "چوبی": ["چوب", "صندل", "سدر", "وتیور", "عود", "پاچولی", "ساج", "بلوط"],
  "شرقی": ["عنبر", "وانیل", "مشک", "ادویه", "دارچین", "کهربا", "بخور", "زعفران", "تونکا", "کندر", "هل"],
  "خنک": ["نعنا", "منتول", "دریایی", "آبی", "اکالیپتوس", "سبز", "ریحان", "اسطوخودوس", "لوندر", "کافور"],
};

export function scentFamiliesOf(product: Product): string[] {
  const text = `${product.notes.top} ${product.notes.middle} ${product.notes.base}`;
  return scentFamilies.filter((family) => FAMILY_KEYWORDS[family].some((w) => text.includes(w)));
}

export function relatedProducts(all: Product[], slug: string, count = 4): Product[] {
  const current = all.find((p) => p.slug === slug);
  const pool = all.filter((p) => p.slug !== slug);
  const sameBrand = current ? pool.filter((p) => p.brand === current.brand) : [];
  const rest = pool.filter((p) => !sameBrand.includes(p));
  return [...sameBrand, ...rest].slice(0, count);
}
