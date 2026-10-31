# ETG Newsletter Signup Worker

A tiny Cloudflare Worker that sits between the **Stay Updated** form on the ETG Midwest Webflow site and the shared **newsletter service** ([ptoney514/newsletter](https://github.com/ptoney514/newsletter), Worker `newsletter`). Signups land on that service's `etg-alumni` list.

Until 2026-10-31 this Worker added contacts to a Resend Audience. That needed Resend's Marketing plan, which has been dropped; newsletters now go out through the newsletter service instead.

## What it does

1. Receives a `POST` from the form on `https://etgmidwest.com` (and the Webflow staging subdomain).
2. Validates the email address server-side.
3. Calls `env.NEWSLETTER.subscribe({ list: "etg-alumni", email, source: "etgmidwest.com" })` through a Service Binding. The call stays inside Cloudflare: no public endpoint, no API key.
4. Returns a JSON response that the front-end uses to show success / error UI. Signing up twice is a success, not an error.

The form contract (field `Email`, JSON `{ ok, message }` / `{ error }`) is unchanged, so the Webflow embed needs no edits.

## Deploy

Both Workers must be in the same Cloudflare account, and `newsletter` must already be deployed (it is).

```bash
cd workers/etg-newsletter-signup
npx wrangler deploy
```

The old `RESEND_API_KEY` secret is no longer used. Remove it once the new version works:

```bash
npx wrangler secret delete RESEND_API_KEY
```

## Test it

On the live site, type an email and click Subscribe. You should see "✓ Subscribed!". Then, from the newsletter repo:

```bash
npm run nl -- lists     # etg-alumni's subscribed count goes up by one
```

## If something breaks

- **CORS errors in browser console** → check `ALLOWED_ORIGINS` in `src/index.js` includes the domain you're testing from. Update + redeploy.
- **500 "Server not configured"** → the `NEWSLETTER` Service Binding is missing. Check `wrangler.toml` and redeploy.
- **502 "Something went wrong"** → the newsletter service failed or doesn't have an `etg-alumni` list. Check `npx wrangler tail etg-newsletter-signup` and `npm run nl -- lists` in the newsletter repo.
