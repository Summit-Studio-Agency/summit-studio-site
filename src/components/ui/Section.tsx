import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Anchor id for in-page navigation. */
  id?: string;
  /** Background tone. */
  tone?: 'paper' | 'sage' | 'forest';
}

const toneStyles: Record<NonNullable<SectionProps['tone']>, string> = {
  paper: 'bg-background text-foreground',
  sage: 'bg-surface-50 text-foreground',
  forest: 'bg-secondary text-surface-50',
};

/**
 * Standard page section. Owns its own vertical padding so sections never
 * fight each other over margins. `scroll-mt` keeps anchored headings clear
 * of the sticky navbar.
 */
export function Section({ id, tone = 'paper', className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-24 py-16 sm:py-24', toneStyles[tone], className)}
      {...props}
    >
      {children}
    </section>
  );
}
