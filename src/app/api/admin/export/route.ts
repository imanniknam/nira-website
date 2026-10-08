import { isAdmin } from "@/lib/auth";
import { exportAll } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(JSON.stringify(await exportAll(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="nira-backup-${stamp}.json"`,
      "Cache-Control": "no-store",
    },
  });
}
