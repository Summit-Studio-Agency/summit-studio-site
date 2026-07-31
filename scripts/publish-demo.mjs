#!/usr/bin/env node
/**
 * publish-demo — one command to put a prospect's demo landing page live on
 * summitstudioagency.com, and to refresh its tiles later.
 *
 *   npm run demo:publish -- <engine-growth-slug> [options]
 *
 * Given the engine's Growth slug (e.g. `ayala-landscaping-llc`), it:
 *   1. Verifies both live engine sites respond (Growth = /demo/<slug>,
 *      Starter = /demo/<slug>-starter on engine.summitstudioagency.com).
 *   2. Captures fresh 16:10 homepage screenshots of each into
 *      public/images/portfolio/<slug>-{growth,starter}.jpg.
 *   3. Upserts the entry in src/data/demos.json — the single source of
 *      truth that both the landing page (src/app/demo/[slug]/page.tsx) and
 *      the proxy map (src/middleware.ts) read from. Business name + tagline
 *      are pulled from the live site's OpenGraph tags on first publish;
 *      re-running preserves any hand-edited copy and only refreshes the
 *      screenshots (so this doubles as "refresh tiles" after a review pass).
 *   4. git commit + push (Vercel then deploys), unless --no-push / --dry-run.
 *
 * Options:
 *   --dry-run           Capture + preview the demos.json change; no git.
 *   --no-push           Commit but don't push.
 *   --business "Name"   Override the auto-detected business name.
 *   --tagline "..."     Override the auto-detected tagline.
 *
 * Screenshots use Playwright's local Chromium (devDependency). The engine
 * sites must already be generated and deployed — run this AFTER you've
 * finished the review queue so the tiles reflect the final sites.
 */
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ENGINE_ORIGIN = 'https://engine.summitstudioagency.com';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEMOS_JSON = join(ROOT, 'src', 'data', 'demos.json');
const PORTFOLIO_DIR = join(ROOT, 'public', 'images', 'portfolio');

const STARTER_HIGHLIGHTS = ['Core service pages', 'Same premium design system', 'Clean, mobile-first build'];
const GROWTH_HIGHLIGHTS = ['Services × town SEO matrix', 'Wider local-SEO coverage', 'Advanced on-page SEO'];

function parseArgs(argv) {
  const args = { _: [], dryRun: false, noPush: false, business: null, tagline: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') args.dryRun = true;
    else if (a === '--no-push') args.noPush = true;
    else if (a === '--business') args.business = argv[++i];
    else if (a === '--tagline') args.tagline = argv[++i];
    else if (a.startsWith('--')) { console.error(`Unknown option: ${a}`); process.exit(1); }
    else args._.push(a);
  }
  return args;
}

function git(...a) {
  return execFileSync('git', a, { cwd: ROOT, encoding: 'utf-8' }).trim();
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const base = args._[0];
  if (!base) {
    console.error('Usage: npm run demo:publish -- <engine-growth-slug> [--dry-run] [--no-push] [--business "Name"] [--tagline "..."]');
    process.exit(1);
  }
  // Engine tenant slugs (what actually exists on the engine) and the public
  // -growth/-starter slugs this domain exposes (proxied by src/middleware.ts).
  const engine = { growth: base, starter: `${base}-starter` };
  const publicSlug = base; // landing page lives at /demo/<base>
  const urls = {
    growth: `${ENGINE_ORIGIN}/demo/${engine.growth}`,
    starter: `${ENGINE_ORIGIN}/demo/${engine.starter}`,
  };

  console.log(`\n▸ Publishing demo landing for "${base}"`);
  console.log(`  Growth : ${urls.growth}`);
  console.log(`  Starter: ${urls.starter}`);

  // 1. Verify both engine sites are live before publishing a landing to them.
  for (const [tier, url] of Object.entries(urls)) {
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) {
      console.error(`\n✖ ${tier} site returned HTTP ${res.status} — is it generated and deployed on the engine yet?\n  ${url}`);
      process.exit(1);
    }
  }
  console.log('  ✓ both engine sites respond 200');

  // 2. Capture tiles + read OG metadata off the Growth site.
  const browser = await chromium.launch();
  let og = { title: '', description: '' };
  for (const tier of ['growth', 'starter']) {
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(urls[tier], { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1200);
    if (tier === 'growth') {
      og = await page.evaluate(() => ({
        title: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || document.title || '',
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      }));
    }
    const file = join(PORTFOLIO_DIR, `${base}-${tier}.jpg`);
    await page.screenshot({ path: file, type: 'jpeg', quality: 82, clip: { x: 0, y: 0, width: 1600, height: 1000 } });
    console.log(`  ✓ captured ${base}-${tier}.jpg`);
    await ctx.close();
  }
  await browser.close();

  // Derive business + tagline from OG title ("Name — tagline") / <title> ("Name | ...").
  const detectedBusiness = (og.title.split(' — ')[0] || og.title.split(' | ')[0] || base).trim();
  const detectedTagline = (og.title.includes(' — ') ? og.title.split(' — ').slice(1).join(' — ') : og.description).trim();

  // 3. Upsert demos.json — preserve existing copy/highlights on re-run.
  const demos = JSON.parse(readFileSync(DEMOS_JSON, 'utf-8'));
  const existing = demos.find((d) => d.slug === publicSlug);
  const mkPackage = (tier, highlightsDefault) => {
    const prior = existing?.packages?.find((p) => p.tier === tier);
    return {
      tier,
      url: `/demo/${publicSlug}-${tier.toLowerCase()}`,
      highlights: prior?.highlights ?? highlightsDefault,
      image: `/images/portfolio/${base}-${tier.toLowerCase()}.jpg`,
    };
  };
  const entry = {
    slug: publicSlug,
    business: args.business ?? existing?.business ?? detectedBusiness,
    tagline: args.tagline ?? existing?.tagline ?? detectedTagline,
    engine,
    // Starter first so it renders on the left; the page also enforces this.
    packages: [mkPackage('Starter', STARTER_HIGHLIGHTS), mkPackage('Growth', GROWTH_HIGHLIGHTS)],
  };

  if (existing) Object.assign(existing, entry);
  else demos.push(entry);

  console.log(`\n  ${existing ? 'Updated' : 'Added'} demos.json entry:`);
  console.log(`    business: ${entry.business}`);
  console.log(`    tagline : ${entry.tagline}`);
  console.log(`    landing : https://summitstudioagency.com/demo/${publicSlug}`);

  if (args.dryRun) {
    console.log('\n(dry run — no files written, no git)\n');
    return;
  }

  writeFileSync(DEMOS_JSON, JSON.stringify(demos, null, 2) + '\n');
  console.log('  ✓ wrote src/data/demos.json');

  // 4. Commit (+ push).
  const files = ['src/data/demos.json', `public/images/portfolio/${base}-growth.jpg`, `public/images/portfolio/${base}-starter.jpg`];
  git('add', ...files);
  const status = git('status', '--porcelain', ...files);
  if (!status) {
    console.log('\n  Nothing changed — already up to date.\n');
    return;
  }
  git('commit', '-m', `Demo landing: ${existing ? 'refresh' : 'publish'} ${publicSlug} (tiles + wiring)`);
  console.log(`  ✓ committed`);
  if (args.noPush) {
    console.log('\n(--no-push — commit made, not pushed)\n');
    return;
  }
  git('push', 'origin', 'HEAD');
  console.log('  ✓ pushed — Vercel will deploy shortly.\n');
}

main().catch((e) => { console.error('\n✖ publish-demo failed:', e.message); process.exit(1); });
