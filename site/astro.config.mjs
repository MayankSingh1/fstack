import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fstack.vercel.app',
  integrations: [sitemap()],
  vite: { server: { fs: { allow: ['..'] } } },
});
