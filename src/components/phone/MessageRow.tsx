import type { ChatMessage } from "../../data/content";
import type { PlatformId } from "../../data/platforms";
import { VoiceNote } from "./VoiceNote";

/** Slack / Discord row layout: left-aligned avatar + name + content.
 *  Keeps the [data-msg] → [data-typing] + [data-content] contract the
 *  GSAP timeline relies on. */
export function MessageRow({
  msg,
  platformId,
}: {
  msg: ChatMessage;
  platformId: PlatformId;
}) {
  const isDubu = msg.from === "dubu";
  const slack = platformId === "slack";

  return (
    <div data-msg className="flex w-full gap-2">
      {isDubu ? (
        <img
          src="/icon.png"
          alt=""
          className={`mt-0.5 h-7 w-7 shrink-0 ${
            slack ? "rounded-md" : "rounded-full"
          }`}
        />
      ) : (
        <span
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-accent/25 text-[10px] font-semibold ${
            slack ? "rounded-md" : "rounded-full"
          }`}
          style={{ color: "var(--phone-screen-fg)" }}
        >
          Y
        </span>
      )}

      <div className="relative min-w-0 flex-1">
        {isDubu && (
          <span
            data-typing
            className="absolute inset-x-0 top-0 flex items-center gap-1.5 pt-1"
          >
            <span className="typing-dot h-1.5 w-1.5 rounded-full" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full" />
            <span
              className="text-[10px] italic"
              style={{ color: "var(--phone-muted)" }}
            >
              Dubu is typing…
            </span>
          </span>
        )}

        <span data-content className="block">
          <span className="flex items-baseline gap-1.5">
            <span
              className={`text-[12px] font-bold leading-tight ${
                !slack && isDubu ? "text-accent" : ""
              }`}
            >
              {isDubu ? "Dubu" : "You"}
            </span>
            {isDubu && (
              <span
                className={`rounded px-1 py-px text-[7px] font-bold uppercase leading-tight ${
                  slack
                    ? "bg-black/10 text-current opacity-60"
                    : "bg-accent text-white"
                }`}
              >
                App
              </span>
            )}
            <span
              className="text-[9px] leading-tight"
              style={{ color: "var(--phone-muted)" }}
            >
              {msg.time ?? ""}
            </span>
          </span>

          <span className="mt-0.5 block text-[13px] leading-snug">
            {msg.image && (
              <span
                className={`mb-1.5 block h-24 w-44 rounded-lg border p-2 ${
                  slack
                    ? "border-black/10 bg-black/5"
                    : "border-white/5 bg-black/25"
                }`}
              >
                <span
                  className="block text-[10px]"
                  style={{ color: "var(--phone-muted)" }}
                >
                  📷 account_details.jpg
                </span>
              </span>
            )}
            {msg.voice ? (
              <VoiceNote duration={msg.voice} />
            ) : (
              <>
                {msg.card && (
                  <span
                    className={`mb-1 mt-1 block space-y-1 rounded-md border-l-[3px] border-accent px-2.5 py-2 ${
                      slack ? "bg-black/5" : "bg-black/25"
                    }`}
                  >
                    {msg.card.map((line) => (
                      <span
                        key={line}
                        className="block text-[12px] tabular-nums opacity-90"
                      >
                        {line}
                      </span>
                    ))}
                  </span>
                )}
                {(msg.text || msg.imageCaption) && (
                  <span className="whitespace-pre-line">
                    {msg.success && (
                      <span className="mr-1 text-accent">✓</span>
                    )}
                    {msg.text || msg.imageCaption}
                  </span>
                )}
              </>
            )}
          </span>
        </span>
      </div>
    </div>
  );
}
