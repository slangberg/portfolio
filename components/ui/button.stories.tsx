import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ArrowRight, Download, Mail, Plus } from 'lucide-react'
import { fn } from 'storybook/test'

import { Button } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Button', onClick: fn() },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
    disabled: { control: 'boolean' },
    asChild: { table: { disable: true } },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Button {...args}>Default</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="destructive">Destructive</Button>
      <Button {...args} variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Button {...args} size="xs">Extra small</Button>
      <Button {...args} size="sm">Small</Button>
      <Button {...args}>Default</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Button {...args}>
        <Mail data-icon="inline-start" />
        Email me
      </Button>
      <Button {...args} variant="outline">
        View projects
        <ArrowRight data-icon="inline-end" />
      </Button>
      <Button {...args} variant="secondary">
        <Download data-icon="inline-start" />
        Download
      </Button>
    </div>
  ),
}

export const IconOnly: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Button {...args} size="icon-sm" variant="outline" aria-label="Add">
        <Plus />
      </Button>
      <Button {...args} size="icon" variant="outline" aria-label="Add">
        <Plus />
      </Button>
      <Button {...args} size="icon-lg" variant="outline" aria-label="Add">
        <Plus />
      </Button>
    </div>
  ),
}

export const AsLink: Story = {
  render: (args) => (
    <Button {...args} asChild variant="outline">
      <a href="#">I am an anchor</a>
    </Button>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
}
