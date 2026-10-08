import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { connection } from "next/server";
import type { GalleryEvent, Product, Project, Submission } from "./types";
import { seedProducts } from "./seed/products";
import { seedEvents } from "./seed/events";
import { seedProjects } from "./seed/projects";

/**
 * Tiny file-backed store. Everything the CMS manages lives as JSON files (plus
 * uploaded images) under DATA_DIR, which is a mounted volume in production.
 * Writes are serialised and atomic (temp file + rename), so a crash mid-save
 * can never leave a half-written file behind.
 */
export const DATA_DIR = path.resolve(/*turbopackIgnore: true*/ process.env.DATA_DIR ?? path.join(process.cwd(), "data"));
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

const file = (name: string) => path.join(DATA_DIR, `${name}.json`);

async function readJson<T>(name: string, fallback: () => T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file(name), "utf8")) as T;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return fallback();
    throw err;
  }
}

let queue: Promise<unknown> = Promise.resolve();

/** Run `fn` after every earlier write has finished, whatever its outcome. */
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

async function writeJson(name: string, data: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const target = file(name);
  const tmp = `${target}.${randomBytes(4).toString("hex")}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, target);
}

/** Read-modify-write under the write lock, so concurrent admin saves cannot clobber each other. */
async function update<T>(name: string, fallback: () => T, mutate: (current: T) => T | void) {
  return serial(async () => {
    const current = await readJson<T>(name, fallback);
    const next = mutate(current) ?? current;
    await writeJson(name, next);
    return next;
  });
}

const clone = <T,>(v: T): T => structuredClone(v);

/* ----------------------------- site content ----------------------------- */

export type ContentOverrides = Record<string, string>;

export async function getContentOverrides(): Promise<ContentOverrides> {
  await connection();
  return readJson<ContentOverrides>("content", () => ({}));
}

export async function setContentOverrides(patch: Record<string, string | null>) {
  return update<ContentOverrides>("content", () => ({}), (cur) => {
    for (const [key, value] of Object.entries(patch)) {
      if (value === null) delete cur[key];
      else cur[key] = value;
    }
  });
}

/* ------------------------------ collections ------------------------------ */

export async function getProducts(): Promise<Product[]> {
  await connection();
  return readJson("products", () => clone(seedProducts));
}

export async function getEvents(): Promise<GalleryEvent[]> {
  await connection();
  return readJson("events", () => clone(seedEvents));
}

export async function getProjects(): Promise<Project[]> {
  await connection();
  return readJson("projects", () => clone(seedProjects));
}

type Keyed = { slug: string };

function collectionOps<T extends Keyed>(name: string, seed: () => T[]) {
  return {
    async save(item: T, originalSlug?: string) {
      return update<T[]>(name, () => clone(seed()), (list) => {
        const clash = list.some((x) => x.slug === item.slug && x.slug !== originalSlug);
        if (clash) throw new Error("این نشانی (slug) قبلاً استفاده شده است.");
        const idx = originalSlug ? list.findIndex((x) => x.slug === originalSlug) : -1;
        if (idx >= 0) list[idx] = item;
        else list.unshift(item);
      });
    },
    async remove(slug: string) {
      return update<T[]>(name, () => clone(seed()), (list) => list.filter((x) => x.slug !== slug));
    },
    async move(slug: string, dir: -1 | 1) {
      return update<T[]>(name, () => clone(seed()), (list) => {
        const i = list.findIndex((x) => x.slug === slug);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= list.length) return;
        [list[i], list[j]] = [list[j], list[i]];
      });
    },
  };
}

export const productOps = collectionOps<Product>("products", () => seedProducts);
export const eventOps = collectionOps<GalleryEvent>("events", () => seedEvents);
export const projectOps = collectionOps<Project>("projects", () => seedProjects);

/* ------------------------------ submissions ------------------------------ */

export async function getSubmissions(): Promise<Submission[]> {
  await connection();
  return readJson("submissions", () => []);
}

export async function addSubmission(s: Omit<Submission, "id" | "createdAt" | "status">) {
  const entry: Submission = {
    ...s,
    id: randomBytes(6).toString("hex"),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  await update<Submission[]>("submissions", () => [], (list) => {
    list.unshift(entry);
    // Keep the file bounded; years of enquiries are far below this.
    if (list.length > 5000) list.length = 5000;
  });
  return entry;
}

export async function setSubmissionStatus(id: string, status: Submission["status"]) {
  await update<Submission[]>("submissions", () => [], (list) => {
    const s = list.find((x) => x.id === id);
    if (s) s.status = status;
  });
}

export async function deleteSubmission(id: string) {
  await update<Submission[]>("submissions", () => [], (list) => list.filter((x) => x.id !== id));
}

/* ------------------------------ admin account ----------------------------- */

export type AdminRecord = { username: string; salt: string; hash: string };

export async function getAdminRecord(): Promise<AdminRecord | null> {
  return readJson<AdminRecord | null>("admin", () => null);
}

export async function saveAdminRecord(rec: AdminRecord) {
  await serial(() => writeJson("admin", rec));
}

/** Random secret used to sign admin sessions; generated once and persisted. */
export async function getSessionSecret(): Promise<string> {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  const secretFile = path.join(DATA_DIR, "session.key");
  try {
    return (await fs.readFile(secretFile, "utf8")).trim();
  } catch {
    return serial(async () => {
      try {
        return (await fs.readFile(secretFile, "utf8")).trim();
      } catch {
        const secret = randomBytes(32).toString("hex");
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(secretFile, secret, { mode: 0o600 });
        return secret;
      }
    });
  }
}

/* -------------------------------- backup --------------------------------- */

export async function exportAll() {
  const [content, products, events, projects, submissions] = await Promise.all([
    getContentOverrides(),
    getProducts(),
    getEvents(),
    getProjects(),
    getSubmissions(),
  ]);
  return { exportedAt: new Date().toISOString(), content, products, events, projects, submissions };
}
