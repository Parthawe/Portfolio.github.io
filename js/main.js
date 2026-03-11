/* ============================================
   Design Which Works — main.js
   Custom cursor · text animations · magnetic
   buttons · scroll reveal · transitions
   ============================================ */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* ── Custom cursor ── */
  const cursorDot = document.querySelector('.cursor-dot');
  let cx = 0, cy = 0, tx = 0, ty = 0;

  if (cursorDot && !prefersReducedMotion && isFinePointer) {
    document.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      cursorDot.classList.add('visible');
    });
    (function followCursor() {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      cursorDot.style.left = cx + 'px';
      cursorDot.style.top = cy + 'px';
      requestAnimationFrame(followCursor);
    })();

    // Grow on interactive elements
    document.querySelectorAll('a:not(.wk), button, .card, .gallery-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
    });

    // Special "View" cursor on project items
    document.querySelectorAll('.wk').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('on-project');
        cursorDot.classList.remove('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('on-project');
      });
    });

    document.addEventListener('mouseleave', () => cursorDot.classList.remove('visible'));
  }

  /* ── Cursor-following image on works pages ── */
  const hoverImg = document.getElementById('wk-hover-img');
  const hoverImgEl = hoverImg ? hoverImg.querySelector('img') : null;

  if (hoverImg && hoverImgEl && isFinePointer && !prefersReducedMotion) {
    let imgX = 0, imgY = 0, imgTX = 0, imgTY = 0;

    document.querySelectorAll('.wk[data-img]').forEach(item => {
      item.addEventListener('mouseenter', () => {
        hoverImgEl.src = item.dataset.img;
        hoverImg.classList.add('active');
      });
      item.addEventListener('mouseleave', () => {
        hoverImg.classList.remove('active');
      });
      item.addEventListener('mousemove', (e) => {
        imgTX = e.clientX + 20;
        imgTY = e.clientY - 30;
      });
    });

    // Smooth follow for image
    (function followImg() {
      imgX += (imgTX - imgX) * 0.1;
      imgY += (imgTY - imgY) * 0.1;
      hoverImg.style.left = imgX + 'px';
      hoverImg.style.top = imgY + 'px';
      requestAnimationFrame(followImg);
    })();
  }

  /* ── Scroll progress bar ── */
  const scrollBar = document.querySelector('.scroll-progress');
  if (scrollBar) {
    const updateProgress = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0) scrollBar.style.width = (window.scrollY / h * 100) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ── Nav scroll state ── */
  const nav = document.getElementById('nav');
  if (nav) {
    const updateNav = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Mobile menu ── */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  if (navToggle && mobileOverlay) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('open');
      mobileOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Hero text character animation ── */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.hero-hl.active').forEach(hl => {
      const walker = document.createTreeWalker(hl, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);

      let charIdx = 0;
      textNodes.forEach(node => {
        const frag = document.createDocumentFragment();
        node.textContent.split('').forEach((char) => {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.animationDelay = (charIdx * 0.025) + 's';
          frag.appendChild(span);
          charIdx++;
        });
        node.parentNode.replaceChild(frag, node);
      });
    });
  }

  /* ── Tab system (home hero) with auto-cycling ── */
  const TAB_ACCENTS = { anyone: '#e84393', recruiter: '#e84393', pm: '#e84393' };
  const pills = document.querySelectorAll('.tab-pill');
  const hls = document.querySelectorAll('.hero-hl');
  const tabKeys = ['anyone', 'recruiter', 'pm'];
  let tabIndex = 0, tabTimer = null, tabPaused = false;

  function switchTab(target) {
    const accent = TAB_ACCENTS[target] || '#e84393';
    document.documentElement.style.setProperty('--accent', accent);
    pills.forEach(p => p.classList.remove('active', 'cycling'));
    const activePill = Array.from(pills).find(p => p.dataset.tab === target);
    if (activePill) {
      activePill.classList.add('active');
      if (!prefersReducedMotion) requestAnimationFrame(() => activePill.classList.add('cycling'));
    }
    hls.forEach(hl => hl.classList.toggle('active', hl.dataset.content === target));
    const hlContainer = document.querySelector('.hero-headline');
    if (hlContainer) {
      const active = hlContainer.querySelector('.hero-hl.active');
      if (active) requestAnimationFrame(() => { hlContainer.style.minHeight = active.offsetHeight + 'px'; });
    }
    tabIndex = tabKeys.indexOf(target);
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => { switchTab(pill.dataset.tab); resetAutoTab(); });
  });

  function autoTab() { if (tabPaused) return; tabIndex = (tabIndex + 1) % tabKeys.length; switchTab(tabKeys[tabIndex]); }
  function startAutoTab() { if (pills.length === 0 || prefersReducedMotion) return; stopAutoTab(); const c = document.querySelector('.tab-pill.active'); if (c) c.classList.add('cycling'); tabTimer = setInterval(autoTab, 5000); }
  function stopAutoTab() { if (tabTimer) { clearInterval(tabTimer); tabTimer = null; } }
  function resetAutoTab() { stopAutoTab(); startAutoTab(); }

  const heroTabs = document.querySelector('.hero-tabs');
  if (heroTabs) {
    heroTabs.addEventListener('mouseenter', () => { tabPaused = true; });
    heroTabs.addEventListener('mouseleave', () => { tabPaused = false; resetAutoTab(); });
  }
  startAutoTab();

  /* ── Tag / filter ── */
  document.querySelectorAll('.filters').forEach(filterBar => {
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        const grid = filterBar.nextElementSibling;
        if (!grid) return;
        grid.querySelectorAll('.card').forEach(card => {
          const match = filter === 'all' || (card.dataset.tags || '').split(' ').includes(filter);
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

  /* ── Scroll reveal with stagger ── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length && !prefersReducedMotion) {
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

  /* ── Works feed stagger reveal ── */
  const wkItems = document.querySelectorAll('.wk');
  if ('IntersectionObserver' in window && wkItems.length && !prefersReducedMotion) {
    const wkIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          wkIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    wkItems.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ${i * 0.08}s cubic-bezier(0,0,.3,1), transform 0.6s ${i * 0.08}s cubic-bezier(0,0,.3,1)`;
      wkIO.observe(el);
    });
  }

  /* ── Active nav link ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    if (href === page) a.classList.add('active');
  });

  /* ── Hero headline min-height ── */
  const hlContainer = document.querySelector('.hero-headline');
  if (hlContainer) {
    const activeHl = hlContainer.querySelector('.hero-hl.active');
    if (activeHl) requestAnimationFrame(() => { hlContainer.style.minHeight = activeHl.offsetHeight + 'px'; });
  }

  /* ── Card 3D tilt effect ── */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.card-img').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        card.style.transform = `perspective(600px) rotateX(${(y - 0.5) * -8}deg) rotateY(${(x - 0.5) * 8}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ── Magnetic buttons ── */
  if (!prefersReducedMotion && isFinePointer) {
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ── Page transition on link click ── */
  if (!prefersReducedMotion) {
    const transitionDiv = document.createElement('div');
    transitionDiv.className = 'page-transition';
    document.body.appendChild(transitionDiv);

    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http') || link.target === '_blank') return;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        transitionDiv.classList.add('entering');
        setTimeout(() => { window.location.href = href; }, 500);
      });
    });
  }

  /* ── Image lightbox (project gallery) ── */
  const lightbox = document.querySelector('.lightbox');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightbox && galleryItems.length) {
    const lbImg = lightbox.querySelector('img');
    const lbClose = lightbox.querySelector('.lightbox-close');
    const lbPrev = lightbox.querySelector('.lightbox-prev');
    const lbNext = lightbox.querySelector('.lightbox-next');
    const lbCounter = lightbox.querySelector('.lightbox-counter');
    let currentIdx = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img')?.src).filter(Boolean);

    function openLightbox(idx) {
      currentIdx = idx;
      if (lbImg) lbImg.src = images[idx];
      if (lbCounter) lbCounter.textContent = `${idx + 1} / ${images.length}`;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
    function navLightbox(dir) {
      currentIdx = (currentIdx + dir + images.length) % images.length;
      if (lbImg) lbImg.src = images[currentIdx];
      if (lbCounter) lbCounter.textContent = `${currentIdx + 1} / ${images.length}`;
    }

    galleryItems.forEach((item, i) => { item.addEventListener('click', () => openLightbox(i)); });
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', (e) => { e.stopPropagation(); navLightbox(-1); });
    if (lbNext) lbNext.addEventListener('click', (e) => { e.stopPropagation(); navLightbox(1); });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navLightbox(-1);
      if (e.key === 'ArrowRight') navLightbox(1);
    });
  }

  /* ── Works category grid — images emerge from behind hovered folder ── */
  const wcatContainer = document.getElementById('wcat-images');
  const wcatItems = document.querySelectorAll('.wcat-item');

  if (wcatContainer && wcatItems.length && !prefersReducedMotion) {
    const fans = [
      { xOff: 0.05, yOff: -0.08, rotate: -5, z: 51 },
      { xOff: 0.18, yOff: -0.18, rotate: 4,  z: 52 },
      { xOff: 0.08, yOff: -0.30, rotate: -3, z: 53 },
      { xOff: 0.22, yOff: -0.25, rotate: 6,  z: 54 },
    ];

    wcatItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const images = (item.dataset.images || '').split(',').filter(Boolean);
        wcatContainer.innerHTML = '';

        const rect = item.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const isOdd = [...wcatItems].indexOf(item) % 2 === 0;
        const gapStartX = isOdd ? rect.right : rect.left;
        const gapDir = isOdd ? 1 : -1;
        const anchorY = rect.top + rect.height * 0.5;

        images.forEach((src, i) => {
          if (i >= fans.length) return;
          const img = document.createElement('img');
          img.className = 'scatter-img';
          img.src = src.trim();
          img.alt = '';
          const fan = fans[i];
          const finalX = gapStartX + (vw * fan.xOff * gapDir);
          const finalY = anchorY + (vh * fan.yOff);
          const clampedX = Math.max(20, Math.min(finalX, vw - 240));
          const clampedY = Math.max(20, Math.min(finalY, vh - 200));
          img.style.left = clampedX + 'px';
          img.style.top = clampedY + 'px';
          img.style.zIndex = fan.z;
          img.style.setProperty('--rot', fan.rotate + 'deg');
          const riseDistance = Math.abs(anchorY - clampedY) + rect.height * 0.3;
          img.style.setProperty('--rise', riseDistance + 'px');
          wcatContainer.appendChild(img);
        });

        requestAnimationFrame(() => {
          wcatContainer.classList.add('active');
        });
      });

      item.addEventListener('mouseleave', () => {
        wcatContainer.classList.remove('active');
        setTimeout(() => {
          if (!wcatContainer.classList.contains('active')) {
            wcatContainer.innerHTML = '';
          }
        }, 400);
      });
    });
  }

  /* ── 3D Parallax on hero card stack (mouse + scroll) ── */
  if (!prefersReducedMotion && isFinePointer) {
    const heroCards = document.querySelectorAll('.hero-card');
    let pmx = 0, pmy = 0;

    if (heroCards.length) {
      let targetMX = 0, targetMY = 0;

      document.addEventListener('mousemove', (e) => {
        targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      // Base 3D rotations per card (rz = Z rotation, rx/ry = 3D tilt, ty = Y offset)
      var cardBases = [
        { rz: 0,  rx: 0,    ry: 0,    ty: 0 },   // card--1 front
        { rz: 5,  rx: 0.1,  ry: 0,    ty: 3 },   // card--2
        { rz: -4, rx: -0.1, ry: 0.05, ty: 5 },   // card--3
        { rz: 8,  rx: 0.15, ry: -0.1, ty: 7 },   // card--4
        { rz: -7, rx: -0.1, ry: 0.1,  ty: 9 }    // card--5 back
      ];

      function updateParallax() {
        pmx += (targetMX - pmx) * 0.035;
        pmy += (targetMY - pmy) * 0.035;

        heroCards.forEach(function (card, i) {
          var b = cardBases[i] || cardBases[0];
          var depth = (i + 1) * 0.5;
          // 3D rotation influenced by mouse
          var rz = b.rz + pmx * depth * 1.5;
          var rx3d = (b.rx + pmy * depth * 0.08).toFixed(3);
          var ry3d = (b.ry + pmx * depth * 0.12).toFixed(3);
          var tx = pmx * depth * 10;
          var ty = b.ty + pmy * depth * 5;
          card.style.transform = 'translate(-50%, -50%) rotate3d(' + rx3d + ', ' + ry3d + ', 1, ' + rz.toFixed(2) + 'deg) translate(' + tx.toFixed(1) + 'px, ' + ty.toFixed(1) + 'px)';
        });

        requestAnimationFrame(updateParallax);
      }
      updateParallax();
    }

    /* ── Scroll-driven parallax for hero elements ── */
    const heroBody = document.querySelector('.hero-body');
    const heroFoot = document.querySelector('.hero-foot');
    const topPill = document.querySelector('.top-pill');

    if (heroBody) {
      window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        const heroH = document.querySelector('.hero')?.offsetHeight || 1;
        const progress = Math.min(sy / heroH, 1);

        // Subtle parallax on hero content
        heroBody.style.transform = `translateY(${sy * 0.06}px)`;
        heroBody.style.opacity = 1 - progress * 0.8;

        if (heroFoot) {
          heroFoot.style.transform = `translateY(${sy * 0.03}px)`;
        }
        if (topPill) {
          topPill.style.transform = `translateY(${sy * 0.1}px)`;
          topPill.style.opacity = 1 - progress * 1.2;
        }
      }, { passive: true });
    }
  }

  /* ── Smooth number counter for impact stats ── */
  const impactNumbers = document.querySelectorAll('.impact-n');
  if (impactNumbers.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const text = el.textContent.trim();
          const match = text.match(/^([\d,]+)/);
          if (match) {
            const target = parseInt(match[1].replace(/,/g, ''));
            if (target > 0 && target < 100000) {
              let current = 0;
              const duration = 1500;
              const start = performance.now();
              const suffix = text.replace(match[1], '');
              function animate(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                current = Math.round(target * eased);
                el.textContent = current.toLocaleString() + suffix;
                if (progress < 1) requestAnimationFrame(animate);
              }
              requestAnimationFrame(animate);
            }
          }
          countIO.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    impactNumbers.forEach(el => countIO.observe(el));
  }

  /* ── Experience row stagger reveal ── */
  const expRows = document.querySelectorAll('.exp-row.reveal');
  if ('IntersectionObserver' in window && expRows.length && !prefersReducedMotion) {
    const expIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          // Stagger sibling rows
          const parent = e.target.closest('.exp-table');
          if (parent) {
            const rows = parent.querySelectorAll('.exp-row.reveal:not(.in)');
            rows.forEach((row, i) => {
              setTimeout(() => row.classList.add('in'), i * 80);
            });
          } else {
            e.target.classList.add('in');
          }
          expIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
    // Only observe the first row in each table to trigger group stagger
    document.querySelectorAll('.exp-table').forEach(table => {
      const first = table.querySelector('.exp-row.reveal');
      if (first) expIO.observe(first);
    });
  }

  /* ── Recognition row stagger reveal ── */
  const recogRows = document.querySelectorAll('.recog-row');
  if ('IntersectionObserver' in window && recogRows.length && !prefersReducedMotion) {
    const recogIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          recogRows.forEach((row, i) => {
            row.style.opacity = '0';
            row.style.transform = 'translateY(12px)';
            row.style.transition = `opacity 0.5s ${i * 0.06}s cubic-bezier(0,0,.3,1), transform 0.5s ${i * 0.06}s cubic-bezier(0,0,.3,1)`;
            requestAnimationFrame(() => {
              row.style.opacity = '1';
              row.style.transform = 'translateY(0)';
            });
          });
          recogIO.disconnect();
        }
      });
    }, { threshold: 0.1 });
    const recogList = document.querySelector('.recog-list');
    if (recogList) recogIO.observe(recogList);
  }

  /* ── Footer logo — smooth scroll to top ── */
  const footerLogo = document.querySelector('.footer-logo');
  if (footerLogo) {
    footerLogo.style.cursor = 'pointer';
    footerLogo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Section headings — scale on scroll ── */
  if (!prefersReducedMotion) {
    const secHeads = document.querySelectorAll('.sec-head');
    if ('IntersectionObserver' in window && secHeads.length) {
      const headIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const label = e.target.querySelector('.sec-label');
            if (label) {
              label.style.opacity = '0';
              label.style.transform = 'translateX(-12px)';
              label.style.transition = 'opacity 0.6s cubic-bezier(0,0,.3,1), transform 0.6s cubic-bezier(0,0,.3,1)';
              requestAnimationFrame(() => {
                label.style.opacity = '1';
                label.style.transform = 'translateX(0)';
              });
            }
            headIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });
      secHeads.forEach(h => headIO.observe(h));
    }
  }

  /* ── Proof chips — hover stagger effect ── */
  const proofChips = document.querySelectorAll('.proof-chip');
  if (proofChips.length && !prefersReducedMotion) {
    proofChips.forEach(chip => {
      chip.addEventListener('mouseenter', () => {
        chip.style.transform = 'translateY(-2px) scale(1.05)';
      });
      chip.addEventListener('mouseleave', () => {
        chip.style.transform = '';
      });
    });
  }

  /* ── About photo — tilt on hover (desktop) ── */
  if (!prefersReducedMotion && isFinePointer) {
    const aboutPhoto = document.querySelector('.about-photo');
    if (aboutPhoto) {
      aboutPhoto.addEventListener('mousemove', (e) => {
        const rect = aboutPhoto.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        aboutPhoto.style.transform = `perspective(400px) rotateY(${(x - 0.5) * 6}deg) rotateX(${(y - 0.5) * -4}deg) translateY(-4px)`;
      });
      aboutPhoto.addEventListener('mouseleave', () => {
        aboutPhoto.style.transform = '';
      });
    }
  }

  /* ── Keyboard navigation — visible focus outlines ── */
  let usingKeyboard = false;
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      usingKeyboard = true;
      document.body.classList.add('keyboard-nav');
    }
  });
  document.addEventListener('mousedown', () => {
    usingKeyboard = false;
    document.body.classList.remove('keyboard-nav');
  });

})();

/* ============================================
   Awwwards-level Interactions — Part 2
   Text splits · parallax · cursor trail ·
   magnetic gradients · scroll reveals
   ============================================ */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* ── 1. Text Split Animations — word-by-word reveal on scroll ── */
  if (!prefersReducedMotion) {
    const splitSelectors = '.cs-section-title, .about-headline, .cta-headline, .proj-title';
    document.querySelectorAll(splitSelectors).forEach(el => {
      // Skip if already processed or empty
      if (el.dataset.split || !el.textContent.trim()) return;
      el.dataset.split = 'true';

      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map((word, i) =>
        '<span class="split-word"><span class="split-word-inner" style="transition-delay:' + (i * 0.045) + 's">' + word + '</span></span>'
      ).join(' ');
      el.classList.add('split-ready');
    });

    // Observe split-ready elements
    const splitEls = document.querySelectorAll('.split-ready');
    if (splitEls.length && 'IntersectionObserver' in window) {
      const splitIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('split-visible');
            splitIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
      splitEls.forEach(el => splitIO.observe(el));
    }
  }

  /* ── 2. Parallax Images on Scroll ── */
  if (!prefersReducedMotion) {
    const parallaxImages = document.querySelectorAll('.parallax-img img, .cs-img-full img, .proj-hero-img img');
    if (parallaxImages.length) {
      let ticking = false;

      function updateParallaxImages() {
        parallaxImages.forEach(img => {
          const parent = img.closest('.parallax-img') || img.closest('.cs-img-full') || img.closest('.proj-hero-img');
          if (!parent) return;
          const rect = parent.getBoundingClientRect();
          // Only process if in viewport
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;
          const scrollProgress = (rect.top + rect.height) / (window.innerHeight + rect.height);
          const translate = (scrollProgress - 0.5) * -30;
          img.style.transform = 'scale(1.08) translateY(' + translate + 'px)';
        });
        ticking = false;
      }

      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(updateParallaxImages);
          ticking = true;
        }
      }, { passive: true });

      // Initial call
      updateParallaxImages();
    }
  }

  /* ── 3. Enhanced Cursor Trail ── */
  if (!prefersReducedMotion && isFinePointer) {
    const TRAIL_COUNT = 5;
    const trails = [];
    let mouseX = 0, mouseY = 0;

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail';
      dot.style.opacity = String((1 - i / TRAIL_COUNT) * 0.25);
      dot.style.width = dot.style.height = (6 - i * 0.8) + 'px';
      document.body.appendChild(dot);
      trails.push({ el: dot, x: 0, y: 0 });
    }

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animate trail — each dot follows the previous with delay
    function animateTrail() {
      let leaderX = mouseX;
      let leaderY = mouseY;

      trails.forEach((trail, i) => {
        const ease = 0.12 - (i * 0.015);
        trail.x += (leaderX - trail.x) * Math.max(ease, 0.02);
        trail.y += (leaderY - trail.y) * Math.max(ease, 0.02);
        trail.el.style.transform = 'translate3d(' + trail.x + 'px, ' + trail.y + 'px, 0)';
        // Each subsequent dot follows the one before it
        leaderX = trail.x;
        leaderY = trail.y;
      });

      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Hide trail when mouse leaves window
    document.addEventListener('mouseleave', () => {
      trails.forEach(t => t.el.style.opacity = '0');
    });
    document.addEventListener('mouseenter', () => {
      trails.forEach((t, i) => t.el.style.opacity = String((1 - i / TRAIL_COUNT) * 0.25));
    });
  }

  /* ── 4. Scroll-triggered text gradient reveal ── */
  if (!prefersReducedMotion) {
    const gradientEls = document.querySelectorAll('.text-gradient-reveal');
    if (gradientEls.length) {
      let gradTicking = false;

      function updateGradientReveal() {
        gradientEls.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;
          const progress = Math.max(0, Math.min(1,
            1 - (rect.top / (window.innerHeight * 0.7))
          ));
          el.style.backgroundSize = '200% 100%';
          el.style.backgroundPosition = ((1 - progress) * 100) + '% 0';
        });
        gradTicking = false;
      }

      window.addEventListener('scroll', () => {
        if (!gradTicking) {
          requestAnimationFrame(updateGradientReveal);
          gradTicking = true;
        }
      }, { passive: true });

      updateGradientReveal();
    }
  }

  /* ── 5. Magnetic buttons with radial gradient ── */
  if (!prefersReducedMotion && isFinePointer) {
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width * 100);
        const my = ((e.clientY - rect.top) / rect.height * 100);
        btn.style.setProperty('--mx', mx + '%');
        btn.style.setProperty('--my', my + '%');
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--mx', '50%');
        btn.style.setProperty('--my', '50%');
      });
    });
  }

  /* ── 6. Stagger Grid Reveal ── */
  if (!prefersReducedMotion) {
    const staggerGrids = document.querySelectorAll('.stagger-grid, .cs-feature-grid, .cs-steps, .cs-info-grid');
    if (staggerGrids.length && 'IntersectionObserver' in window) {
      const gridIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('grid-in-view');
            gridIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      staggerGrids.forEach(g => gridIO.observe(g));
    }
  }

  /* ── 7. Image Reveal on Scroll (clip-path wipe) ── */
  if (!prefersReducedMotion) {
    const imgRevealEls = document.querySelectorAll('.cs-img-full, .proj-hero-img, .gallery-item');
    imgRevealEls.forEach(el => {
      if (!el.classList.contains('img-reveal')) {
        el.classList.add('img-reveal');
      }
    });

    const imgReveals = document.querySelectorAll('.img-reveal');
    if (imgReveals.length && 'IntersectionObserver' in window) {
      const imgIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('img-revealed');
            imgIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
      imgReveals.forEach(el => imgIO.observe(el));
    }
  }

  /* ── 8. Scroll Velocity-based Nav Effects ── */
  if (!prefersReducedMotion) {
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let velTicking = false;
    const navEl = document.getElementById('nav');

    function updateScrollVelocity() {
      const currentY = window.scrollY;
      scrollVelocity = Math.abs(currentY - lastScrollY);
      lastScrollY = currentY;

      if (navEl) {
        // Increase nav backdrop blur intensity when scrolling fast
        const blurAmount = Math.min(20, 8 + scrollVelocity * 0.3);
        const bgOpacity = Math.min(0.95, 0.8 + scrollVelocity * 0.005);
        navEl.style.backdropFilter = 'blur(' + blurAmount + 'px)';
        navEl.style.webkitBackdropFilter = 'blur(' + blurAmount + 'px)';
      }

      // Subtle scale effect on scroll velocity for hero headline
      const heroHl = document.querySelector('.hero-hl.active');
      if (heroHl && window.scrollY < 600) {
        const scaleShift = Math.min(scrollVelocity * 0.0003, 0.01);
        heroHl.style.transform = 'scale(' + (1 + scaleShift) + ')';
      }

      velTicking = false;
    }

    window.addEventListener('scroll', () => {
      if (!velTicking) {
        requestAnimationFrame(updateScrollVelocity);
        velTicking = true;
      }
    }, { passive: true });
  }

  /* ── 9. Enhanced Number Counter (comma-formatted, ease-out-expo) ── */
  // This supplements the existing counter — targets stat-n elements not covered
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const statNumbers = document.querySelectorAll('.stat-n:not(.impact-n)');
    if (statNumbers.length) {
      const statIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target;
            const text = el.textContent.trim();
            const match = text.match(/^([\d,]+)/);
            if (match) {
              const target = parseInt(match[1].replace(/,/g, ''), 10);
              if (target > 0 && target < 1000000) {
                let current = 0;
                const duration = 2000;
                const start = performance.now();
                const suffix = text.replace(match[1], '');

                function animateStat(now) {
                  const elapsed = now - start;
                  const progress = Math.min(elapsed / duration, 1);
                  // Ease-out exponential for a snappier feel
                  const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                  current = Math.round(target * eased);
                  el.textContent = current.toLocaleString() + suffix;
                  if (progress < 1) requestAnimationFrame(animateStat);
                }
                requestAnimationFrame(animateStat);
              }
            }
            statIO.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      statNumbers.forEach(el => statIO.observe(el));
    }
  }

  /* ── 10. Section Entry Animations (cs-section) ── */
  if (!prefersReducedMotion) {
    const csSections = document.querySelectorAll('.cs-section');
    if (csSections.length && 'IntersectionObserver' in window) {
      // Set initial state
      csSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.7s cubic-bezier(0,0,.3,1), transform 0.7s cubic-bezier(0,0,.3,1)';
      });

      const sectionIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            sectionIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });
      csSections.forEach(s => sectionIO.observe(s));
    }
  }

  /* ── 11. Horizontal line draw on scroll ── */
  if (!prefersReducedMotion) {
    const hrLines = document.querySelectorAll('.cs-section hr, .about-body hr, .exp-table + hr');
    if (hrLines.length && 'IntersectionObserver' in window) {
      hrLines.forEach(hr => {
        hr.classList.add('hr-draw');
      });

      const hrIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('hr-drawn');
            hrIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });
      hrLines.forEach(hr => hrIO.observe(hr));
    }
  }

  /* ── 12. Hover ripple on cards ── */
  if (!prefersReducedMotion && isFinePointer) {
    document.querySelectorAll('.card, .wk').forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't add ripple if link is being handled by page transition
        const ripple = document.createElement('span');
        ripple.className = 'click-ripple';
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        card.style.position = card.style.position || 'relative';
        card.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  /* ── 13. Scroll-driven progress indicator per section ── */
  if (!prefersReducedMotion) {
    const progressSections = document.querySelectorAll('[data-progress]');
    if (progressSections.length) {
      let progTicking = false;

      function updateSectionProgress() {
        progressSections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1,
            (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
          ));
          section.style.setProperty('--progress', String(progress));
        });
        progTicking = false;
      }

      window.addEventListener('scroll', () => {
        if (!progTicking) {
          requestAnimationFrame(updateSectionProgress);
          progTicking = true;
        }
      }, { passive: true });

      updateSectionProgress();
    }
  }

})();


/* ============================================
   Premium Interactions — Part 3
   Lenis · Page transitions · Hero intro ·
   Card 3D tilt · Hero scroll fade
   ============================================ */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* ── 1. Lenis Smooth Scroll ── */
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Expose lenis for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -80 });
        }
      });
    });
  }

  /* ── 2. Page Transition System ── */
  (function initPageTransitions() {
    if (prefersReducedMotion) return;

    var overlay = document.querySelector('.page-transition-overlay');
    if (!overlay) return;

    // CSS handles the initial reveal animation (ptLeave with 0.2s delay)
    // JS only manages link-click transitions
    overlay.addEventListener('animationend', function () {
      overlay.style.animation = 'none';
      overlay.style.transform = 'scaleY(0)';
    }, { once: true });

    // Intercept internal navigation
    document.querySelectorAll('a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      // Skip external links, anchors, mailto, tel
      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') return;

      link.addEventListener('click', function (e) {
        e.preventDefault();
        var destination = href;

        // Reset and play entering animation
        overlay.style.animation = 'none';
        overlay.style.transform = 'scaleY(0)';
        overlay.style.transformOrigin = 'bottom';

        // Force reflow
        void overlay.offsetHeight;

        overlay.classList.add('entering');

        overlay.addEventListener('animationend', function () {
          window.location.href = destination;
        }, { once: true });
      });
    });
  })();

  /* ── 3. Hero Intro Animation (staggered on load) ── */
  if (!prefersReducedMotion) {
    window.addEventListener('load', function () {
      const hero = document.querySelector('.hero');
      if (!hero) return;

      // Elements to stagger in
      const introEls = [
        hero.querySelector('.top-pill'),
        hero.querySelector('.hero-meta--tl'),
        hero.querySelector('.hero-meta--tr'),
        hero.querySelector('.hero-label'),
        hero.querySelector('.hero-tabs'),
        hero.querySelector('.hero-headline'),
        hero.querySelector('.hero-sub'),
        hero.querySelector('.hero-ctas'),
        hero.querySelector('.hero-stats'),
        hero.querySelector('.hero-scroll-hint')
      ].filter(Boolean);

      // Set initial hidden state
      introEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'none';
      });

      // Hero card stack — stagger each card individually
      const heroCardStack = hero.querySelector('.hero-card-stack');
      const heroCardEls = hero.querySelectorAll('.hero-card');
      if (heroCardStack) {
        heroCardStack.style.opacity = '1'; // stack itself is visible
      }
      heroCardEls.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translate(-50%, -50%) scale(0.8) rotate(0deg)';
        card.style.transition = 'none';
      });

      // Stagger reveal after a brief delay
      requestAnimationFrame(function () {
        setTimeout(function () {
          introEls.forEach(function (el, i) {
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.transitionDelay = (0.15 + i * 0.08) + 's';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          });

          // Cards fan in one by one from back to front
          var cardDelays = [0.3, 0.42, 0.54, 0.66, 0.78]; // staggered
          heroCardEls.forEach(function (card, i) {
            // Reverse order — back cards first
            var idx = heroCardEls.length - 1 - i;
            card.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.transitionDelay = cardDelays[idx] + 's';
            card.style.opacity = '1';
            card.style.transform = ''; // clear inline, let CSS animation take over
          });
        }, 50);
      });
    });

    /* Project page intro */
    window.addEventListener('load', function () {
      var projHeader = document.querySelector('.project-header');
      if (!projHeader) return;

      var projEls = [
        projHeader.querySelector('.proj-back'),
        projHeader.querySelector('.proj-tags'),
        projHeader.querySelector('.proj-title'),
        projHeader.querySelector('.proj-subtitle'),
        projHeader.querySelector('.proj-info-row'),
        projHeader.querySelector('.proj-hero-img')
      ].filter(Boolean);

      projEls.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'none';
      });

      requestAnimationFrame(function () {
        setTimeout(function () {
          projEls.forEach(function (el, i) {
            el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.transitionDelay = (0.2 + i * 0.1) + 's';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          });
        }, 50);
      });
    });

    /* About page intro */
    window.addEventListener('load', function () {
      var aboutHero = document.querySelector('.about-hero');
      if (!aboutHero) return;

      var aboutEls = [
        aboutHero.querySelector('.about-label'),
        aboutHero.querySelector('.about-headline'),
        aboutHero.querySelector('.about-sub')
      ].filter(Boolean);

      aboutEls.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'none';
      });

      requestAnimationFrame(function () {
        setTimeout(function () {
          aboutEls.forEach(function (el, i) {
            el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.transitionDelay = (0.2 + i * 0.1) + 's';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          });
        }, 50);
      });
    });

    /* Works/Archive page intro */
    window.addEventListener('load', function () {
      var worksHeader = document.querySelector('.works-header') || document.querySelector('.wcat-header');
      if (!worksHeader) return;

      worksHeader.style.opacity = '0';
      worksHeader.style.transform = 'translateY(20px)';
      worksHeader.style.transition = 'none';

      requestAnimationFrame(function () {
        setTimeout(function () {
          worksHeader.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
          worksHeader.style.transitionDelay = '0.25s';
          worksHeader.style.opacity = '1';
          worksHeader.style.transform = 'translateY(0)';
        }, 50);
      });
    });
  }

  /* ── 4. Card 3D Tilt on Hover ── */
  if (!prefersReducedMotion && isFinePointer) {
    document.querySelectorAll('.card-tilt').forEach(card => {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (y - 0.5) * -8; // tilt X axis
        const ry = (x - 0.5) * 8;  // tilt Y axis
        card.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }

  /* ── 5. Hero Scroll Fade + Parallax ── */
  if (!prefersReducedMotion) {
    const hero = document.querySelector('.hero');
    if (hero) {
      const heroBody = hero.querySelector('.hero-body');
      const heroFoot = hero.querySelector('.hero-foot');
      const heroCardStack = hero.querySelector('.hero-card-stack');
      let heroTicking = false;

      function updateHeroScroll() {
        const scrollY = window.scrollY;
        const heroH = hero.offsetHeight;
        if (scrollY > heroH) { heroTicking = false; return; }

        const progress = scrollY / heroH; // 0 at top, 1 at hero bottom
        const opacity = Math.max(0, 1 - progress * 1.8);
        const translate = scrollY * 0.3;
        const scale = 1 - progress * 0.05;

        if (heroBody) {
          heroBody.style.opacity = String(opacity);
          heroBody.style.transform = 'translateY(' + translate + 'px) scale(' + scale + ')';
        }
        if (heroFoot) {
          heroFoot.style.opacity = String(Math.max(0, 1 - progress * 2.2));
          heroFoot.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
        }
        if (heroCardStack) {
          var rot = progress * 5; // subtle tilt as you scroll
          heroCardStack.style.transform = 'translateY(calc(-50% + ' + (scrollY * 0.15) + 'px)) perspective(1200px) rotateX(' + rot + 'deg) scale(' + (1 - progress * 0.08) + ')';
          heroCardStack.style.opacity = String(Math.max(0, 1 - progress * 1.5));
        }

        heroTicking = false;
      }

      window.addEventListener('scroll', function () {
        if (!heroTicking) {
          requestAnimationFrame(updateHeroScroll);
          heroTicking = true;
        }
      }, { passive: true });
    }
  }

  /* ── 6. Fade-in utility observer (fade-up, fade-left, fade-scale etc.) ── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const fadeEls = document.querySelectorAll('.fade-up, .fade-down, .fade-left, .fade-right, .fade-scale');
    if (fadeEls.length) {
      const fadeIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            fadeIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      fadeEls.forEach(function (el) { fadeIO.observe(el); });
    }
  }

  /* ── 7. Image clip-path reveal observer ── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const clipEls = document.querySelectorAll('.img-clip-reveal, .img-reveal-up, .img-reveal-diagonal, .img-reveal-zoom');
    if (clipEls.length) {
      const clipIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            clipIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      clipEls.forEach(function (el) { clipIO.observe(el); });
    }
  }

  /* ── 8. Cursor glow (large ambient light following cursor) ── */
  if (!prefersReducedMotion && isFinePointer) {
    const glow = document.querySelector('.cursor-glow');
    if (glow) {
      let glowX = 0, glowY = 0, glowTX = 0, glowTY = 0;

      document.addEventListener('mousemove', function (e) {
        glowTX = e.clientX;
        glowTY = e.clientY;
      });

      (function followGlow() {
        glowX += (glowTX - glowX) * 0.08;
        glowY += (glowTY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(followGlow);
      })();
    }
  }

  /* ── 9. Case-study TOC scroll spy ── */
  var csToc = document.getElementById('cs-toc');
  if (csToc) {
    var tocLinks = csToc.querySelectorAll('.cs-toc-link');
    var sections = [];
    tocLinks.forEach(function (link) {
      var id = link.getAttribute('href').replace('#', '');
      var sec = document.getElementById(id);
      if (sec) sections.push({ el: sec, link: link });
    });

    /* Show/hide TOC based on scroll depth */
    var projectHeader = document.querySelector('.project-header');
    var ctaSection = document.querySelector('.cta-section, .cta-dark');
    var tocVisible = false;

    function updateTocVisibility() {
      if (!projectHeader) return;
      var headerBottom = projectHeader.getBoundingClientRect().bottom;
      var ctaTop = ctaSection ? ctaSection.getBoundingClientRect().top : Infinity;
      var shouldShow = headerBottom < 0 && ctaTop > window.innerHeight * 0.5;

      if (shouldShow && !tocVisible) {
        csToc.classList.add('toc-visible');
        tocVisible = true;
      } else if (!shouldShow && tocVisible) {
        csToc.classList.remove('toc-visible');
        tocVisible = false;
      }
    }

    /* Highlight active section */
    function updateActiveLink() {
      var current = null;
      var scrollMid = window.innerHeight * 0.35;

      for (var i = sections.length - 1; i >= 0; i--) {
        var rect = sections[i].el.getBoundingClientRect();
        if (rect.top <= scrollMid) {
          current = sections[i];
          break;
        }
      }

      tocLinks.forEach(function (l) { l.classList.remove('active'); });
      if (current) current.link.classList.add('active');
    }

    /* Detect dark sections for TOC color inversion */
    function updateTocDarkMode() {
      var darkSections = document.querySelectorAll('.cs-section--dark, .cs-section--blue, .color-chapter--dark');
      var tocMid = window.innerHeight * 0.5;
      var inDark = false;

      darkSections.forEach(function (sec) {
        var rect = sec.getBoundingClientRect();
        if (rect.top < tocMid && rect.bottom > tocMid) inDark = true;
      });

      if (inDark) {
        csToc.classList.add('toc-dark');
      } else {
        csToc.classList.remove('toc-dark');
      }
    }

    /* Smooth scroll on TOC link click */
    tocLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var id = this.getAttribute('href').replace('#', '');
        var target = document.getElementById(id);
        if (target) {
          var offset = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });

    /* Throttled scroll handler */
    var tocTicking = false;
    window.addEventListener('scroll', function () {
      if (!tocTicking) {
        requestAnimationFrame(function () {
          updateTocVisibility();
          updateActiveLink();
          updateTocDarkMode();
          tocTicking = false;
        });
        tocTicking = true;
      }
    }, { passive: true });

    /* Initial check */
    updateTocVisibility();
    updateActiveLink();
  }

  /* ── 10. Image fade-in on load ── */
  document.querySelectorAll('.card-img img, .cs-img img, .cs-img-full img, .proj-hero-img img').forEach(function (img) {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function () {
        this.classList.add('loaded');
      });
    }
  });

})();
