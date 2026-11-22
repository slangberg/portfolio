import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Mail, Plus, Rss } from 'lucide-react'

import { Button } from './button'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

type Side = 'top' | 'right' | 'bottom' | 'left'

function TooltipDemo({ side = 'top', label = 'Add to library' }: { side?: Side; label?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" aria-label={label}>
          <Plus />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side}>{label}</TooltipContent>
    </Tooltip>
  )
}

const meta = {
  title: 'Components/Tooltip',
  component: TooltipDemo,
  subcomponents: { Tooltip, TooltipTrigger, TooltipContent },
  args: { side: 'top', label: 'Add to library' },
  argTypes: {
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
  },
} satisfies Meta<typeof TooltipDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const IconToolbar: Story = {
  name: 'Icon toolbar (as used in the footer)',
  render: () => (
    <div className="flex gap-1">
      {[
        { label: 'Email', Icon: Mail },
        { label: 'RSS', Icon: Rss },
      ].map(({ label, Icon }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={label}>
              <Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}
