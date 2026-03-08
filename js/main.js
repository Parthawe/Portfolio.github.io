/* ============================================
   Design Which Works — main.js
   Premium interactions
   ============================================ */
(function () {
  'use strict';

  /* ── Nav scroll state ── */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Tab system (home hero) ── */
  const ACCENTS = ['#fc5808', '#2d81c2'];
  let accentIdx = 0;

  const pills   = document.querySelectorAll('.tab-pill');
  const hls     = document.querySelectorAll('.hero-hl');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      // cycle accent
      accentIdx = (accentIdx + 1) % ACCENTS.length;
      document.documentElement.style.setProperty('--accent', ACCENTS[accentIdx]);

      // update pills
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // update headlines
      const target = pill.dataset.tab;
      hls.forEach(hl => {
        if (hl.dataset.content === target) {
          hl.classList.add('active');
        } else {
          hl.classList.remove('active');
        }
      });
    });
  });

  /* ── Tag / filter ── */
  document.querySelectorAll('.filters').forEach(filterBar => {
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        const grid   = filterBar.nextElementSibling;
        if (!grid) return;

        grid.querySelectorAll('.card').forEach(card => {
          if (filter === 'all') {
            card.style.display = '';
          } else {
            const tags = (card.dataset.tags || '').split(' ');
            card.style.display = tags.includes(filter) ? '' : 'none';
          }
        });
      });
    });
  });

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ── Active nav ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if ((a.getAttribute('href') || '').split('#')[0] === page) {
      a.classList.add('active');
    }
  });

  /* ── Hero headline min-height fix ── */
  // After active headline renders, set container min-height so no jump on tab switch
  const hlContainer = document.querySelector('.hero-headline');
  if (hlContainer) {
    const activeHl = hlContainer.querySelector('.hero-hl.active');
    if (activeHl) {
      // Let font load then measure
      requestAnimationFrame(() => {
        hlContainer.style.minHeight = activeHl.offsetHeight + 'px';
      });
    }
  }

})();
