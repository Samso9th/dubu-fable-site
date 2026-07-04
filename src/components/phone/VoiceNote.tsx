export function VoiceNote({ duration }: { duration: string }) {
  return (
    <span className="flex items-center gap-2 py-0.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/90 text-[10px] text-ink">
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
