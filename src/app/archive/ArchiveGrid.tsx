"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { TabBar } from "@/components/TabBar";
import { Icon } from "@/components/Icon";
import { projectFilters, projects } from "@/lib/projects";

export function ArchiveGrid() {
  const [active, setActive] = useState<string>("all");
  const shown =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <TabBar tabs={projectFilters} active={active} onChange={setActive} />

      <div className="grid sm:grid-cols-2 gap-5 mt-10">
        {shown.map((p) => (
          <motion.article
            key={p.slug}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Link
              href={`/archive/${p.slug}`}
              className="group h-full rounded-2xl bg-surface border border-line overflow-hidden flex transition-all duration-300 hover:border-rose-soft hover:shadow-[0_22px_45px_-30px_rgba(122,34,88,0.55)]"
            >
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <b className="block text-accent leading-7 group-hover:text-accent-dark transition-colors">
                    {p.title}
                  </b>
                  <span className="block text-xs text-muted mt-2">{p.desc}</span>
                </div>
                <span className="flex items-center gap-2 mt-6 text-xs text-rose">
                  مشاهده پروژه
                  <Icon
                    name="arrow"
                    className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                  />
                </span>
              </div>
              <div className="relative w-[42%] shrink-0 bg-blush">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 45vw, 22vw"
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="text-center text-sm text-muted mt-12">
          پروژه‌ای در این دسته ثبت نشده است.
        </p>
      )}
    </div>
  );
}
