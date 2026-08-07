import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { SKILLS } from "./data";

export function Skills() {
  return (
    <Section id="skills" index="04" title="Skills">
      <div className="grid gap-5 sm:grid-cols-2">
        {SKILLS.map((g, i) => (
          <Reveal key={g.group} delay={i * 70}>
            <div className="card-surface h-full p-6">
              <h3 className="mono-label text-primary">{g.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-border bg-secondary/40 px-2.5 py-1 font-mono text-xs text-foreground/85"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
