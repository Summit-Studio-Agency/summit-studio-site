import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SITE } from '@/data/site';

export function Advantages() {
  return (
    <Section id="advantages" tone="paper">
      <Container>
        <SectionHeading
          eyebrow="Why Summit Studio"
          title="What you're actually paying for"
          intro="Not a technology pitch — a working process built around getting you a site you can trust, fast."
          wide
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SITE.advantages.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="h-full rounded-4xl border border-foreground/8 bg-surface-50 p-7">
                <h3 className="font-display text-lg font-semibold text-secondary">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
