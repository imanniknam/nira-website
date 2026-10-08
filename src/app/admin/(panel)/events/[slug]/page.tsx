import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getEvents } from "@/lib/db";
import { decodeSlug } from "@/lib/data";
import type { GalleryEvent } from "@/lib/types";
import { EventEditor } from "./EventEditor";

const blank: GalleryEvent = {
  slug: "",
  venue: "",
  title: "",
  location: "ایران",
  date: "",
  gallery: [],
  intro: "",
  highlights: [],
  sections: [],
};

export default async function EventEdit({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const slug = decodeSlug((await params).slug);
  const isNew = slug === "new";
  const event = isNew ? blank : (await getEvents()).find((e) => e.slug === slug);
  if (!event) notFound();
  return <EventEditor initial={event} isNew={isNew} />;
}
