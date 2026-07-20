import Link from 'next/link';
import { Mail, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { SITE, NAV_LINKS } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    // bg-primary (not bg-secondary) is deliberate: the CTA section every
    // page ends with just above this (PageCTA, tone="forest" = bg-secondary)
    // is the exact same near-black green as bg-secondary -- back to back,
    // with zero visible seam between them. primary is the same forest
    // family, one step lighter, so the footer still reads as "the dark
    // closing section" while being visibly distinct from the CTA above it.
    <footer className="bg-primary text-surface-50">
      <Container className="py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand + pitch */}
          <div className="lg:col-span-5">
            <Logo invert />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-surface/70">{SITE.mission}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface-50/10 px-3.5 py-1.5 text-xs font-semibold text-accent-soft">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              You always own your domain
            </div>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-surface/80 transition-colors hover:text-surface-50">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/terms" className="text-sm text-surface/80 transition-colors hover:text-surface-50">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-surface/80 transition-colors hover:text-surface-50">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-surface/80">
              <li>
                <a href={SITE.emailHref} className="inline-flex items-center gap-2.5 transition-colors hover:text-surface-50">
                  <Mail className="h-4 w-4 shrink-0 text-highlight" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
            </ul>
            <Button href="/contact" size="md" className="mt-5">
              Get a demo
            </Button>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-surface-50/10 pt-8 text-xs text-surface/60 sm:flex-row">
          <p>
            © {year} {SITE.legalName}. All rights reserved. ·{' '}
            <Link href="/terms" className="transition-colors hover:text-surface-50">
              Terms of Service
            </Link>{' '}
            ·{' '}
            <Link href="/privacy" className="transition-colors hover:text-surface-50">
              Privacy Policy
            </Link>
          </p>
          <span className="text-surface/40">Built by Summit Studio</span>
        </div>
      </Container>
    </footer>
  );
}
