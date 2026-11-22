import type { MetadataRoute } from 'next'
import { baseUrl, siteConfig } from '@/content/site'
import { getBlogPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split('T')[0]

  const routes = siteConfig.nav.map(({ href }) => ({
    url: `${baseUrl}${href === '/' ? '' : href}`,
    lastModified: today,
  }))

  const posts = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  return [...routes, ...posts]
}
