import "server-only";
import { cache } from "react";
import { getContentOverrides } from "../db";
import { CLIENT_PREFIXES, fieldMap } from "./registry";

export type T = (key: string) => string;

/** Resolved content for the current request: defaults overlaid with saved overrides. */
export const getContent = cache(async () => {
  const overrides = await getContentOverrides();
  const values: Record<string, string> = {};
  for (const [key, field] of Object.entries(fieldMap)) {
    const o = overrides[key];
    // A cleared image falls back to the default so the layout never breaks.
    values[key] = field.type === "image" && !o ? field.def : (o ?? field.def);
  }
  return values;
});

export async function getT(): Promise<T> {
  const values = await getContent();
  return (key) => {
    const v = values[key];
    if (v === undefined) {
      if (process.env.NODE_ENV !== "production") console.warn(`[content] unknown key "${key}"`);
      return "";
    }
    return v;
  };
}

/** The subset of content client components read through `useT()`. */
export async function getClientContent() {
  const values = await getContent();
  return Object.fromEntries(
    Object.entries(values).filter(([k]) => CLIENT_PREFIXES.some((p) => k.startsWith(p))),
  );
}
