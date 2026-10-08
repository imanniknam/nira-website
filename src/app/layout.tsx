import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getT } from "@/lib/content";

// Vazirmatn (OFL), bundled locally so builds and page loads never depend on
// Google Fonts — which is often unreachable from servers inside Iran.
const vazirmatn = localFont({
  src: "./fonts/vazirmatn-arabic-wght-normal.woff2",
  variable: "--font-vazirmatn",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7a2258",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  const siteUrl = process.env.SITE_URL;
  return {
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    title: t("site.seo.title"),
    description: t("site.seo.desc"),
    openGraph: {
      title: t("site.seo.title"),
      description: t("site.seo.desc"),
      siteName: t("site.name"),
      locale: "fa_IR",
      type: "website",
      images: [t("site.ogImage")],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
