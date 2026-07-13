/**
 * SEO helpers: breadcrumbs + JSON-LD generators. Deliberately smaller than
 * the client engine's src/lib/seo.ts — that file exists mostly to generate
 * metadata across dozens of near-identical, dynamically-routed pages
 * (services × towns). This site has a handful of fixed, hand-written pages,
 * so each page sets its own `metadata` export directly rather than calling
 * a generator function built for a pattern that doesn't apply here.
 */

import { SITE } from '@/data/site';
import type { FAQItem } from '@/data/site';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function breadcrumbsFor(label: string, href: string): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label, href },
  ];
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${SITE.url}${item.href}`,
    })),
  };
}

export function generateOrganizationJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#organization`,
    name: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    areaServed: 'US',
  };
}

export function generateFaqJsonLd(faqs: ReadonlyArray<FAQItem>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [...faqs].map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
