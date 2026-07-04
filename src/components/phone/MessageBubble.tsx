import type { ChatMessage } from "../../data/content";
import { VoiceNote } from "./VoiceNote";

/** WhatsApp / Telegram bubble layout. Keeps the [data-msg] →
 *  [data-typing] + [data-content] contract the GSAP timeline relies on. */
export function MessageBubble({ msg }: { msg: ChatMessage }) {
  const sent = msg.from === "user";
  return (
    <div
      data-msg
      className={`flex w-full ${sent ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative max-w-[80%] px-3 py-2 text-[13px] leading-snug shadow-sm ${
          sent ? "bubble-sent" : "bubble-received"
        } ${msg.success ? "ring-1 ring-accent/60" : ""}`}
      >
        {msg.from === "dubu" && (
          <span
            data-typing
            className="absolute inset-0 flex items-center gap-1 px-3"
          >
            <span className="typing-dot h-1.5 w-1.5 rounded-full" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full" />
          </span>
        )}

        <span data-content className="block">
          {msg.image && (
            <span className="mb-1.5 block h-24 w-44 rounded-lg bg-white/10 p-2">
              <span className="block text-[10px] opacity-70">
                📷 account_details.jpg
              </span>
            </span>
          )}
          {msg.voice ? (
            <VoiceNote duration={msg.voice} />
          ) : (
            <>
              {msg.card && (
                <span className="mb-1.5 mt-0.5 block space-y-1 rounded-lg border border-white/10 bg-black/25 px-2.5 py-2">
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
                  {msg.success && <span className="mr-1 text-accent">✓</span>}
                  {msg.text || msg.imageCaption}
                </span>
              )}
            </>
          )}
          <span className="mt-0.5 flex justify-end gap-1 text-[9px] leading-none opacity-50">
            {msg.time ?? ""}
            {sent && (
              <span
                className="opacity-100"
                style={{ color: "var(--receipt-color)" }}
              >
                ✓✓
              </span>
            )}
          </span>
        </span>
      </div>
    </div>
  );
}
