import Link from "next/link";
import { getMoreLinks, getNav, getSiteInfo } from "@/lib/site";
import { getT } from "@/lib/content";
import { Logo } from "@/components/Logo";
import { Icon, type IconName } from "@/components/Icon";

export async function Footer() {
  const t = await getT();
  const nav = getNav(t);
  const moreLinks = getMoreLinks(t);
  const info = getSiteInfo(t);
  const socials: { href: string; icon: IconName; label: string }[] = [
    { href: info.instagram, icon: "instagram", label: "اینستاگرام" },
    { href: info.telegram, icon: "telegram", label: "تلگرام" },
    { href: info.linkedin, icon: "linkedin", label: "لینکدین" },
  ].filter((s) => s.href) as { href: string; icon: IconName; label: string }[];

  return (
    <footer className="dark-band text-white">
      {/* Source order is reversed on purpose: in RTL it lands the icons on the
          right, the links in the middle and the wordmark on the left, the way
          the brand layout sets the bar. */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3 order-1">
          {socials.map((s) => (
            <a
              key={s.icon}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors"
            >
              <Icon name={s.icon} />
            </a>
          ))}
        </div>

        <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm order-2 mx-auto">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {moreLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/60 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="flex items-center gap-4 order-3">
          <Logo src={t("site.logoCream")} className="h-10 w-auto" />
          <span className="hidden sm:inline text-white/60 text-xs tracking-[0.2em]">
            {info.tagline}
          </span>
        </Link>
      </div>

      <div className="border-t border-white/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 text-center text-[11px] text-white/60">
          <p>{t("footer.copyright")}</p>
          <p className="mt-1">
            طراحی و توسعه:{" "}
            <a
              href="https://shamimhouse.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              خانه شمیم
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
