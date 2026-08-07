import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/portfolio/Page";
import { Projects } from "@/components/portfolio/Projects";

const TITLE = "Projects — Abhinab Das";
const DESCRIPTION =
  "Smart contract, DeFi, NFT and zero-knowledge projects built by Abhinab Das, filterable by domain.";

export const Route = createFileRoute("/projects")({
  component: () => (
    <Page>
      <Projects />
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
