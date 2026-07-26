import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP, revealUp } from "../lib/gsap";
import { SectionHeading } from "./SectionHeading";
import { COMMUNITY } from "../data/community";
import { useSeminar } from "../lib/seminar";

/**
 * Homepage band for Dubu Hustle HQ. Every CTA points at the wa.link, never the
 * channel invite itself — the Tier 2 gate lives on the bot side of that link.
 * The seminar is managed from the admin dashboard and the card drops itself
 * once the event has passed.
 */
export function Community() {
  const root = useRef<HTMLElement>(null);
  const { seminar: current, joinUrl, past } = useSeminar();
  const seminar = current && !past ? current : null;

  useGSAP(
    () => {
      revealUp("[data-perk]", root.current!, { stagger: 0.1 });
    },
    { scope: root }
  );

  // The seminar card arrives after the API call, i.e. after the mount-time
  // reveal above has already run. Without its own pass keyed on the fetched
  // seminar it would sit at the [data-reveal] default of opacity:0 forever.
  useGSAP(
    () => {
      if (!root.current?.querySelector("[data-seminar]")) return;
      revealUp("[data-seminar]", root.current);
    },
    { scope: root, dependencies: [seminar?.title ?? null], revertOnUpdate: true }
  );

  return (
    <section ref={root} id="community" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Community"
          title={
            <>
              Join <span className="text-gold">Dubu Hustle HQ</span>
            </>
          }
          blurb={COMMUNITY.blurb}
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {COMMUNITY.perks.map((perk) => (
            <div
              key={perk.title}
              data-perk
              data-reveal
              className="rounded-3xl border border-line bg-ink-soft/60 p-7"
            >
              <span aria-hidden className="text-3xl">
                {perk.icon}
              </span>
              <h3 className="mt-5 font-display text-xl uppercase tracking-wide text-cream">
                {perk.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{perk.body}</p>
            </div>
          ))}
        </div>

        {seminar && (
          <div
            data-seminar
            data-reveal
            className="mt-10 overflow-hidden rounded-3xl border border-gold/25 bg-ink-soft/60"
          >
            <div
              className={
                seminar.flyer
                  ? "grid gap-0 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
                  : "grid gap-0"
              }
            >
              {seminar.flyer && (
                <Link to="/seminar" className="block bg-ink">
                  <img
                    src={seminar.flyer}
                    alt={`${seminar.title} — ${seminar.dateLabel}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </Link>
              )}

              <div className="flex flex-col justify-center p-8 sm:p-10">
                <span className="w-fit rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Next up · {seminar.dateLabel}
                </span>
                <h3 className="mt-5 font-display text-3xl uppercase tracking-wide text-cream sm:text-4xl">
                  {seminar.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-mist">{seminar.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-mist">
                  It's hosted inside the channel — verified members get the link there.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={joinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold"
                  >
                    Join the community <span aria-hidden>→</span>
                  </a>
                  <Link
                    to="/seminar"
                    className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    Seminar details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {!seminar && (
          <div data-seminar data-reveal className="mt-10 flex justify-center">
            <a
              href={joinUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-gold inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold"
            >
              Join the community <span aria-hidden>→</span>
            </a>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-mist/70">
          Open to Tier 2 verified Dubu members. Tap join and Dubu will walk you through it.
        </p>
      </div>
    </section>
  );
}
