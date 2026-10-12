# ETG Midwest

## Where things live

**The live site is Webflow, not this repo.** `etgmidwest.com`, site id `63e1902437bdfc4cd77ce3f6`.
Most production work happens in the Webflow Designer via MCP. The Next.js app in this repo is a
separate/parallel build — do not assume a change here is reflected on the live site.

## Newsletter work

The alumni newsletter. **Every other month** — Aug, Oct, Dec, Feb, Apr, Jun — confirmed by Doug
(2026-06-24: *"We go every other month"*). Odd months are off months by design, not misses.

Within that rhythm the timing floats: Doug collects alumni spotlight responses and sends material
when he has it, usually the last week of the prior month, sometimes in pieces. Don't chase a date.

```
Doug sends content  →  Claude drafts stories  →  build + send in Resend  →  Webflow via MCP
```

**Run it with the `etg-newsletter` skill** (`.claude/skills/etg-newsletter/`). It covers intake through
ship records, with the review gates and helper scripts. Built from `oct-2026/PROCESS-TRACE.md`.

Three places, each with a distinct job:

| What | Where | Use it for |
|------|-------|-----------|
| **Content planning** | [ETG Newsletter Pipeline](https://app.notion.com/p/96f806adfd5b41f788ccce5e558bcd1b) (Notion) | Upcoming issues, who the alumni spotlight is, photo/roster/coach-message status, blockers |
| **Shipped-issue history** | [`docs/newsletter-embeds/NEWSLETTER-LOG.md`](docs/newsletter-embeds/NEWSLETTER-LOG.md) | "Did we ship in <month>?" — one row per issue, live URLs, cadence at a glance |
| **How to build one** | [`docs/newsletter-embeds/NEXT-NEWSLETTER-PLAYBOOK.md`](docs/newsletter-embeds/NEXT-NEWSLETTER-PLAYBOOK.md) | Step-by-step recipe, the Scar Tissue section, and the per-issue process changelog |

Per-issue embed source lives in `docs/newsletter-embeds/<month>-<year>/`.

### When an issue ships, update all three

1. Notion row → Status `Done`, fill in Live URL
2. `NEWSLETTER-LOG.md` → new row
3. Playbook → append a Process Changelog entry

Skipping these is what caused the June 2026 issue to ship to production without ever being
committed, and its README to describe a slug and hub layout that did not match what actually
went live.

### Known gotchas

- **Webflow `whtml_builder` mangles `<img>` tags.** Bare `<img>` is dropped entirely; `<img>`
  inside `<a>` survives but becomes an invalid `<imgraw>` tag. Full fix recipe in the playbook.
- **Code Embed inner HTML is not writable via MCP.** The home page hub must be pasted manually
  in the Designer.
- **Designer MCP calls need a foregrounded Designer tab** or they fail with "Unable to connect to
  Webflow Designer." `data_*` REST calls work regardless — but **`asset_tool` is a Designer tool
  despite the name** and does need the Designer open.
- **Distribution (since Oct 2026):** Claude creates a Resend *draft* (Test-Pernell). Pernell sends
  Doug a test for approval and does any real send himself. Doug also emails the live article link
  to his Google Group. Pernell owns the Resend contacts — never import, edit, or send.

## Conventions

- Fonts: Oswald (headings), Barlow (body), Barlow Condensed (labels/nav)
- Colors: `--etg-red: #c8102e`, `--etg-gold: #d4a843`
- Design direction: "Arena Intensity" — dramatic lighting, sharp contrast, kinetic energy
