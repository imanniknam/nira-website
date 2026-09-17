"use client";

import { Icon, type IconName } from "@/components/Icon";

export type Tab = { key: string; label: string; icon: IconName };

/** Icon-over-label filter row used by the archive and gallery pages. */
export function TabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-stretch justify-center gap-2 sm:gap-8 border-b border-line">
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            aria-pressed={on}
            className={`relative flex flex-col items-center gap-2 px-3 sm:px-4 pb-4 pt-2 text-xs transition-colors ${
              on ? "text-accent" : "text-muted hover:text-accent"
            }`}
          >
            <Icon name={t.icon} className="w-6 h-6" />
            <span className="whitespace-nowrap">{t.label}</span>
            {on && (
              <span className="absolute -bottom-px inset-x-2 h-0.5 rounded-full bg-accent" />
            )}
          </button>
        );
      })}
    </div>
  );
}
