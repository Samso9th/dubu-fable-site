import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { useMediaQuery } from "../lib/hooks";
import { SectionHeading } from "./SectionHeading";
import { MOMENTS, type Moment } from "../data/content";

function MomentCard({ moment, index }: { moment: Moment; index: number }) {
  return (
    <article className="card-glow flex h-full w-[82vw] max-w-[380px] shrink-0 snap-center flex-col rounded-3xl p-7 sm:w-[380px]">
      <div className="flex items-start justify-between">
        <span className="kicker text-gold">{moment.category}</span>
        <span className="font-display text-3xl text-outline">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-6 text-xl leading-snug text-cream">{moment.situation}</p>

      <div className="mt-auto pt-8">
        <p className="text-[11px] uppercase tracking-[0.18em] text-mist/60">
          The old way
        </p>
        <p className="mt-1.5 text-sm text-mist line-through decoration-mist/50">
          {moment.before}
        </p>

        <div className="mt-5 flex items-start gap-2.5">
          <img src="/icon.png" alt="" className="mt-0.5 h-7 w-7 rounded-full" />
          <p className="bubble-received px-3.5 py-2.5 text-sm leading-snug text-cream">
            {moment.reply}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Moments() {
  const root = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useGSAP(
    () => {
      if (!isDesktop || prefersReducedMotion()) return;

      const rail = root.current!.querySelector<HTMLElement>("[data-rail]")!;
      const getDistance = () => rail.scrollWidth - window.innerWidth;

      gsap.to(rail, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: root, dependencies: [isDesktop], revertOnUpdate: true }
  );

  return (
    <section
      ref={root}
      id="moments"
      className="relative overflow-hidden bg-ink-soft py-24 sm:py-28 lg:flex lg:min-h-svh lg:flex-col lg:justify-center"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="left"
          kicker="Real life"
          title={
            <>
              Every moment money needs to move —{" "}
              <span className="text-gold">just tell Dubu</span>
            </>
          }
          blurb="This is not about managing finances. This is about getting on with your life."
        />
      </div>

      <div
        data-rail
        className={`moments-rail mt-14 flex items-stretch gap-5 px-5 sm:px-8 lg:mt-16 ${
          isDesktop
            ? "w-max pr-[14vw]"
            : "snap-x snap-mandatory overflow-x-auto pb-4"
        }`}
      >
        {MOMENTS.map((m, i) => (
          <MomentCard key={m.category} moment={m} index={i} />
        ))}
      </div>

      {!isDesktop && (
        <p className="mt-3 px-5 text-center text-xs text-mist/60">
          Swipe to explore →
        </p>
      )}
    </section>
  );
}
