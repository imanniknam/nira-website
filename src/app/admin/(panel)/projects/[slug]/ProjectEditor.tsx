"use client";

import { projectCategoryLabels, type Project, type ProjectCategory } from "@/lib/types";
import { deleteProjectAction, saveProjectAction } from "../../../actions";
import { Card, Field, ImageField, SectionsField, StringListField, inputCls } from "../../../ui";
import { EditorShell, SlugField } from "../../EditorShell";

export function ProjectEditor({ initial, isNew }: { initial: Project; isNew: boolean }) {
  return (
    <EditorShell
      title={isNew ? "پروژه جدید" : `ویرایش: ${initial.title}`}
      backHref="/admin/projects"
      backLabel="همه پروژه‌ها"
      initial={initial}
      isNew={isNew}
      saveAction={saveProjectAction}
      deleteAction={deleteProjectAction}
    >
      {(d, set) => (
        <>
          <Card title="اطلاعات اصلی">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="عنوان پروژه *">
                <input value={d.title} onChange={(e) => set("title", e.target.value)} className={inputCls} />
              </Field>
              <Field label="توضیح کوتاه زیر عنوان">
                <input value={d.desc} onChange={(e) => set("desc", e.target.value)} className={inputCls} />
              </Field>
              <Field label="کارفرما">
                <input value={d.client} onChange={(e) => set("client", e.target.value)} className={inputCls} />
              </Field>
              <Field label="سال">
                <input value={d.year} onChange={(e) => set("year", e.target.value)} className={inputCls} />
              </Field>
              <Field label="دسته‌بندی">
                <select value={d.category} onChange={(e) => set("category", e.target.value as ProjectCategory)} className={inputCls}>
                  {(Object.keys(projectCategoryLabels) as ProjectCategory[]).map((k) => (
                    <option key={k} value={k}>
                      {projectCategoryLabels[k]}
                    </option>
                  ))}
                </select>
              </Field>
              <SlugField value={d.slug} onChange={(v) => set("slug", v)} isNew={isNew} Field={Field} inputCls={inputCls} />
            </div>
          </Card>

          <Card title="تصاویر">
            <div className="space-y-5">
              <ImageField label="تصویر پوستر / محصول" value={d.image ?? ""} onChange={(v) => set("image", v || undefined)} optional />
              <ImageField label="بنر عریض (بالای صفحه و کارت)" value={d.heroImage ?? ""} onChange={(v) => set("heroImage", v || undefined)} optional />
            </div>
          </Card>

          <Card title="متن">
            <div className="space-y-5">
              <Field label="مقدمه">
                <textarea rows={4} value={d.intro} onChange={(e) => set("intro", e.target.value)} className={inputCls} />
              </Field>
              <StringListField label="خدمات ارائه‌شده" value={d.scope} onChange={(v) => set("scope", v)} />
              <SectionsField label="بخش‌های توضیحی" value={d.sections} onChange={(v) => set("sections", v)} />
            </div>
          </Card>
        </>
      )}
    </EditorShell>
  );
}
