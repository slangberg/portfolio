import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from './avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  subcomponents: { AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>YN</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>YN</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args} size="lg">
      <AvatarImage
        src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23a5b4fc'/><stop offset='1' stop-color='%23f0abfc'/></linearGradient></defs><rect width='40' height='40' fill='url(%23g)'/></svg>"
        alt="Gradient placeholder"
      />
      <AvatarFallback>YN</AvatarFallback>
    </Avatar>
  ),
}

export const WithBadge: Story = {
  render: (args) => (
    <Avatar {...args} size="lg">
      <AvatarFallback>YN</AvatarFallback>
      <AvatarBadge className="bg-emerald-500" />
    </Avatar>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      {['AB', 'CD', 'EF'].map((i) => (
        <Avatar key={i}>
          <AvatarFallback>{i}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  ),
}
