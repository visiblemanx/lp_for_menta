import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  server: { port: 3201, host: true },
  integrations: [react()],
});
