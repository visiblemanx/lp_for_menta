import { defineConfig } from 'astro/config';
import compress from "astro-compress";

export default defineConfig({
  server: {
    port: 3201,
    host: true
  },
  integrations: [compress()]
});