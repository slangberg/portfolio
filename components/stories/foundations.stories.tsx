import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Card } from '@/components/ui/card'
import { Eyebrow } from '@/components/site/section-heading'
import { Spotlight } from '@/components/site/spotlight'

const meta = {
  title: 'Foundations',
  parameters: { layout: 'padded' },
  tags: ['!autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const colorPairs = [
  ['background', 'foreground'],
  ['card', 'card-foreground'],
  ['popover', 'popover-foreground'],
  ['primary', 'primary-foreground'],
  ['secondary', 'secondary-foreground'],
  ['muted', 'muted-foreground'],
  ['accent', 'accent-foreground'],
  ['destructive', 'background'],
] as const

const singleColors = ['border', 'input', 'ring'] as const

const brandColors = [
  { token: 'brand', use: 'Accent: links, labels, focus rings, hover glows' },
  { token: 'brand-2', use: 'Second gradient stop' },
] as const

export const Colors: Story = {
  render: () => (
    <div className="max-w-3xl space-y-8">
      <p className="text-sm text-muted-foreground">
        Theme tokens from <code className="font-mono">app/global.css</code>. Neutrals
        carry a slight cool tint; the brand pair adds the accent. Toggle the theme in
        the toolbar to see the dark values.
      </p>
      <div className="space-y-3">
        <Eyebrow>Brand</Eyebrow>
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_2fr]">
          {brandColors.map(({ token, use }) => (
            <div key={token} className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
              <div className="h-16" style={{ background: `var(--${token})` }} />
              <div className="space-y-0.5 p-3">
                <p className="font-mono text-xs">--{token}</p>
                <p className="text-xs text-muted-foreground">{use}</p>
              </div>
            </div>
          ))}
          <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <div className="h-16 bg-linear-to-r from-brand to-brand-2" />
            <div className="space-y-0.5 p-3">
              <p className="font-mono text-xs">.text-gradient</p>
              <p className="text-xs text-muted-foreground">
                Gradient for highlighted words in headings
              </p>
            </div>
          </div>
        </div>
      </div>
      <Eyebrow>Surfaces</Eyebrow>
      <div className="grid gap-3 sm:grid-cols-2">
        {colorPairs.map(([bg, fg]) => (
          <div
            key={bg}
            className="flex h-20 flex-col justify-between rounded-lg p-3 ring-1 ring-foreground/10"
            style={{ background: `var(--${bg})`, color: `var(--${fg})` }}
          >
            <span className="text-sm font-medium">{bg}</span>
            <span className="font-mono text-xs opacity-80">
              --{bg} / --{fg}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {singleColors.map((c) => (
          <div key={c} className="flex items-center gap-2 text-sm">
            <span
              className="size-8 rounded-md ring-1 ring-foreground/10"
              style={{ background: `var(--${c})` }}
            />
            <span className="font-mono text-xs">--{c}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

const typeScale = [
  {
    label: 'Display · text-6xl · semibold · tracking-tighter',
    node: (
      <h1 className="text-5xl font-semibold tracking-tighter sm:text-6xl sm:leading-[1.05]">
        Design systems <span className="text-gradient">built to scale.</span>
      </h1>
    ),
  },
  {
    label: 'Page title · text-5xl · tracking-tighter',
    node: <h1 className="text-5xl font-semibold tracking-tighter">Projects</h1>,
  },
  {
    label: 'Eyebrow · Geist Mono · xs · uppercase · brand',
    node: <Eyebrow>Selected work</Eyebrow>,
  },
  {
    label: 'Section title · text-2xl · semibold',
    node: <h2 className="text-2xl font-semibold tracking-tight">Recent posts</h2>,
  },
  {
    label: 'Card title · text-lg · semibold',
    node: <h3 className="text-lg font-semibold tracking-tight">mui-svgr-generator</h3>,
  },
  {
    label: 'Lead · text-lg · muted-foreground',
    node: (
      <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
        Supporting copy under a heading, set larger and in the muted color.
      </p>
    ),
  },
  {
    label: 'Body · text-base · leading-relaxed',
    node: (
      <p className="max-w-xl leading-relaxed">
        Body copy is set in Geist Sans with relaxed line height for comfortable
        reading on long pages.
      </p>
    ),
  },
  {
    label: 'Mono · Geist Mono',
    node: <p className="font-mono text-sm">const greeting = &apos;hello world&apos;</p>,
  },
]

export const Typography: Story = {
  render: () => (
    <div className="max-w-3xl divide-y">
      {typeScale.map(({ label, node }) => (
        <div key={label} className="space-y-2 py-5 first:pt-0">
          <p className="font-mono text-[11px] text-muted-foreground">{label}</p>
          {node}
        </div>
      ))}
    </div>
  ),
}

export const Effects: Story = {
  render: () => (
    <div className="grid max-w-4xl gap-6 sm:grid-cols-2">
      <div className="space-y-3">
        <Eyebrow>Spotlight</Eyebrow>
        <Spotlight>
          <Card className="gap-2 p-5">
            <p className="text-lg font-semibold tracking-tight">Hover me</p>
            <p className="text-sm text-muted-foreground">
              The border glows where the pointer is and the card lifts slightly.
              Wrap any Card in <code className="font-mono">Spotlight</code>.
            </p>
          </Card>
        </Spotlight>
      </div>
      <div className="space-y-3">
        <Eyebrow>Backdrop</Eyebrow>
        <div className="relative h-[140px] overflow-hidden rounded-xl border bg-background">
          <div className="backdrop-glow absolute inset-0" />
          <div className="backdrop-grid absolute inset-0" />
          <p className="relative p-5 text-sm text-muted-foreground">
            <code className="font-mono">.backdrop-glow</code> and{' '}
            <code className="font-mono">.backdrop-grid</code> sit behind the top of
            every page.
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <Eyebrow>Glass</Eyebrow>
        <div className="relative overflow-hidden rounded-xl border bg-linear-to-br from-brand/30 to-brand-2/30 p-5">
          <div className="rounded-2xl border bg-background/60 px-4 py-3 text-sm font-medium shadow-sm backdrop-blur-xl">
            Frosted surface used by the site header
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <Eyebrow>Status</Eyebrow>
        <p className="inline-flex items-center gap-2 rounded-full border bg-background/60 py-1 pr-3 pl-2 text-sm text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          Currently at <span className="font-medium text-foreground">Momentive</span>
        </p>
      </div>
    </div>
  ),
}

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      {['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl'].map(
        (r) => (
          <div key={r} className="flex flex-col items-center gap-2">
            <div className={`size-16 bg-muted ring-1 ring-foreground/10 ${r}`} />
            <span className="font-mono text-xs text-muted-foreground">{r}</span>
          </div>
        )
      )}
    </div>
  ),
}
