import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import type { ChatMessage } from "../data/content";
import { usePlatform } from "../lib/theme";
import { MessageBubble } from "./phone/MessageBubble";
import { MessageRow } from "./phone/MessageRow";
import { PhoneHeader, PhoneInputBar } from "./phone/PhoneChrome";

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
  const { platform, platformId } = usePlatform();

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
    {
      scope: root,
      dependencies: [play, mode, platformId],
      revertOnUpdate: true,
    }
  );

  const bubbles = platform.chatLayout === "bubbles";

  return (
    <div
      ref={root}
      className={`phone-frame relative w-[290px] shrink-0 overflow-hidden rounded-[2.4rem] sm:w-[320px] ${className}`}
    >
      <PhoneHeader platform={platform} />

      {/* Messages */}
      <div className="phone-screen relative flex h-[420px] flex-col justify-end overflow-hidden px-3 pb-3 pt-4 sm:h-[460px]">
        <div className={`relative flex flex-col ${bubbles ? "gap-2.5" : "gap-3"}`}>
          {messages.map((m, i) =>
            bubbles ? (
              <MessageBubble key={i} msg={m} />
            ) : (
              <MessageRow key={i} msg={m} platformId={platformId} />
            )
          )}
        </div>
      </div>

      <PhoneInputBar platform={platform} />
    </div>
  );
}
