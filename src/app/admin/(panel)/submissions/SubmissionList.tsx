"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Submission, SubmissionKind } from "@/lib/types";
import { deleteSubmissionAction, setSubmissionStatusAction } from "../../actions";
import { btnDanger, btnGhost } from "../../ui";
import { toTel } from "@/lib/site";

const kindLabel: Record<SubmissionKind, string> = {
  contact: "تماس",
  order: "سفارش شرکتی",
  cart: "درخواست خرید",
};
const statusLabel = { new: "جدید", read: "خوانده‌شده", done: "پیگیری‌شده" } as const;

const fmt = (iso: string) => new Date(iso).toLocaleString("fa-IR", { dateStyle: "medium", timeStyle: "short" });

export function SubmissionList({ items }: { items: Submission[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [kind, setKind] = useState<"all" | SubmissionKind>("all");
  const [status, setStatus] = useState<"all" | Submission["status"]>("all");
  const [open, setOpen] = useState<string | null>(null);

  const shown = items.filter((s) => (kind === "all" || s.kind === kind) && (status === "all" || s.status === status));

  const mark = (id: string, st: Submission["status"]) =>
    start(async () => {
      await setSubmissionStatusAction(id, st);
      router.refresh();
    });

  const toggle = (s: Submission) => {
    const next = open === s.id ? null : s.id;
    setOpen(next);
    if (next && s.status === "new") mark(s.id, "read");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        <select value={kind} onChange={(e) => setKind(e.target.value as typeof kind)} className="rounded-lg border border-line bg-white px-3 py-2" aria-label="نوع">
          <option value="all">همه انواع</option>
          {(Object.keys(kindLabel) as SubmissionKind[]).map((k) => (
            <option key={k} value={k}>
              {kindLabel[k]}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="rounded-lg border border-line bg-white px-3 py-2" aria-label="وضعیت">
          <option value="all">همه وضعیت‌ها</option>
          {(Object.keys(statusLabel) as (keyof typeof statusLabel)[]).map((k) => (
            <option key={k} value={k}>
              {statusLabel[k]}
            </option>
          ))}
        </select>
      </div>

      {shown.length === 0 ? (
        <p className="rounded-2xl bg-white border border-line p-10 text-center text-sm text-muted">موردی یافت نشد.</p>
      ) : (
        <ul className="space-y-3">
          {shown.map((s) => (
            <li key={s.id} className="rounded-2xl bg-white border border-line overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(s)}
                aria-expanded={open === s.id}
                className="w-full flex items-center gap-3 p-4 text-right"
              >
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.status === "new" ? "bg-rose" : "bg-line"}`} />
                <span className="text-xs rounded-full bg-blush text-accent px-2.5 py-1 shrink-0">{kindLabel[s.kind]}</span>
                <b className={`flex-1 min-w-0 truncate text-sm ${s.status === "new" ? "text-accent" : "text-foreground font-medium"}`}>{s.name}</b>
                <span className="text-xs text-muted shrink-0 hidden sm:block">{fmt(s.createdAt)}</span>
                <span className="text-xs text-muted shrink-0">{statusLabel[s.status]}</span>
              </button>

              {open === s.id && (
                <div className="border-t border-line p-4 sm:p-5 space-y-4 bg-background">
                  <dl className="space-y-3 text-sm">
                    {s.fields.map((f) => (
                      <div key={f.label} className="grid sm:grid-cols-[130px_1fr] gap-1 sm:gap-3">
                        <dt className="text-xs text-muted pt-0.5">{f.label}</dt>
                        <dd className="whitespace-pre-line leading-7 break-words">{f.value || "—"}</dd>
                      </div>
                    ))}
                    <div className="grid sm:grid-cols-[130px_1fr] gap-1 sm:gap-3">
                      <dt className="text-xs text-muted pt-0.5">زمان ثبت</dt>
                      <dd>{fmt(s.createdAt)}</dd>
                    </div>
                  </dl>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {s.phone && (
                      <a href={`tel:${toTel(s.phone)}`} className={btnGhost}>
                        تماس
                      </a>
                    )}
                    {s.email && (
                      <a href={`mailto:${s.email}`} className={btnGhost}>
                        ایمیل
                      </a>
                    )}
                    {s.status !== "done" ? (
                      <button type="button" disabled={pending} onClick={() => mark(s.id, "done")} className={btnGhost}>
                        پیگیری شد ✓
                      </button>
                    ) : (
                      <button type="button" disabled={pending} onClick={() => mark(s.id, "read")} className={btnGhost}>
                        بازگردانی
                      </button>
                    )}
                    <span className="flex-1" />
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => {
                        if (!confirm("این مورد حذف شود؟")) return;
                        start(async () => {
                          await deleteSubmissionAction(s.id);
                          router.refresh();
                        });
                      }}
                      className={btnDanger}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
