"use client"

import {
  SURFACE_TRANSITION,
  useActiveSlide,
} from "@/components/slide-deck/context"
import { cn } from "@/lib/utils"

/** Top-left two-line label ("ABOUT / US", "FEATURED / WORKS", …). */
export function SectionLabel() {
  const { eyebrow, surface } = useActiveSlide()
  const words = eyebrow.toUpperCase().split(/\s+/)

  return (
    <div
      className={cn(
        "pointer-events-none fixed top-6 left-6 z-40 font-[family-name:var(--font-heading)] text-[13px] leading-[1.15] font-bold tracking-[0.04em] uppercase md:top-8 md:left-[120px]",
        SURFACE_TRANSITION,
        surface === "dark" ? "text-white" : "text-foreground"
      )}
    >
      {words.map((word, i) => (
        <div key={i}>{word}</div>
      ))}
    </div>
  )
}
