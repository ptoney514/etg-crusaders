# Newsletter Log

One row per issue. **Update this the day an issue ships** — it is the only place that answers "did we send in <month>?" without digging through the live site.

Companion docs:
- [`NEXT-NEWSLETTER-PLAYBOOK.md`](NEXT-NEWSLETTER-PLAYBOOK.md) — how to build and ship an issue
- [ETG Newsletter Pipeline](https://app.notion.com/p/96f806adfd5b41f788ccce5e558bcd1b) (Notion) — content planning for *upcoming* issues: spotlight subjects, photo/roster status, blockers

---

## Shipped issues

| Issue | Title | Format | Live URL / file | Shipped | Resend send | Notes |
|-------|-------|--------|-----------------|---------|-------------|-------|
| Jun 2026 | Alumni Spotlight + Summer Update | Web article (7 embeds) | [`/members/news/june-2026-summer-is-here-alumni-spotlight`](https://etgmidwest.com/members/news/june-2026-summer-is-here-alumni-spotlight) | 2026-06-03 | *unconfirmed* | Jadin Booth (Samford) + Courtney Farmer (Rockhurst). Longest issue to date. Hit every Webflow MCP scar — see playbook. |
| May 2026 | — | — | — | **skipped** | — | No issue produced. Gap in the monthly cadence. |
| Apr 2026 | Dinner Bash + Alumni Spotlight | Web article (3 embeds) | [`/members/news/april-2026-dinner-bash-and-alumni-spotlight`](https://etgmidwest.com/members/news/april-2026-dinner-bash-and-alumni-spotlight) | 2026-04-08 | *unconfirmed* | First web-article issue; canonical template we duplicate from. |
| Feb 2026 | The Game That Keeps Giving / Help ETG Build Tomorrow's Leaders | PDF | `newsletters/ETG Newsletter February 2026.pdf` | 2026-02-01 | *unconfirmed* | Kelsey Woodard (Davis), Sam Griesel. |
| Dec 2025 | Lessons That Last a Lifetime | PDF | `newsletters/ETG Newsletter 12_2025.pdf` | 2025-12-06 | *unconfirmed* | Holiday reflections + alumni updates. |
| Aug 2025 | Summer Recap and Alumni Spotlights | PDF | `newsletters/ETG Alumni Newsletter 08_2025.pdf` | 2025-08-01 | *unconfirmed* | Andy King, Kelsey Newman (Schlitz). |

### Open questions on the back catalog

- **Oct 2025** — the June README referenced a `{{PDF_OCT_2025}}` hub placeholder, but no Oct 2025 issue appears in `src/lib/newsletters.ts` and no matching PDF is in `newsletters/`. The untitled `newsletters/ETG Newsletter.pdf` may be it. **Confirm and add a row, or delete this note.**
- **Resend send data is unconfirmed for every row.** Dates above are *build/publish* dates derived from git and file timestamps, not Resend send receipts. Backfill the real send date, recipient count, and open rate from the Resend dashboard.

---

## What to capture each month

When an issue ships, fill in:

- **Shipped** — date the production publish went out
- **Resend send** — send date, recipients, open rate, click rate (from the Resend dashboard; nothing else in this repo has it)
- **Notes** — anything that went wrong, so the playbook changelog has raw material

---

## Cadence at a glance

```
2025:  Aug ●   Sep ○   Oct ?   Nov ○   Dec ●
2026:  Jan ○   Feb ●   Mar ○   Apr ●   May ○   Jun ●   Jul ○
```

`●` shipped · `○` no issue · `?` unconfirmed

**There is no target cadence, and the gaps are not misses.** Issues are client-driven: Doug sends
content when he has it, on no fixed schedule. An issue exists when content arrives. Don't read the
empty months as a backlog or set up reminders against them.
