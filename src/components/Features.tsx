import { useRef } from "react";
import { useGSAP, revealUp } from "../lib/gsap";
import { SectionHeading } from "./SectionHeading";
import { FEATURES } from "../data/content";
import { usePlatform } from "../lib/theme";

// Icon artwork, matching the Hustle HQ cards: the images render bare (no
// containing tile), like the perk icons in the Community section.
const ICONS = [
  "https://res.cloudinary.com/dhyo6y9rw/image/upload/v1789310120/A_message_icon_wmvxm5.png",
  "https://res.cloudinary.com/dhyo6y9rw/image/upload/v1789310120/A_bell_icon_bpzuul.png",
  "https://res.cloudinary.com/dhyo6y9rw/image/upload/v1789310120/A_contact_icon_ghtq2d.png",
  "https://res.cloudinary.com/dhyo6y9rw/image/upload/v1789310120/A_graph_icon_lci2yn.png",
];

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
              <img
                src={ICONS[i]}
                alt=""
                loading="lazy"
                className="h-10 w-10 object-contain"
              />
              <h3 className="display-lg mt-6 !text-2xl text-cream">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
