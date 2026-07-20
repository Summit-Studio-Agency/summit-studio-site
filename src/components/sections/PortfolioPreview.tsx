import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { PortfolioCard } from './PortfolioCard';
import { SITE } from '@/data/site';

export function PortfolioPreview() {
  // Only 2 portfolio entries exist today (SITE.portfolio) -- slicing to 3
  // and laying out 3 grid columns left an always-empty third column,
  // reading as two cards stranded in the left/middle of a 3-column section.
  const featured = SITE.portfolio.slice(0, 2);

  return (
    <Section id="work" tone="paper">
      <Container>
        <SectionHeading
          eyebrow="See it live"
          title="Real builds, not mockups"
          intro={
            <span className="block xl:whitespace-nowrap text-[clamp(0.85rem,1.9vw,1.125rem)]">
              Every example below is a real, live site — the same quality every client gets. Click through and look around.
            </span>
          }
          maxWidthClassName="max-w-2xl lg:max-w-6xl"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {featured.map((entry, i) => (
            <Reveal key={entry.slug} delay={i * 0.06}>
              <PortfolioCard entry={entry} priority={i === 0} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <div className="mt-10 text-center">
            <Button href="/portfolio" variant="outline">
              View full portfolio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
