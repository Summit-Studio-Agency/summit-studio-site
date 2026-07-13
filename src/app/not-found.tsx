import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

/** Branded 404. Keeps people on-site with a clear route back home. */
export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-background">
      <div className="mx-auto w-full max-w-content px-5 py-24 text-center sm:px-8">
        <div className="mx-auto mb-8 flex justify-center">
          <Logo />
        </div>
        <p className="font-display text-display-lg leading-none text-secondary">404</p>
        <h1 className="mt-4 font-display text-heading text-primary">We couldn&apos;t find that page</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you&apos;re after may have moved or never existed. Let&apos;s get you back to solid ground.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="primary" size="lg">
            Back to home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact us
          </Button>
        </div>
        <p className="mt-10 text-sm text-muted">
          Or see our{' '}
          <Link href="/portfolio" className="font-semibold text-highlight underline-offset-4 hover:underline">
            portfolio
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
