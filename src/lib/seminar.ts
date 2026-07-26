import { useEffect, useState } from "react";
import { COMMUNITY, SEMINAR, isPast, type Seminar } from "../data/community";

// The seminar shown on the site is managed from the Dubu admin dashboard, so a
// new flyer or date goes live without a redeploy. This is the only runtime
// dependency the marketing site has on the API, and it is deliberately soft:
// every failure path falls back to the copy bundled in data/community.ts, so the
// page renders the last-shipped edition rather than an empty section.

// dubu-social, NOT api.dubupay.com — that host is the separate dubu-api service
// and 404s on /public/seminar. Same base the admin dashboard talks to.
const API_BASE = (import.meta.env.VITE_API_URL ?? "https://lapai.dubupay.com").replace(/\/$/, "");
const TIMEOUT_MS = 4000;

interface ApiSeminar {
  title: string;
  subtitle: string | null;
  date: string;
  date_label: string;
  time_label: string | null;
  flyer: string | null;
  bullets: string[];
  is_past: boolean;
}

function toSeminar(s: ApiSeminar): Seminar {
  return {
    title: s.title,
    tagline: s.subtitle ?? "",
    date: s.date,
    dateLabel: s.date_label,
    timeLabel: s.time_label,
    flyer: s.flyer,
    bullets: s.bullets ?? [],
  };
}

export interface SeminarState {
  /** The seminar to render — API result if we got one, else the bundled copy. */
  seminar: Seminar | null;
  /** Where to send people. Also API-backed so the wa.link can be rotated. */
  joinUrl: string;
  /** True once the event day is over; the UI switches to a "this has ended" state. */
  past: boolean;
}

const fallback = (): SeminarState => ({
  seminar: SEMINAR,
  joinUrl: COMMUNITY.joinUrl,
  past: SEMINAR ? isPast(SEMINAR) : false,
});

export function useSeminar(): SeminarState {
  const [state, setState] = useState<SeminarState>(fallback);

  useEffect(() => {
    const controller = new AbortController();
    // A slow API must never hold up the page — bail out and keep the fallback.
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    fetch(`${API_BASE}/public/seminar`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { seminar: ApiSeminar | null; join_url?: string }) => {
        setState({
          seminar: data.seminar ? toSeminar(data.seminar) : null,
          joinUrl: data.join_url || COMMUNITY.joinUrl,
          past: data.seminar?.is_past ?? false,
        });
      })
      .catch(() => {
        // Network error, abort, non-2xx — the bundled copy already in state stands.
      })
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return state;
}
