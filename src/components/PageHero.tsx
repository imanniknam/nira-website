import { FadeUp } from "./MotionSection";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-surface">
      <div
        aria-hidden
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-accent/15 blur-[90px] pointer-events-none"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 relative">
        <FadeUp>
          <span className="text-accent text-sm">{eyebrow}</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">{title}</h1>
          {description && (
            <p className="text-muted mt-3 max-w-2xl leading-7">{description}</p>
          )}
        </FadeUp>
      </div>
    </div>
  );
}
