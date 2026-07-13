import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItem } from '@/lib/seo';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/** Accessible breadcrumb trail. */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-foreground/20" aria-hidden="true" />
            )}
            {i === items.length - 1 ? (
              <span className="text-foreground" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
