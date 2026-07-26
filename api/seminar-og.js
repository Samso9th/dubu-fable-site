// Dynamic Open Graph tags for /seminar.
//
// The site is a client-rendered SPA, so link-preview crawlers (WhatsApp,
// Twitter/X, Facebook, LinkedIn, Slack) never execute the React that knows which
// seminar is current — they read whatever <head> the server hands back. That
// means the flyer has to be in the HTML itself, not set at runtime.
//
// This edge function sits in front of /seminar: it fetches the current seminar
// from the Dubu API, takes the deployment's own index.html, swaps the OG/Twitter
// block for seminar-specific tags, and returns it. Real visitors get the exact
// same HTML and the SPA boots as usual — only the <head> differs.
//
// Every failure path returns the untouched shell, so a slow or down API costs us
// the flyer preview, never the page.

export const config = { runtime: 'edge' };

const API_BASE = (process.env.VITE_API_URL || 'https://api.dubupay.com').replace(/\/$/, '');
const SITE = 'https://www.dubupay.com';
const API_TIMEOUT_MS = 2500;

function escapeAttr(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Flyers are portrait; preview cards are 1200x630 landscape. Cropping to fill
 * would cut the top and bottom off the design, so we pad onto a matched
 * background instead — the whole flyer stays visible and we can declare exact
 * dimensions, which several crawlers need to render a large card at all.
 * Also caps file size (q_auto, f_auto), since WhatsApp skips heavy images.
 */
function previewImage(url) {
  if (!url) return null;
  const marker = '/image/upload/';
  const i = url.indexOf(marker);
  if (i === -1) return url; // not a Cloudinary asset — use it as-is
  const transform = 'c_pad,b_auto,w_1200,h_630,q_auto,f_auto';
  return `${url.slice(0, i + marker.length)}${transform}/${url.slice(i + marker.length)}`;
}

async function fetchSeminar() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const res = await fetch(`${API_BASE}/public/seminar`, { signal: controller.signal });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.seminar ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Drops the shell's own title/description/OG/Twitter tags so ours can't end up
 * as duplicates — crawlers pick unpredictably when a property appears twice.
 * `[^>]*` spans newlines, which matters: several of these tags are multi-line.
 */
function stripMeta(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(
      /<meta[^>]*(?:property|name)="(?:og:[^"]*|twitter:[^"]*|description)"[^>]*>/gi,
      ''
    );
}

function buildTags({ title, description, image, url, past }) {
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  const tags = [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="Dubu" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@dubupay" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
  ];

  if (image) {
    const img = escapeAttr(image);
    tags.push(
      `<meta property="og:image" content="${img}" />`,
      `<meta property="og:image:secure_url" content="${img}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${t}${past ? '' : ' — event flyer'}" />`,
      `<meta name="twitter:image" content="${img}" />`,
      `<meta name="twitter:image:alt" content="${t}" />`
    );
  }

  return tags.join('\n    ');
}

export default async function handler(request) {
  const origin = new URL(request.url).origin;

  // The shell is a static asset on this same deployment, so it is never routed
  // back through this function — no recursion.
  const shellRes = await fetch(`${origin}/index.html`);
  const shell = await shellRes.text();

  const seminar = await fetchSeminar();

  // No seminar configured, or the API was unreachable — hand back the shell
  // untouched so /seminar keeps its sitewide preview rather than none.
  if (!seminar) {
    return new Response(shell, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=600',
      },
    });
  }

  const when = seminar.time_label
    ? `${seminar.date_label}, ${seminar.time_label}`
    : seminar.date_label;

  const title = seminar.is_past
    ? `${seminar.title} — Dubu`
    : `${seminar.title} — free live seminar, ${seminar.date_label}`;

  const description = seminar.is_past
    ? `This session has ended. Join Dubu Hustle HQ to hear about the next one first.`
    : seminar.subtitle
      ? `${seminar.subtitle} Free and live on ${when}, inside Dubu Hustle HQ.`
      : `A free live seminar on ${when}, hosted inside Dubu Hustle HQ.`;

  const html = stripMeta(shell).replace(
    '</head>',
    `  ${buildTags({
      title,
      description,
      image: previewImage(seminar.flyer),
      url: `${SITE}/seminar`,
      past: seminar.is_past,
    })}\n  </head>`
  );

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      // Crawlers re-fetch often; a few minutes of edge cache keeps this off the
      // API without making a flyer swap feel stale.
      'cache-control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
  });
}
