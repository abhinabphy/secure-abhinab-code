import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/portfolio/Page";
import { Achievements } from "@/components/portfolio/Achievements";

const TITLE = "Achievements — Abhinab Das";
const DESCRIPTION =
  "Hackathon wins, grants and recognitions across Web3 security, DeFi and zero-knowledge work.";

export const Route = createFileRoute("/achievements")({
  component: () => (
    <Page>
      <Achievements />
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
