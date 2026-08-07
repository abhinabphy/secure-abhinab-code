import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

// ---------------------------------------------------------------------------
// Swap these placeholders for real posts — layout below needs no changes.
// ---------------------------------------------------------------------------
export type Post = {
  title: string;
  excerpt: string;
  date: string; // ISO date
  tags: string[];
  slug: string;
};

export const POSTS: Post[] = [
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

const SORTS = ["Latest", "Oldest", "A–Z"] as const;
type Sort = (typeof SORTS)[number];

const ALL_TAGS = Array.from(new Set(POSTS.flatMap((p) => p.tags))).sort();

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function Articles() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("Latest");

  const toggle = (tag: string) =>
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  const shown = useMemo(() => {
    const filtered =
      selected.length === 0
        ? POSTS
        : POSTS.filter((p) => p.tags.some((t) => selected.includes(t)));
    return [...filtered].sort((a, b) => {
      if (sort === "A–Z") return a.title.localeCompare(b.title);
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sort === "Oldest" ? diff : -diff;
    });
  }, [selected, sort]);

  return (
    <Section id="articles" index="04" title="Articles">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles by tag">
          <button
            type="button"
            aria-pressed={selected.length === 0}
            onClick={() => setSelected([])}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
              selected.length === 0
                ? "border-primary/60 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            all
          </button>
          {ALL_TAGS.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={selected.includes(t)}
              onClick={() => toggle(t)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                selected.includes(t)
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {t.toLowerCase()}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2">
          <span className="mono-label">sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort articles"
            className="rounded-md border border-border bg-secondary/40 px-2.5 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-primary/50"
          >
            {SORTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {shown.length === 0 ? (
        <p className="card-surface p-8 text-center text-sm text-muted-foreground">
          No posts match these filters.
        </p>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2">
          {shown.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 70}>
                <article className="card-surface flex h-full flex-col p-6">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                    <a
                      href={`/writing/${p.slug}`}
                      aria-label={`Read ${p.title}`}
                      className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>
                  <div className="mono-label mt-1.5">{formatDate(p.date)}</div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded border border-border px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
