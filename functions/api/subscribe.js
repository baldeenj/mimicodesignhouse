/**
 * POST /api/subscribe — newsletter signup.
 *
 *   1. Validates the email + checks the honeypot.
 *   2. Adds the contact to a Resend Audience (subscribed).
 *   3. Sends a branded welcome email.
 *
 * Environment variables (Cloudflare → Worker settings):
 *   RESEND_API_KEY       — Resend API key (already set for the contact form)
 *   RESEND_AUDIENCE_ID   — id of the Resend Audience subscribers are added to
 *   NEWSLETTER_FROM      — verified sender, e.g. "Mimico Design House <hello@mimicodesignhouse.com>"
 *   SITE_URL             — e.g. "https://www.mimicodesignhouse.com" (for logo/link)
 */

const RESEND_BASE = "https://api.resend.com";

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function welcomeEmail(siteUrl) {
  const logo = `${siteUrl}/assets/img/mdh-logo.png`;
  return `
  <div style="margin:0;padding:0;background:#ECEAE4;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ECEAE4;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#FDFDFC;border-radius:14px;overflow:hidden;border:1px solid #E3E1DB;">
          <tr><td style="padding:34px 40px 8px;">
            <img src="${logo}" alt="Mimico Design House" height="42" style="height:42px;width:auto;display:block;" />
          </td></tr>
          <tr><td style="padding:16px 40px 8px;">
            <h1 style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;color:#1A1A1C;font-weight:800;">You're subscribed 🎉</h1>
            <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#585C64;">
              Thanks for joining. From now on you'll get a note whenever we publish a new article or post a new video — clear, research-led thinking on UX, design leadership, and shipping enterprise products.
            </p>
            <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#585C64;">
              No noise, and you can unsubscribe from any email we send.
            </p>
            <a href="${siteUrl}/articles/" style="display:inline-block;background:#2456C7;color:#FFFFFF;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:15px;padding:13px 24px;border-radius:6px;">Browse the latest insights →</a>
          </td></tr>
          <tr><td style="padding:28px 40px 34px;border-top:1px solid #ECEAE4;margin-top:20px;">
            <p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#8A8D93;">
              Mimico Design House Inc. · Serving clients globally<br/>
              You're receiving this because you subscribed at mimicodesignhouse.com.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </div>`;
}

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Invalid submission." }, 400);
  }

  // Honeypot — bots fill this hidden field; silently accept and do nothing.
  if (form.get("website")) return json({ ok: true });

  const email = (form.get("email") || "").toString().trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
    return json({ error: "Subscriptions aren't configured yet. Please try again later." }, 500);
  }

  const siteUrl = (env.SITE_URL || "https://www.mimicodesignhouse.com").replace(/\/$/, "");
  const from = env.NEWSLETTER_FROM || env.CONTACT_FROM;

  // 1. Add to the Resend Audience. A 409/duplicate is fine — treat as success.
  try {
    const r = await fetch(`${RESEND_BASE}/audiences/${env.RESEND_AUDIENCE_ID}/contacts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    if (!r.ok && r.status !== 409) {
      const detail = await r.text().catch(() => "");
      // Resend returns 422 with a "already exists" message for duplicates.
      if (!/exist/i.test(detail)) {
        console.error("Resend audience add failed", r.status, detail);
        return json({ error: "Could not subscribe you right now. Please try again." }, 502);
      }
    }
  } catch (err) {
    console.error("Resend audience request failed", err);
    return json({ error: "Could not subscribe you right now. Please try again." }, 502);
  }

  // 2. Send a welcome email (best-effort — don't fail the signup if this errors).
  if (from) {
    try {
      await fetch(`${RESEND_BASE}/emails`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from,
          to: [email],
          subject: "You're subscribed to Mimico Design House",
          html: welcomeEmail(siteUrl),
        }),
      });
    } catch (err) {
      console.error("Welcome email failed", err);
    }
  }

  return json({ ok: true });
}
