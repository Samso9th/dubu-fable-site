import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./lib/gsap";
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Ticker } from "./components/Ticker";
import { BeforeAfter } from "./components/BeforeAfter";
import { ChatShowcase } from "./components/ChatShowcase";
import { Moments } from "./components/Moments";
import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { Trust } from "./components/Trust";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      document.documentElement.classList.add("reduced-motion");
      return;
    }

    const lenis = new Lenis({ lerp: 0.12, anchors: true });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Keep ScrollTrigger measurements honest once everything (fonts, images) lands
  useEffect(() => {
    if (!ready) return;
    // defer the (layout-heavy) refresh a frame so the hero intro animates on a clean thread
    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    return () => window.removeEventListener("load", refresh);
  }, [ready]);

  return (
    <div className="grain">
      <Preloader onDone={() => setReady(true)} />
      <Navbar started={ready} />
      <main>
        <Hero started={ready} />
        <Ticker />
        <BeforeAfter />
        <ChatShowcase />
        <Moments />
        <HowItWorks />
        <Features />
        <Trust />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
