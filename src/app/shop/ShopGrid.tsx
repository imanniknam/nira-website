"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import {
  brands,
  concentrationOptions,
  priceBounds,
  visibleProducts,
  qualityOptions,
  scentFamilies,
  scentFamiliesOf,
  seasonOptions,
  sizeOptions,
  type Product,
} from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@/components/Icon";

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

const PER_PAGE_OPTIONS = [12, 24, 36];
const DEFAULT_PER_PAGE = 12;

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

const PRICE_BANDS = [
  { label: "همه قیمت‌ها", min: MIN_BOUND, max: MAX_BOUND },
  { label: "زیر ۵,۰۰۰,۰۰۰ تومان", min: MIN_BOUND, max: 5_000_000 },
  { label: "۵,۰۰۰,۰۰۰ تا ۱۵,۰۰۰,۰۰۰ تومان", min: 5_000_000, max: 15_000_000 },
  { label: "بیش از ۱۵,۰۰۰,۰۰۰ تومان", min: 15_000_000, max: MAX_BOUND },
];

type Filters = {
  category: CategoryFilter;
  packaging: PackagingFilter;
  brands: string[];
  sizes: string[];
  qualities: string[];
  concentrations: string[];
  scents: string[];
  seasons: string[];
  availability: Availability;
  priceMin: number;
  priceMax: number;
  query: string;
};

type Facet = keyof Filters;

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
  if (
    except !== "scents" &&
    f.scents.length > 0 &&
    !scentFamiliesOf(p).some((s) => f.scents.includes(s))
  )
    return false;
  if (except !== "seasons" && f.seasons.length > 0 && !f.seasons.includes(p.season))
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

/** Collapsible sidebar block, open by default like the design. */
function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line last:border-0 py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 text-sm text-accent"
      >
        <span className="font-medium">{title}</span>
        <Icon
          name="chevron"
          className={`w-4 h-4 text-rose transition-transform duration-200 ${
            open ? "-rotate-90" : "rotate-90"
          }`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  count,
  onToggle,
  type = "checkbox",
}: {
  label: string;
  checked: boolean;
  count?: number;
  onToggle: () => void;
  type?: "checkbox" | "radio";
}) {
  return (
    <label className="flex items-center gap-2.5 py-1.5 cursor-pointer group text-xs">
      <span
        className={`shrink-0 w-4 h-4 border flex items-center justify-center transition-colors ${
          type === "radio" ? "rounded-full" : "rounded-[5px]"
        } ${
          checked
            ? "bg-accent border-accent text-white"
            : "border-line bg-surface group-hover:border-rose"
        }`}
      >
        {checked &&
          (type === "radio" ? (
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          ) : (
            <Icon name="check" className="w-3 h-3" strokeWidth={2.5} />
          ))}
      </span>
      <input
        type={type}
        checked={checked}
        onChange={onToggle}
        className="sr-only"
        aria-label={label}
      />
      <span
        className={`flex-1 transition-colors ${
          checked ? "text-accent" : "text-muted group-hover:text-accent"
        }`}
      >
        {label}
      </span>
      {count !== undefined && (
        <span className="text-[10px] text-muted/70">{count.toLocaleString("fa-IR")}</span>
      )}
    </label>
  );
}

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
    return <p className="text-xs text-muted">گزینه‌ای با فیلترهای فعلی وجود ندارد.</p>;
  }
  return (
    <div className="flex flex-col">
      {shown.map((option) => (
        <CheckRow
          key={option}
          label={option}
          checked={selected.includes(option)}
          count={countOf(option)}
          onToggle={() => onToggle(option)}
        />
      ))}
    </div>
  );
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
    return PER_PAGE_OPTIONS.includes(v) ? v : DEFAULT_PER_PAGE;
  })();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const urlPriceMin = Number(searchParams.get("priceMin") ?? MIN_BOUND);
  const urlPriceMax = Number(searchParams.get("priceMax") ?? MAX_BOUND);

  // Typing in the two amount boxes updates local state so they stay responsive;
  // the URL only catches up once the value is committed. Re-syncing during
  // render (rather than in an effect) keeps them from lagging a frame behind.
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
  const scentParam = searchParams.get("scent");
  const seasonParam = searchParams.get("season");
  const query = searchParams.get("q") ?? "";

  const filters: Filters = useMemo(
    () => ({
      category,
      packaging,
      brands: csv(brandParam),
      sizes: csv(sizeParam),
      qualities: csv(qualityParam),
      concentrations: csv(concParam),
      scents: csv(scentParam),
      seasons: csv(seasonParam),
      availability,
      priceMin: urlPriceMin,
      priceMax: urlPriceMax,
      query,
    }),
    [
      category,
      packaging,
      brandParam,
      sizeParam,
      qualityParam,
      concParam,
      scentParam,
      seasonParam,
      availability,
      urlPriceMin,
      urlPriceMax,
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
    const list = visibleProducts.filter((p) => matches(p, filters));
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
    const scent: Record<string, number> = {};
    const season: Record<string, number> = {};
    const category: Record<string, number> = {};
    const bump = (map: Record<string, number>, key: string) => {
      map[key] = (map[key] ?? 0) + 1;
    };
    for (const p of visibleProducts) {
      if (matches(p, filters, "brands")) bump(brand, p.brand);
      if (matches(p, filters, "sizes")) for (const s of p.sizes) bump(size, s);
      if (matches(p, filters, "concentrations")) bump(conc, p.concentration);
      if (matches(p, filters, "qualities")) for (const q of p.qualities) bump(quality, q);
      if (matches(p, filters, "scents")) for (const s of scentFamiliesOf(p)) bump(scent, s);
      if (matches(p, filters, "seasons")) bump(season, p.season);
      if (matches(p, filters, "category")) bump(category, p.category);
    }
    return { brand, size, conc, quality, scent, season, category };
  }, [filters]);

  const activeCount =
    (category !== "all" ? 1 : 0) +
    (packaging !== "all" ? 1 : 0) +
    (availability !== "all" ? 1 : 0) +
    filters.brands.length +
    filters.sizes.length +
    filters.qualities.length +
    filters.concentrations.length +
    filters.scents.length +
    filters.seasons.length +
    (urlPriceMin > MIN_BOUND || urlPriceMax < MAX_BOUND ? 1 : 0);

  const visibleBrands = brandQuery.trim()
    ? brands.filter((b) => b.toLowerCase().includes(brandQuery.trim().toLowerCase()))
    : brands;

  const activeBand =
    PRICE_BANDS.findIndex((b) => b.min === urlPriceMin && b.max === urlPriceMax) ?? 0;

  return (
    <div className="grid lg:grid-cols-[250px_1fr] gap-6 lg:gap-8">
      <div className="lg:hidden">
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="w-full btn btn-outline justify-center"
        >
          <Icon name="filter" className="w-4 h-4" />
          {showFilters ? "بستن فیلترها" : "فیلترها"}
          {activeCount > 0 && ` (${activeCount.toLocaleString("fa-IR")})`}
        </button>
      </div>

      <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
        <div className="rounded-2xl bg-surface border border-line px-5 py-2 lg:sticky lg:top-24">
          <div className="flex items-center justify-between py-3 border-b border-line">
            <span className="flex items-center gap-2 text-sm font-medium text-accent">
              <Icon name="filter" className="w-4 h-4 text-rose" />
              فیلترها
            </span>
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-[11px] text-muted hover:text-rose transition-colors"
            >
              <Icon name="close" className="w-3 h-3" />
              پاک‌کردن همه
            </button>
          </div>

          <FilterSection title="دسته‌بندی">
            {(
              [
                { key: "women", label: "عطر زنانه" },
                { key: "men", label: "عطر مردانه" },
                { key: "unisex", label: "عطر یونیسکس" },
              ] as { key: Product["category"]; label: string }[]
            ).map((c) => (
              <CheckRow
                key={c.key}
                label={c.label}
                count={counts.category[c.key] ?? 0}
                checked={category === c.key}
                onToggle={() => setParam("cat", category === c.key ? null : c.key)}
              />
            ))}
          </FilterSection>

          <FilterSection title="رایحه">
            <CheckList
              options={[...scentFamilies]}
              selected={filters.scents}
              countOf={(option) => counts.scent[option] ?? 0}
              onToggle={(option) => toggleInList("scent", option)}
            />
          </FilterSection>

          <FilterSection title="قیمت">
            {PRICE_BANDS.map((band, i) => (
              <CheckRow
                key={band.label}
                type="radio"
                label={band.label}
                checked={activeBand === i}
                onToggle={() => {
                  setPriceMin(band.min);
                  setPriceMax(band.max);
                  commitPrice(band.min, band.max);
                }}
              />
            ))}
            <div className="flex items-center gap-2 mt-3">
              <input
                type="text"
                inputMode="numeric"
                value={priceMin}
                onChange={(e) =>
                  setPriceMin(Number(toLatinDigits(e.target.value).replace(/\D/g, "")) || 0)
                }
                placeholder="از"
                aria-label="حداقل قیمت"
                className="min-w-0 flex-1 rounded-lg border border-line bg-blush/50 px-2 py-1.5 text-[11px] outline-none focus:border-rose"
              />
              <span className="text-muted text-[11px]">تا</span>
              <input
                type="text"
                inputMode="numeric"
                value={priceMax}
                onChange={(e) =>
                  setPriceMax(Number(toLatinDigits(e.target.value).replace(/\D/g, "")) || 0)
                }
                placeholder="تا"
                aria-label="حداکثر قیمت"
                className="min-w-0 flex-1 rounded-lg border border-line bg-blush/50 px-2 py-1.5 text-[11px] outline-none focus:border-rose"
              />
            </div>
          </FilterSection>

          <FilterSection title="حجم">
            <CheckList
              options={sizeOptions}
              selected={filters.sizes}
              countOf={(option) => counts.size[option] ?? 0}
              onToggle={(option) => toggleInList("size", option)}
            />
          </FilterSection>

          <FilterSection title="مناسبت">
            <CheckList
              options={seasonOptions}
              selected={filters.seasons}
              countOf={(option) => counts.season[option] ?? 0}
              onToggle={(option) => toggleInList("season", option)}
            />
          </FilterSection>

          <FilterSection title="غلظت" defaultOpen={false}>
            <CheckList
              options={concentrationOptions}
              selected={filters.concentrations}
              countOf={(option) => counts.conc[option] ?? 0}
              onToggle={(option) => toggleInList("conc", option)}
            />
          </FilterSection>

          {qualityOptions.length > 0 && (
            <FilterSection title="کیفیت غلظت عطر" defaultOpen={false}>
              <CheckList
                options={qualityOptions}
                selected={filters.qualities}
                countOf={(option) => counts.quality[option] ?? 0}
                onToggle={(option) => toggleInList("quality", option)}
              />
            </FilterSection>
          )}

          <FilterSection title="نوع بسته‌بندی" defaultOpen={false}>
            {(
              [
                { key: "اورجینال", label: "پک اورجینال" },
                { key: "بازرگانی نیرا", label: "پک بازرگانی نیرا" },
              ] as { key: Product["packaging"]; label: string }[]
            ).map((f) => (
              <CheckRow
                key={f.key}
                label={f.label}
                checked={packaging === f.key}
                onToggle={() => setParam("pack", packaging === f.key ? null : f.key)}
              />
            ))}
          </FilterSection>

          <FilterSection title="موجودی و حراج" defaultOpen={false}>
            {(
              [
                { key: "onsale", label: "فروش ویژه" },
                { key: "instock", label: "موجود در انبار" },
              ] as { key: Exclude<Availability, "all">; label: string }[]
            ).map((f) => (
              <CheckRow
                key={f.key}
                label={f.label}
                checked={availability === f.key}
                onToggle={() => setParam("avail", availability === f.key ? null : f.key)}
              />
            ))}
          </FilterSection>

          <FilterSection
            title={`برند${
              filters.brands.length > 0
                ? ` (${filters.brands.length.toLocaleString("fa-IR")})`
                : ""
            }`}
            defaultOpen={false}
          >
            <input
              type="text"
              placeholder="جستجوی برند..."
              value={brandQuery}
              onChange={(e) => setBrandQuery(e.target.value)}
              className="w-full rounded-lg border border-line bg-blush/50 px-3 py-1.5 text-[11px] outline-none focus:border-rose mb-2"
            />
            <div className="max-h-56 overflow-y-auto pl-1">
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
          </FilterSection>

          <div className="py-4">
            <button
              onClick={() => {
                commitPrice(Math.min(priceMin, priceMax), Math.max(priceMin, priceMax));
                setShowFilters(false);
              }}
              className="btn btn-primary w-full justify-center"
            >
              <Icon name="filter" className="w-4 h-4" />
              اعمال فیلتر
            </button>
          </div>
        </div>
      </aside>

      <div ref={gridRef} className="scroll-mt-24">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap text-sm">
          <span className="text-muted text-xs sm:text-sm">
            {filtered.length > 0 ? (
              <>
                {filtered.length.toLocaleString("fa-IR")} محصول یافت شد
                <span className="text-muted/70">
                  {" "}
                  (نمایش {(start + 1).toLocaleString("fa-IR")}–
                  {Math.min(start + perPage, filtered.length).toLocaleString("fa-IR")})
                </span>
              </>
            ) : (
              "نتیجه‌ای یافت نشد"
            )}
            {filters.query && <> برای «{filters.query}»</>}
          </span>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted">
              <span>نمایش</span>
              {PER_PAGE_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() =>
                    setParam("per", n === DEFAULT_PER_PAGE ? null : String(n))
                  }
                  className={`px-1.5 rounded transition-colors ${
                    perPage === n ? "text-accent font-bold" : "hover:text-rose"
                  }`}
                >
                  {n.toLocaleString("fa-IR")}
                </button>
              ))}
            </div>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) =>
                  setParam("sort", e.target.value === "latest" ? null : e.target.value)
                }
                className="appearance-none rounded-xl border border-line bg-surface pl-9 pr-4 py-2.5 text-xs text-accent outline-none focus:border-rose cursor-pointer"
                aria-label="مرتب‌سازی"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
              <Icon
                name="chevron"
                className="w-4 h-4 text-rose absolute left-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Rendered without an entrance animation on purpose: results change on
            every filter and page click, and a staggered reveal both delayed the
            last cards by seconds and could leave replaced children stuck hidden. */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-muted text-sm">محصولی با این فیلترها پیدا نشد.</p>
            <button onClick={clearAll} className="btn btn-primary mt-5">
              حذف همه فیلترها
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              aria-label="صفحه قبل"
              className="w-9 h-9 rounded-full border border-line text-accent flex items-center justify-center disabled:opacity-40 hover:border-rose transition-colors"
            >
              <Icon name="chevron" className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((n) => n === 1 || n === totalPages || Math.abs(n - currentPage) <= 1)
              .map((n, i, list) => (
                <span key={n} className="flex items-center gap-2">
                  {i > 0 && list[i - 1] !== n - 1 && <span className="text-muted">…</span>}
                  <button
                    onClick={() => goToPage(n)}
                    className={`w-9 h-9 rounded-full border text-xs transition-colors ${
                      n === currentPage
                        ? "bg-accent text-white border-accent"
                        : "border-line text-accent hover:border-rose"
                    }`}
                  >
                    {n.toLocaleString("fa-IR")}
                  </button>
                </span>
              ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              aria-label="صفحه بعد"
              className="w-9 h-9 rounded-full border border-line text-accent flex items-center justify-center disabled:opacity-40 hover:border-rose transition-colors rotate-180"
            >
              <Icon name="chevron" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
