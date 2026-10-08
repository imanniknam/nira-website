/**
 * Browser-side helpers for the admin panel's image handling.
 *
 * Phone and camera photos are 3-12 MB; sent as-is over a slow link they take
 * minutes, and the site never needs more than ~2000 px. So images are scaled
 * down and re-encoded in the browser before upload, and previews use small
 * optimised thumbnails instead of the full-size originals.
 */

const MAX_SIDE = 2000;
const SKIP_BELOW_BYTES = 350 * 1024;

/** A small, cached rendition for previews (falls back to the original for SVG, GIF and remote URLs). */
export function thumb(url: string, width: 128 | 256 | 384 = 256) {
  if (!url.startsWith("/") || url.startsWith("//") || !/\.(jpe?g|png|webp|avif)$/i.test(url.split("?")[0])) return url;
  return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=75`;
}

async function decode(file: File): Promise<{ source: CanvasImageSource; width: number; height: number; close: () => void } | null> {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
    return { source: bmp, width: bmp.width, height: bmp.height, close: () => bmp.close() };
  } catch {
    // Older browsers: fall back to an <img> element.
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => resolve({ source: img, width: img.naturalWidth, height: img.naturalHeight, close: () => URL.revokeObjectURL(url) });
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    });
  }
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
}

/** Scales a big photo down and re-encodes it as WebP. Returns the original when that would not help. */
export async function prepareImage(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file; // GIF/AVIF/SVG stay untouched
  const img = await decode(file);
  if (!img) return file;
  try {
    const longest = Math.max(img.width, img.height);
    if (file.size < SKIP_BELOW_BYTES && longest <= MAX_SIDE) return file;
    const k = Math.min(1, MAX_SIDE / longest);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.width * k));
    canvas.height = Math.max(1, Math.round(img.height * k));
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img.source, 0, 0, canvas.width, canvas.height);
    const blob = await toBlob(canvas, "image/webp", 0.86);
    if (!blob || blob.type !== "image/webp" || blob.size >= file.size) return file;
    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    return new File([blob], `${base}.webp`, { type: "image/webp" });
  } finally {
    img.close();
  }
}

export type UploadResult = { urls: string[]; errors: string[] };

function post(file: File, onProgress: (fraction: number) => void) {
  return new Promise<{ ok: boolean; urls?: string[]; error?: string }>((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/admin/upload");
    xhr.timeout = 5 * 60 * 1000;
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(e.loaded / e.total);
    xhr.onload = () => {
      let json: { urls?: string[]; error?: string } = {};
      try {
        json = JSON.parse(xhr.responseText);
      } catch {
        /* non-JSON error page */
      }
      resolve(xhr.status >= 200 && xhr.status < 300 ? { ok: true, urls: json.urls } : { ok: false, error: json.error ?? `خطای سرور (${xhr.status})` });
    };
    xhr.onerror = () => resolve({ ok: false, error: "اتصال برقرار نشد." });
    xhr.ontimeout = () => resolve({ ok: false, error: "زمان آپلود به پایان رسید." });
    const body = new FormData();
    body.append("file", file);
    xhr.send(body);
  });
}

/**
 * Prepares and uploads files one by one, reporting a human-readable status.
 * A dropped connection is retried once.
 */
export async function uploadImages(files: File[], onStatus: (text: string) => void): Promise<UploadResult> {
  const out: UploadResult = { urls: [], errors: [] };
  const faNum = (n: number) => n.toLocaleString("fa-IR");
  for (let i = 0; i < files.length; i++) {
    const tag = files.length > 1 ? ` (${faNum(i + 1)} از ${faNum(files.length)})` : "";
    onStatus(`در حال آماده‌سازی تصویر${tag}…`);
    const file = await prepareImage(files[i]);
    let res = await post(file, (f) => onStatus(`در حال آپلود${tag}: ${faNum(Math.round(f * 100))}٪`));
    if (!res.ok && res.error === "اتصال برقرار نشد.") {
      onStatus(`اتصال قطع شد؛ تلاش دوباره${tag}…`);
      res = await post(file, (f) => onStatus(`در حال آپلود${tag}: ${faNum(Math.round(f * 100))}٪`));
    }
    if (res.ok && res.urls) out.urls.push(...res.urls);
    else out.errors.push(`${files[i].name}: ${res.error}`);
  }
  return out;
}
