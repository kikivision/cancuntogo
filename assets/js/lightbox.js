/* ══════════════════════════════════════════════════════════════
   CancunToGo — gallery lightbox

   Progressive enhancement. The gallery is real <img> inside <button>,
   so with JS off the shots still render, still get indexed, and the
   buttons simply do nothing. Nothing here is required to see a photo.

   Native <dialog> does the heavy lifting: Esc to close, focus trap,
   inert background, and focus restored to the trigger on close — all
   for free, and all things a hand-rolled overlay usually gets wrong.
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
    '<button class="lb-close" type="button" aria-label="Close">&times;</button>' +
    '<button class="lb-btn lb-prev" type="button" aria-label="Previous photo">&#8249;</button>' +
    '<button class="lb-btn lb-next" type="button" aria-label="Next photo">&#8250;</button>' +
    '<img alt="">' +
    '<p class="lb-cap"></p>';
  document.body.appendChild(dlg);

  var img = dlg.querySelector('img');
  var cap = dlg.querySelector('.lb-cap');
  var prev = dlg.querySelector('.lb-prev');
  var next = dlg.querySelector('.lb-next');
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

  function open(n) { show(n); dlg.showModal(); }

  shots.forEach(function (btn, n) {
    btn.addEventListener('click', function () { open(n); });
  });

  next.addEventListener('click', function () { show(i + 1); });
  prev.addEventListener('click', function () { show(i - 1); });
  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });

  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); show(i - 1); }
  });

  // Click outside the image closes. <dialog> reports backdrop clicks as
  // clicks on the dialog itself, so compare against its own box.
  dlg.addEventListener('click', function (e) {
    if (e.target !== dlg) return;
    var r = dlg.getBoundingClientRect();
    var inside = e.clientX >= r.left && e.clientX <= r.right &&
                 e.clientY >= r.top  && e.clientY <= r.bottom;
    if (!inside) dlg.close();
  });
})();
