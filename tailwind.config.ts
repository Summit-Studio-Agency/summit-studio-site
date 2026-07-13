import type { Config } from 'tailwindcss';
import { TOKENS } from './src/data/tokens';

/**
 * Design tokens sourced from src/data/tokens.ts — see that file's header
 * comment for why this site has its own token file instead of the client
 * engine's swappable THEME registry. Structure otherwise mirrors
 * martinez-landscaping/tailwind.config.ts exactly.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: TOKENS.colors.primary,
        secondary: TOKENS.colors.secondary,
        accent: TOKENS.colors.accent,
        highlight: TOKENS.colors.highlight,
        tertiary: TOKENS.colors.tertiary,
        background: TOKENS.colors.background,
        surface: TOKENS.colors.surface,
        foreground: TOKENS.colors.foreground,
        muted: TOKENS.colors.muted,
      },
      fontFamily: {
        display: [`var(${TOKENS.fonts.display.cssVariable})`, ...TOKENS.fonts.display.fallback],
        sans: [`var(${TOKENS.fonts.body.cssVariable})`, ...TOKENS.fonts.body.fallback],
      },
      fontSize: {
        'display-lg': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.25rem, 4.5vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'heading': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
        'logo': ['1.0625rem', { lineHeight: '1', letterSpacing: '-0.01em' }],
        'logo-sub': ['0.625rem', { lineHeight: '1', letterSpacing: '0.22em' }],
      },
      borderRadius: {
        '4xl': TOKENS.radius.large,
        '5xl': TOKENS.radius.xlarge,
      },
      boxShadow: {
        soft: '0 1px 2px rgba(14, 29, 25, 0.05), 0 8px 24px -12px rgba(14, 29, 25, 0.2)',
        lift: '0 2px 4px rgba(14, 29, 25, 0.06), 0 24px 48px -20px rgba(14, 29, 25, 0.3)',
        ring: '0 0 0 1px rgba(14, 29, 25, 0.06)',
      },
      maxWidth: {
        content: '1200px',
      },
      spacing: {
        13: '3.25rem',
        18: '4.5rem',
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
