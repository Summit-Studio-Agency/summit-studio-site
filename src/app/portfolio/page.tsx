import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageCTA } from '@/components/seo/PageCTA';
import { PortfolioCard } from '@/components/sections/PortfolioCard';
import { SITE } from '@/data/site';
import { breadcrumbsFor, generateBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Portfolio | ${SITE.name}`,
  description: 'Real example websites built on the Summit Studio engine — see what\'s live, and what\'s a walkthrough.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  const crumbs = breadcrumbsFor('Portfolio', '/portfolio');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd(crumbs)) }}
      />

      <Section tone="paper" className="pb-10 pt-12 sm:pb-14">
        <Container>
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 max-w-2xl">
            <h1 className="font-display text-display font-semibold text-secondary">See the engine in action</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Every site below is a real build on the Summit Studio template — not a mockup, not a screenshot.
              These are example builds demonstrating the platform, not paying-client engagements — we&rsquo;re
              telling you that directly rather than letting you assume otherwise. Click through the live one, or
              ask us for a walkthrough of the other.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="sage" className="pt-0">
        <Container>
          <h2 className="sr-only">Example builds</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {SITE.portfolio.map((entry, i) => (
              <Reveal key={entry.slug} delay={i * 0.06}>
                <PortfolioCard entry={entry} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <PageCTA
        heading="Want to see your own business built out?"
        subhead="The same engine, pointed at your business — we'll show you before you decide anything."
      />
    </>
  );
}
