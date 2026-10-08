import { getT } from "@/lib/content";
import { FeatureStrip, type Feature } from "./Sections";

const ICONS: Feature["icon"][] = ["truck", "shield", "diamond", "leaf"];

/** The four-up trust row, with copy from the CMS. */
export async function CmsFeatureStrip({ tone }: { tone?: "blush" | "surface" }) {
  const t = await getT();
  const items: Feature[] = ICONS.map((icon, i) => ({
    icon,
    title: t(`features.${i}.title`),
    hint: t(`features.${i}.hint`),
  }));
  return <FeatureStrip items={items} tone={tone} />;
}
