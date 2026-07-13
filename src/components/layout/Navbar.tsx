'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { NAV_LINKS } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * Simpler than the client engine's Navbar: this site has no full-bleed
 * hero sitting directly under a transparent header on every page, so there's
 * no need for the scroll-linked white→green color flip that pattern exists
 * for. Always solid — the same visual language (soft border, backdrop blur,
 * pill CTA), minus a mechanism this site doesn't need.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/5 bg-background/90 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between py-3">
        <a
          href="/"
          aria-label="Summit Studio — home"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium text-foreground transition-opacity duration-200 hover:opacity-70',
                  isActive && 'font-semibold text-primary opacity-100',
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex">
          <Button href="/contact" size="sm">
            Get a demo
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid h-11 w-11 place-items-center rounded-xl text-foreground transition-colors hover:bg-foreground/5 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-foreground/5 bg-background lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface-50',
                      isActive && 'bg-primary/10 font-semibold text-primary',
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="mt-2 flex flex-col gap-2 border-t border-foreground/5 pt-4">
                <Button href="/contact" onClick={() => setOpen(false)} className="w-full" size="lg">
                  Get a demo
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
