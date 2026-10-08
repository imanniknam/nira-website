import { isAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/media";

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return Response.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  if (!sameOrigin(req)) return Response.json({ error: "درخواست نامعتبر" }, { status: 403 });
  const form = await req.formData();
  const files = form.getAll("file").filter((v): v is File => v instanceof File && v.size > 0);
  if (files.length === 0) return Response.json({ error: "فایلی انتخاب نشده است." }, { status: 400 });
  const urls: string[] = [];
  for (const file of files) {
    const res = await saveUpload(file);
    if ("error" in res) return Response.json({ error: `${file.name}: ${res.error}` }, { status: 400 });
    urls.push(res.url);
  }
  return Response.json({ urls });
}
