# 🎁 The Mega Prompt — A Visual Glow-Up Before Part 2

> **When to run this:** at the very start of Part 2, **before** Prompt 1. One copy-paste, one Cursor run, ~2–4 minutes of generation time.
>
> **What it does:** takes the 4-page portfolio you built in Part 1 and turns it into a *visually stunning, animated, polished* product — so when we add a database in Part 2, the experience already feels premium.
>
> **Why it exists:** Part 1 proved you can build. The Mega Prompt proves AI + HTML + CSS + JS can be *beautiful*. Same five files. No new libraries. Runs locally with a simple file-open. The "wow" sets the tone for the rest of the day.

---

## ✅ Before you paste — quick checklist

1. The folder `aanya-portfolio` from Part 1 is open in Cursor.
2. You can see all 6 files in the sidebar: `index.html`, `about.html`, `projects.html`, `contact.html`, `styles.css`, `script.js`.
3. Cursor Chat is open (`Cmd + L` / `Ctrl + L`) and **Agent** mode is selected (top of the chat panel).
4. You have a 2-minute coffee — Agent will edit multiple files and you should let it finish.

---

## 🧠 The five prompting rules (still apply)

1. **Numbers beat adjectives.** Every visual choice below has a hex code, pixel value, or duration.
2. **Persona first.** The prompt tells the AI exactly who it is and who you are.
3. **Consolidate.** This is one prompt that does the work of fifteen.
4. **Iterate with anchor + delta.** We explicitly tell the AI what to keep and what to change.
5. **Demand the "why".** We ask for a short summary at the end so you learn from the changes.

---

## 📋 THE MEGA PROMPT — copy everything inside the box

> Tip: click into the code block, press `Cmd/Ctrl + A` to select all, then `Cmd/Ctrl + C` to copy. Paste into Cursor Chat (Agent mode) and press Enter. Do **not** edit the prompt before sending — the specifics are what make it work the same way for everyone in the room.

```text
You are a senior front-end designer-developer pair-programming with a complete
beginner. We are upgrading an EXISTING 4-page static portfolio called
"Aanya Sharma — Senior UX Designer".

THE EXISTING FILES (do not rename, do not delete, do not move):
- index.html       (Home: hero + skills grid + footer)
- about.html       (About: header + 2-col bio + timeline + footer)
- projects.html    (Projects: header + 6 project cards + footer)
- contact.html     (Contact: header + 2-col with contact card + form + footer)
- styles.css       (single shared stylesheet using CSS variables in :root)
- script.js        (vanilla JS: contact form handler + hamburger toggle)

GOAL
Turn this into a visually stunning, modern, animated portfolio while keeping
100% of the existing content (every heading, paragraph, link, skill, project,
timeline entry, and form field). Only LAYOUT, STYLE, and MICRO-INTERACTIONS
should change. All four pages must continue to work when opened directly by
double-clicking the HTML file (no build tools, no npm, no frameworks).

GLOBAL DESIGN SYSTEM — overwrite the existing :root variables in styles.css
with this exact token set, and refactor the stylesheet to use these tokens
everywhere a colour, radius, shadow or duration appears:

  /* Light theme (default) */
  --bg:            #f7f7fb;
  --surface:       #ffffff;
  --surface-2:     #f1f1f8;
  --text:          #0b0b14;
  --text-muted:    #5b5b78;
  --border:        rgba(11,11,20,.08);
  --primary:       #6d5efc;     /* indigo-violet */
  --primary-2:     #b06dfc;     /* magenta-violet */
  --accent:        #22d3ee;     /* cyan */
  --success:       #16a34a;
  --danger:        #ef4444;
  --shadow-sm:     0 2px 6px rgba(11,11,20,.06);
  --shadow-md:     0 12px 32px -8px rgba(109,94,252,.18);
  --shadow-lg:     0 30px 60px -20px rgba(109,94,252,.35);
  --radius-sm:     10px;
  --radius-md:     16px;
  --radius-lg:     24px;
  --radius-pill:   999px;
  --ease:          cubic-bezier(.2,.7,.2,1);
  --dur-fast:      180ms;
  --dur:           320ms;
  --dur-slow:      650ms;
  --grad-hero:     linear-gradient(135deg,#6d5efc 0%,#b06dfc 50%,#22d3ee 100%);
  --grad-text:     linear-gradient(135deg,#0b0b14 0%,#6d5efc 60%,#22d3ee 100%);

Also add a [data-theme="dark"] override block on :root with:
  --bg:#08090f; --surface:#13141f; --surface-2:#1c1d2e;
  --text:#f5f5fa; --text-muted:#9ca3b7;
  --border:rgba(245,245,250,.10);
  --shadow-sm:0 2px 8px rgba(0,0,0,.4);
  --shadow-md:0 14px 40px -10px rgba(34,211,238,.20);
  --shadow-lg:0 30px 80px -20px rgba(109,94,252,.45);
  --grad-text: linear-gradient(135deg,#ffffff 0%,#b06dfc 60%,#22d3ee 100%);

Add smooth theme transitions: body, *, *::before, *::after should transition
background-color, color, border-color, box-shadow over var(--dur) var(--ease).

NAVIGATION (all 4 pages — keep the existing structure, restyle only)
- Glassmorphism: background rgba(255,255,255,.65) in light / rgba(19,20,31,.55)
  in dark, backdrop-filter: blur(18px) saturate(140%), 1px bottom border using
  var(--border).
- Add a class "is-scrolled" to the <nav> when window.scrollY > 8: shrinks
  height from 72px → 56px, deepens the shadow to var(--shadow-md), and slightly
  increases background opacity. Use a passive scroll listener in script.js
  (append only — do not remove the existing hamburger code).
- Brand text "Aanya Sharma" must use background:var(--grad-hero);
  -webkit-background-clip:text; color:transparent; font-weight:700.
- Add a circular theme-toggle button to the right of the nav links (sun ☀️
  when in dark mode, moon 🌙 when in light mode). It must:
    * Be 36×36px, var(--radius-pill), var(--surface-2) background, 1px border.
    * On click, toggle html[data-theme] between "light" and "dark".
    * Persist the choice in localStorage under key "aanya-theme".
    * On page load, read localStorage; if missing, fall back to
      window.matchMedia('(prefers-color-scheme: dark)').
  Add this script to the TOP of script.js (so theme is set before paint) and
  add the toggle button HTML to the <nav> of all 4 pages.
- The active nav link gets a 2px-thick underline using var(--grad-hero) that
  animates from 0% → 100% width over var(--dur).

HERO (index.html only — keep all existing copy)
- Replace the flat gradient background with a layered animated background:
    1. Base: var(--surface).
    2. Two large soft "blobs" using ::before and ::after on .hero, each 60vw
       wide, filter: blur(80px), opacity .55, mix-blend-mode: screen in dark /
       multiply in light. Colours: #6d5efc and #22d3ee. Animate them with a
       12s ease-in-out infinite keyframe that gently translates them ±40px in
       x and y (different phases) — call the keyframe "blobFloat".
    3. A subtle SVG noise overlay (data-URI, 120×120 fractal noise, opacity .04)
       to add texture.
- Headline ("I design products people actually enjoy using.") uses
  background: var(--grad-text); -webkit-background-clip:text; color:transparent;
  font-size clamp(40px, 6vw, 84px); line-height 1.05.
- Add a small animated "scroll" indicator at the bottom-centre of the hero:
  a 22×36px rounded rectangle with a 4px dot inside that travels top→bottom
  every 1.6s.
- Primary CTA button: var(--grad-hero) background, white text, var(--radius-pill),
  18px/36px padding, var(--shadow-md). On hover: translateY(-3px), shadow
  becomes var(--shadow-lg), and a soft white "shine" sweeps from left to right
  using a pseudo-element with linear-gradient(120deg, transparent, rgba(255,255,255,.4),
  transparent) animated over 700ms.

SKILLS GRID (index.html — keep all 6 cards and their copy)
- Card background: var(--surface), 1px solid var(--border), var(--radius-lg),
  28px padding, var(--shadow-sm).
- On hover: translateY(-8px), box-shadow var(--shadow-lg), and the border
  becomes a 1px transparent border with a gradient ring using
  background-clip: padding-box, border-image: var(--grad-hero) 1.
- Each icon sits inside a 56×56px var(--surface-2) rounded square (radius-md),
  font-size 28px, with a soft glow ring (box-shadow: 0 0 0 6px rgba(109,94,252,.08)).
- Add a faint "shine-on-hover" diagonal sweep across each card using
  ::after with transform: translateX(-100%) → translateX(100%) on hover,
  var(--dur-slow), var(--ease).

ABOUT PAGE
- Page header: keep the existing h1 and subtitle. Add an animated SVG "blob"
  background behind the h1 (same colours as hero, much smaller, opacity .25).
- Two-column section: portrait gets a 8px gradient border using
  border-image: var(--grad-hero) 1, radius-lg, var(--shadow-lg), and a subtle
  tilt of -3deg on desktop only (>900px). On hover, tilt smoothly returns to 0.
- Add a "stats strip" ABOVE the two-column section with three counters:
    "5+ years experience"   · "30+ shipped projects"   · "12 awards"
  Each number must animate from 0 to its final value over 1.4s when the strip
  scrolls into view (use IntersectionObserver). Use existing-content tone of
  voice; numbers above are placeholders consistent with the bio.
- Timeline: keep the 4 entries. Restyle to a vertical "rail" using a
  var(--grad-hero) 2px line; each year dot is a 14px circle filled with
  var(--primary) and a 6px outer glow. Each row fades+slides in from the left
  when it enters the viewport (IntersectionObserver, .reveal class, see GLOBAL
  ANIMATION).

PROJECTS PAGE
- Replace placehold.co URLs only if needed for new background colours that
  match the system. Keep the existing 6 titles, descriptions, tags, and the
  bg colours 4f46e5, 0ea5e9, 10b981, f59e0b, ef4444, 8b5cf6.
- Card upgrade:
    * Image area becomes a 16:9 wrapper with overflow:hidden + radius-md.
    * On card hover, the image scales to 1.06 over var(--dur).
    * A linear-gradient(180deg, transparent 55%, rgba(0,0,0,.55) 100%) overlay
      appears on hover, and the "View Case Study →" link slides up from
      translateY(8px) → 0 with opacity 0 → 1.
    * Card itself uses var(--surface), radius-lg, 1px var(--border), tilts very
      slightly on hover: rotate(-.4deg) translateY(-6px), shadow var(--shadow-lg).
- Tags: pill style stays, but on hover they swap to var(--grad-hero) background
  with white text over var(--dur-fast).
- Add a thin horizontal "tag marquee" ABOVE the grid: a single row of small
  pills ("Fintech · Edtech · Healthcare · B2B · A11y · Design Systems ·
  Marketplace · Data Viz · Internal Tools · UX Writing") that scrolls right→left
  infinitely over 30s using a CSS @keyframes (no JS). Duplicate the row twice
  inside a wrapper with overflow:hidden so the loop appears seamless. Pause on
  hover.

CONTACT PAGE
- Left contact card upgrades to a "frosted" card: var(--surface), radius-lg,
  1px var(--border), var(--shadow-md). Replace the social links list with
  three large icon-buttons (LinkedIn 💼, Dribbble 🎨, Twitter 🐦) — each a
  56×56 rounded square with var(--surface-2) bg, hover scales to 1.08 and
  background fills with var(--grad-hero) (white emoji stays).
- Form inputs:
    * Float-label style: label sits inside the input at 50% Y; on focus or when
      the input has a value, the label scales to .82 and moves to the top-left
      corner with a var(--bg) background chip. Implement using CSS only via
      :placeholder-shown and :not(:placeholder-shown) — give each input a
      placeholder=" " (single space) so the trick works.
    * Inputs: var(--surface), 1.5px var(--border), radius-md, 16px padding,
      transition border-color and box-shadow. On focus: border var(--primary),
      box-shadow 0 0 0 4px rgba(109,94,252,.18).
- Submit button: var(--grad-hero), white, var(--radius-pill), 14px/28px
  padding, var(--shadow-md). On hover: same "shine sweep" as the hero CTA.
- DO NOT change the existing JS submit handler logic — only restyle. Keep the
  success-message element and id intact so Part 2 can wire it to the database.

FOOTER (all 4 pages)
- Background var(--surface-2), top border 1px var(--border).
- Add a single horizontal accent line above the columns using var(--grad-hero),
  height 2px, opacity .6.
- Restyle the social emoji list to match the contact page (compact icon
  buttons, same hover behaviour).
- Keep the copyright text but place a small animated heart (♥) that pulses
  every 1.4s next to "Built with curiosity and Cursor."

GLOBAL ANIMATIONS (append to script.js — do not remove existing code)
1. Reveal-on-scroll:
   - Add a vanilla IntersectionObserver that watches every element with class
     ".reveal". When it enters the viewport, add ".is-visible" and unobserve it.
   - In styles.css, ".reveal" starts with opacity 0 and transform translateY(28px),
     and ".reveal.is-visible" goes to opacity 1 / translateY(0) with var(--dur-slow)
     var(--ease).
   - Add the "reveal" class (in the HTML) to:
       * Every skill card on index.html.
       * Each timeline entry on about.html (with staggered transition-delay:
         50ms, 150ms, 250ms, 350ms).
       * Every project card on projects.html (staggered 50ms × index).
       * The contact card and form on contact.html.
2. Top page scroll-progress bar:
   - 3px tall, fixed top:0, full width, background var(--grad-hero), width
     scales from 0% → 100% based on (scrollTop / (scrollHeight - innerHeight)).
   - Inject the bar element via script on every page (so we don't have to edit
     each HTML manually). Use requestAnimationFrame to throttle.
3. Number counter for the About-page stats strip (already described above).
4. Page-load splash:
   - On every page load, briefly show a centred minimal splash: black-out
     overlay with the gradient brand "Aanya Sharma" fading in then out over
     900ms total, then removing itself from the DOM. Inject via JS so we don't
     touch every HTML file.
5. Custom focus-visible ring: any focused interactive element gets
   outline: 2px solid var(--primary); outline-offset: 3px; border-radius
   inherited. Skip the default browser dotted ring.

TYPOGRAPHY
- Keep the existing Google Fonts import (Inter + Fraunces). Add weight 800 to
  Fraunces if not already requested. Use letter-spacing: -.02em on h1/h2 for a
  modern editorial feel.

ACCESSIBILITY (non-negotiable)
- All decorative animations must respect
    @media (prefers-reduced-motion: reduce) { *, ::before, ::after {
      animation-duration: .001ms !important; transition-duration: .001ms !important;
      animation-iteration-count: 1 !important; scroll-behavior: auto !important; } }
- Theme toggle must have aria-label that updates ("Switch to dark mode" /
  "Switch to light mode").
- All colour combinations must keep contrast ratio ≥ 4.5 for body text.
  If any token combo fails, pick the closer-to-pure variant and tell me what
  you adjusted.

CODE ORGANISATION
- All new CSS goes under clearly labelled section comments inserted in this
  order at the end of styles.css:
    /* === DESIGN TOKENS === */
    /* === GLOBAL ANIMATIONS & UTILITIES === */
    /* === NAV (GLASS) === */
    /* === HERO (BLOBS) === */
    /* === SKILLS (UPGRADED) === */
    /* === ABOUT (STATS + TIMELINE) === */
    /* === PROJECTS (MARQUEE + CARDS) === */
    /* === CONTACT (FROSTED + FLOAT-LABELS) === */
    /* === FOOTER (UPGRADED) === */
    /* === REDUCED MOTION === */
  Leave the existing per-section styles in place; override or extend them
  cleanly — do not delete prior rules unless they directly conflict.
- New JS in script.js goes under banner comments in this order:
    // === THEME (must run first) ===
    // === SCROLL PROGRESS BAR ===
    // === REVEAL ON SCROLL ===
    // === NAV SHRINK ON SCROLL ===
    // === ABOUT STATS COUNTERS ===
    // === PAGE-LOAD SPLASH ===
  Preserve the existing hamburger toggle and contact-form handler intact.

DELIVERABLES — what I expect when you finish
1. All 4 HTML files updated (theme toggle in nav, reveal classes on the right
   elements, marquee on projects, stats strip on about, splash injected by JS
   so no HTML change needed for it).
2. styles.css extended with all sections above.
3. script.js extended with all behaviours above (existing code preserved).
4. A short summary at the end of your message containing:
   - The list of files you touched.
   - Three things to test in the browser (e.g., "toggle theme", "scroll the
     home page", "submit the contact form").
   - One sentence on the single most impactful change visually, and why.

CONSTRAINTS / NON-NEGOTIABLES
- No new libraries, no npm, no build step. Pure HTML/CSS/JS that runs by
  double-clicking the file.
- Do not change copy, headings, link targets, form field names, or element IDs.
- Do not break the Part 1 hamburger menu or the contact-form success message.
- Mobile responsiveness from Part 1 must continue to work; verify by sketching
  any new media-query overrides at the bottom of styles.css.
```

---

## 🎨 What this prompt changes (cheat-sheet for the room)

Use this list to follow along while Cursor edits — and to debug if something
looks off.

| Layer | What changes |
|---|---|
| 🟧 **HTML** (all 4 pages) | A theme-toggle button is added to the nav. The `.reveal` class is sprinkled on cards, timeline rows, contact panels. Projects page gets a marquee strip above the grid. About page gets a stats strip above the two-column section. No copy or link is touched. |
| 🟦 **CSS** (`styles.css`) | New `:root` design tokens (colours, shadows, radii, easings, gradients) + a `[data-theme="dark"]` override. Glassmorphism nav, animated hero blobs + noise, upgraded skill cards with gradient borders & shine, frosted contact card, float-label inputs, project marquee + image-zoom hover, scroll-progress bar styles, `.reveal` keyframes, reduced-motion guard. Everything appended under clearly labelled section comments. |
| 🟨 **JavaScript** (`script.js`) | Six new modules added on top of Part 1 code: (1) theme persistence via `localStorage`, (2) scroll-progress bar, (3) `IntersectionObserver`-driven reveal animations, (4) nav-shrink on scroll, (5) animated number counters on About, (6) one-time page-load splash. Existing hamburger toggle and form handler are left untouched. |
| 🟩 **New files** | None. We re-use the same 6 files from Part 1. |

---

## ✅ Verify it works (do this together in class — 3 minutes)

1. Double-click `index.html` — you should see:
   * A subtle splash with the brand name, then the home page.
   * The hero gradient blobs gently float.
   * Skill cards lift on hover with a glowing border.
   * The nav shrinks when you scroll down.
2. Click the moon/sun button in the nav — entire site flips between **dark** and **light**. Refresh — your choice is remembered.
3. Open `about.html` — the three counters animate from 0 when you scroll to them; the timeline rows fade in one after another.
4. Open `projects.html` — tags marquee scrolls in the background, images zoom subtly on hover, "View Case Study →" slides up.
5. Open `contact.html` — labels float when you focus an input; submit a test message → green success appears (same behaviour as Part 1; we wire it to a real database in Prompt 2 of Part 2).
6. Resize the window to phone width — hamburger still works, layouts still stack.

If any of these feel off, jump to the **Debug template** in `prompts.md` (Prompt 3 of Part 2) — paste the exact error or describe the symptom and Cursor will surgically fix it.

---

## 🧭 Now you're ready for Part 2

Open `prompts.md` and start with **Prompt 1 — Generate the database SQL**.
