import { useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/cookies", label: "Cookie Policy" },
];

const COMPANY_LINKS = [
  { to: "/about", label: "About" },
  { to: "/seminar", label: "Seminar" },
  { to: "/contact", label: "Contact" },
  { to: "/careers", label: "Careers" },
];

/** Shared chrome (header + footer) for all standalone sub-pages. */
export function PageChrome({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <div className="grain min-h-screen bg-ink text-cream">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/icon.png" alt="" className="h-8 w-8 rounded-lg" />
            <span className="font-display text-xl tracking-wide">DUBU</span>
          </Link>
          <Link to="/" className="text-sm text-mist transition-colors hover:text-cream">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-20">{children}</main>

      <footer className="border-t border-line bg-ink-soft">
        <div className="mx-auto max-w-3xl space-y-5 px-6 py-8">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            {COMPANY_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="text-mist transition-colors hover:text-cream">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-mist/70 sm:flex-row">
            <span>© {new Date().getFullYear()} Dubu. All rights reserved.</span>
            <div className="flex flex-wrap items-center justify-center gap-5">
              {LEGAL_LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="transition-colors hover:text-cream">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
