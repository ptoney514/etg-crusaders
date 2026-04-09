# ETG Newsletter Signup Worker

A tiny Cloudflare Worker that sits between the **Stay Updated** form on the ETG Midwest Webflow site and the **Resend Audiences API**. The Resend API key is held server-side as an encrypted Worker secret so it is never exposed in the page source.

## What it does

1. Receives a `POST` from the form on `https://etgmidwest.com` (and the Webflow staging subdomain).
2. Validates the email address server-side.
3. Calls `POST https://api.resend.com/audiences/3e429105-40be-4190-9856-bb5471020695/contacts` with the email.
4. Returns a JSON response that the front-end uses to show success / error UI.
5. Treats "already subscribed" as a success so users never see a confusing error.

## Setup (one time)

You'll need a free Cloudflare account and Node 18+ installed locally.

### 1. Install Wrangler (Cloudflare's CLI)

```bash
cd workers/etg-newsletter-signup
npm install -g wrangler
```

### 2. Authenticate

```bash
wrangler login
```

This opens your browser, you sign in to Cloudflare, click Allow, and your terminal is authenticated. One-time only.

### 3. Set the Resend API key as a Worker secret

```bash
wrangler secret put RESEND_API_KEY
```

When prompted, paste your `re_...` Resend API key and hit enter. The key is encrypted and stored in Cloudflare's secret store. **It never gets committed to git, never appears in any file, and never reaches the browser.**

### 4. Deploy

```bash
wrangler deploy
```

Wrangler will print the live URL of the worker, something like:

```
https://etg-newsletter-signup.<your-subdomain>.workers.dev
```

**Copy this URL** — you'll paste it into the home page Code Embed in the next step.

### 5. Wire the form to the worker

Open `docs/newsletter-embeds/home-newsletter-hub.html`, find the line:

```html
<form id="etg-signup" data-endpoint="REPLACE_WITH_WORKER_URL">
```

Replace `REPLACE_WITH_WORKER_URL` with the URL Wrangler printed in step 4. Save.

Then in Webflow Designer, open the home page Code Embed → select all → paste the updated file → Save & Close → Publish.

### 6. Test it

On the live site, type your email and click Subscribe. You should see "✓ Subscribed!" in the form. Then check the audience in Resend (`https://resend.com/audiences/3e429105-40be-4190-9856-bb5471020695`) and confirm your address is there.

## Updating the worker later

Edit `src/index.js`, then re-run `wrangler deploy`. No need to touch the Webflow embed unless the URL changes.

## If something breaks

- **CORS errors in browser console** → check `ALLOWED_ORIGINS` in `src/index.js` includes the domain you're testing from. Update + redeploy.
- **500 "Server not configured"** → the `RESEND_API_KEY` secret was never set. Re-run step 3.
- **Form submissions land in Resend but the form UI shows an error** → likely a JSON parsing issue in the front-end JS. Check the Network tab in DevTools.

## Why a Worker instead of pasting the key into the embed

If the Resend API key were in the Code Embed, anyone right-clicking → View Source on `etgmidwest.com` could grab it and use it to send email from your account. Worker secrets keep the key server-side. The Worker is also free up to 100K requests/day on the Cloudflare free tier — way more than this site will ever need.
