// Dubu Hustle HQ — the members-only WhatsApp channel and the events we run in it.
//
// IMPORTANT: never publish the raw channel invite here. `joinUrl` is a wa.link
// that opens a chat with Dubu prefilled with "Community Channel Link"; the bot
// then checks the visitor is Tier 2 verified before handing over the invite.
// Publishing the channel link directly would bypass that gate entirely.
//
// When a seminar passes, update SEMINAR (or set `SEMINAR = null` to hide the
// dated card everywhere — the community section keeps working without it).

export const COMMUNITY = {
  name: "Dubu Hustle HQ",
  joinUrl: "https://wa.link/51bxz5",
  blurb:
    "A members-only WhatsApp channel for verified Dubu users — dollar-earning gigs, free live seminars, and rate alerts before they hit anywhere else.",
  perks: [
    {
      icon: "💼",
      title: "Dollar-earning gigs",
      body: "Remote roles and freelance briefs that pay in USD, dropped as we find them.",
    },
    {
      icon: "🎓",
      title: "Free live seminars",
      body: "Practical sessions on landing international work and getting paid without the usual headache.",
    },
    {
      icon: "📈",
      title: "Rate alerts first",
      body: "Know when the rate moves in your favour before you convert.",
    },
  ],
  steps: [
    "Tap the join button — it opens a chat with Dubu on WhatsApp.",
    "Complete Tier 1 (selfie), then Tier 2 (ID verification). A few minutes each.",
    "Tap the join link again once Tier 2 is approved and Dubu sends you the channel.",
  ],
} as const;

export interface Seminar {
  title: string;
  tagline: string;
  /** ISO date — drives both the display string and the "past event" check. */
  date: string;
  dateLabel: string;
  timeLabel?: string | null;
  flyer: string | null;
  bullets: string[];
}

// Fallback only. The live seminar comes from the API (see useSeminar below), so
// this is what renders on a cold load or if the API is unreachable — the page
// shows the last-shipped edition rather than breaking. Keep it roughly current,
// but day-to-day changes belong in the admin dashboard, not here.
export const SEMINAR: Seminar | null = {
  title: "The Global Paycheck",
  tagline:
    "Finding remote work that pays in dollars — and getting that money home.",
  date: "2026-08-08",
  dateLabel: "8 August 2026",
  flyer:
    "https://res.cloudinary.com/dhyo6y9rw/image/upload/v1785088388/Dubu-Dollar-Jobs-Seminar-Flier_btknyq.png",
  bullets: [
    "Where the real dollar-paying remote jobs are listed",
    "How to get paid from abroad straight into a USD account",
    "Live Q&A with the Dubu team",
  ],
};

/** True once the event date has passed, so the site can stop advertising it. */
export function isPast(seminar: Seminar): boolean {
  // End of the event day, so the flyer doesn't vanish on the morning of.
  return Date.now() > new Date(`${seminar.date}T23:59:59`).getTime();
}
