import { Mail } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SITE } from '@/data/site';

/**
 * Founder introduction — About page only (Trust & Founder Polish pass,
 * pre-outreach). Grounded strictly in real facts about why Summit Studio
 * exists and how projects get run; no invented history or experience.
 *
 * The headshot is a styled placeholder (initials in a frame using the
 * same rounded/bordered language as every other card on this site) —
 * there's no real photo yet. Swapping in a real one later is a one-line
 * change: replace the <span> monogram block below with a Next <Image>.
 */
export function Founder() {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="mx-auto flex aspect-square w-48 items-center justify-center rounded-5xl border border-foreground/8 bg-surface-50 shadow-soft sm:w-56 lg:mx-0 lg:w-full">
                <span className="font-display text-6xl font-semibold text-primary/40" aria-hidden="true">
                  J
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-highlight">
                From the founder
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-heading font-semibold text-secondary">Hi, I&rsquo;m Jeff.</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-5 max-w-2xl space-y-4 text-[17px] leading-relaxed text-muted">
                <p>
                  I started Summit Studio after noticing how many genuinely good local service
                  businesses were still working with an outdated website, or no website at all —
                  despite doing excellent work for their customers every day.
                </p>
                <p>
                  I like building systems that solve real problems, and a website is exactly that
                  kind of problem: part technical, part design, all in service of one outcome —
                  helping a business look as professional online as it already is in the field, and
                  turning that into more calls.
                </p>
                <p>
                  Every project gets built the same way. You&rsquo;re heard throughout the
                  process, not handed a template and a deadline. The goal was never just
                  &ldquo;a website&rdquo; — it&rsquo;s a site you&rsquo;re genuinely proud to send someone.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-6 flex items-center gap-3">
                <span className="font-display text-xl italic text-secondary">Jeff</span>
                <span className="text-sm text-muted">Founder, Summit Studio</span>
              </div>
              <a
                href={SITE.founderEmailHref}
                className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary underline-offset-2 hover:underline"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {SITE.founderEmail}
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
