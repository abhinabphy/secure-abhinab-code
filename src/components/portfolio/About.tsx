import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { STATS } from "./data";
import portrait from "@/assets/abhinab-portrait.jpg";

export function About() {
  return (
    <Section id="bio" index="01" title="About">
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
            B.Tech, Engineering Physics — IIT Guwahati (2022–Present)
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="card-surface h-full p-4">
                  <div className="text-xl font-semibold text-primary">{s.value}</div>
                  <div className="mono-label mt-1.5 block">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <figure className="card-surface overflow-hidden p-2">
            <img
              src={portrait}
              alt="Portrait of Abhinab Das"
              width={768}
              height={960}
              loading="lazy"
              className="h-full w-full rounded-md object-cover"
            />
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
