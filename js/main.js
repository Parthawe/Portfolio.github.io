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
  // Each tab maps to its own accent color
  const TAB_ACCENTS = {
    anyone:    '#fc5808',
    recruiter: '#2d81c2',
    pm:        '#fc5808'
  };

  const pills = document.querySelectorAll('.tab-pill');
  const hls   = document.querySelectorAll('.hero-hl');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const target = pill.dataset.tab;

      // set accent for this tab
      const accent = TAB_ACCENTS[target] || '#fc5808';
      document.documentElement.style.setProperty('--accent', accent);

      // update active pill
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // swap headline
      hls.forEach(hl => {
        hl.classList.toggle('active', hl.dataset.content === target);
      });

      // update min-height
      const hlContainer = document.querySelector('.hero-headline');
      if (hlContainer) {
        const active = hlContainer.querySelector('.hero-hl.active');
        if (active) {
          requestAnimationFrame(() => {
            hlContainer.style.minHeight = active.offsetHeight + 'px';
          });
        }
      }
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
          const match = filter === 'all' || (card.dataset.tags || '').split(' ').includes(filter);
          // Animate hide/show
          if (match) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              card.style.opacity = '1';
              card.style.transform = '';
            });
          } else {
            card.style.transition = 'opacity 0.2s ease';
            card.style.opacity = '0';
            setTimeout(() => { card.style.display = 'none'; }, 200);
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
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ── Active nav link ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    if (href === page) a.classList.add('active');
  });

  /* ── Hero headline min-height ── */
  const hlContainer = document.querySelector('.hero-headline');
  if (hlContainer) {
    const activeHl = hlContainer.querySelector('.hero-hl.active');
    if (activeHl) {
      requestAnimationFrame(() => {
        hlContainer.style.minHeight = activeHl.offsetHeight + 'px';
      });
    }
  }

  /* ── Prefers-reduced-motion: disable animations ── */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach(el => el.classList.add('in'));
    document.querySelectorAll('.marquee-inner, .footer-marquee-inner').forEach(el => {
      el.style.animationPlayState = 'paused';
    });
  }

})();
