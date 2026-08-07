import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { EXPERIENCE } from "./data";

export function Experience() {
  return (
    <Section id="experience" index="02" title="Experience">
      <ol className="relative ml-1 border-l border-border pl-6 sm:pl-8">
        {EXPERIENCE.map((e, i) => (
          <li key={e.org} className="relative pb-10 last:pb-0">
            <span
              aria-hidden
              className={`absolute -left-[calc(1.5rem+5px)] top-2 h-2.5 w-2.5 rounded-full sm:-left-[calc(2rem+5px)] ${
                e.current ? "bg-primary" : "bg-border"
              }`}
            />
            <Reveal delay={i * 80}>
              <div className="card-surface p-5 sm:p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:flex-wrap sm:items-baseline sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight">{e.role}</h3>
                    <p className="mt-0.5 text-sm text-primary">{e.org}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="mono-label">{e.period}</div>
                    <div className="mono-label mt-1">{e.location}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
