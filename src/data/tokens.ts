/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DESIGN TOKENS — Summit Studio's own brand identity.
 *
 *  Shaped exactly like the client engine's THEME object (same key names:
 *  colors, radius, buttonStyle, fonts) because this site is deliberately
 *  built in the same design language as every Summit Studio client site —
 *  same typography pairing, same pill-button/soft-shadow/large-radius
 *  system, same fade-up motion. What's intentionally different is the
 *  palette: this is the agency's own identity, not a client's, so it uses
 *  its own colors rather than literally reusing a client's hex values.
 *
 *  What's intentionally NOT here: the multi-tenant registry/env-var switch
 *  that martinez-landscaping's src/data/theme.ts plugs into. That machinery
 *  exists to swap between many client brands at build time; this site has
 *  exactly one, permanent identity, so tailwind.config.ts imports this file
 *  directly instead of going through a registry.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const TOKENS = {
  colors: {
    // Primary brand color — buttons, links, key accents. A deep alpine
    // forest-teal — distinct from any client's green, closer to slate.
    primary: '#1E3A34',
    // Deepest brand color — dark sections, footer, scrolled navbar.
    secondary: '#0E1D19',
    // Bold accent — the single boldest call-to-action color.
    accent: {
      DEFAULT: '#C79A56',
      soft: '#DEBD86',
    },
    // Supporting accent — icons, small highlights, secondary detail color.
    highlight: '#4F7C6C',
    // Additional supporting tone, reserved for future use.
    tertiary: '#5B6B5E',

    background: '#F7F5F0', // page background
    surface: {
      DEFAULT: '#ECEEE6',
      50: '#F2F3ED',
      100: '#ECEEE6',
    },
    foreground: '#16211D', // body text on light surfaces
    muted: '#5B655F', // secondary / de-emphasized text
  },

  radius: {
    large: '2rem', // tailwind `4xl`
    xlarge: '2.75rem', // tailwind `5xl`
  },

  buttonStyle: {
    radius: 'rounded-full',
  },

  // Same pairing as the client engine — a soft optical serif for display,
  // a clean grotesque for body. Reusing the exact fonts is what makes this
  // read as "the same design language" rather than just a similar layout.
  fonts: {
    display: {
      family: 'Fraunces',
      cssVariable: '--font-display',
      fallback: ['Georgia', 'serif'],
    },
    body: {
      family: 'Hanken Grotesk',
      cssVariable: '--font-sans',
      fallback: ['system-ui', 'sans-serif'],
    },
  },
} as const;
