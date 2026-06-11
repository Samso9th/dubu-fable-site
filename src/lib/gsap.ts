import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export const EASE = "expo.out";

/** Standard fade-up reveal tied to scroll. */
export function revealUp(
  targets: gsap.TweenTarget,
  trigger: Element,
  vars: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 36 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1.1,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: {
        trigger,
        start: "top 78%",
        once: true,
      },
      ...vars,
    }
  );
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
