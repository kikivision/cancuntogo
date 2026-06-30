/*
  Render the marketing templates + transparent logo marks to PNG.

  Usage:
    node marketing/export.mjs          # renders the default sample set

  Requires Playwright (`npm i -D playwright`). If your Chromium lives in a
  non-default location, set PW_CHROME=/path/to/chrome.
  (You can also skip this entirely: just open the .html files in a browser
  and screenshot them at 1080×1080 / 1080×1920.)
*/
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
mkdirSync(join(here, 'exports'), { recursive: true });
mkdirSync(join(here, 'marks'), { recursive: true });

const exe = process.env.PW_CHROME;
const browser = await chromium.launch(exe ? { executablePath: exe } : {});

// transparent logo marks (for email / Canva / decks)
const MARKS = [
  ['cancuntogo', 'sunset'], ['cancuntogo', 'flamingo'], ['cancuntogo', 'aqua'],
  ['skyandswim', 'teal'], ['skyandswim', 'crimson'],
  ['jetandswim', 'azure'], ['jetandswim', 'dusk'],
];
const mp = await browser.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 2 });
await mp.goto('file://' + join(here, '_mark.html'));
for (const [brand, mood] of MARKS) {
  await mp.evaluate(([b, m]) => { document.body.dataset.brand = b; document.body.dataset.mood = m; window.applyBrand(); }, [brand, mood]);
  await mp.waitForTimeout(60);
  await mp.locator('#mark').screenshot({ path: join(here, 'marks', `${brand}-${mood}.png`), omitBackground: true });
  console.log('mark', brand, mood);
}

// sample social exports (demonstrates the same template, different brands)
const SHOTS = [
  ['instagram-post.html', 'cancuntogo', 'flamingo', 1080, 1080],
  ['instagram-story.html', 'cancuntogo', 'flamingo', 1080, 1920],
  ['instagram-post.html', 'skyandswim', 'teal', 1080, 1080],
  ['instagram-story.html', 'skyandswim', 'teal', 1080, 1920],
  ['instagram-post.html', 'jetandswim', 'azure', 1080, 1080],
];
for (const [tpl, brand, mood, w, h] of SHOTS) {
  const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await p.goto('file://' + join(here, tpl));
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(([b, m]) => { document.body.dataset.brand = b; document.body.dataset.mood = m; window.applyBrand(); }, [brand, mood]);
  await p.waitForTimeout(400);
  const out = `${tpl.replace('.html', '')}-${brand}-${mood}.png`;
  await p.locator('.canvas').screenshot({ path: join(here, 'exports', out) });
  await p.close();
  console.log('export', out);
}

await browser.close();
console.log('done');
