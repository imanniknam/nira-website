import { requireAdmin } from "@/lib/auth";
import { getProjects } from "@/lib/db";
import { projectCategoryLabels } from "@/lib/types";
import { deleteProjectAction, moveProjectAction } from "../../actions";
import { CollectionList } from "../CollectionList";

export default async function ProjectsAdmin() {
  await requireAdmin();
  const projects = await getProjects();
  return (
    <div className="max-w-4xl pb-16">
      <header className="mb-5">
        <h1 className="text-xl font-bold text-accent">پروژه‌های آرشیو</h1>
        <p className="text-sm text-muted mt-1">نمونه‌کارهای صفحه «آرشیو». ترتیب فهرست = ترتیب نمایش.</p>
      </header>
      <CollectionList
        basePath="/admin/projects"
        noun="پروژه"
        moveAction={moveProjectAction}
        deleteAction={deleteProjectAction}
        rows={projects.map((p) => ({
          slug: p.slug,
          title: p.title,
          subtitle: `${p.desc} · ${p.year}`,
          image: p.image ?? p.heroImage,
          tags: [projectCategoryLabels[p.category]],
        }))}
      />
    </div>
  );
}
