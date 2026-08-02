# Next Newsletter Playbook

The step-by-step recipe for adding a new alumni newsletter to ETG Midwest, captured after the June 2026 issue shipped (which was painful).

**Read this before starting. Read the "Scar Tissue" section twice.**

---

## How an issue starts

**Issues are client-driven and land on no fixed schedule.** Doug sends content when he has it —
there is no monthly deadline to hit and no reason to chase one. An issue begins when content
arrives, not on a calendar date.

The full pipeline:

```
Doug sends content  →  Claude drafts stories  →  build + send in Resend  →  Webflow via MCP
   (irregular)          (Phase 0)                  (Phase 0)                 (Phases 1-6)
```

Phases 1–6 below cover only the last leg — taking finished Resend HTML and getting it onto the
website. That is the fiddly part, which is why it has the most detail here. It is not the start.

Track the whole thing in the [ETG Newsletter Pipeline](https://app.notion.com/p/96f806adfd5b41f788ccce5e558bcd1b)
Notion database — one page per issue.

---

## Prerequisites

- Content from Doug for the new issue (Phase 0), or finished Resend HTML in hand (Phase 1 onward)
- Webflow Designer access to the ETG Midwest site (`etgmidwest.com`)
- Claude with the Webflow MCP enabled (Designer app + Data API)

---

## Phase 0 — Content intake and story drafting

1. **Log the intake.** Create a page in the Notion pipeline DB, set `Content received` to the date
   Doug sent it. That date is the issue's real start.
2. **Inventory what arrived.** Doug's batches vary — some issues come with photos and rosters,
   some don't. Set the `Photos` / `Rosters` / `Coach message` / `Schedule block` fields to reflect
   what's actually in hand, and put anything still missing in `Blockers` so it's visible.
3. **Draft the stories with Claude.** Raw notes → written alumni spotlights and section copy.
   Set `Stories drafted` to `Drafting with Claude`, then `Final`.
4. **Build the email in Resend.** Update `Resend build` as it moves.
5. Save the finished HTML body. That is the input to Phase 1.

Distribution is Doug's — he sends out a link. There is no broadcast to a list and no engagement
data to record, so don't go looking for send stats.

> **Fill in as you go:** the specifics of steps 3–4 (how stories get prompted, whether the Resend
> email is built in the dashboard or from a template) aren't documented yet. Next issue, write down
> what you actually do here — it's the least-repeatable part of the process.

---

## Phase 1 — Local prep

1. Make a new folder: `docs/newsletter-embeds/<month>-<year>/` (e.g. `aug-2026/`).
2. Copy `june-2026/` as your starting point. You're going to overwrite the body content but keep the structure.
3. Open the Resend HTML and:
   - Remove `{{{RESEND_UNSUBSCRIBE_URL}}}` and the surrounding unsubscribe link from the footer.
   - Remove the "View in browser" link (the page IS the browser view).
   - Remove the preheader hidden div block (`<div style="display:none;...">`).
4. Extract the `<style>` block into `head-styles.html` (identical to June's — it almost never changes).
5. Split the body into chunks ≤10KB each at safe `<table>` boundaries. **NEVER split at a `<tr>` boundary.** Each chunk = a complete standalone `<table>` wrapper. Save as `embed-part-1.html` … `embed-part-N.html`. Verify with `wc -c *.html` — all under 10KB.
6. **Wrap every `<img>` tag in an anchor.** This is critical:
   ```html
   <a href="#" style="text-decoration:none;cursor:default;pointer-events:none;display:block;" onclick="return false;">
     <img alt="..." src="..." style="..." />
   </a>
   ```
   For images that link to a full-size view (rosters), keep the real `<a href="<full-size-url>">` wrapper — don't double-wrap.

---

## Phase 2 — Upload images to Webflow Assets

**Before any HTML inserts, upload every image to Webflow Assets via MCP.**

Source images live on Cloudflare R2 at `https://cdn.tnebasketball.com/newsletter/...`. Upload each via `asset_tool > upload_image_by_url`. The response gives you a Webflow CDN URL — use THAT in the `src` attributes of your HTML chunks, not the R2 URL.

Reuse evergreen assets from June (header banner, donation chart/QR, sponsor logos, ETG small logo). Only new player photos and per-issue rosters need fresh uploads.

---

## Phase 3 — Duplicate the article page in Designer

1. Open Webflow Designer for ETG Midwest. Keep the tab in the foreground.
2. In the Pages panel, **right-click the April 2026 page → Duplicate**. (We always duplicate April, not the most recent — April is the canonical template.)
3. Rename the duplicate. **Don't worry about the slug yet** — Webflow's auto-slug for em-dashes is ugly; we'll fix it via MCP.

---

## Phase 4 — MCP-driven inserts

This is where Claude (or you with the MCP) does the heavy lifting. **All steps below are MCP calls.**

1. Confirm Designer is connected: `de_page_tool > get_current_page`. If it errors, the Designer tab isn't foregrounded — fix that.
2. List pages to grab the new page id: `data_pages_tool > list_pages`.
3. Clean up the slug + SEO: `data_pages_tool > update_page_settings` with:
   - `slug`: clean single-hyphen kebab, e.g. `aug-2026-fall-preview`
   - `seo.title`: full title with site name
   - `seo.description`: excerpt for OG preview
   - `openGraph.titleCopied: true, descriptionCopied: true`
4. Switch Designer canvas to the new page: `de_page_tool > switch_page`.
5. Find the existing 3 April HtmlEmbed elements on the page: `element_tool > query_elements` with `element_filter: { type: "HtmlEmbed" }`.
6. Find the parent block of those embeds: `get_all_elements` (look for `Block "Div Block 11"` inside `Section 3`). Save its element id — this is the insertion target.
7. **Insert new parts FIRST.** For each part-N.html, call `whtml_builder` with parent_element_id = the Div Block 11 id, creation_position = "append", html = the part's HTML content. Do these in order, 1 → N.
8. **Remove the 3 old April HtmlEmbed elements** via `element_tool > remove_element` (batch all 3 in one call).
9. **Fix the imgraw bug** (see Scar Tissue #1 below). Every image will have been converted by Webflow. The fix recipe:
   - `query_elements` with `element_filter: { tag: "imgraw" }` — get all imgraw elements.
   - For each, `get_attributes` with `name: "data-raw-src"` — capture the real URL.
   - For each: `set_tag` to `img`, `add_or_update_attribute` to set `src`, `remove_attribute` to drop `data-raw-src`.
10. Publish to staging: `data_sites_tool > publish_site` with `publishToWebflowSubdomain: true, customDomains: []`.
11. Verify at `https://etgmidwest.webflow.io/members/news/<slug>` with **Cmd-Shift-R** (hard refresh, bypass cache).

---

## Phase 5 — Update the home page hub

**The home hub is a Code Embed (HtmlEmbed) — its inner HTML is NOT writable via MCP. This part is manual.**

1. Open `docs/newsletter-embeds/home-newsletter-hub.html`. Edit it so:
   - Featured row points at the new newsletter (slug, title, excerpt, "Latest — <Month> <Year>" pill)
   - The previous featured drops to the secondary "Read" row
   - The old secondary row falls off
2. In Webflow Designer, switch to the Home page.
3. Find the newsletter hub Code Embed (in `Block "News"` near the top of the page). Double-click it.
4. Select all, paste the new contents of `home-newsletter-hub.html`. Save & Close.
5. If the hub CSS changed, paste the new `home-hub-styles.html` contents into Home → Page Settings → Custom Code → "Inside `<head>` tag".
6. Publish to staging (same as Phase 4 step 10), verify with Cmd-Shift-R.

---

## Phase 6 — Promote to production

```
data_sites_tool > publish_site
  site_id: 63e1902437bdfc4cd77ce3f6
  publishToWebflowSubdomain: false
  customDomains: ["www.etgmidwest.com", "etgmidwest.com"]
```

Verify live URLs:
- `https://etgmidwest.com/` (hub)
- `https://etgmidwest.com/members/news/<new-slug>` (article)

---

## Scar Tissue (READ BEFORE STARTING)

### 1. `whtml_builder` mangles `<img>` tags

When you pass HTML containing `<img>` tags to `whtml_builder`:
- **Bare `<img>` (no `<a>` wrapper) gets DROPPED ENTIRELY.** No DOM node, nothing.
- **`<img>` inside `<a>` survives** but the tag becomes `imgraw` and `src` becomes `data-raw-src`. `<imgraw>` is not a real HTML tag so browsers don't render it.

**Fix:** always wrap bare `<img>` in `<a>` in source HTML, and run the imgraw → img conversion sweep after every batch of inserts. (See Phase 4 step 9.)

### 2. `whtml_builder` loses `class` attributes

CSS classes you write in source HTML do NOT come through as classes — Webflow generates new auto-names. So **any styling that depends on class selectors in the page `<head>` will not work via whtml_builder.**

**Implication:** The home hub MUST be a Code Embed (it relies on `.etg-news-hub`, `.etg-featured` etc.). The article pages can use whtml_builder because all their styling is inline.

### 3. HtmlEmbed inner code is not writable via MCP

You cannot programmatically write the HTML inside an HtmlEmbed element. The `code` setting is not exposed. **Don't remove an HtmlEmbed without a backup plan** — once it's gone, you have to manually re-paste in Designer.

### 4. Designer MCP requires a foregrounded Designer tab

Background, minimized, or idle tabs → every `de_*` or `element_*` MCP call timeouts. Data API calls (`data_*`, `asset_tool`) work fine without the Designer being open.

### 5. Snapshots don't apply page `<head>` CSS

`element_snapshot_tool` renders elements without the page-level `<style>` block. **Don't trust snapshots for final class-based styling verification.** Publish to staging and Cmd-Shift-R the actual URL.

### 6. Em-dashes in page names break the slug

Webflow turns `—` into `----` (four hyphens). Always fix the slug via `update_page_settings` after duplication.

### 7. Code Embed body cap is ~10K chars

Split at `<table>` boundaries, never at `<tr>` boundaries.

---

## Time budget (if everything goes right)

- Phase 1 (local prep + image upload): ~10 minutes
- Phase 2 (asset uploads): ~1 minute (parallel MCP calls)
- Phase 3 (duplicate page): 30 seconds in Designer
- Phase 4 (MCP inserts + imgraw fix + staging publish): ~5 minutes
- Phase 5 (home hub manual paste): ~2 minutes in Designer
- Phase 6 (production publish): 30 seconds

Total: **~20 minutes** if you follow this playbook. The June 2026 issue took ~90 minutes because we hit every scar listed above for the first time.

---

## Process changelog

**Append a new entry every issue. Never rewrite an old one** — the point is to see how the process drifted and why.

Template to copy:

```
### <Month Year>

- **What changed:**
- **What broke:**
- **Time taken:** (vs. ~20 min budget)
- **New scar tissue:** (add to the section above if it will recur)
```

---

### June 2026

- **What changed:** First issue with the playbook itself — everything above was written during this issue. Split grew from 3 embeds (April) to 7 because the issue ran long. Home hub redesigned: PDF rows dropped entirely in favor of web-article rows only, with older issues pushed to the archive page.
- **What broke:** All seven scars in the section above, discovered the hard way. The `imgraw` bug (#1) was the worst — images silently vanished or rendered as an invalid tag with no error.
- **Time taken:** ~90 minutes.
- **New scar tissue:** Scars #1–#7 above all originate here.
- **Drift to watch:** The shipped slug (`june-2026-summer-is-here-alumni-spotlight`) did not match what the issue README specified, and the shipped hub layout dropped the PDF rows the README still described. Both were corrected after the fact. **Write the README to match what shipped, not what you planned.**

---

### April 2026

- **What changed:** First web-article issue — prior issues were PDF-only. Established the 3-embed structure and the `/members/news/<slug>` page pattern that everything since duplicates from.
- **What broke:** Not recorded at the time (this changelog did not exist yet).
- **Time taken:** Unknown.
- **New scar tissue:** None recorded.
