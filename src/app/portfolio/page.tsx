import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageCTA } from '@/components/seo/PageCTA';
import { PortfolioCard } from '@/components/sections/PortfolioCard';
import { SITE } from '@/data/site';
import { breadcrumbsFor, generateBreadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: `Portfolio | ${SITE.name}`,
  description: 'Real, live example websites showing the quality and craftsmanship in every Summit Studio build — click through and look around.',
  path: '/portfolio',
});

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
          <div className="mt-8">
            <h1 className="xl:whitespace-nowrap font-display text-[clamp(1.5rem,4.2vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-secondary">
              See the quality for yourself
            </h1>
            <p className="mt-5 text-[clamp(0.7rem,1.5vw,1.125rem)] leading-relaxed text-muted">
              Every site below is real and live — not a mockup, not a screenshot. It&rsquo;s a representative
              sample of the quality, design, and functionality included in every Summit Studio website, not a
              paying-client engagement — we&rsquo;re telling you that directly rather than letting you assume
              otherwise. Click through and look around, then picture your own business in its place.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="sage" className="pt-0">
        <Container>
          <h2 className="sr-only">Example builds</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
        subhead="The same quality, pointed at your business — we'll show you before you decide anything."
      />
    </>
  );
}
