export const SITE = {
  title: 'Aurora Blog',
  description: '记录技术、阅读、生活与长期思考。',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://example.com',
  author: import.meta.env.PUBLIC_AUTHOR_NAME || '你的名字',
  locale: 'zh-CN',
  nav: [
    { href: '/', label: '首页' },
    { href: '/posts/', label: '文章' },
    { href: '/notes/', label: '随记' },
    { href: '/categories/', label: '分类' },
    { href: '/tags/', label: '标签' },
    { href: '/archives/', label: '归档' },
    { href: '/links/', label: '链接' },
    { href: '/about/', label: '关于' }
  ]
} as const;

export const DYNAMIC = {
  twikooEnvId: import.meta.env.PUBLIC_TWIKOO_ENV_ID || '',
  twikooCdn: import.meta.env.PUBLIC_TWIKOO_CDN || 'https://cdn.jsdelivr.net/npm/twikoo@1.7.20/dist/twikoo.min.js',
  umamiWebsiteId: import.meta.env.PUBLIC_UMAMI_WEBSITE_ID || '',
  umamiSrc: import.meta.env.PUBLIC_UMAMI_SRC || ''
} as const;
