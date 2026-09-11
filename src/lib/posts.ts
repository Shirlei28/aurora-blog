import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPublishedPosts() {
  const now = new Date();

  const posts = await getCollection('blog', ({ data }) => {
    const isDue = data.pubDate.valueOf() <= now.valueOf();
    const isVisible = import.meta.env.PROD ? !data.draft : true;

    return isDue && isVisible;
  });

  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getPostHref(post: Post) {
  return `/posts/${post.id}/`;
}

export function getReadingTime(post: Post) {
  const body = post.body || '';
  const cjk = (body.match(/[\u3400-\u9fff]/g) || []).length;
  const latin = body
    .replace(/[`*_>#\-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(cjk / 450 + latin / 220));
  return `${minutes} 分钟`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

export function getCategories(posts: Post[]) {
  return [...new Set(posts.map((post) => post.data.category))].sort((a, b) => a.localeCompare(b, 'zh-CN'));
}

export function getTags(posts: Post[]) {
  return [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) => a.localeCompare(b, 'zh-CN'));
}

export function getPostsByCategory(posts: Post[], category: string) {
  return posts.filter((post) => post.data.category === category);
}

export function getPostsByTag(posts: Post[], tag: string) {
  return posts.filter((post) => post.data.tags.includes(tag));
}
