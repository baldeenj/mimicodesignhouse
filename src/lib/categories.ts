import { getCollection } from 'astro:content';

let cache: Promise<Map<string, string>> | undefined;

/** Map of category id (e.g. "ux-research") -> display name ("UX Research"). */
export function categoryNames(): Promise<Map<string, string>> {
  cache ??= getCollection('categories').then(
    (cats) => new Map(cats.map((c) => [c.id, c.data.name])),
  );
  return cache;
}
