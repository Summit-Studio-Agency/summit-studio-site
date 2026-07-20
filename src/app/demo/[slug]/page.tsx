import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { DEMOS, getDemoBySlug } from '@/data/demos';
import { SITE } from '@/data/site';

/**
 * Hidden, unlisted demo landing page — reachable only if you already have
 * the exact URL (sent directly to a prospect during outreach). Never
 * linked from any nav/portfolio/sitemap on this site; robots.ts also
 * disallows /demo/ entirely, and this page sets its own noindex as a
 * second, independent guard against being crawled.
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

export default function DemoPage({ params }: { params: Params }) {
  const demo = getDemoBySlug(params.slug);
  if (!demo) notFound();

  return (
    <Section tone="paper" className="min-h-[80svh] py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Your demo is ready"
            title={`Here's what we built for ${demo.business}`}
            intro={`No cost, no commitment — just a real, working look at what your website could be. ${
              demo.packages.length > 1
                ? "We've built it at two package levels so you can compare."
                : ''
            }`}
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {demo.packages.map((pkg, i) => (
              <Reveal key={pkg.tier} delay={i * 0.06}>
                <div className="flex h-full flex-col justify-between overflow-hidden rounded-4xl border border-foreground/8 bg-background shadow-soft">
                  {pkg.image && (
                    <div className="relative aspect-[16/10] w-full bg-surface-50">
                      <Image src={pkg.image} alt={`${demo.business} ${pkg.tier} package homepage screenshot`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <span
                        className={
                          pkg.tier === 'Growth'
                            ? 'inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-surface-50'
                            : 'inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary'
                        }
                      >
                        {pkg.tier} package
                      </span>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {pkg.highlights.map((h) => (
                          <li key={h} className="rounded-full bg-surface-50 px-3 py-1 text-xs font-medium text-foreground">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button href={pkg.url} className="mt-6 w-full" size="lg">
                      View your {pkg.tier} demo
                      <ArrowUpRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted">
            Questions, or ready to move forward? Just reply to the message that sent you this link, or reach us at{' '}
            <a href={SITE.emailHref} className="font-medium text-primary underline-offset-4 hover:underline">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}
