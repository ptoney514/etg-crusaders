# June 2026 Newsletter — Webflow Embed Bundle

Resend email HTML for the June 2026 newsletter ("Alumni Spotlight + Summer Update"), split into **7 Code Embeds** that fit Webflow's ~10K-char limit per embed.

This issue is longer than April 2026 (3 embeds), so we needed more splits. Each part is a complete self-contained `<table>` wrapper, so layout doesn't break across embeds.

## Files

- `head-styles.html` — responsive `<style>` block. Paste **once** into Page Settings → Custom Code → "Inside `<head>` tag". (Same as April 2026 — if you cloned that page, the styles may already be there. Verify before re-pasting.)
- `embed-part-1.html` — Header banner → title bar → coach's message
- `embed-part-2.html` — Jadin Booth spotlight + star divider
- `embed-part-3.html` — Courtney Farmer spotlight
- `embed-part-4.html` — Spring Highlights header → Boys → Girls 15U → Girls 16U
- `embed-part-5.html` — Girls 17U (long roster)
- `embed-part-6.html` — Rosters header + Boys/Girls roster images + July schedule
- `embed-part-7.html` — Donation breakdown + QR/Donate Now + sponsor strip + footer

All seven parts together reconstitute the original Resend email.

## Changes from the Resend source

- Removed `{{{RESEND_UNSUBSCRIBE_URL}}}` link (template variable that wouldn't resolve outside email).
- Removed Resend `<!--$-->` markers, preheader hidden div, and `data-id="__react-email-column"` attributes for cleaner output.
- Removed the email's "View in browser" link from the footer (the page IS the browser view).
- Removed Resend's full-page wrapper tables — each embed is its own 600px-wide table so they stack cleanly when pasted as separate Code Embeds.

## Paste sequence in Webflow Designer

1. **Clone the April 2026 page.** In Pages panel → right-click the April 2026 page → Duplicate.
2. **Rename + set the slug** on the new page:
   - Name: `June 2026 — Alumni Spotlight and Summer Update`
   - Slug: `june-2026-summer-is-here-alumni-spotlight`
   - Make sure it lives under the `/members/news/` parent folder (id `67e49048a2f72c721aec28bb`).
3. **Strip the three old April Code Embeds** from the page body.
4. **Drop 7 Code Embeds** in order between nav and footer.
5. Paste files into embeds in order: `embed-part-1.html` → `embed-part-2.html` → ... → `embed-part-7.html`. Save & Close each.
6. **Page Settings → Custom Code → "Inside `<head>` tag"** → paste `head-styles.html`. If you cloned from April and the styles were already there, you can skip this — they're identical.
7. **Page SEO settings:**
   - Title tag: `June 2026 Newsletter — Alumni Spotlight + Summer Update | ETG Midwest`
   - Meta description: `Spotlights on Jadin Booth (Samford) and Courtney Farmer (Rockhurst), spring results from all six Crusader teams, the July schedule, and how to help close the $45K funding gap.`
   - Open Graph image: same banner as April for now, or upload the new banner from `https://cdn.tnebasketball.com/newsletter/headers/etg-header-banner.jpg`
8. **Publish to staging** (`etgmidwest.webflow.io`) and verify at:
   `https://etgmidwest.webflow.io/members/news/june-2026-summer-is-here-alumni-spotlight`
9. After visual review, publish to production.

## What to expect in the Designer canvas

Code Embed contents do **not** render in the Designer canvas — you'll see seven gray placeholder boxes. To preview, click the **eye icon** (Preview mode) at the top of the Designer, or open the staging URL after publishing.

## Home page hub update (do this separately)

When the article page is live and verified, update the home page newsletter hub:

1. Open the Home page in Designer.
2. **Backup first** — Settings → Backups → Create Backup → label `pre-june-2026-hub-rotation`.
3. Open the existing newsletter hub Code Embed (the single one that holds the issues stack).
4. **Select all → paste** the contents of `../home-newsletter-hub.html` (parent folder, not june-2026/).
5. **Update the styles** — Home → Page Settings → Custom Code → "Inside `<head>` tag" → replace with contents of `../home-hub-styles.html`. (One new CSS rule was added for the `.etg-pdf-row--article` variant used by the April row.)
6. The new home hub keeps the same `{{PDF_FEB_2026}}`, `{{PDF_DEC_2025}}`, `{{PDF_OCT_2025}}` placeholders — find/replace them with the same URLs you used in the original April-era hub. (Aug 2025 PDF row was removed.)
7. Publish to staging → verify at `https://etgmidwest.webflow.io/` → publish to production.

The new hub layout:

| Row | Issue | Link target | Badge |
|-----|-------|-------------|-------|
| Featured | June 2026 — Alumni Spotlight + Summer Update | `/members/news/june-2026-summer-is-here-alumni-spotlight` | Read Article → |
| 2 | April 2026 — Dinner Bash + Alumni Spotlight | `/members/news/april-2026-dinner-bash-and-alumni-spotlight` | Read |
| 3 | Feb 2026 — The Game That Keeps Giving | PDF | PDF |
| 4 | Dec 2025 — Lessons That Last a Lifetime | PDF | PDF |
| 5 | Oct 2025 — Where Champions Go Next | PDF | PDF |
