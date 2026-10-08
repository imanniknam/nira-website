import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { UPLOAD_DIR } from "./db";

export const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};
export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;

export const MIME_BY_EXT: Record<string, string> = Object.fromEntries(
  Object.entries(ALLOWED_TYPES).map(([mime, ext]) => [ext, mime]),
);

export type MediaItem = { url: string; name: string; size: number; uploaded: boolean };

function safeBase(name: string) {
  const base = name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  return (base || "image").slice(0, 40).toLowerCase();
}

/** Magic-byte check, so a renamed non-image can't be stored as one. */
function sniff(buf: Buffer): string | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8) return "image/jpeg";
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP") return "image/webp";
  if (buf.subarray(0, 3).toString() === "GIF") return "image/gif";
  if (buf.subarray(4, 8).toString() === "ftyp" && /avif|avis/.test(buf.subarray(8, 16).toString())) return "image/avif";
  return null;
}

export async function saveUpload(file: File): Promise<{ url: string } | { error: string }> {
  if (file.size > MAX_UPLOAD_BYTES) return { error: "حجم تصویر نباید بیش از ۱۲ مگابایت باشد." };
  const buf = Buffer.from(await file.arrayBuffer());
  const mime = sniff(buf);
  if (!mime) return { error: "فقط تصاویر JPG، PNG، WebP، GIF و AVIF پذیرفته می‌شود." };
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const name = `${safeBase(file.name)}-${randomBytes(4).toString("hex")}${ALLOWED_TYPES[mime]}`;
  await fs.writeFile(path.join(UPLOAD_DIR, name), buf);
  return { url: `/uploads/${name}` };
}

export async function listUploads(): Promise<MediaItem[]> {
  let names: string[] = [];
  try {
    names = await fs.readdir(UPLOAD_DIR);
  } catch {
    return [];
  }
  const items = await Promise.all(
    names
      .filter((n) => MIME_BY_EXT[path.extname(n).toLowerCase()])
      .map(async (n) => {
        const st = await fs.stat(path.join(UPLOAD_DIR, n));
        return { url: `/uploads/${n}`, name: n, size: st.size, mtime: st.mtimeMs, uploaded: true };
      }),
  );
  return items
    .sort((a, b) => b.mtime - a.mtime)
    .map((it) => ({ url: it.url, name: it.name, size: it.size, uploaded: true }));
}

export async function deleteUpload(url: string) {
  const name = path.basename(url);
  if (!url.startsWith("/uploads/") || name !== url.slice("/uploads/".length)) return;
  await fs.rm(path.join(UPLOAD_DIR, name), { force: true });
}

/** Images that ship with the site (public/img), so existing artwork can be re-used. */
export async function listBundledImages(): Promise<MediaItem[]> {
  const publicDir = path.join(/*turbopackIgnore: true*/ process.cwd(), "public");
  const root = path.join(publicDir, "img");
  const out: MediaItem[] = [];
  async function walk(dir: string) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) await walk(full);
      else if (MIME_BY_EXT[path.extname(e.name).toLowerCase()]) {
        const st = await fs.stat(full);
        out.push({
          url: "/" + path.relative(publicDir, full).split(path.sep).join("/"),
          name: path.relative(root, full).split(path.sep).join("/"),
          size: st.size,
          uploaded: false,
        });
      }
    }
  }
  await walk(root);
  return out.sort((a, b) => a.name.localeCompare(b.name));
}
