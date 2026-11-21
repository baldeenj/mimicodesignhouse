import { defineConfig } from 'astro/config';

// Dev only: Astro's dev server doesn't map /admin to public/admin/index.html,
// so rewrite it (production handles this in worker/index.js).
const tinaAdminDev = {
  name: 'tina-admin-dev',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === '/admin' || req.url === '/admin/') req.url = '/admin/index.html';
      next();
    });
  },
};

// Markdown images with a title — ![alt](src "caption") — render as
// <figure><img><figcaption>caption</figcaption></figure>, so the caption
// shows under the image (styled by .prose figcaption).
function rehypeFigureCaptions() {
  const isBlank = (n) => n.type === 'text' && !n.value.trim();
  const walk = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (child.type === 'element' && child.tagName === 'p') {
        const kids = child.children.filter((k) => !isBlank(k));
        const img = kids[0];
        const title = img?.properties?.title;
        if (kids.length === 1 && img.type === 'element' && img.tagName === 'img' && title) {
          delete img.properties.title;
          return {
            type: 'element',
            tagName: 'figure',
            properties: {},
            children: [
              img,
              { type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: String(title) }] },
            ],
          };
        }
      }
      walk(child);
      return child;
    });
  };
  return walk;
}

export default defineConfig({
  output: 'static',
  site: 'https://www.mimicodesignhouse.com',
  markdown: { rehypePlugins: [rehypeFigureCaptions] },
  vite: { plugins: [tinaAdminDev] },
});
