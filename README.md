# CancunToGo

> Cancún's best resorts, sorted. **Order up.**

A "coming soon" landing page for **CancunToGo** — honest resort picks, swim-up suites, and trip-planning help for Cancún, without the overwhelm. A sister site of [JetAndSwim.com](https://jetandswim.com).

## What's here

A single self-contained page:

- **[`index.html`](index.html)** — the entire site (HTML, CSS, and JS inline, no build step or dependencies).

It features a branded hero, an email capture form, a trust strip, and a footer.

## Email signup

The signup form is wired to **[Netlify Forms](https://docs.netlify.com/forms/setup/)**:

- The form is tagged with `data-netlify="true"` and uses a honeypot (`bot-field`) for spam protection.
- Submissions are POSTed to `/` via `fetch` so the page never reloads; a success message is shown in place.

> **Note:** Form submissions are only captured when the site is **deployed on Netlify**. Opening `index.html` directly from disk will show the success message but won't record the email.

## Local preview

No build step required — just open the file:

```bash
# macOS
open index.html

# Windows
start index.html
```

Or serve it locally to mirror the deployed behavior:

```bash
npx serve .
```

## Deploy

Deploy the repository to **Netlify** (drag-and-drop the folder, or connect this Git repo). Netlify auto-detects the form on first deploy; submissions then appear under **Forms** in the Netlify dashboard.

## Contact

[hello@cancuntogo.com](mailto:hello@cancuntogo.com)
