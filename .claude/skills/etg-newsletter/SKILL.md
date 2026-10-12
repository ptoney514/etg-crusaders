---
name: etg-newsletter
description: Build and ship the ETG Crusaders alumni newsletter end to end — pull Doug Woodard's content from Gmail (spotlights, coach's message, team recaps, photos), draft the issue as Resend email HTML, create the Resend draft broadcast, build the etgmidwest.com article page and home hub in Webflow, publish, and record the ship. Use when Pernell says Doug sent newsletter content, asks to start/draft/build/publish a newsletter issue, asks whether there's a newsletter this month, or wants the site updated with a new issue. Issues run every other month (Feb, Apr, Jun, Aug, Oct, Dec).
---

# ETG alumni newsletter

Pipeline: **Gmail intake → draft email → Resend draft → (Doug approves) → Webflow page + hub → publish → ship records.**
Everything runs unattended except the three gates marked ⛔. Read `references/ids.md` for every ID and endpoint, and `references/editorial.md` before drafting.

Per-issue folder: `docs/newsletter-embeds/<mon-yyyy>/` (e.g. `oct-2026/`). The most recent issue folder is the template — copy its `resend-email.html`.

## 1. Intake
1. Find the last ship date in `docs/newsletter-embeds/NEWSLETTER-LOG.md`, then search Gmail with the intake query in `ids.md`. Read whole threads (`get_thread`, `PLAIN_TEXT`). Note any second spotlight still pending, deadlines Pernell promised, and edit permission.
2. Create `<mon-yyyy>/CONTENT.md`: a status table (one row per piece), the thread history, Doug's text **verbatim**, and an "Editorial decisions" list you fill in while drafting. Model it on the last issue's CONTENT.md.
3. Create the Notion pipeline row (Status In progress, Content received, Target month, Format Web article, Blockers).

## 2. Photos (attachments)
The Gmail connectors can't download attachments. Use this route, which needs no human:
1. Claude in Chrome: open the message (`viewUrl` from Gmail) → `find` "Add attachment to Drive <filename>" → click. A plain Chrome download lands on whichever machine runs Chrome, which may not be this Mac.
2. Drive connector: `search_files` `title contains '<name>'` → note `fileSize` → `download_file_content`. Large results get saved to a `tool-results/*.txt` file; small ones come back inline (write the base64 to a scratch file).
3. `python3 -P scripts/process_photo.py <saved file> <scratch>/<person>.jpg --expect-bytes <fileSize>`. This strips GPS and resizes. Look at the image before using it.
4. Upload to R2 (`ids.md`), then verify with `curl` on `<url>?cb=<timestamp>`.
   **Never request the final CDN URL before the upload.** The CDN caches a 404 for 4 hours at the Omaha edge. If it happens, upload under a new key.

## 3. Draft
1. Copy the last issue's `resend-email.html` and replace the content following `references/editorial.md`. Update the `<title>`, preheader, title bar, coach block, spotlights, program update (drop it if there's nothing) and giving block. Keep the footer `{{{RESEND_UNSUBSCRIBE_URL}}}`.
2. `curl` every reused URL (donate link, Webflow CDN images) and expect 200.
3. Render at desktop width and 375px: no horizontal scroll, and every image loads.
4. `python3 scripts/resend.py check`. If the key is missing it prints the `pbpaste` one-liner for Pernell. Then run `python3 scripts/resend.py create <email.html> "<Month YYYY>" "<Title>"`. It creates a **draft** on Test-Pernell with the standard from, reply-to and subject.

⛔ **Gate 1 — Pernell reviews.** Send him the draft (`SendUserFile`) and list the judgment calls: title, added lines, omitted figures, unconfirmed facts. Draft the review note to Doug (`editorial.md`) for him to paste.
⛔ **Gate 2 — Doug approves.** Pernell sends Doug a Resend **test** himself. Before the web build, re-read the thread for Doug's reply and apply his changes to `resend-email.html`. Then run `scripts/resend.py update-html <id> <file>`, which refuses unless the broadcast is still a draft.

## 4. Webflow (Data API — the Designer can stay closed)
1. `python3 scripts/split_embeds.py docs/newsletter-embeds/<mon-yyyy>/` writes `embed-part-N.html`, each ≤10 KB. Copy `head-styles.html` from the last issue.
2. `data_pages_tool > create_page` with `duplicateOf` the April template, `parentFolderId` set to the news folder, slug `<month>-<yyyy>-<title-kebab>`, `draft: true`, and the SEO title and description.
3. `data_element_tool > query_elements {type: HtmlEmbed}` on the new page returns the template's 3 embeds in page order. Write the parts with `data_element_settings_tool > set_settings` (key `code`). If there are more than 3 parts, add embeds with `data_element_builder` and set their code in a second call.
4. Home hub: edit `docs/newsletter-embeds/home-newsletter-hub.html`. The new issue becomes the featured card with the "Latest — <Mon YYYY>" pill. The previous featured issue moves to the "Read" row, and the old row drops off. Read the live hub embed's code first, then write the markup without the file's header comment.
5. `update_page_settings draft:false` → `publish_site publishToWebflowSubdomain:true` → check staging with `curl ?cb=`. Confirm the sections are in order, there's no leftover template content, the hub pill shows the new issue, and the images load.
6. Production: `publish_site` with the two **domain IDs**. Publishing is limited to once per minute, and a failed call restarts the minute. Wait with `until [ "$(date +%s)" -ge $T ]; do sleep 2; done`, not with repeated retries. Verify the apex and www domains with `?cb=`.

⛔ **Gate 3 — the real send is Pernell's.** Never send a broadcast, switch its audience, or import or edit contacts. `scripts/resend.py audiences` shows counts only. The live article link is also how Doug distributes to his Google Group.

## 5. Ship records (all four, the day it goes live)
1. Notion row: Status Done, Live URL, Webflow Live, clear Blockers.
2. `NEWSLETTER-LOG.md`: a new top row, and update the cadence line.
3. Playbook `NEXT-NEWSLETTER-PLAYBOOK.md`: append a Process Changelog entry covering what changed, what broke, time taken and any new scar tissue.
4. Commit on a new branch and open a PR. Ask before committing. The June issue went live without a commit.

If something new breaks or a new kind of content arrives, record it in the changelog entry and update this skill.
