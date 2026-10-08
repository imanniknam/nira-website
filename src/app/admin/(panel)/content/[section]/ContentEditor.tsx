"use client";

import { useState } from "react";
import type { Section } from "@/lib/content/registry";
import { saveContentAction } from "../../../actions";
import { Card, Field, ImageField, SaveBar, btnGhost, inputCls, useToast } from "../../../ui";

export function ContentEditor({ section, initial }: { section: Section; initial: Record<string, string> }) {
  const keys = section.groups.flatMap((g) => g.fields.map((f) => f.key));
  const pick = (src: Record<string, string>) => Object.fromEntries(keys.map((k) => [k, src[k] ?? ""]));
  const [saved, setSaved] = useState(() => pick(initial));
  const [values, setValues] = useState(saved);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const dirty = keys.some((k) => values[k] !== saved[k]);
  const set = (key: string, v: string) => setValues((cur) => ({ ...cur, [key]: v }));

  async function save() {
    setSaving(true);
    try {
      const res = await saveContentAction(keys, values);
      if (res.ok) {
        setSaved(values);
        toast.show("ذخیره شد؛ تغییرات روی سایت اعمال شد.");
      } else toast.show(res.error, false);
    } catch {
      toast.show("ذخیره ناموفق بود. دوباره تلاش کنید.", false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl pb-6">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-accent">{section.title}</h1>
        {section.hint && <p className="text-sm text-muted mt-1">{section.hint}</p>}
      </header>

      <div className="space-y-5">
        {section.groups.map((g) => (
          <Card key={g.title} title={g.title}>
            <div className="grid sm:grid-cols-2 gap-4">
              {g.fields.map((f) => {
                const changed = values[f.key] !== f.def;
                const reset = changed && (
                  <button type="button" onClick={() => set(f.key, f.def)} className="text-[11px] text-rose hover:text-accent">
                    بازگشت به پیش‌فرض
                  </button>
                );
                if (f.type === "image") {
                  return (
                    <div key={f.key} className="sm:col-span-2">
                      <ImageField label={f.label} value={values[f.key]} onChange={(v) => set(f.key, v)} />
                      <div className="mt-1.5">{reset}</div>
                    </div>
                  );
                }
                const wide = f.type === "textarea";
                return (
                  <div key={f.key} className={wide ? "sm:col-span-2" : ""}>
                    <Field label={f.label}>
                      {f.type === "textarea" ? (
                        <textarea
                          rows={values[f.key].length > 160 ? 4 : 2}
                          value={values[f.key]}
                          onChange={(e) => set(f.key, e.target.value)}
                          className={inputCls}
                        />
                      ) : (
                        <input
                          value={values[f.key]}
                          dir={f.type === "url" ? "ltr" : undefined}
                          onChange={(e) => set(f.key, e.target.value)}
                          className={`${inputCls} ${f.type === "url" ? "text-left" : ""}`}
                        />
                      )}
                    </Field>
                    <div className="mt-1">{reset}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      <SaveBar
        dirty={dirty}
        saving={saving}
        onSave={save}
        extra={
          <button type="button" className={btnGhost} onClick={() => setValues(saved)} disabled={!dirty}>
            لغو تغییرات
          </button>
        }
      />
      {toast.node}
    </div>
  );
}
