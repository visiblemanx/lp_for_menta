import { defineConfig } from 'astro/config';
import { inject } from '@vercel/analytics';

// https://astro.build/config
export default defineConfig({
  server: { port: 3201, host: true },
  integrations: [
    inject(),
  ]
});
