/* ============================================
   Parth Pawar — Portfolio
   JS: nav, mobile menu, scroll reveal, stagger,
   TOC, counters, reading progress, theme toggle,
   page transitions, image parallax, card tilt,
   cursor glow, back-to-top, footer reveal,
   reading time, focus trap, a11y
   ============================================ */

(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 768px)').matches;

  // ── Theme toggle ──
  function createToggleBtn(extraClass) {
    var btn = document.createElement('button');
    btn.className = 'theme-toggle' + (extraClass ? ' ' + extraClass : '');
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.innerHTML =
      '<svg class="theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' +
      '</svg>' +
      '<svg class="theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="12" cy="12" r="5"/>' +
        '<line x1="12" y1="1" x2="12" y2="3"/>' +
        '<line x1="12" y1="21" x2="12" y2="23"/>' +
        '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>' +
        '<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>' +
        '<line x1="1" y1="12" x2="3" y2="12"/>' +
        '<line x1="21" y1="12" x2="23" y2="12"/>' +
        '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>' +
        '<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>' +
      '</svg>';
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
    return btn;
  }

  // Inject into desktop nav
  var navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    var li = document.createElement('li');
    li.appendChild(createToggleBtn());
    navLinks.appendChild(li);
  }

  // Inject mobile-visible toggle before hamburger
  var navInner = document.querySelector('.nav-inner');
  var navToggleBtn = document.querySelector('.nav-toggle');
  if (navInner && navToggleBtn) {
    navInner.insertBefore(createToggleBtn('theme-toggle--mobile'), navToggleBtn);
  }

  // ── Cycling hero label ──
  var heroLabel = document.querySelector('.hero-label');
  if (heroLabel) {
    var labels = [
      'Product Designer, New York',
      'Head of UI/UX, Mentra',
      'Creative Technologist, NYU ITP',
      'Building AI-Native Tools'
    ];
    var labelIdx = 0;
    var labelInterval = setInterval(function () {
      labelIdx = (labelIdx + 1) % labels.length;
      heroLabel.style.opacity = '0';
      setTimeout(function () {
        heroLabel.textContent = labels[labelIdx];
        heroLabel.style.opacity = '1';
      }, 300);
    }, 3000);
    window.addEventListener('beforeunload', function () { clearInterval(labelInterval); });
  }

  // ── Hero 3D card parallax (with RAF optimization) ──
  var heroCards = document.getElementById('hero-cards');
  if (heroCards && !prefersReduced) {
    var targetX = 0, targetY = 0;
    var currentX = 0, currentY = 0;
    var time = 0;
    var heroRafId = null;
    var heroVisible = true;

    if (!isMobile) {
      document.addEventListener('mousemove', function (e) {
        targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      });
    }

    function animateCards() {
      time += 0.01;
      if (isMobile) {
        var fx = Math.sin(time * 0.8) * 3;
        var fy = Math.cos(time * 0.6) * 2;
        heroCards.style.transform = 'rotateY(' + fx + 'deg) rotateX(' + fy + 'deg)';
      } else {
        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;
        var idleX = Math.sin(time * 0.5) * 0.02;
        var idleY = Math.cos(time * 0.4) * 0.02;
        var rx = (currentX + idleX) * 20;
        var ry = -(currentY + idleY) * 16;
        heroCards.style.transform = 'rotateY(' + rx + 'deg) rotateX(' + ry + 'deg)';
      }
      if (heroVisible) {
        heroRafId = requestAnimationFrame(animateCards);
      }
    }

    // Observe hero visibility — stop RAF when off-screen
    var heroScene = document.getElementById('hero-scene');
    if (heroScene) {
      var heroObs = new IntersectionObserver(function (entries) {
        heroVisible = entries[0].isIntersecting;
        if (heroVisible && !heroRafId) {
          heroRafId = requestAnimationFrame(animateCards);
        } else if (!heroVisible && heroRafId) {
          cancelAnimationFrame(heroRafId);
          heroRafId = null;
        }
      }, { threshold: 0 });
      heroObs.observe(heroScene);

      // Start animation
      heroRafId = requestAnimationFrame(animateCards);

      // Fade out cards on scroll
      window.addEventListener('scroll', function () {
        var scrolled = window.scrollY;
        var heroH = heroScene.offsetTop + heroScene.offsetHeight;
        if (scrolled < heroH) {
          var opacity = 1 - (scrolled / heroH) * 0.6;
          heroScene.style.opacity = Math.max(0.4, opacity);
        }
      }, { passive: true });
    } else {
      heroRafId = requestAnimationFrame(animateCards);
    }

    // ── Cursor glow on hero ──
    if (!isMobile) {
      var heroEl = document.getElementById('hero');
      if (heroEl) {
        var glowEl = document.createElement('div');
        glowEl.className = 'hero-glow-cursor';
        heroEl.style.position = 'relative';
        heroEl.appendChild(glowEl);

        heroEl.addEventListener('mousemove', function (e) {
          var rect = heroEl.getBoundingClientRect();
          glowEl.style.left = (e.clientX - rect.left) + 'px';
          glowEl.style.top = (e.clientY - rect.top) + 'px';
        });
      }
    }
  }

  // ── Nav scroll state ──
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile menu toggle with focus trap ──
  var toggle = document.querySelector('.nav-toggle');
  var overlay = document.querySelector('.mobile-overlay');
  if (toggle && overlay) {
    var lastFocused = null;

    toggle.addEventListener('click', function () {
      var open = overlay.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        lastFocused = document.activeElement;
        // Focus first link in overlay
        var firstLink = overlay.querySelector('a');
        if (firstLink) firstLink.focus();
      } else if (lastFocused) {
        lastFocused.focus();
        lastFocused = null;
      }
    });

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        overlay.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Focus trap
    overlay.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !overlay.classList.contains('open')) return;
      var focusable = overlay.querySelectorAll('a, button');
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        overlay.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
        if (lastFocused) {
          lastFocused.focus();
          lastFocused = null;
        }
      }
    });
  }

  // ── Scroll reveal with stagger ──
  var reveals = document.querySelectorAll('.reveal, .reveal-image');
  if (reveals.length) {
    if (prefersReduced) {
      reveals.forEach(function (el) { el.classList.add('visible'); });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;

            // Stagger: find sibling index among reveal elements in same parent
            var parent = el.parentElement;
            if (parent) {
              var siblings = parent.querySelectorAll(':scope > .reveal, :scope > .reveal-image');
              var idx = Array.prototype.indexOf.call(siblings, el);
              if (idx > 0) {
                el.style.transitionDelay = (idx * 0.08) + 's';
              }
            }

            el.classList.add('visible');
            revealObserver.unobserve(el);

            // Clean up delay after animation completes
            setTimeout(function () { el.style.transitionDelay = ''; }, 900);
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      reveals.forEach(function (el) { revealObserver.observe(el); });
    }
  }

  // ── Counter animation for stat cards ──
  var counters = document.querySelectorAll('.cs-stat-value[data-count]');
  if (counters.length && !prefersReduced) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          counterObserver.unobserve(el);
          var target = el.getAttribute('data-count');
          var numMatch = target.match(/([-+]?)(\d+\.?\d*)/);
          if (!numMatch) return;

          var prefix = target.match(/^[^0-9]*/)[0];
          var suffix = target.match(/[^0-9]*$/)[0];
          var end = parseFloat(numMatch[2]);
          var isDecimal = target.includes('.');
          var duration = 1200;
          var start = performance.now();

          function update(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = eased * end;
            el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          el.textContent = prefix + '0' + suffix;
          requestAnimationFrame(update);
        });
      },
      { threshold: 0.3 }
    );
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  // ── Reading progress bar ──
  var progressBar = document.querySelector('.reading-progress');
  if (progressBar) {
    var updateProgress = function () {
      var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      var pct = (window.scrollY / scrollHeight) * 100;
      progressBar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ── Case study TOC active state ──
  var toc = document.getElementById('cs-toc');
  if (toc) {
    var tocLinks = toc.querySelectorAll('.cs-toc-link');
    var tocSections = [];
    tocLinks.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id) id = id.replace('#', '');
      var section = id && document.getElementById(id);
      if (section) tocSections.push({ link: link, section: section });
    });

    if (tocSections.length) {
      var tocObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              tocLinks.forEach(function (l) { l.classList.remove('active'); });
              var match = tocSections.find(function (s) { return s.section === entry.target; });
              if (match) match.link.classList.add('active');
            }
          });
        },
        { rootMargin: '-20% 0px -60% 0px' }
      );
      tocSections.forEach(function (s) { tocObserver.observe(s.section); });
    }
  }

  // ── Project row image parallax ──
  if (!isMobile && !prefersReduced) {
    document.querySelectorAll('.project-row-image').forEach(function (imgWrap) {
      var img = imgWrap.querySelector('img');
      if (!img) return;

      imgWrap.addEventListener('mousemove', function (e) {
        var rect = imgWrap.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        var y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
        img.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(1.02)';
      });

      imgWrap.addEventListener('mouseleave', function () {
        img.style.transform = '';
      });
    });
  }

  // ── Project card 3D tilt ──
  if (!isMobile && !prefersReduced) {
    document.querySelectorAll('.pcard .pcard-img').forEach(function (imgWrap) {
      var card = imgWrap.closest('.pcard');
      if (!card) return;

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        imgWrap.style.transform = 'rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg)';
      });

      card.addEventListener('mouseleave', function () {
        imgWrap.style.transform = '';
      });
    });
  }

  // ── Reading time ──
  var projHero = document.querySelector('.project-header, .proj-hero');
  if (projHero) {
    var mainEl = document.querySelector('main');
    if (mainEl) {
      var text = mainEl.textContent || '';
      var wordCount = text.trim().split(/\s+/).length;
      var minutes = Math.max(1, Math.round(wordCount / 200));
      var readTimeEl = document.createElement('span');
      readTimeEl.className = 'proj-read-time';
      readTimeEl.textContent = minutes + ' min read';
      // Insert after the subtitle or after the hero tags
      var subtitle = projHero.querySelector('.proj-subtitle, .proj-tags');
      if (subtitle) {
        subtitle.parentNode.insertBefore(readTimeEl, subtitle.nextSibling);
      }
    }
  }

  // ── Back to top button ──
  var backBtn = document.createElement('button');
  backBtn.className = 'back-to-top';
  backBtn.setAttribute('aria-label', 'Back to top');
  backBtn.innerHTML = '<svg viewBox="0 0 16 16" fill="none"><path d="M8 14V4M4 7l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.body.appendChild(backBtn);

  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', function () {
    var show = window.scrollY > window.innerHeight * 0.5;
    backBtn.classList.toggle('visible', show);
  }, { passive: true });

  // ── Footer reveal — content scrolls away, dark footer underneath ──
  var footer = document.querySelector('.footer');
  if (footer && !document.querySelector('.reading-progress')) {
    // Wrap footer in reveal container
    var footerReveal = document.createElement('div');
    footerReveal.className = 'footer-reveal';
    footer.parentNode.insertBefore(footerReveal, footer);
    footerReveal.appendChild(footer);
    document.body.classList.add('has-footer-reveal');

    // Set footer height CSS var
    function setFooterHeight() {
      var h = footer.offsetHeight;
      document.body.style.setProperty('--footer-h', h + 'px');
    }
    setFooterHeight();
    window.addEventListener('resize', setFooterHeight);
  }

  // ── View Transitions (JS fallback for older support) ──
  if (document.startViewTransition && !CSS.supports('view-transition-name: auto')) {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
      // Only internal same-origin links
      if (link.hostname !== location.hostname) return;
      if (link.getAttribute('href').startsWith('#')) return;
      if (link.getAttribute('href').startsWith('mailto:')) return;
      if (link.target === '_blank') return;
      e.preventDefault();
      document.startViewTransition(function () {
        window.location.href = link.href;
      });
    });
  }

  // ── Magnetic CTA button ──
  if (!isMobile && !prefersReduced) {
    document.querySelectorAll('.footer-cta-email').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.2) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  // ── Smooth TOC scroll ──
  var tocEl = document.getElementById('cs-toc');
  if (tocEl) {
    tocEl.querySelectorAll('.cs-toc-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (!id || id.charAt(0) !== '#') return;
        var target = document.getElementById(id.substring(1));
        if (!target) return;
        e.preventDefault();
        var offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 56;
        var top = target.getBoundingClientRect().top + window.scrollY - offset - 24;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  // ── Mobile overlay entrance ──
  if (overlay) {
    var mobileLinks = overlay.querySelectorAll('.mobile-nav-links li');
    if (mobileLinks.length) {
      // Observe overlay open to stagger link entrance
      var overlayMo = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          if (m.attributeName !== 'class') return;
          var isOpen = overlay.classList.contains('open');
          mobileLinks.forEach(function (li, i) {
            if (isOpen) {
              li.style.opacity = '0';
              li.style.transform = 'translateY(12px)';
              setTimeout(function () {
                li.style.transition = 'opacity 0.35s var(--ease-spring, cubic-bezier(0.16,1,0.3,1)), transform 0.35s var(--ease-spring, cubic-bezier(0.16,1,0.3,1))';
                li.style.opacity = '1';
                li.style.transform = 'translateY(0)';
              }, 80 + i * 60);
            } else {
              li.style.transition = '';
              li.style.opacity = '';
              li.style.transform = '';
            }
          });
        });
      });
      overlayMo.observe(overlay, { attributes: true });
    }
  }

  // ── About link hover effect ──
  document.querySelectorAll('.about-link').forEach(function (link) {
    if (isMobile) return;
    link.addEventListener('mouseenter', function () {
      link.style.transform = 'translateY(-2px)';
      link.style.transition = 'transform 0.3s var(--ease-spring, cubic-bezier(0.16,1,0.3,1)), color 0.2s, border-color 0.2s';
    });
    link.addEventListener('mouseleave', function () {
      link.style.transform = '';
    });
  });

  // ── Next project hover preview ──
  if (!isMobile && !prefersReduced) {
    document.querySelectorAll('.next-project').forEach(function (np) {
      var img = np.querySelector('.next-project-img');
      if (!img) return;
      np.addEventListener('mouseenter', function () {
        img.style.transform = 'scale(1.05) rotate(-1deg)';
        img.style.transition = 'transform 0.5s var(--ease-spring, cubic-bezier(0.16,1,0.3,1))';
      });
      np.addEventListener('mouseleave', function () {
        img.style.transform = '';
      });
    });
  }

})();
