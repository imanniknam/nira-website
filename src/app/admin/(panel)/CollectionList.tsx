"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { ActionResult } from "../actions";
import { thumb } from "@/lib/client-image";
import { btnDanger, btnGhost, btnPrimary, useToast } from "../ui";

export type ListRow = {
  slug: string;
  title: string;
  subtitle?: string;
  image?: string;
  tags?: string[];
  muted?: boolean;
};

export function CollectionList({
  basePath,
  rows,
  noun,
  moveAction,
  deleteAction,
}: {
  basePath: string;
  rows: ListRow[];
  noun: string;
  moveAction: (slug: string, dir: -1 | 1) => Promise<ActionResult>;
  deleteAction: (slug: string) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [filter, setFilter] = useState("");
  const toast = useToast();

  const run = (fn: () => Promise<ActionResult>, okMsg?: string) =>
    start(async () => {
      const res = await fn();
      if (!res.ok) toast.show(res.error, false);
      else {
        if (okMsg) toast.show(okMsg);
        router.refresh();
      }
    });

  const q = filter.trim().toLowerCase();
  const shown = q ? rows.filter((r) => `${r.title} ${r.subtitle ?? ""}`.toLowerCase().includes(q)) : rows;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={`جستجو در ${noun}…`}
          className="flex-1 min-w-48 rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <Link href={`${basePath}/new`} className={btnPrimary}>
          + افزودن {noun}
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-2xl bg-white border border-line p-10 text-center text-sm text-muted">
          هنوز {noun}ی ثبت نشده است.
        </p>
      ) : (
        <ul className="rounded-2xl bg-white border border-line divide-y divide-line overflow-hidden">
          {shown.map((r) => {
            const i = rows.findIndex((x) => x.slug === r.slug);
            return (
              <li key={r.slug} className={`flex items-center gap-3 p-3 sm:p-4 ${r.muted ? "opacity-60" : ""}`}>
                <div className="w-14 h-14 shrink-0 rounded-lg bg-blush border border-line overflow-hidden">
                  {r.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb(r.image, 128)} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  )}
                </div>
                <Link href={`${basePath}/${encodeURIComponent(r.slug)}`} className="flex-1 min-w-0 group">
                  <b className="block text-sm text-accent truncate group-hover:underline">{r.title}</b>
                  <span className="block text-xs text-muted truncate">{r.subtitle}</span>
                  {r.tags && r.tags.length > 0 && (
                    <span className="flex flex-wrap gap-1 mt-1">
                      {r.tags.map((t) => (
                        <span key={t} className="text-[10px] rounded-full bg-blush text-accent px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </span>
                  )}
                </Link>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    disabled={pending || i === 0 || !!q}
                    onClick={() => run(() => moveAction(r.slug, -1))}
                    aria-label="بالاتر"
                    className={`${btnGhost} !px-2.5`}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    disabled={pending || i === rows.length - 1 || !!q}
                    onClick={() => run(() => moveAction(r.slug, 1))}
                    aria-label="پایین‌تر"
                    className={`${btnGhost} !px-2.5`}
                  >
                    ↓
                  </button>
                  <Link href={`${basePath}/${encodeURIComponent(r.slug)}`} className={`${btnGhost} hidden sm:inline-flex`}>
                    ویرایش
                  </Link>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => {
                      if (confirm(`«${r.title}» برای همیشه حذف شود؟`)) run(() => deleteAction(r.slug), "حذف شد.");
                    }}
                    className={btnDanger}
                  >
                    حذف
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {toast.node}
    </div>
  );
}
