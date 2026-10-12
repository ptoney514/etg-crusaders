# IDs, endpoints and people

## People
| Who | Role | Addresses |
|-----|------|-----------|
| Doug Woodard | Coach, sends content, final approver | `woodardbb75@gmail.com`, `doug@advisorgameplan.com` |
| Tyler Moseman | ETG Boys, cc'd on threads, writes the boys recap | `tmoseman@gmail.com` |
| Pernell Toney | Builds + sends; owns Resend audiences | `pernell@gmail.com` |

Gmail query for intake: `(from:woodardbb75@gmail.com OR from:doug@advisorgameplan.com OR from:tmoseman@gmail.com) after:<last ship date YYYY/MM/DD>`

## Webflow (site `63e1902437bdfc4cd77ce3f6`)
| Thing | ID |
|-------|----|
| Template page to duplicate (April 2026, always this one) | `69d7004022c47fdd772c25d4` |
| `/members/news/` folder | `67e49048a2f72c721aec28bb` |
| Home page | `63e1902437bdfc04277ce3f7` |
| Home hub embed | the HtmlEmbed **without** the `global-styles` class (Oct 2026: element `fd86fc83-90b1-2d46-d90c-c346a836d5aa`) — read its code before writing |
| Custom domain `www.etgmidwest.com` | `63e19943fb21e908c5e9762b` |
| Custom domain `etgmidwest.com` | `63e19943fb21e9dea7e9762a` |
| Staging | `https://etgmidwest.webflow.io` |

`publish_site.customDomains` takes **domain IDs**, not hostnames. If they change: `data_sites_tool > get_site`.

## Resend
| Thing | Value |
|-------|-------|
| Key | `~/.config/resend/key` |
| Test audience (draft default) | `Test-Pernell` `a77a77b8-19c7-4bec-929f-60ce2f17a33f` |
| ETG Newsletter audience | `df337721-c9b5-4296-aac1-9f3c0d91dbf0` (Pernell manages its contacts) |
| From / reply-to | `ETG Crusaders <pernell@tnebasketball.com>` / Doug |
| Name / subject | `Crusader Alumni Newsletter: <Month YYYY>` / `Crusaders Alumni Newsletter: <Month YYYY> — <Title>` |

## Images
- R2 bucket `tne-bucket`, served at `https://cdn.tnebasketball.com/<key>`; per-issue key `newsletter/<mon-yyyy>/<person>.jpg`
- Upload: `npx -y wrangler@4 r2 object put "tne-bucket/<key>" --file=<jpg> --content-type=image/jpeg --remote` (`--remote` is required; OAuth is saved locally)
- Evergreen images (banner, donation chart, QR, sponsor logos) live on the Webflow CDN; reuse the URLs from the last issue's email.
- Donate link: `https://checkout.square.site/merchant/MLRVBXAYN9BCX/checkout/P7Y5T4F3CJYGPW6L6G3SJT4C?src=webqr`

## Notion pipeline
Data source `collection://f9dbeec2-9704-4354-b767-69a6c01861da` (DB `96f806adfd5b41f788ccce5e558bcd1b`). Properties: Issue (title), Status (Not started / In progress / Done), Content received, Target month (1st of month), Format (Web article), Alumni spotlight, Coach message, Photos, Rosters, Schedule block, Stories drafted, Resend build, Webflow, Blockers, Live URL.
