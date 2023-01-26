import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3201,
    host: true
  },
  integrations: [vue(), tailwind()]
});