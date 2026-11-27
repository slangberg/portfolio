import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Eyebrow, PageHeader, SectionHeading } from './section-heading'

const meta = {
  title: 'Patterns/Headings',
  component: SectionHeading,
  parameters: { layout: 'padded' },
  args: { eyebrow: 'Selected work', title: 'Projects', href: '/projects' },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-3xl py-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionHeading>

export default meta
type Story = StoryObj<typeof meta>

/** Section title with an eyebrow label and an optional "View all" link. */
export const Section: Story = {}

export const SectionWithoutLink: Story = {
  args: { eyebrow: 'Toolkit', title: 'What I work with', href: undefined },
}

/** Large title at the top of a page. */
export const Page: Story = {
  render: () => (
    <PageHeader
      eyebrow="Work"
      title="Projects"
      description="Selected work and side projects, including the repos pinned on my GitHub profile."
    />
  ),
}

/** The small mono label on its own. */
export const EyebrowLabel: Story = {
  render: () => <Eyebrow>Writing</Eyebrow>,
}
