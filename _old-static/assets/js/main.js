// Nira prototype — shared interactions
// Motion (the vanilla-JS engine from the Framer Motion team — motion.dev)
// powers every animation here: hero entrance, staggered scroll reveals, hover/tap micro-interactions.
//
// The "hide, then reveal on scroll" elements (.fade-up / .stagger / .stagger-scale /
// .hero-content children) are hidden from THIS script, not from CSS — so if the CDN
// import is ever slow or blocked, content simply stays visible instead of vanishing.

document.addEventListener('DOMContentLoaded', () => {

  // ---------- mobile nav ----------
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      burger.classList.toggle('active');
    });
  }

  // ---------- generic tabs (product / archive / catalog pages) ----------
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll(`[data-tab-panel="${group.dataset.tabs}"]`);
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach(p => { p.hidden = p.dataset.tab !== btn.dataset.tab; });
      });
    });
  });

  // ---------- animations (Motion) ----------
  runMotion();
});

async function runMotion() {
  let animate, stagger, inView;
  try {
    ({ animate, stagger, inView } = await import('https://cdn.jsdelivr.net/npm/motion@11/+esm'));
  } catch (err) {
    // CDN unreachable: leave everything at its normal, fully-visible state.
    console.warn('Motion failed to load — skipping animations.', err);
    return;
  }

  const revealables = [
    ...document.querySelectorAll('.fade-up'),
    ...document.querySelectorAll('.stagger > *'),
    ...document.querySelectorAll('.stagger-scale > *'),
    ...document.querySelectorAll('.hero-content > *'),
  ];
  revealables.forEach(el => { el.style.opacity = '0'; });

  // safety net: nothing stays invisible for more than 2.5s no matter what
  // (only touches elements Motion never got around to revealing)
  setTimeout(() => {
    revealables.forEach(el => { if (getComputedStyle(el).opacity === '0') el.style.opacity = ''; });
  }, 2500);

  // ---------- add to cart micro feedback ----------
  document.querySelectorAll('.add-btn, .add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      animate(btn, { scale: [1, .8, 1.12, 1] }, { duration: .45, easing: 'ease-out' });
      const badge = document.querySelector('.cart-count');
      if (badge) {
        badge.textContent = (parseInt(badge.textContent || '0', 10) + 1).toString();
        animate(badge, { scale: [1.5, 1] }, { duration: .35, easing: 'ease-out' });
      }
    });
  });

  // ---------- hero entrance (staggered, like Framer Motion's variants) ----------
  const hero = document.querySelector('.hero-content');
  if (hero) {
    const bits = [...hero.children];
    animate(bits, { opacity: [0, 1], y: [24, 0] }, { delay: stagger(.09), duration: .7, easing: [.16, 1, .3, 1] });
  }

  // ---------- standalone reveals ----------
  document.querySelectorAll('.fade-up').forEach(el => {
    inView(el, () => {
      animate(el, { opacity: [0, 1], y: [22, 0] }, { duration: .6, easing: [.16, 1, .3, 1] });
    }, { margin: '0px 0px -10% 0px' });
  });

  // ---------- staggered grids ----------
  document.querySelectorAll('.stagger').forEach(el => {
    inView(el, () => {
      animate(el.children, { opacity: [0, 1], y: [26, 0] }, { delay: stagger(.08), duration: .55, easing: [.16, 1, .3, 1] });
    }, { margin: '0px 0px -10% 0px' });
  });

  // ---------- masonry gallery: scale-in instead of rise ----------
  document.querySelectorAll('.stagger-scale').forEach(el => {
    inView(el, () => {
      animate(el.children, { opacity: [0, 1], scale: [.94, 1] }, { delay: stagger(.06), duration: .5, easing: [.16, 1, .3, 1] });
    }, { margin: '0px 0px -10% 0px' });
  });

  // ---------- card hover lift (pointer-fine only) ----------
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.product-card, .archive-card, .look-card, .mag-card').forEach(card => {
      card.addEventListener('mouseenter', () => animate(card, { y: -6 }, { duration: .25, easing: 'ease-out' }));
      card.addEventListener('mouseleave', () => animate(card, { y: 0 }, { duration: .25, easing: 'ease-out' }));
    });
  }
}
