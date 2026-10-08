"use client";

import Image from "next/image";
import { useState } from "react";

/** Main image with clickable thumbnails (the main shot plus the gallery). */
export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-square rounded-2xl bg-blush border border-line overflow-hidden">
        <Image
          key={current}
          src={current}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-8"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`تصویر ${(i + 1).toLocaleString("fa-IR")}`}
              aria-current={i === active}
              className={`relative w-20 h-20 rounded-xl border bg-white overflow-hidden flex-none transition-colors ${
                i === active ? "border-accent ring-1 ring-accent" : "border-line hover:border-rose"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
