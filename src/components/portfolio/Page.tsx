import type { ReactNode } from "react";

export function Page({ children }: { children: ReactNode }) {
  return <div className="page-enter pt-24 sm:pt-28">{children}</div>;
}
