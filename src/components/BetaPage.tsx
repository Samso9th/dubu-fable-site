import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { PageChrome } from "./PageChrome";

// Same backend the seminar copy and tracking beacons already use: dubu-social
// (VITE_API_URL). Submissions land in the beta_signups table (migration 044)
// via POST /public/beta-signup.
const API_BASE = (import.meta.env.VITE_API_URL ?? "https://lapai.dubupay.com").replace(
  /\/$/,
  ""
);

type Status = "idle" | "sending" | "done" | "error";

const PLATFORM_OPTIONS = [
  { value: "slack", label: "Slack" },
  { value: "discord", label: "Discord" },
  { value: "both", label: "Both" },
];

export function BetaPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [platform, setPlatform] = useState("slack");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = new FormData(e.currentTarget);
    setStatus("sending");

    try {
      // text/plain keeps this a "simple" CORS request with no preflight — the
      // API's origin allowlist doesn't include the marketing site (same trick
      // the tracking beacon uses). The server parses the JSON itself.
      const res = await fetch(`${API_BASE}/public/beta-signup`, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          platform,
          source: new URLSearchParams(window.location.search).get("src"),
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <PageChrome>
      <span className="inline-flex items-center rounded-full border border-red-500/40 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-red-400">
        Beta
      </span>
      <h1 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl">
        Dubu for Slack &amp; Discord is <span className="text-gold">on the way</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">
        We're building native Dubu experiences for Slack and Discord. Each one
        gets its own flow that plays to the platform's strengths — the same way
        our Telegram app is a full Mini App rather than a chat bot. They're in
        active development and not open to everyone yet.
      </p>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-mist">
        Today, Dubu is fully live on{" "}
        <a
          href="https://wa.link/6l25x0"
          target="_blank"
          rel="noreferrer"
          className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
        >
          WhatsApp
        </a>{" "}
        and{" "}
        <a
          href="https://t.me/dubupaybot"
          target="_blank"
          rel="noreferrer"
          className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
        >
          Telegram
        </a>
        . Want to be first through the door on Slack or Discord? Drop your
        details and we'll invite you the moment the beta opens.
      </p>

      {status === "done" ? (
        <div className="mt-12 rounded-3xl border border-gold/25 bg-gold/5 p-8 text-center">
          <p className="font-display text-2xl text-cream">You're on the list 🎉</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist">
            We saved your spot for the{" "}
            {platform === "both" ? "Slack & Discord" : platform} beta. We'll
            reach out at the email you provided the moment invites go out.
          </p>
          <Link
            to="/"
            className="btn-gold mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold"
          >
            Back to home
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-12 max-w-xl space-y-5">
          <div>
            <label htmlFor="beta-name" className="kicker mb-2 block text-mist/70">
              Your name
            </label>
            <input
              id="beta-name"
              name="name"
              type="text"
              required
              maxLength={80}
              placeholder="Ada Obi"
              className="w-full rounded-xl border border-line bg-ink-soft px-4 py-3 text-sm text-cream placeholder:text-mist/40 focus:border-gold/50 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="beta-email" className="kicker mb-2 block text-mist/70">
              Email
            </label>
            <input
              id="beta-email"
              name="email"
              type="email"
              required
              maxLength={200}
              placeholder="ada@example.com"
              className="w-full rounded-xl border border-line bg-ink-soft px-4 py-3 text-sm text-cream placeholder:text-mist/40 focus:border-gold/50 focus:outline-none"
            />
          </div>

          <div>
            <span className="kicker mb-2 block text-mist/70">Which platform?</span>
            <div className="flex flex-wrap gap-2">
              {PLATFORM_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPlatform(opt.value)}
                  aria-pressed={platform === opt.value}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                    platform === opt.value
                      ? "border-gold/60 bg-gold/10 text-gold"
                      : "border-line text-mist hover:text-cream"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {status === "error" && (
            <p className="text-sm text-red-400">
              That didn't go through. Check your details and try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-gold inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold disabled:opacity-60"
          >
            {status === "sending" ? "Saving…" : "Join the beta"}{" "}
            <span aria-hidden>→</span>
          </button>

          <p className="text-xs text-mist/60">
            We only use these details to invite you to the beta. Nothing else.
          </p>
        </form>
      )}
    </PageChrome>
  );
}