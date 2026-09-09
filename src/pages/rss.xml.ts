import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts } from '@/lib/posts';
import { SITE } from '@/lib/config';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site || SITE.url,
    trailingSlash: true,
    customData: `<language>zh-CN</language><generator>Astro</generator>`,
    items: posts.slice(0, 30).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.id}/`,
      categories: [post.data.category, ...post.data.tags]
    }))
  });
}
