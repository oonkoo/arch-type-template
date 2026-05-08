"use client"

import * as React from "react"

export type Surface = "light" | "dark"

/**
 * Tailwind classes for surface-driven color flips (text / bg / border) across
 * fixed chrome. The cubic-bezier is a strong-finish "ease-out-quint"-style
 * curve — feels like a heavy element decelerating into rest, so the colour
 * change reads as a settling spring rather than a hard snap.
 */
export const SURFACE_TRANSITION =
  "transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"

export type SlideMeta = {
  /** React key + url fragment target. */
  key: string
  /** Small label shown at top-left of the viewport. */
  eyebrow: string
  /** Drives chrome colour: icons/text flip between near-black and near-white. */
  surface: Surface
  /** When true, the slide renders its own bottom strip — chrome footer is hidden. */
  ownsFooter?: boolean
}

export type SlideDeckContextValue = {
  slides: SlideMeta[]
  activeIndex: number
  /** +1 = navigated forward (next), -1 = navigated backward (prev). */
  direction: 1 | -1
  goTo: (index: number) => void
  next: () => void
  prev: () => void
}

const SlideDeckContext = React.createContext<SlideDeckContextValue | null>(null)

export function SlideDeckProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: SlideDeckContextValue
}) {
  return (
    <SlideDeckContext.Provider value={value}>
      {children}
    </SlideDeckContext.Provider>
  )
}

export function useSlideDeck() {
  const ctx = React.useContext(SlideDeckContext)
  if (!ctx) {
    throw new Error("useSlideDeck must be used inside a <SlideDeckProvider>")
  }
  return ctx
}

export function useActiveSlide(): SlideMeta {
  const { slides, activeIndex } = useSlideDeck()
  return slides[activeIndex]
}
