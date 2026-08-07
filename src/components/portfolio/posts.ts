import { useSyncExternalStore } from "react";

export type Post = {
  title: string;
  excerpt: string;
  date: string; // ISO date
  tags: string[];
  slug: string;
  body?: string;
};

const INITIAL_POSTS: Post[] = [
  {
    title: "Reentrancy Beyond the Classic Pattern",
    excerpt:
      "Cross-function and cross-contract reentrancy paths that checks-effects-interactions alone does not close, with a Foundry test harness to catch them.",
    date: "2025-06-18",
    tags: ["Security", "Solidity"],
    slug: "reentrancy-beyond-the-classic-pattern",
  },
  {
    title: "Reading the Mempool for Front-Running Signals",
    excerpt:
      "How we score pending transactions in real time, and which heuristics survive contact with production traffic on EVM chains.",
    date: "2025-03-02",
    tags: ["Security", "MEV"],
    slug: "reading-the-mempool",
  },
  {
    title: "Move's Resource Model, From a Solidity Brain",
    excerpt:
      "Linear types remove entire vulnerability classes — and introduce new ones. A migration guide for auditors coming from EVM.",
    date: "2024-11-21",
    tags: ["Move", "Solidity"],
    slug: "move-resource-model",
  },
  {
    title: "Practical zk Circuits for Selective Disclosure",
    excerpt:
      "Designing Circom circuits that prove a health metric threshold without revealing the metric, and the on-chain commitment scheme behind it.",
    date: "2024-08-09",
    tags: ["ZK", "Move"],
    slug: "practical-zk-selective-disclosure",
  },
];

let posts: Post[] = INITIAL_POSTS;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export function addPost(input: Omit<Post, "slug"> & { slug?: string }) {
  const slug = input.slug?.trim() || slugify(input.title);
  posts = [{ ...input, slug }, ...posts.filter((p) => p.slug !== slug)];
  emit();
  return slug;
}

export function getPosts() {
  return posts;
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function usePosts() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => posts,
    () => INITIAL_POSTS,
  );
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
