import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { NAV_LINKS, SOCIALS } from "../data/content";
import { usePlatform } from "../lib/theme";

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/cookies", label: "Cookies" },
];

const COMPANY_LINKS = [
  { to: "/about", label: "About" },
  { to: "/seminar", label: "Seminar" },
  { to: "/contact", label: "Contact" },
  { to: "/careers", label: "Careers" },
];

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const { platform } = usePlatform();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-wordmark]",
        { yPercent: 36 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <footer ref={root} className="overflow-hidden border-t border-line bg-ink-soft">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/icon.png" alt="" className="h-9 w-9 rounded-lg" />
              <span className="font-display text-2xl tracking-wide">DUBU</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
              Send money worldwide without leaving {platform.name}. The
              simplest way to make international payments.
            </p>
            <a
              href={platform.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-gold mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold"
            >
              Get Started
            </a>
          </div>

          <div>
            <p className="kicker mb-5 text-mist/60">Explore</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-mist transition-colors hover:text-cream"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker mb-5 text-mist/60">Company</p>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-mist transition-colors hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker mb-5 text-mist/60">Follow</p>
            <ul className="space-y-3">
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-mist transition-colors hover:text-cream"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-6 text-xs text-mist/60 sm:flex-row">
          <span>© {new Date().getFullYear()} Dubu. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="transition-colors hover:text-cream">
                {l.label}
              </Link>
            ))}
          </div>
          <span>
            Works on WhatsApp · Telegram · Slack · Discord. Powered by Dubu
            Business API.
          </span>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="relative flex justify-center overflow-hidden" aria-hidden="true">
        <span
          data-wordmark
          className="font-display block translate-y-[8%] text-[28vw] leading-[0.78] text-outline select-none sm:text-[26vw]"
        >
          DUBU
        </span>
      </div>
    </footer>
  );
}
