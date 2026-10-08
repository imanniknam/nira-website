"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Banner } from "@/components/Banner";
import { Icon } from "@/components/Icon";
import type { GalleryEvent } from "@/lib/types";

export function GalleryGrid({ events }: { events: GalleryEvent[] }) {
  if (events.length === 0) {
    return <p className="text-center text-muted text-sm py-10">هنوز رویدادی ثبت نشده است.</p>;
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {events.map((e, i) => {
        const wide = i === 0;
        return (
          <motion.article
            key={e.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
            className={wide ? "lg:col-span-2" : ""}
          >
            <Link
              href={`/gallery/${e.slug}`}
              className="group relative block h-full min-h-[260px] rounded-3xl overflow-hidden border border-line transition-shadow duration-300 hover:shadow-[0_26px_50px_-32px_rgba(122,34,88,0.7)]"
            >
              <div className="absolute inset-0">
              <Banner
                src={e.heroImage ?? e.image}
                alt={e.title}
                label={e.venue}
                hideLabel
                sizes={wide ? "(max-width: 1024px) 100vw, 760px" : "(max-width: 640px) 100vw, 380px"}
                className="h-full w-full [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105"
              />
              </div>
              {(e.heroImage ?? e.image) && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c0a1f]/85 via-[#2c0a1f]/25 to-transparent" />
              )}
              <span className="absolute top-4 right-4 text-xs font-bold text-white/80 tabular-nums">
                {(i + 1).toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <b className="block text-white leading-7">{e.venue}</b>
                <div className="flex items-center justify-between gap-3 mt-2">
                  <span className="text-[11px] text-white/70">{e.date}</span>
                  <span className="flex items-center gap-1.5 text-xs text-white">
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
        );
      })}
    </div>
  );
}
