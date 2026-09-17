"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { TabBar } from "@/components/TabBar";
import { Icon } from "@/components/Icon";
import { eventFilters, events } from "@/lib/events";

export function GalleryGrid() {
  const [active, setActive] = useState<string>("all");
  const shown = active === "all" ? events : events.filter((e) => e.category === active);

  return (
    <div>
      <TabBar tabs={eventFilters} active={active} onChange={setActive} />

      <div className="grid sm:grid-cols-2 gap-5 mt-10">
        {shown.map((e) => (
          <motion.article
            key={e.slug}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Link
              href={`/gallery/${e.slug}`}
              className="group block h-full rounded-2xl bg-surface border border-line overflow-hidden transition-all duration-300 hover:border-rose-soft hover:shadow-[0_22px_45px_-30px_rgba(122,34,88,0.55)]"
            >
              <div className="relative aspect-[16/9] bg-blush">
                <Image
                  src={e.image}
                  alt={e.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 45vw"
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <b className="block text-accent text-sm leading-7 group-hover:text-accent-dark transition-colors">
                  {e.title}
                </b>
                <div className="flex items-center justify-between gap-3 mt-2">
                  <span className="text-xs text-muted">{e.meta}</span>
                  <span className="flex items-center gap-1.5 text-xs text-rose">
                    مشاهده
                    <Icon
                      name="arrow"
                      className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="text-center text-sm text-muted mt-12">
          رویدادی در این دسته ثبت نشده است.
        </p>
      )}
    </div>
  );
}
