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

export const collections = { careers };
