import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { FadeUp, Stagger, StaggerItem } from "@/components/MotionSection";
import { CtaBand } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import {
  eventCategoryLabels,
  events,
  getEvent,
  getRelatedEvents,
} from "@/lib/events";
import { getProject } from "@/lib/projects";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "رویداد یافت نشد | نیرا" };
  return { title: `${event.title} | گالری نیرا`, description: event.intro };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const related = getRelatedEvents(event.slug);
  const project = event.relatedProject ? getProject(event.relatedProject) : undefined;
  const meta = [
    { icon: "pin" as const, label: "محل", value: event.location },
    { icon: "calendar" as const, label: "زمان", value: event.date },
    {
      icon: "grid" as const,
      label: "دسته‌بندی",
      value: eventCategoryLabels[event.category],
    },
  ];

  return (
    <div>
      <PageHero
        eyebrow="Gallery"
        title={event.title}
        description={event.meta}
        image={event.heroImage ?? "/img/brand/marble-rose.png"}
        cta={{ href: "/contact", label: "تماس با ما" }}
      />

      <div className="bg-surface border-b border-line">
        <nav className="max-w-6xl mx-auto px-4 sm:px-8 py-3 text-xs text-muted flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-accent transition-colors">
            خانه
          </Link>
          <span className="text-line">›</span>
          <Link href="/gallery" className="hover:text-accent transition-colors">
            گالری
          </Link>
          <span className="text-line">›</span>
          <span className="text-accent">{event.title}</span>
        </nav>
      </div>

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-16 grid md:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
          <FadeUp className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-blush border border-line">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-contain p-4"
              priority
            />
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-muted leading-8 text-sm sm:text-base">{event.intro}</p>

            <dl className="mt-8 rounded-2xl bg-surface border border-line divide-y divide-line">
              {meta.map((m) => (
                <div key={m.label} className="flex items-center gap-3 px-5 py-3.5">
                  <Icon name={m.icon} className="w-4 h-4 text-rose shrink-0" />
                  <dt className="text-xs text-muted w-20">{m.label}</dt>
                  <dd className="text-sm text-accent flex-1">{m.value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="text-sm font-medium text-accent mt-8">نگاه کلی</h2>
            <ul className="mt-3 space-y-2.5">
              {event.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-muted">
                  <Icon name="check" className="w-4 h-4 text-rose shrink-0 mt-1" />
                  {h}
                </li>
              ))}
            </ul>

            {project && (
              <Link
                href={`/archive/${project.slug}`}
                className="inline-flex items-center gap-2 mt-7 text-sm text-rose hover:text-accent transition-colors"
              >
                مشاهده‌ی پروژه‌ی مرتبط در آرشیو
                <Icon name="arrow" className="w-4 h-4" />
              </Link>
            )}
          </FadeUp>
        </div>
      </section>

      {event.sections.length > 0 && (
        <section className="bg-blush">
          <div className="max-w-3xl mx-auto px-4 sm:px-8 py-14 sm:py-16 space-y-10">
            {event.sections.map((s) => (
              <FadeUp key={s.title}>
                <h2 className="text-xl sm:text-2xl font-bold text-accent">{s.title}</h2>
                <p className="text-muted leading-8 text-sm sm:text-base mt-3">{s.body}</p>
              </FadeUp>
            ))}
          </div>
        </section>
      )}

      {event.gallery.length > 1 && (
        <section className="bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-16">
            <FadeUp className="mb-8">
              <span className="eyebrow-latin block">Photos</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-accent mt-3">
                تصاویر رویداد
              </h2>
            </FadeUp>
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.gallery.map((src) => (
                <StaggerItem key={src}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-blush border border-line">
                    <Image
                      src={src}
                      alt={event.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-3"
                    />
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-background pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <FadeUp className="flex items-end justify-between gap-4 mb-8">
              <div>
                <span className="eyebrow-latin block">More Events</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-accent mt-3">
                  رویدادهای دیگر
                </h2>
              </div>
              <Link
                href="/gallery"
                className="hidden sm:inline-flex items-center gap-2 text-sm text-rose hover:text-accent transition-colors"
              >
                همه رویدادها
                <Icon name="arrow" className="w-4 h-4" />
              </Link>
            </FadeUp>

            <Stagger className="grid sm:grid-cols-2 gap-5">
              {related.map((e) => (
                <StaggerItem key={e.slug}>
                  <Link
                    href={`/gallery/${e.slug}`}
                    className="group block h-full rounded-2xl bg-surface border border-line overflow-hidden transition-all duration-300 hover:border-rose-soft hover:shadow-[0_22px_45px_-30px_rgba(122,34,88,0.55)]"
                  >
                    <div className="relative aspect-[16/9] bg-blush">
                      <Image
                        src={e.image}
                        alt={e.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 45vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <b className="block text-accent text-sm leading-7">{e.title}</b>
                      <span className="block text-xs text-muted mt-1.5">{e.meta}</span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow="در رویداد بعدی کنار شما هستیم"
        title="برای حضور در نمایشگاه برند خود با ما تماس بگیرید"
        href="/contact"
        label="تماس با ما"
        image="/img/products/nira-allur-lifestyle.jpg"
      />
    </div>
  );
}
