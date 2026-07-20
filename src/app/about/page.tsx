import type { Metadata } from 'next';
import Link from 'next/link';
import { Target, Eye, ShieldCheck, Handshake } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageCTA } from '@/components/seo/PageCTA';
import { Founder } from '@/components/sections/Founder';
import { SITE } from '@/data/site';
import { breadcrumbsFor, generateBreadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: `About | ${SITE.name}`,
  // A dedicated, search-result-length description — SITE.mission is several
  // sentences long and was getting truncated mid-thought in SERPs.
  description: 'Why Summit Studio exists, who we build for, and the operating principles — no fabricated proof, no lock-in — that shape every site we build.',
  path: '/about',
});

const PRINCIPLES = [
  {
    icon: Eye,
    title: 'Show, don’t ask you to imagine',
    description:
      'We build your demo before you sign anything. You’re never asked to picture a finished site from a description.',
  },
  {
    icon: ShieldCheck,
    title: 'No fabricated proof',
    description:
      'We don’t invent testimonials or reviews for a demo or a finished site. What you see is what actually exists — nothing dressed up.',
  },
  {
    icon: Target,
    title: 'Outcomes, not jargon',
    description:
      'You’re buying more calls and more customers, not a technology briefing. We talk in results, not in tooling.',
  },
  {
    icon: Handshake,
    title: 'No lock-in',
    description:
      'Your domain is always yours. Starter and Growth are cancel-anytime; Website Care trades a 12-month term for zero upfront cost. Either way, the trade-off is stated up front — never something you discover after signing.',
  },
];

export default function AboutPage() {
  const crumbs = breadcrumbsFor('About', '/about');

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
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-highlight">About Summit Studio</span>
            <h1 className="mt-4 xl:whitespace-nowrap font-display text-[clamp(1.5rem,4.2vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-secondary">
              A new studio, built around one idea
            </h1>
            <p className="mt-6 text-[clamp(0.85rem,1.9vw,1.125rem)] leading-relaxed text-muted">{SITE.mission}</p>
          </div>
        </Container>
      </Section>

      <Founder />

      <Section tone="sage">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="The problem"
                title="Most small businesses aren’t missing customers — they’re missing a website that earns them"
              />
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.05}>
                <ul className="space-y-5 text-[15px] leading-relaxed text-foreground">
                  <li className="rounded-2xl border border-foreground/8 bg-background p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-lift">
                    No website at all — every search for the service they offer goes to a competitor instead.
                  </li>
                  <li className="rounded-2xl border border-foreground/8 bg-background p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-lift">
                    An outdated site that doesn’t work properly on a phone, where most local searches happen.
                  </li>
                  <li className="rounded-2xl border border-foreground/8 bg-background p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-lift">
                    A site that exists but doesn’t actually generate calls or form submissions.
                  </li>
                  <li className="rounded-2xl border border-foreground/8 bg-background p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-lift">
                    An assumption that a real, professional website is too expensive or too slow to get.
                  </li>
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-[15px] leading-relaxed text-muted">
                  Summit Studio exists to remove those barriers — with a process built to prove itself before
                  you spend anything, and the same attention to detail on your tenth page as your first.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow="Who we build for" title="A focused starting point, not a scattershot" wide />
          <Reveal delay={0.08}>
            <p className="mt-8 text-[clamp(0.85rem,1.9vw,1.125rem)] leading-relaxed text-muted">
              {SITE.idealCustomer} Staying focused on one kind of business, instead of taking on anything that
              asks, is what makes the same level of care possible on every project — a repeatable system, not a
              rushed one-off. See{' '}
              <Link href="/portfolio" className="text-primary underline-offset-2 hover:underline">
                real example builds
              </Link>
              , or go straight to{' '}
              <Link href="/pricing" className="text-primary underline-offset-2 hover:underline">
                pricing
              </Link>{' '}
              to see what each tier includes.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="sage">
        <Container>
          <SectionHeading eyebrow="What we believe" title="A few operating principles that don’t bend" wide />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="flex gap-4 rounded-4xl border border-foreground/8 bg-background p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-lift">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <p.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-secondary">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <PageCTA
        heading="See what this looks like for your business"
        subhead="No pitch deck — just a real demo, built from what's already public about you."
      />
    </>
  );
}
