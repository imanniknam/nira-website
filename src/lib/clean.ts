import type { GalleryEvent, Product, Project, ProjectCategory } from "./types";

/** Server-side sanitising of editor payloads: never trust what the browser sent. */

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const list = (v: unknown, max = 200, count = 50) =>
  Array.isArray(v) ? v.map((x) => str(x, max)).filter(Boolean).slice(0, count) : [];

/** Only site-relative paths or http(s) URLs may be used as images / links. */
export function safeUrl(v: unknown) {
  const s = str(v, 1000);
  if (!s) return "";
  if (s.startsWith("/") && !s.startsWith("//")) return s;
  if (/^https?:\/\//i.test(s)) return s;
  return "";
}

export function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const sections = (v: unknown) =>
  Array.isArray(v)
    ? v
        .map((s) => ({ title: str(s?.title, 200), body: str(s?.body, 4000) }))
        .filter((s) => s.title || s.body)
        .slice(0, 30)
    : [];

export function cleanProduct(raw: unknown): Product | string {
  const r = (raw ?? {}) as Record<string, unknown>;
  const name = str(r.name, 200);
  if (!name) return "نام محصول را وارد کنید.";
  const slug = slugify(str(r.slug, 200) || name);
  if (!slug) return "نشانی (slug) معتبر نیست.";
  const image = safeUrl(r.image);
  if (!image) return "تصویر اصلی محصول را انتخاب کنید.";
  const notes = (r.notes ?? {}) as Record<string, unknown>;
  const price = Number(r.price);
  const category = ["men", "women", "unisex"].includes(r.category as string) ? (r.category as Product["category"]) : "unisex";
  const volume = str(r.volume, 80);
  const sizes = list(r.sizes, 80);
  const badge = r.badge === "پرفروش" || r.badge === "جدید" ? r.badge : undefined;
  return {
    id: slug,
    slug,
    brand: str(r.brand, 100) || "NIRA",
    name,
    category,
    price: Number.isFinite(price) && price > 0 ? Math.round(price) : 0,
    ...(str(r.priceText, 120) ? { priceText: str(r.priceText, 120) } : {}),
    packaging: r.packaging === "اورجینال" ? "اورجینال" : "بازرگانی نیرا",
    ...(badge ? { badge } : {}),
    inStock: r.inStock !== false,
    published: r.published !== false,
    image,
    gallery: list(r.gallery, 1000).map(safeUrl).filter(Boolean),
    volume: volume || sizes[0] || "",
    sizes: sizes.length ? sizes : volume ? [volume] : [],
    qualities: list(r.qualities, 80),
    concentration: str(r.concentration, 80),
    origin: str(r.origin, 80),
    perfumer: str(r.perfumer, 200),
    longevity: str(r.longevity, 80),
    season: str(r.season, 80),
    notes: { top: str(notes.top, 300), middle: str(notes.middle, 300), base: str(notes.base, 300) },
    description: str(r.description, 4000),
  };
}

export function cleanEvent(raw: unknown): GalleryEvent | string {
  const r = (raw ?? {}) as Record<string, unknown>;
  const title = str(r.title, 300);
  const venue = str(r.venue, 300);
  if (!title || !venue) return "عنوان و نام میزبان را وارد کنید.";
  const slug = slugify(str(r.slug, 200) || title);
  if (!slug) return "نشانی (slug) معتبر نیست.";
  return {
    slug,
    venue,
    title,
    location: str(r.location, 150),
    date: str(r.date, 100),
    ...(safeUrl(r.image) ? { image: safeUrl(r.image) } : {}),
    ...(safeUrl(r.heroImage) ? { heroImage: safeUrl(r.heroImage) } : {}),
    gallery: list(r.gallery, 1000).map(safeUrl).filter(Boolean),
    intro: str(r.intro, 4000),
    highlights: list(r.highlights, 300),
    sections: sections(r.sections),
  };
}

export function cleanProject(raw: unknown): Project | string {
  const r = (raw ?? {}) as Record<string, unknown>;
  const title = str(r.title, 300);
  if (!title) return "عنوان پروژه را وارد کنید.";
  const slug = slugify(str(r.slug, 200) || title);
  if (!slug) return "نشانی (slug) معتبر نیست.";
  const cats: ProjectCategory[] = ["perfume", "bottle", "gift", "content"];
  return {
    slug,
    category: cats.includes(r.category as ProjectCategory) ? (r.category as ProjectCategory) : "perfume",
    title,
    desc: str(r.desc, 300),
    client: str(r.client, 200),
    year: str(r.year, 50),
    scope: list(r.scope, 200),
    ...(safeUrl(r.image) ? { image: safeUrl(r.image) } : {}),
    ...(safeUrl(r.heroImage) ? { heroImage: safeUrl(r.heroImage) } : {}),
    intro: str(r.intro, 4000),
    sections: sections(r.sections),
  };
}
