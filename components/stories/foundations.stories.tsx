import type { Meta, StoryObj } from '@storybook/nextjs-vite'

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

export const Colors: Story = {
  render: () => (
    <div className="max-w-3xl space-y-8">
      <p className="text-sm text-muted-foreground">
        Theme tokens from <code className="font-mono">app/global.css</code>. Toggle
        the theme in the toolbar to see the dark values.
      </p>
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

export const Typography: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">text-4xl · semibold · Geist Sans</p>
        <h1 className="text-4xl font-semibold tracking-tight">The quick brown fox</h1>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">text-3xl · semibold</p>
        <h2 className="text-3xl font-semibold tracking-tight">Jumps over the lazy dog</h2>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">text-lg · semibold</p>
        <h3 className="text-lg font-semibold tracking-tight">Section heading</h3>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">text-base · body</p>
        <p className="leading-relaxed">
          Body copy is set in Geist Sans at the default size with relaxed line height for
          comfortable reading on long pages.
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">text-sm · muted-foreground</p>
        <p className="text-sm text-muted-foreground">Secondary and supporting text.</p>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">font-mono · Geist Mono</p>
        <p className="font-mono text-sm">const greeting = &apos;hello world&apos;</p>
      </div>
    </div>
  ),
}

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      {['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-4xl'].map(
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
