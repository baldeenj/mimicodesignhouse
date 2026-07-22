/**
 * Scheduled newsletter engine.
 *
 * Runs on a cron trigger (see wrangler.jsonc). Each run it:
 *   1. Reads the site's article feed (/newsletter-feed.json) and the YouTube
 *      channel RSS feed.
 *   2. Compares against the set of item ids already handled, stored in KV.
 *   3. On the very first run it *seeds* the KV set with everything currently
 *      published and sends nothing — so the back-catalogue is never blasted out.
 *   4. For each genuinely new item afterwards it sends a Resend Broadcast to the
 *      audience (which handles unsubscribe automatically), newest items capped
 *      per run to avoid floods.
 *
 * Env: RESEND_API_KEY, RESEND_AUDIENCE_ID, NEWSLETTER_FROM (or CONTACT_FROM),
 *      SITE_URL, YOUTUBE_CHANNEL_ID, and the NEWSLETTER_KV namespace binding.
 */

const RESEND_BASE = "https://api.resend.com";
const KV_KEY = "seen_v1";
const MAX_PER_RUN = 3; // safety cap: never send more than this in a single run

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function fetchArticles(siteUrl) {
  try {
    const r = await fetch(`${siteUrl}/newsletter-feed.json`, { cf: { cacheTtl: 60 } });
    if (!r.ok) return [];
    const data = await r.json();
    return (data.articles || []).map((a) => ({
      key: `a:${a.id}`,
      kind: "article",
      title: a.title,
      url: `${siteUrl}${a.path}`,
      date: a.date,
      summary: a.summary || "",
      image: a.image ? (a.image.startsWith("http") ? a.image : `${siteUrl}${a.image}`) : "",
      label: a.tag || "New article",
    }));
  } catch (e) {
    console.error("fetchArticles failed", e);
    return [];
  }
}

async function fetchVideos(channelId) {
  if (!channelId) return [];
  try {
    const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
    if (!r.ok) return [];
    const xml = await r.text();
    const out = [];
    const entries = xml.split("<entry>").slice(1);
    for (const e of entries) {
      const vid = (e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
      if (!vid) continue;
      const title = (e.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "New video";
      const published = (e.match(/<published>([^<]+)<\/published>/) || [])[1] || new Date().toISOString();
      const desc = (e.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || "";
      out.push({
        key: `v:${vid}`,
        kind: "video",
        title: title.trim(),
        url: `https://www.youtube.com/watch?v=${vid}`,
        date: published,
        summary: desc.replace(/\s+/g, " ").trim().slice(0, 240),
        image: `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
        label: "New video",
      });
    }
    return out;
  } catch (e) {
    console.error("fetchVideos failed", e);
    return [];
  }
}

function contentEmail(item, siteUrl) {
  const logo = `${siteUrl}/assets/img/mdh-logo.png`;
  const cta = item.kind === "video" ? "Watch the video →" : "Read the article →";
  const kicker = esc((item.label || "New").toUpperCase());
  const img = item.image
    ? `<tr><td style="padding:0 0 22px;"><a href="${esc(item.url)}"><img src="${esc(item.image)}" alt="" width="480" style="width:100%;max-width:480px;border-radius:10px;display:block;" /></a></td></tr>`
    : "";
  const summary = item.summary
    ? `<p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#585C64;">${esc(item.summary)}</p>`
    : "";
  return `
  <div style="margin:0;padding:0;background:#ECEAE4;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ECEAE4;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#FDFDFC;border-radius:14px;overflow:hidden;border:1px solid #E3E1DB;">
          <tr><td style="padding:32px 40px 0;">
            <img src="${logo}" alt="Mimico Design House" height="38" style="height:38px;width:auto;display:block;margin-bottom:24px;" />
            <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.5px;color:#2456C7;">${kicker}</p>
            <h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.3;color:#1A1A1C;font-weight:700;">${esc(item.title)}</h1>
          </td></tr>
          ${img ? `<tr><td style="padding:0 40px;"><table role="presentation" width="100%">${img}</table></td></tr>` : ""}
          <tr><td style="padding:0 40px 8px;">
            ${summary}
            <a href="${esc(item.url)}" style="display:inline-block;background:#2456C7;color:#FFFFFF;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:15px;padding:13px 26px;border-radius:6px;">${cta}</a>
          </td></tr>
          <tr><td style="padding:30px 40px 34px;">
            <p style="margin:22px 0 0;border-top:1px solid #ECEAE4;padding-top:20px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#8A8D93;">
              Mimico Design House Inc. · Serving clients globally<br/>
              You're receiving this because you subscribed at mimicodesignhouse.com.
              <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#8A8D93;text-decoration:underline;">Unsubscribe</a>.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </div>`;
}

async function sendBroadcast(env, item, siteUrl, from) {
  const subject =
    item.kind === "video" ? `New video: ${item.title}` : `New article: ${item.title}`;

  // Create the broadcast against the audience.
  const cr = await fetch(`${RESEND_BASE}/broadcasts`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${env.RESEND_API_KEY}` },
    body: JSON.stringify({
      audience_id: env.RESEND_AUDIENCE_ID,
      from,
      subject,
      name: `${subject}`.slice(0, 190),
      html: contentEmail(item, siteUrl),
    }),
  });
  if (!cr.ok) {
    console.error("Broadcast create failed", cr.status, await cr.text().catch(() => ""));
    return false;
  }
  const created = await cr.json();
  const id = created.id || (created.data && created.data.id);
  if (!id) {
    console.error("Broadcast create returned no id", JSON.stringify(created));
    return false;
  }

  // Send it now.
  const sr = await fetch(`${RESEND_BASE}/broadcasts/${id}/send`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${env.RESEND_API_KEY}` },
    body: JSON.stringify({}),
  });
  if (!sr.ok) {
    console.error("Broadcast send failed", sr.status, await sr.text().catch(() => ""));
    return false;
  }
  return true;
}

export async function runNewsletter(env) {
  if (!env.NEWSLETTER_KV) { console.error("NEWSLETTER_KV not bound"); return; }
  if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) { console.error("Resend env missing"); return; }

  const siteUrl = (env.SITE_URL || "https://www.mimicodesignhouse.com").replace(/\/$/, "");
  const from = env.NEWSLETTER_FROM || env.CONTACT_FROM;
  if (!from) { console.error("No sender configured"); return; }

  const [articles, videos] = await Promise.all([
    fetchArticles(siteUrl),
    fetchVideos(env.YOUTUBE_CHANNEL_ID),
  ]);
  const items = articles.concat(videos);
  if (!items.length) { console.log("newsletter: no items in feeds"); return; }

  const state = (await env.NEWSLETTER_KV.get(KV_KEY, "json")) || null;

  // First run: seed everything, send nothing.
  if (!state || !state.seeded) {
    const ids = items.map((i) => i.key);
    await env.NEWSLETTER_KV.put(KV_KEY, JSON.stringify({ seeded: true, ids, at: new Date().toISOString() }));
    console.log(`newsletter: seeded ${ids.length} existing items (no emails sent)`);
    return;
  }

  const seen = new Set(state.ids || []);
  const fresh = items
    .filter((i) => !seen.has(i.key))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // oldest new first

  if (!fresh.length) { console.log("newsletter: nothing new"); return; }

  // Send up to MAX_PER_RUN this run; any leftover new items get picked up next run.
  const toSend = fresh.slice(0, MAX_PER_RUN);
  let sent = 0;
  for (const item of toSend) {
    const ok = await sendBroadcast(env, item, siteUrl, from);
    // Mark handled regardless of outcome, so a persistent failure can't loop forever.
    seen.add(item.key);
    if (ok) sent++;
  }

  await env.NEWSLETTER_KV.put(KV_KEY, JSON.stringify({ seeded: true, ids: Array.from(seen), at: new Date().toISOString() }));
  console.log(`newsletter: sent ${sent} broadcast(s) of ${fresh.length} new item(s); ${fresh.length - toSend.length} deferred`);
}
