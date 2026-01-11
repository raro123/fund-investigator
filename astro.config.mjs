import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [tailwind(), sitemap(), mdx()],
  site: 'https://fundinvestigator.com',

  // Image optimization settings
  image: {
    // Formats to generate (in order of preference)
    formats: ['avif', 'webp', 'png', 'jpg'],

    // Quality settings per format
    formatOptions: {
      avif: { quality: 80 },   // Aggressive compression
      webp: { quality: 85 },   // Moderate compression
      png: { quality: 90 },    // Near-lossless for charts
      jpg: { quality: 85 }
    },

    // Allow remote image optimization (for future CDN integration)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudflare.com'  // Future: Cloudflare Images
      }
    ]
  }
});
