import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { STATS } from "./data";
import portrait from "@/assets/abhinab-portrait.jpg";

export function About() {
  return (
    <Section id="bio" index="01" title="About">
      <div className="grid items-start gap-10 lg:grid-cols-[1.6fr_minmax(0,0.8fr)]">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
           <p>
 <p>
  I study Engineering Physics at IIT Guwahati, where I moved from modeling 
  physical systems to modeling adversarial ones — AMM mechanics, liquidity 
  pricing, and block-by-block order flow. The habit of hunting down the subtle 
  assumption that breaks a physical model turned out to be the exact same 
  skill needed for smart contracts.
</p>
<p>
  My work focuses on the intersection of quantitative DeFi and Web3 security: 
  writing low-level Solidity and Rust built to handle toxic order flow and hostile 
  mempools. Having won major hackathons shipping ZK and Move systems, I keep 
  that same bias for shipping fast, but always anchored in building battle-tested 
  code that survives in production.
</p>
</p>
          </div>
          <p className="mt-6 font-mono text-xs text-muted-foreground">
            B.Tech, Engineering Physics — IIT Guwahati (2022–2026)
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
          <figure className="card-surface w-full max-w-[18rem] overflow-hidden p-2 sm:max-w-[20rem] lg:max-w-none">
            <img
              src={portrait}
              alt="Portrait of Abhinab Das"
              width={768}
              height={960}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-md object-cover"
            />
          </figure>
        </Reveal>

      </div>
    </Section>
  );
}
