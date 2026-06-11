import { useRef } from "react";
import { useGSAP, revealUp } from "../lib/gsap";
import { SectionHeading } from "./SectionHeading";
import { STEPS } from "../data/content";

export function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealUp("[data-step-row]", root.current!, { stagger: 0.18 });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="How it works"
          title="Three steps. Under a minute."
          blurb="No paperwork, no branches, no waiting."
        />

        <div className="mt-16 divide-y divide-line border-y border-line">
          {STEPS.map((step) => (
            <div
              key={step.num}
              data-step-row
              data-reveal
              className="group grid items-center gap-3 py-10 sm:grid-cols-[auto_1fr_1.2fr] sm:gap-10"
            >
              <span className="font-display text-6xl text-outline-gold transition-colors duration-500 sm:text-7xl">
                {step.num}
              </span>
              <h3 className="display-lg text-cream">{step.title}</h3>
              <p className="max-w-md text-base leading-relaxed text-mist sm:text-lg sm:justify-self-end">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
