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
        className="flex w-fit max-w-full items-center gap-1.5 rounded-full border p-2 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:gap-2 sm:p-2.5"
        style={{
          backgroundColor: "var(--dock-bg)",
          borderColor: "var(--dock-border)",
        }}
      >
        {/* Site navigation group: Home, Experience, Projects, Articles */}
        <Link
          to="/"
          aria-label="Home"
          title="Home"
          data-active={pathname === "/"}
          className="dock-item"
        >
          <House strokeWidth={1.75} />
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
              className="dock-item"
            >
              <Icon strokeWidth={1.75} />
            </Link>
          );
        })}

        <span aria-hidden className="dock-divider" />

        {/* Resume / download */}
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Resume"
          title="Resume"
          className="dock-item"
        >
          <Download strokeWidth={1.75} />
        </a>

        <span aria-hidden className="dock-divider" />

        {/* Social cluster: GitHub, LinkedIn, X, Email */}
        <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className="dock-item">
          <Github strokeWidth={1.75} />
        </a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className="dock-item">
          <Linkedin strokeWidth={1.75} />
        </a>
        <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X" title="X" className="dock-item">
          <XIcon strokeWidth={1.75} />
        </a>
        <a href={`mailto:${EMAIL}`} aria-label="Email" title="Email" className="dock-item">
          <Mail strokeWidth={1.75} />
        </a>

        <span aria-hidden className="dock-divider" />

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="dock-item"
        >
          {theme === "dark" ? <Sun strokeWidth={1.75} /> : <Moon strokeWidth={1.75} />}
        </button>
      </nav>
    </header>
  );
}
