import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SITE } from '@/data/site';
import { breadcrumbsFor, generateBreadcrumbJsonLd } from '@/lib/seo';

// Same status note as privacy/page.tsx and sales/18-website-service-agreement.md:
// standard, self-drafted template language, reasonable pre-revenue, worth a
// real attorney pass before it's ever load-bearing. This page covers use of
// *this marketing website* only — the actual client engagement is governed
// by the separate, per-client Website Service Agreement, not this page.
const LAST_UPDATED = 'July 11, 2026';

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE.name}`,
  description: `Terms governing use of the ${SITE.name} website.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  const crumbs = breadcrumbsFor('Terms of Service', '/terms');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd(crumbs)) }}
      />

      <Section tone="paper">
        <Container>
          <Breadcrumbs items={crumbs} />

          <div className="mt-8 max-w-2xl">
            <h1 className="font-display text-4xl font-semibold text-secondary sm:text-5xl">Terms of Service</h1>
            <p className="mt-4 text-sm text-muted">Last updated {LAST_UPDATED}</p>
          </div>

          <div className="mt-10 max-w-[70ch] space-y-8 text-[15px] leading-relaxed text-muted">
            <p>
              These terms govern your use of this website, operated by {SITE.legalName} (&ldquo;Summit
              Studio,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By browsing this site or submitting the contact
              form, you agree to these terms. They cover this website only — a signed engagement to build your
              own website is governed by a separate written agreement, not this page.
            </p>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">Use of this site</h2>
              <p className="mt-3">
                You may browse this site and use the contact form for legitimate inquiries about our services. You
                agree not to use this site to transmit spam, malicious code, or anything unlawful, and not to
                attempt to disrupt or gain unauthorized access to it.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">The demos we link to</h2>
              <p className="mt-3">
                Our Portfolio page links to example websites built on the Summit Studio engine. Some are shown to
                demonstrate the platform rather than reflecting a paying client relationship, and we say so
                plainly on that page wherever it applies. We don&rsquo;t control content changes made to those
                sites after this page was last updated.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">Intellectual property</h2>
              <p className="mt-3">
                The design, layout, and original written content of this website belong to {SITE.legalName}. You
                may view and share pages of this site for personal, non-commercial reference; you may not copy the
                design or template for your own commercial use without our written permission.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">No warranty</h2>
              <p className="mt-3">
                This site and its content are provided &ldquo;as is,&rdquo; without warranties of any kind. We
                make reasonable efforts to keep information accurate and the site available, but we don&rsquo;t
                guarantee uninterrupted access or that every detail is error-free at all times.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">Limitation of liability</h2>
              <p className="mt-3">
                To the extent permitted by law, {SITE.legalName} is not liable for indirect, incidental, or
                consequential damages arising from your use of this website. Nothing here limits liability that
                can&rsquo;t be limited by law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">Changes to these terms</h2>
              <p className="mt-3">
                If these terms change, we&rsquo;ll update the date at the top of this page. Continued use of this
                site after a change means you accept the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-secondary">Contact us</h2>
              <p className="mt-3">
                Questions about these terms? Reach us at{' '}
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
