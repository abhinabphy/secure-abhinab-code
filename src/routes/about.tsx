import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/portfolio/Page";
import { About } from "@/components/portfolio/About";

const TITLE = "About — Abhinab Das";
const DESCRIPTION =
  "From Engineering Physics at IIT Guwahati to adversarial systems: how Abhinab Das approaches smart contract security research.";

export const Route = createFileRoute("/about")({
  component: () => (
    <Page>
      <About />
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
