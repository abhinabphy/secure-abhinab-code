export type ProjectTag = "Security" | "DeFi" | "NFT" | "ZK";

export type Project = {
  title: string;
  date: string;
  event: string;
  award?: string;
  desc: string;
  tech: string[];
  tags: ProjectTag[];
  link: string;
};

/** Add new projects by appending to this array. */
export const PROJECTS: Project[] = [
  {
    title: "CryptoMilan",
    date: "Dec 2024",
    event: "Coindcx Unfold Hackathon",
    award: "Won 2 tracks",
    desc: "Proof-of-Attendance Protocol for Web3 events — geofenced 3D POAP collection with AR/AI-unlocked rewards, discounts and perks.",
    tech: ["Aptos", "Move", "Okto", "AR"],
    tags: ["NFT", "DeFi"],
    link: "https://devfolio.co/",
  },
  {
    title: "CritiQ",
    date: "Jul 2024",
    event: "Hack4Bengal",
    award: "Won 2 tracks",
    desc: "Blockchain review management on Avalanche, with Diamante Net rewards, router-nitro cross-chain liquidity migration and Llama genkit review-authenticity checks.",
    tech: ["Avalanche", "Diamante", "Router", "Genkit"],
    tags: ["DeFi", "Security"],
    link: "https://devfolio.co/",
  },
  {
    title: "Suiza",
    date: "Jan 2025",
    event: "Sui Typhoon",
    desc: "Privacy-preserving fitness protocol on Sui using zkCircom circuits — selective health-data disclosure with on-chain commitments and off-chain storage.",
    tech: ["Sui", "Move", "zkCircom", "Eliza AI"],
    tags: ["ZK", "DeFi"],
    link: "https://devfolio.co/",
  },
  {
    title: "ChainTune",
    date: "Feb 2024",
    event: "Aptos Winter School",
    award: "Best Use of Move",
    desc: "Decentralized music platform on Aptos — NFT music releases, automated royalty splits and listen-count-based artist staking/refund logic with IPFS storage.",
    tech: ["Aptos", "Move", "IPFS"],
    tags: ["NFT", "DeFi"],
    link: "https://github.com/",
  },
];
