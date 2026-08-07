import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/portfolio/Page";
import { Contact } from "@/components/portfolio/Contact";

const TITLE = "Contact — Abhinab Das";
const DESCRIPTION =
  "Get in touch with Abhinab Das about smart contract audits, DeFi engineering or research collaboration.";

export const Route = createFileRoute("/contact")({
  component: () => (
    <Page>
      <Contact />
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
