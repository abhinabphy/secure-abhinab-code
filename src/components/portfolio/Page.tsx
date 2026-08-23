import type { ReactNode } from "react";

export function Page({ children }: { children: ReactNode }) {
  return <div className="page-enter pt-16 sm:pt-20">{children}</div>;
}
