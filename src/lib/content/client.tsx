"use client";

import { createContext, useContext, type ReactNode } from "react";

const ContentContext = createContext<Record<string, string>>({});

export function ContentProvider({
  values,
  children,
}: {
  values: Record<string, string>;
  children: ReactNode;
}) {
  return <ContentContext.Provider value={values}>{children}</ContentContext.Provider>;
}

/** Client-side counterpart of the server `t()`; only keys in CLIENT_PREFIXES exist here. */
export function useT() {
  const values = useContext(ContentContext);
  return (key: string) => values[key] ?? "";
}
