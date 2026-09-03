/* ══════════════════════════════════════════════════════════════
   CancunToGo — affiliate click tracking

   Sends a GA4 `affiliate_click` event when someone clicks through to a
   booking partner. GA4 was recording pageviews and newsletter signups
   but nothing about the links that actually earn, so there was no way
   to tell a page that gets read from a page that gets booked.

   Pure observation. Nothing here calls preventDefault, so a broken or
   blocked gtag cannot swallow a click — the link is a plain <a> and
   keeps working with JS off, which is the point.

   No event_callback / delayed-navigation dance either. Every affiliate
   link is target="_blank", so the page is never unloaded and the beacon
   has all the time it needs. (gtag uses sendBeacon anyway.) That dance
   is what breaks popup blockers and cmd-click, so it is worth not
   needing it.

   Links are matched on rel="sponsored" first and the CJ redirect domains
   second. rel is the durable signal: every affiliate link on the site
   carries it for FTC and Google compliance, so a new network gets
   tracked without touching this file. The domain list is the backstop
   for a link that ever ships with the rel attribute missing.
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // Commission Junction rotates its redirect domains between advertisers;
  // these are the ones in the family. Only jdoqocy.com is in use today.
  var CJ_DOMAINS = [
    'jdoqocy.com', 'anrdoezrs.net', 'dpbolvw.net', 'kqzyfj.com',
    'tkqlhce.com', 'ftjcfx.com', 'lduhtrp.net', 'tqlkg.com'
  ];

  // Where on the page the link sits, most specific wrapper first. These are
  // the existing layout classes — no markup change, so the 32 links in the
  // site did not each need a data attribute hand-added to them.
  var SLOTS = [
    ['.hero', 'hero'],                 // resort page, above the fold
    ['.cta-band', 'cta_band'],         // resort page, bottom CTA
    ['.book', 'verdict'],              // guide, "choose X if…" column
    ['.book-card', 'compare_pair']     // guide, bottom price comparison
  ];

  // GA4 truncates string params at 100 chars; do it here so what we send
  // is what shows up in the report.
  function clip(value) {
    if (!value) return undefined;
    value = String(value).replace(/\s+/g, ' ').trim();
    return value.length > 100 ? value.slice(0, 100) : value;
  }

  function bareHost(host) {
    return host.replace(/^www\./, '').toLowerCase();
  }

  function isAffiliate(link) {
    if (/(^|\s)sponsored(\s|$)/i.test(link.rel || '')) return true;
    try {
      return CJ_DOMAINS.indexOf(bareHost(new URL(link.href).hostname)) !== -1;
    } catch (err) {
      return false;
    }
  }

  // The CJ href wraps the real destination in a ?url= param. Unwrapping it
  // gives both the merchant and the specific hotel, which is the whole
  // reason to log the click — "someone left for Booking.com" is not useful,
  // "someone left for Le Blanc from the hero" is.
  function destination(link) {
    try {
      var target = new URL(link.href).searchParams.get('url');
      return target ? new URL(target) : null;
    } catch (err) {
      return null;
    }
  }

  function slotOf(link) {
    for (var i = 0; i < SLOTS.length; i++) {
      if (link.closest(SLOTS[i][0])) return SLOTS[i][1];
    }
    return 'inline';
  }

  function report(link) {
    if (typeof window.gtag !== 'function') return;

    var href = new URL(link.href);
    var dest = destination(link);
    var hotel = dest && dest.pathname.match(/\/hotel\/[a-z]{2}\/([^/.]+)/i);

    window.gtag('event', 'affiliate_click', {
      network: CJ_DOMAINS.indexOf(bareHost(href.hostname)) !== -1
        ? 'cj'
        : clip(bareHost(href.hostname)),
      merchant: dest ? clip(bareHost(dest.hostname)) : clip(bareHost(href.hostname)),
      resort: hotel ? clip(hotel[1]) : undefined,
      link_location: slotOf(link),
      link_text: clip(link.textContent),
      page_path: clip(window.location.pathname)
    });
  }

  function onClick(e) {
    // Something upstream already cancelled the navigation — no click-through
    // happened, so there is nothing to count.
    if (e.defaultPrevented) return;
    // auxclick covers the middle-click "open in background tab", which never
    // fires a click event. Button 1 only: right-click is not a click-through.
    if (e.type === 'auxclick' && e.button !== 1) return;

    var node = e.target;
    if (!node || typeof node.closest !== 'function') return;

    var link = node.closest('a[href]');
    if (link && isAffiliate(link)) report(link);
  }

  // Capture phase, so a stopPropagation added to some future component
  // cannot silently blind the reporting.
  document.addEventListener('click', onClick, true);
  document.addEventListener('auxclick', onClick, true);
})();
