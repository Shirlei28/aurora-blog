import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    toc: z.boolean().default(true),
    comments: z.boolean().default(true),
    canonical: z.string().optional(),
    author: z.string().optional()
  })
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([])
  })
});

const links = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/links' }),
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    description: z.string().default('')
  })
});

export const collections = { blog, notes, links };
