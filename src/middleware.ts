import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
 * Deliberately a small explicit map, not a blind passthrough of whatever
 * slug shows up in the URL — the public-facing name intentionally differs
 * from the engine's own internal slug (this domain always spells out
 * -starter/-growth; the engine drops the suffix for its default/Growth
 * tier — see registry.ts's own DEFAULT_BUSINESS_SLUG convention), and this
 * also means a client only ever gets a working /demo/<slug> URL once
 * they're deliberately added here — never automatically, matching "I
 * don't need this built out for all of them at the moment."
 *
 * Any slug not in this map (including the curated /demo/martinez-landscaping
 * landing page itself — see src/app/demo/[slug]/page.tsx — which has no
 * -starter/-growth suffix) falls through untouched to this site's own
 * normal routing.
 */
const ENGINE_ORIGIN = 'https://engine.summitstudioagency.com';

const PUBLIC_TO_ENGINE_SLUG: Record<string, string> = {
  'martinez-landscaping-growth': 'martinez-landscaping',
  'martinez-landscaping-starter': 'martinez-landscaping-starter',
  'ayala-landscaping-llc-growth': 'ayala-landscaping-llc',
  'ayala-landscaping-llc-starter': 'ayala-landscaping-llc-starter',
};

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
