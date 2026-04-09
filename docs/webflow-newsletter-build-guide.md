# Webflow Build Guide — Newsletter Hub + April 2026 Article

Open Webflow Designer for **ETGMidwest** (`etgmidwest.com`) and have this guide on a second screen. Follow it top to bottom. Total time should be 60-90 minutes.

> **Before you start:** turn on **Backups → Create backup** in Webflow (Settings menu in the top-right of Designer). Label it `pre-newsletter-redesign`. This is your undo button if anything goes sideways.

---

## PHASE A — Build the April 2026 article page

**Goal:** A new standalone page at `/members/news/april-2026-dinner-bash-and-alumni-spotlight` that mirrors the Resend email you sent.

### A1. Duplicate the Golf Tournament page as a template

1. In the **Pages** panel (left sidebar, top icon), expand the `members → news` folder.
2. Right-click `ETG Midwest Crusaders Annual Fundraising Golf Tournament` → **Duplicate**.
3. The duplicate appears below it. Click the gear icon next to it → **Page Settings**.
4. Set:
   - **Name:** `April 2026 — Dinner Bash + Alumni Spotlight`
   - **Slug:** `april-2026-dinner-bash-and-alumni-spotlight`
   - **Title Tag:** `April 2026 — Dinner Bash + Alumni Spotlight | ETG Midwest`
   - **Meta Description:** *(paste the lead paragraph: "This month we are sharing with you the schedules for this year's boys and girls teams, plus an invitation to our April 28 Dinner Bash at Cascio's Restaurant.")*
   - **Open Graph Title / Description:** ✓ "Same as SEO" checkboxes
5. Click **Save**.

### A2. Replace the hero image

1. Click on the page name in the Pages panel to open it in the Designer canvas.
2. Click the existing hero image at the top → in the **Settings** panel (right sidebar) click **Replace image** → upload the Dinner Bash artwork from your Resend email screenshot. Set **Alt text:** `April 2026 ETG Crusaders Dinner Bash flyer`.

### A3. Replace the headline + body content

1. Click the existing page H1 → change the text to:
   ```
   DINNER BASH + ALUMNI SPOTLIGHT
   ```
2. Click the byline area → change to:
   ```
   By Coach Woodard  ·  April 21, 2026
   ```
3. Click the body rich text block. Delete the existing paragraphs. Paste in:

   ```
   This month we are sharing with you the schedules for this year's boys and
   girls teams. As you can see it is very ambitious but is essential if you
   are involved in a shoe circuit program.

   One of our important supplementary funding events is the April 28 Dinner
   Bash at Cascio's Restaurant. We would love to have former Crusaders there
   to support this year's teams — as well as support our two guest speakers,
   Othello Meadows (Crusader Alum, Class of 1994) and Kristi Woodard
   (Wittry) (Crusader Alum, Class of 2002).
   ```

### A4. Add the Alumni Spotlight section (build once, save as a symbol)

You're going to build the Othello Meadows block, then convert it to a symbol so Kristi reuses the same component, and so future newsletters can drop it in.

1. Below the rich text block, drag in a **Section** from Add panel (left sidebar `+`).
2. Inside it, drag in a **Container** → inside that, a **Div Block**. Name it `alumni-spotlight` in the Navigator.
3. Inside `alumni-spotlight`, add:
   - **H2** with text: `ALUMNI SPOTLIGHT`. Apply class `section-heading-newsletter` (Style panel: paste these styles)
     - Font: Oswald, weight 700, size 36px, letter-spacing 0.04em, color white, text-transform uppercase
     - Margin bottom 32px
   - **Div Block** named `alumni-card`. Set it to flex, row, gap 24px, align-items flex-start.
     - Inside `alumni-card`:
       - **Image** placeholder (square, ~120px, border-radius 8px) — alt `Othello Meadows`
       - **Div Block** named `alumni-meta`, flex column, gap 4px:
         - **H3:** `OTHELLO MEADOWS` — Oswald 24px white uppercase
         - **Div:** `Class of 1994` — Barlow Condensed 13px, color `#c8102e`, letter-spacing 0.12em uppercase
   - **Rich Text Block** named `alumni-qa`. This is where the Q&A goes.
4. Inside `alumni-qa`, paste the Q&A pattern (you can adjust copy after):
   ```
   What's your favorite Crusader memory?
   ─────────────────────────────────────
   [Othello's answer paragraph]

   How did the program shape your life after basketball?
   ─────────────────────────────────────
   [Othello's answer paragraph]

   What advice do you have for current Crusaders?
   ─────────────────────────────────────
   [Othello's answer paragraph]
   ```
5. In the rich text editor, select each question line → set it to **H4** style. In the Style panel for the H4 class, set: Barlow Condensed, 14px, weight 700, color `#c8102e`, letter-spacing 0.08em, text-transform uppercase, margin-top 24px, margin-bottom 8px.
6. **Convert to symbol:** in the Navigator, right-click `alumni-spotlight` div → **Create Component** → name it `Alumni Spotlight` → Save.
7. **Reuse for Kristi:** drag the `Alumni Spotlight` component from the Components panel below the first one. Click into the instance, change the image, change `OTHELLO MEADOWS` → `KRISTI WOODARD (WITTRY)`, change `Class of 1994` → `Class of 2002`, swap the Q&A copy.

### A5. Add the Stay Updated CTA at the page bottom

You'll build this once now, then convert it to a symbol so the home page can reuse it. **Don't skip the symbol conversion** — it's the whole point of building it here first.

1. Below the second alumni card, drag in a **Section**. Background color `#0a0a0a`. Padding 64px top + bottom.
2. Inside, **Container** → **Div Block** named `stay-updated-card`:
   - Background `#111111`, border `1px solid rgba(255,255,255,0.06)`, border-radius 12px, padding 48px
   - Max width 560px, margin auto
3. Inside `stay-updated-card`:
   - **H2:** `STAY UPDATED` — Oswald, 56px, weight 700, white, line-height 0.95, letter-spacing -0.01em
   - **Paragraph:** `Join the ETG newsletter for alumni stories, game recaps, and ways to give.` — Barlow, 16px, weight 400, color `rgba(255,255,255,0.55)`, margin-top 16px, max-width 360px
   - **Form Block** (drag from Add panel):
     - **Email Input:** placeholder `your@email.com`, background `#1a1a1a`, no border, white text, height 56px, padding-left 20px, border-radius 6px, font Barlow 15px. Placeholder color `rgba(255,255,255,0.30)`.
     - **Submit button:** label `SUBSCRIBE`, background `#c8102e`, color white, height 56px, font Oswald 14px weight 700, letter-spacing 0.08em, uppercase, border-radius 6px. Hover: background `#a00d25`, box-shadow `0 0 24px rgba(200,16,46,0.4)`.
   - **Small text** below form: `No spam. Unsubscribe anytime.` — Barlow Condensed 12px, color `rgba(255,255,255,0.35)`, letter-spacing 0.06em, uppercase, margin-top 16px
4. **Form action:** click the parent Form Block → in the right panel → **Form Settings** → set the action to whatever your existing newsletter form uses. (If you don't know it, open the current home page's Stay Updated form in a separate tab and copy the action URL from its Form Settings.)
5. **Convert to symbol:** in Navigator, right-click `stay-updated-card` → **Create Component** → name it `Stay Updated Card` → Save.

### A6. Publish the article page to staging

1. Top-right of Designer → **Publish** → ✓ `etgmidwest.webflow.io` (staging only — uncheck production for now) → **Publish to selected domains**.
2. Open `https://etgmidwest.webflow.io/members/news/april-2026-dinner-bash-and-alumni-spotlight` in a new tab. Verify it loads, hero image shows, both alumni cards render, Stay Updated form is visible.

---

## PHASE B — Replace the home page newsletter region

**Goal:** Delete six bloated newsletter blocks + the bottom Stay Updated section, replace with one tight Newsletter Hub.

### B1. Delete the old stuff

1. Open the **Home** page in Designer.
2. In Navigator, find the section that contains the February 2026 newsletter block. Click it. Verify in the canvas that it's the right one.
3. Hold Shift and click each subsequent newsletter section (Dec 2025, Oct 2025, Aug 2025, June 2025, April 2025) **plus** the "View All Previous Newsletters" link section **plus** the "STAY UPDATED" signup section that's the last block before the footer.
4. Press **Delete**. (If shift-select doesn't work cleanly, delete them one at a time top to bottom.)

### B2. Insert the new Newsletter Hub section

1. Where you just deleted those sections, drag in a new **Section**. Settings:
   - Background `#0a0a0a`
   - Padding 96px top, 96px bottom
2. Inside, drop a **Container** (1200px max width).
3. Inside the container, add a **Div Block** named `newsletter-hub`. Set it to:
   - Display: Grid
   - Columns: 1fr 1.4fr (left narrower, right wider)
   - Gap: 64px
   - Align-items: start

### B3. Build the eyebrow

Above the grid (still inside the container), add a **Div Block** named `section-eyebrow`:
- Display flex, gap 12px, align center, margin-bottom 48px
- Inside: small **Text Block** `EVERYTHING TO GAIN  /  THE NEWSLETTER` — Barlow Condensed 12px, color `#c8102e`, letter-spacing 0.2em, weight 700, uppercase
- After the text, a thin **Div** (height 1px, flex 1, background `rgba(200,16,46,0.3)`)

### B4. Left column — drop in the Stay Updated symbol

1. From the **Components** panel, drag the `Stay Updated Card` symbol (built in A5) into the left grid cell. Done. Zero rebuild work.

### B5. Right column — issues stack

In the right grid cell, add a **Div Block** named `issues-stack`, flex column, gap 0.

#### B5a. "Latest" badge

- Add a **Div Block** named `latest-pill`:
  - Inline-flex, padding 6px 14px, border `1px solid #c8102e`, border-radius 999px, background transparent, margin-bottom 24px
  - Inside, **Text Block** `LATEST — APR 2026` — Barlow Condensed 11px, weight 700, color `#c8102e`, letter-spacing 0.12em, uppercase

#### B5b. Featured row (April 2026)

1. Add a **Link Block** named `featured-row`. Set link to **Page → April 2026 — Dinner Bash + Alumni Spotlight** (the page you built in Phase A — it should appear in the dropdown).
2. Inside the link block:
   - Display flex, row, gap 24px, align-items flex-start, padding 24px 0, border-bottom `1px solid rgba(255,255,255,0.08)`
   - **Image** (square cover, 120×120, border-radius 6px, object-fit cover) — point at the Dinner Bash hero asset you uploaded in A2. Alt: `April 2026 newsletter cover`.
   - **Div Block** `featured-meta`, flex column, gap 8px, flex 1:
     - **Text Block** `APR 2026` — Barlow Condensed 11px `#c8102e` letter-spacing 0.12em uppercase
     - **H3** `DINNER BASH + ALUMNI SPOTLIGHT` — Oswald 22px weight 700 white uppercase line-height 1.1
     - **Paragraph** `Schedule reveal, April 28 Dinner Bash at Cascio's, plus Q&As with Othello Meadows and Kristi Woodard (Wittry).` — Barlow 14px color `rgba(255,255,255,0.55)` line-height 1.6
     - **Text Block** `READ ARTICLE  →` — Barlow Condensed 12px weight 700 `#c8102e` letter-spacing 0.08em uppercase, margin-top 8px
3. **Hover state for `featured-row`:** in Style panel select **Hover** → set background `rgba(255,255,255,0.02)`, transition all 200ms ease.

#### B5c. PDF rows (Feb 2026, Dec 2025, Oct 2025, Aug 2025)

These four are nearly identical. Build the first one, then duplicate three times and edit copy.

1. Below `featured-row`, add a **Link Block** named `pdf-row`. Set link to **URL** → paste the existing Feb 2026 PDF URL (you can grab it from the current home page's Feb 2026 "Read More" link before you delete it — or from the Asset Manager in the right sidebar). ✓ **Open in new tab**.
2. Inside `pdf-row`:
   - Display flex, row, gap 20px, align-items center, padding 20px 0, border-bottom `1px solid rgba(255,255,255,0.06)`
   - **Image** (square 80×80, border-radius 4px, object-fit cover) — point at the Feb 2026 cover asset
   - **Div Block** `pdf-meta`, flex column, gap 4px, flex 1:
     - **Text Block** `FEB 2026` — Barlow Condensed 11px `rgba(255,255,255,0.45)` letter-spacing 0.12em uppercase
     - **H4** `The Game That Keeps Giving` — Oswald 18px weight 600 white line-height 1.2
   - **Div Block** `pdf-badge`:
     - Padding 6px 12px, border `1px solid rgba(255,255,255,0.2)`, border-radius 4px
     - Inside, **Text Block** `PDF` — Barlow Condensed 11px weight 700 `rgba(255,255,255,0.7)` letter-spacing 0.1em
3. Hover state for `pdf-row`: background `rgba(255,255,255,0.02)`, `pdf-badge` border-color `#c8102e`, badge text color `#c8102e`. Transition 200ms.
4. Right-click `pdf-row` → **Duplicate** → 3 times.
5. Edit each duplicate's URL, cover image, month label, and headline:
   - **Row 2:** Dec 2025 PDF, Dec 2025 cover, `DEC 2025`, `Lessons That Last a Lifetime`
   - **Row 3:** Oct 2025 PDF, Oct 2025 cover, `OCT 2025`, `Where Champions Go Next`
   - **Row 4:** Aug 2025 PDF, Aug 2025 cover, `AUG 2025`, `Building Champions`

#### B5d. View Full Archive button

Below the last `pdf-row`:
1. Add a **Div Block** `archive-cta`, display flex, justify-content flex-end, margin-top 32px.
2. Inside, **Link Block** styled as a ghost button:
   - Padding 14px 28px, border `1px solid rgba(255,255,255,0.2)`, border-radius 4px, background transparent
   - Text `VIEW FULL ARCHIVE  →` — Barlow Condensed 12px weight 700 white letter-spacing 0.1em uppercase
   - Link to: **Page → Newsletters** (the existing `/members/newsletters` page)
   - Hover: border-color `#c8102e`, color `#c8102e`, background `rgba(200,16,46,0.05)`. Transition 200ms.

### B6. Mobile responsiveness check

1. Click the **Tablet** breakpoint icon at the top of the Designer canvas.
2. Click `newsletter-hub` div → change Grid columns to `1fr` (single column). Increase gap to 48px.
3. Click the **Mobile Landscape** breakpoint → verify everything still stacks correctly. The featured row's flex direction should switch to column (image above text). To do this, click `featured-row` at this breakpoint and set flex-direction to `column`.
4. Click **Mobile Portrait** → verify. Reduce hub eyebrow font-size to 11px, section padding to 64px top/bottom.

### B7. Publish to staging

1. **Publish** → ✓ `etgmidwest.webflow.io` only → **Publish**.
2. Open `https://etgmidwest.webflow.io/` in a new tab. Scroll down to where the newsletters used to be. You should see the new tight Newsletter Hub. Verify:
   - Eyebrow renders with red rule
   - Stay Updated form on the left, issues stack on the right
   - April 2026 row links to your new article page
   - All four PDF badges open the correct PDF in a new tab
   - View Full Archive button goes to `/members/newsletters`
3. Resize the browser window down to ~375px wide and confirm the columns stack and nothing overflows.

---

## PHASE C — Promote to production

Once you've eyeballed staging and you're happy:

1. **Publish** → ✓ `www.etgmidwest.com` AND `etgmidwest.com` → **Publish to selected domains**.
2. Open `https://www.etgmidwest.com/` and re-verify.
3. Open `https://www.etgmidwest.com/members/news/april-2026-dinner-bash-and-alumni-spotlight` to confirm the article is live.

## If something goes wrong

- **Layout broken on mobile:** the Tablet/Mobile breakpoints have their own style overrides. Adjust at the broken breakpoint, not at Desktop.
- **Form not submitting:** double-check the Form action URL matches the existing newsletter form. Worth keeping the old Stay Updated section visible until B7 just to copy its action.
- **Need to roll back:** Settings → **Backups** → restore the `pre-newsletter-redesign` backup you made at the top.

## What to ping me about

- Once Phase A is done and the article page is published to staging, send me the URL — I want to eyeball it before we touch the home page.
- If the alumni Q&A copy needs polishing, paste me the Resend email source and I'll rewrite the body for the web context.
- If you want to skip the manual styling and prefer me to also generate a global CSS embed snippet you can paste into Webflow's `<head>`, let me know — it'd cut the styling time roughly in half.
