import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { PROJECTS } from "./data";

function linkHost(url?: string): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function Projects() {
  const [filter, setFilter] = useState<string>("All");

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))],
    [],
  );

  const shown =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-5 pb-16 pt-2 sm:rounded-[3rem]">
      <div
        aria-hidden
        className="page-glow pointer-events-none absolute inset-4 top-0 h-[30rem] rounded-[3rem] opacity-80 blur-2xl [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_76%)]"
      />

      <div className="relative">
        <span className="mono-label text-primary">{"// projects"}</span>
        <p className="mt-5 max-w-3xl text-2xl leading-relaxed text-foreground/90 sm:text-3xl">
          Six hackathon wins, one government bounty — code built to take a hit, not just survive a demo.
        </p>

        <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
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

        {shown.length === 0 ? (
          <p className="mt-16 font-mono text-sm text-muted-foreground">
            no projects match this filter yet.
          </p>
        ) : (
          <div className="mt-5 divide-y divide-border">
            {shown.map((p, i) => {
              const primaryLink = Object.values(p.links)[0];
              const host = linkHost(primaryLink);
              return (
                <Reveal key={p.slug} delay={i * 60}>
                  <article className="grid gap-5 py-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10">
                    <div className="flex items-start gap-5">
                      <div
                        aria-hidden
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 font-mono text-xl font-semibold text-primary"
                      >
                        {p.title.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl font-semibold tracking-tight">
                          {primaryLink ? (
                            <a
                              href={primaryLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                            >
                              {p.title}
                              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                            </a>
                          ) : (
                            p.title
                          )}
                        </h3>
                        {host && (
                          <div className="mt-1.5 font-mono text-xs lowercase text-muted-foreground">
                            {host}
                          </div>
                        )}
                        <div className="mono-label mt-1.5">
                          {p.date}
                          {p.event ? ` · ${p.event}` : ""}
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {p.excerpt}
                      </p>
                      {p.badge && (
                        <p className="mt-4 flex items-center gap-2 text-sm text-primary">
                          <span aria-hidden>◆</span>
                          {p.badge}
                        </p>
                      )}
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
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
