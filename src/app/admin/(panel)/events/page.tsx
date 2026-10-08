import { requireAdmin } from "@/lib/auth";
import { getEvents } from "@/lib/db";
import { deleteEventAction, moveEventAction } from "../../actions";
import { CollectionList } from "../CollectionList";

export default async function EventsAdmin() {
  await requireAdmin();
  const events = await getEvents();
  return (
    <div className="max-w-4xl pb-16">
      <header className="mb-5">
        <h1 className="text-xl font-bold text-accent">رویدادهای گالری</h1>
        <p className="text-sm text-muted mt-1">نمایشگاه‌هایی که در صفحه «گالری» نمایش داده می‌شوند. ترتیب فهرست = ترتیب نمایش.</p>
      </header>
      <CollectionList
        basePath="/admin/events"
        noun="رویداد"
        moveAction={moveEventAction}
        deleteAction={deleteEventAction}
        rows={events.map((e) => ({
          slug: e.slug,
          title: e.venue,
          subtitle: `${e.date} · ${e.location}`,
          image: e.image ?? e.heroImage,
        }))}
      />
    </div>
  );
}
