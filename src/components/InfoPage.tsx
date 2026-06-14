import { PageChrome } from "./PageChrome";
import { INFO_PAGES, type InfoSlug, type Block } from "../data/pages";

function BlockView({ block }: { block: Block }) {
  if (block.type === "text") {
    return (
      <section>
        {block.heading && <h2 className="font-display text-2xl text-cream">{block.heading}</h2>}
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-mist">
          {block.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "note") {
    return (
      <section className="rounded-2xl border border-gold/25 bg-gold/5 p-6">
        <h2 className="font-display text-lg text-cream">{block.heading}</h2>
        <div className="mt-2 space-y-2 text-sm leading-relaxed text-mist">
          {block.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "cards") {
    return (
      <section>
        {block.heading && <h2 className="mb-6 font-display text-2xl text-cream">{block.heading}</h2>}
        <div className="grid gap-5 sm:grid-cols-2">
          {block.items.map((c) => (
            <div key={c.title} className="rounded-2xl border border-line bg-ink-soft p-6">
              <h3 className="font-display text-lg text-cream">{c.title}</h3>
              {c.description && (
                <p className="mt-2 text-sm leading-relaxed text-mist">{c.description}</p>
              )}
              {c.action && (
                <a
                  href={c.action.href}
                  target={c.action.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.action.href.startsWith("http") ? "noreferrer" : undefined}
                  className="mt-5 inline-flex rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-gold/60 hover:text-gold"
                >
                  {c.action.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // jobs
  return (
    <section>
      {block.heading && <h2 className="mb-6 font-display text-2xl text-cream">{block.heading}</h2>}
      <div className="space-y-4">
        {block.items.map((job) => (
          <details key={job.title} className="group rounded-2xl border border-line bg-ink-soft">
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-6">
              <div>
                <h3 className="font-display text-lg text-cream">{job.title}</h3>
                <p className="mt-0.5 text-sm text-mist">{job.meta}</p>
              </div>
              <span className="shrink-0 text-sm text-mist group-open:hidden">View details</span>
            </summary>
            <div className="border-t border-line px-6 pb-6 pt-6">
              <p className="text-sm leading-relaxed text-mist">{job.description}</p>
              <h4 className="mt-6 text-sm font-semibold text-cream">Responsibilities</h4>
              <ul className="mt-3 space-y-2 text-sm text-mist">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="mt-1 shrink-0 text-gold">–</span>
                    {r}
                  </li>
                ))}
              </ul>
              {job.requirements && (
                <>
                  <h4 className="mt-6 text-sm font-semibold text-cream">Requirements</h4>
                  <ul className="mt-3 space-y-2 text-sm text-mist">
                    {job.requirements.map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="mt-1 shrink-0 text-gold">–</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function InfoPage({ slug }: { slug: InfoSlug }) {
  const page = INFO_PAGES[slug];
  return (
    <PageChrome>
      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">{page.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">{page.lead}</p>
      <div className="mt-12 space-y-12">
        {page.blocks.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </div>
    </PageChrome>
  );
}
