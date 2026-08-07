# Abhinab Das: Secure & Scalable

Build a personal portfolio website for Abhinab Das, a DeFi Engineer and Web3 Security Researcher. This should read as a credible technical portfolio for someone who audits smart contracts and builds blockchain infrastructure — NOT a generic "web3 bro" landing page. Avoid rockets, moons, floating 3D coins, gradient blobs, or hype copy. Think "security researcher who also ships product."

## Visual Direction
- Dark mode by default, near-black background (#0A0A0B), subtle grain/noise texture rather than flat color
- ONE accent color used sparingly for CTAs, links, hover glows, and highlights — a terminal/security green (#00FF9C) or electric cyan (#3DFFEA)
- Headings/body: a clean geometric sans (Inter or Space Grotesk)
- Monospace font (JetBrains Mono or IBM Plex Mono) for tech tags, dates, role labels, and small UI labels — this is what makes a technical portfolio feel credible
- Generous whitespace, confident large hero typography, minimal borders on cards (1px white/10%, brightens to accent color on hover), no heavy shadows or gradients
- Very low-opacity dot/grid pattern in the hero background as a subtle network motif — restrained, not literal
- Micro-interactions: gentle fade/slide-in on scroll, hover = slight scale + border glow, smooth anchor scrolling, sticky nav that shrinks on scroll with active-section highlighting
- Fully responsive, mobile-first, accessible (proper contrast, focus states, alt text)

## Site Structure

### 1. Hero
- Name: Abhinab Das
- Title: "DeFi Engineer & Web3 Security Researcher"
- Optional typed/rotating subtitle cycling through: "Smart Contract Security" / "Blockchain Engineering" / "Zero-Knowledge Systems"
- One-line positioning statement (editable placeholder): "Building and breaking smart contracts — from Hyperledger supply chains to real-time exploit detection on EVM."
- Small terminal-style status badge: "Currently: Web3 Security Researcher @ SentielX Solutions"
- CTAs: "View Projects" (scrolls to projects), "Resume" (opens PDF), "Contact"
- Social icons: GitHub, LinkedIn, Email

### 2. About
- B.Tech in Engineering Physics, IIT Guwahati (2022–Present), CGPA 8.3
- 2–3 sentence bio bridging a physics background with blockchain security specialization
- Stat row: "8.3 CGPA" · "6+ Hackathon Wins" · "5+ Chains Worked On" · "Top 60 Move Developers in India"

### 3. Experience (vertical timeline)
- SentielX.Solutions — Web3 Security Researcher — Apr 2025–Ongoing, Remote
  Real-time protection layer for smart contracts: automated static and dynamic analysis, runtime monitoring, mempool scanning for front-running detection, and on-chain anomaly detection to safeguard dApps from exploits and vulnerabilities.
- IQApex Labs — Blockchain Developer Intern — May 2024–Jul 2024, Remote
  Built the backend and blockchain server for SupplyX, a decentralized food supply-chain system on Hyperledger Fabric with real-time order tracking and farm-to-fork traceability; deployed on Docker/AWS/Kubernetes handling 1,000+ transactions/day with fabric-ca identity management. Resulted in a bounty from the State Government.
- Core Team, Finance and Economics Club, IIT Guwahati — Apr 2024–Apr 2025

### 4. Projects (card grid, filterable by tag: Security / DeFi / NFT / ZK)
Each card needs: title, one-line description, monospace tech-tag pills, award badge if applicable, and GitHub/Devfolio link.

1. **CryptoMilan** — Dec 2024 — Coindcx Unfold Hackathon — Won 2 tracks
   Proof-of-Attendance Protocol for Web3 events. Geofencing lets attendees collect exclusive 3D POAPs as proof of participation; AR/AI unlocks rewards like discounts, NFTs, and exclusive perks.

2. **CritiQ** — Jul 2024 — Hack4Bengal — Won 2 tracks
   Blockchain-based review management system on Avalanche for storage and smart contract deployment, Diamante Net for reward distribution, router-nitro SDK for cross-chain liquidity migration, and Llama-based genkit integration for review authenticity plus AI-based customer calls.

3. **Suiza** — Jan 2025 — Sui Typhoon
   Privacy-preserving fitness protocol on Sui using zkCircom circuits — selective health-data disclosure via zero-knowledge proofs with on-chain commitment and off-chain storage. Integrates Eliza AI agents with real-time Fitbit data and Move-to-Earn smart contracts.

4. **ChainTune** — Feb 2024 — Aptos Winter School — Best Use of Move
   Decentralized music platform on Aptos. Move smart contracts enable NFT-based music releases, automated royalty distribution, and listen-count-based artist staking/refund logic, with IPFS for decentralized media storage.

### 5. Skills (grouped pill tags, monospace font)
- Programming: C/C++, Solidity, Rust, Cadence, Bitcoin Script, Move
- Web3 Security: Fuzzing, Static Analysis (Slither, Aderyn), Manual Auditing
- Blockchain: EVM (Base, Avalanche, Polygon), Filecoin, Hyperledger Fabric, Solana, Flow, Diamante
- Web Dev: React, Ethers.js, Web3.js, TypeScript

### 6. Achievements (compact grid — show top 6, "show more" to expand)
- CoinDCX Unfold'24 — Won 2 tracks: Aptos Consumer Track, Best Okto Wallet Integration
- Aptos Winter School 2024 — Top 60 Move Developers in India; Best Use of Move (Chaintune)
- Hack4Bengal 2023 — Won 2 tracks with CritiQ: Router Protocol Integration, Diamante Blockchain Application
- Navishkar 2024 — Top 3 team, government-initiated innovation competition (SupplyX)
- Decenbuild SocialFi — 3rd place, Global Lens Protocol hackathon
- NTSE / IOQM 2020 — Fizika State Topper, 17th National Rank, PhysicBrawl Winner, OPHO Scholar

### 7. Education (compact table)
- B.Tech Engineering Physics, IIT Guwahati — CGPA 8.3 — 2022–Present
- Senior Secondary, WBCHSE — 95.87% — 2022
- Secondary, WBCHSE — 97.89% — 2020

### 8. Contact / Footer
- Email: abhinabiitg@gmail.com
- Mailto CTA button or simple contact form
- GitHub and LinkedIn icons

## Technical Requirements
- React + TypeScript + Tailwind CSS
- Component-based structure: Nav, Hero, About, Experience, Projects, Skills, Achievements, Education, Footer
- Sticky nav with smooth-scroll anchor links and active-section highlighting
- Downloadable resume PDF button in nav and hero
- Optimized images, semantic HTML, SEO meta tags (title, description, OG image), favicon
- Keep project and achievement cards scannable — no dense text walls

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2ba8139c-6ecf-462c-a1b5-a0dc67cd073f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
