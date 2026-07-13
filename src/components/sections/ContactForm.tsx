'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Mail, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { SITE } from '@/data/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldErrors = { name?: string; email?: string; phone?: string };

const fieldBase =
  'w-full rounded-2xl border border-foreground/10 bg-background px-5 py-4 text-[15px] text-foreground placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

// Kept in sync with src/app/api/contact/route.ts — the server enforces the
// same rules independently, since client-side checks can always be bypassed.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PHONE_DIGITS = 10;
const MAX_PHONE_DIGITS = 15;

function validateFields(name: string, email: string, phone: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name) errors.name = 'Please enter your name.';
  if (!email) errors.email = 'Please enter an email address so we can reach you.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address, like jane@email.com.';
  if (phone) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < MIN_PHONE_DIGITS || digits.length > MAX_PHONE_DIGITS) {
      errors.phone = 'Enter a valid phone number.';
    }
  }
  return errors;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  // Captured once, at mount — the server compares this to submit time to
  // reject bot-speed submissions.
  const [renderedAt] = useState(() => Date.now());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot — bots fill hidden fields; humans don't.
    if (data.company) {
      setStatus('success');
      return;
    }

    const name = typeof data.name === 'string' ? data.name.trim() : '';
    const email = typeof data.email === 'string' ? data.email.trim() : '';
    const phone = typeof data.phone === 'string' ? data.phone.trim() : '';

    const errors = validateFields(name, email, phone);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus('error');
      setError('Please fix the highlighted field(s) below.');
      return;
    }

    setFieldErrors({});
    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          businessName: typeof data.businessName === 'string' ? data.businessName : '',
          website: typeof data.website === 'string' ? data.website : '',
          packageInterest: typeof data.packageInterest === 'string' ? data.packageInterest : '',
          message: typeof data.message === 'string' ? data.message : '',
          company: typeof data.company === 'string' ? data.company : '',
          formRenderedAt: renderedAt,
        }),
      });
      const result = await res.json().catch(() => null);

      if (!res.ok || !result?.ok) {
        setStatus('error');
        setError(result?.error || `Something went wrong sending your message. Please email us at ${SITE.email}.`);
        return;
      }

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setError(`Something went wrong sending your message. Please email us at ${SITE.email}.`);
    }
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-[24rem] flex-col items-center justify-center text-center" role="status">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-highlight/15 text-highlight">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-secondary">Message received.</h3>
        <p className="mt-2 max-w-sm text-muted">
          Thanks — we&rsquo;ll get back to you within 24 hours. For anything urgent, email {SITE.email} directly.
        </p>
        <Button onClick={() => setStatus('idle')} variant="outline" className="mt-7">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        <Mail className="h-4 w-4" />
        We typically respond within 24 hours
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="formRenderedAt" value={renderedAt} />

        <fieldset className="m-0 space-y-5 border-0 p-0">
          <legend className="mb-1 block w-full p-0 text-xs font-semibold uppercase tracking-wider text-muted">
            Your contact info
          </legend>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-secondary">
              Name <span className="text-accent">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Jane Doe"
              className={cn(fieldBase, fieldErrors.name && 'border-accent focus:border-accent focus:ring-accent/20')}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            />
            {fieldErrors.name && (
              <p id="name-error" role="alert" className="mt-1.5 text-xs text-accent">
                {fieldErrors.name}
              </p>
            )}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-secondary">
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="jane@email.com"
                className={cn(fieldBase, fieldErrors.email && 'border-accent focus:border-accent focus:ring-accent/20')}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
              {fieldErrors.email && (
                <p id="email-error" role="alert" className="mt-1.5 text-xs text-accent">
                  {fieldErrors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-secondary">
                Phone <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(302) 555-0123"
                className={cn(fieldBase, fieldErrors.phone && 'border-accent focus:border-accent focus:ring-accent/20')}
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
              />
              {fieldErrors.phone && (
                <p id="phone-error" role="alert" className="mt-1.5 text-xs text-accent">
                  {fieldErrors.phone}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <div className="border-t border-foreground/5 pt-6">
          <fieldset className="m-0 space-y-5 border-0 p-0">
            <legend className="mb-1 block w-full p-0 text-xs font-semibold uppercase tracking-wider text-muted">
              Your business
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="businessName" className="mb-2 block text-sm font-medium text-secondary">
                  Business name
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  autoComplete="organization"
                  placeholder="Your business name"
                  className={fieldBase}
                />
              </div>
              <div>
                <label htmlFor="website" className="mb-2 block text-sm font-medium text-secondary">
                  Current website <span className="font-normal text-muted">(if you have one)</span>
                </label>
                <input id="website" name="website" type="text" placeholder="yourbusiness.com" className={fieldBase} />
              </div>
            </div>
            <div>
              <label htmlFor="packageInterest" className="mb-2 block text-sm font-medium text-secondary">
                Which are you interested in?
              </label>
              <select id="packageInterest" name="packageInterest" defaultValue="" className={cn(fieldBase, 'appearance-none')}>
                <option value="" disabled>
                  Select an option…
                </option>
                <option value="Starter">Starter</option>
                <option value="Growth">Growth</option>
                <option value="Website Care">Website Care</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-secondary">
                Tell us about your business
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="What do you do, and what's not working about your current website (if you have one)?"
                className={cn(fieldBase, 'resize-y')}
              />
            </div>
          </fieldset>
        </div>

        <div className="border-t border-foreground/5 pt-6">
          {status === 'error' && (
            <p className="mb-5 rounded-2xl bg-accent/10 px-4 py-3 text-sm text-accent" role="alert">
              {error}
            </p>
          )}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" size="lg" disabled={status === 'submitting'}>
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending…
                </>
              ) : (
                'Send message'
              )}
            </Button>
            <a href="/privacy" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-highlight" />
              Your info is never shared — see our Privacy Policy
            </a>
          </div>
        </div>
      </form>
    </>
  );
}
