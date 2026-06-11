# Dubu — Fable Site

A motion-driven landing page for Dubu's WhatsApp payments product.
**Send money at the speed of chat.**

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS 4** — design tokens in `src/index.css` (`@theme`)
- **GSAP 3 + ScrollTrigger** (`@gsap/react`) — all scroll choreography
- **Lenis** — smooth scrolling (anchors enabled)

## Run

```bash
npm install
npm run dev      # http://localhost:3002
npm run build    # typecheck + production bundle
npm run preview
```

## Experience map

| Section | Motion |
|---|---|
| Preloader | Counter + wordmark, slides away and hands off to the hero |
| Hero | Line-masked headline reveal, looping WhatsApp conversation in a phone mockup with typing indicators, floating currency pills, scroll parallax |
| Ticker | Two crossing marquee bands (gold / outline) |
| Why complicate it? | Old-way steps strike through on scroll; Dubu chat bubbles pop in |
| Talk to Dubu | Desktop: scrollytelling with sticky phone — chat script swaps per step. Mobile: tab switcher |
| Moments | Desktop: pinned horizontal scroll rail (8 cards). Mobile: snap carousel |
| How it works / Features / Trust / FAQ | Staggered reveals, accordion |
| Footer | Giant outlined DUBU wordmark with scrub parallax |

`prefers-reduced-motion` is respected everywhere (animations are skipped, content shown statically).

## Content

All copy lives in `src/data/content.ts` — sourced from the original
`dubu-whatapp-landing` site (waitlist URL, chat scripts, moments, FAQ, partners).
Brand assets are copied from the same repo into `public/`.
