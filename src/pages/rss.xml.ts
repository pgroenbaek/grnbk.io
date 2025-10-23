import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');

export const GET = ({ site }: { site?: string }) => {
  return rss({
    title: 'My Blog',
    description: 'Latest posts from my blog',
    site: site || "",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    }))
  });
};