import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { sections } from "@/lib/content/registry";
import { ContentEditor } from "./ContentEditor";

export default async function ContentPage({ params }: { params: Promise<{ section: string }> }) {
  await requireAdmin();
  const { section: id } = await params;
  const section = sections.find((s) => s.id === id);
  if (!section) notFound();
  const values = await getContent();
  return <ContentEditor section={section} initial={values} />;
}
