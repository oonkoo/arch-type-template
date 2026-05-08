"use client"

import {
  SURFACE_TRANSITION,
  useSlideDeck,
} from "@/components/slide-deck/context"
import { useCompany } from "@/hooks/use-company"
import { cn } from "@/lib/utils"

/** Bottom chrome: "01" counter on the left, copyright on the right. Hidden when a slide owns its own footer. */
export function SlideFooter() {
  const { activeIndex, slides } = useSlideDeck()
  const activeSlide = slides[activeIndex]
  const { surface, ownsFooter } = activeSlide
  const { footer } = useCompany().content

  if (ownsFooter) return null

  const counter = String(activeIndex + 1).padStart(2, "0")

  return (
    <footer
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-6 z-40 hidden items-center justify-between px-[40px] pl-[120px] font-mono text-[11px] tracking-[0.12em] md:flex",
        SURFACE_TRANSITION,
        surface === "dark" ? "text-white/80" : "text-foreground/70"
      )}
    >
      <span className="tabular-nums">{counter}</span>
      <span>{footer.copyright}</span>
    </footer>
  )
}
