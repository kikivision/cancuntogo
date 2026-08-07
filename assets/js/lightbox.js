/* ══════════════════════════════════════════════════════════════
   CancunToGo — gallery lightbox

   Progressive enhancement. The gallery is real <img> inside <button>,
   so with JS off the shots still render, still get indexed, and the
   buttons simply do nothing. Nothing here is required to see a photo.

   Native <dialog> does the heavy lifting: Esc to close, focus trap,
   inert background, and focus restored to the trigger on close — all
   for free, and all things a hand-rolled overlay usually gets wrong.

   Two things that bit on the first pass, both fixed in resort.css and here:
     - resort.css resets margin to 0 on *, which overrides the UA
       stylesheet's margin:auto and pins the dialog to the top-left. It
       needs margin:auto restored explicitly.
     - Controls hung outside the dialog box therefore rendered off-screen.
       They now sit inside .lb-frame, over the image.
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var shots = Array.prototype.slice.call(
    document.querySelectorAll('.gallery .shot')
  );
  if (!shots.length || !window.HTMLDialogElement) return;

  var dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.innerHTML =
    '<div class="lb-frame">' +
      '<img alt="">' +
      '<button class="lb-close" type="button" aria-label="Close">&times;</button>' +
      '<button class="lb-btn lb-prev" type="button" aria-label="Previous photo">&#8249;</button>' +
      '<button class="lb-btn lb-next" type="button" aria-label="Next photo">&#8250;</button>' +
    '</div>' +
    '<p class="lb-cap"></p>';
  document.body.appendChild(dlg);

  var frame = dlg.querySelector('.lb-frame');
  var img   = dlg.querySelector('img');
  var cap   = dlg.querySelector('.lb-cap');
  var prev  = dlg.querySelector('.lb-prev');
  var next  = dlg.querySelector('.lb-next');
  var i = 0;

  // Only offer navigation when there's somewhere to go.
  if (shots.length < 2) { prev.hidden = true; next.hidden = true; }

  function show(n) {
    i = (n + shots.length) % shots.length;
    var src = shots[i].querySelector('img');
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
    cap.textContent = src.alt;
  }

  shots.forEach(function (btn, n) {
    btn.addEventListener('click', function () { show(n); dlg.showModal(); });
  });

  next.addEventListener('click', function () { show(i + 1); });
  prev.addEventListener('click', function () { show(i - 1); });
  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });

  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); show(i - 1); }
  });

  // Click anywhere off the photo closes. A backdrop click reports the dialog
  // itself as the target, and the dialog has no padding, so target === dlg is
  // reliable — unlike comparing pointer coordinates against its box, which
  // silently failed while the dialog was mispositioned.
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg || e.target === frame || e.target === cap) dlg.close();
  });
})();
