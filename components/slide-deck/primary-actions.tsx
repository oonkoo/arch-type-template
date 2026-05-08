"use client"

import { RiGlobalLine } from "@remixicon/react"

import {
  SURFACE_TRANSITION,
  useActiveSlide,
} from "@/components/slide-deck/context"
import { useCompany } from "@/hooks/use-company"
import { cn } from "@/lib/utils"

/** Top-right persistent CTA: orange "Start A Project" pill + globe (locale). */
export function PrimaryActions() {
  const { surface } = useActiveSlide()
  const { primaryAction } = useCompany().content
  const isDark = surface === "dark"

  return (
    <div className="pointer-events-auto fixed top-5 right-5 z-40 flex items-center gap-2 md:top-6 md:right-10 md:gap-3">
      <a
        href={primaryAction.href}
        className="rounded-full bg-primary px-4 py-2 text-[12px] font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 md:px-5 md:py-2.5 md:text-[13px]"
      >
        {primaryAction.label}
      </a>
      <a
        href="#"
        aria-label="Locale"
        className={cn(
          "hidden h-10 w-10 place-items-center rounded-full border md:grid",
          SURFACE_TRANSITION,
          isDark
            ? "border-white/30 text-white hover:bg-white/10"
            : "border-border text-foreground hover:bg-muted"
        )}
      >
        <RiGlobalLine size={18} aria-hidden />
      </a>
    </div>
  )
}
