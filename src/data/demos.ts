/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DEMOS — real prospect/reference demo sites reachable only via a direct
 *  URL (/demo/[slug]), never linked from anywhere on this site and excluded
 *  from the sitemap and from search indexing (robots.ts disallows /demo/,
 *  and each page also sets its own `robots: { index: false }`).
 *
 *  Built for the actual outreach workflow: build a real demo for a
 *  prospect, add one entry here, then send them this page's URL — they see
 *  a Summit-Studio-branded landing page first, with a clear link into the
 *  actual live demo(s) built for their business. Reusable for any future
 *  prospect, not just the reference entries below.
 * ─────────────────────────────────────────────────────────────────────────
 */

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
  /** One or more live package demos built for this business. */
  packages: DemoPackageOption[];
}

export const DEMOS: DemoEntry[] = [
  {
    slug: 'martinez-landscaping',
    business: 'Martinez Landscaping & Tree Services',
    tagline: 'Landscapes worth coming home to.',
    // Starter listed first so it renders on the left, Growth on the right.
    packages: [
      {
        tier: 'Starter',
        url: '/demo/martinez-landscaping-starter',
        highlights: ['Core service pages', 'Same premium design system', 'Clean, mobile-first build'],
        image: '/images/portfolio/martinez-starter.jpg',
      },
      {
        tier: 'Growth',
        // Same-origin — src/middleware.ts transparently proxies this to the
        // real engine (engine.summitstudioagency.com) so it never appears
        // in the address bar. See that file's header comment for the
        // public-slug -> engine-slug mapping this depends on.
        url: '/demo/martinez-landscaping-growth',
        highlights: ['Interactive before/after gallery', 'Services × town SEO matrix', 'Wider local-SEO coverage'],
        image: '/images/portfolio/martinez-growth.jpg',
      },
    ],
  },
  {
    slug: 'ayala-landscaping-llc',
    business: 'Ayala Landscaping LLC',
    tagline: 'Property care — on time, done clean.',
    packages: [
      {
        tier: 'Starter',
        url: '/demo/ayala-landscaping-llc-starter',
        highlights: ['Core service pages', 'Same premium design system', 'Clean, mobile-first build'],
        image: '/images/portfolio/ayala-starter.jpg',
      },
      {
        tier: 'Growth',
        url: '/demo/ayala-landscaping-llc-growth',
        highlights: ['Services × town SEO matrix', 'Wider local-SEO coverage', 'Advanced on-page SEO'],
        image: '/images/portfolio/ayala-growth.jpg',
      },
    ],
  },
];

export function getDemoBySlug(slug: string): DemoEntry | undefined {
  return DEMOS.find((d) => d.slug === slug);
}
