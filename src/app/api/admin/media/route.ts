import { isAdmin } from "@/lib/auth";
import { listBundledImages, listUploads } from "@/lib/media";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return Response.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  const [uploads, bundled] = await Promise.all([listUploads(), listBundledImages()]);
  return Response.json({ uploads, bundled });
}
