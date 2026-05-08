import type { Surface } from "@/components/slide-deck/context"
import { activeCompany } from "@/lib/company/active"
import { cn } from "@/lib/utils"

type CompanyMarkProps = {
  /** Which surface the mark will sit on — picks the contrast-appropriate asset. */
  surface: Surface
  className?: string
}

/**
 * Icon-only company mark used in the brand rail. Falls back to the full logo
 * when a dedicated mark isn't provided, and can apply a CSS `filter` per surface
 * for single-colour marks (see `CompanyConfig.logo.lightSurfaceFilter`).
 */
export function CompanyMark({ surface, className }: CompanyMarkProps) {
  const { logo, name } = activeCompany
  const mark = logo.mark

  let asset = logo.light
  let filter: string | undefined

  if (mark) {
    asset = surface === "dark" ? (mark.dark ?? mark.light) : mark.light
    // If the company provides an explicit mark for this surface, trust the asset
    // and skip the surface filter; otherwise fall through to the filter path below.
    const hasExplicit = surface === "dark" ? !!mark.dark : !!mark.light
    if (!hasExplicit) {
      filter =
        surface === "light" ? logo.lightSurfaceFilter : logo.darkSurfaceFilter
    }
  } else {
    filter =
      surface === "light" ? logo.lightSurfaceFilter : logo.darkSurfaceFilter
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG, no optimisation gain
    <img
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={asset.alt ?? name}
      style={filter ? { filter } : undefined}
      className={cn("h-8 w-8 object-contain", className)}
    />
  )
}
