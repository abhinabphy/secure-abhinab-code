import { useCallback, useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Download,
  FileText,
  FolderKanban,
  Github,
  House,
  Linkedin,
  Mail,
  Moon,
  Sun,
  X as XIcon,
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { EMAIL, GITHUB, LINKEDIN, NAV_LINKS, RESUME_URL } from "./data";

const NAV_ICONS = {
  "/experience": BriefcaseBusiness,
  "/projects": FolderKanban,
  "/articles": FileText,
} as const;

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
        className="flex w-fit max-w-full items-center gap-1 rounded-full border p-1.5 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:gap-1.5 sm:p-2"
        style={{
          backgroundColor: "var(--dock-bg)",
          borderColor: "var(--dock-border)",
        }}
      >
        {/* Site navigation group */}
        <Link
          to="/"
          aria-label="Home"
          title="Home"
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors sm:h-10 sm:w-10 ${
            pathname === "/"
              ? "text-[var(--dock-active-fg)]"
              : "text-[var(--dock-icon)] hover:text-[var(--dock-hover-fg)]"
          }`}
          style={pathname === "/" ? { backgroundColor: "var(--dock-active-bg)" } : undefined}
        >
          <House className="h-[17px] w-[17px]" strokeWidth={1.75} />
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
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all sm:h-10 sm:w-10 ${
                active
                  ? "text-[var(--dock-active-fg)]"
                  : "text-[var(--dock-icon)] hover:-translate-y-0.5 hover:text-[var(--dock-hover-fg)]"
              }`}
              style={active ? { backgroundColor: "var(--dock-active-bg)" } : undefined}
            >
              <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
            </Link>
          );
        })}

        <span aria-hidden className="dock-divider" />

        {/* External social group */}
        <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className="dock-icon">
          <Github strokeWidth={1.75} />
        </a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className="dock-icon">
          <Linkedin strokeWidth={1.75} />
        </a>
        <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X" title="X" className="dock-icon">
          <XIcon strokeWidth={1.75} />
        </a>
        <a href={`mailto:${EMAIL}`} aria-label="Email" title="Email" className="dock-icon">
          <Mail strokeWidth={1.75} />
        </a>
        <a href={RESUME_URL} target="_blank" rel="noreferrer" aria-label="Resume" title="Resume" className="dock-icon">
          <Download strokeWidth={1.75} />
        </a>

        <span aria-hidden className="dock-divider" />

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="dock-icon"
        >
          {theme === "dark" ? (
            <Sun className="h-[17px] w-[17px]" strokeWidth={1.75} />
          ) : (
            <Moon className="h-[17px] w-[17px]" strokeWidth={1.75} />
          )}
        </button>
      </nav>
    </header>
  );
}
