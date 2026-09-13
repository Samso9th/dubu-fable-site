export type PlatformId = "whatsapp" | "telegram" | "slack" | "discord";

export type Platform = {
  id: PlatformId;
  name: string;
  /** Deep link the CTAs point to for this platform. */
  ctaUrl: string;
  /**
   * Slack & Discord are still in development: their CTAs route to the /beta
   * page (explanation + signup form) until the integrations ship, instead of
   * out to a bot link that doesn't exist yet.
   */
  beta: boolean;
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

// Slack & Discord app links: parked here until the integrations go live. Once
// each bot ships, set `beta: false` on the platform below and the CTAs start
// deep-linking out instead of routing to /beta.
export const SLACK_APP_URL = "https://slack.com/apps/dubu"; // TODO: real Slack app link
export const DISCORD_APP_URL = "https://discord.com/apps/dubu"; // TODO: real Discord app link

export const PLATFORMS: Record<PlatformId, Platform> = {
  whatsapp: {
    id: "whatsapp",
    name: "WhatsApp",
    ctaUrl: "https://wa.link/6l25x0",
    beta: false,
    chatLayout: "bubbles",
    receipts: "wa",
    statusLabel: "online",
    inputPlaceholder: "Type, voice, or send a photo…",
  },
  telegram: {
    id: "telegram",
    name: "Telegram",
    // The Telegram experience is the Mini App: every CTA opens it.
    ctaUrl: "https://t.me/dubupaybot",
    beta: false,
    chatLayout: "bubbles",
    receipts: "tg",
    statusLabel: "online",
    inputPlaceholder: "Message",
  },
  slack: {
    id: "slack",
    name: "Slack",
    ctaUrl: SLACK_APP_URL,
    beta: true,
    chatLayout: "rows",
    receipts: "none",
    statusLabel: "Active",
    inputPlaceholder: "Message Dubu",
  },
  discord: {
    id: "discord",
    name: "Discord",
    ctaUrl: DISCORD_APP_URL,
    beta: true,
    chatLayout: "rows",
    receipts: "none",
    statusLabel: "Online",
    inputPlaceholder: "Message @Dubu",
  },
};

export function isPlatformId(v: string | null | undefined): v is PlatformId {
  return v === "whatsapp" || v === "telegram" || v === "slack" || v === "discord";
}
