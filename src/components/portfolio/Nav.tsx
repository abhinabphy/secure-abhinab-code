import { useEffect, useState } from "react";
import { NAV_SECTIONS, RESUME_URL } from "./data";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

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
        <a href="#top" className="flex min-w-0 items-center gap-2">
          <span className="font-mono text-sm text-primary">~/</span>
          <span className="truncate text-sm font-semibold tracking-tight">abhinab das</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`rounded-md px-3 py-1.5 font-mono text-xs tracking-wide transition-colors ${
                  active === s.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label.toLowerCase()}
              </a>
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
        <ul className="mx-auto mt-3 grid max-w-6xl grid-cols-2 gap-1 px-5 pb-3 md:hidden">
          {NAV_SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                {s.label.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
