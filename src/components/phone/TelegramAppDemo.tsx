import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../../lib/gsap";

/**
 * Animated mock of the Dubu Telegram Mini App (dubu-tg-ui) for the hero phone.
 *
 * Telegram is not a chat-bot experience like WhatsApp: it is a full web app
 * that opens inside Telegram, so the phone plays a looping basic app flow
 * instead of chat bubbles — Home → Send (amount typed on the keypad) →
 * Review → Success → back to Home.
 *
 * Colors are the Mini App's own dark design system (dubu-tg-ui src/index.css),
 * deliberately not the marketing theme, and the type is Inter like the app.
 */

// dubu-tg-ui design tokens
const C = {
  bg: "#0d0d0d",
  surface: "#141414",
  raised: "#1c1c1c",
  border: "#2a2a2a",
  primary: "#27e56a",
  onPrimary: "#0b0b0b",
  gold: "#d9aa18",
  fg: "#f5f5f5",
  muted: "#8a8a8a",
  chipSuccessBg: "#0e2f1a",
  chipPendingBg: "#33290f",
} as const;

const FONT = "'Inter', system-ui, -apple-system, sans-serif";

const base = {
  background: C.bg,
  color: C.fg,
  fontFamily: FONT,
} as const;

const HOME_TX = [
  { name: "Amina Okafor", sub: "GTBank · Sent", amount: "−₦50,000", when: "1h ago", credit: false, pending: false },
  { name: "Tunde Bello", sub: "Received", amount: "+₦120,000", when: "2m ago", credit: true, pending: false },
  { name: "Spotify", sub: "Bills · USD card", amount: "−$12.99", when: "Yesterday", credit: false, pending: true },
];

const REVIEW_ROWS = [
  ["You send", "₦50,000.00"],
  ["Fee", "₦0.00"],
  ["Rate · locked", "₦1,580 / $"],
];

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden>
      <path d="M5 12h14M12 5v14" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m16 3 4 4-4 4M20 7H4m4 14-4-4 4-4M4 17h16" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function TelegramAppDemo() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const home = q('[data-screen="home"]');
      const send = q('[data-screen="send"]');
      const review = q('[data-screen="review"]');
      const success = q('[data-screen="success"]');
      const amountEl = q("[data-amount]")[0] as HTMLElement | undefined;

      // The keypad "types" the amount: a plain object tweened by the timeline
      // and rendered into the amount element. Reset at the top of every loop.
      const counter = { value: 0 };
      const renderAmount = () => {
        if (amountEl) {
          amountEl.textContent = Math.round(counter.value).toLocaleString("en-US");
        }
      };

      gsap.set([home, send, review, success], { autoAlpha: 0, x: 28 });
      gsap.set(home, { autoAlpha: 1, x: 0 });

      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });

      tl.to({}, { duration: 2.4 })
        // Home → Send
        .to(home, { autoAlpha: 0, x: -28, duration: 0.4 })
        .fromTo(send, { autoAlpha: 0, x: 28 }, { autoAlpha: 1, x: 0, duration: 0.4 })
        .fromTo(
          q("[data-send-row]"),
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.07, ease: "power2.out" },
          "-=0.1"
        )
        .set(counter, { value: 0 })
        .call(renderAmount)
        .to(counter, {
          value: 50000,
          duration: 0.9,
          ease: "power1.inOut",
          onUpdate: renderAmount,
        })
        .fromTo(
          q("[data-continue]"),
          { autoAlpha: 0, scale: 0.9 },
          { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }
        )
        .to({}, { duration: 1.1 })
        // Send → Review
        .to(send, { autoAlpha: 0, x: -28, duration: 0.4 })
        .fromTo(review, { autoAlpha: 0, x: 28 }, { autoAlpha: 1, x: 0, duration: 0.4 })
        .fromTo(
          q("[data-review-row]"),
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.06, ease: "power2.out" },
          "-=0.1"
        )
        .fromTo(
          q("[data-confirm]"),
          { autoAlpha: 0, scale: 0.92 },
          { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }
        )
        .to({}, { duration: 0.7 })
        .to(q("[data-confirm]"), { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1 })
        .to({}, { duration: 0.3 })
        // Review → Success
        .to(review, { autoAlpha: 0, x: -28, duration: 0.4 })
        .fromTo(
          success,
          { autoAlpha: 0, scale: 0.92 },
          { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }
        )
        .fromTo(
          q("[data-check]"),
          { scale: 0 },
          { scale: 1, duration: 0.45, ease: "back.out(2.2)" },
          "-=0.15"
        )
        .to({}, { duration: 2.2 })
        .to(success, { autoAlpha: 0, y: -12, duration: 0.35, ease: "power2.in" })
        .set(success, { y: 0 })
        .set(home, { autoAlpha: 1, x: 0 });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative w-[290px] shrink-0 sm:w-[320px]">
      <div className="phone-frame relative overflow-hidden rounded-[2.4rem]">
        {/* Telegram chrome: the Mini App opens under Telegram's own title bar */}
        <div
          className="flex items-center gap-2.5 border-b px-3.5 pb-3 pt-5"
          style={{ background: C.surface, color: C.fg, borderColor: C.border, fontFamily: FONT }}
        >
          <img src="/icon.png" alt="Dubu" className="h-8 w-8 rounded-full" />
          <div className="flex-1">
            <p className="text-[13px] font-semibold leading-tight">Dubu</p>
            <p className="text-[10px]" style={{ color: C.muted }}>
              Telegram Mini App
            </p>
          </div>
          <span className="text-base opacity-70">⋮</span>
          <span className="text-[13px] opacity-70">✕</span>
        </div>

        <div className="phone-screen relative h-[420px] overflow-hidden sm:h-[460px]" style={base}>
          {/* ── Home ─────────────────────────────────────────────────── */}
          <div data-screen="home" className="absolute inset-0">
            {/* identity */}
            <div className="flex items-center gap-2.5 px-4 pt-3">
              <span
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full border text-[12px] font-semibold"
                style={{ background: C.raised, borderColor: C.border }}
              >
                S
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[10px]" style={{ color: C.muted }}>
                  Good evening
                </div>
                <div className="text-[13px] font-semibold tracking-[-0.01em]">Sam</div>
              </div>
              <span
                className="relative flex h-[32px] w-[32px] items-center justify-center rounded-full border"
                style={{ background: C.raised, borderColor: C.border }}
              >
                <BellIcon />
                <span
                  className="absolute right-[7px] top-[7px] h-[6px] w-[6px] rounded-full"
                  style={{ background: C.primary }}
                />
              </span>
            </div>

            {/* balance card */}
            <div
              className="mx-4 mt-3 rounded-xl border p-3"
              style={{ background: C.surface, borderColor: C.border }}
            >
              <div
                className="flex w-fit items-center rounded-full border p-[3px] text-[8.5px]"
                style={{ borderColor: C.border }}
              >
                <span
                  className="rounded-full px-2 py-[3px] font-semibold"
                  style={{ background: C.primary, color: C.onPrimary }}
                >
                  NGN
                </span>
                <span className="px-2 py-[3px]" style={{ color: C.muted }}>
                  USD
                </span>
                <span className="px-2 py-[3px]" style={{ color: C.muted }}>
                  Stables
                </span>
              </div>
              <div className="mt-2.5 text-[9px] font-semibold tracking-[0.14em]" style={{ color: C.muted }}>
                AVAILABLE BALANCE
              </div>
              <div className="mt-1 text-[24px] font-bold leading-none tracking-[-0.03em]">
                ₦128,450<span style={{ color: C.muted }}>.20</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-[10px]" style={{ color: C.muted }}>
                <span className="font-semibold" style={{ color: C.primary }}>↑ ₦89,200</span>{" "}
                received this month
              </div>
            </div>

            {/* quick actions */}
            <div className="flex justify-between px-5 pt-3.5">
              {[
                { label: "Send", primary: true, icon: <SendIcon /> },
                { label: "Add money", primary: false, icon: <PlusIcon /> },
                { label: "Swap", primary: false, icon: <SwapIcon /> },
                { label: "Pay bills", primary: false, icon: <GridIcon /> },
              ].map((a) => (
                <div key={a.label} className="flex w-[54px] flex-col items-center gap-[6px]">
                  <span
                    className="flex h-[44px] w-[44px] items-center justify-center rounded-full"
                    style={
                      a.primary
                        ? {
                            background: `linear-gradient(135deg, ${C.primary}, #1fae52)`,
                            color: C.onPrimary,
                            boxShadow: `0 0 26px -6px ${C.primary}99`,
                          }
                        : { border: `1px solid ${C.border}`, background: C.raised }
                    }
                  >
                    {a.icon}
                  </span>
                  <span className="whitespace-nowrap text-[9px] font-medium" style={{ color: C.muted }}>
                    {a.label}
                  </span>
                </div>
              ))}
            </div>

            {/* recent */}
            <div className="flex items-baseline justify-between px-4 pt-3.5">
              <span className="text-[11px] font-semibold">Recent</span>
              <span className="text-[9.5px] font-medium" style={{ color: C.primary }}>
                See all
              </span>
            </div>
            <div className="mt-0.5 px-4">
              {HOME_TX.map((tx, i) => (
                <div
                  key={tx.name}
                  className="flex items-center gap-2.5 py-1.5"
                  style={i > 0 ? { borderTop: `1px solid ${C.border}` } : undefined}
                >
                  <span
                    className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold"
                    style={{
                      background: C.raised,
                      borderColor: C.border,
                      color: tx.credit ? C.primary : C.fg,
                    }}
                  >
                    {tx.name[0]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                      {tx.name}
                      <span
                        className="rounded px-1 py-px text-[6.5px] font-bold uppercase"
                        style={
                          tx.pending
                            ? { background: C.chipPendingBg, color: C.gold }
                            : { background: C.chipSuccessBg, color: C.primary }
                        }
                      >
                        {tx.pending ? "Pending" : "Success"}
                      </span>
                    </div>
                    <div className="text-[9px]" style={{ color: C.muted }}>
                      {tx.sub}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-semibold" style={{ color: tx.credit ? C.primary : C.fg }}>
                      {tx.amount}
                    </div>
                    <div className="text-[8px]" style={{ color: C.muted }}>
                      {tx.when}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Send ─────────────────────────────────────────────────── */}
          <div data-screen="send" className="absolute inset-0 flex flex-col">
            <div className="flex items-center gap-2 px-4 pt-3" data-send-row>
              <ChevronLeft />
              <span className="text-[12.5px] font-semibold">Send money</span>
            </div>

            <div
              className="mx-4 mt-3 flex items-center gap-2.5 rounded-xl border p-3"
              style={{ background: C.surface, borderColor: C.border }}
              data-send-row
            >
              <span
                className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold"
                style={{ background: C.raised, borderColor: C.border }}
              >
                A
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold">Amina Okafor</div>
                <div className="text-[9px]" style={{ color: C.muted }}>
                  GTBank · ••••6789
                </div>
              </div>
              <span
                className="rounded-full border px-2 py-0.5 text-[8.5px] font-medium"
                style={{ borderColor: C.border, color: C.muted }}
              >
                Change
              </span>
            </div>

            <div className="mt-3 text-center" data-send-row>
              <div className="text-[9px] font-semibold tracking-[0.14em]" style={{ color: C.muted }}>
                AMOUNT
              </div>
              <div className="mt-1 text-[28px] font-bold leading-none tracking-[-0.03em]">
                ₦<span data-amount>0</span>
              </div>
              <div className="mt-1.5 text-[9.5px]" style={{ color: C.muted }}>
                ≈ $31.65 · rate locked for 60s
              </div>
            </div>

            <div className="mx-auto mt-2.5 grid w-[192px] grid-cols-3 gap-1.5" data-send-row>
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"].map((k) => (
                <span
                  key={k}
                  className="flex h-[30px] items-center justify-center rounded-lg border text-[12px] font-medium"
                  style={{ background: C.raised, borderColor: C.border }}
                >
                  {k}
                </span>
              ))}
            </div>

            <span
              data-continue
              className="mx-4 mb-3.5 mt-auto flex h-[40px] items-center justify-center rounded-lg text-[12.5px] font-bold"
              style={{ background: `linear-gradient(135deg, ${C.primary}, #1fae52)`, color: C.onPrimary }}
            >
              Continue
            </span>
          </div>

          {/* ── Review ───────────────────────────────────────────────── */}
          <div data-screen="review" className="absolute inset-0 flex flex-col">
            <div className="flex items-center gap-2 px-4 pt-3" data-review-row>
              <ChevronLeft />
              <span className="text-[12.5px] font-semibold">Review transfer</span>
            </div>

            <div
              className="mx-4 mt-3 rounded-xl border p-3.5"
              style={{ background: C.surface, borderColor: C.border }}
              data-review-row
            >
              {REVIEW_ROWS.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-1.5 text-[11px]"
                  style={{ borderBottom: `1px solid ${C.border}` }}
                >
                  <span style={{ color: C.muted }}>{label}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 text-[11.5px]">
                <span style={{ color: C.muted }}>Amina receives</span>
                <span className="font-bold" style={{ color: C.primary }}>
                  ₦50,000.00
                </span>
              </div>
            </div>

            <div
              className="mx-4 mt-3 flex items-center gap-2.5 rounded-xl border p-3"
              style={{ background: C.surface, borderColor: C.border }}
              data-review-row
            >
              <span
                className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold"
                style={{ background: C.raised, borderColor: C.border }}
              >
                A
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold">Amina Okafor</div>
                <div className="text-[9px]" style={{ color: C.muted }}>
                  GTBank · arrives in minutes
                </div>
              </div>
            </div>

            <span
              data-confirm
              className="mx-4 mb-3.5 mt-auto flex h-[40px] items-center justify-center rounded-lg text-[12.5px] font-bold"
              style={{ background: `linear-gradient(135deg, ${C.primary}, #1fae52)`, color: C.onPrimary }}
            >
              Confirm &amp; send
            </span>
          </div>

          {/* ── Success ──────────────────────────────────────────────── */}
          <div
            data-screen="success"
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <span
              data-check
              className="flex h-[62px] w-[62px] items-center justify-center rounded-full"
              style={{ background: C.primary, boxShadow: `0 0 42px -6px ${C.primary}aa` }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.onPrimary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div className="mt-4 text-[15px] font-bold">Money sent!</div>
            <div className="mt-1 text-[10.5px]" style={{ color: C.muted }}>
              ₦50,000.00 → Amina Okafor · GTBank
            </div>
            <span
              className="mt-2.5 rounded-full border px-3 py-1 text-[9px] font-semibold"
              style={{ borderColor: C.border, background: C.chipSuccessBg, color: C.primary }}
            >
              Receipt saved to Activity
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}