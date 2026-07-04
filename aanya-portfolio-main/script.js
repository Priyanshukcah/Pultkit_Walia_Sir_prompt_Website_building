// === THEME (must run first) ===
(function initTheme() {
  const storageKey = "aanya-theme";
  const root = document.documentElement;
  let stored;

  try {
    stored = localStorage.getItem(storageKey);
  } catch {
    stored = null;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme =
    stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";

  root.setAttribute("data-theme", theme);

  function updateToggleIcon() {
    const btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    const isDark = root.getAttribute("data-theme") === "dark";
    btn.textContent = isDark ? "☀️" : "🌙";
    btn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".theme-toggle");
    if (!btn) return;

    updateToggleIcon();

    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        /* private browsing */
      }
      updateToggleIcon();
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateToggleIcon);
  } else {
    updateToggleIcon();
  }
})();

// === SCROLL PROGRESS BAR ===
(function initScrollProgress() {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("role", "presentation");
  bar.setAttribute("aria-hidden", "true");
  document.body.prepend(bar);

  let ticking = false;

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (scrollTop / max) * 100 : 0;
    bar.style.width = pct + "%";
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    },
    { passive: true }
  );

  updateProgress();
})();

// === REVEAL ON SCROLL ===
(function initReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
})();

// === NAV SHRINK ON SCROLL ===
(function initNavScroll() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// === ABOUT STATS COUNTERS ===
(function initStatsCounters() {
  const numbers = document.querySelectorAll(".about-stats__number[data-count]");
  if (!numbers.length) return;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * target);
      el.textContent = value + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  numbers.forEach((el) => observer.observe(el));
})();

// === PAGE-LOAD SPLASH ===
(function initSplash() {
  const splash = document.createElement("div");
  splash.className = "page-splash";
  splash.setAttribute("aria-hidden", "true");
  splash.innerHTML = '<p class="page-splash__brand">Aanya Sharma</p>';
  document.body.appendChild(splash);

  requestAnimationFrame(() => {
    splash.classList.add("is-active");
  });

  window.setTimeout(() => {
    splash.classList.add("is-done");
    window.setTimeout(() => splash.remove(), 400);
  }, 900);
})();

console.log("Portfolio loaded ✅");

const contactForm = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");

if (contactForm && contactSuccess) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    // Read the four field values from the form so we can save them to Supabase
    const full_name = data.fullName;
    const email = data.email;
    const subject = data.subject;
    const message = data.message;

    // Send the submission to the "form" table and wait for Supabase to respond
    const response = await supabaseClient
      .from("form")
      .insert([{ full_name, email, subject, message }]);

    // Log the full response object in the browser console for debugging
    console.log(response);

    if (response.error) {
      // If Supabase returned an error, keep the form visible and show a red message
      contactSuccess.hidden = true;
      contactForm.hidden = false;

      let contactError = document.getElementById("contact-error");
      if (!contactError) {
        contactError = document.createElement("p");
        contactError.id = "contact-error";
        contactError.setAttribute("role", "alert");
        contactForm.after(contactError);
      }
      contactError.textContent = "Something went wrong. Please try again.";
      contactError.style.color = "red";
      return;
    }

    // On success, remove any error message, reset the form, then show the green success text
    const contactError = document.getElementById("contact-error");
    if (contactError) {
      contactError.remove();
    }

    contactForm.reset();
    contactForm.hidden = true;
    contactSuccess.hidden = false;
  });
}

const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.getElementById("nav-menu");

function setNavOpen(isOpen) {
  if (!navToggle || !navMenu) return;

  navMenu.classList.toggle("is-open", isOpen);
  navToggle.classList.toggle("is-active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    setNavOpen(!navMenu.classList.contains("is-open"));
  });

  navMenu.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });
}

// === ADMIN INBOX ===
(function initAdminInbox() {
  const inboxGrid = document.getElementById("inbox-grid");
  if (!inboxGrid) return;

  const inboxCount = document.getElementById("inbox-count");
  const unreadToggle = document.getElementById("unread-only-toggle");

  // Turn a database timestamp into a friendly relative time string
  function timeAgo(dateString) {
    const now = new Date();
    const then = new Date(dateString);
    const seconds = Math.floor((now - then) / 1000);

    if (seconds < 60) return "just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }

    return then.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // Escape user text before inserting it into HTML (keeps the page safe)
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Build one message card element from a single database row
  function createMessageCard(row) {
    const card = document.createElement("article");
    card.className = "message-card" + (row.is_read ? " is-read" : "");
    card.dataset.id = String(row.id);

    card.innerHTML = `
      <div class="message-card__top">
        <h3 class="message-card__subject">${escapeHtml(row.subject)}</h3>
        <time class="message-card__time" datetime="${row.created_at}">${timeAgo(row.created_at)}</time>
      </div>
      <p class="message-card__sender">${escapeHtml(row.full_name)} · ${escapeHtml(row.email)}</p>
      <p class="message-card__body">${escapeHtml(row.message)}</p>
      <div class="message-card__actions">
        <button type="button" class="message-card__mark-read contact-form__submit">Mark as Read</button>
      </div>
    `;

    const markReadBtn = card.querySelector(".message-card__mark-read");
    if (row.is_read && markReadBtn) {
      markReadBtn.hidden = true;
    }

    return card;
  }

  // Update the toolbar counter with the total number of messages
  function updateCounter(total) {
    if (!inboxCount) return;
    const label = total === 1 ? "message" : "messages";
    inboxCount.textContent = `📬 ${total} ${label}`;
  }

  // Ask Supabase for every row, newest first, then draw the cards
  async function loadMessages() {
    const { data, error } = await supabaseClient
      .from("form")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      inboxGrid.innerHTML =
        '<p class="admin-counter">Could not load messages. Check the console.</p>';
      return;
    }

    inboxGrid.innerHTML = "";

    data.forEach((row) => {
      const card = createMessageCard(row);
      inboxGrid.appendChild(card);
    });

    updateCounter(data.length);
  }

  // When "Mark as Read" is clicked, update that row in Supabase and restyle the card
  inboxGrid.addEventListener("click", async (event) => {
    const button = event.target.closest(".message-card__mark-read");
    if (!button) return;

    const card = button.closest(".message-card");
    if (!card || card.classList.contains("is-read")) return;

    const rowId = card.dataset.id;

    const { error } = await supabaseClient
      .from("form")
      .update({ is_read: true })
      .eq("id", rowId);

    if (error) {
      console.error(error);
      return;
    }

    card.classList.add("is-read");
    button.hidden = true;
  });

  // When "Unread only" is checked, hide read cards using a CSS class on the grid
  if (unreadToggle) {
    unreadToggle.addEventListener("change", () => {
      inboxGrid.classList.toggle("is-unread-only", unreadToggle.checked);
    });
  }

  loadMessages();
})();
