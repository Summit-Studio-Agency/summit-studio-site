import type { Metadata } from 'next';
import { Check, Minus } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageCTA } from '@/components/seo/PageCTA';
import { PricingCard } from '@/components/sections/PricingCard';
import { SITE } from '@/data/site';
import { breadcrumbsFor, generateBreadcrumbJsonLd, pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const metadata: Metadata = pageMetadata({
  title: `Pricing | ${SITE.name}`,
  description: 'Starter, Growth, and Website Care: a setup fee plus a small monthly fee, or no upfront investment at all.',
  path: '/pricing',
});

interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  growth: string | boolean;
  websiteCare: string | boolean;
}

const COMPARISON: ComparisonRow[] = [
  { feature: 'Setup fee', starter: '$999', growth: '$1,999', websiteCare: 'None' },
  { feature: 'Monthly fee', starter: '$49/mo', growth: '$79/mo', websiteCare: '$149/mo' },
  { feature: 'Term', starter: 'Cancel anytime', growth: 'Cancel anytime', websiteCare: '12-month agreement' },
  { feature: 'Service pages', starter: 'Up to 6', growth: 'Up to 12', websiteCare: 'Included' },
  { feature: 'Service-area / location pages', starter: 'Up to 10', growth: 'Up to 20', websiteCare: 'Included' },
  { feature: 'Hosting, SSL & domain assistance', starter: true, growth: true, websiteCare: true },
  { feature: 'Interactive before/after gallery', starter: false, growth: true, websiteCare: true },
  { feature: 'Advanced SEO', starter: false, growth: true, websiteCare: true },
  { feature: 'Review management', starter: false, growth: true, websiteCare: true },
  { feature: 'Included monthly content edits', starter: false, growth: false, websiteCare: 'Unlimited minor edits' },
  { feature: 'Support level', starter: 'Basic', growth: 'Priority', websiteCare: 'Ongoing, hands-off' },
  { feature: 'Who owns the site', starter: 'You, after setup', growth: 'You, after setup', websiteCare: 'Part of the managed service' },
];

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="mx-auto h-5 w-5 text-highlight" role="img" aria-label="Included" />
    ) : (
      <Minus className="mx-auto h-5 w-5 text-foreground/20" role="img" aria-label="Not included" />
    );
  }
  return <span className="text-sm font-medium text-foreground">{value}</span>;
}

const BEST_FOR = [
  { option: 'Starter', recommended: false, description: 'New businesses or companies replacing an outdated website.' },
  { option: 'Growth', recommended: true, description: 'Established businesses that want more leads and stronger local SEO.' },
  { option: 'Website Care', recommended: false, description: 'Owners who want a hands-off solution with no upfront investment.' },
];

export default function PricingPage() {
  const crumbs = breadcrumbsFor('Pricing', '/pricing');
  const packages = SITE.pricing.filter((p) => p.name !== 'Custom');
  const customPackage = SITE.pricing.find((p) => p.name === 'Custom')!;

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
              Straightforward pricing, no surprises
            </h1>
            <p className="mt-5 xl:whitespace-nowrap text-[clamp(0.85rem,1.8vw,1.08rem)] leading-relaxed text-muted">
              One flat setup fee plus a small monthly fee — or no upfront cost at all on Website Care. No hourly
              billing, no scope creep, no fine print to decode.
            </p>
            <p className="mt-3 text-[clamp(0.7rem,1.5vw,0.875rem)] leading-relaxed text-muted">{SITE.paymentTerms}</p>
          </div>
        </Container>
      </Section>

      {/* Package cards */}
      <Section tone="sage" className="pt-0">
        <Container>
          <h2 className="sr-only">Pricing packages</h2>
          <div className="mx-auto grid grid-cols-1 max-w-5xl gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <Reveal key={pkg.name}>
                <PricingCard pkg={pkg} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl rounded-4xl border border-dashed border-foreground/15 bg-background p-6 text-center">
              <h3 className="font-display text-lg font-semibold text-secondary">{customPackage.name}</h3>
              <p className="mt-1.5 text-sm text-muted">{customPackage.description}</p>
              <p className="mt-1 text-2xl font-semibold text-secondary">{customPackage.setupPrice}</p>
              <a href={SITE.quotesEmailHref} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                Ask about a custom quote →
              </a>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Best-for self-select table */}
      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow="Which is right for you" title="Find your plan in one line" wide />

          <Reveal delay={0.06}>
            <div className="mt-10 overflow-x-auto rounded-4xl border border-foreground/8 shadow-soft">
              <table className="w-full border-collapse bg-background text-left">
                <caption className="sr-only">Which Summit Studio plan is best for your situation</caption>
                <thead>
                  <tr className="border-b border-foreground/8">
                    <th className="px-4 py-4 text-sm font-semibold text-muted sm:px-6">Option</th>
                    <th className="px-4 py-4 text-sm font-semibold text-muted sm:px-6">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {BEST_FOR.map((row, i) => (
                    <tr
                      key={row.option}
                      className={cn('border-b border-foreground/6 last:border-0', i % 2 === 1 && 'bg-surface-50/60')}
                    >
                      <td className="px-4 py-4 sm:px-6">
                        <span
                          className={cn(
                            'flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold',
                            row.recommended ? 'text-primary' : 'text-secondary',
                          )}
                        >
                          {row.option}
                          {row.recommended && (
                            <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                              Recommended
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground sm:px-6">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Comparison table */}
      <Section tone="sage">
        <Container>
          <SectionHeading eyebrow="Compare plans" title="Exactly what's different, side by side" wide />

          <Reveal delay={0.08}>
            <p className="mt-10 text-xs text-muted lg:hidden">Scroll to see the full table →</p>
            <div className="mt-2 overflow-x-auto rounded-4xl border border-foreground/8 shadow-soft lg:mt-10">
              <table className="w-full min-w-[640px] border-collapse bg-background text-left">
                <caption className="sr-only">Feature comparison across Starter, Growth, and Website Care plans</caption>
                <thead>
                  <tr className="border-b border-foreground/8">
                    <th className="sticky left-0 z-10 border-r border-foreground/8 bg-background px-6 py-4 text-sm font-semibold text-muted">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-secondary">Starter</th>
                    <th className="bg-primary/5 px-6 py-4 text-center text-sm font-semibold text-secondary">Growth ⭐</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-secondary">Website Care</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={cn('border-b border-foreground/6 last:border-0', i % 2 === 1 && 'bg-surface-50/60')}
                    >
                      <td
                        className={cn(
                          'sticky left-0 z-10 border-r border-foreground/8 px-6 py-4 text-sm text-foreground',
                          i % 2 === 1 ? 'bg-surface-50' : 'bg-background',
                        )}
                      >
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Cell value={row.starter} />
                      </td>
                      <td className="bg-primary/5 px-6 py-4 text-center">
                        <Cell value={row.growth} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Cell value={row.websiteCare} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>

      <PageCTA heading="Ready to see it built?" subhead="Get a real demo of your site — no cost, no commitment." />
    </>
  );
}
