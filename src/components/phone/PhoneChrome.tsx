import type { Platform } from "../../data/platforms";

const chromeStyle = {
  backgroundColor: "var(--phone-chrome-bg)",
  color: "var(--phone-chrome-fg)",
  borderColor: "var(--phone-line)",
} as const;

function BackArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m22 8-6 4 6 4V8Z" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function HeadphonesIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 0 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
    </svg>
  );
}

export function PhoneHeader({ platform }: { platform: Platform }) {
  const { id, statusLabel } = platform;

  return (
    <div
      className="relative z-10 flex items-center gap-2.5 border-b px-3.5 pb-3 pt-5"
      style={chromeStyle}
    >
      {id !== "whatsapp" && (
        <span className="-ml-1 opacity-80">
          <BackArrow />
        </span>
      )}
      <img
        src="/icon.png"
        alt="Dubu"
        className={`h-9 w-9 ${id === "slack" ? "rounded-lg" : "rounded-full"}`}
      />
      <div className="flex-1">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold leading-tight">
          Dubu
          {id === "discord" && (
            <span className="rounded bg-accent px-1 py-px text-[7px] font-bold uppercase leading-tight text-white">
              App
            </span>
          )}
        </p>
        <p
          className={`flex items-center gap-1.5 text-[10px] ${
            id === "whatsapp" || id === "telegram" ? "text-accent" : "opacity-80"
          }`}
        >
          <span
            className={`relative inline-block h-1.5 w-1.5 rounded-full ${
              id === "whatsapp" ? "bg-accent pulse-dot" : ""
            } ${id === "telegram" ? "bg-accent" : ""} ${
              id === "slack" || id === "discord" ? "bg-[#23A55A]" : ""
            }`}
          />
          {statusLabel}
        </p>
      </div>
      <div className="flex items-center gap-4 opacity-80">
        {id === "whatsapp" && (
          <>
            <VideoIcon />
            <PhoneIcon />
          </>
        )}
        {id === "telegram" && <PhoneIcon />}
        {id === "slack" && <HeadphonesIcon />}
        {id === "discord" && (
          <>
            <PhoneIcon />
            <VideoIcon />
          </>
        )}
        <span className="text-base leading-none">⋮</span>
      </div>
    </div>
  );
}

export function PhoneInputBar({ platform }: { platform: Platform }) {
  const { id, inputPlaceholder } = platform;

  return (
    <div
      className="relative z-10 flex items-center gap-2 border-t px-3 py-3"
      style={chromeStyle}
    >
      {(id === "telegram" || id === "discord") && (
        <span className="text-base opacity-70">{id === "discord" ? "⊕" : "📎"}</span>
      )}
      <div
        className={`flex-1 px-4 py-2 text-[11px] ${
          id === "slack"
            ? "rounded-lg border"
            : id === "discord"
              ? "rounded-full"
              : "rounded-full"
        }`}
        style={{
          backgroundColor: "var(--phone-input-bg)",
          borderColor: "var(--phone-line)",
          color: "var(--phone-muted)",
        }}
      >
        {inputPlaceholder}
      </div>
      {id === "slack" ? (
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#007A5A] text-xs text-white">
          ➤
        </span>
      ) : (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs text-ink">
          🎙
        </span>
      )}
    </div>
  );
}
