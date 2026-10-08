import Link from "next/link";
import { getT } from "@/lib/content";
import { getNav } from "@/lib/site";

export const metadata = { title: "صفحه پیدا نشد | نیرا", robots: { index: false } };

export default async function NotFound() {
  const t = await getT();
  return (
    <section className="bg-blush">
      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-24 sm:py-32 text-center">
        <span className="eyebrow-latin block">404</span>
        <h1 className="text-2xl sm:text-4xl font-bold text-accent mt-4 leading-[1.5]">
          {t("notfound.title")}
        </h1>
        <p className="text-muted mt-5 leading-8 text-sm sm:text-base">{t("notfound.desc")}</p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {getNav(t)
            .filter((n) => ["/", "/shop", "/contact"].includes(n.href))
            .map((n, i) => (
              <Link key={n.href} href={n.href} className={`btn ${i === 0 ? "btn-primary" : "btn-outline"}`}>
                {n.label}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
