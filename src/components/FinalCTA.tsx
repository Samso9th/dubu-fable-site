import { useRef } from "react";
import { gsap, useGSAP, revealUp, prefersReducedMotion } from "../lib/gsap";
import { WAITLIST_URL } from "../data/content";

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealUp("[data-cta]", root.current!, { stagger: 0.12 });

      if (prefersReducedMotion()) return;
      gsap.to("[data-glow]", {
        scale: 1.25,
        opacity: 0.9,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden py-28 text-center sm:py-40"
    >
      <div
        data-glow
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.08] blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
        <div data-cta data-reveal className="mb-10 flex justify-center">
          <div className="flex items-start gap-3">
            <img src="/icon.png" alt="Dubu" className="h-9 w-9 rounded-full" />
            <p className="bubble-received max-w-xs px-4 py-3 text-left text-sm leading-snug text-cream">
              I'm here whenever you're ready. Just save my number and say hi! 👋
            </p>
          </div>
        </div>

        <h2 data-cta data-reveal className="display-hero text-cream">
          Just say <span className="text-gold">hi.</span>
        </h2>

        <p data-cta data-reveal className="mx-auto mt-6 max-w-md text-lg text-mist">
          Join the waitlist or start a conversation with Dubu the moment we
          launch.
        </p>

        <div
          data-cta
          data-reveal
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <span className="relative inline-flex flex-col items-center gap-2.5 pt-3">
            <span className="absolute -top-0.5 z-10 rounded-full border border-gold/60 bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold shadow-[0_4px_16px_-4px_rgba(0,0,0,0.6)]">
              Coming soon
            </span>
            <span className="btn-gold inline-flex cursor-not-allowed items-center gap-2 rounded-full px-8 py-4 font-semibold opacity-70">
              Chat on WhatsApp
            </span>
          </span>
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium text-cream"
          >
            Join the Waitlist <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
