import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ArrowUpRight } from 'lucide-react'

import { Badge } from './badge'
import { Button } from './button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'

const meta = {
  title: 'Components/Card',
  component: Card,
  subcomponents: {
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
    CardContent,
    CardFooter,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['default', 'sm'] },
  },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>A short description of what this card is about.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. Cards group related content and actions.</p>
      </CardContent>
    </Card>
  ),
}

export const Small: Story = {
  ...Default,
  args: { size: 'sm' },
}

export const WithActionAndFooter: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Realtime Dashboard</CardTitle>
        <CardAction className="text-xs text-muted-foreground">2025</CardAction>
        <CardDescription>
          Streaming analytics dashboard with live charts and saved views.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1">
        {['Next.js', 'WebSockets', 'PostgreSQL'].map((t) => (
          <Badge key={t} variant="outline">
            {t}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm" variant="outline">
          Visit
          <ArrowUpRight data-icon="inline-end" />
        </Button>
        <Button size="sm" variant="ghost">
          Source
        </Button>
      </CardFooter>
    </Card>
  ),
}
