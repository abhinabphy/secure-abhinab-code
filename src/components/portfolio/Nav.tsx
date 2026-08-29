import { useCallback, useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Download,
  FileText,
  FolderKanban,
  House,
  Mail,
  Moon,
  Sun,
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { EMAIL, GITHUB, LINKEDIN, NAV_LINKS, RESUME_URL } from "./data";
import { GithubMark, LinkedinMark, XMark } from "./BrandIcons";

const NAV_ICONS = {
  "/experience": BriefcaseBusiness,
  "/projects": FolderKanban,
  "/articles": FileText,
} as const;

const STROKE = 2;

function getInitialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // ignore
  }
  return "dark";
}

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  return (
    <header className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 sm:bottom-7">
      <nav
        aria-label="Main"
        className="dock-shell flex w-fit max-w-full items-center gap-0.5 rounded-[1.4rem] border px-2.5 py-2 backdrop-blur-2xl sm:gap-1 sm:px-3"
        style={{
          backgroundColor: "var(--dock-bg)",
          borderColor: "var(--dock-border)",
        }}
      >
        <Link to="/" aria-label="Home" title="Home" data-active={pathname === "/"} className="dock-item dock-nav">
          <House strokeWidth={STROKE} />
        </Link>
        {NAV_LINKS.map((item) => {
          const Icon = NAV_ICONS[item.to];
          const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-label={item.label}
              title={item.label}
              data-active={active}
              className="dock-item dock-nav"
            >
              <Icon strokeWidth={STROKE} />
            </Link>
          );
        })}

        <span aria-hidden className="dock-divider" />

        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Resume"
          title="Resume"
          className="dock-item dock-nav"
        >
          <Download strokeWidth={STROKE} />
        </a>

        <span aria-hidden className="dock-divider dock-divider-main" />

        <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className="dock-item dock-brand">
          <GithubMark className="dock-brand-svg" />
        </a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className="dock-item dock-brand">
          <LinkedinMark className="dock-brand-svg" />
        </a>
        <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X" title="X" className="dock-item dock-brand">
          <XMark className="dock-brand-svg" />
        </a>
        <a href={`mailto:${EMAIL}`} aria-label="Email" title="Email" className="dock-item">
          <Mail strokeWidth={STROKE} />
        </a>

        <span aria-hidden className="dock-divider" />

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="dock-item"
        >
          {theme === "dark" ? <Sun strokeWidth={STROKE} /> : <Moon strokeWidth={STROKE} />}
        </button>
      </nav>
    </header>
  );
}
