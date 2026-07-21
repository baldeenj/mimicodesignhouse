// Worker entry for the Cloudflare Workers (static-assets) deployment.
// Serves the built Astro site as static assets and runs the two server routes
// that were previously Pages Functions: the contact form API and the Tina
// admin SPA fallback.
import { onRequestPost } from "../functions/api/contact.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Contact form submission (Turnstile verify + Resend email).
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      return onRequestPost({ request, env });
    }

    // Tina admin SPA: serve the shell for client-side routes with no static asset.
    if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) {
      return env.ASSETS.fetch(new URL("/admin/index.html", url.origin));
    }

    // Everything else: static assets (returns the site's 404 page for unknown paths).
    return env.ASSETS.fetch(request);
  },
};
