/**
 * Projects shown on /projects and the home page.
 *
 * Your pinned GitHub repos (from `githubUsername` in content/site.ts) are
 * listed automatically, so you don't need to repeat them here. Use this list
 * for anything that isn't a pinned repo: client work, private projects,
 * talks, or live sites.
 */

export type Project = {
  title: string
  description: string
  year: string
  tags: string[]
  href?: string
  repo?: string
  // Filled in automatically for pinned GitHub repos.
  language?: { name: string; color: string | null }
  stars?: number
  forks?: number
}

export const projects: Project[] = [
  // {
  //   title: 'Client dashboard',
  //   description: 'Analytics dashboard built for Acme Corp.',
  //   year: '2025',
  //   tags: ['Next.js', 'PostgreSQL'],
  //   href: 'https://example.com',
  // },
]
