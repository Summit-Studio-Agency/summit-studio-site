import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Narrower column for text-heavy content. */
  size?: 'default' | 'narrow';
}

/** Centers content to the site's max width with responsive gutters. */
export function Container({ className, size = 'default', ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8',
        size === 'default' ? 'max-w-content' : 'max-w-3xl',
        className,
      )}
      {...props}
    />
  );
}
