"use server";

import { addSubmission, getProducts } from "@/lib/db";
import { formatToman } from "@/lib/price";
import { allow, clientIp } from "@/lib/rate-limit";
import type { Submission } from "@/lib/types";

export type FormResult = { ok: true } | { ok: false; error: string };

const FA = "۰۱۲۳۴۵۶۷۸۹";
const AR = "٠١٢٣٤٥٦٧٨٩";
const latinDigits = (s: string) =>
  s.replace(/[۰-۹]/g, (d) => String(FA.indexOf(d))).replace(/[٠-٩]/g, (d) => String(AR.indexOf(d)));

function text(form: FormData, key: string, max: number) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function validPhone(raw: string) {
  const digits = latinDigits(raw).replace(/[\s\-()+]/g, "");
  return /^(0|98|0098)?9\d{9}$/.test(digits) || /^0\d{10}$/.test(digits);
}

const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

async function guard(form: FormData): Promise<FormResult | null> {
  // Hidden field real visitors never fill: pretend success so bots move on.
  if (text(form, "website", 200)) return { ok: true };
  if (!allow(`form:${await clientIp()}`, 6, 10 * 60 * 1000)) {
    return { ok: false, error: "تعداد درخواست‌ها زیاد است. چند دقیقه دیگر دوباره تلاش کنید." };
  }
  return null;
}

type Entry = Omit<Submission, "id" | "createdAt" | "status">;

async function store(entry: Entry): Promise<FormResult> {
  try {
    await addSubmission(entry);
    return { ok: true };
  } catch {
    return { ok: false, error: "ثبت درخواست با خطا مواجه شد. لطفاً دوباره تلاش کنید یا تماس بگیرید." };
  }
}

export async function submitContact(form: FormData): Promise<FormResult> {
  const blocked = await guard(form);
  if (blocked) return blocked;
  const name = text(form, "name", 120);
  const email = text(form, "email", 160);
  const message = text(form, "message", 4000);
  if (!name) return { ok: false, error: "نام خود را وارد کنید." };
  if (!validEmail(email)) return { ok: false, error: "ایمیل واردشده معتبر نیست." };
  if (message.length < 3) return { ok: false, error: "متن پیام را وارد کنید." };
  return store({
    kind: "contact",
    name,
    email,
    fields: [
      { label: "نام", value: name },
      { label: "ایمیل", value: email },
      { label: "پیام", value: message },
    ],
  });
}

export async function submitOrder(form: FormData): Promise<FormResult> {
  const blocked = await guard(form);
  if (blocked) return blocked;
  const company = text(form, "company", 160);
  const name = text(form, "name", 120);
  const phone = text(form, "phone", 30);
  const email = text(form, "email", 160);
  const service = text(form, "service", 120);
  const volume = text(form, "volume", 120);
  const details = text(form, "details", 4000);
  if (!company || !name) return { ok: false, error: "نام شرکت و نام خود را وارد کنید." };
  if (!validPhone(phone)) return { ok: false, error: "شماره تماس معتبر نیست (مثال: ۰۹۱۲۱۲۳۴۵۶۷)." };
  if (!validEmail(email)) return { ok: false, error: "ایمیل واردشده معتبر نیست." };
  if (details.length < 3) return { ok: false, error: "توضیح پروژه را وارد کنید." };
  return store({
    kind: "order",
    name: `${name} — ${company}`,
    phone,
    email,
    fields: [
      { label: "شرکت / برند", value: company },
      { label: "نام و سمت", value: name },
      { label: "شماره تماس", value: phone },
      { label: "ایمیل", value: email },
      { label: "نوع خدمت", value: service },
      { label: "تیراژ", value: volume },
      { label: "توضیح پروژه", value: details },
    ],
  });
}

export async function submitCartRequest(form: FormData): Promise<FormResult> {
  const blocked = await guard(form);
  if (blocked) return blocked;
  const name = text(form, "name", 120);
  const phone = text(form, "phone", 30);
  const note = text(form, "note", 1000);
  let items: { slug?: unknown; name?: unknown; qty?: unknown }[] = [];
  try {
    const parsed = JSON.parse(text(form, "items", 20000) || "[]");
    if (Array.isArray(parsed)) items = parsed.slice(0, 100);
  } catch {
    /* fall through to the empty check */
  }
  // Prices come from the catalogue, never from the browser.
  const catalogue = new Map((await getProducts()).map((p) => [p.slug, p]));
  let total = 0;
  let allPriced = true;
  const lines = items
    .map((i) => {
      const qty = Math.max(1, Math.min(999, Number(i.qty) || 1));
      const product = catalogue.get(String(i.slug ?? ""));
      const name = product?.name ?? String(i.name ?? "").slice(0, 160);
      if (!name) return "";
      if (product && product.price > 0) {
        total += product.price * qty;
        return `${name} × ${qty} — ${formatToman(product.price * qty)}`;
      }
      allPriced = false;
      return `${name} × ${qty}`;
    })
    .filter(Boolean);
  if (lines.length === 0) return { ok: false, error: "لیست درخواست شما خالی است." };
  if (!name) return { ok: false, error: "نام خود را وارد کنید." };
  if (!validPhone(phone)) return { ok: false, error: "شماره تماس معتبر نیست (مثال: ۰۹۱۲۱۲۳۴۵۶۷)." };
  return store({
    kind: "cart",
    name,
    phone,
    fields: [
      { label: "نام", value: name },
      { label: "شماره تماس", value: phone },
      { label: "اقلام", value: lines.join("\n") },
      ...(allPriced && total > 0 ? [{ label: "جمع کل", value: formatToman(total) }] : []),
      ...(note ? [{ label: "توضیحات", value: note }] : []),
    ],
  });
}
