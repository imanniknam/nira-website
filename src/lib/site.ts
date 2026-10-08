import type { T } from "./content";

/** Primary navigation, with labels coming from the CMS. */
export function getNav(t: T) {
  return [
    { href: "/", label: t("nav.home") },
    { href: "/shop", label: t("nav.shop") },
    { href: "/archive", label: t("nav.archive") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/services", label: t("nav.services") },
    { href: "/custom-order", label: t("nav.custom") },
    { href: "/contact", label: t("nav.contact") },
  ];
}

/** Secondary destinations — linked from the footer only. */
export function getMoreLinks(t: T) {
  return [{ href: "/catalog", label: t("nav.catalog") }];
}

export function getSiteInfo(t: T) {
  const instagram = t("site.instagram");
  return {
    name: t("site.name"),
    tagline: t("site.tagline"),
    phone: t("site.phone"),
    phoneAlt: t("site.phoneAlt"),
    support: t("site.support"),
    landline: t("site.landline"),
    email: t("site.email"),
    address: t("site.address"),
    hours: t("site.hours"),
    mapUrl: t("site.mapUrl"),
    instagram,
    telegram: t("site.telegram"),
    linkedin: t("site.linkedin"),
    website: t("site.website"),
  };
}

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** "۰۹۱۲-۳۱۱ ۴۳۴۷" → "09123114347", for tel: links. */
export function toTel(display: string) {
  return display
    .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d)))
    .replace(/[^\d+]/g, "");
}
