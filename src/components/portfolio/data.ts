export const NAV_LINKS = [
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/articles", label: "Articles" },
] as const;

export { PROJECTS, type Project } from "@/lib/content";

export const EMAIL = "abhinabiitg@gmail.com";
export const GITHUB = "https://github.com/";
export const LINKEDIN = "https://www.linkedin.com/";
export const RESUME_URL = "/resume.pdf";

export const STATS = [
  { value: "6+", label: "Hackathon Wins" },
  { value: "5+", label: "Chains Worked On" },
];

export const EXPERIENCE = [
  {
    org: "IQApex Labs",
    role: "Blockchain Developer Intern",
    period: "May 2024 — Jul 2024",
    location: "Remote",
    current: false,
    body: "Built the backend and blockchain server for SupplyX, a decentralized food supply-chain system on Hyperledger Fabric with real-time order tracking and farm-to-fork traceability. Deployed on Docker/AWS/Kubernetes handling 1,000+ transactions/day with fabric-ca identity management. Resulted in a bounty from the State Government.",
  },
  {
    org: "Finance and Economics Club, IIT Guwahati",
    role: "Core Team",
    period: "Apr 2024 — Apr 2025",
    location: "IIT Guwahati",
    current: false,
    body: "Core team member driving research sessions, events and market-analysis initiatives for the campus finance community.",
  },
];

export const SKILLS = [
  {
    group: "Programming",
    items: ["C/C++", "Solidity", "Rust", "Cadence", "Bitcoin Script", "Move"],
  },
  {
    group: "Web3 Security",
    items: ["Fuzzing", "Static Analysis (Slither)", "Aderyn", "Manual Auditing"],
  },
  {
    group: "Blockchain",
    items: [
      "EVM (Base)",
      "Avalanche",
      "Polygon",
      "Filecoin",
      "Hyperledger Fabric",
      "Solana",
      "Flow",
      "Diamante",
    ],
  },
  { group: "Web Dev", items: ["React", "Ethers.js", "Web3.js", "TypeScript"] },
];

export const ACHIEVEMENTS = [
  {
    title: "CoinDCX Unfold'24",
    detail: "Won 2 tracks — Aptos Consumer Track, Best Okto Wallet Integration",
    year: "2024",
  },
  {
    title: "Aptos Winter School 2024",
    detail: "Top 60 Move Developers in India; Best Use of Move (ChainTune)",
    year: "2024",
  },
  {
    title: "Hack4Bengal 2023",
    detail: "Won 2 tracks with CritiQ — Router Protocol, Diamante Blockchain Application",
    year: "2023",
  },
  {
    title: "Navishkar 2024",
    detail: "Top 3 team, government-initiated innovation competition (SupplyX)",
    year: "2024",
  },
  {
    title: "Decenbuild SocialFi",
    detail: "3rd place, global Lens Protocol hackathon",
    year: "2024",
  },
  {
    title: "NTSE / IOQM 2020",
    detail: "Fizika State Topper, 17th National Rank, PhysicBrawl Winner, OPHO Scholar",
    year: "2020",
  },
];

export const EDUCATION = [
  {
    school: "IIT Guwahati",
    degree: "B.Tech, Engineering Physics",
    period: "2022 — Present",
  },
  { school: "WBCHSE", degree: "Senior Secondary", period: "2022" },
  { school: "WBCHSE", degree: "Secondary", period: "2020" },
];
