import { useEffect } from "react";

// First-party tracking for the campaign pages. Beacons go to the same
// dubu-social API that serves the seminar copy (migration 037 / POST
// /public/track) and surface in the admin dashboard under Community → Tracking.
//
// What it records: which link someone arrived on, that the page rendered, and
// whether they tapped the CTA through to WhatsApp. What it does not record: any
// identity. The visitor id below is a random string the browser mints for
// itself — its only job is telling "12 views" apart from "one person
// refreshing" — and nothing here reads a name, number or account.
//
// Tracking must never be able to break the page: every send is fire-and-forget,
// every failure is swallowed, and nothing on the render path waits on it.

const API_BASE = (import.meta.env.VITE_API_URL ?? "https://lapai.dubupay.com").replace(/\/$/, "");

const VISITOR_KEY = "dubu-vid";
const SOURCE_KEY = "dubu-src";
const CAMPAIGN_KEY = "dubu-campaign";
const SENT_PREFIX = "dubu-sent:";

/** `?src=` is ours; the utm_* pair is what ad platforms append on their own. */
const SOURCE_PARAMS = ["src", "utm_source", "ref"];

type TrackEvent = "page_view" | "cta_click";

function safeGet(store: Storage, key: string): string | null {
  try {
    return store.getItem(key);
  } catch {
    return null; // Safari private mode, blocked storage — tracking degrades, page doesn't.
  }
}

function safeSet(store: Storage, key: string, value: string): void {
  try {
    store.setItem(key, value);
  } catch {
    /* ignore */
  }
}

/** Stable per-browser, random, meaningless on its own. */
function visitorId(): string {
  const existing = safeGet(localStorage, VISITOR_KEY);
  if (existing) return existing;

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 24)
      : Math.random().toString(36).slice(2) + Date.now().toString(36);

  safeSet(localStorage, VISITOR_KEY, id);
  return id;
}

/**
 * The source is captured on arrival and held for the session. Without that, a
 * CTA click would report as 'direct' the moment the visitor navigates away from
 * the ?src= URL — and the CTA is the number the ad is actually judged on.
 */
function attribution(): { source: string; campaign: string | null } {
  const params = new URLSearchParams(window.location.search);

  for (const key of SOURCE_PARAMS) {
    const value = params.get(key);
    if (value) {
      safeSet(sessionStorage, SOURCE_KEY, value);
      break;
    }
  }

  const campaign = params.get("utm_campaign");
  if (campaign) safeSet(sessionStorage, CAMPAIGN_KEY, campaign);

  return {
    source: safeGet(sessionStorage, SOURCE_KEY) ?? "direct",
    campaign: safeGet(sessionStorage, CAMPAIGN_KEY),
  };
}

function device(): "mobile" | "desktop" {
  return /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent) ? "mobile" : "desktop";
}

/**
 * text/plain on purpose — it keeps the request "simple" so the browser skips
 * the CORS preflight, which the API's origin allowlist would reject. The server
 * parses the JSON itself. sendBeacon because a CTA click navigates away
 * immediately and a normal fetch would be cancelled with it.
 */
function send(payload: Record<string, unknown>): void {
  const url = `${API_BASE}/public/track`;
  const body = JSON.stringify(payload);

  try {
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon(url, new Blob([body], { type: "text/plain;charset=UTF-8" }));
      return;
    }
    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body,
      keepalive: true,
      mode: "no-cors",
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}

export function track(event: TrackEvent, page: string, label?: string): void {
  if (typeof window === "undefined") return;
  // Keep the dashboard honest — local development is not campaign traffic.
  if (import.meta.env.DEV) return;

  const { source, campaign } = attribution();

  send({
    event,
    page,
    label,
    source,
    campaign,
    visitor_id: visitorId(),
    referrer: document.referrer || null,
    device: device(),
  });
}

/**
 * One page_view per page per browser session. React's dev StrictMode runs
 * effects twice and a bfcache restore re-mounts, both of which would otherwise
 * double-count the ad's traffic.
 */
export function usePageView(page: string): void {
  useEffect(() => {
    const key = `${SENT_PREFIX}${page}`;
    if (safeGet(sessionStorage, key)) return;
    safeSet(sessionStorage, key, "1");
    track("page_view", page);
  }, [page]);
}
