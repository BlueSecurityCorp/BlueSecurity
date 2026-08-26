import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.bluesecurity.online',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    sitemap(),
  ],
  experimental: {
    csp: {
      algorithm: 'SHA-256',
      scriptDirective: {
        resources: ["'self'", 'https://challenges.cloudflare.com'],
      },
      styleDirective: {
        resources: ["'self'", "'unsafe-inline'"],
      },
      directives: [
        "default-src 'self'",
        "font-src 'self'",
        "img-src 'self' data:",
        "connect-src 'self' https://contact.bluesecurity.online",
        "frame-src 'self' https://challenges.cloudflare.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self' https://contact.bluesecurity.online",
        'upgrade-insecure-requests',
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
