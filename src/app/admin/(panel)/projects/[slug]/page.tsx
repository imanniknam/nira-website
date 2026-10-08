import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getProjects } from "@/lib/db";
import { decodeSlug } from "@/lib/data";
import type { Project } from "@/lib/types";
import { ProjectEditor } from "./ProjectEditor";

const blank: Project = {
  slug: "",
  category: "perfume",
  title: "",
  desc: "",
  client: "",
  year: "",
  scope: [],
  intro: "",
  sections: [],
};

export default async function ProjectEdit({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const slug = decodeSlug((await params).slug);
  const isNew = slug === "new";
  const project = isNew ? blank : (await getProjects()).find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectEditor initial={project} isNew={isNew} />;
}
