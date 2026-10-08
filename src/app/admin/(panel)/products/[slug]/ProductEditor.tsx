"use client";

import type { Product } from "@/lib/types";
import { deleteProductAction, saveProductAction } from "../../../actions";
import { Card, Field, ImageField, ImageListField, StringListField, inputCls } from "../../../ui";
import { formatToman } from "@/lib/price";
import { EditorShell, SlugField } from "../../EditorShell";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const AR = "٠١٢٣٤٥٦٧٨٩";
/** Accepts Persian/Arabic digits and separators and returns whole tomans. */
const toAmount = (raw: string) =>
  Number(raw.replace(/[۰-۹]/g, (d) => String(FA.indexOf(d))).replace(/[٠-٩]/g, (d) => String(AR.indexOf(d))).replace(/\D/g, "")) || 0;

export function ProductEditor({ initial, isNew }: { initial: Product; isNew: boolean }) {
  return (
    <EditorShell
      title={isNew ? "محصول جدید" : `ویرایش: ${initial.name}`}
      backHref="/admin/products"
      backLabel="همه محصولات"
      initial={initial}
      isNew={isNew}
      saveAction={saveProductAction}
      deleteAction={deleteProductAction}
    >
      {(d, set) => (
        <>
          <Card title="اطلاعات اصلی">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="نام محصول *">
                <input value={d.name} onChange={(e) => set("name", e.target.value)} className={inputCls} />
              </Field>
              <Field label="برند">
                <input value={d.brand} onChange={(e) => set("brand", e.target.value)} className={inputCls} />
              </Field>
              <Field label="دسته‌بندی">
                <select value={d.category} onChange={(e) => set("category", e.target.value as Product["category"])} className={inputCls}>
                  <option value="women">زنانه</option>
                  <option value="men">مردانه</option>
                  <option value="unisex">یونیسکس</option>
                </select>
              </Field>
              <Field label="نوع بسته‌بندی">
                <select value={d.packaging} onChange={(e) => set("packaging", e.target.value as Product["packaging"])} className={inputCls}>
                  <option value="بازرگانی نیرا">پک بازرگانی نیرا</option>
                  <option value="اورجینال">پک اورجینال</option>
                </select>
              </Field>
              <Field label="نشان روی کارت">
                <select value={d.badge ?? ""} onChange={(e) => set("badge", (e.target.value || undefined) as Product["badge"])} className={inputCls}>
                  <option value="">بدون نشان</option>
                  <option value="پرفروش">پرفروش</option>
                  <option value="جدید">جدید</option>
                </select>
              </Field>
              <SlugField value={d.slug} onChange={(v) => set("slug", v)} isNew={isNew} Field={Field} inputCls={inputCls} />
            </div>
            <div className="flex flex-wrap gap-6 mt-5 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={d.published !== false} onChange={(e) => set("published", e.target.checked)} />
                نمایش در سایت
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={d.inStock} onChange={(e) => set("inStock", e.target.checked)} />
                موجود است
              </label>
            </div>
          </Card>

          <Card title="قیمت">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="قیمت (تومان)"
                hint={d.price > 0 ? `نمایش در سایت: ${formatToman(d.price)} — همین عدد مبنای پرداخت آنلاین است.` : "فقط عدد، بدون جداکننده. اگر ۰ باشد، بازه‌ی قیمت کلی سایت نمایش داده می‌شود."}
              >
                <input
                  dir="ltr"
                  inputMode="numeric"
                  value={d.price > 0 ? String(d.price) : ""}
                  placeholder="مثال: 5900000"
                  onChange={(e) => set("price", toAmount(e.target.value))}
                  className={`${inputCls} text-left`}
                />
              </Field>
              <Field label="متن قیمت اختصاصی (اختیاری)" hint="اگر پر شود، به‌جای عدد قیمت در سایت نمایش داده می‌شود (مثلاً «تماس بگیرید»). برای پرداخت آنلاین خالی بگذارید.">
                <input value={d.priceText ?? ""} onChange={(e) => set("priceText", e.target.value)} className={inputCls} />
              </Field>
            </div>
          </Card>

          <Card title="تصاویر">
            <div className="space-y-5">
              <ImageField label="تصویر اصلی *" value={d.image} onChange={(v) => set("image", v)} />
              <ImageListField label="تصاویر گالری" value={d.gallery} onChange={(v) => set("gallery", v)} />
            </div>
          </Card>

          <Card title="مشخصات">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="حجم نمایشی">
                <input value={d.volume} onChange={(e) => set("volume", e.target.value)} className={inputCls} />
              </Field>
              <Field label="غلظت">
                <input value={d.concentration} onChange={(e) => set("concentration", e.target.value)} className={inputCls} />
              </Field>
              <Field label="کشور سازنده">
                <input value={d.origin} onChange={(e) => set("origin", e.target.value)} className={inputCls} />
              </Field>
              <Field label="عطرساز">
                <input value={d.perfumer} onChange={(e) => set("perfumer", e.target.value)} className={inputCls} />
              </Field>
              <Field label="ماندگاری">
                <input value={d.longevity} onChange={(e) => set("longevity", e.target.value)} className={inputCls} />
              </Field>
              <Field label="فصل پیشنهادی">
                <input value={d.season} onChange={(e) => set("season", e.target.value)} className={inputCls} />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mt-5">
              <StringListField label="حجم‌های موجود (برای فیلتر)" value={d.sizes} onChange={(v) => set("sizes", v)} placeholder="مثال: ۵۰ میلی‌لیتر" />
              <StringListField label="کیفیت‌های غلظت (اختیاری)" value={d.qualities} onChange={(v) => set("qualities", v)} />
            </div>
          </Card>

          <Card title="هرم بویایی">
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="نت ابتدایی">
                <input value={d.notes.top} onChange={(e) => set("notes", { ...d.notes, top: e.target.value })} className={inputCls} />
              </Field>
              <Field label="نت میانی">
                <input value={d.notes.middle} onChange={(e) => set("notes", { ...d.notes, middle: e.target.value })} className={inputCls} />
              </Field>
              <Field label="نت پایانی">
                <input value={d.notes.base} onChange={(e) => set("notes", { ...d.notes, base: e.target.value })} className={inputCls} />
              </Field>
            </div>
          </Card>

          <Card title="توضیحات">
            <Field label="توضیح محصول">
              <textarea rows={5} value={d.description} onChange={(e) => set("description", e.target.value)} className={inputCls} />
            </Field>
          </Card>
        </>
      )}
    </EditorShell>
  );
}
