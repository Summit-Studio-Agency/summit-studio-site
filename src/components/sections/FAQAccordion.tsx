'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FAQItem } from '@/data/site';

export function FAQAccordion({ items }: { items: ReadonlyArray<FAQItem> }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <dl className="mx-auto mt-4 max-w-3xl space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            'rounded-2xl border bg-background px-5 shadow-soft transition-colors sm:px-6',
            open === i ? 'border-primary/20' : 'border-foreground/8',
          )}
        >
          <dt>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-[17px] font-semibold text-secondary">{item.question}</span>
              <ChevronDown
                className={cn('h-5 w-5 shrink-0 text-muted transition-transform duration-300', open === i && 'rotate-180')}
                aria-hidden="true"
              />
            </button>
          </dt>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.dd
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="cursor-pointer overflow-hidden"
                onClick={() => setOpen(null)}
              >
                <p className="pb-5 pr-9 pt-0 text-[15px] leading-relaxed text-muted">{item.answer}</p>
              </motion.dd>
            )}
          </AnimatePresence>
        </div>
      ))}
    </dl>
  );
}
