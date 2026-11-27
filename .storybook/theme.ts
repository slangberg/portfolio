import { create } from 'storybook/theming/create'

import { palette, type Mode } from './palette'

export const prefersDark = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(prefers-color-scheme: dark)').matches

export function storybookTheme(mode: Mode) {
  const c = palette[mode]
  return create({
    base: mode,
    brandTitle: `<span style="display:inline-flex;align-items:center;gap:8px;font-weight:600;letter-spacing:-0.02em;font-size:15px"><span style="width:10px;height:10px;border-radius:999px;background:linear-gradient(135deg,${c.brand},${c.brand2})"></span>UI Kit</span>`,
    brandUrl: './index.html',
    brandTarget: '_self',

    colorPrimary: c.brand,
    colorSecondary: c.brand,

    appBg: c.bg,
    appContentBg: c.card,
    appPreviewBg: c.bg,
    appBorderColor: c.border,
    appBorderRadius: 12,

    textColor: c.fg,
    textMutedColor: c.mutedFg,
    textInverseColor: c.bg,

    barBg: c.bg,
    barTextColor: c.mutedFg,
    barHoverColor: c.brand,
    barSelectedColor: c.brand,

    buttonBg: c.muted,
    buttonBorder: c.border,
    booleanBg: c.muted,
    booleanSelectedBg: c.card,
    inputBg: c.card,
    inputBorder: c.border,
    inputTextColor: c.fg,
    inputBorderRadius: 8,

    fontBase: '"Geist", ui-sans-serif, system-ui, sans-serif',
    fontCode: '"Geist Mono", ui-monospace, monospace',
  })
}
