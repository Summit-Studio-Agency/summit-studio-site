/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE — single source of truth for Summit Studio's own content: facts,
 *  copy, pricing, process, and portfolio entries. Shaped like the client
 *  engine's business.ts (a single typed constant components read from,
 *  never hardcoded copy scattered through JSX) but without the multi-
 *  tenant registry — see src/data/tokens.ts's header comment for why.
 *
 *  Every fact below is sourced from the real Summit Studio business
 *  documents (docs/decisions.md, docs/01-pricing-guide.md,
 *  projects/summitstudio/buiness-blueprint.md, docs/sales-system.md) —
 *  nothing here is invented. Where a document didn't establish a fact
 *  (a phone number, a founding team bio, a client count), it's left out
 *  rather than fabricated, per Decision 010's spirit applied to the
 *  agency's own identity, not just client reviews.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Advantage {
  title: string;
  description: string;
}

export interface PricingPackage {
  name: string;
  /** "$999" for Starter/Growth, "None" for Website Care (no setup fee). */
  setupPrice: string;
  monthlyPrice: string;
  term: string;
  description: string;
  bestFor: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface PortfolioEntry {
  slug: string;
  business: string;
  tagline: string;
  city: string;
  tier: 'Starter' | 'Growth';
  description: string;
  highlights: string[];
  /** Omit when there's no real, Summit-Studio-controlled live URL to link to
   *  — never guess or fall back to a domain that merely resembles the
   *  business name (see the header comment on `portfolio` below for why
   *  this matters). PortfolioCard renders a non-clickable card when unset. */
  url?: string;
  image: string;
}

export interface FAQItem {
  question: string;
  /** A single string renders as one paragraph; an array renders each entry
   *  as its own paragraph, for answers that lead with a short yes/no before
   *  explaining. */
  answer: string | string[];
}

export const SITE = {
  name: 'Summit Studio',
  legalName: 'Summit Studio Agency',
  tagline: 'Websites that get local businesses found, called, and hired.',
  description:
    'Summit Studio builds professional websites for landscaping and home-service businesses — see a real, working demo of yours before you ever commit to anything.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://summitstudioagency.com',
  // General/default contact address — footer, contact page, structured
  // data, and every page's closing CTA. Purpose-specific addresses below
  // exist for the few spots on the site with a genuinely narrower context;
  // everywhere else uses this one.
  email: 'hello@summitstudioagency.com',
  emailHref: 'mailto:hello@summitstudioagency.com',
  /** The founder's own address — used only on the About page's Founder
   *  section, where a signed, personal sign-off is the point. */
  founderEmail: 'jeff@summitstudioagency.com',
  founderEmailHref: 'mailto:jeff@summitstudioagency.com',
  /** Pricing page's custom-quote CTA. */
  quotesEmail: 'quotes@summitstudioagency.com',
  quotesEmailHref: 'mailto:quotes@summitstudioagency.com',
  /** Website Care buyout/cancellation questions (FAQ). */
  billingEmail: 'billing@summitstudioagency.com',
  billingEmailHref: 'mailto:billing@summitstudioagency.com',
  /** Existing-client data requests (Privacy Policy's "Your choices"). */
  supportEmail: 'support@summitstudioagency.com',
  supportEmailHref: 'mailto:support@summitstudioagency.com',

  logo: {
    primary: 'Summit Studio',
    secondary: 'Website Agency',
  },

  // ── Positioning ──────────────────────────────────────────────────────
  // Per Decision 009: never lead with the tooling. Every line below is
  // framed around what a business owner actually gets, not how it's built.
  mission:
    'Most small service businesses either have no website, an outdated one, or one that just doesn’t bring in customers. Summit Studio removes every reason to keep putting it off — a real, professional website, delivered fast, at a fixed price, with no long-term contract required to keep it live.',

  idealCustomer:
    'Summit Studio currently builds for single-location home-service businesses — landscaping and lawn care first, with the same process built to extend to other trades. If your business has a fixed service area, a set of services you offer, and customers who search for you online before they call, the template fits.',

  advantages: [
    {
      title: 'You see it before you decide',
      description:
        'We build a real, working demo of your site first — not a mockup, not a pitch deck. You look at the actual thing before any money changes hands.',
    },
    {
      title: 'Fast turnaround',
      description:
        'A finished, launch-ready site in days after your details are in, not months of back-and-forth with an agency.',
    },
    {
      title: 'Fixed, predictable pricing',
      description:
        'A clear setup fee plus a small monthly fee, agreed up front — or no upfront investment at all on Website Care. No hourly surprises on the build itself.',
    },
    {
      title: 'Modern design, every time',
      description:
        'Every site is built from the same premium design system — fast-loading, mobile-first, and built to look like it came from a design studio, not a template mill.',
    },
    {
      title: 'A simple process',
      description:
        'Research, demo, one call, build, launch. No lengthy discovery workshops or 40-page questionnaires before you see anything real.',
    },
    {
      title: 'Hosting and support, built in',
      description:
        'Starter and Growth already include hosting, security, and support in the monthly fee — not an extra decision to make later. You always keep your own domain if you ever want to leave.',
    },
  ] satisfies Advantage[],

  // ── Process ──────────────────────────────────────────────────────────
  // Client-facing version of the internal workflow in docs/sales-system.md
  // and docs/11-demo-workflow.md — same real steps, told from the business
  // owner's side of the conversation instead of the internal ops side.
  process: [
    {
      step: '01',
      title: 'We build a real demo first',
      description:
        'Before we ever ask you for anything, we build a working demo website for your business using information that’s already public. You get an actual link to click, not a promise.',
    },
    {
      step: '02',
      title: 'We walk through it together',
      description:
        'A short call to look at the demo live, talk through what’s missing on your current site, and go over pricing plainly — no hard sell, no hidden numbers.',
    },
    {
      step: '03',
      title: 'You approve, we build the real thing',
      description:
        'Once you’re in, we take your real business details, photos, and service info and build the finished site — with a revision round included so it matches how you actually want to be represented.',
    },
    {
      step: '04',
      title: 'Launch on your domain',
      description:
        'We connect your domain and go live. You always own the domain outright — Summit Studio hosts the site for as long as you’d like us to.',
    },
    {
      step: '05',
      title: 'Hosting and support, already included',
      description:
        'Starter and Growth include hosting, security, and support in the monthly fee, cancel anytime. Prefer no upfront cost at all? Website Care builds and manages your site for one flat monthly rate instead.',
    },
  ] satisfies ProcessStep[],

  // ── Pricing ──────────────────────────────────────────────────────────
  // Hybrid setup-plus-monthly pricing per docs/decisions.md Decision 024,
  // which supersedes the prior one-time-build + separate-Care-Plan model
  // (Decision 021) and retires the old founding-client discount — every
  // client is quoted the same posted rate below, from client 1 onward.
  pricing: [
    {
      name: 'Starter',
      setupPrice: '$999',
      monthlyPrice: '$49/mo',
      term: 'Cancel anytime',
      description: 'For a single-location business that just needs a real, professional site — and the hosting and support to keep it running.',
      bestFor: 'New businesses, or a business replacing an outdated website with a real one.',
      features: [
        'Starter website package — homepage, services, why-us, gallery, testimonials, service area, FAQ, contact form',
        'Up to 6 services, each with its own page',
        'Up to 10 service-area/location pages',
        'Hosting, SSL & domain assistance',
        'Security updates & monthly backups',
        'Basic support',
        '1 round of revisions before launch',
      ],
      cta: 'Get a free demo',
    },
    {
      name: 'Growth',
      setupPrice: '$1,999',
      monthlyPrice: '$79/mo',
      term: 'Cancel anytime',
      description: 'Everything in Starter, built out for a business that wants more leads and stronger local SEO.',
      bestFor: 'Established businesses that want more leads and stronger local SEO.',
      features: [
        'Everything in Starter',
        'Growth website package — up to 12 services / 20 service areas',
        'Advanced SEO',
        'Interactive before/after project gallery',
        'Review management',
        'Priority support',
        '2 rounds of revisions before launch',
      ],
      cta: 'Get a free demo',
      highlighted: true,
    },
    {
      name: 'Website Care',
      setupPrice: 'None',
      monthlyPrice: '$149/mo',
      term: '12-month agreement',
      description: 'For an owner who’d rather not make an upfront investment at all — we build, own, and manage the site for the term instead.',
      bestFor: 'Owners who want a hands-off solution with no upfront investment.',
      features: [
        'Everything required to launch a professional website',
        'Summit Studio owns and manages hosting',
        'Unlimited minor text/image updates',
        'Security, monitoring & backups',
        'Software updates & performance optimization',
      ],
      cta: 'Ask about Website Care',
    },
    {
      name: 'Custom',
      setupPrice: 'Quote',
      monthlyPrice: 'on request',
      term: 'Varies',
      description: 'Multi-location businesses or anything outside the current template’s shape.',
      bestFor: 'Multi-location businesses or a trade the current template doesn’t fit yet.',
      features: [
        'Multiple business locations',
        'A trade outside the current template',
        'Anything else non-standard',
      ],
      cta: 'Ask about custom',
    },
  ] satisfies PricingPackage[],

  paymentTerms:
    'Starter and Growth: 50% of the setup fee to begin, 50% at launch, then the monthly fee starts. Website Care: no setup fee — your first month begins the build. Starter and Growth are cancel-anytime; Website Care is a 12-month agreement, the trade-off for zero upfront cost.',

  // ── Portfolio ────────────────────────────────────────────────────────
  // Real, deployed example builds on the Summit Studio engine — not
  // paying-client engagements yet (Summit Studio's first paying client
  // hasn't closed as of this writing). Framed honestly as demo/template
  // builds rather than implied client relationships, consistent with
  // Decision 010's honesty standard extended to the agency's own claims.
  //
  // Only ever link to a URL Summit Studio actually controls, and only ever
  // show a business we actually have the right to show publicly.
  //
  // As of 2026-07-13, the public portfolio below uses "Summit Studio
  // Landscaping" — a fictional demo company built specifically for this
  // purpose, not a real business. Martinez Landscaping (the earlier
  // portfolio entry) is a real business name Summit Studio never had
  // permission to use as a public-facing showcase; its demo sites are kept
  // live for real prospect outreach, but reachable only via a direct,
  // unlisted URL (see src/data/demos.ts + /demo/[slug]) — never linked
  // here or anywhere else on this site. See the demo-martinez-growth and
  // demo-martinez-starter repos' docs/DEPLOYMENT_GUIDE.md for how these
  // demo repos get built.
  portfolio: [
    {
      slug: 'summit-studio-landscaping-starter',
      business: 'Summit Studio Landscaping',
      tagline: 'The Starter package, live.',
      city: 'Leesburg, VA',
      tier: 'Starter',
      description:
        'A complete, professional site with the same premium design system, trust, and content as Growth — no cut corners. Starter is intentionally scoped to the essentials: a clean gallery and core service pages, without Growth’s wider service-area coverage and services×town SEO matrix.',
      highlights: ['Clean project gallery', 'Core service pages', 'Same premium design system'],
      url: 'https://engine.summitstudioagency.com/demo/summit-studio-landscaping-starter',
      image: '/images/portfolio/summit-studio-landscaping-starter.jpg',
    },
    {
      slug: 'summit-studio-landscaping-growth',
      business: 'Summit Studio Landscaping',
      tagline: 'Grounds worth stepping outside for.',
      city: 'Leesburg, VA',
      tier: 'Growth',
      description:
        'The same fictional business as above, rebuilt at the Growth tier: an interactive before/after project gallery, a full services×service-area SEO page matrix, and priority storm-cleanup messaging built for a trade where same-day calls matter.',
      highlights: ['Before/after gallery slider', 'Services × town SEO matrix', 'Priority storm-cleanup banner'],
      url: 'https://engine.summitstudioagency.com/demo/summit-studio-landscaping',
      image: '/images/portfolio/summit-studio-landscaping-growth.jpg',
    },
  ] satisfies PortfolioEntry[],

  // ── FAQ ──────────────────────────────────────────────────────────────
  faq: [
    {
      question: 'Do I have to commit to anything before I see my website?',
      answer:
        'No. We build a working demo first using information that’s already public about your business. You’ll receive a real website on a real link before you’re asked to sign anything or pay a dollar. If you don’t like it, there’s no obligation to move forward.',
    },
    {
      question: 'Why is this so much faster than a typical web agency?',
      answer:
        'We don’t start every project from a blank page. Instead, we build every website on a proven system we’ve refined specifically for landscaping businesses. That lets us spend time customizing your business instead of rebuilding the same foundations over and over. You still receive revisions before launch — it just doesn’t take months to get there.',
    },
    {
      question: 'Why are your prices lower than most agencies?',
      answer:
        'Because we’ve standardized the process instead of reinventing it every time. Most agencies bill dozens of hours for planning, mockups, and custom development before you ever see a website. We skip that overhead by using a proven system and showing you a working demo first.',
    },
    {
      question: 'Will my website look like everyone else’s?',
      answer:
        'No. Every site is built on the same design system, but the content, services, service areas, branding, photos, colors, reviews, and messaging are specific to your business. Think of it like homes built from the same architectural plans — each one still feels unique because of how it’s finished.',
    },
    {
      question: 'Are you an established agency, or a new one?',
      answer: [
        'We’re new, and we won’t pretend otherwise.',
        'Rather than asking you to trust years of marketing claims, we’d rather earn your business by showing you real work first. Every prospect receives a working demo before making a decision, so you can judge the quality of the website instead of our age as a company.',
      ],
    },
    {
      question: 'How long does the real build take once I sign?',
      answer:
        'Most websites are completed within 3–5 business days after we receive your deposit and everything needed to finish the site, such as photos, logos, or service information.',
    },
    {
      question: 'What does the price include?',
      answer:
        'Every website includes a professionally designed mobile-friendly site, hosting, SSL security, contact forms, SEO basics, ongoing support, and one revision round before launch. Higher-tier packages include additional pages and features. Visit the Pricing page for a complete breakdown.',
    },
    {
      question: 'Do I own my website?',
      answer: [
        'Starter and Growth customers do.',
        'Once the setup fee is paid, you own your website, its content, and your domain.',
        'Website Care works differently. Because there’s no upfront build fee, the website remains part of the managed service while you’re subscribed. If you’d ever like to purchase ownership of the site, contact us and we’ll work out a buyout.',
      ],
    },
    {
      question: 'Can I upgrade later?',
      answer: [
        'Absolutely.',
        'If you start on Starter and later decide you want Growth, you simply pay the difference between the two setup fees. You never pay for the same work twice.',
      ],
    },
    {
      question: 'Can I use my existing domain name?',
      answer: [
        'Yes.',
        'If you already own a domain, we’ll use it. If you don’t, we’ll help you register one. Your domain always belongs to you — we never own or control it on your behalf.',
      ],
    },
    {
      question: 'Can I move my website to another developer later?',
      answer: [
        'Yes.',
        'Your domain is always yours, and on Starter or Growth you own the completed website once your setup fee is paid. If you ever decide to work with another developer, you’re free to move your website wherever you’d like.',
        'Our internal website-building platform stays with Summit Studio, but your finished website does not.',
      ],
    },
    {
      question: 'Can I host the website myself?',
      answer: [
        'Not while you’re an active customer.',
        'Hosting, security updates, monitoring, and maintenance are all included in your monthly plan so you don’t have to manage them yourself. If you leave on Starter or Growth, you’re free to move your website to another host.',
      ],
    },
    {
      question: 'What happens if I cancel Website Care?',
      answer: [
        'Website Care doesn’t charge an upfront build fee, so the website remains part of the managed service while you’re subscribed.',
        'If you decide you’d rather own the website outright, contact us and we’ll discuss a buyout option.',
      ],
    },
    {
      question: 'What happens if Summit Studio ever closes?',
      answer: [
        'Your domain always belongs to you.',
        'On Starter and Growth, you also own your website once your setup fee has been paid. If Summit Studio were ever to stop operating, you’d still have your website and your domain.',
      ],
    },
    {
      question: 'Can you help my business rank higher on Google?',
      answer: [
        'Yes — but no one can honestly guarantee rankings.',
        'Every website is built with SEO best practices from the start, including fast loading speeds, mobile responsiveness, clean page structure, metadata, and service-area targeting. Those things give your business a strong foundation for search visibility.',
      ],
    },
    {
      question: 'Do you write the content?',
      answer: [
        'Yes.',
        'We build your initial website using publicly available information about your business, then refine everything during the review process with your feedback. You’re never expected to write an entire website from scratch.',
      ],
    },
    {
      question: 'Do I need professional photos?',
      answer: [
        'No.',
        'If you already have great photos, we’ll use them. If not, we can start with the best images available and replace them later as you collect better ones.',
      ],
    },
    {
      question: 'What if I want changes after launch?',
      answer: [
        'Website Care includes unlimited minor text and image updates.',
        'Starter and Growth customers can request changes anytime, and we’ll provide a simple flat-rate or hourly quote before beginning the work.',
      ],
    },
    {
      question: 'Do you only build websites for landscaping companies?',
      answer: [
        'Today, landscaping and lawn care businesses are our specialty because that’s where we’ve refined our process the most.',
        'If you operate another single-location home service business, reach out — we may already be a good fit.',
      ],
    },
    {
      question: 'Still unsure?',
      answer: [
        'That’s exactly why we build the demo first.',
        'Instead of asking you to trust promises, portfolios, or sales pitches, we’d rather let you review a real website built specifically for your business. If you love it, we’ll talk. If not, there’s no pressure and no obligation.',
      ],
    },
  ] satisfies FAQItem[],
} as const;

export const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const;
