import { getCollection } from 'astro:content';

// YouTube channel whose uploads back the vlog section.
const CHANNEL_ID = 'UCvFk-6u5VeWw8UMEaesefOA';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export interface VlogItem {
  title: string;
  date: Date;
  episode: number;
  videoId: string;
  thumbnail: string;
  href: string;       // internal detail page, or the YouTube URL for auto-pulled videos
  external: boolean;  // true → link straight to YouTube (no content entry yet)
  summary?: string;
}

function videoIdFromUrl(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

interface FeedVideo { id: string; title: string; date: Date; desc: string }

// Fetch the channel's RSS feed at build time. Returns [] on any failure so the
// build always falls back to the content collection (never breaks the deploy).
async function fetchFeed(): Promise<FeedVideo[]> {
  try {
    const res = await fetch(FEED_URL);
    if (!res.ok) return [];
    const xml = await res.text();
    const out: FeedVideo[] = [];
    for (const entry of xml.split('<entry>').slice(1)) {
      const id = (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
      if (!id) continue;
      const title = decodeEntities((entry.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').trim();
      const date = new Date((entry.match(/<published>([^<]+)<\/published>/) || [])[1] || Date.now());
      const desc = (entry.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || '';
      out.push({ id, title, date, desc });
    }
    return out;
  } catch {
    return [];
  }
}

// Unified vlog list: the content collection (canonical archive, with detail
// pages) plus any newer channel uploads not yet captured as content entries.
export async function getVlogs(): Promise<VlogItem[]> {
  const collection = await getCollection('vlogs');
  const known = new Set<string>();

  const items: VlogItem[] = collection.map((v) => {
    const id = videoIdFromUrl(v.data.videoUrl) || '';
    if (id) known.add(id);
    return {
      title: v.data.title,
      date: v.data.date,
      episode: v.data.episode,
      videoId: id,
      thumbnail: v.data.thumbnailUrl || (id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ''),
      href: `/vlogs/${v.slug}/`,
      external: false,
      summary: v.data.summary,
    };
  });

  const feed = await fetchFeed();
  const maxEpisode = items.reduce((m, v) => Math.max(m, v.episode), 0);
  const auto = feed
    .filter((f) => !known.has(f.id))
    .sort((a, b) => a.date.getTime() - b.date.getTime()); // oldest first so episode numbers ascend

  auto.forEach((f, i) => {
    items.push({
      title: f.title,
      date: f.date,
      episode: maxEpisode + i + 1,
      videoId: f.id,
      thumbnail: `https://img.youtube.com/vi/${f.id}/hqdefault.jpg`,
      href: `https://www.youtube.com/watch?v=${f.id}`,
      external: true,
      summary: f.desc.replace(/\s+/g, ' ').trim().slice(0, 200),
    });
  });

  return items.sort((a, b) => b.date.getTime() - a.date.getTime());
}
