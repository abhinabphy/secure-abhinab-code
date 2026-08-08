import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { NAV_LINKS, RESUME_URL } from "./data";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-background/85 py-2 backdrop-blur-xl"
          : "border-transparent bg-transparent py-4"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5"
      >
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="font-mono text-sm text-primary">~/</span>
          <span className="truncate text-sm font-semibold tracking-tight">abhinab das</span>
          <span aria-hidden className="terminal-cursor" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((s) => (
            <li key={s.to}>
              <Link
                to={s.to}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="rounded-md px-3 py-1.5 font-mono text-xs tracking-wide transition-colors"
              >
                {s.label.toLowerCase()}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-primary/40 px-3 py-1.5 font-mono text-xs text-primary transition-colors hover:bg-primary/10"
          >
            resume
          </a>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border px-3 py-1.5 font-mono text-xs md:hidden"
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="mx-auto mt-3 grid max-w-6xl grid-cols-2 gap-1 border-t border-border bg-background/95 px-5 pb-3 pt-3 backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((s) => (
            <li key={s.to}>
              <Link
                to={s.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="block rounded-md px-3 py-2 font-mono text-xs"
              >
                {s.label.toLowerCase()}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
