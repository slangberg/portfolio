import Link from 'next/link'

import { formatDate, getBlogPosts } from '@/lib/posts'
import { Badge } from '@/components/ui/badge'

export function PostList({ limit }: { limit?: number }) {
  const posts = getBlogPosts().slice(0, limit)

  return (
    <ul className="-mx-3 flex flex-col">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-1 rounded-lg px-3 py-3 transition-colors hover:bg-muted/60 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <time
              dateTime={post.metadata.publishedAt}
              className="shrink-0 text-sm text-muted-foreground tabular-nums sm:w-36"
            >
              {formatDate(post.metadata.publishedAt)}
            </time>
            <div className="min-w-0 space-y-1.5">
              <p className="font-medium tracking-tight">{post.metadata.title}</p>
              {post.metadata.summary && (
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {post.metadata.summary}
                </p>
              )}
              {!!post.metadata.tags?.length && (
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {post.metadata.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
