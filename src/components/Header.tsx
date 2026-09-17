"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { nav, siteInfo } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { totalCount } = useCart();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-line">
      <div className="hidden sm:flex items-center justify-between px-4 sm:px-8 py-2 text-xs text-muted border-b border-line max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hover:text-accent transition-colors">
            تماس با ما
          </Link>
          <Link href="/custom-order" className="hover:text-accent transition-colors">
            سفارش سازمانی
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={siteInfo.instagram}
            target="_blank"
            className="hover:text-accent transition-colors"
          >
            اینستاگرام
          </a>
          <span>{siteInfo.phone}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo className="h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-accent ${
                pathname === item.href ? "text-accent font-medium" : "text-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="جستجو"
            onClick={() => setSearchOpen((v) => !v)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-line hover:border-accent transition-colors"
          >
            🔍
          </button>
          <Link
            href="/login"
            aria-label="حساب کاربری"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full border border-line hover:border-accent transition-colors"
          >
            👤
          </Link>
          <Link
            href="/cart"
            aria-label="سبد خرید"
            className="relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-line hover:border-accent transition-colors"
          >
            🛒
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -left-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>
          <button
            aria-label="منو"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-line"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-line px-4 sm:px-8 py-3">
          <form onSubmit={submitSearch} className="max-w-6xl mx-auto flex gap-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی عطر، برند..."
              className="flex-1 rounded-full border border-line bg-surface px-4 py-2 text-sm outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="rounded-full bg-accent hover:bg-accent-dark transition-colors text-white px-5 py-2 text-sm"
            >
              جستجو
            </button>
          </form>
        </div>
      )}

      {open && (
        <nav className="md:hidden flex flex-col gap-1 px-4 pb-4 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 transition-colors hover:bg-surface ${
                pathname === item.href ? "text-accent font-medium" : "text-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2 transition-colors hover:bg-surface text-foreground/80"
          >
            ورود / ثبت‌نام
          </Link>
        </nav>
      )}
    </header>
  );
}
