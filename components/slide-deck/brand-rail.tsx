"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  RiArrowRightLine,
  RiBehanceLine,
  RiCloseLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiPauseLine,
  RiTwitterXLine,
  type RemixiconComponentType,
} from "@remixicon/react"

import { CompanyMark } from "@/components/company-mark"
import {
  SURFACE_TRANSITION,
  useActiveSlide,
  useSlideDeck,
} from "@/components/slide-deck/context"
import { useCompany } from "@/hooks/use-company"
import type { SocialKey } from "@/lib/company/types"
import { cn } from "@/lib/utils"

const SOCIAL_ICON: Partial<Record<SocialKey, RemixiconComponentType>> = {
  x: RiTwitterXLine,
  instagram: RiInstagramLine,
  linkedin: RiLinkedinLine,
  behance: RiBehanceLine,
}

const SOCIAL_LABEL: Record<SocialKey, string> = {
  x: "X",
  instagram: "Instagram",
  behance: "Behance",
  linkedin: "LinkedIn",
}

const RAIL_KEYS: SocialKey[] = ["x", "instagram", "linkedin", "behance"]

const COLLAPSED_WIDTH = 64
const EXPANDED_WIDTH = 520

const RAIL_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
  mass: 0.6,
}

export function BrandRail() {
  return (
    <>
      <DesktopRail />
      <MobileNav />
    </>
  )
}

/* ------------------------------------------------------------------------- */
/* Desktop — vertical rail on the left, expands rightward.                   */
/* ------------------------------------------------------------------------- */

function DesktopRail() {
  const { surface } = useActiveSlide()
  const { slides, activeIndex, goTo } = useSlideDeck()
  const { socials } = useCompany().content
  const [expanded, setExpanded] = React.useState(false)
  const railRef = React.useRef<HTMLElement>(null)

  const isDark = surface === "dark"

  React.useEffect(() => {
    if (!expanded) return
    function onPointerDown(event: PointerEvent) {
      if (
        railRef.current &&
        !railRef.current.contains(event.target as Node)
      ) {
        setExpanded(false)
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setExpanded(false)
    }
    window.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("keydown", onKey)
    }
  }, [expanded])

  const toggleClass = cn(
    "z-20 grid h-10 w-10 place-items-center rounded-full",
    SURFACE_TRANSITION,
    isDark
      ? "text-white hover:bg-primary hover:text-primary-foreground"
      : "text-foreground hover:bg-primary hover:text-primary-foreground"
  )

  return (
    <motion.aside
      ref={railRef}
      initial={false}
      animate={{ width: expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
      transition={RAIL_SPRING}
      style={{ width: COLLAPSED_WIDTH }}
      className={cn(
        "pointer-events-auto fixed inset-y-0 left-0 z-50 hidden flex-col items-stretch overflow-hidden border-r py-6 backdrop-blur-md md:flex",
        SURFACE_TRANSITION,
        isDark
          ? "border-white/10 bg-neutral-900/95 text-white"
          : "border-border bg-background/95 text-foreground"
      )}
    >
      <div className="flex justify-center">
        <CompanyMark surface={surface} className="h-8 w-8" />
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center">
        <AnimatePresence>
          {expanded && (
            <motion.nav
              key="sections"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
              className="flex w-full flex-col gap-7 px-14"
            >
              {slides.map((slide, index) => (
                <SectionLink
                  key={slide.key}
                  label={slide.eyebrow}
                  isActive={index === activeIndex}
                  isDark={isDark}
                  delay={0.06 + index * 0.045}
                  onClick={() => {
                    goTo(index)
                    setExpanded(false)
                  }}
                />
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {!expanded && (
          <motion.button
            layoutId="rail-toggle"
            type="button"
            onClick={() => setExpanded(true)}
            aria-label="Open navigation"
            aria-expanded={false}
            transition={RAIL_SPRING}
            className={cn(
              toggleClass,
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            )}
          >
            <RiPauseLine size={24} aria-hidden />
          </motion.button>
        )}

        {expanded && (
          <motion.button
            layoutId="rail-toggle"
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="Close navigation"
            aria-expanded={true}
            transition={RAIL_SPRING}
            className={cn(
              toggleClass,
              "absolute top-1/2 right-5 -translate-y-1/2"
            )}
          >
            <RiCloseLine size={22} aria-hidden />
          </motion.button>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        {RAIL_KEYS.map((key) => {
          const href = socials[key]
          const Icon = SOCIAL_ICON[key]
          if (!href || !Icon) return null
          const isPrimary = key === "x"
          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={SOCIAL_LABEL[key]}
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full transition-colors",
                isPrimary
                  ? "bg-primary text-primary-foreground hover:bg-primary/85"
                  : "bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
              )}
            >
              <Icon size={14} aria-hidden />
            </a>
          )
        })}
      </div>
    </motion.aside>
  )
}

/* ------------------------------------------------------------------------- */
/* Mobile — fixed bottom app bar with full-screen menu overlay.              */
/* ------------------------------------------------------------------------- */

function MobileNav() {
  const { surface } = useActiveSlide()
  const { slides, activeIndex, goTo } = useSlideDeck()
  const { socials } = useCompany().content
  const [open, setOpen] = React.useState(false)

  const isDark = surface === "dark"

  // Esc closes the menu for keyboard users (and external bluetooth keyboards
  // on tablets where this hook still matters).
  React.useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  // Lock body scroll when the overlay is open so the slide beneath doesn't
  // jitter from rubber-band scrolls on iOS.
  React.useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <>
      <aside
        className={cn(
          "pointer-events-auto fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-between border-t px-4 backdrop-blur-md md:hidden",
          SURFACE_TRANSITION,
          isDark
            ? "border-white/10 bg-neutral-900/95 text-white"
            : "border-border bg-background/95 text-foreground"
        )}
      >
        <CompanyMark surface={surface} className="h-7 w-7" />

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          aria-expanded={open}
          className={cn(
            "grid h-11 w-11 place-items-center rounded-full",
            SURFACE_TRANSITION,
            isDark
              ? "text-white hover:bg-primary hover:text-primary-foreground"
              : "text-foreground hover:bg-primary hover:text-primary-foreground"
          )}
        >
          <RiPauseLine size={22} aria-hidden />
        </button>

        <div className="flex items-center gap-1.5">
          {RAIL_KEYS.map((key) => {
            const href = socials[key]
            const Icon = SOCIAL_ICON[key]
            if (!href || !Icon) return null
            const isPrimary = key === "x"
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={SOCIAL_LABEL[key]}
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full transition-colors",
                  isPrimary
                    ? "bg-primary text-primary-foreground hover:bg-primary/85"
                    : "bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
                )}
              >
                <Icon size={12} aria-hidden />
              </a>
            )
          })}
        </div>
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 32,
              mass: 0.7,
            }}
            className={cn(
              "pointer-events-auto fixed inset-0 z-[60] flex flex-col md:hidden",
              SURFACE_TRANSITION,
              isDark
                ? "bg-neutral-900 text-white"
                : "bg-background text-foreground"
            )}
          >
            <div className="flex items-center justify-between px-4 py-5">
              <CompanyMark surface={surface} className="h-7 w-7" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-full",
                  SURFACE_TRANSITION,
                  isDark
                    ? "text-white hover:bg-primary hover:text-primary-foreground"
                    : "text-foreground hover:bg-primary hover:text-primary-foreground"
                )}
              >
                <RiCloseLine size={22} aria-hidden />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-5 px-8">
              {slides.map((slide, index) => (
                <SectionLink
                  key={slide.key}
                  label={slide.eyebrow}
                  isActive={index === activeIndex}
                  isDark={isDark}
                  delay={0.05 + index * 0.04}
                  size="mobile"
                  onClick={() => {
                    goTo(index)
                    setOpen(false)
                  }}
                />
              ))}
            </nav>

            <div className="flex items-center justify-center gap-2 px-4 pt-4 pb-8">
              {RAIL_KEYS.map((key) => {
                const href = socials[key]
                const Icon = SOCIAL_ICON[key]
                if (!href || !Icon) return null
                const isPrimary = key === "x"
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={SOCIAL_LABEL[key]}
                    className={cn(
                      "grid h-9 w-9 place-items-center rounded-full transition-colors",
                      isPrimary
                        ? "bg-primary text-primary-foreground hover:bg-primary/85"
                        : "bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
                    )}
                  >
                    <Icon size={14} aria-hidden />
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ------------------------------------------------------------------------- */
/* Shared section link.                                                      */
/* ------------------------------------------------------------------------- */

function SectionLink({
  label,
  isActive,
  isDark,
  delay,
  onClick,
  size = "desktop",
}: {
  label: string
  isActive: boolean
  isDark: boolean
  delay: number
  onClick: () => void
  size?: "desktop" | "mobile"
}) {
  const labelSize =
    size === "mobile"
      ? "text-[28px]"
      : "text-[34px]"

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        delay,
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={cn(
        "group relative flex items-center gap-4 pl-6 text-left",
        SURFACE_TRANSITION,
        isActive
          ? "text-primary"
          : isDark
            ? "text-white/55 hover:text-white"
            : "text-foreground/45 hover:text-foreground"
      )}
    >
      {isActive && (
        <motion.span
          layoutId={
            size === "mobile"
              ? "mobile-active-bar"
              : "rail-active-bar"
          }
          className="absolute top-1/2 left-0 h-[60%] w-[3px] -translate-y-1/2 rounded-full bg-primary"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span
        className={cn(
          "font-[family-name:var(--font-heading)] leading-[1] font-extrabold tracking-[-0.015em] whitespace-nowrap uppercase",
          labelSize
        )}
      >
        {label}
      </span>
      <RiArrowRightLine
        size={size === "mobile" ? 18 : 20}
        aria-hidden
        className={cn(
          "-translate-x-2 self-center opacity-0 transition-all duration-300",
          isActive
            ? "translate-x-0 opacity-100"
            : "group-hover:translate-x-0 group-hover:opacity-100"
        )}
      />
    </motion.button>
  )
}
