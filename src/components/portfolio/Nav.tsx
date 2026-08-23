import {
  BriefcaseBusiness,
  Download,
  FileText,
  FolderKanban,
  Github,
  House,
  Linkedin,
  Mail,
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

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 sm:bottom-7">
      <nav
        aria-label="Main"
        className="flex w-fit max-w-full items-center gap-1 rounded-full border border-[#a7c891]/20 bg-[#171916]/90 p-1.5 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:gap-1.5 sm:p-2"
      >
        <Link
          to="/"
          aria-label="Home"
          title="Home"
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors sm:h-10 sm:w-10 ${
            pathname === "/"
              ? "bg-[#a7c891] text-[#182017]"
              : "text-[#b8b3ae] hover:bg-[#a7c891]/10 hover:text-[#c9dfba]"
          }`}
        >
          <House className="h-[17px] w-[17px]" />
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
                  ? "bg-[#a7c891] text-[#182017]"
                  : "text-[#b8b3ae] hover:-translate-y-0.5 hover:bg-[#a7c891]/10 hover:text-[#c9dfba]"
              }`}
            >
              <Icon className="h-[17px] w-[17px]" />
            </Link>
          );
        })}
        <span aria-hidden className="mx-0.5 h-5 w-px bg-[#d9adbd]/20 sm:mx-1 sm:h-6" />
        <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className="dock-icon">
          <Github />
        </a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className="dock-icon">
          <Linkedin />
        </a>
        <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X" title="X" className="dock-icon">
          <XIcon />
        </a>
        <a href={`mailto:${EMAIL}`} aria-label="Email" title="Email" className="dock-icon">
          <Mail />
        </a>
        <a href={RESUME_URL} target="_blank" rel="noreferrer" aria-label="Resume" title="Resume" className="dock-icon text-[#c9dfba]">
          <Download />
        </a>
        <span aria-hidden className="mx-0.5 h-5 w-px bg-[#d9adbd]/20 sm:mx-1 sm:h-6" />
        <button type="button" aria-label="Color theme" title="Color theme" className="dock-icon text-[#d9adbd]">
          <Sun />
        </button>
      </nav>
    </header>
  );
}
