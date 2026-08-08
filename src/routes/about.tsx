import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/portfolio/Page";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Achievements } from "@/components/portfolio/Achievements";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";

const TITLE = "About — Abhinab Das";
const DESCRIPTION =
  "From Engineering Physics at IIT Guwahati to adversarial systems: bio, skills, achievements, education and contact details for Abhinab Das.";

const SUBNAV = [
  { id: "bio", label: "bio" },
  { id: "skills", label: "skills" },
  { id: "achievements", label: "achievements" },
  { id: "education", label: "education" },
  { id: "contact", label: "contact" },
];

function AboutPage() {
  return (
    <Page>
      <nav
        aria-label="On this page"
        className="mx-auto max-w-6xl px-5 pt-4"
      >
        <ul className="flex flex-wrap gap-2">
          {SUBNAV.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="rounded-full border border-border px-3.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <About />
      <div className="mx-auto h-px max-w-6xl bg-border" />
      <Skills />
      <div className="mx-auto h-px max-w-6xl bg-border" />
      <Achievements />
      <div className="mx-auto h-px max-w-6xl bg-border" />
      <Education />
      <div className="mx-auto h-px max-w-6xl bg-border" />
      <Contact />
    </Page>
  );
}

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
});
