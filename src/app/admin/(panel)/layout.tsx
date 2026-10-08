import { requireAdmin } from "@/lib/auth";
import { getSubmissions } from "@/lib/db";
import { AdminNav } from "./AdminNav";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const unread = (await getSubmissions()).filter((s) => s.status === "new").length;

  return (
    <div className="lg:flex min-h-screen">
      <AdminNav unread={unread} />
      <div className="flex-1 min-w-0 px-4 sm:px-8 pt-6">{children}</div>
    </div>
  );
}
