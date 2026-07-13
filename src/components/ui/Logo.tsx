import { cn } from '@/lib/utils';
import { SITE } from '@/data/site';
import { TOKENS } from '@/data/tokens';

interface LogoProps {
  className?: string;
  /** Light text for dark backgrounds. */
  invert?: boolean;
}

/** Wordmark + peak mark — same footprint/structure as the client engine's Logo. */
export function Logo({ className, invert = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'grid h-9 w-9 place-items-center rounded-xl',
          invert ? 'bg-surface-50/10' : 'bg-primary/10',
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M3 19h18L15 8l-3 4.5L10 10 3 19Z"
            stroke={invert ? TOKENS.colors.accent.soft : TOKENS.colors.primary}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-logo font-semibold tracking-tight',
            invert ? 'text-surface-50' : 'text-secondary',
          )}
        >
          {SITE.logo.primary}
        </span>
        <span
          className={cn(
            'text-logo-sub font-semibold uppercase',
            invert ? 'text-accent-soft' : 'text-highlight',
          )}
        >
          {SITE.logo.secondary}
        </span>
      </span>
    </span>
  );
}
