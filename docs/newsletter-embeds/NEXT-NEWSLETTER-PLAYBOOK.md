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
4. **Build the email in Resend.** Assemble the issue as a single email document
   (`resend-email.html`) — full doctype, the responsive `<style>` block, a hidden preheader div,
   and the `{{{RESEND_UNSUBSCRIBE_URL}}}` token in the footer. Images should point at their R2
   CDN URLs, which are public and load fine in email.

   A broadcast can be created over the API instead of pasting into the editor. The key lives at
   `~/.config/resend/key` (mode 600, no trailing newline):

   ```bash
   KEY=$(cat ~/.config/resend/key); curl -s -X POST https://api.resend.com/broadcasts \
     -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
     --data-binary @payload.json
   ```

   Payload needs `name`, `audience_id`, `from`, `subject`, `html`.

   - **Use the `Test-Pernell` audience (`a77a77b8-19c7-4bec-929f-60ce2f17a33f`) when creating**, so
     an accidental send goes nowhere. Switch to `ETG Newsletter`
     (`df337721-c9b5-4296-aac1-9f3c0d91dbf0`) only when it is genuinely ready.
   - Send **from `pernell@tnebasketball.com`** — that domain is verified. `etgmidwest.com` is
     registered in Resend but its status is `not_started`, so it cannot send.
   - **Use `curl`, not Python `urllib`** — Cloudflare blocks the default urllib user-agent with a
     403 / `error code: 1010` that looks like an auth failure but is not.
   - Don't set `preview_text` if the HTML already carries a preheader div; you'll get both.

5. Update `Resend build` as it moves. Save the finished HTML body — it is also the input to Phase 1.

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

Source images live on Cloudflare R2, bucket **`tne-bucket`**, served at `https://cdn.tnebasketball.com/<key>`. Per-issue images go under `newsletter/<month>-<year>/`; evergreen assets live under `newsletter/headers/`.

Upload with wrangler (already authenticated):

```bash
npx wrangler r2 object put "tne-bucket/newsletter/<month>-<year>/<name>.jpg" \
  --file=<local.jpg> --content-type=image/jpeg --remote
```

**`--remote` is required** — without it wrangler writes to a local simulation and the CDN 404s.

Use the R2 URL in the `src` attributes while building the **Resend email**. Later, when converting to Webflow embeds, upload each to Webflow Assets via `asset_tool > upload_image_by_url` and swap the `src` to the Webflow CDN URL.

**Gmail attachments can't be fetched by MCP.** The Gmail server returns an attachment id but exposes no download tool, so any photo Doug attaches has to be saved out of Gmail by hand before it can be uploaded. Photos he sends as *links* can be pulled with curl directly.

Reuse evergreen assets from June (header banner, donation chart/QR, sponsor logos, ETG small logo). Only new player photos and per-issue rosters need fresh uploads.

---

## Phase 3 — Duplicate the article page (Data API, no Designer needed)

**This is a Data API call — it works without the Designer open.** Earlier versions of this playbook
said to duplicate by hand in the Designer; that is not necessary.

`data_pages_tool > create_page` with:

- `duplicateOf`: the **April 2026** page id `69d7004022c47fdd772c25d4` (April is the canonical
  template — always duplicate April, not the most recent issue)
- `parentFolderId`: `67e49048a2f72c721aec28bb` (the `/members/news/` folder)
- `slug`: the clean kebab slug, set correctly here
- `draft: true` — so a stray site publish can't push a half-built page live
- `seo.title`, `seo.description`, `openGraph.titleCopied/descriptionCopied: true`

Setting the slug in this call **avoids Scar Tissue #6 entirely** — there is never an auto-generated
em-dash slug to clean up.

Remember to flip `draft: false` (via `update_page_settings`) before the staging publish, or the page
will not publish at all.

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

## Phase 5 — Update the home page hub (Data API, no Designer needed)

**No longer a manual paste** — Code Embed content is writable now (Scar #3).

1. Edit `docs/newsletter-embeds/home-newsletter-hub.html` so:
   - Featured row points at the new issue (slug, title, excerpt, "Latest — <Month> <Year>" pill)
   - The previous featured drops to the secondary "Read" row
   - The old secondary row falls off
2. Find the hub embed — `data_element_tool > query_elements` on the **Home page**
   (`63e1902437bdfc04277ce3f7`) filtering `type: "HtmlEmbed"`. Two come back; the hub is the one
   **without** the `global-styles` class. Confirm by reading its code before writing.
3. Write it with `data_element_settings_tool > set_settings`, key `code`.
4. If the hub CSS changed, that still lives in Home → Page Settings → Custom Code, or use
   `data_scripts_tool`.
5. Publish to staging and verify.

**Verify against the rendered page, not just a string search** — `.etg-news-hub` appears first in
the page `<head>` CSS. Match on `<section class="etg-news-hub"` to find the actual markup.

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

> **Scars #1 and #2 no longer apply to the newsletter workflow.** They are properties of
> `whtml_builder`, which we no longer use — content now goes into Code Embeds (see #3). Keep them
> documented for any future work that does build real Webflow elements from HTML.

### 1. `whtml_builder` mangles `<img>` tags

When you pass HTML containing `<img>` tags to `whtml_builder`:
- **Bare `<img>` (no `<a>` wrapper) gets DROPPED ENTIRELY.** No DOM node, nothing.
- **`<img>` inside `<a>` survives** but the tag becomes `imgraw` and `src` becomes `data-raw-src`. `<imgraw>` is not a real HTML tag so browsers don't render it.

**Fix:** always wrap bare `<img>` in `<a>` in source HTML, and run the imgraw → img conversion sweep after every batch of inserts. (See Phase 4 step 9.)

### 2. `whtml_builder` loses `class` attributes

CSS classes you write in source HTML do NOT come through as classes — Webflow generates new auto-names. So **any styling that depends on class selectors in the page `<head>` will not work via whtml_builder.**

**Implication:** The home hub MUST be a Code Embed (it relies on `.etg-news-hub`, `.etg-featured` etc.). The article pages can use whtml_builder because all their styling is inline.

### 3. ~~HtmlEmbed inner code is not writable via MCP~~ — FIXED as of MCP 2.0.1

**This scar is gone.** Code Embed content is now both readable and writable headlessly:

- read: `data_element_settings_tool > get_settings` with `value_type: "code"`
- write: `data_element_settings_tool > set_settings`, key `code`, via `static_text.value`

Create new ones with `data_element_builder` (`element_schema: { type: "HtmlEmbed" }`), then set the
code in a second call — `settings` at creation time only applies to DOM-type elements.

**This is now the preferred way to build the article page, replacing `whtml_builder` entirely**,
which also makes Scars #1 and #2 irrelevant for this workflow (see below).

### 4. Designer MCP requires a foregrounded Designer tab

Background, minimized, or idle tabs → every Designer-backed MCP call fails with "Unable to connect
to Webflow Designer."

**`asset_tool` is a Designer tool, not a Data API tool** — despite the name it needs the Designer
open, and its own description says so ("Designer Tool - Upload an image..."). An earlier version of
this playbook claimed it worked without the Designer. It does not.

What genuinely works with the Designer closed: `data_pages_tool`, `data_sites_tool`, and the other
`data_*` REST tools — including `create_page` (Phase 3) and `publish_site` (Phase 6).

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
