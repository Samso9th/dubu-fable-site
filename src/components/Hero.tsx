import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { PhoneChat } from "./PhoneChat";
import { HERO_CHAT, WAITLIST_URL } from "../data/content";

const LINES = [
  { text: "Send money", cls: "text-cream" },
  { text: "at the speed", cls: "text-outline-gold" },
  { text: "of chat.", cls: "text-gold" },
];

const PILLS = [
  { label: "₦", cls: "left-[-8%] top-[12%]", delay: 0 },
  { label: "$", cls: "right-[-6%] top-[28%]", delay: 0.4 },
  { label: "£", cls: "left-[-12%] bottom-[30%]", delay: 0.8 },
  { label: "€", cls: "right-[-10%] bottom-[10%]", delay: 1.2 },
];

export function Hero({ started }: { started: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!started) return;
      if (prefersReducedMotion()) {
        gsap.set("[data-line], [data-fade], [data-phone]", {
          autoAlpha: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        "[data-line]",
        { yPercent: 112 },
        { yPercent: 0, duration: 1.2, stagger: 0.12 },
        0.1
      )
        .fromTo(
          "[data-fade]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
          0.5
        )
        .fromTo(
          "[data-phone]",
          { autoAlpha: 0, y: 48, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.3 },
          0.55
        )
        .fromTo(
          "[data-pill]",
          { autoAlpha: 0, scale: 0 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(2)",
          },
          1
        );

      // floating pills — gentle perpetual drift
      gsap.utils.toArray<HTMLElement>("[data-pill]").forEach((pill, i) => {
        gsap.to(pill, {
          y: i % 2 ? 14 : -14,
          duration: 2.6 + i * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.6,
        });
      });

      // scroll parallax on the phone
      gsap.to("[data-phone-wrap]", {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [started] }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden pb-20 pt-28 lg:pb-8 lg:pt-16"
    >
      {/* background glows — radial gradients (same soft glow, no blur-filter cost) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute right-[-18%] top-[-28%] h-[820px] w-[820px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(40 90% 49% / 0.12), transparent 62%)" }}
        />
        <div
          className="absolute bottom-[-32%] left-[-12%] h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(142 70% 49% / 0.14), transparent 62%)" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(40 90% 49% / 0.08), transparent 66%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        {/* Copy */}
        <div>
          <div data-fade className="opacity-0">
            <span className="kicker inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.06] px-4 py-2 text-gold">
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-gold pulse-dot" />
              Now accepting early access
            </span>
          </div>

          <h1 className="display-hero mt-7">
            {LINES.map((l) => (
              <span key={l.text} className="block overflow-hidden pb-[0.08em]">
                <span
                  data-line
                  className={`block whitespace-nowrap will-change-transform ${l.cls}`}
                >
                  {l.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-fade
            className="mt-6 max-w-md text-base leading-relaxed text-mist opacity-0 sm:text-lg"
          >
            The first international payment experience built natively for
            WhatsApp. No apps to download, no forms — just save our number and
            start sending.
          </p>

          <div data-fade className="mt-9 flex flex-wrap items-center gap-4 opacity-0">
            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
            >
              Get Started <span aria-hidden>→</span>
            </a>
            <a
              href="#how-it-works"
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-cream"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Phone */}
        <div data-phone-wrap className="relative flex justify-center lg:justify-end">
          <div data-phone className="relative opacity-0">
            <PhoneChat messages={HERO_CHAT} mode="loop" play={started} />
            {PILLS.map((p) => (
              <span
                key={p.label}
                data-pill
                className={`absolute z-20 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-ink-raised font-display text-lg text-gold opacity-0 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] ${p.cls}`}
              >
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
