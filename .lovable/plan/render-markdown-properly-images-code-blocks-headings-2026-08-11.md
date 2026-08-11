# Render markdown properly (images, code blocks, headings)

Right now the article page does not render markdown at all — it splits the body on newlines and wraps each line in a paragraph. So `![Architecture](./Architecture.jpeg)`, fenced code blocks, headings, lists and links all show up as raw text.

## What to build

1. Add a real markdown renderer
   - Install `react-markdown`, `remark-gfm` (tables, strikethrough, task lists) and `rehype-highlight` (syntax highlighting for fenced code blocks).
   - New `src/components/portfolio/Markdown.tsx` that renders the body with styled elements matching the current design tokens: serif headings, mono code, accent links, bordered tables, `card-surface`-style code blocks. No hardcoded colors.
   - Use it in `src/routes/articles.$slug.tsx` in place of the split-on-newline paragraphs. Projects get the same treatment if a project detail body exists.

2. Images inside markdown
   - Support both patterns:
     - `![Architecture](/images/architecture.jpeg)` — file dropped in `public/images/`, works as-is, best for most cases.
     - `![Architecture](./architecture.jpeg)` — file sitting next to the `.md` in `src/content/articles/`. The loader resolves these relative paths through a Vite glob of the content folder's image files so the bundled URL is used.
   - Images render responsive, rounded, with the alt text shown as a caption.

3. Code block styling
   - Highlight theme wired through CSS variables in `src/styles.css` so it stays on-palette (terminal green accent, dark surface), plus horizontal scroll on overflow and a mono font stack.
   - Inline code gets a subtle bordered chip style.

## After this, authoring stays one file

```text
src/content/articles/my-post.md          <- frontmatter + body
src/content/articles/architecture.jpeg   <- referenced as ./architecture.jpeg
```

Fenced code blocks with a language tag get highlighted:

    ```solidity
    function withdraw() external { ... }
    ```

## Technical notes

- `Markdown.tsx` maps `img`, `code`, `pre`, `a`, `h2`/`h3`, `table` to design-system classes; external links open in a new tab.
- Relative image resolution happens in `src/lib/content.ts` via `import.meta.glob('/src/content/**/*.{png,jpg,jpeg,webp,svg}', { eager: true })`, rewriting `./x.jpeg` to the hashed asset URL at parse time.
- No change to frontmatter fields, filtering, sorting or card layout.
