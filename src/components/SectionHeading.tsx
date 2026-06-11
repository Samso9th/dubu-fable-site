import { useRef, type ReactNode } from "react";
import { useGSAP, revealUp } from "../lib/gsap";

type Props = {
  kicker: string;
  title: ReactNode;
  blurb?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeading({
  kicker,
  title,
  blurb,
  align = "center",
  dark = true,
}: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      revealUp("[data-sh]", root.current!);
    },
    { scope: root }
  );

  const alignCls =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div ref={root} className={`flex flex-col gap-4 ${alignCls}`}>
      <span
        data-sh
        data-reveal
        className={`kicker ${dark ? "text-gold" : "text-gold-deep"}`}
      >
        {kicker}
      </span>
      <h2
        data-sh
        data-reveal
        className={`display-xl max-w-3xl ${dark ? "text-cream" : "text-pine"}`}
      >
        {title}
      </h2>
      {blurb && (
        <p
          data-sh
          data-reveal
          className={`max-w-xl text-base leading-relaxed sm:text-lg ${
            dark ? "text-mist" : "text-pine-soft"
          }`}
        >
          {blurb}
        </p>
      )}
    </div>
  );
}
