import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PortfolioEntry } from '@/data/site';

/**
 * One portfolio card — reused on the homepage preview and the full
 * /portfolio page. Renders as a real outbound link only when `entry.url`
 * is set (a confirmed, Summit-Studio-controlled live deployment) — never
 * guesses or falls back to a domain that merely resembles the business
 * name. An entry with no `url` renders as a plain, non-clickable card
 * with an honest "not live yet" label instead of the visit-arrow icon.
 */
export function PortfolioCard({ entry, priority = false }: { entry: PortfolioEntry; priority?: boolean }) {
  const media = (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-50">
      <Image
        src={entry.image}
        alt={`${entry.business} homepage screenshot`}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 33vw, 100vw"
        className={cn(
          'object-cover object-top transition-transform duration-500',
          entry.url && 'group-hover:scale-[1.03]',
        )}
      />
      <span
        className={cn(
          'absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
          entry.tier === 'Growth' ? 'bg-primary text-surface-50' : 'bg-accent text-secondary',
        )}
      >
        {entry.tier} package
      </span>
    </div>
  );

  const body = (
    <div className="p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-secondary">{entry.business}</h3>
          <p className="text-sm text-muted">{entry.city}</p>
        </div>
        {entry.url ? (
          <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-primary" />
        ) : (
          <span className="shrink-0 whitespace-nowrap rounded-full bg-surface-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
            Not live yet
          </span>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{entry.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {entry.highlights.map((h) => (
          <li key={h} className="rounded-full bg-surface-50 px-3 py-1 text-xs font-medium text-foreground">
            {h}
          </li>
        ))}
      </ul>
    </div>
  );

  if (!entry.url) {
    return (
      <div className="block overflow-hidden rounded-4xl border border-foreground/8 bg-background shadow-soft">
        {media}
        {body}
      </div>
    );
  }

  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-4xl border border-foreground/8 bg-background shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      {media}
      {body}
    </a>
  );
}
