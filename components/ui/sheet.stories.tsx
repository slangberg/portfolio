import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Button } from './button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet'

type Side = 'top' | 'right' | 'bottom' | 'left'

function SheetDemo({ side = 'right' }: { side?: Side }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open {side}</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>
            Sheets slide in from an edge of the screen. The site uses one for the
            mobile navigation menu.
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {['Home', 'Projects', 'Blog', 'Resume'].map((item) => (
            <Button key={item} variant="ghost" size="lg" className="justify-start">
              {item}
            </Button>
          ))}
        </nav>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Done</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

const meta = {
  title: 'Components/Sheet',
  component: SheetDemo,
  subcomponents: { SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription },
  args: { side: 'right' },
  argTypes: {
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
  },
} satisfies Meta<typeof SheetDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllSides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-2">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <SheetDemo key={side} side={side} />
      ))}
    </div>
  ),
}
