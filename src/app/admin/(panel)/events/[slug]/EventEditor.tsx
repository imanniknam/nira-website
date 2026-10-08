"use client";

import type { GalleryEvent } from "@/lib/types";
import { deleteEventAction, saveEventAction } from "../../../actions";
import { Card, Field, ImageField, ImageListField, SectionsField, StringListField, inputCls } from "../../../ui";
import { EditorShell, SlugField } from "../../EditorShell";

export function EventEditor({ initial, isNew }: { initial: GalleryEvent; isNew: boolean }) {
  return (
    <EditorShell
      title={isNew ? "رویداد جدید" : `ویرایش: ${initial.venue}`}
      backHref="/admin/events"
      backLabel="همه رویدادها"
      initial={initial}
      isNew={isNew}
      saveAction={saveEventAction}
      deleteAction={deleteEventAction}
    >
      {(d, set) => (
        <>
          <Card title="اطلاعات اصلی">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="میزبان (نام سازمان / شرکت) *">
                <input value={d.venue} onChange={(e) => set("venue", e.target.value)} className={inputCls} />
              </Field>
              <Field label="زمان">
                <input value={d.date} onChange={(e) => set("date", e.target.value)} placeholder="مثال: مرداد ۱۴۰۴" className={inputCls} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="عنوان صفحه *">
                  <input value={d.title} onChange={(e) => set("title", e.target.value)} className={inputCls} />
                </Field>
              </div>
              <Field label="محل">
                <input value={d.location} onChange={(e) => set("location", e.target.value)} className={inputCls} />
              </Field>
              <SlugField value={d.slug} onChange={(v) => set("slug", v)} isNew={isNew} Field={Field} inputCls={inputCls} />
            </div>
          </Card>

          <Card title="تصاویر">
            <div className="space-y-5">
              <ImageField label="تصویر کارت و صفحه" value={d.image ?? ""} onChange={(v) => set("image", v || undefined)} optional />
              <ImageField label="بنر عریض (بالای صفحه و کارت بزرگ)" value={d.heroImage ?? ""} onChange={(v) => set("heroImage", v || undefined)} optional />
              <ImageListField label="تصاویر رویداد" value={d.gallery} onChange={(v) => set("gallery", v)} />
            </div>
          </Card>

          <Card title="متن">
            <div className="space-y-5">
              <Field label="مقدمه">
                <textarea rows={4} value={d.intro} onChange={(e) => set("intro", e.target.value)} className={inputCls} />
              </Field>
              <StringListField label="نگاه کلی (فهرست نکات کوتاه)" value={d.highlights} onChange={(v) => set("highlights", v)} />
              <SectionsField label="بخش‌های توضیحی" value={d.sections} onChange={(v) => set("sections", v)} />
            </div>
          </Card>
        </>
      )}
    </EditorShell>
  );
}
