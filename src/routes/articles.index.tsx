import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/portfolio/Page";
import { Articles } from "@/components/portfolio/Articles";

const TITLE = "Articles — Abhinab Das";
const DESCRIPTION =
  "Writing on smart contract security, MEV, Move and zero-knowledge systems by Abhinab Das.";

export const Route = createFileRoute("/articles/")({
  component: () => (
    <Page>
      <Articles />
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
