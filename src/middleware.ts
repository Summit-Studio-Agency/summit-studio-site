import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import demos from '@/data/demos.json';

/**
 * Transparently reverse-proxies a handful of /demo/<slug> paths to the
 * real multi-tenant engine (engine.summitstudioagency.com) — so a
 * prospect visiting summitstudioagency.com/demo/martinez-landscaping-growth
 * never sees the engine subdomain at all, in the address bar or anywhere
 * else.
 *
 * Two things had to be true on the engine's side for this to actually
 * render correctly once fronted by this domain (both in that repo's
 * next.config.mjs / src/lib/asset-url.ts, not here):
 *   1. `assetPrefix` — makes _next/static chunk URLs absolute, since
 *      they're root-relative by default and would otherwise 404 against
 *      this deployment instead of the engine's.
 *   2. business.ts image paths resolve through assetUrl() into absolute
 *      URLs too, for the same reason — next/image's default loader
 *      builds a root-relative /_next/image?url=... regardless of
 *      assetPrefix (assetPrefix doesn't cover that route), so a plain
 *      relative image src would 400 against this deployment's own
 *      optimizer, which has no idea what e.g. /images/hero.jpg is. An
 *      absolute src makes next/image treat it as an ordinary allowlisted
 *      external image instead (this site's own next.config.mjs
 *      `images.remotePatterns` allows fetching from the engine's
 *      domain) — no middleware involvement needed for images at all.
 *
 * Not a blind passthrough — the public-facing name intentionally differs
 * from the engine's own internal slug (this domain always spells out
 * -starter/-growth; the engine drops the suffix for its default/Growth
 * tier — see registry.ts's own DEFAULT_BUSINESS_SLUG convention). The map
 * is DERIVED from src/data/demos.json (the same source the landing pages
 * render from), so the two can never drift: each demo contributes
 * `<slug>-growth -> engine.growth` and `<slug>-starter -> engine.starter`.
 * A prospect only gets working /demo/<slug>-* URLs once their entry is in
 * demos.json — added automatically by `npm run demo:publish` (see
 * scripts/publish-demo.mjs), no longer a hand-edited list here.
 *
 * Any slug not in this map (including the curated /demo/<slug> landing
 * pages themselves — see src/app/demo/[slug]/page.tsx — which have no
 * -starter/-growth suffix) falls through untouched to this site's own
 * normal routing.
 */
const ENGINE_ORIGIN = 'https://engine.summitstudioagency.com';

const PUBLIC_TO_ENGINE_SLUG: Record<string, string> = Object.fromEntries(
  demos.flatMap((d) => [
    [`${d.slug}-growth`, d.engine.growth],
    [`${d.slug}-starter`, d.engine.starter],
  ]),
);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = /^\/demo\/([^/]+)(\/.*)?$/.exec(pathname);
  if (!match) return NextResponse.next();

  const [, publicSlug, rest] = match;
  const engineSlug = PUBLIC_TO_ENGINE_SLUG[publicSlug];
  if (!engineSlug) return NextResponse.next();

  const url = new URL(`/demo/${engineSlug}${rest ?? ''}`, ENGINE_ORIGIN);
  url.search = request.nextUrl.search;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/demo/:path*'],
};
