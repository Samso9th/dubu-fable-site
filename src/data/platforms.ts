export type PlatformId = "whatsapp" | "telegram" | "slack" | "discord";

export type Platform = {
  id: PlatformId;
  name: string;
  /** Deep link the CTAs point to for this platform. */
  ctaUrl: string;
  /** WA/TG render chat bubbles; Slack/Discord render left-aligned rows. */
  chatLayout: "bubbles" | "rows";
  /** Read-receipt style on sent messages. */
  receipts: "wa" | "tg" | "none";
  /** Presence label shown in the phone header. */
  statusLabel: string;
  inputPlaceholder: string;
};

export const PLATFORM_IDS: PlatformId[] = [
  "whatsapp",
  "telegram",
  "slack",
  "discord",
];

// TODO: replace the Telegram/Slack/Discord placeholder links with the real
// bot links once they exist — this is the only place they live.
export const PLATFORMS: Record<PlatformId, Platform> = {
  whatsapp: {
    id: "whatsapp",
    name: "WhatsApp",
    ctaUrl: "https://wa.link/6l25x0",
    chatLayout: "bubbles",
    receipts: "wa",
    statusLabel: "online",
    inputPlaceholder: "Type, voice, or send a photo…",
  },
  telegram: {
    id: "telegram",
    name: "Telegram",
    ctaUrl: "https://t.me/dubupay",
    chatLayout: "bubbles",
    receipts: "tg",
    statusLabel: "online",
    inputPlaceholder: "Message",
  },
  slack: {
    id: "slack",
    name: "Slack",
    ctaUrl: "https://slack.com/apps/dubu",
    chatLayout: "rows",
    receipts: "none",
    statusLabel: "Active",
    inputPlaceholder: "Message Dubu",
  },
  discord: {
    id: "discord",
    name: "Discord",
    ctaUrl: "https://discord.com/apps/dubu",
    chatLayout: "rows",
    receipts: "none",
    statusLabel: "Online",
    inputPlaceholder: "Message @Dubu",
  },
};

export function isPlatformId(v: string | null | undefined): v is PlatformId {
  return v === "whatsapp" || v === "telegram" || v === "slack" || v === "discord";
}
