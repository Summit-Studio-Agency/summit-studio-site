import type { Metadata } from 'next';
import { Mail, Clock, ShieldCheck } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ContactForm } from '@/components/sections/ContactForm';
import { SITE } from '@/data/site';
import { breadcrumbsFor, generateBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Contact | ${SITE.name}`,
  description: 'Tell us about your business and we’ll put together a real demo website before you commit to anything.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const crumbs = breadcrumbsFor('Contact', '/contact');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd(crumbs)) }}
      />

      <Section tone="paper">
        <Container>
          <Breadcrumbs items={crumbs} />

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Info column */}
            <div className="lg:col-span-5">
              <h1 className="font-display text-display font-semibold text-secondary">Let&rsquo;s build your free demo</h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Tell us a bit about your business and we&rsquo;ll put together a real, working demo of your
                website before you decide anything. No pitch, no pressure — just a link to look at.
              </p>

              <Reveal delay={0.05}>
                <a
                  href={SITE.emailHref}
                  className="group mt-8 flex items-center gap-4 rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lift"
                  aria-label={`Email Summit Studio at ${SITE.email}`}
                >
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-surface-50">
                    <Mail className="h-7 w-7" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted">Email us directly</span>
                    <span className="mt-0.5 block text-xl font-bold text-secondary">{SITE.email}</span>
                    <span className="block text-xs text-muted">We typically respond within 24 hours</span>
                  </span>
                </a>
              </Reveal>

              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-4 rounded-2xl border border-foreground/5 bg-background p-6 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted">Response time</span>
                    <span className="block text-sm font-medium text-secondary">Within 24 hours, every message</span>
                  </span>
                </li>
                <li className="flex items-center gap-4 rounded-2xl border border-foreground/5 bg-background p-6 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted">No obligation</span>
                    <span className="block text-sm font-medium text-secondary">We build a demo before we ask for anything</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Form column */}
            <div className="lg:col-span-7">
              <div className="rounded-5xl border border-foreground/5 bg-surface-50 p-7 shadow-soft sm:p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
