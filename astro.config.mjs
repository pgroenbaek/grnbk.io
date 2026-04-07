// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from "path";

const domain = process.env.DOMAIN;

// https://astro.build/config
export default defineConfig({
  site: `https://${domain}`,
  integrations: [
    mdx(),
    sitemap(),
    react()
  ],
  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Rubik",
    weights: [400, 500, 700],
    cssVariable: "--font-rubik",
  }],
  vite: {
    plugins: [
      svgr(),
      tailwindcss()
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
