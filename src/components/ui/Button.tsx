import { cn } from '@/lib/utils';
import { TOKENS } from '@/data/tokens';

type Variant = 'primary' | 'dark' | 'outline' | 'ghost' | 'onDark' | 'outlineOnDark';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base = cn(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
  TOKENS.buttonStyle.radius,
);

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-secondary shadow-soft hover:bg-accent-soft hover:shadow-lift hover:-translate-y-0.5 focus-visible:ring-accent focus-visible:ring-offset-background',
  dark:
    'bg-primary text-surface-50 shadow-soft hover:bg-secondary hover:-translate-y-0.5 focus-visible:ring-primary focus-visible:ring-offset-background',
  outline:
    'border border-primary/25 bg-transparent text-primary hover:border-primary/50 hover:bg-primary/5 focus-visible:ring-primary focus-visible:ring-offset-background',
  ghost:
    'bg-transparent text-primary hover:bg-primary/5 focus-visible:ring-primary focus-visible:ring-offset-background',
  onDark:
    'bg-surface-50 text-secondary shadow-soft hover:bg-white hover:-translate-y-0.5 focus-visible:ring-accent focus-visible:ring-offset-secondary',
  outlineOnDark:
    'border border-surface-50/30 bg-transparent text-surface-50 hover:border-surface-50/60 hover:bg-surface-50/10 focus-visible:ring-accent focus-visible:ring-offset-secondary',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-13 px-8 text-base py-3.5',
};

/** Renders an <a> when `href` is provided, otherwise a <button>. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
