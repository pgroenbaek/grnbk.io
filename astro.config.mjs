// @ts-check
import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import path from "path";

// https://astro.build/config
export default defineConfig({
  site: 'https://grnbk.io',
  integrations: [
    icon(),
    mdx(),
    tailwind(),
    sitemap(),
    react()
  ],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
