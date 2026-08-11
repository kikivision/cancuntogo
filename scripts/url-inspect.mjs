#!/usr/bin/env node
/**
 * URL Inspection — why is a page earning no impressions?
 *
 *   node scripts/url-inspect.mjs                    # the standing diagnostic pair
 *   node scripts/url-inspect.mjs /resorts/le-blanc /guides/
 *   node scripts/url-inspect.mjs https://cancuntogo.com/resorts/le-blanc
 *
 * Paths are resolved against https://cancuntogo.com. Bare arguments work; full
 * URLs work too.
 *
 * This is a DIFFERENT API from the one data/gsc/README.md documents. That covers
 * Search Analytics (webmasters/v3, searchAnalytics/query) — aggregate clicks and
 * positions. This is Search Console v1 urlInspection/index:inspect, which answers
 * a different question: did Google crawl this specific URL, did it index it, and
 * which canonical did it pick?
 *
 * Auth is the same local gcloud Application Default Credentials
 * (kikidailey@gmail.com, webmasters.readonly). No keys in the repo.
 *
 * Two gotchas, both inherited from the Search Analytics tooling:
 *   - Node may need NODE_OPTIONS=--use-system-ca for outbound HTTPS.
 *   - siteUrl must be the sc-domain: form, not the https:// form, because the
 *     property is domain-verified.
 *
 * Quota is 2,000 inspections/day and 600/minute per property — generous for
 * spot checks, not for bulk auditing every URL in the sitemap.
 */

import { execFileSync } from 'node:child_process';

const SITE = 'sc-domain:cancuntogo.com';
const ORIGIN = 'https://cancuntogo.com';

// The pair that distinguishes a URL-shape problem from a content problem.
// Same age, opposite outcomes: hyatt-ziva has 15 inbound internal links and
// earns nothing; hard-rock has 1 and earns. If the flat URL shows a canonical
// Google didn't accept and the directory URL doesn't, the URL shape is the bug.
const DEFAULT_URLS = ['/resorts/hyatt-ziva', '/resorts/hard-rock/'];

function token() {
  try {
    return execFileSync('gcloud',
      ['auth', 'application-default', 'print-access-token'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (e) {
    console.error(
      'Could not get a token from gcloud Application Default Credentials.\n' +
      '  Is gcloud installed?           gcloud --version\n' +
      '  Are ADC set up for this scope? gcloud auth application-default login \\\n' +
      '                                   --scopes=https://www.googleapis.com/auth/webmasters.readonly\n' +
      '\nThis will not work in the Claude Code remote container — no gcloud, no\n' +
      'credentials. Run it locally, or use the Search Console UI.');
    process.exit(1);
  }
}

async function inspect(url, bearer) {
  const res = await fetch(
    'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: { Authorization: `Bearer ${bearer}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE, languageCode: 'en-US' }),
    });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(`${res.status} ${body?.error?.message ?? JSON.stringify(body)}`);
  }
  return body.inspectionResult ?? {};
}

/** Turn the raw fields into the answer we actually came for. */
function verdict(r) {
  const i = r.indexStatusResult ?? {};
  const declared = i.userCanonical || '(none)';
  const chosen = i.googleCanonical || '(none)';
  const state = i.coverageState || '(unknown)';

  if (i.googleCanonical && i.userCanonical && i.googleCanonical !== i.userCanonical) {
    return `URL PROBLEM — Google chose a different canonical (${chosen}).\n` +
           `      Signals are split across two live URLs. Fix: a /*.html -> /:splat 301\n` +
           `      in _redirects, which currently has no such rule.`;
  }
  if (/crawled/i.test(state) && /not indexed/i.test(state)) {
    return 'CONTENT PROBLEM — Google fetched it and declined to index.\n' +
           '      Not plumbing. Thinness is the live suspect (see CONTENT_PLAN.md).';
  }
  if (/discovered/i.test(state) && /not indexed/i.test(state)) {
    return 'CRAWL BUDGET — never fetched. Request indexing and watch.';
  }
  if (/indexed/i.test(state)) {
    return 'HEALTHY — indexed, canonical accepted. Not the explanation for zero impressions.';
  }
  return `Inconclusive — read coverageState directly: ${state}`;
}

const args = process.argv.slice(2);
const urls = (args.length ? args : DEFAULT_URLS)
  .map(u => (u.startsWith('http') ? u : ORIGIN + (u.startsWith('/') ? u : '/' + u)));

const bearer = token();
let failed = false;

for (const url of urls) {
  console.log('\n── ' + url);
  try {
    const r = await inspect(url, bearer);
    const i = r.indexStatusResult ?? {};
    for (const [k, v] of [
      ['coverageState', i.coverageState],
      ['verdict', i.verdict],
      ['userCanonical', i.userCanonical],
      ['googleCanonical', i.googleCanonical],
      ['lastCrawlTime', i.lastCrawlTime],
      ['robotsTxtState', i.robotsTxtState],
      ['indexingState', i.indexingState],
      ['pageFetchState', i.pageFetchState],
    ]) console.log(`   ${k.padEnd(17)} ${v ?? '—'}`);
    console.log(`\n   => ${verdict(r)}`);
    if (r.inspectionResultLink) console.log(`   ${r.inspectionResultLink}`);
  } catch (e) {
    failed = true;
    console.error(`   FAILED: ${e.message}`);
  }
}

console.log();
process.exit(failed ? 1 : 0);
