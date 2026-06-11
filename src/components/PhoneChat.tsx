import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import type { ChatMessage } from "../data/content";

function VoiceNote({ duration }: { duration: string }) {
  return (
    <span className="flex items-center gap-2 py-0.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-wa/90 text-[10px] text-ink">
        ▶
      </span>
      <span className="flex h-4 items-center gap-[2px]">
        {[8, 14, 10, 16, 7, 12, 15, 9, 13, 6, 11, 14].map((h, i) => (
          <span
            key={i}
            className="voice-bar w-[2px] rounded-full bg-current opacity-70"
            style={{ height: h, animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </span>
      <span className="text-[10px] opacity-70">{duration}</span>
    </span>
  );
}

function Bubble({ msg }: { msg: ChatMessage }) {
  const sent = msg.from === "user";
  return (
    <div
      data-msg
      className={`flex w-full ${sent ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative max-w-[80%] px-3 py-2 text-[13px] leading-snug shadow-sm ${
          sent ? "bubble-sent" : "bubble-received"
        } ${msg.success ? "ring-1 ring-wa/60" : ""}`}
      >
        {msg.from === "dubu" && (
          <span
            data-typing
            className="absolute inset-0 flex items-center gap-1 px-3"
          >
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-mist" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-mist" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-mist" />
          </span>
        )}

        <span data-content className="block">
          {msg.image && (
            <span className="mb-1.5 block h-24 w-44 rounded-lg bg-[linear-gradient(135deg,hsl(150_30%_22%),hsl(150_35%_14%))] p-2">
              <span className="block text-[10px] text-mist">
                📷 account_details.jpg
              </span>
            </span>
          )}
          {msg.voice ? (
            <VoiceNote duration={msg.voice} />
          ) : (
            <>
              {msg.card && (
                <span className="mb-1.5 mt-0.5 block space-y-1 rounded-lg border border-line bg-ink/40 px-2.5 py-2">
                  {msg.card.map((line) => (
                    <span
                      key={line}
                      className="block text-[12px] tabular-nums text-cream/90"
                    >
                      {line}
                    </span>
                  ))}
                </span>
              )}
              {(msg.text || msg.imageCaption) && (
                <span className="whitespace-pre-line">
                  {msg.success && <span className="mr-1 text-wa">✓</span>}
                  {msg.text || msg.imageCaption}
                </span>
              )}
            </>
          )}
          <span className="mt-0.5 flex justify-end gap-1 text-[9px] leading-none opacity-50">
            {msg.time ?? ""}
            {sent && <span className="text-sky-400 opacity-100">✓✓</span>}
          </span>
        </span>
      </div>
    </div>
  );
}

type PhoneChatProps = {
  messages: ChatMessage[];
  mode: "loop" | "instant";
  play?: boolean;
  className?: string;
};

export function PhoneChat({
  messages,
  mode,
  play = true,
  className = "",
}: PhoneChatProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const msgs = q("[data-msg]");

      if (prefersReducedMotion()) {
        gsap.set(msgs, { autoAlpha: 1 });
        gsap.set(q("[data-typing]"), { autoAlpha: 0 });
        return;
      }

      if (mode === "instant") {
        gsap.set(q("[data-typing]"), { autoAlpha: 0 });
        gsap.fromTo(
          msgs,
          { autoAlpha: 0, y: 18, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: "back.out(1.5)",
            stagger: 0.1,
          }
        );
        return;
      }

      if (!play) return;

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
      tl.set(msgs, { autoAlpha: 0, y: 16, scale: 0.96 });

      messages.forEach((m, i) => {
        const el = msgs[i];
        const typing = el.querySelector("[data-typing]");
        const content = el.querySelector("[data-content]");
        const isDubu = m.from === "dubu";

        if (isDubu && typing) {
          tl.set(content, { autoAlpha: 0 }, "+=0.35")
            .set(typing, { autoAlpha: 1 })
            .to(el, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.6)",
            })
            .to({}, { duration: 0.9 })
            .set(typing, { autoAlpha: 0 })
            .fromTo(
              content,
              { autoAlpha: 0, y: 6 },
              { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        } else {
          tl.to(
            el,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.45,
              ease: "back.out(1.6)",
            },
            "+=0.55"
          );
        }
      });

      tl.to({}, { duration: 2.4 }).to(msgs, {
        autoAlpha: 0,
        y: -10,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
      });
    },
    { scope: root, dependencies: [play, mode], revertOnUpdate: true }
  );

  return (
    <div
      ref={root}
      className={`phone-frame relative w-[290px] shrink-0 overflow-hidden rounded-[2.4rem] sm:w-[320px] ${className}`}
    >
      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 border-b border-line bg-ink-soft px-4 pb-3 pt-5">
        <img src="/icon.png" alt="Dubu" className="h-9 w-9 rounded-full" />
        <div className="flex-1">
          <p className="text-[13px] font-semibold leading-tight">Dubu</p>
          <p className="flex items-center gap-1.5 text-[10px] text-wa">
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-wa pulse-dot" />
            online
          </p>
        </div>
        <div className="flex items-center gap-4 text-mist">
          {/* video call */}
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m22 8-6 4 6 4V8Z" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
          </svg>
          {/* voice call */}
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
          {/* overflow */}
          <span className="text-base leading-none">⋮</span>
        </div>
      </div>

      {/* Messages */}
      <div
        className="relative flex h-[420px] flex-col justify-end gap-2.5 overflow-hidden px-3 pb-3 pt-4 sm:h-[460px]"
        style={{
          backgroundImage: "url(/whatsapp-dark.png)",
          backgroundSize: "360px",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-ink/72" />
        <div className="relative flex flex-col gap-2.5">
          {messages.map((m, i) => (
            <Bubble key={i} msg={m} />
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="relative z-10 flex items-center gap-2 border-t border-line bg-ink-soft px-3 py-3">
        <div className="flex-1 rounded-full bg-ink px-4 py-2 text-[11px] text-mist">
          Type, voice, or send a photo…
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-wa text-xs text-ink">
          🎙
        </span>
      </div>
    </div>
  );
}
