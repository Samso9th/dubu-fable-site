import { useRef } from "react";
import { gsap, useGSAP, revealUp, prefersReducedMotion } from "../lib/gsap";
import { SectionHeading } from "./SectionHeading";
import { OLD_WAY, NEW_WAY, PIDGIN_LINE } from "../data/content";

export function BeforeAfter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealUp("[data-col]", root.current!, { stagger: 0.15 });

      if (prefersReducedMotion()) {
        gsap.set("[data-strike]", { scaleX: 1 });
        return;
      }

      // strike out the old way, one line at a time
      gsap.fromTo(
        "[data-strike]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          ease: "power3.inOut",
          stagger: 0.18,
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: "[data-old-list]",
            start: "top 65%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        "[data-new-item]",
        { autoAlpha: 0, y: 20, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.4)",
          stagger: 0.22,
          scrollTrigger: {
            trigger: "[data-new-list]",
            start: "top 65%",
            once: true,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-paper py-24 text-pine sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          dark={false}
          kicker="The difference"
          title="Why complicate it?"
          blurb="What used to take 6 steps and 3 days now takes 30 seconds."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* The old way */}
          <div data-col data-reveal>
            <p className="kicker mb-6 text-pine-soft">Sending money today</p>
            <ul data-old-list className="space-y-4">
              {OLD_WAY.map((step, i) => (
                <li
                  key={step}
                  className="flex items-baseline gap-4 border-b border-line-paper pb-4"
                >
                  <span className="font-display text-sm text-pine-soft/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative text-lg sm:text-xl">
                    {step}
                    <span
                      data-strike
                      className="absolute left-0 top-1/2 h-[2px] w-full scale-x-0 bg-pine/70"
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Dubu */}
          <div data-col data-reveal>
            <p className="kicker mb-6 text-gold-deep">With Dubu</p>
            <div data-new-list className="space-y-4">
              {NEW_WAY.map((item) => (
                <div
                  key={item.text}
                  data-new-item
                  className={`flex ${
                    item.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span
                    className={`max-w-[85%] px-5 py-3.5 text-lg shadow-md sm:text-xl ${
                      item.from === "user"
                        ? "rounded-[18px_18px_4px_18px] bg-wa-soft text-cream"
                        : "rounded-[18px_18px_18px_4px] bg-white text-pine"
                    }`}
                  >
                    {item.from === "dubu" && (
                      <span className="mr-1.5 text-wa">✓</span>
                    )}
                    {item.text}
                  </span>
                </div>
              ))}

              <div data-new-item className="pt-4">
                <div className="rounded-2xl border border-gold/40 bg-gold/10 px-5 py-4">
                  <p className="kicker mb-1.5 text-gold-deep">In Pidgin</p>
                  <p className="font-medium text-pine">{PIDGIN_LINE}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
