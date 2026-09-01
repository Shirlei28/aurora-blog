import { SITE } from '@/lib/config';

export function GET() {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap-index.xml', SITE.url)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
