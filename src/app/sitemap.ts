import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";
import { getEvents, getProjects } from "@/lib/db";
import { getPublicProducts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.SITE_URL ?? "").replace(/\/$/, "");
  if (!base) return [];
  const [products, events, projects] = await Promise.all([getPublicProducts(), getEvents(), getProjects()]);
  const fixed = ["", "/shop", "/archive", "/gallery", "/services", "/custom-order", "/contact", "/catalog"];
  return [
    ...fixed.map((p) => ({ url: `${base}${p}` })),
    ...products.map((p) => ({ url: `${base}/product/${encodeURIComponent(p.slug)}` })),
    ...events.map((e) => ({ url: `${base}/gallery/${encodeURIComponent(e.slug)}` })),
    ...projects.map((p) => ({ url: `${base}/archive/${encodeURIComponent(p.slug)}` })),
  ];
}
