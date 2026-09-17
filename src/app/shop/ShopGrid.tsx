"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  brands,
  concentrationOptions,
  formatPrice,
  priceBounds,
  products,
  qualityOptions,
  sizeOptions,
  type Product,
} from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type CategoryFilter = "all" | Product["category"];
type PackagingFilter = "all" | Product["packaging"];
type Availability = "all" | "onsale" | "instock";
type Sort = "latest" | "cheap" | "expensive" | "discount";

const SORTS: { key: Sort; label: string }[] = [
  { key: "latest", label: "مرتب‌سازی بر اساس آخرین" },
  { key: "cheap", label: "مرتب‌سازی بر اساس ارزان‌ترین" },
  { key: "expensive", label: "مرتب‌سازی بر اساس گران‌ترین" },
  { key: "discount", label: "مرتب‌سازی بر اساس بیشترین تخفیف" },
];

const PER_PAGE_OPTIONS = [9, 24, 36];

function discountPercent(p: Product) {
  if (!p.originalPrice) return 0;
  return (p.originalPrice - p.price) / p.originalPrice;
}

function csv(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

function toLatinDigits(value: string) {
  return value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

function roundDown(n: number) {
  return Math.floor(n / 10000) * 10000;
}

function roundUp(n: number) {
  return Math.ceil(n / 10000) * 10000;
}

const MIN_BOUND = roundDown(priceBounds.min);
const MAX_BOUND = roundUp(priceBounds.max);

type Filters = {
  category: CategoryFilter;
  packaging: PackagingFilter;
  brands: string[];
  sizes: string[];
  qualities: string[];
  concentrations: string[];
  availability: Availability;
  priceMin: number;
  priceMax: number;
  query: string;
};

type Facet = keyof Filters;

function CheckList({
  options,
  selected,
  countOf,
  onToggle,
}: {
  options: string[];
  selected: string[];
  countOf: (option: string) => number;
  onToggle: (option: string) => void;
}) {
  const shown = options.filter((o) => countOf(o) > 0 || selected.includes(o));
  if (shown.length === 0) {
    return (
      <p className="text-xs text-muted">گزینه‌ای با فیلترهای فعلی وجود ندارد.</p>
    );
  }
  return (
    <div className="flex flex-col gap-1 text-sm">
      {shown.map((option) => {
        const count = countOf(option);
        const checked = selected.includes(option);
        return (
          <label
            key={option}
            className="flex items-center gap-2 cursor-pointer text-xs py-1 hover:text-accent"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(option)}
              className="accent-[var(--accent)]"
            />
            <span className="flex-1">{option}</span>
            <span className="text-muted">{count.toLocaleString("fa-IR")}</span>
          </label>
        );
      })}
    </div>
  );
}

/**
 * Layered-nav matching: a facet's own selection is ignored when counting its
 * options, so each option shows how many products it would add to the current
 * result — the same way the source shop's filter counts behave.
 */
function matches(p: Product, f: Filters, except?: Facet) {
  if (except !== "category" && f.category !== "all" && p.category !== f.category) return false;
  if (except !== "packaging" && f.packaging !== "all" && p.packaging !== f.packaging)
    return false;
  if (except !== "brands" && f.brands.length > 0 && !f.brands.includes(p.brand)) return false;
  if (except !== "sizes" && f.sizes.length > 0 && !p.sizes.some((s) => f.sizes.includes(s)))
    return false;
  if (
    except !== "qualities" &&
    f.qualities.length > 0 &&
    !p.qualities.some((q) => f.qualities.includes(q))
  )
    return false;
  if (
    except !== "concentrations" &&
    f.concentrations.length > 0 &&
    !f.concentrations.includes(p.concentration)
  )
    return false;
  if (except !== "availability" && f.availability === "onsale" && !p.originalPrice) return false;
  if (except !== "availability" && f.availability === "instock" && !p.inStock) return false;
  if (except !== "priceMin" && (p.price < f.priceMin || p.price > f.priceMax)) return false;
  if (f.query) {
    const q = f.query.trim().toLowerCase();
    if (q && !p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q))
      return false;
  }
  return true;
}

export function ShopGrid() {
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const [brandQuery, setBrandQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const category = (() => {
    const v = searchParams.get("cat");
    return v === "men" || v === "women" || v === "unisex" ? v : "all";
  })();
  const packaging = (() => {
    const v = searchParams.get("pack");
    return v === "اورجینال" || v === "بازرگانی نیرا" ? v : "all";
  })();
  const availability = (() => {
    const v = searchParams.get("avail");
    return v === "onsale" || v === "instock" ? v : "all";
  })();
  const sort = (() => {
    const v = searchParams.get("sort");
    return SORTS.some((s) => s.key === v) ? (v as Sort) : "latest";
  })();
  const perPage = (() => {
    const v = Number(searchParams.get("per"));
    return PER_PAGE_OPTIONS.includes(v) ? v : 9;
  })();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const urlPriceMin = Number(searchParams.get("priceMin") ?? MIN_BOUND);
  const urlPriceMax = Number(searchParams.get("priceMax") ?? MAX_BOUND);

  // Dragging updates local state so the slider stays responsive; the URL only
  // catches up once the drag ends. Re-syncing during render (rather than in an
  // effect) keeps the thumb from lagging a frame behind the committed value.
  const [priceMin, setPriceMin] = useState(urlPriceMin);
  const [priceMax, setPriceMax] = useState(urlPriceMax);
  const [syncedPrice, setSyncedPrice] = useState({ min: urlPriceMin, max: urlPriceMax });
  if (syncedPrice.min !== urlPriceMin || syncedPrice.max !== urlPriceMax) {
    setSyncedPrice({ min: urlPriceMin, max: urlPriceMax });
    setPriceMin(urlPriceMin);
    setPriceMax(urlPriceMax);
  }

  const brandParam = searchParams.get("brand");
  const sizeParam = searchParams.get("size");
  const qualityParam = searchParams.get("quality");
  const concParam = searchParams.get("conc");
  const query = searchParams.get("q") ?? "";

  const filters: Filters = useMemo(
    () => ({
      category,
      packaging,
      brands: csv(brandParam),
      sizes: csv(sizeParam),
      qualities: csv(qualityParam),
      concentrations: csv(concParam),
      availability,
      priceMin,
      priceMax,
      query,
    }),
    [
      category,
      packaging,
      brandParam,
      sizeParam,
      qualityParam,
      concParam,
      availability,
      priceMin,
      priceMax,
      query,
    ]
  );

  const apply = (
    mutate: (params: URLSearchParams) => void,
    { keepPage = false }: { keepPage?: boolean } = {}
  ) => {
    // Read the live URL rather than React's `searchParams` snapshot: the snapshot
    // only catches up on the next render, so two filter clicks in quick succession
    // would both build on the pre-click query and the first one would be lost.
    const params = new URLSearchParams(window.location.search);
    mutate(params);
    if (!keepPage) params.delete("page");
    const next = params.toString();
    // history.replaceState updates the URL synchronously and Next syncs
    // useSearchParams from it, so filtering stays instant with no server round-trip.
    window.history.replaceState(null, "", next ? `/shop?${next}` : "/shop");
  };

  const clearAll = () => window.history.replaceState(null, "", "/shop");

  const goToPage = (n: number) => {
    apply((p) => p.set("page", String(n)), { keepPage: true });
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const setParam = (key: string, value: string | null) =>
    apply((params) => {
      if (value === null) params.delete(key);
      else params.set(key, value);
    });

  const toggleInList = (key: string, value: string) =>
    apply((params) => {
      const set = new Set(csv(params.get(key)));
      if (set.has(value)) set.delete(value);
      else set.add(value);
      if (set.size === 0) params.delete(key);
      else params.set(key, [...set].join(","));
    });

  const commitPrice = (min: number, max: number) =>
    apply((params) => {
      if (min <= MIN_BOUND) params.delete("priceMin");
      else params.set("priceMin", String(min));
      if (max >= MAX_BOUND) params.delete("priceMax");
      else params.set("priceMax", String(max));
    });

  const filtered = useMemo(() => {
    const list = products.filter((p) => matches(p, filters));
    const sorted = [...list];
    if (sort === "cheap") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "expensive") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "discount") sorted.sort((a, b) => discountPercent(b) - discountPercent(a));
    return sorted;
  }, [filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);

  // One pass per facet instead of one pass per option — with ~100 brands the
  // per-option version re-scanned the catalog thousands of times per render.
  const counts = useMemo(() => {
    const brand: Record<string, number> = {};
    const size: Record<string, number> = {};
    const conc: Record<string, number> = {};
    const quality: Record<string, number> = {};
    const bump = (map: Record<string, number>, key: string) => {
      map[key] = (map[key] ?? 0) + 1;
    };
    for (const p of products) {
      if (matches(p, filters, "brands")) bump(brand, p.brand);
      if (matches(p, filters, "sizes")) for (const s of p.sizes) bump(size, s);
      if (matches(p, filters, "concentrations")) bump(conc, p.concentration);
      if (matches(p, filters, "qualities")) for (const q of p.qualities) bump(quality, q);
    }
    return { brand, size, conc, quality };
  }, [filters]);

  const activeCount =
    (category !== "all" ? 1 : 0) +
    (packaging !== "all" ? 1 : 0) +
    (availability !== "all" ? 1 : 0) +
    filters.brands.length +
    filters.sizes.length +
    filters.qualities.length +
    filters.concentrations.length +
    (priceMin > MIN_BOUND || priceMax < MAX_BOUND ? 1 : 0);

  const visibleBrands = brandQuery.trim()
    ? brands.filter((b) => b.toLowerCase().includes(brandQuery.trim().toLowerCase()))
    : brands;

  const pillClass = (active: boolean) =>
    `text-sm text-right rounded-lg px-3 py-2 border transition-colors ${
      active ? "bg-accent text-white border-accent" : "border-line hover:border-accent"
    }`;

  return (
    <div className="grid md:grid-cols-[240px_1fr] gap-8 md:gap-10">
      <div className="md:hidden">
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="w-full rounded-full border border-line hover:border-accent transition-colors px-5 py-3 text-sm"
        >
          {showFilters ? "بستن فیلترها" : "مشاهده فیلترها"}
          {activeCount > 0 && ` (${activeCount.toLocaleString("fa-IR")})`}
        </button>
      </div>

      <aside className={`${showFilters ? "block" : "hidden"} md:block`}>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">فیلترها</h4>
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-accent hover:underline"
            >
              حذف همه
            </button>
          )}
        </div>

        <h5 className="font-medium mb-3 text-sm">فیلتر موجودی و حراج</h5>
        <div className="flex md:flex-col gap-2 mb-8">
          {(
            [
              { key: "all", label: "همه" },
              { key: "onsale", label: "فروش ویژه" },
              { key: "instock", label: "موجود در انبار" },
            ] as { key: Availability; label: string }[]
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setParam("avail", f.key === "all" ? null : f.key)}
              className={pillClass(availability === f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <h5 className="font-medium mb-3 text-sm">دسته‌بندی</h5>
        <div className="flex md:flex-col gap-2 mb-8">
          {(
            [
              { key: "all", label: "همه" },
              { key: "men", label: "عطر مردانه" },
              { key: "women", label: "عطر زنانه" },
              { key: "unisex", label: "یونیسکس" },
            ] as { key: CategoryFilter; label: string }[]
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setParam("cat", f.key === "all" ? null : f.key)}
              className={pillClass(category === f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <h5 className="font-medium mb-3 text-sm">نوع بسته‌بندی</h5>
        <div className="flex md:flex-col gap-2 mb-8">
          {(
            [
              { key: "all", label: "همه" },
              { key: "اورجینال", label: "پک اورجینال" },
              { key: "بازرگانی نیرا", label: "پک بازرگانی نیرا" },
            ] as { key: PackagingFilter; label: string }[]
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setParam("pack", f.key === "all" ? null : f.key)}
              className={pillClass(packaging === f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <h5 className="font-medium mb-3 text-sm">فیلتر قیمت</h5>
        <div className="mb-3 text-xs text-muted">
          قیمت: {formatPrice(priceMin)} — {formatPrice(priceMax)} تومان
        </div>
        <div className="flex flex-col gap-3 mb-3">
          <input
            type="range"
            min={MIN_BOUND}
            max={MAX_BOUND}
            step={10000}
            value={priceMin}
            onChange={(e) => setPriceMin(Math.min(Number(e.target.value), priceMax))}
            onMouseUp={() => commitPrice(priceMin, priceMax)}
            onTouchEnd={() => commitPrice(priceMin, priceMax)}
            onKeyUp={() => commitPrice(priceMin, priceMax)}
            aria-label="حداقل قیمت"
            className="w-full accent-[var(--accent)]"
          />
          <input
            type="range"
            min={MIN_BOUND}
            max={MAX_BOUND}
            step={10000}
            value={priceMax}
            onChange={(e) => setPriceMax(Math.max(Number(e.target.value), priceMin))}
            onMouseUp={() => commitPrice(priceMin, priceMax)}
            onTouchEnd={() => commitPrice(priceMin, priceMax)}
            onKeyUp={() => commitPrice(priceMin, priceMax)}
            aria-label="حداکثر قیمت"
            className="w-full accent-[var(--accent)]"
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            inputMode="numeric"
            value={priceMin}
            onChange={(e) =>
              setPriceMin(Number(toLatinDigits(e.target.value).replace(/\D/g, "")) || 0)
            }
            placeholder="حداقل قیمت"
            aria-label="حداقل قیمت"
            className="min-w-0 flex-1 rounded-lg border border-line bg-transparent px-2 py-1.5 text-xs outline-none focus:border-accent"
          />
          <span className="text-muted text-xs">تا</span>
          <input
            type="text"
            inputMode="numeric"
            value={priceMax}
            onChange={(e) =>
              setPriceMax(Number(toLatinDigits(e.target.value).replace(/\D/g, "")) || 0)
            }
            placeholder="حداکثر قیمت"
            aria-label="حداکثر قیمت"
            className="min-w-0 flex-1 rounded-lg border border-line bg-transparent px-2 py-1.5 text-xs outline-none focus:border-accent"
          />
        </div>
        <button
          onClick={() => commitPrice(Math.min(priceMin, priceMax), Math.max(priceMin, priceMax))}
          className="w-full rounded-lg bg-accent hover:bg-accent-dark transition-colors text-white px-3 py-2 text-xs mb-3"
        >
          اعمال فیلتر قیمت
        </button>
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { label: "زیر ۱ میلیون", min: MIN_BOUND, max: 1_000_000 },
            { label: "۱ تا ۵ میلیون", min: 1_000_000, max: 5_000_000 },
            { label: "۵ تا ۱۵ میلیون", min: 5_000_000, max: 15_000_000 },
            { label: "بالای ۱۵ میلیون", min: 15_000_000, max: MAX_BOUND },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setPriceMin(preset.min);
                setPriceMax(preset.max);
                commitPrice(preset.min, preset.max);
              }}
              className="text-[11px] rounded-full border border-line hover:border-accent transition-colors px-2.5 py-1"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <h5 className="font-medium mb-3 text-sm">فیلتر حجم</h5>
        <div className="mb-8">
          <CheckList
            options={sizeOptions}
            selected={filters.sizes}
            countOf={(option) => counts.size[option] ?? 0}
            onToggle={(option) => toggleInList("size", option)}
          />
        </div>

        <h5 className="font-medium mb-3 text-sm">غلظت</h5>
        <div className="mb-8">
          <CheckList
            options={concentrationOptions}
            selected={filters.concentrations}
            countOf={(option) => counts.conc[option] ?? 0}
            onToggle={(option) => toggleInList("conc", option)}
          />
        </div>

        {qualityOptions.length > 0 && (
          <>
            <h5 className="font-medium mb-3 text-sm">کیفیت غلظت عطر</h5>
            <div className="mb-8">
              <CheckList
                options={qualityOptions}
                selected={filters.qualities}
                countOf={(option) => counts.quality[option] ?? 0}
                onToggle={(option) => toggleInList("quality", option)}
              />
            </div>
          </>
        )}

        <h5 className="font-medium mb-3 text-sm">
          فیلتر برند
          {filters.brands.length > 0 && ` (${filters.brands.length.toLocaleString("fa-IR")})`}
        </h5>
        <input
          type="text"
          placeholder="جستجوی برند..."
          value={brandQuery}
          onChange={(e) => setBrandQuery(e.target.value)}
          className="w-full rounded-lg border border-line bg-transparent px-3 py-1.5 text-xs outline-none focus:border-accent mb-2"
        />
        <div className="max-h-64 overflow-y-auto pr-1">
          <CheckList
            options={visibleBrands}
            selected={filters.brands}
            countOf={(option) => counts.brand[option] ?? 0}
            onToggle={(option) => toggleInList("brand", option)}
          />
          {visibleBrands.length === 0 && (
            <span className="text-xs text-muted">برندی پیدا نشد.</span>
          )}
        </div>
      </aside>

      <div ref={gridRef} className="scroll-mt-24">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap text-sm text-muted">
          <span>
            {filtered.length > 0 ? (
              <>
                نمایش {(start + 1).toLocaleString("fa-IR")}–
                {Math.min(start + perPage, filtered.length).toLocaleString("fa-IR")} از{" "}
                {filtered.length.toLocaleString("fa-IR")} نتیجه
              </>
            ) : (
              "نتیجه‌ای یافت نشد"
            )}
            {filters.query && <> برای «{filters.query}»</>}
          </span>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 text-xs">
              <span>نمایش</span>
              {PER_PAGE_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setParam("per", n === 9 ? null : String(n))}
                  className={`px-1.5 rounded ${
                    perPage === n ? "text-accent font-bold" : "hover:text-accent"
                  }`}
                >
                  {n.toLocaleString("fa-IR")}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value === "latest" ? null : e.target.value)}
              className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs outline-none focus:border-accent"
              aria-label="مرتب‌سازی"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rendered without an entrance animation on purpose: results change on
            every filter and page click, and a staggered reveal both delayed the
            last cards by seconds and could leave replaced children stuck hidden. */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-muted text-sm">محصولی با این فیلترها پیدا نشد.</p>
            <button
              onClick={clearAll}
              className="mt-4 rounded-full bg-accent hover:bg-accent-dark transition-colors text-white px-6 py-2.5 text-sm"
            >
              حذف همه فیلترها
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              className="rounded-lg border border-line px-3 py-1.5 text-xs disabled:opacity-40 hover:border-accent transition-colors"
            >
              قبلی
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (n) => n === 1 || n === totalPages || Math.abs(n - currentPage) <= 1
              )
              .map((n, i, list) => (
                <span key={n} className="flex items-center gap-2">
                  {i > 0 && list[i - 1] !== n - 1 && <span className="text-muted">…</span>}
                  <button
                    onClick={() => goToPage(n)}
                    className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                      n === currentPage
                        ? "bg-accent text-white border-accent"
                        : "border-line hover:border-accent"
                    }`}
                  >
                    {n.toLocaleString("fa-IR")}
                  </button>
                </span>
              ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              className="rounded-lg border border-line px-3 py-1.5 text-xs disabled:opacity-40 hover:border-accent transition-colors"
            >
              بعدی
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
