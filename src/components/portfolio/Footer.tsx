import { Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "./Reveal";
import { EMAIL, GITHUB, LINKEDIN } from "./data";

export function Footer() {
  return (
    <footer id="contact" className="grain relative scroll-mt-24 border-t border-border">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_bottom,black,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <Reveal>
          <span className="mono-label text-primary">07 — Contact</span>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Auditing a protocol, or building one? Let&apos;s talk.
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="rounded-md border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-md border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Abhinab Das
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            built with react · typescript · tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
