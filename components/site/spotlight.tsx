'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Wraps a Card with a border glow that follows the pointer. Styles live in
 * app/global.css (`.spotlight`); this component only tracks the position.
 */
export function Spotlight({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      style={style}
      onPointerMove={(e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--x', `${e.clientX - rect.left}px`)
        el.style.setProperty('--y', `${e.clientY - rect.top}px`)
      }}
      className={cn(
        'spotlight transition-transform duration-300 motion-safe:hover:-translate-y-0.5',
        className
      )}
    >
      {children}
    </div>
  )
}
