import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.SITE_URL;
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/cart"] }],
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}
