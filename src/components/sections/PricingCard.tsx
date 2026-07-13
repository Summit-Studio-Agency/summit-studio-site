import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { PricingPackage } from '@/data/site';

/** One pricing package card — reused on the homepage preview and the full /pricing page. */
export function PricingCard({ pkg }: { pkg: PricingPackage }) {
  const hasSetupFee = pkg.setupPrice !== 'None' && pkg.setupPrice !== 'Quote';

  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-4xl border p-8 shadow-soft',
        pkg.highlighted ? 'border-primary/30 bg-primary text-surface-50' : 'border-foreground/8 bg-background',
      )}
    >
      {pkg.highlighted && (
        <span className="mb-4 inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
          Recommended
        </span>
      )}
      <h3 className={cn('font-display text-2xl font-semibold', pkg.highlighted ? 'text-surface-50' : 'text-secondary')}>
        {pkg.name}
      </h3>
      <p className={cn('mt-2 text-sm', pkg.highlighted ? 'text-surface-50/70' : 'text-muted')}>{pkg.description}</p>

      <div className="mt-6">
        {hasSetupFee && (
          <div className="flex items-baseline gap-2">
            <span className={cn('font-display text-3xl font-semibold', pkg.highlighted ? 'text-surface-50' : 'text-secondary')}>
              {pkg.setupPrice}
            </span>
            <span className={cn('text-sm', pkg.highlighted ? 'text-surface-50/70' : 'text-muted')}>setup</span>
          </div>
        )}
        <div className="flex items-baseline gap-2">
          <span className={cn('font-display text-2xl font-semibold', pkg.highlighted ? 'text-surface-50' : 'text-secondary')}>
            {pkg.monthlyPrice}
          </span>
          <span className={cn('text-sm', pkg.highlighted ? 'text-surface-50/70' : 'text-muted')}>{pkg.term}</span>
        </div>
      </div>

      <p className={cn('mt-4 text-xs font-medium uppercase tracking-wide', pkg.highlighted ? 'text-accent-soft' : 'text-highlight')}>
        Best for: <span className="normal-case font-normal">{pkg.bestFor}</span>
      </p>

      <ul className="mt-7 flex-1 space-y-3">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed">
            <Check className={cn('mt-0.5 h-4 w-4 shrink-0', pkg.highlighted ? 'text-accent-soft' : 'text-highlight')} />
            <span className={pkg.highlighted ? 'text-surface-50/90' : 'text-foreground'}>{feature}</span>
          </li>
        ))}
      </ul>

      <Button href="/contact" size="lg" className="mt-8 w-full" variant={pkg.highlighted ? 'onDark' : 'dark'}>
        {pkg.cta}
      </Button>
    </div>
  );
}
