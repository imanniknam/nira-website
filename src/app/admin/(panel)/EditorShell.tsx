"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import type { ActionResult } from "../actions";
import { SaveBar, btnDanger, useToast } from "../ui";

/**
 * Wraps an item editor: owns the draft state, saves through a server action,
 * and returns to the list afterwards. `children` gets the draft and its setter.
 */
export function EditorShell<T extends { slug: string }>({
  title,
  backHref,
  backLabel,
  initial,
  isNew,
  saveAction,
  deleteAction,
  children,
}: {
  title: string;
  backHref: string;
  backLabel: string;
  initial: T;
  isNew: boolean;
  saveAction: (item: T, original?: string) => Promise<ActionResult>;
  deleteAction: (slug: string) => Promise<ActionResult>;
  children: (draft: T, set: <K extends keyof T>(key: K, value: T[K]) => void) => ReactNode;
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);

  const set = <K extends keyof T>(key: K, value: T[K]) => setDraft((d) => ({ ...d, [key]: value }));

  async function save() {
    setSaving(true);
    try {
      const res = await saveAction(draft, isNew ? undefined : saved.slug);
      if (!res.ok) return toast.show(res.error, false);
      setSaved(draft);
      toast.show("ذخیره شد.");
      // Let the success toast register before leaving the form.
      setTimeout(() => {
        router.push(backHref);
        router.refresh();
      }, 500);
    } catch {
      toast.show("ذخیره ناموفق بود. دوباره تلاش کنید.", false);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm("این مورد برای همیشه حذف شود؟")) return;
    const res = await deleteAction(saved.slug);
    if (!res.ok) return toast.show(res.error, false);
    router.push(backHref);
    router.refresh();
  }

  return (
    <div className="max-w-4xl pb-6">
      <Link href={backHref} className="text-xs text-rose hover:text-accent">
        ← {backLabel}
      </Link>
      <h1 className="text-xl font-bold text-accent mt-2 mb-6">{title}</h1>
      <div className="space-y-5">{children(draft, set)}</div>
      <SaveBar
        dirty={dirty}
        saving={saving}
        onSave={save}
        label={isNew ? "ثبت و بازگشت" : "ذخیره تغییرات"}
        extra={
          !isNew && (
            <button type="button" onClick={remove} className={btnDanger}>
              حذف
            </button>
          )
        }
      />
      {toast.node}
    </div>
  );
}

export function SlugField({
  value,
  onChange,
  isNew,
  Field,
  inputCls,
}: {
  value: string;
  onChange: (v: string) => void;
  isNew: boolean;
  Field: React.ComponentType<{ label: string; hint?: string; children: ReactNode }>;
  inputCls: string;
}) {
  return (
    <Field
      label="نشانی صفحه (slug)"
      hint={
        isNew
          ? "اختیاری — خالی بگذارید تا از عنوان ساخته شود."
          : "با تغییر نشانی، لینک قبلی این صفحه از کار می‌افتد."
      }
    >
      <input dir="ltr" value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} text-left`} />
    </Field>
  );
}
