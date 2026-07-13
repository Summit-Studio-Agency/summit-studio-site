import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SITE } from '@/data/site';

export function Process() {
  return (
    <Section id="process" tone="sage">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From first look to live website, without the guesswork"
          intro="The same five steps every time — nothing about your project starts from a blank page."
          wide
        />

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {SITE.process.map((item, i) => (
            <Reveal key={item.step} as="li" delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-4xl border border-foreground/8 bg-background p-6 shadow-soft">
                <span className="font-display text-3xl font-semibold text-primary/30">{item.step}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-secondary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
