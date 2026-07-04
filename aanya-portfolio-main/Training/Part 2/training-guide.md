# Part 2 — Training Guide (Trainer Edition)

## Learn Web Development with AI — From Static Site to Deployed Full-Stack App

**Duration:** ~3 hours (with Q&A breaks)
**Prerequisite:** Part 1 completed. Students arrive with the `aanya-portfolio` folder intact.
**Outcome:** The same portfolio is now visually stunning (Mega Prompt warm-up), backed by a real Supabase database, has an Admin Dashboard, lives on GitHub, and is **deployed live** via GitHub Pages.

---

## Audience reminder (read before you teach)

The class is **mixed-skill** — some students have never written code, some are technical. Every prompt in this Part is written so that:

- **Non-technical students** can copy, paste, and run with confidence — the prompts read like a clear brief, not a spec sheet.
- **Technical students** still get rigour, because every spec inside the prompts uses numbers, hex codes, and named patterns (no vague adjectives).

After each prompt, point students at:
1. The **"What this changes"** card (HTML / CSS / JS / new files), so they can mentally follow along even if they're not reading the code.
2. The **"Why the prompt is written this way"** lens, which is the prompt-engineering lesson — that is the part that will compound for their careers.

---

## The Bridge from Part 1

> "Yesterday your contact form said *'message sent'* and lied. Today we make it tell the truth — and we put your whole site on the internet for real, for free, in three hours. And **before** we start, in a single prompt, we're going to give your portfolio a glow-up so dramatic you'll genuinely be excited to wire it up."

Recap on whiteboard (2 min):
- Part 1 = **Front-end** (skeleton, skin, brain — but no memory).
- Part 2 = **Polish** (Mega Prompt) → **Back-end** (memory) → **Version control** (history) → **Deploy** (public address).

---

## How This Guide Is Structured

Each unit:

1. **Concept** — the idea, plain English.
2. **Prompt** — copy from `prompts.md`.
3. **Prompting Strategy** — *why* the prompt looks the way it does (this is the part the room should remember in 5 years).
4. **What this changes (HTML/CSS/JS callout)** — explicit, so non-technical students can follow along visually.
5. **Trainer Notes** — what to demo, what to watch for, what to say.

There are **five Q&A breakpoints**. Don't skip them.

---

# 🎁 Module 0 — The Mega Prompt (warm-up · ~15 minutes)

> **This is new. Run it first.** It does not introduce a new concept; it gives the room a *visceral* "wow" so the rest of Part 2 lands on a beautiful canvas instead of the bare-bones Part 1 look.

### 0.1 Concept
We will use *one* big consolidated prompt to upgrade the visual layer of every page in the Part 1 portfolio: glassmorphism nav, animated hero gradient blobs, dark/light theme toggle, scroll-reveal animations, gradient text, frosted cards, float-label inputs, a projects-page marquee, an animated stats strip on About, and a tiny page-load splash.

No new libraries. No build tools. Same 6 files. Runs by double-clicking the HTML.

### 0.2 The Prompt
See `mega-prompt.md` for the full text. Open it on a second monitor and ask a student to read out the **Goal** section while you prepare to demo.

### 0.3 Prompting Strategy (highlight to the room)
- ✅ **Consolidation taken to its limit** — what would have been 15 separate prompts is one carefully structured one. This is *the* power-move of senior prompting.
- ✅ **Numbers, hex codes, durations, easings** everywhere → multiple students running it independently will get *visually consistent* results.
- ✅ **Two-list structure: "DO" + "DO NOT"** — explicit guardrails (no new libraries, do not rename files, do not change copy) prevent the AI from "improving" things it shouldn't.
- ✅ **Demand deliverables** — the AI is asked to produce a short summary of files touched + 3 test instructions + the single most impactful change. This converts a build into a learning artefact.
- ✅ **Accessibility baked in** — `prefers-reduced-motion` rule is part of the prompt itself; nobody adds it later.

### 0.4 What this changes (cheat-sheet to project on screen while it runs)
- 🟧 **HTML:** theme-toggle button added to nav across all 4 pages; `.reveal` classes sprinkled; marquee on Projects; stats strip on About. Content, links, IDs untouched.
- 🟦 **CSS:** new design tokens in `:root` + `[data-theme="dark"]` override; glass nav; animated hero blobs + noise; gradient borders on hover; float-label inputs; marquee keyframes; reveal keyframes; reduced-motion guard.
- 🟨 **JavaScript:** six modules appended on top of existing code — theme persistence, scroll progress bar, IntersectionObserver reveals, nav shrink-on-scroll, animated number counters, page-load splash. Hamburger + form handler from Part 1 left untouched.
- 🟩 **New files:** none — same 6 files.

### 0.5 Trainer demo (live)
1. Open the folder in Cursor → Cursor Chat → Agent mode.
2. Open `mega-prompt.md` → copy the entire fenced prompt → paste → Enter.
3. While Cursor edits, narrate the highlights using the cheat-sheet above. Estimated edit time: 2–4 min.
4. When it finishes:
   - Reload `index.html` (double-click) → splash → hero blobs → scroll to skills → hover → notice border glow.
   - Click moon/sun in the nav → entire site flips. Refresh → theme remembered.
   - Open `about.html` → scroll to stats strip → counters tick up; timeline rows fade in.
   - Open `projects.html` → marquee scrolling; hover a card → image zooms, "View Case Study" slides up.
   - Open `contact.html` → focus an input → label floats; submit a test message → existing green success still works.
   - Resize the window to phone width → hamburger still functional, grids stack.

### 0.6 Bridge sentence
> *"That entire transformation was a single prompt. Now imagine running 5 of those in a real product. **That** is what AI + a clear brief unlocks. Now let's give this beautiful website a real memory."*

---

## Module 1 — Full-Stack in One Sentence

| Aspect | Front-End (Client) | Back-End (Server) |
|---|---|---|
| **Lives in** | The browser | A server / cloud |
| **Made of** | HTML, CSS, JS | Database, server logic, APIs |
| **Job** | Show & feel | Remember & secure |

A **Full-Stack Developer** can do both. By the end of today, **you** can do both.

---

## Module 2 — Databases for Humans

### 2.1 The Excel-killer analogy

Ask the room: *"Could we just store messages in an Excel file?"* Let them argue. Then:

| | Excel | Real database (Supabase) |
|---|---|---|
| **1M rows** | crashes laptop | feels normal |
| **Two people editing** | one wins, one loses | both work in parallel |
| **"Show me all unread from this week"** | filters & formulas | one SQL line |

### 2.2 Table anatomy (sketch on whiteboard)

For a contact-form table called `form`:

| Column | Type | Why |
|---|---|---|
| `id` | bigint, auto-increment, primary key | Unique handle for every message |
| `created_at` | timestamptz, default now() | Sort & track |
| `full_name` | text | User input |
| `email` | text | User input |
| `subject` | text | User input |
| `message` | text | User input |
| `is_read` | boolean, default false | Admin workflow flag |

**Trainer tip:** Show this table on slide. The next prompt will *generate the SQL for exactly this table*.

---

## 🟢 Q&A Break #1 (5 min)
Ask: *"What other data could you store in a similar table?"* (Newsletter signups, event RSVPs, bug reports — all the same shape.)

---

## Module 3 — Generating SQL with AI

### 3.1 Concept
Don't memorise SQL. Describe the table in English, let the AI write the `CREATE TABLE` statement.

### 3.2 Prompt 1 — Generate SQL
See `prompts.md` → **Prompt 1**.

### 3.3 Prompting Strategy
- ✅ **Persona for the AI** ("Postgres expert helping a complete beginner") → output is correct *and* explained simply.
- ✅ **Numbered columns + exact types** → zero ambiguity.
- ✅ **Demand explanation** → Rule #5. This is the moment a non-technical student understands "primary key" the way they understand "row number in Excel".

### 3.4 What this changes
- Nothing in the website yet.
- **Supabase only:** a new table named `form` appears in Table Editor with 7 columns.

### 3.5 Trainer demo — Supabase signup
1. Open **supabase.com** → Start your project → sign in with GitHub.
2. **New project** → name: `web-dev-with-ai` → strong DB password (save it!) → region: Mumbai/Singapore.
3. Wait ~60s for provisioning.
4. Left sidebar → **SQL Editor** → paste the AI-generated SQL → **Run**.
5. Sidebar → **Table Editor** → confirm `form` table exists with all 7 columns.

### 3.6 Optional row-level security
If the room has 10+ minutes of buffer, run **Prompt 1b** (RLS). Otherwise mention it as homework — Supabase auto-enables RLS, but for the classroom demo we'll temporarily disable it on the table so the form can write without auth.

---

## Module 4 — Connect Front-End to the Database

### 4.1 Concept
Two things every client app needs to reach Supabase:
- **Project URL** — the address.
- **Anon Key** — the public-facing API key.

Both are in **Supabase → Project Settings → API**. Copy them somewhere safe; we'll paste into a config file.

### 4.2 Prompt 2 — Wire the contact form to Supabase
See `prompts.md` → **Prompt 2**.

### 4.3 Prompting Strategy
- ✅ **Explicit script ordering** ("BEFORE script.js") — the invisible-but-critical detail beginners always miss; calling it out in the prompt eliminates the bug entirely.
- ✅ **Both error and success paths defined** — production-grade UX in one prompt.
- ✅ **"Do not duplicate the handler"** — locks scope; protects Part 1 code.
- ✅ **"Do not change element IDs"** — future-proofing for the admin dashboard prompt.

### 4.4 What this changes (point at this while Cursor edits)
- 🟧 **HTML (`contact.html`):** 2 new `<script>` lines — Supabase CDN in `<head>`, `supabase-config.js` placed **before** `script.js` at the bottom.
- 🟦 **CSS:** untouched.
- 🟨 **JS (`script.js`):** the existing submit handler is *extended* — it now reads values, calls `supabaseClient.from('form').insert([...])`, and branches into success / error.
- 🟩 **New file:** `supabase-config.js` (holds URL + anon key).

### 4.5 Live test
1. Paste actual URL + anon key into `supabase-config.js`.
2. Reload `contact.html` → submit a test message.
3. Switch to Supabase → Table Editor → refresh → **the row appears live.**

The room should audibly react. This is the moment the project becomes *real*.

---

## Module 5 — AI-Assisted Debugging (Live)

Expect at least one student to hit a CORS / "supabase is not defined" / wrong key error. Use it. **Don't fix it for them — show them the workflow.**

### 5.1 The four-step debug loop

1. **Identify** — `F12` → Console tab → read the red text.
2. **Capture** — copy the exact error message.
3. **Prompt** — paste the **Prompt 3** template from `prompts.md`.
4. **Apply** — paste the fix, refresh, verify.

### 5.2 Prompting Strategy
- ✅ **Show, don't tell** — paste the actual error verbatim; never paraphrase.
- ✅ **"Corrected lines, not the whole file"** — minimises noise and accidental regressions.
- ✅ **"One habit to avoid this in future"** — every bug becomes a 30-second lesson.

### 5.3 What this changes
Depends on the bug, of course. The common ones today:
- Wrong key in `supabase-config.js` → fix is one string.
- Script-order mistake → fix is reordering two `<script>` tags in `contact.html`.
- Disabled RLS missed → fix is a one-line policy in Supabase SQL editor.

---

## 🟢 Q&A Break #2 (10 min)
This is the *bigger* break. Walk the room — most students will be debugging here. Celebrate the first student whose row hits the database.

---

## Module 6 — The Admin Dashboard

### 6.1 Concept
We just *wrote* to the database. Now we *read* from it — and update it.

### 6.2 Prompt 4 — admin.html
See `prompts.md` → **Prompt 4**.

### 6.3 Prompting Strategy
- ✅ **"Reuse the existing nav and design tokens"** — keeps the admin page consistent without making the AI redesign anything.
- ✅ **Two clear visual states (read / unread)** — descriptive UX, not vague "make it look like an inbox".
- ✅ **"Re-render that one card, not full reload"** — gentle introduction to *targeted DOM updates*.
- ✅ **"Only run the admin code if the grid element exists"** — defensive JS that won't break the other 4 pages. Important pattern to call out: this is how a single `script.js` can serve a multi-page site.

### 6.4 What this changes
- 🟧 **HTML:** brand-new `admin.html` with nav (5 links now), header, toolbar, and an empty grid container.
- 🟦 **CSS:** new `/* === ADMIN === */` section in `styles.css` with `.admin-grid`, `.admin-card`, `.admin-card.is-read`, line-clamp, and the "Unread only" filter rule.
- 🟨 **JS:** new admin block (gated on grid existence) — fetch, render, mark-as-read, filter; plus `timeAgo()` helper.
- 🟪 **Supabase:** SELECT on load; UPDATE on Mark as Read click.

### 6.5 Trainer demo
1. From `contact.html`, submit 3–4 test messages.
2. Open `admin.html` → see them appear, newest first.
3. Click "Mark as Read" → watch the card visually fade.
4. Refresh Supabase Table Editor → `is_read` flipped to `true` for that row.
5. Tick "Unread only" → the read card disappears.

---

## 🟢 Q&A Break #3 (5 min)
Ask: *"What is the **one** other admin feature you'd want?"* Collect 2–3 ideas. Pick the simplest and prompt for it live — pure improvisation; great confidence-builder.

Examples that will probably come up + a one-line prompt for each:

- **Search by sender** → *"Add a search input in the admin toolbar that filters the visible cards by full_name or email (client-side, no Supabase call)."*
- **Delete message** → *"Add a small ✕ button on each card that runs supabaseClient.from('form').delete().eq('id', row.id), confirms first, then removes the card from the DOM."*

---

## Module 7 — Version Control with Git & GitHub

### 7.1 Concept — the moving-houses analogy

| Step | Real life | Git command |
|---|---|---|
| 1 | Stuff scattered in your house | working directory |
| 2 | Pile what you want to move in the drawing room | `git add .` |
| 3 | Pack into labelled boxes | `git commit -m "msg"` |
| 4 | Load truck → new house (cloud) | `git push` |

> **Git** is the key. **GitHub** is the car. Git tracks; GitHub stores.

### 7.2 Setup (do once)

```bash
# macOS
brew install git

# Windows: download from git-scm.com/download/win
```

Then **once** per machine:

```bash
git config --global user.name  "Your Name"
git config --global user.email "you@example.com"
```

### 7.3 Protect secrets first — Prompt 5

**Critical**: before anything else, create a `.gitignore` or your Supabase keys will be public on GitHub.

See `prompts.md` → **Prompt 5**.

### 7.4 Prompting Strategy
- ✅ **Safety first** — the prompt runs *before* `git init`, so secrets never enter Git history at all.
- ✅ **Both files in one prompt** — `.gitignore` + `.example.js` are part of the same convention; consolidate.
- ✅ **Demand the "why" in plain English** — students will remember the *reason* long after they forget the syntax.

### 7.5 What this changes
- 🟧 **HTML / CSS / JS:** untouched.
- 🟩 **New files:** `.gitignore`, `supabase-config.example.js`.

### 7.6 The five terminal commands they will type

```bash
git init
git branch -M main
git add .
git commit -m "Initial portfolio + Supabase integration"
git remote add origin https://github.com/<your-username>/aanya-portfolio.git
git push -u origin main
```

### 7.7 Trainer demo — create the repo
1. GitHub → **New repository** → name `aanya-portfolio` → **Public** → do NOT initialise with README → Create.
2. Copy the HTTPS URL.
3. In Cursor's integrated terminal (`Ctrl + ` `): run the five commands above.
4. Refresh GitHub → files appear (but **not** `supabase-config.js` — confirm this by checking the file tree; this is the moment `.gitignore` proves itself).

---

## Module 8 — Deploy with GitHub Pages

### 8.1 Step-by-step (project on screen, students follow)

1. Repo → **Settings** tab.
2. Left sidebar → **Pages**.
3. **Build and deployment → Branch:** change `None` → `main` · folder `/ (root)` → **Save**.
4. Wait 30–60 seconds → refresh → green box: `Your site is live at https://<username>.github.io/aanya-portfolio/`
5. Click it. **You are live on the internet.**

### 8.2 Smoke test
- Open the live URL on your phone (mobile responsive check + the Mega Prompt animations look great on touch).
- Submit a test message → check Supabase table.
- ⚠️ Note: `admin.html` will *not* work on the live URL until students paste their Supabase keys into a deployed config file. For the classroom we keep `admin.html` as a local-only page; productionising it is in the homework (Auth + RLS + env management).

### 8.3 Iteration loop forever after

```bash
git add .
git commit -m "describe the change"
git push
# wait ~30s — site auto-updates
```

---

## 🟢 Q&A Break #4 (10 min)
This is the **emotional peak** of the course — they have a live URL. Let it breathe. Encourage them to share the link on LinkedIn / WhatsApp. Walk around with high-fives.

---

## Module 9 — Rapid Prototyping Bonus: A Timer App

### 9.1 Why this module
The portfolio took two sessions. The next demo takes **ten minutes** — and proves the prompting skill is *generalisable*. Any small idea is now in reach.

### 9.2 Setup
File → New Window → Open Folder → create `timer-app` on Desktop → open in Cursor.

### 9.3 Prompt 6 — Timer v1
See `prompts.md` → **Prompt 6**.

### 9.4 Prompt 7 — Iterate
See `prompts.md` → **Prompt 7**.

### 9.5 Prompting Strategy
- ✅ **Resource URLs provided** — no "find a sound effect" hand-waving.
- ✅ **"It must work properly with no console errors"** — explicit quality bar.
- ✅ **Iterative refinement in one prompt** — four enhancements, scope-locked with "do not break existing behaviour".

### 9.6 What this changes
- 🟩 Three brand-new files in `timer-app/`. None of the portfolio is touched.

### 9.7 Deploy in 60 seconds
Repeat the GitHub + Pages workflow. By the time they walk out of the room, students have **two** deployed apps.

---

## Module 10 — Wrap-up

### 10.1 What you can now do (read out loud)

- ✅ Run a single mega-prompt that visually transforms an entire site.
- ✅ Build a multi-page front-end from scratch via prompts.
- ✅ Design a database table from plain English.
- ✅ Connect a website to a cloud database (Supabase).
- ✅ Build admin tooling that reads + updates real data.
- ✅ Debug errors with AI as your pair.
- ✅ Use Git to track changes and recover from mistakes.
- ✅ Push code to GitHub and deploy live with GitHub Pages.
- ✅ Spin up a brand-new prototype in ten minutes.

That is **full-stack web development**. Six months ago this was a multi-week curriculum.

### 10.2 Where to go next (signpost; don't teach)

- **Supabase Auth** — let users sign up and log in.
- **Row-Level Security** — proper production-grade rules.
- **Custom domain** — replace `username.github.io` with `aanyasharma.com`.
- **A framework** — when you outgrow plain HTML, look at React or Next.js.
- **Automation tools** — Make.com, n8n: trigger emails/Slack pings when a new row is inserted.

### 10.3 Homework (pick one)

1. Add a "Reply via Email" button on each admin card that opens a pre-filled `mailto:` link.
2. Add Supabase Auth so only *you* (logged in) can see `admin.html`.
3. Buy a domain on Namecheap, point it at GitHub Pages.
4. Build a *new* small app entirely from prompts — and deploy it.

---

## 🟢 Q&A Break #5 — Final (15 min)
Common questions to anticipate:

- *"Is Supabase free forever?"* → Generous free tier; production projects upgrade only when traffic grows.
- *"Can I delete a record?"* → Yes; same pattern as update, just `.delete()`.
- *"What if I want to email myself when a message arrives?"* → Supabase Database Webhooks → Make.com / n8n. (Tease only.)
- *"Is my anon key dangerous in the repo?"* → It is *designed* to be public — but if you ever add a service-role key, that one **never** goes in Git. Always.
- *"Can I use this for a client website?"* → Yes. Many freelancers ship exactly this stack today.

---

## Appendix — The Five Rules, restated (still true)

1. **Numbers beat adjectives.**
2. **Persona before prompt.**
3. **One big prompt > five small ones.**
4. **Iterate with anchor + delta.**
5. **Always demand the "why".**

> The technologies change every year. These five rules don't.
>
> Welcome to web development. Go build something.
