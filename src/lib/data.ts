import "server-only";
import { getEvents, getProducts, getProjects } from "./db";

/** Products shown on the public site (published only). */
export async function getPublicProducts() {
  return (await getProducts()).filter((p) => p.published !== false);
}

export async function getPublicProduct(slug: string) {
  return (await getPublicProducts()).find((p) => p.slug === slug);
}

export async function getEvent(slug: string) {
  return (await getEvents()).find((e) => e.slug === slug);
}

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}

/** Next.js hands non-ASCII dynamic segments over still percent-encoded. */
export function decodeSlug(raw: string) {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}
