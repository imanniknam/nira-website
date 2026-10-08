export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: "men" | "women" | "unisex";
  price: number;
  /** When set, shown instead of the site-wide indicative price range. */
  priceText?: string;
  originalPrice?: number;
  packaging: "اورجینال" | "بازرگانی نیرا";
  badge?: "پرفروش" | "جدید";
  inStock: boolean;
  /** Unpublished products are hidden from the public site. */
  published?: boolean;
  image: string;
  gallery: string[];
  volume: string;
  sizes: string[];
  qualities: string[];
  concentration: string;
  origin: string;
  perfumer: string;
  longevity: string;
  season: string;
  notes: { top: string; middle: string; base: string };
  description: string;
};

export type GalleryEvent = {
  slug: string;
  venue: string;
  title: string;
  location: string;
  date: string;
  image?: string;
  heroImage?: string;
  gallery: string[];
  intro: string;
  highlights: string[];
  sections: { title: string; body: string }[];
};

export type ProjectCategory = "perfume" | "bottle" | "gift" | "content";

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: string;
  desc: string;
  client: string;
  year: string;
  scope: string[];
  image?: string;
  heroImage?: string;
  intro: string;
  sections: { title: string; body: string }[];
};

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  perfume: "طراحی و تولید عطر",
  bottle: "طراحی شیشه",
  gift: "گیفت سازمانی",
  content: "محتوای تبلیغاتی",
};

export const productCategoryLabels: Record<Product["category"], string> = {
  men: "مردانه",
  women: "زنانه",
  unisex: "یونیسکس",
};

export type SubmissionKind = "contact" | "order" | "cart";
export type SubmissionStatus = "new" | "read" | "done";

export type Submission = {
  id: string;
  kind: SubmissionKind;
  status: SubmissionStatus;
  createdAt: string;
  /** Label → value pairs, in display order. */
  fields: { label: string; value: string }[];
  /** Quick-glance headline: who sent it. */
  name: string;
  phone?: string;
  email?: string;
};
