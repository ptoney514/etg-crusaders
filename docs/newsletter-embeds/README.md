# April 2026 Newsletter — Webflow Embed Bundle

The Resend email HTML for the April 2026 newsletter, split into chunks that fit Webflow's Code Embed character limit (~10,000 chars per embed).

## Files

- `head-styles.html` — the responsive `<style>` block. Paste **once** into Page Settings → Custom Code → "Inside `<head>` tag".
- `embed-part-1.html` — first Code Embed body (header → coach's message → Dinner Bash → donation chart). 9.8 KB.
- `embed-part-2.html` — second Code Embed body (Chase Thompson spotlight). 8.4 KB.
- `embed-part-3.html` — third Code Embed body (Amanda Woodring spotlight → club logos → footer). 9.6 KB.

All three embed parts together reconstitute the original Resend email exactly.

## Paste sequence in Webflow Designer

1. **Open** the April 2026 page in Designer (the one duplicated from the Golf Tournament page).
2. **Strip the page body** between nav and footer — delete any duplicated golf tournament sections.
3. **Add a wrapper Section** with background `#F3F4F6` and zero padding.
4. **Drop a Code Embed** into the section → open editor → paste contents of `embed-part-1.html` → **Save & Close**.
5. **Drop a second Code Embed** directly below → paste `embed-part-2.html` → Save & Close.
6. **Drop a third Code Embed** directly below → paste `embed-part-3.html` → Save & Close.
7. **Open Page Settings** (gear icon next to page name in Pages panel) → scroll to **Custom Code** → paste contents of `head-styles.html` into the **"Inside `<head>` tag"** textarea → Save.
8. **Publish** to staging only (`etgmidwest.webflow.io`) and verify at:
   `https://etgmidwest.webflow.io/members/news/april-2026-dinner-bash-and-alumni-spotlight`

## What to expect in the Designer canvas

Code Embed contents do **not** render in the Designer canvas — you'll see three gray placeholder boxes. To preview, click the **eye icon** (Preview mode) at the top of the Designer, or open the staging URL after publishing.

## Changes from the Resend source

Two minor edits made before splitting:
- Removed `{{{RESEND_UNSUBSCRIBE_URL}}}` placeholder and the surrounding "Unsubscribe" link from the footer (it was a Resend template variable that wouldn't resolve outside the email).
- Removed comment headers from the embeds to free up character budget.

## If you need to edit the content later

Edit the source `.html` files in this folder, then re-paste into the corresponding Code Embed in Webflow. Webflow does not import the file directly — copy/paste only. Keep the files in sync.

---

# Home Page Newsletter Hub

A separate, single Code Embed that replaces all six legacy newsletter blocks AND the standalone "Stay Updated" section on the home page.

## Files

- `home-hub-styles.html` — CSS for the section. Paste **once** into Home → Page Settings → Custom Code → "Inside `<head>` tag".
- `home-newsletter-hub.html` — the section markup. Paste into a single Code Embed where the old newsletter blocks used to live.

## Paste sequence

1. **Open** the Home page in Designer.
2. **Backup first.** Top-right Settings → Backups → Create Backup → label `pre-home-newsletter-redesign`.
3. **Delete the old newsletter region** — six full newsletter blocks (Feb 2026 → April 2025), the "View All Previous Newsletters" link, and the old "Stay Updated" form section.
4. **Drop one Code Embed** in their place.
5. Paste the contents of `home-newsletter-hub.html` → **Save & Close**.
6. **Open Home Page Settings** → Custom Code → paste `home-hub-styles.html` into "Inside `<head>` tag" → Save.
7. **Fill in 4 PDF URLs** in the Code Embed (find/replace):
   - `{{PDF_FEB_2026}}` → Feb 2026 PDF URL
   - `{{PDF_DEC_2025}}` → Dec 2025 PDF URL
   - `{{PDF_OCT_2025}}` → Oct 2025 PDF URL
   - `{{PDF_AUG_2025}}` → Aug 2025 PDF URL

   Grab these from the existing newsletter blocks' "Read More" links *before* deleting them in step 3 — keep them in a sticky note. Easier than digging through Asset Manager later.
8. **Publish** to staging only and verify at `https://etgmidwest.webflow.io/`.

## Cover images

The embed already references three live Webflow CDN URLs that exist on the site today:

- April 2026 featured row → `ETG-newsletter-bg-16x9.png` (the existing dark newsletter background)
- Feb 2026 → `etg-256x256.png` (ETG logo)
- Dec 2025 → `ETG-newsletter-bg-16x9.png`
- Oct 2025 / Aug 2025 → `etg.png` (ETG logo)

These are the same placeholder assets the legacy site uses. If you want proper per-issue cover artwork later, upload to Webflow Assets, copy the new URL, and find/replace the corresponding `cdn.prod.website-files.com/...` URL in the Code Embed. No other changes needed.

## Form action

The Stay Updated form is wired with `method="POST"` and `data-wf-page-id="63e1902437bdfc04277ce3f7"` so it submits through Webflow's standard form handler. Submissions hit the same destination as Webflow's native forms — but be aware: forms inside a Code Embed do **not** automatically appear in Webflow's Forms dashboard. If you want submission collection, the cleanest move is to:

- Either rebuild this single form as a real Webflow Form Block on top of the embed (drag a Form Block into the embed's parent section, position it absolutely over the Stay Updated card area), or
- Wire it to an external endpoint (Resend, Mailchimp, ConvertKit) by changing the `<form action="...">` attribute.

For now, the form is functional but submissions will only go through Webflow's generic handler — confirm with one test submission after publish.
