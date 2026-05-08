"use client"

import * as React from "react"
import { RiAddLine } from "@remixicon/react"
import { motion } from "framer-motion"

import { useCompany } from "@/hooks/use-company"
import type { PartnerItem } from "@/lib/company/types"
import { cn } from "@/lib/utils"

const MAX_GRID_COLS = 5
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Diagonal-wave timing: cell delay = base + (row + col) * step. Cells along
// the same anti-diagonal share a delay, so the reveal sweeps from top-left
// to bottom-right like a wavefront.
const CELL_BASE_DELAY = 0.18
const CELL_DIAGONAL_STEP = 0.08
const CELL_DURATION = 0.85

export function PartnersSlide() {
  const { partners } = useCompany().content
  // Guard: the SlideDeck only mounts this slide when partners is defined, but
  // keep the runtime check so the component is safe to render in isolation.
  if (!partners) return null

  const desktopCols = Math.min(partners.items.length, MAX_GRID_COLS)
  // ≤3 partners: stack as a single column on mobile so the grid fills the
  // viewport. >3 partners: 2-col layout. Either way, no filler cells — an odd
  // count in 2-col mode simply leaves the trailing slot empty (no visible box).
  const useMobileColumn = partners.items.length <= 3

  const cellDelays = partners.items.map((_, i) => {
    const row = Math.floor(i / desktopCols)
    const col = i % desktopCols
    return CELL_BASE_DELAY + (row + col) * CELL_DIAGONAL_STEP
  })
  const lastCellStart = cellDelays.length
    ? Math.max(...cellDelays)
    : CELL_BASE_DELAY
  const descriptionDelay = lastCellStart + CELL_DURATION * 0.55

  return (
    <div className="relative h-full w-full overflow-hidden bg-background text-foreground">
      <div className="flex h-full flex-col justify-start px-6 pt-20 pb-24 md:justify-center md:px-[120px] md:pt-28 md:pb-28">
        <div
          className={cn(
            "mx-auto w-full max-w-[1100px]",
            useMobileColumn &&
              "flex min-h-0 flex-1 flex-col md:block md:flex-initial"
          )}
        >
          <div
            className={cn(
              "border-t border-l border-border md:grid md:[grid-template-columns:repeat(var(--desktop-cols),minmax(0,1fr))]",
              useMobileColumn
                ? "flex min-h-0 flex-1 flex-col"
                : "grid grid-cols-2"
            )}
            style={
              { "--desktop-cols": desktopCols } as React.CSSProperties
            }
          >
            {partners.items.map((item, i) => (
              <PartnerCell
                key={item.name}
                item={item}
                fillHeight={useMobileColumn}
                delay={cellDelays[i]}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.75,
              ease: EASE_OUT,
              delay: descriptionDelay,
            }}
            className="mt-8 max-w-[520px] md:mt-10"
          >
            <p className="text-[14px] leading-relaxed text-muted-foreground md:text-[15px]">
              {partners.description}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function PartnerCell({
  item,
  fillHeight,
  delay,
}: {
  item: PartnerItem
  fillHeight: boolean
  delay: number
}) {
  const isExternal = item.href?.startsWith("http")
  const className = cn(
    "group relative flex flex-col border-r border-b border-border p-4 transition-colors md:p-6",
    fillHeight
      ? "min-h-0 flex-1 md:aspect-[5/4] md:flex-initial"
      : "aspect-[5/4]",
    item.href && "hover:bg-card"
  )

  const motionProps = {
    initial: { clipPath: "inset(0 0 100% 0)" },
    animate: { clipPath: "inset(0 0 0% 0)" },
    transition: { duration: CELL_DURATION, ease: EASE_OUT, delay },
    style: { willChange: "clip-path" } as React.CSSProperties,
  }

  const content = (
    <>
      <div className="flex flex-1 items-center justify-center">
        {item.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.logo.src}
            alt={item.logo.alt}
            className={cn(
              "w-auto object-contain md:max-h-20 md:max-w-[70%]",
              fillHeight ? "max-h-20 max-w-[60%]" : "max-h-12 max-w-[80%]"
            )}
          />
        ) : (
          <span className="text-lg font-semibold tracking-tight md:text-2xl">
            {item.name}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between md:mt-4">
        <span className="text-[12px] text-foreground md:text-[13px]">
          {item.name}
        </span>
        <span className="grid size-6 place-items-center rounded-full bg-muted text-foreground/70 transition-colors group-hover:bg-foreground group-hover:text-background md:size-7">
          <RiAddLine size={14} aria-hidden />
        </span>
      </div>
    </>
  )

  if (item.href) {
    return (
      <motion.a
        href={item.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className={className}
        {...motionProps}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.div className={className} {...motionProps}>
      {content}
    </motion.div>
  )
}
