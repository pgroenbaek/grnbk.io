// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import svgr from 'vite-plugin-svgr';
import path from "path";

const domain = process.env.DOMAIN;

// https://astro.build/config
export default defineConfig({
  site: `https://${domain}`,
  integrations: [
    mdx(),
    tailwind(),
    sitemap(),
    react()
  ],
  vite: {
    plugins: [
      svgr()
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
