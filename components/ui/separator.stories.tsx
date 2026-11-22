import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Separator } from './separator'

const meta = {
  title: 'Components/Separator',
  component: Separator,
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-72 space-y-3">
      <div>
        <p className="text-sm font-medium">Section title</p>
        <p className="text-sm text-muted-foreground">Supporting text.</p>
      </div>
      <Separator {...args} />
      <p className="text-sm">Content below the separator.</p>
    </div>
  ),
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div className="flex h-5 items-center gap-3 text-sm">
      <span>Home</span>
      <Separator {...args} />
      <span>Projects</span>
      <Separator {...args} />
      <span>Blog</span>
    </div>
  ),
}
