import Image from "next/image";
import Link from "next/link";
import { FadeUp, Stagger, StaggerItem } from "./MotionSection";
import { Icon, type IconName } from "./Icon";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
}) {
  return (
    <FadeUp className={align === "center" ? "text-center" : "text-start"}>
      {eyebrow && <Eyebrow text={eyebrow} />}
      <h2 className="text-2xl sm:text-4xl font-bold text-accent mt-3">{title}</h2>
      {subtitle && (
        <p
          className={`text-muted mt-4 leading-8 text-sm sm:text-base ${
            align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </FadeUp>
  );
}

export type Feature = { icon: IconName; title: string; hint: string };

/** The four-up trust row that sits under every hero. */
export function FeatureStrip({
  items,
  tone = "blush",
}: {
  items: Feature[];
  tone?: "blush" | "surface";
}) {
  return (
    <section className={tone === "blush" ? "bg-blush" : "bg-surface"}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-12">
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x-0 sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-line">
          {items.map((f) => (
            <StaggerItem key={f.title} className="px-4 py-5 text-center">
              <Icon name={f.icon} className="w-8 h-8 mx-auto text-accent" />
              <b className="block text-sm text-accent mt-3">{f.title}</b>
              <span className="block text-xs text-muted mt-1 leading-6">{f.hint}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Deep-plum petal band carrying a single brand line. */
export function QuoteBand({
  quote,
  author,
  image = "/img/brand/marble-rose.png",
}: {
  quote: string;
  author?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden dark-band">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 dark-band opacity-80" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-8 py-16 sm:py-20 text-center text-white">
        <FadeUp>
          <Icon name="quote" filled className="w-8 h-8 mx-auto text-white/50" />
          <p className="text-lg sm:text-2xl leading-[2.2] mt-5">{quote}</p>
          {author && <span className="block text-white/70 text-sm mt-5">— {author}</span>}
        </FadeUp>
      </div>
    </section>
  );
}

/** Closing call-to-action band. */
export function CtaBand({
  eyebrow,
  title,
  description,
  href,
  label,
  image = "/img/brand/packaging-box-soft.jpg",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href: string;
  label: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden dark-band">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 dark-band opacity-85" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-8 py-16 sm:py-20 text-center text-white">
        <FadeUp>
          {eyebrow && <span className="block text-white/70 text-sm">{eyebrow}</span>}
          <h2 className="text-2xl sm:text-4xl font-bold mt-3 leading-[1.5]">{title}</h2>
          {description && (
            <p className="text-white/80 mt-4 leading-8 text-sm sm:text-base max-w-2xl mx-auto">
              {description}
            </p>
          )}
          <Link href={href} className="btn btn-ghost-light mt-8">
            {label}
            <Icon name="arrow" className="w-4 h-4" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

/** Icon-led card used by the services / values / why-us grids. */
export function IconCard({
  icon,
  title,
  desc,
  href,
}: {
  icon: IconName;
  title: string;
  desc?: string;
  href?: string;
}) {
  const body = (
    <div className="h-full rounded-2xl bg-surface border border-line p-6 text-center transition-all duration-300 hover:border-rose-soft hover:shadow-[0_18px_40px_-28px_rgba(122,34,88,0.55)]">
      <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blush text-accent">
        <Icon name={icon} className="w-7 h-7" />
      </span>
      <b className="block text-accent mt-4">{title}</b>
      {desc && <p className="text-xs text-muted mt-2 leading-6">{desc}</p>}
    </div>
  );
  return href ? (
    <Link href={href} className="block h-full">
      {body}
    </Link>
  ) : (
    body
  );
}
