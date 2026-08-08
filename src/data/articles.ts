export type Article = {
  title: string;
  excerpt: string;
  /** ISO date */
  date: string;
  tags: string[];
  slug: string;
  body?: string;
  link?: string;
};

/** Add new articles by appending to this array. */
export const ARTICLES: Article[] = [
  {
    title: "Reentrancy Beyond the Classic Pattern",
    excerpt:
      "Cross-function and cross-contract reentrancy paths that checks-effects-interactions alone does not close, with a Foundry test harness to catch them.",
    date: "2025-06-18",
    tags: ["security", "solidity"],
    slug: "reentrancy-beyond-the-classic-pattern",
  },
  {
    title: "Reading the Mempool for Front-Running Signals",
    excerpt:
      "How we score pending transactions in real time, and which heuristics survive contact with production traffic on EVM chains.",
    date: "2025-03-02",
    tags: ["security", "mev"],
    slug: "reading-the-mempool",
  },
  {
    title: "Move's Resource Model, From a Solidity Brain",
    excerpt:
      "Linear types remove entire vulnerability classes — and introduce new ones. A migration guide for auditors coming from EVM.",
    date: "2024-11-21",
    tags: ["move", "solidity"],
    slug: "move-resource-model",
  },
  {
    title: "Practical zk Circuits for Selective Disclosure",
    excerpt:
      "Designing Circom circuits that prove a health metric threshold without revealing the metric, and the on-chain commitment scheme behind it.",
    date: "2024-08-09",
    tags: ["zk", "move"],
    slug: "practical-zk-selective-disclosure",
  },
];
