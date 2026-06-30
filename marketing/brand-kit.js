/*
  CancunToGo marketing kit — shared brand registry.

  One set of templates, many brands. Each brand defines its wordmark, its
  mark (logo) and a set of "moods" (colourways). The templates read
  data-brand + data-mood off <body> and this script paints everything.

  To switch brand in a template:   <body data-brand="skyandswim" data-mood="teal">
  To add a brand: copy a block below and fill in wordmark / mark / moods.
*/
window.BRANDS = {

  /* ───────── CancunToGo — three-wave mark ───────── */
  cancuntogo: {
    wordmark: 'Cancún<span class="a2">ToGo</span>',
    accent2: '#90D7EC',
    // waves are STROKED, so `paint` is used as the stroke
    mark: (paint) =>
      `<g fill="none" stroke="${paint}" stroke-width="5.5" stroke-linecap="round">
         <path d="M20 36 Q35 26 50 36 Q65 46 80 36"/>
         <path d="M20 50 Q35 40 50 50 Q65 60 80 50"/>
         <path d="M20 64 Q35 54 50 64 Q65 74 80 64"/>
       </g>`,
    defaultMood: 'sunset',
    moods: {
      sunset:   { grad: [['0','#F6C45A'],['0.5','#EE8A5A'],['1','#2E9AB5']], bg: '#0E2A32', glow: 'rgba(238,138,90,.30)', accent: '#F4B06A' },
      flamingo: { grad: [['0','#FF9E84'],['0.5','#FB3F86'],['1','#DC1F72']], bg: '#0E2A32', glow: 'rgba(251,63,134,.30)', accent: '#FB6FA0' },
      aqua:     { grad: [['0','#9FD8E6'],['1','#1E7191']],                    bg: '#08405A', glow: 'rgba(95,184,206,.28)', accent: '#9FD8E6' },
    },
  },

  /* ───────── Sky & Swim — water droplet ───────── */
  skyandswim: {
    wordmark: 'Sky <span class="a2">&amp;</span> Swim',
    accent2: '#C0392B',
    // droplet is FILLED, so `paint` is used as the fill
    mark: (paint) =>
      `<path d="M50 12 C56 30 70 46 70 60 A20 20 0 1 1 30 60 C30 46 44 30 50 12 Z" fill="${paint}"/>`,
    defaultMood: 'teal',
    moods: {
      teal:    { grad: [['0','#BCDDE0'],['1','#2E6B79']], bg: '#12343C', glow: 'rgba(46,107,121,.32)', accent: '#7FC2D4' },
      crimson: { grad: [['0','#E68A7F'],['1','#C0392B']], bg: '#12343C', glow: 'rgba(192,57,43,.26)',  accent: '#E8897F' },
    },
  },

  /* ───────── Jet & Swim — plane over a wave ─────────
     Reconstructed from jetandswim.com: a jet rising over a layered wave,
     teal + cream with a terracotta accent ("Curated Travel"). The exact
     hexes are eyeballed from the live site — swap in the real logo SVG /
     brand colours for pixel accuracy. */
  jetandswim: {
    wordmark: 'Jet <span class="a2">&amp;</span> Swim',
    accent2: '#D2603A', // terracotta (their CTA accent)
    // jet (filled) rising over two waves (stroked)
    mark: (paint) =>
      `<g fill="${paint}"><path d="M50 16 L78 47 L50 40 L22 47 Z"/><path d="M47 40 L47 52 L53 52 L53 40 Z"/></g>
       <g fill="none" stroke="${paint}" stroke-width="5" stroke-linecap="round"><path d="M22 64 Q36 56 50 64 Q64 72 78 64"/><path d="M26 76 Q38 69 50 76 Q62 83 74 76"/></g>`,
    defaultMood: 'teal',
    moods: {
      teal:      { grad: [['0','#C3E5DF'],['1','#3E8E86']], bg: '#123C3A', glow: 'rgba(210,96,58,.22)', accent: '#E0966B' },
      terracotta:{ grad: [['0','#F2B58C'],['1','#CB5E37']], bg: '#123C3A', glow: 'rgba(203,94,55,.26)',  accent: '#E0966B' },
    },
  },
};

window.applyBrand = function () {
  const body = document.body;
  const b = window.BRANDS[body.dataset.brand || 'cancuntogo'];
  const m = b.moods[body.dataset.mood || b.defaultMood];
  const canvas = body.querySelector('.canvas') || body;

  canvas.style.setProperty('--bg', m.bg);
  canvas.style.setProperty('--glow', m.glow);
  canvas.style.setProperty('--accent', m.accent);
  canvas.style.setProperty('--accent2', b.accent2);

  const prev = body.querySelector('.brandGradHost');
  if (prev) prev.remove();
  const stops = m.grad.map(s => `<stop offset="${s[0]}" stop-color="${s[1]}"/>`).join('');
  body.insertAdjacentHTML('afterbegin',
    `<svg class="brandGradHost" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>` +
    `<linearGradient id="brandGrad" x1="0" y1="0" x2="0" y2="1">${stops}</linearGradient></defs></svg>`);

  const svg = (inner) => `<svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;
  const hero = body.querySelector('[data-slot="mark"]');
  if (hero) hero.innerHTML = svg(b.mark('url(#brandGrad)'));
  const foot = body.querySelector('[data-slot="brand-mark"]');
  if (foot) foot.innerHTML = svg(b.mark('#ffffff'));
  body.querySelectorAll('[data-slot="wordmark"]').forEach(el => { el.innerHTML = b.wordmark; });
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.applyBrand);
else window.applyBrand();
