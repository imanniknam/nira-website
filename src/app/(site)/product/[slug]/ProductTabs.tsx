"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";

const tabs = [
  { key: "desc", label: "توضیحات" },
  { key: "notes", label: "هرم بویایی" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<TabKey>("desc");

  return (
    <div>
      <div className="flex gap-2 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-4 py-3 text-sm border-b-2 -mb-px transition-colors ${
              active === t.key
                ? "border-accent text-accent font-medium"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="py-6">
        {active === "desc" && (
          <p className="text-muted max-w-2xl leading-8 whitespace-pre-line">
            {product.description || "توضیحاتی برای این محصول ثبت نشده است."}
          </p>
        )}
        {active === "notes" && (
          <table className="w-full max-w-xl text-sm">
            <tbody>
              <tr className="border-b border-line">
                <td className="py-2.5 text-muted w-32">نت ابتدایی</td>
                <td className="py-2.5">{product.notes.top}</td>
              </tr>
              <tr className="border-b border-line">
                <td className="py-2.5 text-muted">نت میانی</td>
                <td className="py-2.5">{product.notes.middle}</td>
              </tr>
              <tr>
                <td className="py-2.5 text-muted">نت پایانی</td>
                <td className="py-2.5">{product.notes.base}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
