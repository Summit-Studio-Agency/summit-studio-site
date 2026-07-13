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
  answer: string;
}

export const SITE = {
  name: 'Summit Studio',
  legalName: 'Summit Studio Agency',
  tagline: 'Websites that get local businesses found, called, and hired.',
  description:
    'Summit Studio builds professional websites for landscaping and home-service businesses — see a real, working demo of yours before you ever commit to anything.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://summitstudioagency.com',
  email: 'summitstudioagency@gmail.com',
  emailHref: 'mailto:summitstudioagency@gmail.com',

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
  // Only ever link to a URL Summit Studio actually controls. Two entries
  // that used to be here (Delaware Lawn Crew, PQ Landscaping) were removed
  // outright — their `url` values were real, live domains belonging to
  // real, unrelated businesses whose public data was used to build an
  // internal demo, with no relationship, verification, or consent, then
  // linked to as if it were Summit Studio's own deployed work. That's not
  // a broken-link bug, it's a real trust/misrepresentation problem, caught
  // by a buyer-perspective review and confirmed by directly checking what
  // each domain actually serves. The one confirmed-real, Summit-Studio-
  // controlled URL across everything checked is the shared engine
  // deployment itself — used below instead of a guessed custom domain.
  portfolio: [
    {
      slug: 'martinez-landscaping-growth',
      business: 'Martinez Landscaping & Tree Services',
      tagline: 'Landscapes worth coming home to.',
      city: 'Wilmington, DE',
      tier: 'Growth',
      description:
        'The Growth package shown in full: an interactive before/after project gallery, a full services×service-area SEO page matrix, and an emergency-response banner built for a trade where same-day calls matter.',
      highlights: ['Before/after gallery slider', 'Services × town SEO matrix', 'Emergency-service banner'],
      url: 'https://monkey-ventures.vercel.app',
      image: '/images/portfolio/martinez-growth.png',
    },
    {
      slug: 'martinez-landscaping-starter',
      business: 'Martinez Landscaping & Tree Services',
      tagline: 'Same business, Starter package.',
      city: 'Wilmington, DE',
      tier: 'Starter',
      description:
        'The same real business as above, rebuilt at the Starter tier so you can see exactly what changes between packages: a simpler gallery, fewer service pages, no service-area matrix — same design quality throughout. Not separately deployed at its own live URL today — ask us for a walkthrough.',
      highlights: ['Simplified gallery', 'Core service pages', 'Same premium design system'],
      // No url: this tier isn't independently live anywhere right now — the
      // engine is a build-time tenant switch, not four simultaneous live
      // sites, and only the Growth tenant above is actually deployed.
      image: '/images/portfolio/martinez-starter.png',
    },
  ] satisfies PortfolioEntry[],

  // ── FAQ ──────────────────────────────────────────────────────────────
  faq: [
    {
      question: 'How is this so much faster than a typical web agency?',
      answer:
        'We work from one proven template system rather than designing every site from a blank page, and we build your demo before any contract exists — so there’s no lengthy discovery phase before you see something real. The finished site still gets a genuine review and revision round; it just doesn’t take months to get there.',
    },
    {
      question: 'Do I have to commit to anything before I see my website?',
      answer:
        'No. We build a working demo first, using information that’s already public about your business. You look at the actual site, on a real link, before you agree to anything.',
    },
    {
      question: 'Are you an established agency, or a new one?',
      answer:
        'We’re new — we haven’t hidden that, and we won’t start now. What that means in practice: every plan is priced the same for our first client as our hundredth, with no early-adopter discount that quietly disappears later, and the whole process is built around proving the work before you commit anything — a real, working demo, not a portfolio and a promise. Judge the actual site we build for you, not a track record.',
    },
    {
      question: 'Do I own my website?',
      answer:
        'Yes, for Starter and Growth — once the setup fee is paid, the site and its content are yours, and your domain is always yours regardless of plan. Website Care works differently: since there’s no setup fee, the website remains part of the managed service while you’re subscribed, rather than transferring to you outright. Ask about a buyout if you’d rather own a copy of the site on Website Care.',
    },
    {
      question: 'Can I upgrade later?',
      answer:
        'Yes. Moving from Starter to Growth costs only the difference between the two setup fees ($1,000) — you already paid for and own the Starter build, so you’re not charged for it twice.',
    },
    {
      question: 'What happens if I cancel Website Care?',
      answer:
        'Because Website Care never charged a setup fee, the site stays part of the managed service rather than transferring to you the way a paid-in-full Starter or Growth site does. If you’d like to keep the site instead of continuing the plan, ask us about a buyout.',
    },
    {
      question: 'What does the price actually include?',
      answer:
        'A finished, mobile-responsive website built on the Summit Studio template, with the services and service-area pages your package includes, a working contact form, SEO metadata, hosting and support already bundled into the monthly fee, and a revision round before launch. See the Pricing page for exactly what’s in each plan.',
    },
    {
      question: 'Is there a contract for ongoing hosting?',
      answer:
        'Starter and Growth are cancel-anytime, no lock-in. Website Care is the one exception — a 12-month agreement, which is what makes its zero-upfront-cost pricing work. A business that feels trapped doesn’t refer anyone else, so we keep that the exception, not the rule.',
    },
    {
      question: 'What if I want changes after launch?',
      answer:
        'Website Care includes unlimited minor text/image updates. On Starter or Growth, any change — however small — gets a quick, flat-fee or hourly quote before we start, so you always know the cost up front.',
    },
    {
      question: 'Do you only build for landscaping businesses?',
      answer:
        'Landscaping and lawn care is where we’ve built and proven the process so far. If you run a different single-location home-service business, get in touch — it may already fit, or it’s a short conversation about custom scope.',
    },
    {
      question: 'How long does the real build take once I sign on?',
      answer:
        'Typically 3–5 business days after your deposit clears and your materials (photos, service details, logo if you have one) are complete — longer if materials arrive late, since the timeline starts from when we have everything, not from the deposit alone.',
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
