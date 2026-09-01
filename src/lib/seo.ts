import { SITE } from './config';

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return new URL(path.replace(/^\/?/, '/'), SITE.url).toString();
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  url: string;
  datePublished: Date;
  dateModified?: Date;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    mainEntityOfPage: input.url,
    datePublished: input.datePublished.toISOString(),
    dateModified: (input.dateModified || input.datePublished).toISOString(),
    author: { '@type': 'Person', name: SITE.author },
    publisher: { '@type': 'Person', name: SITE.author },
    ...(input.image ? { image: [absoluteUrl(input.image)] } : {})
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.title,
    url: SITE.url,
    description: SITE.description,
    inLanguage: SITE.locale,
    publisher: { '@type': 'Person', name: SITE.author },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url.replace(/\/$/, '')}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}
