export const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "articles", label: "Articles" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const EMAIL = "abhinabiitg@gmail.com";
export const GITHUB = "https://github.com/";
export const LINKEDIN = "https://www.linkedin.com/";
export const RESUME_URL = "/resume.pdf";

export const STATS = [
  { value: "6+", label: "Hackathon Wins" },
  { value: "5+", label: "Chains Worked On" },
  { value: "Top 60", label: "Move Devs in India" },
  { value: "1k+", label: "Daily Tx Handled" },
];

export const EXPERIENCE = [
  {
    org: "SentielX.Solutions",
    role: "Web3 Security Researcher",
    period: "Apr 2025 — Ongoing",
    location: "Remote",
    current: true,
    body: "Real-time protection layer for smart contracts: automated static and dynamic analysis, runtime monitoring, mempool scanning for front-running detection, and on-chain anomaly detection to safeguard dApps from exploits and vulnerabilities.",
  },
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

export type ProjectTag = "Security" | "DeFi" | "NFT" | "ZK";

export const PROJECTS: {
  title: string;
  date: string;
  event: string;
  award?: string;
  desc: string;
  tech: string[];
  tags: ProjectTag[];
  link: string;
}[] = [
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
