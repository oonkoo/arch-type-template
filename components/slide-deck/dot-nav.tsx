"use client"

import {
  SURFACE_TRANSITION,
  useActiveSlide,
  useSlideDeck,
} from "@/components/slide-deck/context"
import { cn } from "@/lib/utils"

/** Right-side vertical indicator: inactive = solid dot, active = outlined ring. */
export function DotNav() {
  const { slides, activeIndex, goTo } = useSlideDeck()
  const { surface } = useActiveSlide()
  const isDark = surface === "dark"

  return (
    <nav
      aria-label="Slide navigation"
      className="pointer-events-auto fixed top-1/2 right-7 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex"
    >
      {slides.map((slide, i) => {
        const active = i === activeIndex
        return (
          <button
            key={slide.key}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${slide.eyebrow}`}
            aria-current={active ? "true" : undefined}
            className="grid h-5 w-5 place-items-center focus:outline-none"
          >
            {active ? (
              <span
                className={cn(
                  "block h-3 w-3 rounded-full border",
                  SURFACE_TRANSITION,
                  isDark ? "border-white" : "border-primary"
                )}
              />
            ) : (
              <span
                className={cn(
                  "block h-1.5 w-1.5 rounded-full",
                  SURFACE_TRANSITION,
                  isDark ? "bg-white/55" : "bg-foreground/40"
                )}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
