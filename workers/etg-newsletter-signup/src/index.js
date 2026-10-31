/**
 * ETG Midwest — Newsletter Signup Worker
 *
 * Receives POSTs from the Stay Updated form on etgmidwest.com,
 * validates the email, and adds the contact to the "etg-alumni" list in the
 * shared newsletter service (ptoney514/newsletter).
 *
 * The call goes through a Service Binding (env.NEWSLETTER), so it stays inside
 * Cloudflare: no public endpoint, no API key, nothing exposed to the browser.
 *
 * Endpoint: POST /
 * Body:     application/x-www-form-urlencoded with field "Email"
 *           OR application/json { "email": "..." }
 * Returns:  200 { ok: true } on success or "already subscribed"
 *           400 { error: "..." } on bad input
 *           502 { error: "..." } when the newsletter service fails
 */

const NEWSLETTER_LIST = "etg-alumni";
const SIGNUP_SOURCE = "etgmidwest.com";

const ALLOWED_ORIGINS = new Set([
  "https://etgmidwest.com",
  "https://www.etgmidwest.com",
  "https://etgmidwest.webflow.io",
]);

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : "https://etgmidwest.com";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

function isValidEmail(email) {
  return typeof email === "string"
    && email.length >= 5
    && email.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function extractEmail(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    return body.email || body.Email;
  }

  if (contentType.includes("application/x-www-form-urlencoded")
      || contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    return form.get("Email") || form.get("email");
  }

  return null;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("origin") || "";

    // Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, origin);
    }

    if (!env.NEWSLETTER) {
      return jsonResponse({ error: "Server not configured" }, 500, origin);
    }

    const email = await extractEmail(request);
    if (!isValidEmail(email)) {
      return jsonResponse({ error: "Please enter a valid email address." }, 400, origin);
    }

    // Signing up again after unsubscribing re-subscribes, which is what the
    // person asked for. A bounced or spam-reported address stays suppressed.
    let result;
    try {
      result = await env.NEWSLETTER.subscribe({
        list: NEWSLETTER_LIST,
        email: email.trim().toLowerCase(),
        source: SIGNUP_SOURCE,
      });
    } catch (err) {
      console.error("Newsletter service error", err);
      return jsonResponse({ error: "Something went wrong. Please try again." }, 502, origin);
    }

    if (result && result.ok) {
      return jsonResponse({ ok: true, message: "Subscribed!" }, 200, origin);
    }
    if (result && result.error === "invalid email") {
      return jsonResponse({ error: "Please enter a valid email address." }, 400, origin);
    }

    console.error("Newsletter service refused signup", result);
    return jsonResponse({ error: "Something went wrong. Please try again." }, 502, origin);
  },
};
