/**
 * ETG Midwest — Newsletter Signup Worker
 *
 * Receives POSTs from the Stay Updated form on etgmidwest.com,
 * validates the email, and adds the contact to a Resend Audience.
 *
 * The Resend API key is held as an encrypted Worker secret (RESEND_API_KEY)
 * and is never exposed to the browser.
 *
 * Endpoint: POST /
 * Body:     application/x-www-form-urlencoded with field "Email"
 *           OR application/json { "email": "..." }
 * Returns:  200 { ok: true } on success or "already subscribed"
 *           400 { error: "..." } on bad input
 *           500 { error: "..." } on Resend API failure
 */

const RESEND_AUDIENCE_ID = "3e429105-40be-4190-9856-bb5471020695";

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

    if (!env.RESEND_API_KEY) {
      return jsonResponse({ error: "Server not configured" }, 500, origin);
    }

    const email = await extractEmail(request);
    if (!isValidEmail(email)) {
      return jsonResponse({ error: "Please enter a valid email address." }, 400, origin);
    }

    // Add the contact to the Resend audience
    const resendUrl = `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`;
    const resendResponse = await fetch(resendUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        unsubscribed: false,
      }),
    });

    // Resend returns 200 for new contacts and 200/422 for duplicates depending
    // on plan. Treat duplicates as success so the form UX doesn't punish people.
    if (resendResponse.ok) {
      return jsonResponse({ ok: true, message: "Subscribed!" }, 200, origin);
    }

    const errorBody = await resendResponse.json().catch(() => ({}));
    const message = (errorBody && errorBody.message) || "";
    if (message.toLowerCase().includes("already") || resendResponse.status === 422) {
      return jsonResponse({ ok: true, message: "You're already on the list." }, 200, origin);
    }

    console.error("Resend API error", resendResponse.status, errorBody);
    return jsonResponse({ error: "Something went wrong. Please try again." }, 502, origin);
  },
};
