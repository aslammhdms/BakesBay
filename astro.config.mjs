// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://bakesbay.com',
  output: 'static',

  server: {
    allowedHosts: ['.trycloudflare.com']
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.trycloudflare.com']
    }
  },

  integrations: [react()],
  adapter: cloudflare()
});