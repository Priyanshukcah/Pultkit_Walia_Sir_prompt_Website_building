// === THEME (must run first) ===
(function () {
  var STORAGE_KEY = 'aanya-theme';
  var saved = localStorage.getItem(STORAGE_KEY);
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', function () {
  // === SCROLL PROGRESS BAR ===
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  var ticking = false;
  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - window.innerHeight;
    var pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = pct + '%';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  updateProgress();

  // === PAGE-LOAD SPLASH ===
  var splash = document.createElement('div');
  splash.className = 'page-splash';
  splash.innerHTML = '<p class="page-splash-brand">Aanya Sharma</p>';
  document.body.appendChild(splash);
  requestAnimationFrame(function () {
    splash.classList.add('is-active');
  });
  setTimeout(function () {
    splash.classList.add('is-done');
    setTimeout(function () {
      splash.remove();
    }, 350);
  }, 900);

  // Theme toggle
  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    function syncThemeToggle() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      themeToggle.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
    syncThemeToggle();
    themeToggle.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('aanya-theme', next);
      syncThemeToggle();
    });
  }

  // === NAV SHRINK ON SCROLL ===
  var nav = document.querySelector('.nav');
  if (nav) {
    function onNavScroll() {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', onNavScroll, { passive: true });
    onNavScroll();
  }

  // === REVEAL ON SCROLL ===
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // === ABOUT STATS COUNTERS ===
  var statNums = document.querySelectorAll('.stat-num[data-target]');
  if (statNums.length && 'IntersectionObserver' in window) {
    var statsStrip = document.querySelector('.about-stats');
    if (statsStrip) {
      var counted = false;
      var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            statNums.forEach(function (numEl) {
              var target = parseInt(numEl.getAttribute('data-target'), 10);
              var start = performance.now();
              var duration = 1400;
              function tick(now) {
                var progress = Math.min((now - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                numEl.textContent = Math.round(target * eased);
                if (progress < 1) {
                  requestAnimationFrame(tick);
                }
              }
              requestAnimationFrame(tick);
            });
            statsObserver.disconnect();
          }
        });
      }, { threshold: 0.35 });
      statsObserver.observe(statsStrip);
    }
  }

  // =========== Contact form (Part 2: send to a real database) ===========
  var contactForm = document.getElementById('contact-form');
  var contactSuccess = document.getElementById('contact-success');
  var contactError = document.getElementById('contact-error');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // Read the four values that match our Supabase "form" table columns.
      // The Name field on the page is stored as full_name in the database.
      var full_name = contactForm.name.value.trim();
      var email = contactForm.email.value.trim();
      var subject = contactForm.subject.value;
      var message = contactForm.message.value.trim();

      // Hide any old error message before we try sending again.
      if (contactError) {
        contactError.hidden = true;
      }

      // Send the row to Supabase and wait for the response.
      var response = await supabaseClient.from('form').insert([
        { full_name: full_name, email: email, subject: subject, message: message }
      ]);

      // Log the full response so we can debug in the browser console (F12).
      console.log(response);

      // If Supabase returned an error, keep the form visible and show the red message.
      if (response.error) {
        if (contactError) {
          contactError.hidden = false;
        }
        return;
      }

      // Success: hide the form, show the green thank-you message, clear the fields.
      contactForm.hidden = true;
      contactSuccess.hidden = false;
      contactForm.reset();
    });
  }

  // ========== responsive (hamburger) ==========
  var navEl = document.querySelector('.nav');
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');

  if (navEl && navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navEl.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navEl.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // =========== Admin inbox (admin.html only) ===========
  var inboxGrid = document.getElementById('inbox-grid');

  if (inboxGrid && typeof supabaseClient !== 'undefined') {
    var inboxCount = document.getElementById('inbox-count');
    var inboxEmpty = document.getElementById('inbox-empty');
    var inboxError = document.getElementById('inbox-error');
    var unreadToggle = document.getElementById('inbox-unread-only');

    // Turn a database timestamp into friendly text like "2 hours ago".
    function timeAgo(dateString) {
      var now = new Date();
      var then = new Date(dateString);
      var seconds = Math.floor((now - then) / 1000);

      if (seconds < 60) {
        return 'just now';
      }

      var minutes = Math.floor(seconds / 60);
      if (minutes < 60) {
        return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
      }

      var hours = Math.floor(minutes / 60);
      if (hours < 24) {
        return hours + (hours === 1 ? ' hour ago' : ' hours ago');
      }

      var days = Math.floor(hours / 24);
      if (days < 7) {
        return days + (days === 1 ? ' day ago' : ' days ago');
      }

      return then.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }

    // Escape HTML so message text cannot break the page layout.
    function escapeHtml(text) {
      var div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Build one card element for a single row from Supabase.
    function createInboxCard(row) {
      var card = document.createElement('article');
      card.className = 'inbox-card' + (row.is_read ? ' is-read' : '');
      card.dataset.id = String(row.id);

      card.innerHTML =
        '<div class="inbox-card-top">' +
          '<h3 class="inbox-card-subject">' + escapeHtml(row.subject) + '</h3>' +
          '<time class="inbox-card-time" datetime="' + escapeHtml(row.created_at) + '">' +
            timeAgo(row.created_at) +
          '</time>' +
        '</div>' +
        '<p class="inbox-card-sender">' +
          escapeHtml(row.full_name) + ' · ' + escapeHtml(row.email) +
        '</p>' +
        '<p class="inbox-card-body">' + escapeHtml(row.message) + '</p>' +
        '<div class="inbox-card-actions">' +
          '<button type="button" class="inbox-mark-read">Mark as Read</button>' +
        '</div>';

      var markBtn = card.querySelector('.inbox-mark-read');
      if (markBtn && !row.is_read) {
        markBtn.addEventListener('click', async function () {
          var response = await supabaseClient
            .from('form')
            .update({ is_read: true })
            .eq('id', row.id);

          console.log(response);

          if (response.error) {
            return;
          }

          card.classList.add('is-read');
        });
      }

      return card;
    }

    // Load every message from Supabase, newest first, and draw the cards.
    async function loadInbox() {
      var response = await supabaseClient
        .from('form')
        .select('*')
        .order('created_at', { ascending: false });

      console.log(response);

      if (response.error) {
        if (inboxError) {
          inboxError.hidden = false;
        }
        return;
      }

      var rows = response.data || [];
      inboxGrid.innerHTML = '';

      if (inboxCount) {
        inboxCount.textContent = '📬 ' + rows.length + (rows.length === 1 ? ' message' : ' messages');
      }

      if (rows.length === 0) {
        if (inboxEmpty) {
          inboxEmpty.hidden = false;
        }
        return;
      }

      if (inboxEmpty) {
        inboxEmpty.hidden = true;
      }

      rows.forEach(function (row) {
        inboxGrid.appendChild(createInboxCard(row));
      });
    }

    loadInbox();

    // When "Unread only" is checked, hide read cards with a CSS class on the grid.
    if (unreadToggle) {
      unreadToggle.addEventListener('change', function () {
        inboxGrid.classList.toggle('inbox-filter-unread', unreadToggle.checked);
      });
    }
  }
});

console.log('Page loaded — script.js is working.');
