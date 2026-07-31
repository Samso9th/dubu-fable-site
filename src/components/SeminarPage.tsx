import { PageChrome } from "./PageChrome";
import { COMMUNITY } from "../data/community";
import { useSeminar } from "../lib/seminar";
import { track, usePageView } from "../lib/track";

const PAGE = "/seminar";

/**
 * Standalone /seminar page — the shareable one. Kept alive after the event so
 * links in broadcasts and flyers don't 404; it just flips to a "this one has
 * run, join the channel for the next" state. Content comes from the admin
 * dashboard, falling back to the bundled copy if the API is unreachable.
 *
 * This is the page ads point at, so it reports views and CTA taps back to the
 * dashboard, attributed to the ?src= on whichever link brought the visitor in.
 */
export function SeminarPage() {
  const { seminar, joinUrl, past } = useSeminar();
  usePageView(PAGE);

  if (!seminar) {
    return (
      <PageChrome>
        <h1 className="font-display text-4xl uppercase tracking-wide">Seminars</h1>
        <p className="mt-5 leading-relaxed text-mist">
          No seminar is scheduled right now. Join {COMMUNITY.name} and you'll hear about the next
          one first.
        </p>
        <JoinButton joinUrl={joinUrl} label="join-no-seminar" />
      </PageChrome>
    );
  }

  const when = seminar.timeLabel
    ? `${seminar.dateLabel}, ${seminar.timeLabel}`
    : seminar.dateLabel;

  return (
    <PageChrome>
      <span
        className={
          past
            ? "rounded-full border border-line bg-ink-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-mist"
            : "rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold"
        }
      >
        {past ? "This event has ended" : `Free · Live · ${when}`}
      </span>

      <h1 className="mt-6 font-display text-4xl uppercase tracking-wide sm:text-5xl">
        {seminar.title}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-mist">{seminar.tagline}</p>

      {seminar.flyer && (
        <img
          src={seminar.flyer}
          alt={`${seminar.title} flyer — ${seminar.dateLabel}`}
          className="mt-10 w-full rounded-3xl border border-line"
        />
      )}

      {past ? (
        <>
          <h2 className="mt-12 font-display text-2xl uppercase tracking-wide">
            Missed it?
          </h2>
          <p className="mt-4 leading-relaxed text-mist">
            This session has already run. Join {COMMUNITY.name} — that's where we announce every
            seminar, and where the replays and job drops land.
          </p>
        </>
      ) : (
        <>
          <h2 className="mt-12 font-display text-2xl uppercase tracking-wide">
            What we'll cover
          </h2>
          <ul className="mt-5 space-y-3">
            {seminar.bullets.map((b) => (
              <li key={b} className="flex gap-3 leading-relaxed text-mist">
                <span aria-hidden className="text-gold">
                  ✦
                </span>
                {b}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-2xl uppercase tracking-wide">How to attend</h2>
          <p className="mt-4 leading-relaxed text-mist">
            The seminar is hosted inside {COMMUNITY.name}, our members-only WhatsApp channel. It's
            open to Tier 2 verified Dubu members — here's how to get in:
          </p>
          <ol className="mt-5 space-y-4">
            {COMMUNITY.steps.map((step, i) => (
              <li key={step} className="flex gap-4 leading-relaxed text-mist">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-sm font-semibold text-gold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </>
      )}

      <JoinButton joinUrl={joinUrl} label={past ? "join-past" : "join"} />
    </PageChrome>
  );
}

function JoinButton({ joinUrl, label = "join" }: { joinUrl: string; label?: string }) {
  return (
    <div className="mt-10">
      <a
        href={joinUrl}
        target="_blank"
        rel="noreferrer"
        // sendBeacon, so the event survives the tab handing off to WhatsApp.
        onClick={() => track("cta_click", PAGE, label)}
        className="btn-gold inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold"
      >
        Join {COMMUNITY.name} <span aria-hidden>→</span>
      </a>
      <p className="mt-4 text-xs text-mist/70">
        Opens a WhatsApp chat with Dubu. Not verified yet? Dubu will walk you through Tier 1 and
        Tier 2 first.
      </p>
    </div>
  );
}
