import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { addPost, formatDate, usePosts } from "./posts";

const SORTS = ["Latest", "Oldest", "A–Z"] as const;
type Sort = (typeof SORTS)[number];

function AddArticleForm({ onDone }: { onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [body, setBody] = useState("");

  const field =
    "w-full rounded-md border border-border bg-secondary/40 px-3 py-2 font-mono text-xs text-foreground transition-colors focus:border-primary/60";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addPost({
          title: title.trim(),
          excerpt: excerpt.trim() || "No excerpt yet.",
          date,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          body: body.trim(),
        });
        onDone();
      }}
      className="card-surface mb-8 grid gap-3 p-6"
    >
      <label className="grid gap-1.5">
        <span className="mono-label">title</span>
        <input className={field} value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label className="grid gap-1.5">
        <span className="mono-label">excerpt</span>
        <input className={field} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="mono-label">tags (comma separated)</span>
          <input className={field} value={tags} onChange={(e) => setTags(e.target.value)} />
        </label>
        <label className="grid gap-1.5">
          <span className="mono-label">date</span>
          <input
            type="date"
            className={field}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="mono-label">body</span>
        <textarea
          rows={5}
          className={field}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Publish
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-md border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          cancel
        </button>
      </div>
      <p className="font-mono text-[0.7rem] text-muted-foreground">
        Drafts are stored in this browser session only.
      </p>
    </form>
  );
}

export function Articles() {
  const posts = usePosts();
  const [selected, setSelected] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("Latest");
  const [adding, setAdding] = useState(false);

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))).sort(),
    [posts],
  );

  const toggle = (tag: string) =>
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  const shown = useMemo(() => {
    const filtered =
      selected.length === 0
        ? posts
        : posts.filter((p) => p.tags.some((t) => selected.includes(t)));
    return [...filtered].sort((a, b) => {
      if (sort === "A–Z") return a.title.localeCompare(b.title);
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sort === "Oldest" ? diff : -diff;
    });
  }, [posts, selected, sort]);

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
          {allTags.map((t) => (
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

        <div className="flex items-center gap-3">
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
          <button
            type="button"
            onClick={() => setAdding((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 px-3 py-1.5 font-mono text-xs text-primary transition-colors hover:bg-primary/10"
          >
            <Plus className="h-3.5 w-3.5" /> add article
          </button>
        </div>
      </div>

      {adding && <AddArticleForm onDone={() => setAdding(false)} />}

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
                    <h3 className="text-lg font-semibold tracking-tight">
                      <Link
                        to="/articles/$slug"
                        params={{ slug: p.slug }}
                        className="transition-colors hover:text-primary"
                      >
                        {p.title}
                      </Link>
                    </h3>
                    <Link
                      to="/articles/$slug"
                      params={{ slug: p.slug }}
                      aria-label={`Read ${p.title}`}
                      className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </Link>
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
