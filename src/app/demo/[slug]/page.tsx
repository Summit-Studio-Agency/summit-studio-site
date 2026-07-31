import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { DEMOS, getDemoBySlug, type DemoPackageOption } from '@/data/demos';
import { SITE } from '@/data/site';

/**
 * Hidden, unlisted demo landing page — reachable only if you already have
 * the exact URL (sent directly to a prospect during outreach). Never
 * linked from any nav/portfolio/sitemap on this site; robots.ts also
 * disallows /demo/ entirely, and this page sets its own noindex as a
 * second, independent guard against being crawled.
 *
 * Presentation matches the public /portfolio (PortfolioCard): full
 * site-width container, the same lift-on-hover card treatment, Starter on
 * the left and Growth (marked Recommended) on the right.
 */

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return DEMOS.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const demo = getDemoBySlug(params.slug);
  return {
    title: demo ? `Your demo — ${demo.business}` : 'Demo not found',
    robots: { index: false, follow: false },
  };
}

/** One package card — mirrors PortfolioCard's hover/shape, as a whole-card
 *  link into the live demo (opens in a new tab so the two stay comparable). */
function PackageCard({ business, pkg }: { business: string; pkg: DemoPackageOption }) {
  const isGrowth = pkg.tier === 'Growth';
  return (
    <a
      href={pkg.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-4xl border bg-background shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift',
        isGrowth ? 'border-primary/30 ring-1 ring-primary/20' : 'border-foreground/8',
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-50">
        {pkg.image && (
          <Image
            src={pkg.image}
            alt={`${business} ${pkg.tier} package homepage screenshot`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <span
          className={cn(
            'absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
            isGrowth ? 'bg-primary text-surface-50' : 'bg-accent text-secondary',
          )}
        >
          {pkg.tier} package
        </span>
        {isGrowth && (
          <span className="absolute right-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-surface-50">
            ★ Recommended
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <ul className="flex flex-wrap gap-2.5">
          {pkg.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full bg-secondary/[0.12] px-3.5 py-1.5 text-sm font-medium text-secondary ring-1 ring-inset ring-secondary/15"
            >
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-foreground/8 pt-4">
          <span className="font-display text-base font-semibold text-secondary">
            View your {pkg.tier} demo
          </span>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-primary" aria-hidden="true" />
        </div>
      </div>
    </a>
  );
}

export default function DemoPage({ params }: { params: Params }) {
  const demo = getDemoBySlug(params.slug);
  if (!demo) notFound();

  // Starter always left, Growth always right, regardless of data order.
  const packages = [...demo.packages].sort((a, b) => (a.tier === b.tier ? 0 : a.tier === 'Starter' ? -1 : 1));

  return (
    <Section tone="paper" className="min-h-[80svh] py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="Your demo is ready"
            title={`Here's what we built for ${demo.business}`}
            intro={`No cost, no commitment — just a real, working look at what your website could be. ${
              packages.length > 1
                ? "We've built it at two package levels so you can compare, side by side."
                : ''
            }`}
          />
        </div>

        <div
          className={cn(
            'mx-auto mt-12 grid grid-cols-1 gap-6',
            packages.length > 1 ? 'md:grid-cols-2' : 'max-w-xl',
          )}
        >
          {packages.map((pkg, i) => (
            <Reveal key={pkg.tier} delay={i * 0.06}>
              <PackageCard business={demo.business} pkg={pkg} />
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-sm text-muted">
          Questions, or ready to move forward? Just reply to the message that sent you this link, or reach us at{' '}
          <a href={SITE.emailHref} className="font-medium text-primary underline-offset-4 hover:underline">
            {SITE.email}
          </a>
          .
        </p>
      </Container>
    </Section>
  );
}
