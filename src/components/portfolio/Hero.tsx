import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { EMAIL, GITHUB, LINKEDIN, RESUME_URL } from "./data";

const ROTATING = [
  "Smart Contract Security",
  "Blockchain Engineering",
  "Zero-Knowledge Systems",
];

function Typed() {
  const [i, setI] = useState(0);
  const [len, setLen] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = ROTATING[i];
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
    <span className="font-mono text-primary">
      {ROTATING[i].slice(0, len)}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-primary align-middle motion-safe:animate-pulse" />
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[0.7rem] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
          Currently: Web3 Security Researcher @ SentielX Solutions
        </span>

        <h1 className="mt-7 text-5xl font-bold tracking-tight sm:text-7xl">Abhinab Das</h1>
        <p className="mt-3 text-xl font-medium text-foreground/85 sm:text-2xl">
          DeFi Engineer &amp; Web3 Security Researcher
        </p>
        <p className="mt-2 text-sm sm:text-base">
          <span className="mono-label mr-2">focus:</span>
          <Typed />
        </p>

        <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Building and breaking smart contracts — from Hyperledger supply chains to real-time
          exploit detection on EVM.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            View Projects <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary"
          >
            Contact
          </a>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email Abhinab Das"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
