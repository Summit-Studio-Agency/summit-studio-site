import { Mail, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { SITE, NAV_LINKS } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-surface-50">
      <Container className="py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + pitch */}
          <div className="lg:col-span-5">
            <Logo invert />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-surface/70">{SITE.mission}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface-50/10 px-3.5 py-1.5 text-xs font-semibold text-accent-soft">
              <ShieldCheck className="h-4 w-4" />
              You always own your domain
            </div>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-surface/80 transition-colors hover:text-surface-50">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/terms" className="text-sm text-surface/80 transition-colors hover:text-surface-50">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-surface/80 transition-colors hover:text-surface-50">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-surface/80">
              <li>
                <a href={SITE.emailHref} className="inline-flex items-center gap-2.5 transition-colors hover:text-surface-50">
                  <Mail className="h-4 w-4 shrink-0 text-highlight" />
                  {SITE.email}
                </a>
              </li>
            </ul>
            <Button href="/contact" size="sm" className="mt-5">
              Get a demo
            </Button>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-surface-50/10 pt-8 text-xs text-surface/60 sm:flex-row">
          <p>
            © {year} {SITE.legalName}. All rights reserved. ·{' '}
            <a href="/privacy" className="transition-colors hover:text-surface-50">
              Privacy Policy
            </a>{' '}
            ·{' '}
            <a href="/terms" className="transition-colors hover:text-surface-50">
              Terms
            </a>
          </p>
          <span className="text-surface/40">Built on the Summit Studio engine</span>
        </div>
      </Container>
    </footer>
  );
}
