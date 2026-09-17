import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "./MotionSection";
import { Icon } from "./Icon";
import { Eyebrow } from "./Eyebrow";

/**
 * The banner every inner page opens with: photography filling the left side and
 * washing into the blush background, with the copy stack on the right.
 */
export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  image = "/img/brand/hero-rose.png",
  imagePosition = "50% 50%",
  /** "light" keeps more of the shot visible when the photo is the subject. */
  wash = "default",
  cta,
  secondaryCta,
  tall = false,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  image?: string;
  /** object-position for the artwork — pick the part of the shot worth showing. */
  imagePosition?: string;
  wash?: "default" | "light";
  cta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  tall?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-blush">
      <div className="absolute inset-y-0 left-0 w-full sm:w-[68%]">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 68vw"
          style={{ objectPosition: imagePosition }}
          className="object-cover"
        />
        {/* Washes the shot into the flat blush panel the copy sits on. */}
        <div
          className={`absolute inset-0 bg-gradient-to-l from-[#fceaf0] ${
            wash === "light"
              ? "from-5% via-[#fceaf0]/60 via-40% to-[#fceaf0]/5 sm:via-[#fceaf0]/35 sm:to-transparent"
              : "from-10% via-[#fceaf0]/80 via-45% to-[#fceaf0]/15 sm:via-[#fceaf0]/60 sm:to-transparent"
          }`}
        />
        <div className="absolute inset-0 bg-[#fceaf0]/35 sm:bg-transparent" />
      </div>

      <div
        aria-hidden
        className="absolute -top-24 right-0 w-[420px] h-[420px] rounded-full bg-rose-soft/25 blur-[120px] pointer-events-none"
      />

      <div
        className={`relative max-w-6xl mx-auto px-4 sm:px-8 ${
          tall ? "py-24 sm:py-36" : "py-16 sm:py-24"
        }`}
      >
        <FadeUp className="max-w-xl">
          <Eyebrow text={eyebrow} />
          <h1
            className={`font-bold text-accent mt-4 leading-[1.35] ${
              tall ? "text-4xl sm:text-6xl" : "text-3xl sm:text-5xl"
            }`}
          >
            {title}
            {titleAccent && (
              <>
                <br />
                <span className="text-accent-dark">{titleAccent}</span>
              </>
            )}
          </h1>
          {description && (
            <p className="text-muted mt-5 leading-8 text-sm sm:text-base max-w-lg">
              {description}
            </p>
          )}
          {(cta || secondaryCta) && (
            <div className="flex flex-wrap gap-3 mt-8">
              {cta && (
                <Link href={cta.href} className="btn btn-primary">
                  {cta.label}
                  <Icon name="arrow" className="w-4 h-4" />
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn btn-outline">
                  {secondaryCta.label}
                  <Icon name="arrow" className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
