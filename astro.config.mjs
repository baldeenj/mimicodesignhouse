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

export default defineConfig({
  output: 'static',
  site: 'https://www.mimicodesignhouse.com',
  vite: { plugins: [tinaAdminDev] },
});
