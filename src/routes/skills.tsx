import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/portfolio/Page";
import { Skills } from "@/components/portfolio/Skills";

const TITLE = "Skills — Abhinab Das";
const DESCRIPTION =
  "Languages, security tooling, chains and infrastructure Abhinab Das works with day to day.";

export const Route = createFileRoute("/skills")({
  component: () => (
    <Page>
      <Skills />
    </Page>
  ),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
});
