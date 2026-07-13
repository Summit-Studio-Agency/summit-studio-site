import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

const TRUST_POINTS = ['A real demo before you commit', 'Fixed, transparent pricing', 'You always own your domain'];

/**
 * No hero photograph — this is Summit Studio's own site, not a client demo,
 * and Decision 011's placeholder-image allowance is specifically for client
 * demos, not the agency's own claims. Rather than source or fabricate stock
 * photography, the hero visual is a built browser-mockup card: an honest
 * representation of "a website," not a photo implying anything unverified.
 *
 * Uses a raw <section>, not the shared <Section> wrapper — hero padding
 * needs its own top/bottom rhythm (tighter top, since Navbar is fixed and
 * <main> already carries pt-18) that fighting Section's default py would
 * require overriding anyway.
 */
export function Hero() {
  return (
    <section id="top" className="bg-background pb-16 pt-8 sm:pb-24 sm:pt-12">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                Website design for landscaping &amp; home-service businesses
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-display-lg font-semibold text-secondary">
                Websites that get you <span className="text-primary">found, called,</span> and hired.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                See your actual website first — a real, working demo of your business, built before you
                ever pay us anything. If it doesn&rsquo;t look better than what you have now, walk away.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="lg">
                  Get a free demo
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button href="/portfolio" variant="outline" size="lg">
                  See our work
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
                {TRUST_POINTS.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-highlight" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal from="right" delay={0.1}>
              <BrowserMockup />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Abstract "browser window" card — the hero's visual anchor. */
function BrowserMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-5xl bg-gradient-to-br from-primary/10 via-accent/10 to-transparent blur-2xl" aria-hidden="true" />
      <div className="overflow-hidden rounded-4xl border border-foreground/8 bg-background shadow-lift">
        <div className="flex items-center gap-1.5 border-b border-foreground/8 bg-surface-50 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="ml-3 h-5 flex-1 rounded-full bg-foreground/5" />
        </div>
        <div className="space-y-4 p-6 sm:p-8">
          <div className="h-6 w-2/3 rounded-full bg-secondary/90" />
          <div className="h-3 w-5/6 rounded-full bg-foreground/10" />
          <div className="h-3 w-4/6 rounded-full bg-foreground/10" />
          <div className="mt-6 h-28 rounded-3xl bg-gradient-to-br from-primary/20 to-highlight/20" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-16 rounded-2xl bg-surface-50" />
            <div className="h-16 rounded-2xl bg-surface-50" />
            <div className="h-16 rounded-2xl bg-surface-50" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <div className="h-9 w-28 rounded-full bg-accent" />
            <div className="h-9 w-24 rounded-full border border-foreground/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
