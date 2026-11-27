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
  /** Show before the pinned GitHub repos, as a wide card. */
  featured?: boolean
  /**
   * Visual shown beside a featured card: a specimen sheet of UI kit
   * components, or a screenshot under /public.
   */
  preview?: 'components' | { image: string; alt: string }
  // Filled in automatically for pinned GitHub repos.
  language?: { name: string; color: string | null }
  stars?: number
  forks?: number
}

const gh = `https://github.com/${siteConfig.githubUsername}`

export const projects: Project[] = [
  {
    title: 'UI Kit',
    description:
      'The component library this site is built from. It uses shadcn/ui components (Radix primitives styled with Tailwind CSS v4) kept in the repo as source I own, themed through OKLCH design tokens for light and dark mode. Every component has colocated Storybook stories with interactive controls, a theme switcher and axe accessibility checks, and the static Storybook build ships with the site.',
    year: '2026',
    tags: ['shadcn/ui', 'Radix', 'Tailwind CSS', 'Storybook', 'Design Tokens'],
    href: '/storybook',
    hrefLabel: 'Open Storybook',
    repo: `${gh}/portfolio/tree/main/components/ui`,
    featured: true,
    preview: 'components',
  },
  // Entries below share a repo with a pinned GitHub repo, so their fields are
  // merged into that card instead of adding a new one.
  {
    title: 'mui-svgr-generator',
    description:
      'A Node CLI, published to npm, that turns a folder of raw SVGs into Material UI icon components. It wraps SVGR with a custom template that outputs createSvgIcon components, so every icon takes MUI\'s color, fontSize and sx props, and it can emit TypeScript or JavaScript. A Vite and MUI demo site renders all 490 generated icons with live color and size controls.',
    year: '2024',
    tags: ['Node.js', 'CLI', 'npm', 'Material UI', 'SVGR', 'Vite'],
    href: 'https://www.npmjs.com/package/mui-svgr-generator',
    hrefLabel: 'npm package',
    repo: `${gh}/MUI-SVG-Icons`,
  },
  {
    title: 'claude-d3-map-project',
    description:
      'A Next.js 16 app for building interactive infographic maps. Upload any image as the background, click to drop pins, drag them into place and give each one a title, content, category, color and custom SVG icon. Pins are stored as percentage coordinates so they stay put at any resolution, d3-zoom handles pan and zoom, and each map can be shared as a one-line iframe embed. Data is stored in SQLite through Prisma.',
    year: '2026',
    tags: ['Next.js', 'TypeScript', 'D3.js', 'Prisma', 'SQLite', 'Tailwind CSS'],
    repo: `${gh}/claude-d3-map-project`,
  },
  {
    title: 'pokedex-nextjs',
    description:
      'A Pokédex for all ~1,300 Pokémon, styled after the red handheld from the original games. Server components and parallel routes keep the D-pad, sprite screen and search in place while each data tab (overview, forms, games, abilities, evolutions and moves) loads at its own shareable URL. All data comes live from PokéAPI, with real 404s, per-tab error boundaries, reduced-motion support and a JSON endpoint.',
    year: '2024',
    tags: ['Next.js', 'React Server Components', 'TypeScript', 'Tailwind CSS', 'PokéAPI'],
    repo: `${gh}/pokedex-nextjs`,
    featured: true,
    preview: {
      image: '/projects/pokedex.jpg',
      alt: 'The Pokédex app showing Charizard: a red handheld device with a sprite screen, D-pad, data tabs and search.',
    },
  },
  {
    title: 'D3 Map Project',
    description:
      'A full-stack MERN app, built as the start of a SaaS platform for interactive image maps. The React client uses Redux Toolkit and MUI around a custom D3 image-map engine with markers, tooltips, multi-select, zoom and pan, plus editors for placing markers and drawing polygon spaces. The Express API handles bearer-token auth, Argon2 password hashing, user accounts and S3 image uploads. Both services run in Docker, and a GitHub Actions workflow pushes the images to Amazon ECR.',
    year: '2024',
    tags: ['React', 'D3.js', 'Redux Toolkit', 'Express', 'MongoDB', 'Docker', 'AWS S3'],
    repo: `${gh}/d3-map-full-app`,
  },
  {
    title: 'typescript-dynamic-module-federation',
    description:
      'An early experiment in loading micro-frontends at runtime with Webpack 5 Module Federation, written in TypeScript. Instead of hard-coding remotes at build time, it injects remote entry scripts on demand, initializes webpack\'s shared scope and pulls typed exports from each container. It adds script caching, HTTPS checks, load timeouts and a React hook that reports which remotes loaded.',
    year: '2021',
    tags: ['TypeScript', 'Webpack 5', 'Module Federation', 'React', 'Micro-frontends'],
    repo: `${gh}/typescript-dynamic-module-federation`,
  },
  // {
  //   title: 'Client dashboard',
  //   description: 'Analytics dashboard built for Acme Corp.',
  //   year: '2025',
  //   tags: ['Next.js', 'PostgreSQL'],
  //   href: 'https://example.com',
  // },
]

/** Repo URLs to list after every other project, in this order. */
export const showLast: string[] = [
  `${gh}/typescript-dynamic-module-federation`,
]
