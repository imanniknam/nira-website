"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "../actions";
import { sections } from "@/lib/content/registry";

export function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const groups: { title: string; items: { href: string; label: string; badge?: number }[] }[] = [
    { title: "", items: [{ href: "/admin", label: "داشبورد" }] },
    {
      title: "محتوا",
      items: [
        { href: "/admin/products", label: "محصولات" },
        { href: "/admin/events", label: "رویدادهای گالری" },
        { href: "/admin/projects", label: "پروژه‌های آرشیو" },
        { href: "/admin/media", label: "کتابخانه تصاویر" },
      ],
    },
    {
      title: "متن و تصویر صفحات",
      items: sections.map((s) => ({ href: `/admin/content/${s.id}`, label: s.title })),
    },
    {
      title: "ارتباط با مشتریان",
      items: [{ href: "/admin/submissions", label: "پیام‌ها و درخواست‌ها", badge: unread }],
    },
    { title: "سیستم", items: [{ href: "/admin/settings", label: "تنظیمات و پشتیبان" }] },
  ];

  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  const nav = (
    <nav className="px-3 py-4 space-y-5 text-sm">
      {groups.map((g, gi) => (
        <div key={gi}>
          {g.title && <p className="px-3 mb-1.5 text-[11px] text-white/50">{g.title}</p>}
          <ul className="space-y-0.5">
            {g.items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
                    isActive(it.href) ? "bg-white/20 text-white font-medium" : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {it.label}
                  {it.badge ? (
                    <span className="min-w-5 h-5 px-1.5 rounded-full bg-rose text-white text-[11px] flex items-center justify-center">
                      {it.badge.toLocaleString("fa-IR")}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="px-3 pt-2 space-y-2 border-t border-white/15">
        <a href="/" target="_blank" rel="noreferrer" className="block text-white/80 hover:text-white pt-3">
          مشاهده سایت ↗
        </a>
        <form action={logoutAction}>
          <button type="submit" className="text-white/80 hover:text-white">
            خروج
          </button>
        </form>
      </div>
    </nav>
  );

  return (
    <>
      <div className="lg:hidden dark-band text-white flex items-center justify-between px-4 h-14 sticky top-0 z-40">
        <b className="text-sm">پنل مدیریت نیرا</b>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="px-3 py-1.5 text-sm rounded-lg bg-white/15">
          {open ? "بستن" : "منو"}
        </button>
      </div>
      {open && <div className="lg:hidden dark-band text-white max-h-[80vh] overflow-y-auto">{nav}</div>}
      <aside className="hidden lg:block w-64 shrink-0 dark-band text-white sticky top-0 h-screen overflow-y-auto">
        <div className="px-6 py-5 border-b border-white/15">
          <span className="eyebrow-latin block !text-white/60">Nira CMS</span>
          <b className="block mt-1">پنل مدیریت</b>
        </div>
        {nav}
      </aside>
    </>
  );
}
