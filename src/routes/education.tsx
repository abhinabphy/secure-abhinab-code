import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/portfolio/Page";
import { Education } from "@/components/portfolio/Education";

const TITLE = "Education — Abhinab Das";
const DESCRIPTION =
  "Academic background of Abhinab Das, including Engineering Physics at IIT Guwahati.";

export const Route = createFileRoute("/education")({
  component: () => (
    <Page>
      <Education />
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
