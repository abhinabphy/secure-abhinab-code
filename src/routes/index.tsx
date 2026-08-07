import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Achievements } from "@/components/portfolio/Achievements";
import { Education } from "@/components/portfolio/Education";
import { Footer } from "@/components/portfolio/Footer";

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
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Education />
      </main>
      <Footer />
    </div>
  );
}
