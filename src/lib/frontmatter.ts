import { load } from "js-yaml";

export type Frontmatter = { data: Record<string, unknown>; content: string };

const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function parseFrontmatter(raw: string): Frontmatter {
  const match = FM_RE.exec(raw);
  if (!match) return { data: {}, content: raw };
  const parsed = load(match[1] ?? "");
  return {
    data: parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {},
    content: raw.slice(match[0].length),
  };
}

export default parseFrontmatter;
