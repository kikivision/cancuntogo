#!/usr/bin/env node
/**
 * Rewrite every <lastmod> in sitemap.xml from git history.
 *
 *   node scripts/sitemap-lastmod.mjs           # write
 *   node scripts/sitemap-lastmod.mjs --check   # report drift, exit 1 if any
 *
 * Why this exists: the dates had drifted to mid-June while the pages were being
 * edited daily, so the sitemap was advertising a site that hadn't changed in two
 * months. Google treats lastmod as a hint and learns to ignore the field on
 * sitemaps where it's wrong — so a stale one is worse than none.
 *
 * Source of truth is the last commit that touched the file backing each URL.
 * That's deliberately conservative: it moves when the page's own HTML moves, not
 * when a shared stylesheet does. A CSS-only change alters rendering but not the
 * document Google fetches, and inflating every date on every CSS tweak is
 * exactly how the field stops being trusted.
 *
 * Run it after any content change, before pushing.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const SITEMAP = 'sitemap.xml';
const ORIGIN = 'https://cancuntogo.com';
const check = process.argv.includes('--check');

/** URL path -> the file that serves it. */
function fileFor(loc) {
  const p = loc.replace(ORIGIN, '').replace(/^\/|\/$/g, '');
  for (const c of (p === '' ? ['index.html'] : [p, `${p}.html`, `${p}/index.html`])) {
    if (existsSync(c)) return c;
  }
  return null;
}

function lastCommitDate(file) {
  const out = execFileSync('git', ['log', '-1', '--format=%ad', '--date=short', '--', file],
    { encoding: 'utf8' }).trim();
  return out || null;
}

let xml = readFileSync(SITEMAP, 'utf8');
const drift = [];

xml = xml.replace(
  /(<loc>)([^<]+)(<\/loc>\s*<lastmod>)([^<]+)(<\/lastmod>)/g,
  (whole, a, loc, b, current, c) => {
    const file = fileFor(loc);
    if (!file) { console.error(`  ?? no file backs ${loc}`); return whole; }
    const real = lastCommitDate(file);
    if (!real) { console.error(`  ?? no git history for ${file}`); return whole; }
    if (real !== current) drift.push({ loc: loc.replace(ORIGIN, ''), current, real });
    return a + loc + b + real + c;
  });

if (!drift.length) {
  console.log('sitemap.xml lastmod is accurate — nothing to do.');
  process.exit(0);
}

console.log(`${drift.length} URL(s) with stale lastmod:\n`);
for (const d of drift) {
  console.log(`  ${d.loc.padEnd(46)} ${d.current} -> ${d.real}`);
}

if (check) {
  console.log('\n--check: not written. Run without --check to fix.');
  process.exit(1);
}

writeFileSync(SITEMAP, xml);
console.log('\nsitemap.xml updated.');
