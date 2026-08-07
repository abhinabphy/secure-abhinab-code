import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { EDUCATION } from "./data";

export function Education() {
  return (
    <Section id="education" index="06" title="Education">
      <Reveal>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Education history</caption>
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th scope="col" className="mono-label px-4 py-3">
                  Institution
                </th>
                <th scope="col" className="mono-label px-4 py-3">
                  Qualification
                </th>
                <th scope="col" className="mono-label px-4 py-3 text-right">
                  Score
                </th>
                <th scope="col" className="mono-label hidden px-4 py-3 text-right sm:table-cell">
                  Years
                </th>
              </tr>
            </thead>
            <tbody>
              {EDUCATION.map((e) => (
                <tr key={e.degree} className="border-b border-border last:border-0">
                  <td className="px-4 py-4 font-medium">{e.school}</td>
                  <td className="px-4 py-4 text-muted-foreground">{e.degree}</td>
                  <td className="px-4 py-4 text-right font-mono text-xs text-primary">
                    {e.score}
                  </td>
                  <td className="hidden px-4 py-4 text-right font-mono text-xs text-muted-foreground sm:table-cell">
                    {e.period}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
