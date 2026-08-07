import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/portfolio/Page";
import { Experience } from "@/components/portfolio/Experience";

const TITLE = "Experience — Abhinab Das";
const DESCRIPTION =
  "Web3 security research at SentielX Solutions and blockchain engineering at IQApex Labs — roles, scope and outcomes.";

export const Route = createFileRoute("/experience")({
  component: () => (
    <Page>
      <Experience />
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
