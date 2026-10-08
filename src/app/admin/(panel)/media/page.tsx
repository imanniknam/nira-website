import { requireAdmin } from "@/lib/auth";
import { listUploads } from "@/lib/media";
import { MediaManager } from "./MediaManager";

export default async function MediaPage() {
  await requireAdmin();
  return (
    <div className="max-w-5xl pb-16">
      <header className="mb-5">
        <h1 className="text-xl font-bold text-accent">کتابخانه تصاویر</h1>
        <p className="text-sm text-muted mt-1">
          تصاویر آپلودشده را اینجا مدیریت کنید. برای استفاده، در هر فیلد تصویر روی «انتخاب / آپلود» بزنید.
        </p>
      </header>
      <MediaManager items={await listUploads()} />
    </div>
  );
}
