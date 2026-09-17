import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";
import { CtaBand } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { categoryLabels, getProject, getRelatedProjects, projects } from "@/lib/projects";
import { events } from "@/lib/events";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "پروژه یافت نشد | نیرا" };
  return { title: `${project.title} | آرشیو نیرا`, description: project.intro };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug);
  const event = events.find((e) => e.relatedProject === project.slug);
  const meta = [
    { icon: "building" as const, label: "کارفرما", value: project.client },
    { icon: "calendar" as const, label: "سال", value: project.year },
    { icon: "grid" as const, label: "دسته‌بندی", value: categoryLabels[project.category] },
  ];

  return (
    <div>
      <PageHero
        eyebrow="Project"
        title={project.title}
        description={project.desc}
        image={project.heroImage ?? "/img/brand/petals-rose.png"}
        cta={{ href: "/custom-order", label: "پروژه مشابه برای برند شما" }}
      />

      <div className="bg-surface border-b border-line">
        <nav className="max-w-6xl mx-auto px-4 sm:px-8 py-3 text-xs text-muted flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-accent transition-colors">
            خانه
          </Link>
          <span className="text-line">›</span>
          <Link href="/archive" className="hover:text-accent transition-colors">
            آرشیو
          </Link>
          <span className="text-line">›</span>
          <span className="text-accent">{project.title}</span>
        </nav>
      </div>

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-16 grid md:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
          <FadeUp className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-blush border border-line">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-contain p-4"
              priority
            />
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-muted leading-8 text-sm sm:text-base">{project.intro}</p>

            <dl className="mt-8 rounded-2xl bg-surface border border-line divide-y divide-line">
              {meta.map((m) => (
                <div key={m.label} className="flex items-center gap-3 px-5 py-3.5">
                  <Icon name={m.icon} className="w-4 h-4 text-rose shrink-0" />
                  <dt className="text-xs text-muted w-20">{m.label}</dt>
                  <dd className="text-sm text-accent flex-1">{m.value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="text-sm font-medium text-accent mt-8">خدمات ارائه‌شده</h2>
            <ul className="flex flex-wrap gap-2 mt-3">
              {project.scope.map((s) => (
                <li
                  key={s}
                  className="inline-flex items-center gap-2 rounded-full bg-blush text-accent px-3.5 py-2 text-xs"
                >
                  <Icon name="check" className="w-3.5 h-3.5 text-rose" />
                  {s}
                </li>
              ))}
            </ul>

            {event && (
              <Link
                href={`/gallery/${event.slug}`}
                className="inline-flex items-center gap-2 mt-7 text-sm text-rose hover:text-accent transition-colors"
              >
                مشاهده‌ی تصاویر این پروژه در گالری
                <Icon name="arrow" className="w-4 h-4" />
              </Link>
            )}
          </FadeUp>
        </div>
      </section>

      <section className="bg-blush">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-14 sm:py-16 space-y-10">
          {project.sections.map((s) => (
            <FadeUp key={s.title}>
              <h2 className="text-xl sm:text-2xl font-bold text-accent">{s.title}</h2>
              <p className="text-muted leading-8 text-sm sm:text-base mt-3">{s.body}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-background pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <FadeUp className="flex items-end justify-between gap-4 mb-8">
              <div>
                <span className="eyebrow-latin block">More Work</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-accent mt-3">
                  پروژه‌های دیگر
                </h2>
              </div>
              <Link
                href="/archive"
                className="hidden sm:inline-flex items-center gap-2 text-sm text-rose hover:text-accent transition-colors"
              >
                همه پروژه‌ها
                <Icon name="arrow" className="w-4 h-4" />
              </Link>
            </FadeUp>

            <Stagger className="grid sm:grid-cols-2 gap-5">
              {related.map((p) => (
                <StaggerItem key={p.slug}>
                  <Link
                    href={`/archive/${p.slug}`}
                    className="group h-full rounded-2xl bg-surface border border-line overflow-hidden flex transition-all duration-300 hover:border-rose-soft hover:shadow-[0_22px_45px_-30px_rgba(122,34,88,0.55)]"
                  >
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <b className="block text-accent leading-7">{p.title}</b>
                        <span className="block text-xs text-muted mt-2">{p.desc}</span>
                      </div>
                      <span className="flex items-center gap-2 mt-6 text-xs text-rose">
                        مشاهده پروژه
                        <Icon
                          name="arrow"
                          className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                        />
                      </span>
                    </div>
                    <div className="relative w-[42%] shrink-0 bg-blush">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 45vw, 22vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow="پروژه بعدی، برند شماست"
        title="بیایید رایحه‌ی برند شما را بسازیم"
        href="/custom-order"
        label="شروع همکاری"
        image="/img/products/nira-esentric-molecules-o2.jpg"
      />
    </div>
  );
}
