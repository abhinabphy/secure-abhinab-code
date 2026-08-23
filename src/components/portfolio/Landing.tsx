import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import portrait from "@/assets/abhinab-portrait.jpg";

const ROTATING = [
  "breaking smart contracts",
  "building DeFi rails",
  "zero-knowledge systems",
];

const LANDING_STATS = [
  { value: "6+", label: "hackathon wins" },
  { value: "5+", label: "chains worked on" },
  { value: "1k+", label: "daily tx handled" },
  { value: "4+", label: "projects shipped" },
];

const INTERESTS = [
  "smart contract security and adversarial systems",
  "zero-knowledge proofs and privacy-preserving protocols",
  "mempool monitoring and on-chain anomaly detection",
  "DeFi infrastructure and blockchain engineering",
];

function Typed() {
  const [i, setI] = useState(0);
  const [len, setLen] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = ROTATING[i] ?? "";
    if (!del && len === word.length) {
      const t = setTimeout(() => setDel(true), 1600);
      return () => clearTimeout(t);
    }
    if (del && len === 0) {
      setDel(false);
      setI((v) => (v + 1) % ROTATING.length);
      return;
    }
    const t = setTimeout(() => setLen((v) => v + (del ? -1 : 1)), del ? 35 : 70);
    return () => clearTimeout(t);
  }, [i, len, del]);

  return (
    <span className="font-serif italic text-primary">
      {(ROTATING[i] ?? "").slice(0, len)}
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-primary align-middle motion-safe:animate-pulse" />
    </span>
  );
}

function Portrait({ className = "" }: { className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-border ${className}`}>
      <img
        src={portrait}
        alt="Portrait of Abhinab Das"
        width={768}
        height={960}
        loading="lazy"
        className="aspect-[4/5] w-full object-cover"
      />
    </figure>
  );
}

export function Landing() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-40 pt-20 sm:pt-28">
      <div aria-hidden className="page-glow pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div>
            <h1 className="text-5xl font-normal tracking-tight sm:text-6xl">
              Hi, I&apos;m <span className="font-serif italic text-primary">Abhinab</span>
            </h1>

            <p className="mt-6 text-2xl text-muted-foreground sm:text-3xl">
              I love <Typed />
            </p>

            <Portrait className="mt-10 max-w-sm lg:hidden" />

            <div className="mt-12 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                I build and break smart contracts — from Hyperledger supply chains to
                real-time exploit detection on EVM. <Link to="/experience" className="prose-link">See my work</Link>.
              </p>
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
                , where I moved from modelling physical systems to modelling adversarial ones.
                I&apos;ve shipped{" "}
                <Link to="/projects" className="prose-link">
                  Hyperledger supply chains, Move protocols and zero-knowledge systems
                </Link>{" "}
                that made it past hackathon judges and into production-shaped deployments.
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
              <h2 className="text-lg font-semibold tracking-tight">
                Some things I&apos;m interested in:
              </h2>
              <ul className="mt-5 list-disc space-y-2.5 pl-5 leading-relaxed text-muted-foreground marker:text-primary">
                {INTERESTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

          </div>

          <Portrait className="hidden lg:mt-52 lg:block" />
        </div>
      </div>
    </section>
  );
}
