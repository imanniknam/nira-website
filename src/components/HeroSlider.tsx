"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  { image: "/img/brand/hero.png", alt: "نیرا — حس طبیعت در هر قطره" },
  { image: "/img/hero/slide-1.png", alt: "نیرا عطر صحرا — مرجع عطرهای ماندگار" },
  { image: "/img/hero/slide-2.jpg", alt: "عطرهایی برای هر سلیقه و هر مناسبت" },
  { image: "/img/hero/slide-3.jpg", alt: "سفر به دنیای رایحه‌ها" },
];

const INTERVAL = 5500;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion.current) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused, index]);

  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div
        aria-hidden
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-accent/15 blur-[90px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14 relative">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Source order puts the artwork on top when stacked on mobile; the
              order utilities then place it on the left of the text on desktop. */}
          <div
            className="relative rounded-2xl overflow-hidden border border-line bg-background md:order-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label="بنرهای نیرا"
          >
            <div className="relative aspect-[16/10]">
              {SLIDES.map((s, i) => (
                <Image
                  key={s.image}
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                  aria-hidden={i !== index}
                  // object-contain keeps each banner's own wording fully visible,
                  // and nothing is dimmed over it.
                  className={`object-contain transition-opacity duration-700 ease-in-out ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(index + 1)}
              aria-label="بنر قبلی"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-surface/80 hover:bg-surface backdrop-blur border border-line transition-colors"
            >
              ›
            </button>
            <button
              onClick={() => go(index - 1)}
              aria-label="بنر بعدی"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-surface/80 hover:bg-surface backdrop-blur border border-line transition-colors"
            >
              ‹
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.image}
                  onClick={() => go(i)}
                  aria-label={`بنر ${(i + 1).toLocaleString("fa-IR")}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-accent" : "w-2 bg-foreground/25 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="md:order-1">
            <span className="text-accent text-sm">نیرا عطر صحرا</span>
            <h1 className="text-3xl sm:text-4xl font-bold mt-2 leading-[1.3]">
              حس طبیعت،
              <br />
              <em className="not-italic text-accent">در هر قطره</em>
            </h1>
            <p className="text-muted mt-4 max-w-2xl leading-7">
              نیرا، جادویی از رایحه برای لحظات خاص زندگی. از عطرهای اورجینال برندهای
              جهانی و پک بازرگانی اقتصادی نیرا تا طراحی و تولید اختصاصی عطر سازمانی
              برای برند شما.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link
                href="/shop"
                className="rounded-full bg-accent hover:bg-accent-dark transition-colors text-white px-6 py-3 text-sm"
              >
                مشاهده فروشگاه
              </Link>
              <Link
                href="/custom-order"
                className="rounded-full border border-line hover:border-accent transition-colors px-6 py-3 text-sm"
              >
                سفارش عطر اختصاصی
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
