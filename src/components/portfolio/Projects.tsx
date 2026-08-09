import { useMemo, useState } from "react";
import { ArrowUpRight, Trophy } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { PROJECTS } from "./data";

export function Projects() {
  const [filter, setFilter] = useState<string>("All");

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))],
    [],
  );

  const shown =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <Section id="projects" index="03" title="Projects">
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
              filter === f
                ? "border-primary/60 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {f.toLowerCase()}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {shown.map((p, i) => {
          const primaryLink = Object.values(p.links)[0];
          return (
            <Reveal key={p.slug} delay={i * 70}>
              <article className="card-surface flex h-full flex-col p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <h3 className="truncate text-lg font-semibold tracking-tight">{p.title}</h3>
                  {primaryLink && (
                    <a
                      href={primaryLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${p.title} project link`}
                      className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  )}
                </div>

                <div className="mono-label mt-1.5">
                  {p.date}
                  {p.event ? ` · ${p.event}` : ""}
                </div>

                {p.badge && (
                  <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 font-mono text-[0.7rem] text-primary">
                    <Trophy className="h-3 w-3" /> {p.badge}
                  </span>
                )}

                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.excerpt}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-border px-2 py-0.5 font-mono text-[0.7rem] lowercase text-muted-foreground"
                    >
                      {t.toLowerCase()}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
