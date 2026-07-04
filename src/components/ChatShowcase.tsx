import { useRef, useState } from "react";
import { ScrollTrigger, useGSAP } from "../lib/gsap";
import { useMediaQuery } from "../lib/hooks";
import { SectionHeading } from "./SectionHeading";
import { PhoneChat } from "./PhoneChat";
import { DEMO_TABS } from "../data/content";
import { usePlatform } from "../lib/theme";

export function ChatShowcase() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { platformId } = usePlatform();

  useGSAP(
    () => {
      if (!isDesktop) return;
      const steps = root.current!.querySelectorAll("[data-step]");
      const triggers: ScrollTrigger[] = [];
      steps.forEach((step, i) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: step,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          })
        );
      });
      return () => triggers.forEach((t) => t.kill());
    },
    { scope: root, dependencies: [isDesktop], revertOnUpdate: true }
  );

  return (
    <section ref={root} id="chat-demo" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Conversational"
          title="Talk to Dubu like a friend"
          blurb="No special commands or menus. Text it, say it, or snap it — Dubu understands however you communicate."
        />

        {isDesktop ? (
          <div className="mt-20 grid grid-cols-[1fr_auto] gap-20">
            {/* Steps */}
            <div>
              {DEMO_TABS.map((tab, i) => (
                <div
                  key={tab.id}
                  data-step
                  className={`flex min-h-[70vh] flex-col justify-center transition-opacity duration-500 ${
                    active === i ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <span className="font-display text-7xl text-outline-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-lg mt-5 text-cream">{tab.headline}</h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-mist">
                    {tab.blurb}
                  </p>
                  <span className="kicker mt-6 text-gold">{tab.label}</span>
                </div>
              ))}
            </div>

            {/* Sticky phone */}
            <div className="relative">
              <div className="sticky top-[max(6rem,calc(50vh-280px))]">
                <PhoneChat
                  key={`${active}-${platformId}`}
                  messages={DEMO_TABS[active].messages}
                  mode="instant"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center">
            {/* Tabs */}
            <div
              className="flex w-full max-w-md gap-2 rounded-full border border-line bg-ink-soft p-1.5"
              role="tablist"
            >
              {DEMO_TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={`flex-1 rounded-full px-3 py-2.5 text-[12px] font-medium transition-colors duration-300 ${
                    active === i
                      ? "bg-gold text-ink"
                      : "text-mist hover:text-cream"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <p className="mt-6 max-w-sm text-center text-sm leading-relaxed text-mist">
              {DEMO_TABS[active].blurb}
            </p>

            <div className="mt-8">
              <PhoneChat
                key={`${active}-${platformId}`}
                messages={DEMO_TABS[active].messages}
                mode="instant"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
