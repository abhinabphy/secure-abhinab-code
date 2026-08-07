import type { ReactNode } from "react";

export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:py-24">
      <div className="mb-10 flex items-center gap-4">
        <span className="mono-label text-primary">{index}</span>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <span className="h-px flex-1 bg-border" />
      </div>
      {children}
    </section>
  );
}
