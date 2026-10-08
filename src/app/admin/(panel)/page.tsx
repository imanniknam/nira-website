import Link from "next/link";
import { getEvents, getProducts, getProjects, getSubmissions } from "@/lib/db";
import { Card } from "../ui";

const kindLabel = { contact: "تماس", order: "سفارش شرکتی", cart: "درخواست خرید" } as const;

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("fa-IR", { dateStyle: "medium", timeStyle: "short" });

export default async function Dashboard() {
  const [products, events, projects, submissions] = await Promise.all([
    getProducts(),
    getEvents(),
    getProjects(),
    getSubmissions(),
  ]);
  const unread = submissions.filter((s) => s.status === "new");

  const stats = [
    { label: "محصول", value: products.length, href: "/admin/products" },
    { label: "رویداد گالری", value: events.length, href: "/admin/events" },
    { label: "پروژه آرشیو", value: projects.length, href: "/admin/projects" },
    { label: "پیام خوانده‌نشده", value: unread.length, href: "/admin/submissions" },
  ];

  return (
    <div className="max-w-5xl pb-16 space-y-6">
      <header>
        <h1 className="text-xl font-bold text-accent">داشبورد</h1>
        <p className="text-sm text-muted mt-1">از اینجا همه‌ی متن‌ها، تصاویر و محصولات سایت را مدیریت کنید.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-2xl bg-white border border-line p-5 hover:border-accent transition-colors">
            <b className="block text-3xl text-accent">{s.value.toLocaleString("fa-IR")}</b>
            <span className="block text-xs text-muted mt-1">{s.label}</span>
          </Link>
        ))}
      </div>

      <Card
        title="آخرین پیام‌ها و درخواست‌ها"
        aside={
          <Link href="/admin/submissions" className="text-xs text-rose hover:text-accent">
            مشاهده همه
          </Link>
        }
      >
        {submissions.length === 0 ? (
          <p className="text-sm text-muted">هنوز پیامی دریافت نشده است.</p>
        ) : (
          <ul className="divide-y divide-line">
            {submissions.slice(0, 6).map((s) => (
              <li key={s.id} className="py-3 flex items-center gap-3 text-sm">
                <span className={`w-2 h-2 rounded-full shrink-0 ${s.status === "new" ? "bg-rose" : "bg-line"}`} />
                <span className="text-xs rounded-full bg-blush text-accent px-2.5 py-1 shrink-0">{kindLabel[s.kind]}</span>
                <b className="font-medium text-foreground truncate">{s.name}</b>
                <span className="flex-1" />
                <span className="text-xs text-muted shrink-0">{fmt(s.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="راهنمای سریع">
        <ul className="text-sm text-muted space-y-2 leading-7 list-disc pr-5">
          <li>متن و تصویر هر صفحه را از منوی «متن و تصویر صفحات» تغییر دهید؛ فیلدی که دست نزنید روی مقدار پیش‌فرض می‌ماند.</li>
          <li>محصولات، رویدادهای گالری و پروژه‌های آرشیو را می‌توانید اضافه، ویرایش، مرتب یا حذف کنید.</li>
          <li>پس از ذخیره، تغییرات بلافاصله روی سایت دیده می‌شوند.</li>
          <li>از بخش «تنظیمات و پشتیبان» رمز را عوض کنید و نسخه پشتیبان بگیرید.</li>
        </ul>
      </Card>
    </div>
  );
}
