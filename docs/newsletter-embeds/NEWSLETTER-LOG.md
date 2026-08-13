# Newsletter Log

One row per issue. **Update this the day an issue ships** — it is the only place that answers "did we send in <month>?" without digging through the live site.

Companion docs:
- [`NEXT-NEWSLETTER-PLAYBOOK.md`](NEXT-NEWSLETTER-PLAYBOOK.md) — how to build and ship an issue
- [ETG Newsletter Pipeline](https://app.notion.com/p/96f806adfd5b41f788ccce5e558bcd1b) (Notion) — content planning for *upcoming* issues: spotlight subjects, photo/roster status, blockers

---

## Shipped issues

| Issue | Title | Format | Live URL / file | Shipped | Notes |
|-------|-------|--------|-----------------|---------|-------|
| Aug 2026 | Another Summer in the Books | Web article (6 embeds) | [`/members/news/august-2026-another-summer-in-the-books`](https://etgmidwest.com/members/news/august-2026-another-summer-in-the-books) | 2026-08-12 | 15U girls won the Adidas 3SSB National Championship — the issue's lede. Spotlights: Nick Ferrarini (Washburn), Brooke Delano (Roncalli Catholic). First issue built entirely over the Data API with the Designer closed. |
| Jun 2026 | Alumni Spotlight + Summer Update | Web article (7 embeds) | [`/members/news/june-2026-summer-is-here-alumni-spotlight`](https://etgmidwest.com/members/news/june-2026-summer-is-here-alumni-spotlight) | 2026-06-03 | Jadin Booth (Samford) + Courtney Farmer (Rockhurst). Longest issue to date. Hit every Webflow MCP scar — see playbook. |
| Apr 2026 | Dinner Bash + Alumni Spotlight | Web article (3 embeds) | [`/members/news/april-2026-dinner-bash-and-alumni-spotlight`](https://etgmidwest.com/members/news/april-2026-dinner-bash-and-alumni-spotlight) | 2026-04-08 | First web-article issue; canonical template we duplicate from. |
| Feb 2026 | The Game That Keeps Giving / Help ETG Build Tomorrow's Leaders | PDF | `newsletters/ETG Newsletter February 2026.pdf` | 2026-02-01 | Kelsey Woodard (Davis), Sam Griesel. |
| Dec 2025 | Lessons That Last a Lifetime | PDF | `newsletters/ETG Newsletter 12_2025.pdf` | 2025-12-06 | Holiday reflections + alumni updates. |
| Oct 2025 | Where Champions Go Next | PDF | `newsletters/ETG Newsletter 10_2025.pdf` | 2025-10-08 | Spotlights: Triston Simpson (2016) and Clare Tokheim (2009). Opens with the Crusaders' 1993 founding and partner history, plus the first ETG Youth tournament (Dec 12–14, Iowa West Fieldhouse). Arrived from Tina Gould as a Google Doc; Pernell converted it to PDF, which is why the file had no month in its name until 2026-08-12. |
| Aug 2025 | Summer Recap and Alumni Spotlights | PDF | `newsletters/ETG Alumni Newsletter 08_2025.pdf` | 2025-08-01 | Andy King, Kelsey Newman (Schlitz). |

`Shipped` dates are build/publish dates derived from git and file timestamps.

### Back catalog — resolved

**Oct 2025 confirmed (2026-08-12).** It was the untitled `newsletters/ETG Newsletter.pdf`, now
renamed `ETG Newsletter 10_2025.pdf` to match the others. Confirmed from the Gmail thread "ETG
Midwest Alumni Newsletter": Tina Gould sent the Google Doc on 2025-10-07, Pernell converted it to
PDF and posted it 2025-10-08, Doug replied "Love the headline!!!" on 2025-10-09.

The title `Where Champions Go Next` comes from the pre-June home hub listing, not from the PDF
itself — the document has no headline of its own. Treat it as the site's title for the issue rather
than something printed on the newsletter.

With Oct 2025 in place, the every-other-month pattern is unbroken from Aug 2025 forward.

**Known gap:** Oct 2025 is not in `src/lib/newsletters.ts` or `public/newsletters/` in the local
Next.js app. That app is a parallel build, not the live site, so this does not affect production —
but the app's archive is missing this issue.

### Not tracked

**No email engagement stats.** Doug distributes the issue by sending out a link — there is no
Resend broadcast to a list, so there are no recipient counts, open rates, or click rates to
capture. Don't add columns for them.

---

## What to capture each issue

- **Shipped** — date the production publish went out
- **Notes** — anything that went wrong, so the playbook changelog has raw material

---

## Cadence

**Every other month, by design.** Doug, 2026-06-24: *"We go every other month and did one in June
so next newsletter will be in August."*

```
2025:  Aug ●   Sep ○   Oct ●   Nov ○   Dec ●
2026:  Jan ○   Feb ●   Mar ○   Apr ●   May ○   Jun ●   Jul ○   Aug ●   Sep ○   Oct →
```

`●` issue · `○` off month by design · `→` next expected

Eight consecutive on-cycle issues, no misses. Doug independently described the cadence the same way
back on 2025-08-20 — *"we wouldn't have to bug you every other month which is how often these"* —
almost a year before confirming it again in June 2026.

The odd months are not gaps or misses — they're the off months. Within that rhythm the exact timing
still floats, because it depends on when Doug finishes collecting spotlight responses. He typically
sends material in the last week of the prior month.

Note the pattern makes **Oct 2025 very likely to exist** — it's the one slot that breaks an
otherwise perfect Aug/Oct/Dec/Feb/Apr/Jun/Aug sequence. See the open question above.
