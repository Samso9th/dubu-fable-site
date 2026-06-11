import { TICKER_ITEMS } from "../data/content";

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`marquee-track items-center gap-0 ${reverse ? "reverse" : ""}`}
      style={{ "--marquee-duration": reverse ? "34s" : "26s" } as React.CSSProperties}
    >
      {doubled.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="font-display whitespace-nowrap px-6 text-xl uppercase tracking-wide sm:text-2xl">
            {item}
          </span>
          <span aria-hidden className="text-xl opacity-60">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <section aria-label="Highlights" className="relative z-20 -my-6 overflow-hidden py-6">
      <div className="rotate-[-1.6deg]">
        <div className="bg-gold py-3.5 text-ink shadow-[0_16px_48px_-16px_rgba(0,0,0,0.55)]">
          <Row items={TICKER_ITEMS} />
        </div>
        <div className="border-y border-line bg-ink-soft py-3 text-cream/35">
          <Row items={TICKER_ITEMS} reverse />
        </div>
      </div>
    </section>
  );
}
