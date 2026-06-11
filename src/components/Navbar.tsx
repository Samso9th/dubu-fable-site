import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { NAV_LINKS, WAITLIST_URL } from "../data/content";

export function Navbar({ started }: { started: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      if (!started) return;
      gsap.fromTo(
        root.current,
        { y: -64, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "expo.out", delay: 0.2 }
      );
    },
    { dependencies: [started] }
  );

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        ref={root}
        className={`fixed inset-x-0 top-0 z-[90] opacity-0 transition-colors duration-300 ${
          scrolled ? "nav-solid" : ""
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <img src="/icon.png" alt="" className="h-8 w-8 rounded-lg" />
            <span className="font-display text-xl tracking-wide">DUBU</span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-mist transition-colors hover:text-cream"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-gold hidden rounded-full px-5 py-2.5 text-sm font-semibold sm:inline-flex"
            >
              Get Early Access
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span
                className={`block h-px w-6 bg-cream transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-cream transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[85] flex flex-col justify-center bg-ink px-8 transition-opacity duration-400 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`display-lg py-2 text-cream transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={WAITLIST_URL}
          target="_blank"
          rel="noreferrer"
          className={`btn-gold mt-10 inline-flex w-fit rounded-full px-7 py-3.5 font-semibold transition-all duration-500 ${
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: open ? "400ms" : "0ms" }}
        >
          Get Early Access
        </a>
      </div>
    </>
  );
}
