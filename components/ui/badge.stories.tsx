import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BadgeCheck } from 'lucide-react'

import { Badge } from './badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Badge' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'],
    },
    asChild: { table: { disable: true } },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args}>Default</Badge>
      <Badge {...args} variant="secondary">Secondary</Badge>
      <Badge {...args} variant="outline">Outline</Badge>
      <Badge {...args} variant="ghost">Ghost</Badge>
      <Badge {...args} variant="destructive">Destructive</Badge>
      <Badge {...args} variant="link">Link</Badge>
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <Badge {...args} variant="secondary">
      <BadgeCheck data-icon="inline-start" />
      Verified
    </Badge>
  ),
}

export const TagList: Story = {
  name: 'Tag list (as used on the site)',
  render: () => (
    <div className="flex max-w-xs flex-wrap gap-1">
      {['TypeScript', 'React', 'Next.js', 'PostgreSQL', 'Tailwind CSS'].map((t) => (
        <Badge key={t} variant="outline">
          {t}
        </Badge>
      ))}
    </div>
  ),
}
