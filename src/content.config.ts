import { glob } from "astro/loaders";
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/posts" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.date(),
      updated: z.date().optional(),
      draft: z.boolean().optional().default(false),
      categories: z.array(z.string()).optional(),
      technologies: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      image: z.object({ src: z.string(), alt: z.string() }),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/projects" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      type: z.enum(["work", "oss", "osscontrib", "website"]),
      date: z.string(),
      image: z.object({ src: z.string(), alt: z.string() }),
      url: z.string().url().optional(),
      draft: z.boolean().optional().default(false),
      featured: z.boolean().optional().default(false),
    }),
});

const technologies = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/technologies" }),
  schema: z.object({
    name: z.string(),
    href: z.string().url(),
    icon: z.string(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/testimonials" }),
  schema: () =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      image: z.string(),
      href: z.string().url(),
      draft: z.boolean().optional().default(false),
    }),
});

export const collections = {
  posts,
  projects,
  technologies,
  testimonials
};