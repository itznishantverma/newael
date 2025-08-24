import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL - would be replaced with your actual domain in production
  const baseUrl = 'https://aelvorm.com';
  
  // Main pages
  const routes = [
    '',
    '/articles',
    '/news',
    '/blogs',
    '/quiz',
    '/daily-affairs',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
    '/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
  
  // In a real implementation, you would dynamically generate URLs for all articles, 
  // categories, etc. from your database

  return routes;
}