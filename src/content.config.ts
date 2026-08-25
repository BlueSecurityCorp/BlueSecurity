import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const careers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/careers' }),
  schema: z.object({
    // 한국어
    title_ko: z.string(),
    description_ko: z.string(),
    type_ko: z.string(),
    location_ko: z.string(),
    // English
    title_en: z.string(),
    description_en: z.string(),
    type_en: z.string(),
    location_en: z.string(),
    // 공통
    team: z.string(),
    published: z.boolean().default(true),
    order: z.number().default(0),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
  }),
});

const notices = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notices' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    published: z.boolean().default(true),
    lang: z.enum(['ko', 'en']).default('ko'),
    category: z.string().default('bluesecurity'),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    published: z.boolean().default(true),
    lang: z.enum(['ko', 'en']).default('ko'),
    category: z.enum(['security', 'industry', 'product', 'newsletter']).default('security'),
    template: z.enum([
      'weekly-action-brief',
      'critical-security-alert',
      'vulnerability-radar',
      'executive-security-brief',
      'monthly-threat-deep-dive',
      'security-decision-brief',
      'visual-news-brief',
    ]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    source: z.object({
      name: z.string(),
      url: z.string().url(),
    }).optional(),
    kakaoMessage: z.string().max(400).optional(),
    kakaoButtonLabel: z.string().max(20).optional(),
    newsletterIssue: z.number().int().positive().optional(),
  }),
});

const newsTemplates = defineCollection({
  loader: glob({ pattern: '0*.md', base: './src/content/news-templates' }),
});

export const collections = { careers, notices, news, newsTemplates };
