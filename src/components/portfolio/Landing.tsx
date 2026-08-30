import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import portrait from "@/assets/abhinab-portrait.jpg";
import { EMAIL } from "./data";

const ROTATING = [
  "engineering quantitative DeFi rails",
  "optimizing low-level EVM execution",
  "building secure Rust & Solidity protocols",
  "fuzzing smart contract invariants",
];

const LANDING_STATS = [
  { value: "6+", label: "hackathon wins" },
  { value: "5+", label: "chains worked on" },
  { value: "1k+", label: "daily tx handled" },
  { value: "4+", label: "projects shipped" },
];

const INTERESTS = [
  "quantitative DeFi and on-chain order flow mechanics",
  "EVM assembly (Yul), gas optimization, and state access",
  "protocol security, invariant testing, and ZK primitives",
  "analyzing tactical football mechanics and solving detective novels",
];

function Typed() {
  const [i, setI] = useState(0);
  const [len, setLen] = useState(0);
  const [del, setDel] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const word = ROTATING[i] ?? "";
    if (!del && len >= word.length) {
      const t = setTimeout(() => {
        if (mounted.current) setDel(true);
      }, 1600);
      return () => clearTimeout(t);
    }
    if (del && len <= 0) {
      const t = setTimeout(() => {
        if (!mounted.current) return;
        setDel(false);
        setI((v) => (v + 1) % ROTATING.length);
      }, 200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (!mounted.current) return;
      setLen((v) => v + (del ? -1 : 1));
    }, del ? 35 : 70);
    return () => clearTimeout(t);
  }, [i, len, del]);

  const word = ROTATING[i] ?? "";
  return (
    <span className="font-serif italic text-primary">
      {word.slice(0, len)}
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-primary align-middle motion-safe:animate-pulse" />
    </span>
  );
}

function Portrait({ className = "" }: { className?: string }) {
  return (
    <figure className={`portrait-card ${className}`}>
      <img
        src={portrait}
        alt="Portrait of Abhinab Das"
        width={768}
        height={960}
        loading="lazy"
      />
    </figure>
  );
}

export function Landing() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-44 pt-20 sm:pt-24">
      <div aria-hidden className="page-glow pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <Portrait className="order-first mx-auto w-[150px] aspect-square lg:hidden" />

          <div>
            <h1 className="text-5xl font-normal tracking-tight sm:text-6xl">
              Hi, I&apos;m <span className="font-serif italic text-primary">Abhinab</span>
            </h1>

            <p className="mt-6 text-2xl text-muted-foreground sm:text-3xl">
              I love <Typed />
            </p>

            <div className="mt-12 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
  I study Engineering Physics at{" "}
  <a
    href="https://www.iitg.ac.in/"
    target="_blank"
    rel="noreferrer"
    className="prose-link"
  >
    IIT Guwahati
  </a>
  , where I moved from modeling physical systems to modeling adversarial ones —
  AMM mechanics, liquidity pricing, and block-by-block order flow. The habit of
  hunting down the subtle assumption that breaks a physical model turned out to
  be the exact same skill needed for smart contracts.
</p>
<p>
  My focus sits at the intersection of quantitative DeFi and Web3 security:
  writing low-level Solidity and Rust built to handle toxic order flow and hostile
  mempools. Having won major hackathons shipping ZK and Move systems, I keep that
  same bias for shipping fast, but always anchored in building battle-tested code
  that survives in production.
</p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-7 sm:grid-cols-4">
              {LANDING_STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-semibold text-primary">{s.value}</div>
                  <div className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-14">
              <h2 className="text-lg font-bold text-primary">
                Some things I&apos;m interested in:
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-relaxed text-foreground/80 sm:text-lg">
                {INTERESTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-16">
              <h2 className="max-w-2xl font-serif text-2xl font-normal tracking-tight sm:text-3xl">
                Auditing a protocol, or building one? Let&apos;s talk.
              </h2>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <Mail className="h-4 w-4" /> {EMAIL}
                </a>
                <Link
                  to="/experience"
                  className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary"
                >
                  Experience
                </Link>
                <Link
                  to="/projects"
                  className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary"
                >
                  Projects
                </Link>
              </div>
            </div>
          </div>

          <Portrait className="hidden w-full max-w-[250px] aspect-[4/5] lg:mt-0 lg:block" />
        </div>
      </div>
    </section>
  );
}
