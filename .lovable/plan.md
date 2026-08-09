# Markdown content files + About page alignment

## 1. Articles and projects become markdown files

Every article and project becomes one `.md` file with YAML frontmatter. Dropping a new file into the right folder publishes it — no other file changes.

**Folders**

```text
src/content/articles/reentrancy-beyond-the-classic-pattern.md
src/content/projects/cryptomilan.md
```

**Article frontmatter:** `title`, `date` (ISO), `tags` (list), `excerpt`, optional `slug` (otherwise derived from filename). Body below the frontmatter is the long-form write-up shown on the article detail page.

**Project frontmatter:** `title`, `date`, `tags` (list), `excerpt`, `links` (named URLs such as `github`, `devfolio`), optional `badge` (e.g. "Won 2 tracks"), optional `slug`. Body may be empty for card-only projects.

**Migration:** the four existing articles and four existing projects are rewritten as markdown files with identical content, so nothing visibly changes. Project `event` text folds into the card line alongside the date, and `tech` is covered by the tags list — card layout stays the same.

**Behavior preserved exactly:** tag filter pills, sorting (latest / oldest / A–Z), empty state, card styling, lowercase mono tags. Only the data source changes.

## 2. About page alignment

The portrait and the bio column will be one grid row sharing the same top edge, with the photo constrained to a fixed aspect ratio and capped width so it matches the bio block's proportions instead of stretching. On narrow screens the photo stacks cleanly (full-width, same aspect) above the text. No other About content changes.

## Technical notes

- Add the `gray-matter` dependency.
- New `src/lib/content.ts`: `import.meta.glob('/src/content/articles/*.md', { eager: true, query: '?raw', import: 'default' })` for each folder, parse each raw string with gray-matter, derive slug from the filename when frontmatter omits it, and return typed `Article[]` / `Project[]` sorted by date.
- `src/components/portfolio/posts.ts` re-exports from the loader; `Articles.tsx`, `articles.$slug.tsx`, `Projects.tsx` and `data.ts` read from it.
- Delete `src/data/articles.ts` and `src/data/projects.ts`; drop the `PROJECTS` re-export from `data.ts`.
- Article body renders as paragraphs in the existing prose column (same as today's body handling).
- Verify by adding a throwaway `.md` file to each folder, confirming it appears, then removing it.
