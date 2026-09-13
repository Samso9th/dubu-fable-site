import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Platform } from "../data/platforms";

/**
 * The platform CTA as a link. Live platforms (WhatsApp, Telegram) deep-link
 * out to their bot / mini app; beta platforms (Slack, Discord) don't have a
 * bot yet, so every CTA routes to the /beta page instead — explanation plus
 * signup form. Keeping this in one place is what makes flipping a platform
 * from beta to live a one-line change in platforms.ts.
 */
export function PlatformCta({
  platform,
  className,
  children,
}: {
  platform: Platform;
  className?: string;
  children: ReactNode;
}) {
  if (platform.beta) {
    return (
      <Link to="/beta" className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={platform.ctaUrl} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

/** CTA copy that matches where the button actually goes. */
export function platformCtaLabel(platform: Platform): string {
  return platform.beta ? `Join the ${platform.name} beta` : `Chat on ${platform.name}`;
}