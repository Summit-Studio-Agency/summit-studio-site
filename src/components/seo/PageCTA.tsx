import { ArrowRight, Mail } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/data/site';

interface PageCTAProps {
  heading: string;
  subhead?: string;
}

/** Lightweight CTA block reused at the bottom of every non-home page. */
export function PageCTA({ heading, subhead }: PageCTAProps) {
  return (
    <Section tone="forest">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-surface-50">{heading}</h2>
          {subhead && <p className="mt-4 text-lg leading-relaxed text-surface-50/70">{subhead}</p>}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="/contact" size="lg">
              Get a free demo
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href={SITE.emailHref} variant="onDark" size="lg">
              <Mail className="h-5 w-5" />
              {SITE.email}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
