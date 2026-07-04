# Part 2 — Prompt Library (Student Copy-Paste Edition)

> **How to use this file**
> 1. Open it side-by-side with Cursor (Agent mode).
> 2. Run prompts **in order**, top to bottom.
> 3. For each prompt:
>    - read the short **Goal** (one line — what we're trying to achieve),
>    - copy the **Prompt** box into Cursor Chat and press Enter,
>    - glance at the **What this changes in your project** card so you know what HTML / CSS / JS pieces are moving,
>    - skim **Why the prompt is written this way** so you build prompt-engineering instinct, not just muscle memory,
>    - run the quick **Verify** step before moving on.
> 4. If anything fails, jump to **Prompt 3 — The Debug Template** and follow it.

> **You'll still have your `aanya-portfolio` folder from Part 1.** We continue right where we stopped.

---

## ⚙️ Setup (do once before Prompt 1)

1. Create a free **Supabase** account → [supabase.com](https://supabase.com) → sign in with GitHub.
2. Click **New project** → name `web-dev-with-ai` → save the DB password somewhere safe → pick the region closest to you (Mumbai / Singapore for India).
3. Create a free **GitHub** account → [github.com](https://github.com) (if you don't have one).
4. Install **Git** on your laptop:
   - **macOS:** `brew install git`
   - **Windows:** download from [git-scm.com/download/win](https://git-scm.com/download/win)
5. Once installed, run these two commands once in any terminal — they tell Git who you are:
   ```bash
   git config --global user.name  "Your Name"
   git config --global user.email "you@example.com"
   ```

---

## 🎁 Pre-flight (recommended) — Run the **Mega Prompt** first

Open `mega-prompt.md` (next to this file). It contains ONE big prompt that turns your Part 1 portfolio into a visually stunning, animated, dark-mode-ready product in a single Cursor run. Do this **before** Prompt 1 below so the rest of Part 2 lands on a beautiful canvas.

When you're back, continue here.

---

## The Five Rules (still apply — keep them visible)

1. **Numbers beat adjectives.** ("16px padding", not "good spacing".)
2. **Persona before prompt.** Tell the AI who it is and who you are.
3. **Consolidate.** One big prompt with bullet points beats five small prompts.
4. **Iterate with anchor + delta.** "*This part* is too big — make it 18px."
5. **Demand the "why".** Ask the AI to explain its choices in plain English.

---

# Prompt 1 — Generate the database table (SQL)

**Goal:** create a `form` table in Supabase that will store every contact-form message your website receives.

**Prompt — copy into Cursor Chat (or ChatGPT — either works):**

```text
You are a Postgres expert helping a complete beginner.

I am using Supabase. Please write ONE single CREATE TABLE statement for a table
named "form" that will store contact-form submissions from my website.

The columns I need are:
1. id          — bigint, auto-incrementing, primary key
2. created_at  — timestamptz, default now()
3. full_name   — text, not null
4. email       — text, not null
5. subject     — text, not null
6. message     — text, not null
7. is_read     — boolean, default false, not null

After the SQL, add a 3-line plain-English explanation of what each column does
and why we chose these data types — pretend you're explaining it to someone
who has never seen SQL before.
```

> **After Cursor / ChatGPT gives you the SQL:**
> In Supabase → left sidebar → **SQL Editor** → paste → **Run**. Then go to **Table Editor** and confirm the `form` table appears with all 7 columns.

**What this changes in your project:**
- 🟧 **HTML / CSS / JS:** nothing yet — we're only creating the database.
- 🟪 **Supabase (cloud):** a new table named `form` with 7 columns is created in your project.

**Why the prompt is written this way (prompt-engineering lens):**
- ✅ **Persona** — "Postgres expert helping a complete beginner" → output is correct *and* explained simply.
- ✅ **Numbered, exact specs** — every column has a name + type → AI cannot guess wrong.
- ✅ **Demand the "why"** (Rule #5) → you learn while it builds.

**Verify:** in Supabase Table Editor you can see the `form` table; click "Insert row" to confirm the columns are correct, then cancel — we'll insert through our website.

---

## (Optional) Prompt 1b — Lock the table down with Row-Level Security

> Run this only if you want production-grade security from day one. Otherwise the trainer will disable RLS for the classroom and we'll cover hardening in homework.

```text
For my Supabase table "form", please write the exact SQL to:
1. Enable row-level security on the table.
2. Add a policy that allows ANYONE (the "anon" role) to INSERT a new row.
3. Add a policy that allows ONLY authenticated users to SELECT rows.

Explain each policy in one sentence so a beginner can repeat it back.
```

**Why this prompt:** "anon insert, authenticated select" is the standard pattern for "public submits, admin reads". Asking the AI to *explain each policy* converts a config step into a lesson.

---

# Prompt 2 — Wire the contact form to Supabase

**Goal:** stop the contact form from lying. Right now it says "message sent" and the data evaporates. After this prompt, every submission lands as a real row in your Supabase table.

**Before you paste:** open **Supabase → Project Settings → API** and copy two values into a sticky note:
- **Project URL** (looks like `https://abcd1234.supabase.co`)
- **anon public key** (a long string starting with `eyJ…`)

**Prompt — copy into Cursor Chat (Agent mode):**

```text
You are pair-programming with a complete beginner. We are switching the
contact form on contact.html from a "fake success message" to a "real
database insert" using Supabase.

Please do the following, in order:

1. In contact.html, inside the <head>, add the Supabase JS client from the
   official CDN:
       <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

2. Create a NEW file called supabase-config.js in the project root with EXACTLY
   this content (we will paste real keys ourselves afterwards):

       const SUPABASE_URL = "PASTE_YOUR_URL_HERE";
       const SUPABASE_ANON_KEY = "PASTE_YOUR_ANON_KEY_HERE";
       const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

3. In contact.html, link supabase-config.js BEFORE script.js (order matters,
   because script.js will use the supabaseClient variable created in
   supabase-config.js).

4. In script.js, update the EXISTING contact-form submit handler (do not
   duplicate it, do not delete the existing validation):
   - Read the four field values: full_name, email, subject, message.
   - Call:  await supabaseClient.from('form').insert([{ full_name, email,
            subject, message }])
   - If the response contains an error → keep the form visible and show a
     red error message: "Something went wrong. Please try again."
   - If the response is successful → hide the form and show the existing
     green success message, then reset the form fields.
   - console.log the full response object so we can debug if needed.

5. Add a plain-English comment above every new block of code so a beginner
   reading the file later can follow the logic.

Important guardrails:
- Do NOT remove or duplicate the existing submit listener — extend it.
- Do NOT change any element IDs or the success message text.
- Do NOT change the file names.
```

> **After Cursor finishes:** open `supabase-config.js` and replace the two `PASTE_..._HERE` strings with your real URL and anon key. Save. Reload `contact.html` → submit a test message → switch to Supabase Table Editor → your row appears live. 🎉

**What this changes in your project:**
- 🟧 **HTML** (`contact.html`): one new `<script>` tag for the Supabase CDN in `<head>`; one new `<script src="supabase-config.js">` placed **before** the existing `<script src="script.js">`.
- 🟦 **CSS** (`styles.css`): nothing changes (the red error message can re-use existing styles).
- 🟨 **JavaScript** (`script.js`): the existing submit handler is extended — it now reads form values, calls Supabase, and branches into success / error paths.
- 🟩 **New file:** `supabase-config.js` holding your project URL + anon key.
- 🟪 **Supabase (cloud):** every submission creates a new row in the `form` table.

**Why the prompt is written this way (prompt-engineering lens):**
- ✅ **Explicit script order** ("BEFORE script.js") — this is the #1 invisible bug for beginners; calling it out in the prompt avoids it entirely.
- ✅ **Both success AND error paths** specified up-front — production-grade UX in one shot.
- ✅ **"Append, do not duplicate"** — a *scope-lock* phrase that stops the AI from rewriting your Part 1 code.
- ✅ **"Do not change element IDs"** — Part 2 prompts later depend on those IDs; we're future-proofing.

**Verify:**
1. Submit a test message on `contact.html` — green success appears.
2. Switch to Supabase → Table Editor → refresh → your row is there with `is_read = false`.
3. Open browser DevTools → Console → you should see the response object logged.

---

# Prompt 3 — The Debug Template (use this every single time something breaks)

**Goal:** turn every red error in the browser console into a one-minute fix + a one-line lesson.

**Prompt — copy into Cursor Chat whenever you hit an error:**

```text
You are pair-programming with a complete beginner. I am stuck.

I'm getting this exact error in [filename] when I try to [action]:

[paste the exact red text from the browser console here, nothing reworded]

Here is the relevant file (or feel free to read it directly):
[paste the file contents OR @-mention the file in Cursor]

Please:
1. Explain in ONE sentence what this error actually means, in plain English.
2. Identify the root cause.
3. Give me the precise fix — show ONLY the corrected lines, not the whole file.
4. Tell me ONE habit I could adopt to avoid this class of error in future.
```

**Why the prompt is written this way (prompt-engineering lens):**
- ✅ **Persona reminder** — keeps the language beginner-friendly.
- ✅ **Exact error text** — paraphrasing loses the keyword the AI needs to recognise the bug.
- ✅ **"Corrected lines, not the whole file"** — surgical fix; less risk of accidental regressions.
- ✅ **"One habit"** — turns every bug into a 30-second learning loop. Compounds over a career.

**How to find the exact error text:**
- Press `F12` (or right-click → **Inspect**) → **Console** tab.
- The red lines are errors. Click the small triangle to expand. Copy the *first* red line — that's the original error; everything else is the trail.

---

# Prompt 4 — Build the Admin Dashboard

**Goal:** create a private page (`admin.html`) where you can see every contact-form message, mark it as read, and filter "unread only" — all reading live from your Supabase table.

**Prompt — copy into Cursor Chat (Agent mode):**

```text
You are pair-programming with a complete beginner. We are adding an admin
dashboard to the existing portfolio. Please reuse the same design system from
the existing styles.css — no new fonts, no new colour scheme.

Create a NEW page admin.html in the project root.

NAV (re-use, do not redesign):
- Copy the EXACT navigation bar from index.html.
- Add a 5th link "Admin" pointing to admin.html.
- Mark the "Admin" link as active ONLY on admin.html (don't touch the other
  4 pages' nav for now).
- Link styles.css, then supabase-config.js, then script.js — in that order
  (because script.js uses supabaseClient).

PAGE STRUCTURE:
1. Page header: h1 "Inbox" + small subtitle "All contact-form messages,
   newest first."
2. A toolbar row directly below the header:
   - LEFT: a total-message counter (e.g., "📬 12 messages").
   - RIGHT: a toggle labelled "Unread only" (use a styled checkbox).
3. A responsive grid of message cards:
   - CSS Grid, auto-fit, minmax(320px, 1fr), 20px gap.

EACH MESSAGE CARD:
- Top row: subject (h3, 18px) on the left; relative time on the right
  (e.g., "2 hours ago"). Use a small helper function timeAgo(date) for the
  relative time string.
- Sender line: "full_name · email" (14px, muted colour).
- Body: the message text (15px). Clamp to a maximum of 4 lines using
  -webkit-line-clamp (with the standard overflow:hidden + display:-webkit-box
  setup). Show ellipsis if it overflows.
- Bottom-right: a "Mark as Read" button (small, primary style, matches
  existing button styles in styles.css).
- VISUAL STATES:
    - UNREAD card → 4px solid left border in soft purple (#a78bfa) + white
      background.
    - READ card   → grey left border + soft grey background (#f3f4f6) + 60%
      opacity to feel "out of the way".

JAVASCRIPT (append to script.js — do NOT remove or alter the existing
hamburger or contact-form code; only run the admin code if the inbox grid
element actually exists on the current page):

1. On admin.html load, fetch all rows from the "form" table ordered by
   created_at DESC, then render them as cards in the grid.
2. Update the total counter with the row count.
3. Wire the "Mark as Read" button on each card:
   - Run a Supabase UPDATE setting is_read = true for that row's id.
   - On success, update ONLY that one card's class / styles (no full reload,
     no re-fetch).
4. Wire the "Unread only" toggle:
   - When checked, hide every card that already has the "is-read" class
     (use a CSS class on the grid, not a re-fetch).
5. Use a tiny helper function timeAgo(date) that returns "just now", "5
   minutes ago", "2 hours ago", "3 days ago", "21 May 2026".
6. Comment every block in plain English.

Important guardrails:
- Reuse colours, spacing and shadow tokens from the existing :root variables.
- Do not break any existing page or behaviour.
```

**What this changes in your project:**
- 🟧 **HTML** (`admin.html`, new): a brand-new page with the same nav (plus an "Admin" link), a header, a toolbar, and an empty grid container that JavaScript fills.
- 🟦 **CSS** (`styles.css`): a new `/* === ADMIN === */` section is appended with `.admin-grid`, `.admin-card`, `.admin-card.is-read`, the line-clamp rule, and the "Unread only" filter rule.
- 🟨 **JavaScript** (`script.js`): a new block (gated on "does the admin grid exist on this page?") that fetches rows from Supabase, renders cards, handles "Mark as Read" updates, and toggles the unread filter. Plus a small `timeAgo()` helper.
- 🟪 **Supabase:** every "Mark as Read" click sends an `UPDATE` query; the inbox load sends a `SELECT`.

**Why the prompt is written this way (prompt-engineering lens):**
- ✅ **"Reuse the existing nav and design tokens"** — keeps the admin page visually consistent without making the AI redesign anything.
- ✅ **Two crystal-clear visual states (read / unread)** — descriptive UX, not vague "make it look like an inbox".
- ✅ **"Update only that one card"** — teaches *targeted DOM updates* instead of expensive full reloads.
- ✅ **"Only run the admin code if the grid element exists"** — defensive script.js that won't break the other 4 pages.

**Verify:**
1. Open `contact.html` and submit 3 test messages.
2. Open `admin.html` — all 3 appear, newest first, with the purple "unread" border.
3. Click "Mark as Read" on one — the card greys out instantly (no reload). Refresh Supabase Table Editor — `is_read` is `true` for that row.
4. Tick "Unread only" — the marked-as-read card disappears from view. Untick — it returns.

---

# Prompt 5 — Protect your secrets BEFORE the first `git push`

**Goal:** make sure your Supabase URL + anon key (and any future secret) never end up on GitHub.

**Prompt — copy into Cursor Chat:**

```text
You are pair-programming with a complete beginner. We're about to push this
project to a PUBLIC GitHub repository, so we need to protect secrets first.

Please:

1. Create a .gitignore file in the project root that ignores ALL of the
   following:
       supabase-config.js     # contains my API keys
       .DS_Store              # macOS clutter
       Thumbs.db              # Windows clutter
       node_modules/          # if we ever install npm packages
       .env                   # generic secrets file
       .env.local             # local-only secrets

2. Create a supabase-config.example.js file with the SAME shape as
   supabase-config.js but EMPTY string values, so any other developer (or
   future me on a new laptop) knows which two variables to define:

       const SUPABASE_URL = "";
       const SUPABASE_ANON_KEY = "";
       const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

3. Write a 2-sentence plain-English explanation, addressed to a beginner,
   of why we never commit API keys to GitHub — even when they are labelled
   "anon" or "public".
```

**What this changes in your project:**
- 🟧 **HTML / CSS / JS:** nothing in the website code.
- 🟩 **New files:** `.gitignore` (tells Git "skip these"), `supabase-config.example.js` (a safe template for other developers).
- 🚫 **Side-effect when you run `git push`:** `supabase-config.js` will stay on your laptop only — it never leaves.

**Why the prompt is written this way (prompt-engineering lens):**
- ✅ **Safety first** — runs *before* `git init` so secrets never enter Git history at all.
- ✅ **Both files in one prompt** — `.gitignore` AND `.example.js` are part of the same convention, so we ask for both together.
- ✅ **Demand the "why" in plain English** — students remember the reason, not just the recipe.

**Verify:** the file tree now shows `.gitignore` and `supabase-config.example.js`. Open both — confirm they look correct.

---

## 🛠️ Push the project to GitHub (terminal commands — not a prompt)

> First, on github.com, click **New repository** → name it `aanya-portfolio` → set it to **Public** → leave "Add a README" UNCHECKED → **Create repository**. Copy the HTTPS URL it shows you.

Open Cursor's built-in terminal (`Ctrl + ` ` — the backtick key) and run, one at a time:

```bash
git init                                  # 1. mark this folder as a Git project
git branch -M main                        # 2. rename the default branch to "main"
git add .                                 # 3. stage every file (except those in .gitignore)
git commit -m "Initial portfolio + Supabase integration"   # 4. snapshot it
git remote add origin https://github.com/<your-username>/aanya-portfolio.git
git push -u origin main                   # 5. send everything up
```

Refresh GitHub → your code is live in the repo. From now on the update loop is just `add → commit → push`.

---

## 🚀 Deploy live with GitHub Pages (six clicks)

1. Your repo on GitHub → **Settings** tab.
2. Left sidebar → **Pages**.
3. **Build and deployment → Branch:** switch from `None` to `main`, folder `/ (root)` → **Save**.
4. Wait 30–60 seconds → refresh the page.
5. A green box appears with your live URL: `https://<your-username>.github.io/aanya-portfolio/`
6. Click it. **You are live on the internet.** Share it.

**Your update loop forever after:**

```bash
git add .
git commit -m "describe what you changed"
git push
# wait ~30s, refresh the live URL
```

---

# Bonus — Rapid Prototyping: Timer App (10 minutes, deployed)

> The portfolio took two sessions. This proves the *prompting* skill transfers to any small idea.

**Setup:** in Cursor → **File → New Window → Open Folder** → create a folder called `timer-app` on your Desktop → open it. (Brand-new project, clean slate.)

## Prompt 6 — Timer v1 (build it)

```text
You are pair-programming with a complete beginner. I want a single-page web
timer app.

Create 3 files in the current folder — index.html, styles.css, script.js —
and link styles.css in <head> and script.js just before </body>.

Features:
- One big input field where the user types a number of SECONDS.
- Three buttons: Start, Pause, Reset.
- A big circular display in the centre showing the remaining time as MM:SS.
- When the timer reaches 0, play a short alarm sound from this royalty-free
  URL (use a hidden <audio> element):
       https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg

Visual style:
- Dark background #0f172a, neon green digits #34d399, soft glow on the digits.
- Everything centred on the page; works on mobile (use flexbox + responsive
  font sizes with clamp()).

Quality bar:
- It must work properly with NO console errors when I open index.html.
- Comment every block of code in plain English so a beginner can read it.
```

**What this changes:** creates 3 brand-new files (`index.html`, `styles.css`, `script.js`) in the `timer-app` folder — none of your portfolio files are touched.

**Why this prompt:** persona + numbered features + exact resource URL + explicit quality bar ("no console errors") leaves zero ambiguity.

## Prompt 7 — Timer v2 (iterate without breaking)

```text
Improvements to the existing timer (do NOT break existing behaviour):

1. Replace the alarm sound URL with this jingle instead:
       https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg

2. When the timer is under 10 seconds remaining, the circular display should
   gently pulse a red glow once per second (use a CSS @keyframes animation,
   only triggered by a JS class toggle).

3. On hover, all three buttons should lift 2px and gain a subtle drop shadow.

4. Add a small "Quick presets" row directly above the input field, with four
   pill-shaped buttons: 1m, 5m, 10m, 25m. Clicking a preset fills the input
   with the equivalent number of seconds (60, 300, 600, 1500).
```

**Why this prompt:** classic **anchor + delta** iteration — four changes, scope locked with "do not break existing behaviour".

**Deploy it:** repeat the GitHub + Pages steps. Two deployed apps in one day. 🚀

---

## 🎓 You did it

You're now a **full-stack developer who ships in a single session.**

Pick one piece of homework:
1. Add a "Reply via Email" button on each admin card (`mailto:` link pre-filled with the sender's email + subject prefixed with "Re:").
2. Add **Supabase Auth** so only *you* (when logged in) can see `admin.html`.
3. Buy a custom domain on Namecheap and point it at your GitHub Pages URL.
4. Build a brand-new tiny app entirely from prompts — and deploy it before you sleep.
