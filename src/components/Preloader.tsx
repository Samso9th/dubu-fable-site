import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        setGone(true);
        doneRef.current();
        return;
      }

      const counter = { v: 0 };
      const num = root.current!.querySelector<HTMLElement>("[data-counter]");

      const tl = gsap.timeline({
        onComplete: () => {
          setGone(true);
          doneRef.current();
        },
      });

      tl.fromTo(
        "[data-pre-logo]",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out" }
      )
        .to(
          counter,
          {
            v: 100,
            duration: 1.1,
            ease: "power2.inOut",
            onUpdate: () => {
              if (num) num.textContent = String(Math.round(counter.v));
            },
          },
          0.1
        )
        .to("[data-pre-inner]", {
          autoAlpha: 0,
          y: -20,
          duration: 0.35,
          ease: "power2.in",
        })
        .to(root.current, {
          yPercent: -100,
          duration: 0.7,
          ease: "expo.inOut",
        });
    },
    { scope: root }
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      aria-hidden="true"
    >
      <div data-pre-inner className="flex flex-col items-center gap-6">
        <div data-pre-logo className="flex items-center gap-3 opacity-0">
          <img src="/icon.png" alt="" className="h-12 w-12 rounded-xl" />
          <span className="font-display text-4xl tracking-wide text-cream">
            DUBU
          </span>
        </div>
        <div className="font-display text-sm text-gold tabular-nums">
          <span data-counter>0</span>%
        </div>
      </div>
    </div>
  );
}
