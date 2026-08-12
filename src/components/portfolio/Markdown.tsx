import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="markdown-body space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        urlTransform={(url) => (url.startsWith("data:image/") ? url : defaultUrlTransform(url))}
        components={{
          h1: ({ children }) => (
            <h2 className="mt-12 font-serif text-3xl font-normal tracking-tight text-foreground">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 font-mono text-sm uppercase tracking-widest text-primary">
              {children}
            </h3>
          ),
          p: ({ children }) => <p>{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc space-y-2 pl-5 marker:text-primary/60">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 pl-5 marker:text-primary/60">{children}</ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary/50 pl-4 italic text-foreground/80">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-border" />,
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border px-3 py-2 text-left font-mono text-xs uppercase tracking-wider text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-3 py-2 align-top">{children}</td>
          ),
          img: ({ src, alt }) => (
            <span className="card-surface my-8 block overflow-hidden p-2">
              <img
                src={typeof src === "string" ? src : undefined}
                alt={alt ?? ""}
                loading="lazy"
                className="w-full rounded-md"
              />
              {alt ? (
                <span className="mono-label block px-1 pb-1 pt-2 text-center">{alt}</span>
              ) : null}
            </span>
          ),
          pre: ({ children }) => (
            <pre className="card-surface my-6 overflow-x-auto p-4 font-mono text-[0.85rem] leading-relaxed">
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = Boolean(className);
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded border border-border bg-secondary/50 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                {children}
              </code>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
