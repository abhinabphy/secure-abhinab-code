import { Github, Linkedin, Mail } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { EMAIL, GITHUB, LINKEDIN, RESUME_URL } from "./data";

export function Contact() {
  return (
    <Section id="contact" index="08" title="Contact">
      <Reveal>
        <h3 className="max-w-2xl font-serif text-2xl font-normal tracking-tight sm:text-3xl">
          Auditing a protocol, or building one? Let&apos;s talk.
        </h3>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            <Mail className="h-4 w-4" /> {EMAIL}
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
    </Section>
  );
}
