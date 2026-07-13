import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * POST /api/contact
 *
 * Receives lead submissions from the Contact page and emails them via
 * Resend. Ported from martinez-landscaping's /api/estimate — same
 * honeypot + timing-check + spam-keyword-filter + server-side validation
 * layering, since that's genuinely good, already-proven spam defense — but
 * simplified for this form's actual shape:
 *
 *   - JSON body, not multipart. The estimate form supports photo
 *     attachments (a landscaping client's customers describing a job);
 *     this form has no use for file uploads, so there's no reason to carry
 *     multipart/FormData parsing, MIME/size validation, or Buffer-building
 *     that would never run.
 *   - New fields relevant to a web-design inquiry (businessName, website,
 *     packageInterest) in place of the estimate form's (service, address).
 *
 * Configure delivery with these env vars (see .env.example):
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * If any are unset, delivery falls back to a server console log instead of
 * failing outright, so the site runs with zero configuration in local dev.
 */

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  website?: string;
  packageInterest?: string;
  message?: string;
  company?: string; // honeypot
  formRenderedAt?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SHORT = 200;
const MAX_MESSAGE = 5000;
const MIN_PHONE_DIGITS = 10;
const MAX_PHONE_DIGITS = 15;
const MIN_SUBMIT_MS = 2000;

const SPAM_PATTERNS = [
  /\bseo\b/i,
  /\bbacklinks?\b/i,
  /link.?building/i,
  /guest.?post/i,
  /digital marketing/i,
  /increase.*traffic/i,
  /boost.*ranking/i,
  /search engine/i,
  /crypto/i,
  /\bnft\b/i,
];

function validate(body: ContactPayload): string | null {
  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';

  if (!name) return 'Please add your name.';
  if (name.length > MAX_SHORT) return 'Name is too long.';
  if (!email) return 'Please add an email address so we can reach you.';
  if (!EMAIL_RE.test(email)) return 'Please add a valid email address.';
  if (phone) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < MIN_PHONE_DIGITS || digits.length > MAX_PHONE_DIGITS) {
      return 'Please add a valid phone number.';
    }
  }
  if (email.length > MAX_SHORT || phone.length > MAX_SHORT) return 'That entry is too long.';
  if ((body.businessName?.length ?? 0) > MAX_SHORT) return 'Business name is too long.';
  if ((body.website?.length ?? 0) > MAX_SHORT) return 'Website is too long.';
  if ((body.packageInterest?.length ?? 0) > MAX_SHORT) return 'That entry is too long.';
  if ((body.message?.length ?? 0) > MAX_MESSAGE) return 'Message is too long.';

  return null;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot — silently accept and drop bot submissions.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  // Time check — reject submissions faster than a human could plausibly fill the form.
  const renderedAt = Number(body.formRenderedAt);
  if (Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_SUBMIT_MS) {
    console.warn('[contact] Blocked — submitted too soon after page load.');
    return NextResponse.json({ ok: true });
  }

  // Keyword filter — catches SEO/marketing spam that isn't a bot.
  const spamText = `${body.name ?? ''} ${body.email ?? ''} ${body.message ?? ''}`;
  if (SPAM_PATTERNS.some((pattern) => pattern.test(spamText))) {
    console.warn('[contact] Blocked — message matched spam keyword filter.');
    return NextResponse.json({ ok: true });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 422 });
  }

  const name = body.name!.trim();
  const email = body.email!.trim();
  const phone = body.phone?.trim() || undefined;
  const businessName = body.businessName?.trim() || undefined;
  const website = body.website?.trim() || undefined;
  const packageInterest = body.packageInterest?.trim() || undefined;

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    const missing = [
      !apiKey && 'RESEND_API_KEY',
      !toEmail && 'CONTACT_TO_EMAIL',
      !fromEmail && 'CONTACT_FROM_EMAIL',
    ].filter(Boolean);
    console.warn(`[contact] Resend not configured (missing ${missing.join(', ')}) — logging instead of emailing.`);
    console.info('[contact] new lead', { name, email, phone, businessName, website, packageInterest });
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New website inquiry — ${businessName ?? name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone ?? '—'}`,
        `Business: ${businessName ?? '—'}`,
        `Current website: ${website ?? '—'}`,
        `Package interest: ${packageInterest ?? '—'}`,
        '',
        body.message ?? '',
      ].join('\n'),
    });

    if (error) {
      console.error('[contact] Resend rejected the email:', error.message);
      return NextResponse.json(
        { ok: false, error: 'We could not send your message right now. Please email us directly instead.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Failed to reach Resend:', err);
    return NextResponse.json(
      { ok: false, error: 'We could not send your message right now. Please email us directly instead.' },
      { status: 502 },
    );
  }
}
