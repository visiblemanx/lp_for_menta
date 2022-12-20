import { defineConfig } from 'astro/config';
import compress from "astro-compress";
import vue from "@astrojs/vue";
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3201,
    host: true
  },
  integrations: [compress(), vue(), vuetify({ autoImport: true })]
});