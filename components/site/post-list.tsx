import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { formatDate, getBlogPosts } from '@/lib/posts'
import { Badge } from '@/components/ui/badge'

export function PostList({ limit }: { limit?: number }) {
  const posts = getBlogPosts().slice(0, limit)

  if (posts.length === 0) {
    return <p className="text-muted-foreground">No posts yet.</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {posts.map((post, i) => (
        <li key={post.slug} className="reveal" style={{ '--i': i } as React.CSSProperties}>
          <Link
            href={`/blog/${post.slug}`}
            className="group relative flex flex-col gap-2 rounded-2xl border bg-card/60 p-5 transition-all hover:border-brand/40 hover:bg-card hover:shadow-lg hover:shadow-brand/5"
          >
            <div className="flex items-center justify-between gap-4">
              <time
                dateTime={post.metadata.publishedAt}
                className="font-mono text-xs text-muted-foreground tabular-nums"
              >
                {formatDate(post.metadata.publishedAt)}
              </time>
              <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
            </div>
            <p className="text-lg font-semibold tracking-tight">{post.metadata.title}</p>
            {post.metadata.summary && (
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {post.metadata.summary}
              </p>
            )}
            {!!post.metadata.tags?.length && (
              <div className="flex flex-wrap gap-1 pt-1">
                {post.metadata.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
