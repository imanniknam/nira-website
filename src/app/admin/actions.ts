"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  adminUsername,
  checkCredentials,
  endSession,
  requireAdmin,
  setPassword,
  startSession,
} from "@/lib/auth";
import {
  deleteSubmission,
  eventOps,
  productOps,
  projectOps,
  setContentOverrides,
  setSubmissionStatus,
} from "@/lib/db";
import { deleteUpload } from "@/lib/media";
import { allow, clientIp, reset } from "@/lib/rate-limit";
import { cleanEvent, cleanProduct, cleanProject, safeUrl } from "@/lib/clean";
import { fieldMap } from "@/lib/content/registry";
import type { Submission } from "@/lib/types";

export type ActionResult = { ok: true; slug?: string } | { ok: false; error: string };

const fail = (error: string): ActionResult => ({ ok: false, error });

/** Public pages are rendered per request, but the client router cache should drop too. */
const refresh = () => revalidatePath("/", "layout");

/* --------------------------------- auth --------------------------------- */

export async function loginAction(
  _prev: { error?: string; username?: string } | undefined,
  form: FormData,
) {
  const key = `login:${await clientIp()}`;
  if (!allow(key, 8, 15 * 60 * 1000)) {
    return { error: "تلاش‌های ناموفق زیاد بود. ۱۵ دقیقه دیگر دوباره امتحان کنید." };
  }
  const username = String(form.get("username") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!(await checkCredentials(username, password))) {
    return { error: "نام کاربری یا رمز عبور اشتباه است.", username };
  }
  reset(key);
  await startSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

export async function changePasswordAction(current: string, next: string): Promise<ActionResult> {
  await requireAdmin();
  if (next.length < 8) return fail("رمز جدید باید حداقل ۸ نویسه باشد.");
  if (!allow(`pw:${await clientIp()}`, 5, 15 * 60 * 1000)) return fail("تلاش‌های زیاد؛ کمی بعد دوباره امتحان کنید.");
  if (!(await checkCredentials(await adminUsername(), current))) return fail("رمز فعلی اشتباه است.");
  await setPassword(next);
  // The session fingerprint is tied to the password hash, so sign in again.
  await startSession();
  return { ok: true };
}

/* ------------------------------- site content ------------------------------ */

export async function saveContentAction(sectionKeys: string[], values: Record<string, string>): Promise<ActionResult> {
  await requireAdmin();
  const patch: Record<string, string | null> = {};
  for (const key of sectionKeys) {
    const field = fieldMap[key];
    if (!field) continue;
    let value = String(values[key] ?? "").replace(/\r\n/g, "\n");
    if (field.type === "image" || field.type === "url") value = safeUrl(value) || (field.type === "url" ? "" : field.def);
    else value = value.slice(0, 5000);
    patch[key] = value === field.def ? null : value;
  }
  await setContentOverrides(patch);
  refresh();
  return { ok: true };
}

/* ------------------------------- collections ------------------------------- */

type Cleaner<T> = (raw: unknown) => T | string;

function crud<T extends { slug: string }>(
  clean: Cleaner<T>,
  ops: {
    save: (item: T, original?: string) => Promise<unknown>;
    remove: (slug: string) => Promise<unknown>;
    move: (slug: string, dir: -1 | 1) => Promise<unknown>;
  },
) {
  return {
    async save(raw: unknown, original?: string): Promise<ActionResult> {
      await requireAdmin();
      const item = clean(raw);
      if (typeof item === "string") return fail(item);
      try {
        await ops.save(item, original || undefined);
      } catch (e) {
        return fail(e instanceof Error ? e.message : "ذخیره ناموفق بود.");
      }
      refresh();
      return { ok: true, slug: item.slug };
    },
    async remove(slug: string): Promise<ActionResult> {
      await requireAdmin();
      await ops.remove(slug);
      refresh();
      return { ok: true };
    },
    async move(slug: string, dir: -1 | 1): Promise<ActionResult> {
      await requireAdmin();
      await ops.move(slug, dir);
      refresh();
      return { ok: true };
    },
  };
}

const products = crud(cleanProduct, productOps);
const events = crud(cleanEvent, eventOps);
const projects = crud(cleanProject, projectOps);

export async function saveProductAction(raw: unknown, original?: string) {
  return products.save(raw, original);
}
export async function deleteProductAction(slug: string) {
  return products.remove(slug);
}
export async function moveProductAction(slug: string, dir: -1 | 1) {
  return products.move(slug, dir);
}
export async function saveEventAction(raw: unknown, original?: string) {
  return events.save(raw, original);
}
export async function deleteEventAction(slug: string) {
  return events.remove(slug);
}
export async function moveEventAction(slug: string, dir: -1 | 1) {
  return events.move(slug, dir);
}
export async function saveProjectAction(raw: unknown, original?: string) {
  return projects.save(raw, original);
}
export async function deleteProjectAction(slug: string) {
  return projects.remove(slug);
}
export async function moveProjectAction(slug: string, dir: -1 | 1) {
  return projects.move(slug, dir);
}

/* --------------------------------- media ---------------------------------- */

export async function deleteUploadAction(url: string): Promise<ActionResult> {
  await requireAdmin();
  await deleteUpload(url);
  return { ok: true };
}

/* ------------------------------- submissions ------------------------------- */

export async function setSubmissionStatusAction(id: string, status: Submission["status"]): Promise<ActionResult> {
  await requireAdmin();
  if (!["new", "read", "done"].includes(status)) return fail("وضعیت نامعتبر");
  await setSubmissionStatus(id, status);
  revalidatePath("/admin", "layout");
  return { ok: true };
}

export async function deleteSubmissionAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  await deleteSubmission(id);
  revalidatePath("/admin", "layout");
  return { ok: true };
}
