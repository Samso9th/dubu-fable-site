import { useRef } from "react";
import { useGSAP, revealUp } from "../lib/gsap";
import { SectionHeading } from "./SectionHeading";
import { PARTNERS, TRUST_POINTS } from "../data/content";

export function Trust() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealUp("[data-partner]", root.current!, { stagger: 0.12 });
      revealUp("[data-points]", root.current!, {
        scrollTrigger: {
          trigger: root.current!.querySelector("[data-points]")!,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="security" className="bg-paper py-24 text-pine sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          dark={false}
          kicker="Security & trust"
          title={
            <>
              Your money never moves{" "}
              <span className="text-gold-deep">without your word</span>
            </>
          }
          blurb="One message. One word. No exceptions. Every transfer waits for your explicit confirmation."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {PARTNERS.map((p) => (
            <div
              key={p.title}
              data-partner
              data-reveal
              className="flex flex-col rounded-3xl border border-line-paper bg-white p-7 shadow-[0_16px_40px_-24px_rgba(20,40,30,0.25)]"
            >
              <div className="flex h-14 items-center gap-4">
                {p.logos.map((logo) => (
                  <img
                    key={logo}
                    src={logo}
                    alt=""
                    className="max-h-10 w-auto max-w-[120px] object-contain"
                  />
                ))}
              </div>
              <h3 className="mt-5 font-display text-xl uppercase tracking-wide text-pine">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-pine-soft">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div
          data-points
          data-reveal
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {TRUST_POINTS.map((point) => (
            <span
              key={point}
              className="rounded-full border border-pine/15 bg-pine/[0.04] px-5 py-2.5 text-sm font-medium text-pine"
            >
              🛡 {point}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
