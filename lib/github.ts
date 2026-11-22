import 'server-only'

import snapshot from '@/content/pinned-repos.json'
import { siteConfig } from '@/content/site'
import type { Project } from '@/content/projects'

/** How often (seconds) the pinned repos are re-fetched from GitHub. */
export const PINNED_REVALIDATE = 60 * 60 * 24

export type PinnedRepo = {
  name: string
  description: string | null
  url: string
  homepageUrl: string | null
  stars: number
  forks: number
  language: { name: string; color: string | null } | null
  topics: string[]
  pushedAt: string
}

export const PINNED_QUERY = /* GraphQL */ `
  query ($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            pushedAt
            primaryLanguage { name color }
            repositoryTopics(first: 8) { nodes { topic { name } } }
          }
        }
      }
    }
  }
`

type GraphQLRepo = {
  name: string
  description: string | null
  url: string
  homepageUrl: string | null
  stargazerCount: number
  forkCount: number
  pushedAt: string
  primaryLanguage: { name: string; color: string | null } | null
  repositoryTopics: { nodes: { topic: { name: string } }[] }
}

export function normalizeRepo(node: GraphQLRepo): PinnedRepo {
  return {
    name: node.name,
    description: node.description,
    url: node.url,
    homepageUrl: node.homepageUrl || null,
    stars: node.stargazerCount,
    forks: node.forkCount,
    language: node.primaryLanguage,
    topics: node.repositoryTopics.nodes.map((n) => n.topic.name),
    pushedAt: node.pushedAt,
  }
}

/**
 * Pinned repositories from the GitHub profile in `siteConfig.githubUsername`.
 *
 * GitHub only exposes pinned items through its GraphQL API, which requires a
 * token. With `GITHUB_TOKEN` set (any token with no extra scopes works for
 * public repos), the list is fetched at build time and refreshed daily.
 * Without it, or if the request fails, the committed snapshot in
 * content/pinned-repos.json is used (refresh it with `npm run sync:pinned`).
 */
export async function getPinnedRepos(): Promise<PinnedRepo[]> {
  const token = process.env.GITHUB_TOKEN
  const login = siteConfig.githubUsername
  if (!token || !login) return snapshot as PinnedRepo[]

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'portfolio-site',
      },
      body: JSON.stringify({ query: PINNED_QUERY, variables: { login } }),
      next: { revalidate: PINNED_REVALIDATE, tags: ['github-pinned'] },
    })
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`)

    const json = await res.json()
    if (json.errors) throw new Error(json.errors[0]?.message ?? 'GraphQL error')

    const nodes: GraphQLRepo[] = json.data?.user?.pinnedItems?.nodes ?? []
    return nodes.filter((n) => n?.name).map(normalizeRepo)
  } catch (error) {
    console.warn('[github] Falling back to pinned-repos snapshot:', error)
    return snapshot as PinnedRepo[]
  }
}

/** Map a pinned repo onto the shared Project shape used by ProjectCard. */
export function repoToProject(repo: PinnedRepo): Project {
  return {
    title: repo.name,
    description: repo.description ?? '',
    year: new Date(repo.pushedAt).getFullYear().toString(),
    tags: repo.topics,
    href: repo.homepageUrl ?? undefined,
    repo: repo.url,
    language: repo.language ?? undefined,
    stars: repo.stars,
    forks: repo.forks,
  }
}

/** Pinned GitHub repos first, then any extra projects from content/projects.ts. */
export async function getAllProjects(): Promise<Project[]> {
  const { projects } = await import('@/content/projects')
  const pinned = (await getPinnedRepos()).map(repoToProject)
  const pinnedUrls = new Set(pinned.map((p) => p.repo))
  return [...pinned, ...projects.filter((p) => !p.repo || !pinnedUrls.has(p.repo))]
}
