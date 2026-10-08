"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { thumb, uploadImages } from "@/lib/client-image";

/** Shared building blocks for the admin forms. Plain, dense, and readable. */

export const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors";
export const btnCls =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors disabled:opacity-50 disabled:pointer-events-none";
export const btnPrimary = `${btnCls} bg-accent text-white hover:bg-accent-dark`;
export const btnGhost = `${btnCls} border border-line bg-white text-accent hover:border-accent`;
export const btnDanger = `${btnCls} border border-red-200 bg-white text-red-700 hover:bg-red-50`;

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-accent mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-muted mt-1">{hint}</span>}
    </label>
  );
}

export function Card({ title, children, aside }: { title?: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="rounded-2xl bg-white border border-line p-5 sm:p-6">
      {(title || aside) && (
        <div className="flex items-center justify-between gap-3 mb-4">
          {title && <h2 className="text-sm font-bold text-accent">{title}</h2>}
          {aside}
        </div>
      )}
      {children}
    </section>
  );
}

export function useToast() {
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const show = useCallback((text: string, ok = true) => {
    setMsg({ text, ok });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 4000);
  }, []);
  const node = msg && (
    <div
      role="status"
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] rounded-xl px-5 py-3 text-sm shadow-lg ${
        msg.ok ? "bg-accent text-white" : "bg-red-700 text-white"
      }`}
    >
      {msg.text}
    </div>
  );
  return { show, node };
}

/** Sticky bar holding the save button; warns about unsaved changes. */
export function SaveBar({
  dirty,
  saving,
  onSave,
  extra,
  label = "ذخیره تغییرات",
}: {
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  extra?: ReactNode;
  label?: string;
}) {
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  return (
    <div className="sticky bottom-0 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 bg-background/95 backdrop-blur border-t border-line flex items-center gap-3 z-20">
      <button type="button" onClick={onSave} disabled={saving || !dirty} className={btnPrimary}>
        {saving ? "در حال ذخیره…" : label}
      </button>
      <span className="text-xs text-muted">{dirty ? "تغییرات ذخیره‌نشده دارید" : "همه‌چیز ذخیره است"}</span>
      <span className="flex-1" />
      {extra}
    </div>
  );
}

/* ------------------------------ image picker ------------------------------ */

type MediaItem = { url: string; name: string; size: number; uploaded: boolean };

function MediaPicker({ onPick, onClose }: { onPick: (url: string) => void; onClose: () => void }) {
  const [tab, setTab] = useState<"uploads" | "bundled">("uploads");
  const [data, setData] = useState<{ uploads: MediaItem[]; bundled: MediaItem[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/media", { cache: "no-store" });
    if (res.ok) setData(await res.json());
    else setError("بارگذاری کتابخانه تصاویر ناموفق بود.");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    // Initial fetch; setState happens after the awaited response, not synchronously.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError("");
    try {
      const { urls, errors } = await uploadImages(Array.from(files), setStatus);
      if (errors.length) setError(errors.join(" | "));
      if (urls.length) {
        await load();
        setTab("uploads");
        if (urls.length === 1 && errors.length === 0) onPick(urls[0]);
      }
    } finally {
      setBusy(false);
      setStatus("");
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const items = data ? (tab === "uploads" ? data.uploads : data.bundled) : [];

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="انتخاب تصویر"
        className="bg-background rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-line">
          <h3 className="font-bold text-accent text-sm">انتخاب تصویر</h3>
          <div className="flex gap-1 text-xs">
            {(
              [
                ["uploads", "آپلودشده"],
                ["bundled", "تصاویر موجود سایت"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                className={`px-3 py-1.5 rounded-full ${tab === k ? "bg-accent text-white" : "bg-white border border-line text-accent"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="flex-1" />
          <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
          <button type="button" className={btnPrimary} disabled={busy} onClick={() => fileRef.current?.click()}>
            {busy ? status || "در حال آپلود…" : "آپلود تصویر جدید"}
          </button>
          <button type="button" onClick={onClose} aria-label="بستن" className="text-muted hover:text-accent text-lg px-2">
            ✕
          </button>
        </div>
        {error && <p className="px-4 pt-3 text-sm text-red-700">{error}</p>}
        {/* auto-rows-min: without it a tall grid squeezes every tile into a thin strip once there are more than a few images. */}
        <div className="p-4 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 gap-3 auto-rows-min content-start">
          {!data && <p className="col-span-full text-sm text-muted">در حال بارگذاری…</p>}
          {data && items.length === 0 && (
            <p className="col-span-full text-sm text-muted text-center py-10">
              {tab === "uploads" ? "هنوز تصویری آپلود نشده است." : "تصویری یافت نشد."}
            </p>
          )}
          {items.map((it) => (
            <button
              key={it.url}
              type="button"
              onClick={() => onPick(it.url)}
              className="group text-right rounded-xl border border-line bg-white overflow-hidden hover:border-accent"
            >
              <span className="block aspect-square bg-blush">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(it.url)} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </span>
              <span className="block px-2 py-1.5 text-[10px] text-muted truncate" dir="ltr">
                {it.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ImageField({
  label,
  value,
  onChange,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  optional?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <span className="block text-xs font-medium text-accent mb-1.5">{label}</span>
      <div className="flex gap-3 items-start">
        <div className="w-20 h-20 shrink-0 rounded-lg border border-line bg-blush overflow-hidden flex items-center justify-center text-[10px] text-muted">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumb(value, 128)} alt="" decoding="async" className="w-full h-full object-cover" />
          ) : (
            "بدون تصویر"
          )}
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <input
            dir="ltr"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/uploads/… یا https://…"
            className={`${inputCls} text-left`}
          />
          <div className="flex gap-2">
            <button type="button" onClick={() => setOpen(true)} className={btnGhost}>
              انتخاب / آپلود
            </button>
            {optional && value && (
              <button type="button" onClick={() => onChange("")} className={btnGhost}>
                حذف تصویر
              </button>
            )}
          </div>
        </div>
      </div>
      {open && (
        <MediaPicker
          onPick={(url) => {
            onChange(url);
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

/* ------------------------------ list editors ------------------------------ */

function ListShell({
  label,
  onAdd,
  addLabel,
  children,
}: {
  label: string;
  onAdd: () => void;
  addLabel: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-accent">{label}</span>
        <button type="button" onClick={onAdd} className="text-xs text-rose hover:text-accent">
          + {addLabel}
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

const iconBtn = "w-8 h-8 shrink-0 rounded-lg border border-line bg-white text-muted hover:text-accent hover:border-accent disabled:opacity-30";

function move<T>(list: T[], i: number, dir: -1 | 1) {
  const j = i + dir;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

export function StringListField({
  label,
  value,
  onChange,
  addLabel = "افزودن",
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  addLabel?: string;
  placeholder?: string;
}) {
  return (
    <ListShell label={label} onAdd={() => onChange([...value, ""])} addLabel={addLabel}>
      {value.length === 0 && <p className="text-xs text-muted">موردی ثبت نشده است.</p>}
      {value.map((v, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={v}
            placeholder={placeholder}
            onChange={(e) => onChange(value.map((x, j) => (j === i ? e.target.value : x)))}
            className={inputCls}
          />
          <button type="button" className={iconBtn} disabled={i === 0} onClick={() => onChange(move(value, i, -1))} aria-label="بالا">
            ↑
          </button>
          <button type="button" className={iconBtn} disabled={i === value.length - 1} onClick={() => onChange(move(value, i, 1))} aria-label="پایین">
            ↓
          </button>
          <button type="button" className={iconBtn} onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="حذف">
            ✕
          </button>
        </div>
      ))}
    </ListShell>
  );
}

export function ImageListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <ListShell label={label} onAdd={() => onChange([...value, ""])} addLabel="افزودن تصویر">
      {value.length === 0 && <p className="text-xs text-muted">تصویری ثبت نشده است.</p>}
      {value.map((v, i) => (
        <div key={i} className="flex gap-2 items-start rounded-xl border border-line bg-background p-3">
          <div className="flex-1 min-w-0">
            <ImageField label={`تصویر ${(i + 1).toLocaleString("fa-IR")}`} value={v} onChange={(nv) => onChange(value.map((x, j) => (j === i ? nv : x)))} />
          </div>
          <div className="flex flex-col gap-1">
            <button type="button" className={iconBtn} disabled={i === 0} onClick={() => onChange(move(value, i, -1))} aria-label="بالا">
              ↑
            </button>
            <button type="button" className={iconBtn} disabled={i === value.length - 1} onClick={() => onChange(move(value, i, 1))} aria-label="پایین">
              ↓
            </button>
            <button type="button" className={iconBtn} onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="حذف">
              ✕
            </button>
          </div>
        </div>
      ))}
    </ListShell>
  );
}

export type TitledSection = { title: string; body: string };

export function SectionsField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: TitledSection[];
  onChange: (v: TitledSection[]) => void;
}) {
  return (
    <ListShell label={label} onAdd={() => onChange([...value, { title: "", body: "" }])} addLabel="افزودن بخش">
      {value.length === 0 && <p className="text-xs text-muted">بخشی ثبت نشده است.</p>}
      {value.map((s, i) => (
        <div key={i} className="flex gap-2 items-start rounded-xl border border-line bg-background p-3">
          <div className="flex-1 space-y-2">
            <input
              value={s.title}
              placeholder="عنوان بخش"
              onChange={(e) => onChange(value.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))}
              className={inputCls}
            />
            <textarea
              rows={3}
              value={s.body}
              placeholder="متن بخش"
              onChange={(e) => onChange(value.map((x, j) => (j === i ? { ...x, body: e.target.value } : x)))}
              className={inputCls}
            />
          </div>
          <div className="flex flex-col gap-1">
            <button type="button" className={iconBtn} disabled={i === 0} onClick={() => onChange(move(value, i, -1))} aria-label="بالا">
              ↑
            </button>
            <button type="button" className={iconBtn} disabled={i === value.length - 1} onClick={() => onChange(move(value, i, 1))} aria-label="پایین">
              ↓
            </button>
            <button type="button" className={iconBtn} onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="حذف">
              ✕
            </button>
          </div>
        </div>
      ))}
    </ListShell>
  );
}
