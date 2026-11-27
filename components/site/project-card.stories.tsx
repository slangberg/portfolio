import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import type { Project } from '@/content/projects'
import { ProjectCard, ProjectGrid } from './project-card'

const base: Project = {
  title: 'mui-svgr-generator',
  description:
    'A Node CLI, published to npm, that turns a folder of raw SVGs into Material UI icon components with a custom SVGR template.',
  year: '2024',
  tags: ['Node.js', 'CLI', 'Material UI', 'SVGR'],
  href: 'https://www.npmjs.com/package/mui-svgr-generator',
  hrefLabel: 'npm package',
  repo: 'https://github.com/slangberg/MUI-SVG-Icons',
  language: { name: 'JavaScript', color: '#f1e05a' },
  stars: 3,
}

const meta = {
  title: 'Patterns/Project Card',
  component: ProjectCard,
  parameters: { layout: 'padded' },
  args: { project: base },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-5xl py-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectCard>

export default meta
type Story = StoryObj<typeof meta>

/** A regular card. Hover it to see the spotlight border. */
export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
}

/** Featured with the component specimen preview, as used for the UI Kit. */
export const FeaturedComponents: Story = {
  args: {
    project: {
      title: 'UI Kit',
      description:
        'The component library this site is built from: shadcn/ui components themed through OKLCH design tokens and documented in Storybook.',
      year: '2026',
      tags: ['shadcn/ui', 'Radix', 'Tailwind CSS', 'Storybook'],
      href: '/storybook',
      hrefLabel: 'Open Storybook',
      repo: 'https://github.com/slangberg/portfolio/tree/main/components/ui',
      featured: true,
      preview: 'components',
    },
  },
}

/** Featured with a screenshot preview. */
export const FeaturedImage: Story = {
  args: {
    project: {
      title: 'pokedex-nextjs',
      description:
        'A Pokédex for all ~1,300 Pokémon, styled after the red handheld from the original games, with every data tab at its own shareable URL.',
      year: '2024',
      tags: ['Next.js', 'React Server Components', 'Tailwind CSS'],
      href: 'https://pokedex-nextjs-ten-pi.vercel.app',
      repo: 'https://github.com/slangberg/pokedex-nextjs',
      featured: true,
      preview: {
        image: '/projects/pokedex.jpg',
        alt: 'The Pokédex app showing Charizard.',
      },
    },
  },
}

/** The grid: featured cards span the row and an odd last card fills it. */
export const Grid: Story = {
  render: () => (
    <ProjectGrid
      projects={[
        { ...base, title: 'Featured project', featured: true },
        base,
        { ...base, title: 'claude-d3-map-project', language: { name: 'TypeScript', color: '#3178c6' } },
        { ...base, title: 'D3 Map Project', href: undefined },
      ]}
    />
  ),
}
