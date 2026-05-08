import { activeCompany } from "@/lib/company/active"
import { cn } from "@/lib/utils"

type CompanyLogoProps = {
  className?: string
  /** Force a variant regardless of the active theme (e.g. on a coloured hero). */
  variant?: "light" | "dark"
}

/**
 * Renders the active company's logo, swapping light/dark variants via Tailwind's
 * `dark:` variant. No client-side theme read required — the variant swap happens
 * entirely in CSS based on the `.dark` class on `<html>`.
 */
export function CompanyLogo({ className, variant }: CompanyLogoProps) {
  const { logo, name } = activeCompany

  if (variant) {
    const asset = variant === "dark" ? (logo.dark ?? logo.light) : logo.light
    return <LogoImage asset={asset} alt={name} className={className} />
  }

  if (!logo.dark) {
    return <LogoImage asset={logo.light} alt={name} className={className} />
  }

  return (
    <>
      <LogoImage
        asset={logo.light}
        alt={name}
        className={cn("block dark:hidden", className)}
      />
      <LogoImage
        asset={logo.dark}
        alt={name}
        className={cn("hidden dark:block", className)}
      />
    </>
  )
}

function LogoImage({
  asset,
  alt,
  className,
}: {
  asset: { src: string; width: number; height: number; alt?: string }
  alt: string
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG assets don't benefit from next/image
    <img
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={asset.alt ?? alt}
      className={cn("h-auto w-auto", className)}
    />
  )
}
