import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { STATS } from "./data";

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              I&apos;m an Engineering Physics undergraduate at IIT Guwahati who moved from
              modelling physical systems to modelling adversarial ones. The same habit —
              find the assumption that breaks — is what I now apply to smart contracts.
            </p>
            <p>
              Today I research Web3 security: static and dynamic analysis, fuzzing, mempool
              monitoring and on-chain anomaly detection. I also ship — Hyperledger supply
              chains, Move protocols and zero-knowledge systems that made it past hackathon
              judges and into production-shaped deployments.
            </p>
          </div>
          <p className="mt-6 font-mono text-xs text-muted-foreground">
            B.Tech, Engineering Physics · IIT Guwahati · 2022—Present
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div className="card-surface h-full p-5">
                <div className="text-2xl font-semibold text-primary">{s.value}</div>
                <div className="mono-label mt-2 block">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
