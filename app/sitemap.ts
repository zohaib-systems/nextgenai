import { siteUrl } from '@/lib/site';
import { MetadataRoute } from 'next';
import { getAllPrompts } from '@/lib/supabase';

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteUrl;

  // Fetch all prompt IDs from Supabase
  const prompts = await getAllPrompts() || [];

  const dynamicRoutes = prompts.map((prompt) => ({
    url: `${baseUrl}/prompt/${prompt.id}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    {
      url: `${baseUrl}`,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/library`,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
