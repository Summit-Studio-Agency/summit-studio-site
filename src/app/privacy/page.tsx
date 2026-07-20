import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SITE } from '@/data/site';
import { breadcrumbsFor, generateBreadcrumbJsonLd, pageMetadata } from '@/lib/seo';

// Bump this when the policy text actually changes — not tied to deploy date.
// Standard, self-drafted template language (same status as
// sales/18-website-service-agreement.md — see that file's top-of-file
// warning): reasonable for a pre-revenue marketing site, worth a real
// attorney pass before this is ever load-bearing in a dispute.
const LAST_UPDATED = 'July 16, 2026';

export const metadata: Metadata = pageMetadata({
  title: `Privacy Policy | ${SITE.name}`,
  description: `How ${SITE.legalName} collects, uses, and protects information submitted through this website.`,
  path: '/privacy',
});

export default function PrivacyPage() {
  const crumbs = breadcrumbsFor('Privacy Policy', '/privacy');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd(crumbs)) }}
      />

      <Section tone="paper">
        <Container>
          <Breadcrumbs items={crumbs} />

          <div className="mt-8">
            <h1 className="font-display text-4xl font-semibold text-secondary sm:text-5xl">Privacy Policy</h1>
            <p className="mt-4 text-sm text-muted">Last updated {LAST_UPDATED}</p>
          </div>

          <div className="mt-10 space-y-8 leading-relaxed text-muted">
            <p className="text-[clamp(0.7rem,1.5vw,0.9375rem)]">
              This policy explains what information {SITE.legalName} (&ldquo;Summit Studio,&rdquo; &ldquo;we,&rdquo;
              &ldquo;us&rdquo;) collects through this website, why we collect it, and how it&rsquo;s handled. It
              applies only to this website — not to any other way you may interact with us.
            </p>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">Information we collect</h2>
              <p className="mt-3 text-[clamp(0.7rem,1.5vw,0.9375rem)]">
                We only collect information you choose to give us by filling out the contact form on this site:
                your name and email address, and whatever optional details you add — phone number, business name,
                current website, package interest, or a project description.
              </p>
              <p className="mt-3 text-[clamp(0.7rem,1.5vw,0.9375rem)]">
                We do not use cookies, analytics, or any other tracking technology on this site, and we do not
                collect information automatically just from you browsing it.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">How we use it</h2>
              <p className="mt-3 text-[clamp(0.7rem,1.5vw,0.9375rem)]">
                Information submitted through the contact form is used for exactly one purpose: so we can respond
                to your inquiry, including building a demo website for your business if that&rsquo;s what you asked
                for. We do not sell, rent, or share it with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">Service providers</h2>
              {/* Not gated to one line -- this is the longest paragraph on
                  either legal page (~430 characters, plus two embedded
                  links); even at this clamp's minimum, it wouldn't fit
                  legibly on a single line in this container. Still gets the
                  same responsive text-size treatment as everything else. */}
              <p className="mt-3 text-[clamp(0.7rem,1.5vw,0.9375rem)]">
                Submitting the form sends your information to us via Resend, the email-delivery service that
                powers this site&rsquo;s contact form. This site is hosted on Vercel, which — like any web host —
                automatically logs standard technical information (such as IP address and browser type) for
                security and reliability. We don&rsquo;t control what either provider does beyond delivering our
                site and email; see{' '}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  Resend&rsquo;s privacy policy
                </a>{' '}
                and{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  Vercel&rsquo;s privacy policy
                </a>{' '}
                for their own practices.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">How long we keep it</h2>
              <p className="mt-3 text-[clamp(0.7rem,1.5vw,0.9375rem)]">
                We keep contact form information only as long as needed to respond to you and complete any work
                you hire us for, or until you ask us to delete it — whichever comes first.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">Your choices</h2>
              <p className="mt-3 text-[clamp(0.7rem,1.5vw,0.9375rem)]">
                You can ask us at any time what information we have about you, or ask us to correct or delete it,
                by emailing{' '}
                <a href={SITE.supportEmailHref} className="text-primary underline-offset-2 hover:underline">
                  {SITE.supportEmail}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">Changes to this policy</h2>
              <p className="mt-3 text-[clamp(0.7rem,1.5vw,0.9375rem)]">
                If this policy changes, we&rsquo;ll update the date at the top of this page. Continued use of this
                site after a change means you accept the updated policy.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">Contact us</h2>
              <p className="mt-3 text-[clamp(0.7rem,1.5vw,0.9375rem)]">
                Questions about this policy or your information? Reach us at{' '}
                <a href={SITE.emailHref} className="text-primary underline-offset-2 hover:underline">
                  {SITE.email}
                </a>
                .
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
