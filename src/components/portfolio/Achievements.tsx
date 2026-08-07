import { useState } from "react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ACHIEVEMENTS } from "./data";

export function Achievements() {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? ACHIEVEMENTS : ACHIEVEMENTS.slice(0, 6);

  return (
    <Section id="achievements" index="06" title="Achievements">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a, i) => (
          <Reveal key={a.title} delay={i * 60}>
            <div className="card-surface h-full p-5">
              <div className="mono-label text-primary">{a.year}</div>
              <h3 className="mt-2 text-base font-semibold tracking-tight">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {ACHIEVEMENTS.length > 6 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-6 rounded-md border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          {expanded ? "show less" : `show more (${ACHIEVEMENTS.length - 6})`}
        </button>
      )}
    </Section>
  );
}
