"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Banner } from "@/components/Banner";
import { Icon } from "@/components/Icon";
import { categoryLabels, projects } from "@/lib/projects";

export function ArchiveGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
      {projects.map((p, i) => {
        const featured = i === 0;
        return (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
            className={featured ? "md:col-span-2" : ""}
          >
            <Link
              href={`/archive/${p.slug}`}
              className="group block h-full rounded-3xl bg-surface border border-line overflow-hidden transition-all duration-300 hover:border-rose-soft hover:shadow-[0_26px_50px_-32px_rgba(122,34,88,0.6)]"
            >
              <div className="relative">
                <Banner
                  src={p.heroImage ?? p.image}
                  alt={p.title}
                  label={p.client}
                  sizes={featured ? "(max-width: 768px) 100vw, 1150px" : "(max-width: 768px) 100vw, 570px"}
                  className={`w-full ${featured ? "aspect-[16/9] md:aspect-[21/8]" : "aspect-[16/9]"} [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105`}
                />
                <span className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] text-accent">
                  {categoryLabels[p.category]}
                </span>
                <span className="absolute top-4 left-4 text-xs font-bold text-white/90 tabular-nums">
                  {(i + 1).toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <b className="block text-accent text-lg leading-8 group-hover:text-accent-dark transition-colors">
                  {p.title}
                </b>
                <p className="text-xs text-muted mt-1">{p.desc}</p>
                <ul className="flex flex-wrap gap-1.5 mt-4">
                  {p.scope.slice(0, featured ? 4 : 3).map((s) => (
                    <li key={s} className="rounded-full bg-blush text-accent px-3 py-1 text-[11px]">
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="flex items-center gap-2 mt-5 text-xs text-rose">
                  مشاهده پروژه
                  <Icon
                    name="arrow"
                    className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </motion.article>
        );
      })}
    </div>
  );
}
