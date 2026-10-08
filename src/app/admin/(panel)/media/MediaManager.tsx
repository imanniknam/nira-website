"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { thumb, uploadImages } from "@/lib/client-image";
import { deleteUploadAction } from "../../actions";
import { btnDanger, btnGhost, btnPrimary, useToast } from "../../ui";

type Item = { url: string; name: string; size: number };

const kb = (n: number) => `${Math.max(1, Math.round(n / 1024)).toLocaleString("fa-IR")} کیلوبایت`;

export function MediaManager({ items }: { items: Item[] }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [pending, start] = useTransition();
  const toast = useToast();

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      const { urls, errors } = await uploadImages(Array.from(files), setStatus);
      if (errors.length) toast.show(errors.join(" | "), false);
      else toast.show("آپلود شد.");
      if (urls.length) router.refresh();
    } finally {
      setBusy(false);
      setStatus("");
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
      <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className={btnPrimary}>
        {busy ? status || "در حال آپلود…" : "آپلود تصویر"}
      </button>
      <span className="text-xs text-muted mr-3">JPG، PNG، WebP، GIF یا AVIF — تصاویر بزرگ خودکار بهینه و کوچک می‌شوند</span>

      {items.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-white border border-line p-10 text-center text-sm text-muted">
          هنوز تصویری آپلود نشده است.
        </p>
      ) : (
        <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <li key={it.url} className="rounded-xl bg-white border border-line overflow-hidden">
              <div className="aspect-square bg-blush">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(it.url)} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 space-y-2">
                <p className="text-[11px] text-muted truncate" dir="ltr">
                  {it.name}
                </p>
                <p className="text-[11px] text-muted">{kb(it.size)}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`${btnGhost} flex-1 !px-2 !py-1.5 text-xs`}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(it.url);
                        toast.show("آدرس کپی شد.");
                      } catch {
                        toast.show(it.url);
                      }
                    }}
                  >
                    کپی آدرس
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    className={`${btnDanger} !px-2 !py-1.5 text-xs`}
                    onClick={() => {
                      if (!confirm("این تصویر حذف شود؟ اگر جایی استفاده شده باشد، آنجا خالی می‌ماند.")) return;
                      start(async () => {
                        await deleteUploadAction(it.url);
                        router.refresh();
                      });
                    }}
                  >
                    حذف
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {toast.node}
    </div>
  );
}
