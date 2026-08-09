import matter from "gray-matter";

export type Article = {
  title: string;
  excerpt: string;
  /** ISO date */
  date: string;
  tags: string[];
  slug: string;
  body: string;
};

export type Project = {
  title: string;
  date: string;
  event?: string;
  badge?: string;
  excerpt: string;
  tags: string[];
  links: Record<string, string>;
  slug: string;
  body: string;
};

const articleFiles = import.meta.glob("/src/content/articles/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const projectFiles = import.meta.glob("/src/content/projects/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function slugFromPath(path: string) {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v));
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}

function toIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function byDateDesc(a: { date: string }, b: { date: string }) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function parseAll(files: Record<string, string>) {
  return Object.entries(files).map(([path, raw]) => {
    const { data, content } = matter(raw);
    return {
      data: data as Record<string, unknown>,
      body: content.trim(),
      slug: (data as Record<string, unknown>)["slug"]
        ? String((data as Record<string, unknown>)["slug"])
        : slugFromPath(path),
    };
  });
}

export const ARTICLES: Article[] = parseAll(articleFiles)
  .map(({ data, body, slug }) => ({
    title: String(data["title"] ?? slug),
    excerpt: String(data["excerpt"] ?? ""),
    date: toIso(data["date"]),
    tags: toStringArray(data["tags"]),
    slug,
    body,
  }))
  .sort(byDateDesc);

export const PROJECTS: Project[] = parseAll(projectFiles)
  .map(({ data, body, slug }) => ({
    title: String(data["title"] ?? slug),
    date: String(data["date"] ?? ""),
    event: data["event"] ? String(data["event"]) : undefined,
    badge: data["badge"] ? String(data["badge"]) : undefined,
    excerpt: String(data["excerpt"] ?? ""),
    tags: toStringArray(data["tags"]),
    links: (data["links"] ?? {}) as Record<string, string>,
    slug,
    body,
  }))
  .sort(byDateDesc);

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
