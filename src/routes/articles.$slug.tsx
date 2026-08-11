import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Page } from "@/components/portfolio/Page";
import { Reveal } from "@/components/portfolio/Reveal";
import { formatDate, usePosts } from "@/components/portfolio/posts";

export const Route = createFileRoute("/articles/$slug")({
  component: ArticleDetail,
  head: () => ({
    meta: [
      { title: "Article — Abhinab Das" },
      { name: "description", content: "An article by Abhinab Das on Web3 security research." },
      { property: "og:title", content: "Article — Abhinab Das" },
      {
        property: "og:description",
        content: "An article by Abhinab Das on Web3 security research.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
});

function ArticleDetail() {
  const { slug } = Route.useParams();
  const posts = usePosts();
  const post = posts.find((p) => p.slug === slug);

  return (
    <Page>
      <article className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
        <Link
          to="/articles"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> all articles
        </Link>

        {!post ? (
          <p className="card-surface mt-8 p-8 text-center text-sm text-muted-foreground">
            This article could not be found.
          </p>
        ) : (
          <Reveal>
            <h1 className="mt-8 font-serif text-4xl font-normal tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <div className="mono-label mt-4">{formatDate(post.date)}</div>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <li
                  key={t}
                  className="rounded border border-border px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p className="text-foreground/90">{post.excerpt}</p>
              {post.body ? (
                <Markdown>{post.body}</Markdown>
              ) : (
                <p>
                  Full write-up coming soon. This is a placeholder body for the article template —
                  headings, code samples and diagrams will render in this column.
                </p>
              )}
            </div>

          </Reveal>
        )}
      </article>
    </Page>
  );
}
