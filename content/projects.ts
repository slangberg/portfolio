/**
 * Projects shown on /projects and the home page.
 *
 * Your pinned GitHub repos (from `githubUsername` in content/site.ts) are
 * listed automatically. Use this list for anything that isn't a pinned repo
 * (client work, private projects, talks, live sites), or add an entry whose
 * `repo` matches a pinned repo to override that card's fields.
 */
import { siteConfig } from './site'

export type Project = {
  title: string
  description: string
  year: string
  tags: string[]
  /** Primary link: a live site, or an internal path like '/storybook'. */
  href?: string
  /** Button text for `href`. Defaults to "Live site". */
  hrefLabel?: string
  /** Source link: a repo, or a folder inside one. */
  repo?: string
  /** Show before the pinned GitHub repos instead of after them. */
  featured?: boolean
  // Filled in automatically for pinned GitHub repos.
  language?: { name: string; color: string | null }
  stars?: number
  forks?: number
}

export const projects: Project[] = [
  {
    title: 'UI Kit',
    description:
      'The shadcn/ui component library behind this site, built on Radix and Tailwind CSS and documented in Storybook.',
    year: '2026',
    tags: ['shadcn/ui', 'Radix', 'Tailwind CSS', 'Storybook'],
    href: '/storybook',
    hrefLabel: 'Open Storybook',
    repo: `https://github.com/${siteConfig.githubUsername}/portfolio/tree/main/components/ui`,
    featured: true,
  },
  // Same repo as a pinned GitHub repo: these fields are merged into that
  // card instead of adding a new one.
  {
    title: 'mui-svgr-generator',
    description:
      'A command-line tool for generating MUI-compatible SVG React components using SVGR, streamlining the conversion of SVG files into Material UI Icon components.',
    year: '2024',
    tags: ['npm', 'CLI', 'Material UI', 'SVGR'],
    href: 'https://www.npmjs.com/package/mui-svgr-generator',
    hrefLabel: 'npm package',
    repo: `https://github.com/${siteConfig.githubUsername}/MUI-SVG-Icons`,
  },
  {
    title: 'D3 Map Project',
    description:
      'A full-stack MERN application for building interactive SVG maps with the D3-ImageMap library, containerized with Docker and the foundation for a planned SaaS platform.',
    year: '2024',
    tags: ['D3.js', 'React', 'Node.js', 'MongoDB', 'Docker'],
    repo: `https://github.com/${siteConfig.githubUsername}/d3-map-full-app`,
  },
  // {
  //   title: 'Client dashboard',
  //   description: 'Analytics dashboard built for Acme Corp.',
  //   year: '2025',
  //   tags: ['Next.js', 'PostgreSQL'],
  //   href: 'https://example.com',
  // },
]
