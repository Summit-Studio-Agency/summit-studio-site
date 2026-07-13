import type { MetadataRoute } from 'next';
import { SITE } from '@/data/site';

const STATIC_ROUTES = ['', '/about', '/pricing', '/portfolio', '/faq', '/contact', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_ROUTES.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
