export const dynamic = 'force-static'

import { baseUrl, siteConfig } from '@/content/site'
import { getBlogPosts } from '@/lib/posts'

function escape(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function GET() {
  const items = getBlogPosts()
    .map(
      (post) => `    <item>
      <title>${escape(post.metadata.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <description>${escape(post.metadata.summary || '')}</description>
      <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escape(siteConfig.name)}</title>
    <link>${baseUrl}</link>
    <description>${escape(siteConfig.description)}</description>
${items}
  </channel>
</rss>`

  return new Response(feed, { headers: { 'Content-Type': 'text/xml' } })
}
