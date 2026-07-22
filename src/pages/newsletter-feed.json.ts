import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Lightweight machine-readable feed of published articles, consumed by the
// scheduled newsletter Worker (worker/newsletter.js) to detect new posts.
// Videos are watched separately via the YouTube channel RSS feed.
export const GET: APIRoute = async () => {
  const articles = (await getCollection('articles'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 40)
    .map((a) => ({
      id: a.slug,
      title: a.data.title,
      path: `/articles/${a.slug}/`,
      date: a.data.date.toISOString(),
      tag: a.data.tag || '',
      summary: (a.data.summary || '').toString().trim().slice(0, 320),
      image: a.data.heroImage || '',
    }));

  return new Response(JSON.stringify({ articles }), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=300',
    },
  });
};
