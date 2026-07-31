/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DEMOS — real prospect/reference demo sites reachable only via a direct
 *  URL (/demo/[slug]), never linked from anywhere on this site and excluded
 *  from the sitemap and from search indexing (robots.ts disallows /demo/,
 *  and each page also sets its own `robots: { index: false }`).
 *
 *  Built for the actual outreach workflow: build a real demo for a prospect
 *  in the engine, then run `npm run demo:publish -- <engine-growth-slug>`
 *  from this repo — that command captures fresh tile screenshots off the
 *  live engine, upserts the entry below (in `demos.json`), and deploys, so
 *  the prospect gets a Summit-Studio-branded landing page linking into both
 *  their Starter and Growth demos. Re-run the same command anytime to
 *  refresh the tiles after a review-queue pass. See scripts/publish-demo.mjs.
 *
 *  Data lives in `demos.json` (not inline here) so the publish script can
 *  edit it as plain data rather than parsing TypeScript. `src/middleware.ts`
 *  derives its public-slug -> engine-slug proxy map from the same file, so
 *  the two never drift.
 * ─────────────────────────────────────────────────────────────────────────
 */
import demosData from './demos.json';

export interface DemoPackageOption {
  tier: 'Growth' | 'Starter';
  url: string;
  highlights: string[];
  /** Screenshot shown on this package's card. Omit if none exists yet. */
  image?: string;
}

export interface DemoEntry {
  slug: string;
  business: string;
  tagline: string;
  /** The engine's own tenant slugs this landing page points at, used by
   *  src/middleware.ts to build the /demo/<slug>-{starter,growth} proxy. */
  engine: { growth: string; starter: string };
  /** One or more live package demos built for this business. */
  packages: DemoPackageOption[];
}

export const DEMOS: DemoEntry[] = demosData as DemoEntry[];

export function getDemoBySlug(slug: string): DemoEntry | undefined {
  return DEMOS.find((d) => d.slug === slug);
}
