import { useRef } from "react";
import { useGSAP, revealUp } from "../lib/gsap";
import { SectionHeading } from "./SectionHeading";
import { FEATURES } from "../data/content";
import { usePlatform } from "../lib/theme";

const ICONS = ["💬", "🔔", "👥", "📈"];

export function Features() {
  const root = useRef<HTMLElement>(null);
  const { platform } = usePlatform();

  useGSAP(
    () => {
      revealUp("[data-card]", root.current!, { stagger: 0.1 });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="features" className="bg-ink-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Features"
          title="Everything you need, right in your chat"
          blurb="No apps to download, no accounts to create. Just start a conversation and send money globally."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES(platform.name).map((f, i) => (
            <div
              key={f.title}
              data-card
              data-reveal
              className="card-glow rounded-3xl p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/[0.08] text-xl">
                {ICONS[i]}
              </span>
              <h3 className="display-lg mt-6 !text-2xl text-cream">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
