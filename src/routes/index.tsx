import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/portfolio/Landing";

const TITLE = "Abhinab Das — DeFi Engineer & Web3 Security Researcher";
const DESCRIPTION =
  "Portfolio of Abhinab Das: smart contract security research, DeFi engineering and zero-knowledge systems. IIT Guwahati, 6+ hackathon wins.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Abhinab Das",
          jobTitle: "DeFi Engineer & Web3 Security Researcher",
          email: "mailto:abhinabiitg@gmail.com",
          alumniOf: "Indian Institute of Technology Guwahati",
          knowsAbout: [
            "Smart Contract Security",
            "Solidity",
            "Move",
            "Zero-Knowledge Proofs",
            "Blockchain Engineering",
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return <Hero />;
}
