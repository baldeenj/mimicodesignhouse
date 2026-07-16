/**
 * Cloudflare Pages Function — SPA fallback for the Tina admin (/admin/*).
 *
 * Replaces the Netlify-style `_redirects` rule (which Cloudflare's validator
 * rejects as a potential redirect loop). Static assets under /admin — the
 * index.html, JS, CSS — are served normally; only unmatched client-side
 * routes (e.g. a refreshed deep link like /admin/collections/article) fall
 * back to the admin shell so the SPA can take over.
 */
export async function onRequest(context) {
  const res = await context.next();
  if (res.status !== 404) return res;

  const origin = new URL(context.request.url).origin;
  const shell = await fetch(`${origin}/admin/index.html`);
  return new Response(shell.body, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
