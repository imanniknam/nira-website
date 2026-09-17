"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-blush/95 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-8 h-[72px]">
        <Link href="/" aria-label="نیرا عطر صحرا" className="shrink-0">
          <Logo className="h-11 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 text-[13px] xl:text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-2 transition-colors hover:text-accent ${
                isActive(item.href) ? "text-accent font-medium" : "text-foreground/75"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute -bottom-0.5 inset-x-0 h-0.5 rounded-full bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 text-accent">
          <button
            aria-label="جستجو"
            onClick={() => setSearchOpen((v) => !v)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/70 transition-colors"
          >
            <Icon name={searchOpen ? "close" : "search"} />
          </button>
          <Link
            href="/login"
            aria-label="حساب کاربری"
            className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/70 transition-colors"
          >
            <Icon name="user" />
          </Link>
          <Link
            href="/cart"
            aria-label="سبد خرید"
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/70 transition-colors"
          >
            <Icon name="bag" />
            {totalCount > 0 && (
              <span className="absolute top-0.5 left-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose text-white text-[10px] flex items-center justify-center">
                {totalCount.toLocaleString("fa-IR")}
              </span>
            )}
          </Link>
          <button
            aria-label="منو"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/70 transition-colors"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-line bg-blush px-4 sm:px-8 py-3">
          <form onSubmit={submitSearch} className="max-w-6xl mx-auto flex gap-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی عطر، برند..."
              className="flex-1 rounded-full border border-line bg-surface px-5 py-2.5 text-sm outline-none focus:border-rose"
            />
            <button type="submit" className="btn btn-primary py-2.5">
              جستجو
            </button>
          </form>
        </div>
      )}

      {open && (
        <nav className="lg:hidden flex flex-col gap-1 px-4 pb-4 pt-2 text-sm bg-blush border-t border-line">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-2.5 transition-colors hover:bg-white ${
                isActive(item.href) ? "bg-white text-accent font-medium" : "text-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-2.5 transition-colors hover:bg-white text-foreground/80"
          >
            ورود / ثبت‌نام
          </Link>
        </nav>
      )}
    </header>
  );
}
