/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Handles the "Start a conversation" form:
 *   1. Validates the submitted fields.
 *   2. Verifies the Cloudflare Turnstile token server-side.
 *   3. Emails the submission via Resend.
 *
 * Required environment variables (set in the Cloudflare Pages dashboard →
 * Settings → Environment variables, and locally in .dev.vars for `wrangler`):
 *   TURNSTILE_SECRET_KEY  — secret key from your Turnstile widget
 *   RESEND_API_KEY        — API key from resend.com
 *   CONTACT_TO            — where submissions are emailed (e.g. hello@mimicodesignhouse.com)
 *   CONTACT_FROM          — verified Resend sender (e.g. "Mimico Site <forms@mimicodesignhouse.com>")
 */

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_URL = "https://api.resend.com/emails";

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Invalid form submission." }, 400);
  }

  // Honeypot — a real user never fills this hidden field.
  if (form.get("website")) {
    return json({ ok: true }); // silently accept, send nothing
  }

  const name = (form.get("name") || "").toString().trim();
  const email = (form.get("email") || "").toString().trim();
  const company = (form.get("company") || "").toString().trim();
  const message = (form.get("message") || "").toString().trim();
  const token = (form.get("cf-turnstile-response") || "").toString();

  if (!name || !email || !message) {
    return json({ error: "Please fill in your name, email, and message." }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }
  if (!token) {
    return json({ error: "Verification challenge missing. Please try again." }, 400);
  }

  // 1. Verify Turnstile server-side.
  const verifyBody = new FormData();
  verifyBody.append("secret", env.TURNSTILE_SECRET_KEY || "");
  verifyBody.append("response", token);
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) verifyBody.append("remoteip", ip);

  let verify;
  try {
    const vr = await fetch(SITEVERIFY_URL, { method: "POST", body: verifyBody });
    verify = await vr.json();
  } catch {
    return json({ error: "Could not verify the challenge. Please try again." }, 502);
  }
  if (!verify.success) {
    console.error("Turnstile verify failed:", JSON.stringify(verify));
    return json({ error: "Verification failed [" + ((verify["error-codes"] || []).join(", ") || "unknown") + "]" }, 403);
  }

  // 2. Send the email via Resend.
  const subject = `New enquiry from ${name}${company ? ` (${company})` : ""}`;
  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    const rr = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: [env.CONTACT_TO],
        reply_to: email,
        subject,
        html,
      }),
    });
    if (!rr.ok) {
      const detail = await rr.text().catch(() => "");
      console.error("Resend error", rr.status, detail);
      return json({ error: "Could not send your message. Please email us directly." }, 502);
    }
  } catch (err) {
    console.error("Resend request failed", err);
    return json({ error: "Could not send your message. Please email us directly." }, 502);
  }

  return json({ ok: true });
}
